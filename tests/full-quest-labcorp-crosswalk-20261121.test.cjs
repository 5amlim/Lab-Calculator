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
 assert.ok(html.includes('labcorp-crosswalk-data.js?v=14'));
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
      ['801340',['801340','Sinemet','','','',0,'','active',[],[]]],
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
    refreshOutputHints(){},renderCart(){},syncConverterScroll(){}
  };
  vm.runInNewContext(converterFunction+'\nupdateConverter();',ctx);
  return ctx;
}
test('unmatched LabCorp row keeps its visual position ahead of a matched Quest code',()=>{
  const state=convertFixture('809523\n005215');
  assert.equal(state.converterOutput.value,'\n809\n');
  assert.equal(state.emptyOutputHints.get(0),'No match for 809523 · Lithium, Urine');
  assert.deepEqual(Array.from(state.cartCandidateCodes),['809']);
});
test('a known unmatched LabCorp test shows its code and name on the aligned ghost row',()=>{
  const state=convertFixture('005215\n801340');
  assert.equal(state.converterOutput.value,'809\n\n');
  assert.equal(state.emptyOutputHints.get(1),'No match for 801340 · Sinemet');
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).join('\n'),'809');
  assert.deepEqual(Array.from(state.cartCandidateCodes),['809']);
});
test('unknown input still displays a code-only no-match hint',()=>{
  const state=convertFixture('999999');
  assert.equal(state.emptyOutputHints.get(0),'No match for 999999');
});
test('unmatched last row is ghosted without entering copied code values',()=>{
  const state=convertFixture('005215\n809523');
  assert.equal(state.converterOutput.value,'809\n\n');
  assert.equal(state.emptyOutputHints.get(1),'No match for 809523 · Lithium, Urine');
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).join('\n'),'809');
});
test('a matching output ends with an editable blank row without affecting code counts',()=>{
  const state=convertFixture('005215');
  assert.equal(state.converterOutput.value,'809\n');
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).length,1);
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).join('\n'),'809');
});
test('single unmatched entry hides overlapping placeholder and keeps destination empty',()=>{
  const state=convertFixture('809523');
  assert.equal(state.converterOutput.value,'');
  assert.equal(state.converterOutput.placeholder,'');
  assert.equal(state.emptyOutputHints.get(0),'No match for 809523 · Lithium, Urine');
});
test('manual code and multiple candidate codes survive line-aligned conversion',()=>{
  const state=convertFixture('809523\n123456\n005215',['908']);
  assert.equal(state.converterOutput.value,'\n201\n809\n223\n908\n');
  assert.equal(state.emptyOutputHints.get(0),'No match for 809523 · Lithium, Urine');
  assert.deepEqual(Array.from(state.cartCandidateCodes),['201','223','809']);
});


test('converter panes mirror row scrolling in both directions without feedback loops',()=>{
  const source=converterUI;
  const start=source.indexOf('    const mirroredScroll=new WeakMap();');
  const end=source.indexOf('    const outputPlaceholder=converterOutput.placeholder;',start);
  assert.ok(start>=0&&end>start,'Linked converter scroll helper exists');
  const callbacks={};
  const pane=key=>({
    scrollTop:0,
    scrollHeight:920,
    clientHeight:300,
    addEventListener(event,handler){callbacks[key+':'+event]=handler;}
  });
  const left=pane('left'),right=pane('right');
  const ctx={converterInput:left,converterOutput:right};
  vm.runInNewContext(source.slice(start,end),ctx);
  left.scrollTop=140;
  callbacks['left:scroll']();
  assert.equal(right.scrollTop,140,'Scrolling source follows in destination');
  callbacks['right:scroll']();
  assert.equal(left.scrollTop,140,'Mirrored event does not bounce back');
  right.scrollTop=240;
  callbacks['right:scroll']();
  assert.equal(left.scrollTop,240,'Scrolling destination follows in source');
  callbacks['left:scroll']();
  assert.equal(right.scrollTop,240,'Mirrored event is ignored');
  left.scrollTop=310;
  callbacks['left:scroll']();
  assert.equal(right.scrollTop,310,'Further scrolling still works');
});
test('both converter code editors have one visual row per source line',()=>{
  for(const page of ['index.html','labcorp.html']){
    const html=fs.readFileSync(page,'utf8');
    for(const id of ['crosswalkQuestInput','crosswalkLabcorpOutput']){
      assert.match(html,new RegExp('<textarea[^>]*id="'+id+'"[^>]*wrap="off"'),
        'No wrapping in '+page+' '+id);
    }
  }
  const helper=fs.readFileSync('assets/js/batch-inline-hints.js','utf8');
  assert.ok(helper.includes("textarea.wrap === 'off' ? 'pre' : 'pre-wrap'"));
});
test('comparison controls remain compact if an older stylesheet is cached',()=>{
  for(const page of ['index.html','labcorp.html']){
    const html=fs.readFileSync(page,'utf8');
    assert.match(html,/<style id="crosswalk-comparison-layout-guard">/,page+' has a local layout fallback');
    assert.match(html,/<div class="crosswalk-search-control"><svg width="17" height="17"/,
      page+' uses a compact search icon');
    assert.match(html,/<button type="button" id="labcorpCrosswalkExport"[^>]*><svg width="16" height="16"/,
      page+' uses a compact export icon');
    assert.ok(html.includes('max-width:1050px'),page+' has responsive comparison filters');
    assert.ok(html.includes('#convertTestsView .crosswalk-row-links'),
      page+' keeps external links on separate lines');
    assert.equal((html.match(/id="labcorpCrosswalkStatus"/g)||[]).length,1);
    assert.equal((html.match(/id="labcorpCrosswalkSearch"/g)||[]).length,1);
    assert.equal((html.match(/id="labcorpCrosswalkExport"/g)||[]).length,1);
  }
});

/* November 21 additional cross-references: candidate codes remain suggestions,
   while near-matches with variant panels/methods stay review-only. */
const expandedCandidates={
  '36592':'120980','28882':'001321','15043':'006643','29812':'001875',
  '29816':'146010','37579':'819195','37580':'819198','38482':'602756',
  '34964':'828387','19895':'833376','5022':'830811','5042':'121186',
  '11014':'001248','10214':'724195','10217':'081034','10240':'007245',
  '10242':'085340','10254':'085324','10186':'138230','14163':'139490',
  '14013':'188026','14577':'180026','7903':'209601','16283':'832599',
  '38928':'007441','298':'004648','3138':'790650','1744':'348237',
  '19583':'006505','37438':'140120','11294':'512143','18718':'817203',
  '14679':'512116','24629':'001495','2744':'806168','34918':'605526',
  '59200':'828257','59202':'828263','59203':'828265','17560':'827149'
};
test('additional candidate mappings use active LabCorp codes and compatible specimen types',()=>{
  const labByCode=new Map(indexedLab.map(l=>[l[0],l]));
  assert.equal(Object.keys(expandedCandidates).length,40);
  for(const [questCode,labCode] of Object.entries(expandedCandidates)){
    const r=byQuest.get(questCode),l=labByCode.get(labCode);
    assert.ok(r,'Quest active code '+questCode);
    assert.ok(l,'LabCorp active code '+labCode);
    assert.equal(r[3],labCode,'Mapped code for Quest '+questCode);
    assert.equal(r[2].toLowerCase(),l[2].toLowerCase(),'Specimen type for Quest '+questCode);
    assert.ok(!r[8],'Mapped row must not also be review-only');
  }
});
test('review-only alternatives are visible but never automatically converted',()=>{
  for(const [questCode,labCode] of [
    ['38631','899048'],['38621','899035'],['92473','481020'],
    ['16869','481630'],['14852','337877'],['91278','737740'],
    ['250','007204'],['250','007205'],['16846','002006'],
    ['19546','503640'],['2371','602880'],['19110','334943']
  ]){
    const row=byQuest.get(questCode);
    assert.ok(row,'Quest '+questCode);
    assert.equal(row[3],'','Review-only Quest '+questCode);
    assert.ok(row[8]?.some(l=>l[0]===labCode),questCode+' review contains '+labCode);
  }
  assert.equal(byQuest.get('637')[3],'','Ambiguous mercury urine test must remain review-only');
  assert.equal(byQuest.get('2569')[3],'','IgE must not become IgG');
  assert.equal(byQuest.get('10120')[3],'','Protected non-equivalent stays unmapped');
});


test('workbook mappings load from LabCorp index even without LabCorp SEED_TESTS',()=>{
  // Reproduce the Quest page: its seed database belongs to Quest, so the
  // workbook lookup must run again after the LabCorp search index arrives.
  // The original rows contain an already-applied workbook mapping in this
  // test suite, so build an isolated baseline from the raw crosswalk file.
  const bare={window:{SEED_TESTS:[]}};
  vm.runInNewContext(source,bare);
  vm.runInNewContext(fs.readFileSync('labcorp-quest-workbook-crosswalk-overrides.js','utf8'),bare);
  const before=bare.window.QUEST_TO_LABCORP_INDEX.filter(r=>r[7]==='active');
  const beforeCount=new Set(before.filter(r=>r[3]).map(r=>r[3])).size;
  assert.equal(beforeCount,875,'Baseline unique LabCorp links before workbook loading');
  assert.equal(typeof bare.window.applyQuestLabcorpWorkbookMatches,'function');
  bare.window.applyQuestLabcorpWorkbookMatches(indexedLab);
  const activeAfter=bare.window.QUEST_TO_LABCORP_INDEX.filter(r=>r[7]==='active');
  const linked=activeAfter.filter(r=>r[3]);
  assert.equal(linked.length,1040);
  assert.equal(new Set(linked.map(r=>r[3])).size,1004);
  assert.equal(activeAfter.find(r=>r[0]==='637')[3],'','Protected mercury exception');
});

test('badge counts active LabCorp links after workbook is applied',()=>{
  const ui=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
  assert.ok(ui.includes('window.applyQuestLabcorpWorkbookMatches?.(index.tests)'));
  assert.ok(ui.indexOf('window.applyQuestLabcorpWorkbookMatches?.(index.tests)') <
    ui.indexOf('reverse=buildReverse(index)'));
  assert.ok(ui.includes('new Set(questActive.filter(r=>r[3]).map(r=>String(r[3]))).size'));
});
