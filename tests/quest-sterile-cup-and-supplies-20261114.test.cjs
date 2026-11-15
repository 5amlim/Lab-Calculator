'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=filename=>fs.readFileSync(path.join(__dirname,'..',filename),'utf8');
function records() {
  const window={SEED_TESTS:[]};
  const layers=['assets/js/data.js',
    'assets/js/quest-verified-urine-20261114.js',
    'assets/js/quest-verified-blood-specialty-20261114.js',
    'assets/js/quest-verified-microbiology-20261114.js',
    'assets/js/quest-verified-gestational-20261114.js',
    'assets/js/quest-gray-plasma-processing-20261114.js'];
  for(const file of layers) vm.runInNewContext(read(file),{window}, {filename:file});
  return window;
}
async function calculator(){
  const window=records();
  const document={
    getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},querySelector(){return null;}}),
    querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){}
  };
  const localStorage={getItem:()=>null,setItem(){},removeItem(){}};
  let app=read('assets/js/app.js');
  assert.ok(app.includes('  init();\n  };'));
  app=app.replace('  init();\n  };',
   '  window.__TEST__={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents,buildDrawGroups,canonicalCollectionContainer,collectionSpecimenGroupForTest,isOriginalContainerSubmission};\n  };');
  vm.runInNewContext(app,{window,document,localStorage,console:{error(){},warn(){}},setTimeout:()=>0,clearTimeout(){}},{filename:'app.js'});
  await Promise.resolve();
  assert.ok(window.__TEST__);
  return window.__TEST__;
}
function plan(h,records){
  const ex=h.expandedCollectionTests(records);
  const bags=h.buildTransportBagPlan(ex);
  return {ex,bags,collection:h.buildCollectionPlan(ex,bags),submission:bags.flatMap(b=>h.buildSubmissionContents(b))};
}
test('Special collection requirements stay flagged while Affirm VPIII remains selectable with its dedicated kit',async()=>{
 const h=await calculator();
 const byCode=new Map(h.database.map(t=>[t.testCode,t]));
 for(const code of ['11290','91448','1635']){
   assert.equal(byCode.get(code)?.status,'blocked',code);
 }
 const affirm=byCode.get('14577');
 assert.equal(affirm?.status,'active');
 assert.match(affirm.drawContainer,/Affirm VPIII ATTS/i);
 assert.match(affirm.transportContainer,/Affirm VPIII ATTS/i);
 assert.match(affirm.specialInstructions,/72 hours/i);
 assert.doesNotMatch(affirm.drawContainer,/Do Not Collect/i);
 assert.equal(affirm.drawContainer,affirm.transportContainer,'Affirm uses its original kit for submission');
 const affirmPlan=plan(h,[affirm]);
 assert.equal(affirmPlan.submission.reduce((n,item)=>n+item.count,0),1,'one Affirm collection kit is submitted');
 for(const code of ['523','39625','1648','14962','11362']){
   assert.equal(byCode.get(code)?.status,'active',code);
 }
 const active=h.database.filter(t=>t.status==='active');
 const unsupported=active.filter(t=>{
  const mandatory=[t.drawContainer,t.transportContainer,...(t.additionalDrawRequirements||[]).flatMap(x=>[x.container,x.transportContainer])].join(' ');
  return /6\s*N\s*HCl|acid[- ]preserv(?:ed|ative)?\s+urine|HCl[- ]preserv|aptima[^,;]{0,100}green[- ]label|\binsure\b/i.test(mandatory);
 });
 assert.equal(unsupported.length,0);
});
test('All three HIAA workflows use only unpreserved Frozen sterile containers and do not add acid',async()=>{
 const h=await calculator();const byCode=new Map(h.database.map(t=>[t.testCode,t]));
 for(const code of ['523','39625','1648']){
  const t=byCode.get(code);assert.equal(t.status,'active');
  assert.equal(t.transportTemperature,'Frozen');
  assert.equal(t.transportContainer,'Sterile cup');
  assert.match(t.specialInstructions,/pH is 6 or below/i);
  assert.doesNotMatch(t.drawContainer+' '+t.transportContainer,/6\s*N\s*HCl|acid-preserv/i);
  const p=plan(h,[t]);
  assert.equal(p.submission.reduce((a,b)=>a+b.count,0),1);
  assert.ok(p.bags.every(b=>b.key.includes('frozen')));
 }
});
test('Same sterile-cup inventory for urine, stool, CSF and sputum, but different physical specimens stay separate',async()=>{
 const h=await calculator();const byCode=new Map(h.database.map(t=>[t.testCode,t]));
 const selected=['396','1304','70028','4556'].map(code=>byCode.get(code));
 assert.ok(selected.every(Boolean));
 assert.ok(selected.every(t=>h.canonicalCollectionContainer(t).label==='Sterile cup'));
 assert.deepEqual(Array.from(selected,x=>h.collectionSpecimenGroupForTest(x)),
    ['urine','stool','csf','sputum']);
 const p=plan(h,selected);
 const cups=p.collection.filter(item=>item.label==='Sterile cup');
 assert.equal(cups.length,1);
 assert.equal(cups[0].count,4);
 assert.match(cups[0].detail,/NEVER mix urine, stool, CSF and sputum/);
 assert.equal(p.submission.filter(item=>item.label==='Sterile cup').reduce((n,x)=>n+x.count,0),4);
 assert.equal(new Set(p.submission.filter(item=>item.label==='Sterile cup').map(item=>item.key)).size,4);
 assert.equal(h.buildDrawGroups(p.ex).filter(group=>group.container==='Sterile cup').length,1);
 assert.equal(byCode.get('70028').transportTemperature,'Room Temperature');
 assert.equal(byCode.get('4556').transportTemperature,'Refrigerated');
});
test('Paired Lyme test uses a separate original sterile CSF cup and an independently transferred serum tube',async()=>{
 const h=await calculator();const t=h.database.find(t=>t.testCode==='34194');
 assert.ok(t);const p=plan(h,[t]);
 assert.equal(p.ex.length,2);
 assert.equal(p.ex.find(x=>x.specimenType==='CSF').drawContainer,'Sterile cup');
 assert.ok(p.collection.some(x=>x.label==='Sterile cup' && x.count===1));
 assert.ok(p.submission.some(x=>x.label==='Sterile cup' && x.count===1));
 assert.ok(p.submission.some(x=>/serum/i.test(x.label) && x.count===1));
});
