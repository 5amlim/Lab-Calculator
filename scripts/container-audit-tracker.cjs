'use strict';
// Container-only audit. Observes live normalized records and actual planner outputs.
// No changes to runtime, labels, stock aliases, or collection policies.
const {createHash}=require('node:crypto');
const {readFileSync,existsSync,mkdirSync,writeFileSync}=require('node:fs');
const {join}=require('node:path');
const str=v=>String(v??'').trim();
const norm=v=>str(v).toLowerCase().replace(/\s+/g,' ');
const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
const total=items=>items.reduce((s,i)=>s+Number(i.count),0);
const unknown=v=>!str(v)||/^(?:verify|unknown|not specified|do not collect|n\/?a)(?:\b|$)/i.test(str(v));
const containerFields=['drawContainer','transportContainer','alternativeContainer','additionalDrawRequirements','specimenType','spin','collectionCount','submissionCount','preferredVolume','minimumVolume','transportTemperature','transportTemperatureRaw','stability','specialLabeling','specialInstructions'];
const approvalFields=['collection','submission','specimen/additive','processing','temperature','counts/capacity','alternatives/additional routes','regional acceptance'];
function routeView(r,api){
  const draw=str(r.drawContainer??r.container);
  const transport=str(r.transportContainer);
  return {specimen:str(r.specimenType),draw,alternative:str(r.alternativeContainer),transport,
    effectiveTransport:api?str(api.finalTransportContainer(r)):transport,
    temperature:str(r.transportTemperature),spin:str(r.spin),preferred:str(r.preferredVolume),
    minimum:str(r.minimumVolume),drawCount:r.collectionCount??null,submitCount:r.submissionCount??null,
    transportOnly:!!r.transportOnly,original:api?!!api.isOriginalContainerSubmission(r):null,
    labeling:str(r.specialLabeling),purpose:str(r.purpose)};
}
function rawRoutes(row){
  return [row,...(row.additionalDrawRequirements||[]).map(r=>({...r,
    drawContainer:r.container||r.drawContainer,specimenType:r.specimenType||row.specimenType,
    transportContainer:r.transportContainer||row.transportContainer,
    transportTemperature:r.transportTemperature||row.transportTemperature,spin:r.spin||row.spin}))];
}
function riskChecks(route){
  const result=[];
  const {draw,transport,effectiveTransport,specimen,spin,temperature,transportOnly}=route;
  const d=norm(draw),s=norm(specimen),t=norm(transport),e=norm(effectiveTransport);
  const add=(code,detail)=>result.push({code,detail});
  if(!transportOnly&&unknown(draw))add('unknown-collection-container',draw);
  if(unknown(transport))add('submission-container-fallback',transport+' => '+effectiveTransport);
  if(!specimen)add('missing-specimen','');
  if(!/^(room temperature|refrigerated|frozen|mixed)$/i.test(temperature))add('temperature-review',temperature);
  if(s==='whole blood'&&/^yes$/i.test(spin))add('whole-blood-spin-review',draw+' => '+effectiveTransport);
  // Narrow, unambiguous single-material checks; flags are review items, not automatic fixes.
  if(s==='serum'&&/\b(?:edta|citrate|heparin|fluoride|oxalate)\b/.test(d)&&!/\bor\b|\/.*red top/.test(d))
    add('serum-anticoagulant-review',draw);
  if((s==='plasma'||s==='whole blood')&&/\bsst\b|serum separator/.test(d)&&!/\bor\b/.test(d))
    add('anticoagulated-specimen-sst-review',draw);
  const labels=d+' | '+t;
  if(/\b(?:thinprep|preservcyt|surepath|streck|insure)\b/.test(labels)
      ||/aptima[^|]*green[\s-]*label|green[\s-]*label[^|]*aptima/.test(labels)
      ||/\b(?:microscope slide|prepared slide|prepared smear|slide carrier)\b/.test(labels)
      ||/^(?:hair|nail|hair specimen|nail specimen)$/.test(s))
    add('excluded-container-review',labels);
  // Negative preservative labels (e.g. Quest 229 "no HCl") are not
  // acid-preserved routes. Remove only explicitly negated terms, per vessel,
  // so an acid-containing submission still triggers review.
  const acidTerms=/(?:\bhcl\b|hydrochloric acid|acid[- ]preserved|acid preservative|6n acid)/;
  const withoutNegatedAcid=v=>v.replace(/\b(?:no|without|free of|not using)\s+(?:added\s+)?(?:6n\s+)?(?:hcl\b|hydrochloric acid\b|acid preservative\b|acid[- ]preserved\b|6n acid\b)/g,'');
  if(/\burine\b/.test(s)&&[d,t].some(v=>acidTerms.test(withoutNegatedAcid(v))))
    add('acid-preserved-urine-review',labels);
  // Distinct swab families must not be silently substituted. Only compare explicit families.
  function swabFamily(v){
    if(/\baptima\b/.test(v))return 'aptima';
    if(/\baffirm\b/.test(v))return 'affirm';
    if(/\beswab\b|\bamies\b/.test(v))return 'amies';
    if(/\butm\b|\bvtm\b|viral transport|universal transport/.test(v))return 'viral-medium';
    if(/\bdry\b.*\bswab\b|\bswab\b.*\bdry\b/.test(v))return 'dry';
    return '';
  }
  const a=swabFamily(d),b=swabFamily(e);
  if(/swab/.test(s)&&a&&b&&a!==b&&!/\bor\b/.test(d)&&!/\bor\b/.test(e))
    add('swab-family-mismatch-review',draw+' => '+effectiveTransport);
  if(/microtainer/.test(d)&&route.original&&!/microtainer/.test(e)&&!/\boriginal\b/.test(e))
    add('microtainer-original-label-review',draw+' => '+effectiveTransport);
  return result;
}
function evidenceStatus(row,lab,signature,evidence,approvals){
  const key=lab+':'+row.testCode;
  const e=evidence[key];
  const approval=approvals[lab+':'+row.testCode+':'+row.id];
  if(row.collectionReview)return 'held';
  // Strict full verification: exact normalized route + actual plan fingerprint,
  // evidence URL(s), date, reviewer and all required container dimensions.
  if(approval&&approval.fingerprint===signature&&approval.reviewer&&approval.date&&
     Array.isArray(approval.sources)&&approval.sources.some(s=>/^https:\/\//i.test(s))&&
     approvalFields.every(field=>approval.fields?.includes(field)))return 'verified';
  if(approval)return 'stale-or-incomplete-approval';
  if(e&&/unavailable|inaccessible/i.test(e.status))return 'source-unavailable';
  if(e&&Object.keys(e.fields||{}).some(k=>containerFields.includes(k)))return 'partial-evidence';
  return 'pending';
}
const viewItem=i=>({label:str(i.label),count:Number(i.count),original:!!i.originalTube,detail:str(i.detail),outputSpecimenType:str(i.outputSpecimenType)});
function assess({lab,row,api,expanded,bags,physicalCollection,physicalSubmission,printedTotal,error,evidence={},approvals={}}){
  const held=!!row.collectionReview;
  const routes=(expanded?.length?expanded:rawRoutes(row)).map(r=>routeView(r,held?null:api));
  const risks=held?[]:routes.flatMap((route,index)=>riskChecks(route).map(r=>({...r,route:index})));
  const failures=[];
  const fail=(code,detail='')=>failures.push({code,detail});
  if(error)fail('planner-exception',String(error.message||error));
  if(held){
    if(error||!expanded||expanded.length||bags?.length||physicalCollection?.length||physicalSubmission?.length)fail('held-order-produces-plan');
  }else if(!error){
    if(!expanded?.length)fail('no-expanded-routes');
    if(expanded?.length!==1+(row.additionalDrawRequirements||[]).length)fail('additional-route-count-mismatch');
    const items=[...(physicalCollection||[]),...(physicalSubmission||[])];
    if(items.some(i=>!Number.isSafeInteger(Number(i.count))||Number(i.count)<1))fail('invalid-physical-container-count');
    if(items.some(i=>!str(i.label)))fail('missing-physical-label');
    if(!physicalCollection?.length&&!row.transportOnly)fail('no-collection-plan');
    if(!physicalSubmission?.length)fail('no-submission-plan');
    if(total(physicalSubmission||[])!==printedTotal)fail('print-count-mismatch');
  }
  const outputs={collection:(physicalCollection||[]).map(viewItem),submission:(physicalSubmission||[]).map(viewItem),
    bags:(bags||[]).map(b=>({label:str(b.label),key:str(b.key)}))};
  // The clinical fingerprint includes instructions, alternatives and counts.
  // The grouping signature omits free-text notes to group like container mappings.
  const fingerprint=hash({lab,record:Object.fromEntries(containerFields.map(k=>[k,row[k]??null])),routes,outputs});
  const group=hash({lab,routes:routes.map(({labeling,purpose,...r})=>r),
    collection:outputs.collection.map(({detail,...r})=>r),submission:outputs.submission.map(({detail,...r})=>r),
    bags:outputs.bags});
  return {lab,code:str(row.testCode),id:str(row.id),name:str(row.testName),disposition:held?'held':'active',
    structural:failures.length?'fail':held?'hold-pass':risks.length?'review':'pass',
    clinical:evidenceStatus(row,lab,fingerprint,evidence,approvals),fingerprint,group,routes,outputs,risks,failures,
    evidenceSource:evidence[lab+':'+row.testCode]?.url||'',holdReason:str(row.collectionReview)};
}
function readOptional(path,fallback){return existsSync(path)?JSON.parse(readFileSync(path,'utf8')):fallback;}
function loadEvidence(root){return {evidence:readOptional(join(root,'audits/master/FIELD_EVIDENCE.json'),{}),approvals:readOptional(join(root,'audits/master/CONTAINER_ROUTE_VERIFICATION.json'),{})};}
function summarize(rows){
  const counts=(key)=>rows.reduce((m,r)=>(m[r[key]]=(m[r[key]]||0)+1,m),{});
  const structural=counts('structural'),clinical=counts('clinical');
  const n=rows.length,pct=v=>n?Number((100*v/n).toFixed(2)):0;
  const riskCounts={};for(const r of rows)for(const issue of [...r.risks,...r.failures])riskCounts[issue.code]=(riskCounts[issue.code]||0)+1;
  return {orders:n,structural,clinical,structuralCoveragePct:pct(n),
    structuralPassPct:pct((structural.pass||0)+(structural['hold-pass']||0)),
    clinicalVerifiedPct:pct(clinical.verified||0),
    clinicalEvidenceCoveragePct:pct((clinical.verified||0)+(clinical['partial-evidence']||0)+(clinical['source-unavailable']||0)+(clinical['stale-or-incomplete-approval']||0)),
    routeCount:rows.reduce((n,r)=>n+r.routes.length,0),alternativeRoutes:rows.reduce((n,r)=>n+r.routes.filter(x=>x.alternative).length,0),
    distinctGroups:new Set(rows.map(r=>r.group)).size,riskCounts};
}
function writeReports(out,rows,meta){
  mkdirSync(out,{recursive:true});
  const write=(name,v)=>writeFileSync(join(out,name),JSON.stringify(v,null,2)+'\n');
  const quote=v=>'"'+String(v??'').replaceAll('"','""')+'"';
  const columns=['lab','code','id','name','disposition','structural','clinical','fingerprint','group','routeCount','collection','submission','riskCodes','failureCodes','evidenceSource','holdReason'];
  const csv=rows.map(r=>{const v={...r,routeCount:r.routes.length,collection:JSON.stringify(r.outputs.collection),submission:JSON.stringify(r.outputs.submission),riskCodes:r.risks.map(x=>x.code).join('; '),failureCodes:r.failures.map(x=>x.code).join('; ')};return columns.map(k=>quote(v[k])).join(',');});
  writeFileSync(join(out,'CONTAINER_AUDIT_ORDERS.csv'),[columns.join(','),...csv].join('\n')+'\n');
  write('CONTAINER_AUDIT_DETAILS.json',rows);
  const groups=new Map();for(const r of rows){if(!groups.has(r.group))groups.set(r.group,{group:r.group,lab:r.lab,routes:r.routes,outputs:r.outputs,orders:[]});groups.get(r.group).orders.push({code:r.code,id:r.id,structural:r.structural,clinical:r.clinical});}
  write('CONTAINER_AUDIT_GROUPS.json',[...groups.values()]);
  const summary={scope:'All active normalized runtime records, including collection-review holds; default calculator stock mode. Alternatives inventoried, not independently executed.',complete:meta.complete,expectedLabs:['quest','labcorp'],observedLabs:meta.observedLabs,byLab:Object.fromEntries(meta.observedLabs.map(l=>[l,summarize(rows.filter(r=>r.lab===l))])),combined:summarize(rows),
    limitations:['Structural checks and review heuristics do not prove vendor correctness.','Clinical verification requires exact-code evidence and fingerprint-bound approval of all container dimensions. Held orders remain in denominator.','Regional and local stock capacity must be confirmed separately. Existing mixed-cart and forced-rule tests run independently.','Inactive/reference-only records are excluded from active-order denominator.']};
  write('CONTAINER_AUDIT_PROGRESS.json',summary);
  console.log('CONTAINER_AUDIT_PROGRESS '+JSON.stringify(summary));
  return summary;
}
module.exports={assess,riskChecks,evidenceStatus,summarize,writeReports,loadEvidence,approvalFields};
