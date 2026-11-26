'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {assess,summarize,approvalFields}=require('../scripts/container-audit-tracker.cjs');
const row={id:'fixture',testCode:'123',testName:'Example',status:'active',specimenType:'Serum',drawContainer:'SST / Gold',transportContainer:'Transport Tube',transportTemperature:'Room Temperature',spin:'Yes'};
const api={finalTransportContainer:r=>r.transportContainer,isOriginalContainerSubmission:()=>false};
const inputs={lab:'quest',row,api,expanded:[row],bags:[{label:'Room Temperature',key:'room'}],physicalCollection:[{label:'SST / Gold',count:1}],physicalSubmission:[{label:'Transport Tube',count:1}],printedTotal:1};
test('container tracker distinguishes structure, partial evidence and strict clinical approval',()=>{
  const r=assess(inputs);assert.equal(r.structural,'pass');assert.equal(r.clinical,'pending');
  const e={'quest:123':{url:'https://example.org/test/123',fields:{drawContainer:{evidence:'SST'}}}};
  assert.equal(assess({...inputs,evidence:e}).clinical,'partial-evidence');
  const key='quest:123:fixture';
  const approval={fingerprint:r.fingerprint,reviewer:'Reviewer',date:'2026-11-26',sources:['https://example.org/test/123'],fields:approvalFields};
  const approvals={[key]:approval};
  assert.equal(assess({...inputs,approvals}).clinical,'verified');
  assert.equal(assess({...inputs,approvals:{[key]:{...approval,fields:['collection']}}}).clinical,'stale-or-incomplete-approval');
  assert.equal(assess({...inputs,printedTotal:2}).structural,'fail');
  const changed={...row,transportContainer:'Different tube'};
  assert.equal(assess({...inputs,row:changed,expanded:[changed],approvals}).clinical,'stale-or-incomplete-approval');
});
test('container tracker flags suspect mapping without rewriting it and counts held records separately',()=>{
  const wrong={...row,drawContainer:'Lavender EDTA'};
  const r=assess({...inputs,row:wrong,expanded:[wrong]});assert.equal(r.structural,'review');assert(r.risks.some(x=>x.code==='serum-anticoagulant-review'));assert.equal(wrong.drawContainer,'Lavender EDTA');
  const held=assess({...inputs,row:{...row,collectionReview:'Review required'},expanded:[],bags:[],physicalCollection:[],physicalSubmission:[],printedTotal:0});
  assert.equal(held.structural,'hold-pass');assert.equal(held.clinical,'held');
  const s=summarize([r,held]);assert.equal(s.orders,2);assert.equal(s.structuralPassPct,50);assert.equal(s.clinicalVerifiedPct,0);
});

test('acid-preservation detector honors no HCl without masking a positive acid route',()=>{
  const {riskChecks}=require('../scripts/container-audit-tracker.cjs');
  const route={specimen:'24-Hour Urine',draw:'24-Hour Urine Container (no HCl)',transport:'Sterile cup',effectiveTransport:'Sterile cup',temperature:'Room Temperature',spin:'No'};
  const hasAcid=r=>riskChecks(r).some(x=>x.code==='acid-preserved-urine-review');
  assert.equal(hasAcid(route),false);
  assert.equal(hasAcid({...route,draw:'24-Hour Urine Container (6N HCl)'}),true);
  assert.equal(hasAcid({...route,transport:'Transport tube with HCl',effectiveTransport:'Transport tube with HCl'}),true);
  assert.equal(hasAcid({...route,draw:'24-Hour Urine Container (without hydrochloric acid)'}),false);
  assert.equal(hasAcid({...route,draw:'24-Hour Urine Container (acid-preserved)'}),true);
});
