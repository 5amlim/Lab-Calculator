'use strict';
// Full live-catalog audit for actual source counts, transfer counts, volume
// parsing and the relationship between physical submissions and bag cards.
// Use the exact same HTML loader order as the production calculators.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');

async function load(page,app,lab){
  const files=[...read(page).matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)]
    .map(m=>m[1].split('?')[0]);
  const stop=files.indexOf(app);
  assert(stop>=0,app+' source not loaded by page');
  const nodes=new Map();
  const node=()=>({value:'',checked:false,options:[],dataset:{},style:{},
    classList:{add(){},remove(){},toggle(){},contains(){return false}},
    addEventListener(){},setAttribute(){},removeAttribute(){},
    appendChild(){},querySelector(){return null},querySelectorAll(){return []}});
  const document={body:{dataset:{galleryLab:lab==='quest'?'Q':'L'}},
    getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)},
    querySelector(){return null},querySelectorAll(){return []},addEventListener(){},createElement:node};
  const localStorage={getItem(){return null},setItem(){},removeItem(){}};
  const sandbox={document,localStorage,console,URL,URLSearchParams,Blob,Response,
    DecompressionStream,atob,btoa,Uint8Array,TextDecoder,TextEncoder,setTimeout,clearTimeout,
    location:{search:'',origin:'https://5amlim.github.io',href:'https://5amlim.github.io/Lab-Calculator/'+page},
    addEventListener(){},removeEventListener(){}};
  sandbox.window=sandbox;sandbox.parent=sandbox;
  const context=vm.createContext(sandbox);
  for(const file of files.slice(0,stop))vm.runInContext(read(file),context,{filename:file,timeout:30000});
  if(lab==='quest')await sandbox.QUEST_MISSING_DIRECTORY_READY;
  const code=read(app);
  const hook='  init();';
  assert(code.includes(hook));
  vm.runInContext(code.replace(hook,
    '  window.__fullMathAudit={database,explicitCollectionCount,explicitSubmissionCount,'+
    'normalizeRecord,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,'+
    'buildSubmissionContents,splitSubmissionContainers,isOriginalContainerSubmission,'+
    'canonicalCollectionContainer,urineCollectionType,groupSubmissionContainersForPrint,'+
    'parseVolumeMl,parseSimpleMl};'),
    context,{filename:app,timeout:30000});
  await Promise.resolve(); await Promise.resolve();
  assert(sandbox.__fullMathAudit,lab+' full audit API was not initialized');
  return sandbox.__fullMathAudit;
}
const total=items=>items.reduce((sum,item)=>sum+(Number(item.count)||0),0);
const group=test=>{
  const specimen=String(test.specimenType||'').toLowerCase();
  if(/\burine\b|\burinary\b/.test(specimen))return 'urine';
  if(/\bstool\b|\bfeces\b|\bfecal\b|\bmeconium\b/.test(specimen))return 'stool';
  if(/\bswab\b/.test(specimen))return 'swab';
  if(/\bcsf\b|cerebrospinal/.test(specimen))return 'csf';
  if(/\bsaliva\b/.test(specimen))return 'saliva';
  if(/\bserum\b|\bplasma\b|\bwhole blood\b|\bplatelet\b|\brbcs?\b/.test(specimen))return 'blood';
  if(/\bfluid\b|\bsputum\b|\baspirat/.test(specimen))return 'fluid';
  return 'other';
};
for(const [lab,page,app] of [
  ['quest','index.html','assets/js/app.js'],
  ['labcorp','labcorp.html','labcorp-app.js']
]){
  test(lab+': complete active catalog quantity and physical-bag audit',{timeout:180000},async()=>{
    const api=await load(page,app,lab);
    const active=api.database.filter(row=>row.status==='active');
    const buckets={};
    const flags={sourceCount:[],submissionCount:[],nonsensicalSource:[],nonsensicalSubmit:[],
      printMismatch:[],unaccounted:[],sourceToBagRatio:[],zeroShipment:[],negativeOrNaN:[],timeout:[]};
    const examples={};
    const start=Date.now();
    for(const row of active){
      const cat=group(row);
      buckets[cat]=(buckets[cat]||0)+1;
      const code=String(row.testCode||'');
      const source=api.explicitCollectionCount(row);
      const submit=api.explicitSubmissionCount(row);
      if(source>12)flags.sourceCount.push([code,cat,source,row.drawContainer,row.collectionCount]);
      if(submit>12)flags.submissionCount.push([code,cat,submit,row.transportContainer,row.submissionCount]);
      if(!Number.isFinite(source)||source<1||!Number.isFinite(submit)||submit<1)
        flags.negativeOrNaN.push([code,cat,source,submit]);
      const draw=String(row.drawContainer||'');
      const dest=String(row.transportContainer||'');
      const isTimed=/\b(?:12|24)\s*[- ]?\s*(?:hours?|hrs?)\s+urine\s+(?:container|jug)\b/i.test(draw);
      if(isTimed&&Number(row.collectionCount||1)===1&&source!==1)
        flags.nonsensicalSource.push([code,source,draw]);
      const destIsDuration=/\b(?:12|24)\s*[- ]?\s*(?:hours?|hrs?)\s+urine\s+(?:container|jug)\b/i.test(dest);
      const isUnitSubmit=/\bsubmit\s+\d+(?:\.\d+)?\s*(?:mL|mg|g)\s+(?:aliquot|tube|container|vial)/i.test(row.specialInstructions||'');
      if((isUnitSubmit||destIsDuration)&&Number(row.submissionCount||1)===1&&submit!==1)
        flags.nonsensicalSubmit.push([code,submit,dest,String(row.specialInstructions||'').slice(0,130)]);
      // Every active record goes through the actual collection and bag planners.
      // Additional draws are expanded just like the cart does.
      try{
        const tests=api.expandedCollectionTests([row]);
        const bags=api.buildTransportBagPlan(tests);
        const physicalCollection=api.buildCollectionPlan(tests,bags);
        const physicalSubmission=bags.flatMap(bag=>api.buildSubmissionContents(bag));
        const sourceTotal=total(physicalCollection);
        const submitTotal=total(physicalSubmission);
        if(sourceTotal<1&&!row.transportOnly)
          flags.unaccounted.push([code,cat,'zero source',sourceTotal,submitTotal]);
        if(submitTotal<1)flags.zeroShipment.push([code,cat,'zero shipped',sourceTotal,submitTotal]);
        if(sourceTotal>submitTotal*2&&sourceTotal>2)
          flags.sourceToBagRatio.push([code,cat,sourceTotal,submitTotal,
            row.drawContainer,row.transportContainer,row.preferredVolume,
            String(row.specialInstructions||'').slice(0,180)]);
        const printed=physicalSubmission.map(item=>({label:item.label,count:item.count,original:item.originalTube}));
        // Group *per bag*, preserving priority and temperature separation.
        const grouped=bags.flatMap(bag=>api.groupSubmissionContainersForPrint(api.buildSubmissionContents(bag)));
        const printedTotal=total(grouped);
        if(printedTotal!==submitTotal)flags.printMismatch.push([code,cat,sourceTotal,submitTotal,printedTotal,printed]);
        if(!Number.isFinite(sourceTotal)||!Number.isFinite(submitTotal)||sourceTotal>250||submitTotal>250)
          flags.negativeOrNaN.push([code,cat,sourceTotal,submitTotal,draw,dest]);
        if(sourceTotal>30||submitTotal>30)
          flags.unaccounted.push([code,cat,'high physical count',sourceTotal,submitTotal,draw,dest]);
        if((sourceTotal>2||submitTotal>2)&&!examples[cat]){
          examples[cat]={code,sourceTotal,submitTotal,draw,dest};
        }
      } catch(e){
        flags.timeout.push([code,cat,String(e.message||e).slice(0,160)]);
      }
    }
    const summary={lab,active:active.length,buckets,elapsedSeconds:Math.round((Date.now()-start)/1000),
      findings:Object.fromEntries(Object.entries(flags).map(([name,list])=>[name,list.length])),
      examples:Object.fromEntries(Object.entries(flags).map(([name,list])=>[name,list.slice(0,28)])),
      multipleContainers:examples};
    console.log('FULL_PHYSICAL_AUDIT '+JSON.stringify(summary));
    assert.equal(flags.nonsensicalSource.length,0,'Duration misinterpreted as collection count');
    assert.equal(flags.nonsensicalSubmit.length,0,'Volume or duration misinterpreted as submission count');
    assert.equal(flags.printMismatch.length,0,'Physical submissions do not reconcile to displayed bag quantities');
    assert.equal(flags.negativeOrNaN.length,0,'Invalid or excessive physical container counts');
    assert.equal(flags.timeout.length,0,'Calculator throws for live active specimen orders');
  });
}
