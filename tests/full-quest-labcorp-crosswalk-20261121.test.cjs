'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {test}=require('node:test');
const source=fs.readFileSync('labcorp-crosswalk-data.js','utf8');
const indexedQuest=JSON.parse(fs.readFileSync('assets/search/quest-tests.json','utf8')).tests;
const indexedLab=JSON.parse(fs.readFileSync('assets/search/labcorp-tests.json','utf8')).tests;
const ctx={window:{SEED_TESTS:indexedLab.map(x=>({testCode:x[0],testName:x[1]}))}};
vm.runInNewContext(source,ctx);
vm.runInNewContext(fs.readFileSync('labcorp-quest-workbook-crosswalk-overrides.js','utf8'),ctx);
const rows=Array.from(ctx.window.QUEST_TO_LABCORP_INDEX);
const active=rows.filter(r=>r[7]==='active');
const legacy=rows.filter(r=>r[7]==='legacy');
const uncoded=rows.filter(r=>r[0]==='XXX');
const byQuest=new Map(active.map(r=>[r[0],r]));
const labcodes=new Set(indexedLab.map(r=>r[0]));
test('every current active Quest code occurs exactly once in crosswalk',()=>{
 assert.equal(indexedQuest.length,3313);
 assert.equal(active.length,indexedQuest.length);
 assert.equal(new Set(active.map(r=>r[0])).size,indexedQuest.length);
 for(const q of indexedQuest)assert.ok(byQuest.has(q[0]),'Missing Quest '+q[0]);
 assert.equal(legacy.length,8);
 assert.equal(uncoded.length,16);
});
test('every current LabCorp code can be represented by the reverse full-index view',()=>{
 assert.equal(indexedLab.length,6015);
 assert.equal(labcodes.size,indexedLab.length);
 for(const r of rows)if(r[3])assert.ok(labcodes.has(String(r[3])),'Unknown LabCorp '+r[3]);
});
test('historical flags and dangerous mismatches are preserved',()=>{
 const q=c=>byQuest.get(c);
 assert.equal(q('8181')[3],'102525');
 assert.equal(q('2569')[3],'');
 assert.equal(q('10120')[3],'');
 assert.equal(q('15319')[3],'133440');
 assert.equal(q('637')[3],'');
 assert.equal(q('229')[3],'004291');
 assert.equal(q('497')[3],'008540');
 assert.equal(q('15060')[3],'004650');
 assert.ok(legacy.some(r=>r[0]==='36562'&&r[5]===1));
});
test('review names are not misreported as approved mappings',()=>{
 for(const r of rows){assert.ok(r.length<=9);
  if(r[8]){assert.ok(Array.isArray(r[8]));assert.ok(!r[3]);
   for(const cand of r[8])assert.ok(labcodes.has(String(cand[0])));
  }
 }
 assert.ok(!/drawContainer|transportContainer|preferredVolume|SEED_TESTS\.push/.test(source));
});
test('bidirectional interface has both catalog views and CSV exports',()=>{
 const ui=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
 const html=fs.readFileSync('labcorp.html','utf8');
 for(const fragment of ['labcorpCrosswalkDirection','buildReverse','labcorp-to-quest-all-6015.csv','quest-to-labcorp-all-3313.csv'])
   assert.ok(ui.includes(fragment)||html.includes(fragment),fragment);
 assert.ok(html.includes('labcorp-crosswalk-data.js?v=13'));
});

/* Converter alignment regression: ghost labels are not submitted or copied. */
const converterUI=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
const converterBegin=converterUI.indexOf('    function updateConverter(){');
const converterEnd=converterUI.indexOf("    converterInput.addEventListener('input'",converterBegin);
assert.ok(converterBegin>=0&&converterEnd>converterBegin,'Converter entry point is present');
const converterFunction=converterUI.slice(converterBegin,converterEnd);
function convertFixture(input,manual=[]){
  const ctx={
    isQuestPage:true,fromLab:'LabCorp',toLab:'Quest',
    normalize:s=>String(s).toLowerCase().trim(),
    questByCode:new Map([
      ['809523',['809523','Lithium, Urine','','','',0,'','active',[],[]]],
      ['005215',['005215','Erythrocyte Sedimentation Rate','','809','Sed Rate',0,'','active',[],['809']]],
      ['123456',['123456','Example multi-candidate','','201','',0,'','active',[],['201','223']]],
      ['000111',['000111','Shared destination','','809','',0,'','active',[],['809']]]
    ]),
    questByName:new Map(),
    converterInput:{value:input},
    converterOutput:{value:'',placeholder:'Matching Quest codes'},
    outputPlaceholder:'Matching Quest codes',
    converterWarning:{hidden:true,textContent:''},
    emptyOutputHints:new Map(),
    manualOutputCodes:new Set(manual),
    cartCandidateCodes:[],matchFeedback:[],actionFeedback:'',
    refreshOutputHints(){},renderCart(){}
  };
  vm.runInNewContext(converterFunction+'\nupdateConverter();',ctx);
  return ctx;
}
test('unmatched LabCorp row keeps its visual position ahead of a matched Quest code',()=>{
  const state=convertFixture('809523\n005215');
  assert.equal(state.converterOutput.value,'\n809');
  assert.equal(state.emptyOutputHints.get(0),'No match for 809523');
  assert.deepEqual(Array.from(state.cartCandidateCodes),['809']);
});
test('unmatched last row is ghosted without entering copied code values',()=>{
  const state=convertFixture('005215\n809523');
  assert.equal(state.converterOutput.value,'809\n');
  assert.equal(state.emptyOutputHints.get(1),'No match for 809523');
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).join('\n'),'809');
});
test('single unmatched entry hides overlapping placeholder and keeps destination empty',()=>{
  const state=convertFixture('809523');
  assert.equal(state.converterOutput.value,'');
  assert.equal(state.converterOutput.placeholder,'');
  assert.equal(state.emptyOutputHints.get(0),'No match for 809523');
});
test('manual code and multiple candidate codes survive line-aligned conversion',()=>{
  const state=convertFixture('809523\n123456\n005215',['908']);
  assert.equal(state.converterOutput.value,'\n201\n809\n223\n908');
  assert.equal(state.emptyOutputHints.get(0),'No match for 809523');
  assert.deepEqual(Array.from(state.cartCandidateCodes),['201','223','809']);
});
