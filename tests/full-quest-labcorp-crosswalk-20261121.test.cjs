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
 assert.equal(new Set(indexedQuest.map(r=>r[0])).size,indexedQuest.length);
 assert.equal(ctx.window.QUEST_TO_LABCORP_METADATA.questActiveCount,indexedQuest.length);
 assert.equal(active.length,indexedQuest.length);
 assert.equal(new Set(active.map(r=>r[0])).size,indexedQuest.length);
 for(const q of indexedQuest)assert.ok(byQuest.has(q[0]),'Missing Quest '+q[0]);
 assert.equal(legacy.length,8);
 assert.equal(uncoded.length,16);
});
test('every current LabCorp code can be represented by the reverse full-index view',()=>{
 assert.equal(ctx.window.QUEST_TO_LABCORP_METADATA.labcorpActiveCount,indexedLab.length);
 assert.equal(labcodes.size,indexedLab.length);
 for(const r of rows)if(r[3])assert.ok(labcodes.has(String(r[3])),'Unknown LabCorp '+r[3]);
});
test('historical flags and dangerous mismatches are preserved',()=>{
 const q=c=>byQuest.get(c);
 assert.equal(q('10676')[3],'','Urine cytology stays unmapped pending manual directory review');
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
 for(const fragment of ['labcorpCrosswalkDirection','buildReverse',"'labcorp-to-quest-all-'+reverse.length+'.csv'","'quest-to-labcorp-all-'+rows.filter(r=>r[7]==='active').length+'.csv'"])
   assert.ok(ui.includes(fragment)||html.includes(fragment),fragment);
 const questHtml=fs.readFileSync('index.html','utf8');
 for(const page of [html,questHtml]){
   assert.match(page,/labcorp-crosswalk-data\.js\?v=[^"\s]+/);
   assert.match(page,/labcorp-crosswalk-ui\.js\?v=[^"\s]+/);
 }
});

/* Converter alignment regression: ghost labels are not submitted or copied. */
const converterUI=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
const converterBegin=converterUI.indexOf('    function updateConverter(){');
const converterEnd=converterUI.indexOf("    converterInput.addEventListener('input'",converterBegin);
assert.ok(converterBegin>=0&&converterEnd>converterBegin,'Converter entry point is present');
const converterFunction=converterUI.slice(converterBegin,converterEnd);
const alignmentBegin=converterUI.indexOf('    const alignmentPadding=new WeakMap();');
const alignmentEnd=converterUI.indexOf('    function syncConverterScroll(',alignmentBegin);
assert.ok(alignmentBegin>=0&&alignmentEnd>alignmentBegin,'Real pane alignment helpers are present');
const alignmentFunctions=converterUI.slice(alignmentBegin,alignmentEnd);
function fixturePane(value,placeholder=''){
  return {value,placeholder,scrollTop:0,clientHeight:96,selectionStart:0,selectionEnd:0,
    selectionDirection:'none',
    get scrollHeight(){return Math.max(this.clientHeight,this.value.split('\n').length*24)},
    setSelectionRange(start,end,direction){this.selectionStart=start;this.selectionEnd=end;this.selectionDirection=direction}
  };
}
function convertFixture(input,manual=[],chosen=[],questPage=true){
  const ctx={
    isQuestPage:questPage,fromLab:questPage?'LabCorp':'Quest',toLab:questPage?'Quest':'LabCorp',
    normalize:s=>String(s).toLowerCase().trim(),
    questByCode:new Map([
      ['809523',['809523','Lithium, Urine','','','',0,'','active',[],[]]],
      ['801340',['801340','Sinemet','','','',0,'','active',[],[]]],
      ['005215',['005215','Erythrocyte Sedimentation Rate','','809','Sed Rate',0,'','active',[],['809']]],
      ['123456',['123456','Example multi-candidate','','201','',0,'','active',[],['201','223']]],
      ['000111',['000111','Shared destination','','809','',0,'','active',[],['809']]]
    ]),
    questByName:new Map(),
    converterInput:fixturePane(input),
    converterOutput:fixturePane('','Matching Quest codes'),
    outputPlaceholder:'Matching Quest codes',
    converterWarning:{hidden:true,textContent:''},
    emptyOutputHints:new Map(),manualSourceHints:new Map(),
    generatedMatchRows:new Map(),
    generatedOutputRows:[],
    chosenMatches:new Map(chosen),
    manualOutputCodes:new Set(manual),
    cartCandidateCodes:[],matchFeedback:[],actionFeedback:'',
    refreshOutputHints(){},refreshManualSourceHints(){},refreshConverterHints(){},
    renderNoMatchActions(){},renderSourceEntryActions(){},
    renderCart(){},syncConverterScroll(){}
  };
  vm.runInNewContext('const mirroredScroll=new WeakMap();\n'+alignmentFunctions+'\n'+converterFunction+
    '\nupdateConverter(); logicalInput=logicalPaneValue(converterInput);',ctx);
  assert.equal(ctx.logicalInput,input,'Synthetic scroll padding must not alter logical input');
  assert.equal(ctx.converterInput.value.split('\n').length,ctx.converterOutput.value.split('\n').length,
    'Both panes must have equal native row counts');
  return ctx;
}
test('unmatched LabCorp row keeps its visual position ahead of a matched Quest code',()=>{
  const state=convertFixture('809523\n005215');
  assert.equal(state.converterOutput.value,'\n809\n');
  assert.equal(state.emptyOutputHints.get(0),'No match for "809523 · Lithium, Urine"');
  assert.deepEqual(Array.from(state.cartCandidateCodes),['809']);
});
test('a known unmatched LabCorp test shows its code and name on the aligned ghost row',()=>{
  const state=convertFixture('005215\n801340');
  assert.equal(state.converterOutput.value,'809\n\n');
  assert.equal(state.emptyOutputHints.get(1),'No match for "801340 · Sinemet"');
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).join('\n'),'809');
  assert.deepEqual(Array.from(state.cartCandidateCodes),['809']);
});
test('unknown input still displays a code-only no-match hint',()=>{
  const state=convertFixture('999999');
  assert.equal(state.emptyOutputHints.get(0),'No match for "999999"');
});
test('unmatched last row is ghosted without entering copied code values',()=>{
  const state=convertFixture('005215\n809523');
  assert.equal(state.converterOutput.value,'809\n\n');
  assert.equal(state.emptyOutputHints.get(1),'No match for "809523 · Lithium, Urine"');
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).join('\n'),'809');
});
test('a matching output ends with an editable blank row without affecting code counts',()=>{
  const state=convertFixture('005215');
  assert.equal(state.converterOutput.value,'809\n');
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).length,1);
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).join('\n'),'809');
});
test('single unmatched entry keeps an editable blank destination without adding a code',()=>{
  const state=convertFixture('809523');
  // A newline is intentional: it provides a blank editable Quest row while
  // ensuring the textarea's placeholder cannot cover the no-match ghost.
  assert.equal(state.converterOutput.value,'\n');
  assert.equal(state.converterOutput.value.split(/\n/).filter(Boolean).length,0);
  assert.deepEqual(Array.from(state.cartCandidateCodes),[]);
  assert.equal(state.emptyOutputHints.get(0),'No match for "809523 · Lithium, Urine"');
});
test('manual code and multiple candidate codes survive line-aligned conversion',()=>{
  const state=convertFixture('809523\n123456\n005215',['908']);
  assert.equal(state.converterOutput.value,'\n201\n809\n223\n908\n');
  assert.equal(state.emptyOutputHints.get(0),'No match for "809523 · Lithium, Urine"');
  assert.deepEqual(Array.from(state.cartCandidateCodes),['201','223','809']);
});


test('automated and manually chosen matches remain separately tracked from editable codes',()=>{
  const automatic=convertFixture('005215\n123456');
  assert.equal(automatic.generatedMatchRows.get(0).code,'809');
  assert.equal(automatic.generatedMatchRows.get(1).code,'201');
  assert.equal(automatic.generatedMatchRows.get(2).code,'223');
  assert.deepEqual(Array.from(automatic.cartCandidateCodes),['809','201','223']);

  const selected=convertFixture('809523',[],[['809523',{code:'201'}]]);
  assert.equal(selected.converterOutput.value,'201\n');
  assert.equal(selected.generatedMatchRows.get(0).code,'201');
  assert.equal(selected.generatedMatchRows.get(0).source,'809523');
  assert.deepEqual(Array.from(selected.cartCandidateCodes),['201']);
});

test('Quest-to-LabCorp output keeps matched and unmatched rows aligned',()=>{
  const state=convertFixture('005215\n809523',[],[],false);
  assert.equal(state.converterOutput.value,'809\n\n');
  assert.equal(state.generatedMatchRows.get(0).code,'809');
  assert.equal(state.emptyOutputHints.get(1),'No match for "809523 · Lithium, Urine"');
});
test('Quest-to-LabCorp manually chosen matches are separate from typed entries',()=>{
  const state=convertFixture('809523',[],[['809523',{code:'005215'}]],false);
  assert.equal(state.converterOutput.value,'005215\n');
  assert.equal(state.generatedMatchRows.get(0).code,'005215');
  assert.deepEqual(Array.from(state.cartCandidateCodes),['005215']);
});
test('LabCorp page has identical autocomplete, match protection and source removal hooks',()=>{
  const labPage=fs.readFileSync('labcorp.html','utf8');
  const questPage=fs.readFileSync('index.html','utf8');
  for(const page of [labPage,questPage]){
    assert.match(page,/id="crosswalkOutputAutocomplete"/);
    assert.match(page,/id="crosswalkOutputSuggestions"/);
    assert.match(page,/id="crosswalkLabcorpOutput"[^>]*role="combobox"/);
    assert.match(page,/id="crosswalkLabcorpOutput"[^>]*aria-controls="crosswalkOutputSuggestions"/);
  }
  const ui=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
  assert.match(ui,/const destinationCatalog=isQuestPage/);
  assert.match(ui,/const outputSuggestionItems=destinationCatalog\.map/);
  assert.match(ui,/isMatchedRow:\(index,code\)=>\s*generatedMatchRows\.get/);
  assert.match(ui,/onNoMatchAction:index=>openDestinationMatchDrawer\(index\)/);
  assert.match(ui,/const sourceActionLayer=sourceContainer\?document\.createElement/);
  assert.match(ui,/const drawer=outputContainer\?document\.createElement/);
  assert.match(ui,/if\(!match\)return false;/);
  assert.match(ui,/if\(row<=0\)return false;/);
  assert.doesNotMatch(ui,/if\(!isQuestPage\)initConverter\(\)/);
  assert.match(ui,/reverse=buildReverse\(index\);[\s\S]{0,180}try\{\s*initConverter\(\)/);
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
    assert.match(html,/@media\s*\(max-width:\s*1080px\)/,
      page+' has two-column responsive comparison filters');
    assert.match(html,/@media\s*\(max-width:\s*620px\)/,
      page+' has mobile single-column comparison filters');
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
    ['14852','337877'],['91278','737740'],
    ['250','007204'],['250','007205'],
    ['19110','334943']
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
  assert.ok(beforeCount>0&&beforeCount<indexedLab.length,'Baseline has indexed LabCorp links before workbook loading');
  assert.equal(typeof bare.window.applyQuestLabcorpWorkbookMatches,'function');
  bare.window.applyQuestLabcorpWorkbookMatches(indexedLab);
  const activeAfter=bare.window.QUEST_TO_LABCORP_INDEX.filter(r=>r[7]==='active');
  const linked=activeAfter.filter(r=>r[3]);
  assert.equal(linked.length,ctx.window.QUEST_TO_LABCORP_METADATA.questMatchedActive);
  assert.equal(new Set(linked.map(r=>r[3])).size,ctx.window.QUEST_TO_LABCORP_METADATA.labcorpMatched);
  assert.equal(activeAfter.find(r=>r[0]==='637')[3],'','Protected mercury exception');
});

test('both badges count the same active candidate relationships after workbook overrides',()=>{
  const ui=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
  assert.ok(ui.indexOf('window.applyQuestLabcorpWorkbookMatches?.(index.tests)') <
    ui.indexOf('reverse=buildReverse(index)'));
  const start=ui.indexOf("    const questActive=rows.filter(r=>sourceType(r)==='active');",ui.indexOf('  function render(){'));
  const end=ui.indexOf('    status.textContent=pending?',start);
  assert.ok(start>=0&&end>start);
  const code=ui.slice(start,end);
  const rows=[['1','','','100'],['2','','','100'],['3','','',''],['4','','','200']];
  const reverse=[{matches:[{code:'1',status:'suggested',source:'active'},{code:'2',status:'suggested',source:'active'},{code:'3',status:'review',source:'active'}]},{matches:[{code:'4',status:'suggested',source:'legacy'}]}];
  const counts=[];
  for(const isQuestPage of [true,false])for(const index of [null,reverse]){
    const context={rows,reverse:index,meta:{questMatchedActive:2,labcorpActiveCount:2},isQuestPage,summary:{},sourceType:r=>r[0]==='4'?'legacy':'active'};
    vm.runInNewContext(code,context);
    assert.match(context.summary.textContent,/ · 2 candidate matches$/);
    counts.push(context.summary.textContent);
  }
  assert.deepEqual(counts,['3 Quest tests · 2 candidate matches','3 Quest tests · 2 candidate matches','2 LabCorp tests · 2 candidate matches','2 LabCorp tests · 2 candidate matches']);
});


/* Sort comparison entries by match status, without hiding unmatched rows. */
const comparisonUI=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
const startStatus=comparisonUI.indexOf('  function sourceType(row){');
const endStatus=comparisonUI.indexOf('  function buildReverse(index){',startStatus);
const startRows=comparisonUI.indexOf('  function getRows(){');
const endRows=comparisonUI.indexOf('  function renderQuest(r){',startRows);
assert.ok(startStatus>=0&&endStatus>startStatus&&startRows>=0&&endRows>startRows);
const comparisonFunctions=comparisonUI.slice(startStatus,endStatus)+'\n'+comparisonUI.slice(startRows,endRows);
function comparisonFixture(directionValue,filterValue='all',searchValue=''){
  const q=[
    ['101','A unmatched','Urine','','',0,'','active'],
    ['102','B review','Serum','','',0,'','active',[['201','Related lab',85]]],
    ['103','C candidate','Serum','201','Matching lab',0,'','active'],
    ['104','D candidate','Urine','202','Second lab',0,'','active']
  ];
  const rev=[
    {code:'301',name:'A unmatched',specimen:'Urine',matches:[],status:'pending'},
    {code:'302',name:'B review',specimen:'Serum',matches:[{code:'102',name:'B review',status:'review'}],status:'review'},
    {code:'303',name:'C candidate',specimen:'Serum',matches:[{code:'103',name:'C candidate',status:'suggested'}],status:'suggested'},
    {code:'304',name:'D candidate',specimen:'Urine',matches:[{code:'104',name:'D candidate',status:'suggested'}],status:'suggested'}
  ];
  const ctx={
    rows:q,reverse:rev,filter:{value:filterValue},direction:{value:directionValue},
    search:{value:searchValue},
    rankDirectorySearch(query, row) {
      const code = row.code || row[0];
      const name = row.name || row[1];
      return code === query ? 2000 : name.toLowerCase() === query ? 1500 : 0;
    },
    normalize:s=>String(s??'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()
  };
  return Array.from(vm.runInNewContext(comparisonFunctions+'\ngetRows()',ctx));
}
test('LabCorp comparison lists candidates first, then reviews, then no matches',()=>{
  assert.deepEqual(comparisonFixture('labcorp').map(r=>r.code),['303','304','302','301']);
  assert.deepEqual(comparisonFixture('labcorp','pending').map(r=>r.code),['301']);
  assert.deepEqual(comparisonFixture('labcorp','suggested').map(r=>r.code),['303','304']);
  assert.deepEqual(comparisonFixture('labcorp','all','A unmatched').map(r=>r.code),['301']);
});
test('Quest comparison uses the same match-first ordering and keeps all filters',()=>{
  assert.deepEqual(comparisonFixture('quest').map(r=>r[0]),['103','104','102','101']);
  assert.deepEqual(comparisonFixture('quest','review').map(r=>r[0]),['102']);
  assert.deepEqual(comparisonFixture('quest','all','A unmatched').map(r=>r[0]),['101']);
});



/* 2026-11-22 candidate-only extension: known analyte/specimen pairs are indexed
   in both directions, but are never treated as verified clinical substitutes. */
test('2026-11-22 additional candidate equivalents preserve exact indexed codes',()=>{
  const added={
    '29493':'140293','5819':'143404','29256':'002303','26336':'323334',
    '17970':'505809','34298':'836455','16786':'183009','36735':'096933',
    '4485':'008169','663':'123377','4487':'182410','8575':'007163',
    '8576':'007154','91739':'143000','30762':'603194','93932':'167351',
    '12341':'167129','15334':'150031','7961':'302107','17667':'377036',
    '931':'070140','16290':'550430'
  };
  const labByCode=new Map(indexedLab.map(r=>[r[0],r]));
  for(const [quest,labcorp] of Object.entries(added)){
    const q=byQuest.get(quest),l=labByCode.get(labcorp);
    assert.ok(q,'Quest candidate missing: '+quest);
    assert.ok(l,'LabCorp candidate missing: '+labcorp);
    assert.equal(q[3],labcorp,'Unexpected LabCorp candidate for Quest '+quest);
    assert.equal(q[2],l[2],'Specimen discrepancy for Quest '+quest);
    assert.equal(q[4],l[1],'Indexed LabCorp name discrepancy for Quest '+quest);
    assert.ok(!q[8]?.length,'Accepted candidate cannot also be review-only: '+quest);
  }
  const meta=ctx.window.QUEST_TO_LABCORP_METADATA;
  assert.ok(meta.questMatchedActive>=1062,'Quest equivalent count not refreshed');
  assert.ok(meta.labcorpMatched>=1024,'LabCorp equivalent count not refreshed');
});
test('uncertain 2026-11-22 near matches remain informational, not automatically converted',()=>{
  const held={'40066':'833600','15332':'878678',
    '16167':'017170','16165':'017100','94106':'830764','14268':'006445',
    '18516':'823263','35819':'827695','35820':'827695','3058':'717012',
    '91863':'898000','36952':'505310','94877':'899634'};
  for(const [quest,labcorp] of Object.entries(held)){
    const q=byQuest.get(quest);
    assert.ok(q,'Review-only Quest entry missing '+quest);
    assert.equal(q[3],'','Review-only row was promoted '+quest);
    assert.ok(q[8]?.some(r=>r[0]===labcorp),'Review candidate missing for '+quest);
  }
  for(const code of ['2569','11351','92739']){
    assert.equal(byQuest.get(code)?.[3],'','High-risk method/Ig class mismatch '+code);
  }
});


test('2026-11-22 second and third crosswalk passes retain accepted candidate details',()=>{
  const additions={
    '10601':'815472','10559':'211425','10560':'211482','17557':'827243',
    '19590':'827356','59155':'827245','18217':'504594','18220':'504567',
    '36311':'503870','14966':'329562','93881':'085970','34042':'163253',
    '39413':'910637','91981':'805283','16985':'123211','39309':'830769',
    '20341':'164285','526':'164319','39209':'138685','34388':'303758',
    '91029':'070115','17563':'140217','14628':'123010'
  };
  const labMap=new Map(indexedLab.map(r=>[r[0],r]));
  for(const [qcode,lcode] of Object.entries(additions)){
    const q=byQuest.get(qcode),lab=labMap.get(lcode);
    assert.ok(q&&lab,'Both indexed entries must exist: '+qcode+' / '+lcode);
    assert.equal(q[3],lcode,'Exact mapped candidate for Quest '+qcode);
    assert.equal(q[4],lab[1],'LabCorp candidate description for Quest '+qcode);
    assert.equal(q[2],lab[2],'Specimen compatibility for Quest '+qcode);
    assert.ok(!q[8]?.length,'Accepted candidate cannot be review-only');
  }
  for(const [qcode,lcode] of [['16029','480510']]){
    const q=byQuest.get(qcode);
    assert.equal(q[3],'','Method-specific review row must remain unmapped '+qcode);
    assert.ok(q[8]?.some(ref=>ref[0]===lcode),'Review candidate must be retained '+qcode);
  }
  assert.ok(ctx.window.QUEST_TO_LABCORP_METADATA.questMatchedActive>=1085);
  assert.ok(ctx.window.QUEST_TO_LABCORP_METADATA.labcorpMatched>=1047);
});

test('crosswalk displays three rows and loads ten only on Show more click',()=>{
  const css=fs.readFileSync('labcorp-crosswalk.css','utf8');
  const ui=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
  const responsive=css.slice(css.indexOf('/* Narrow-screen crosswalk: three visible rows, vertically scrollable without sideways scrolling. */'));
  assert.ok(responsive.startsWith('/* Narrow-screen crosswalk:'),'Responsive layout exists');
  assert.match(responsive,/@media screen and \(max-width: 900px\)/);
  assert.match(responsive,/#convertTestsView\.test-mode-converter \.crosswalk-table-wrap\s*\{[^}]*overflow-x: hidden;[^}]*overflow-y: auto;/);
  assert.match(responsive,/#convertTestsView\.test-mode-converter \.crosswalk-table\s*\{[^}]*min-width: 0;/);
  assert.match(responsive,/#convertTestsView\.test-mode-converter \.crosswalk-table tbody tr\s*\{[^}]*display: grid;/);
  assert.match(ui,/const PAGE_SIZE=10;/);
  assert.match(ui,/const VIEWPORT_ROWS=3;/);
  assert.match(ui,/Array\.from\(table\.rows\)\.slice\(0,VIEWPORT_ROWS\)/);
  assert.match(ui,/more\.addEventListener\('click',\(\)=>\{/);
  assert.match(ui,/visible\+=PAGE_SIZE;/);
  assert.ok(!ui.includes("tableWrap?.addEventListener('scroll'"),'Scroll must not load the next batch');
  for(const page of ['index.html','labcorp.html']){
    const html=fs.readFileSync(page,'utf8');
    assert.match(html,/class="crosswalk-table-wrap" role="region" aria-label="Crosswalk results"/);
    assert.match(html,/id="labcorpCrosswalkMore"[^>]*aria-controls="labcorpCrosswalkBody"/);
  }
  // Display count changes by exactly ten; vertical scroll doesn't alter it.
  const begin=ui.indexOf('  function sizeCrosswalkViewport(){');
  const end=ui.indexOf('  // Bulk test converter;',begin);
  assert.ok(begin>=0&&end>begin);
  const entries=Array.from({length:24},(_,i)=>[String(i+1),'Test '+(i+1),'Serum','','',0,'','active']);
  const context={
    isQuestPage:true,rows:entries,meta:{questActiveCount:24,labcorpMatched:0},reverse:null,loadError:false,
    direction:{value:'quest'},filter:{value:'all',querySelector(){return {hidden:false};}},
    heads:[{},{},{},{}],summary:{textContent:''},status:{textContent:''},more:{hidden:true,textContent:''},
    table:{innerHTML:''},tableWrap:null,getRows(){return entries;},sourceType(){return 'active';},
    renderQuest(row){return '<tr data-id="'+row[0]+'"></tr>';},
    renderLabcorp(row){return '<tr data-id="'+row[0]+'"></tr>';},window:{}
  };
  vm.runInNewContext(
    'const PAGE_SIZE=10;const VIEWPORT_ROWS=3;let visible=PAGE_SIZE;'+ui.slice(begin,end)+
    '\nrender();const first=[table.innerHTML,status.textContent,more.hidden,more.textContent];'+
    '\nvisible+=PAGE_SIZE;render();const second=[table.innerHTML,status.textContent,more.hidden,more.textContent];'+
    '\nvisible+=PAGE_SIZE;render();result=[first,second,[table.innerHTML,status.textContent,more.hidden,more.textContent]];',
    context
  );
  const [first,second,third]=context.result;
  assert.equal((first[0].match(/<tr /g)||[]).length,10);
  assert.match(first[1],/Loaded 10 of 24 Quest tests · 3 visible at a time/);
  assert.equal(first[2],false);
  assert.match(first[3],/Show 10 more tests/);
  assert.equal((second[0].match(/<tr /g)||[]).length,20);
  assert.match(second[1],/Loaded 20 of 24 Quest tests/);
  assert.match(second[3],/Show 4 more tests/);
  assert.equal((third[0].match(/<tr /g)||[]).length,24);
  assert.equal(third[2],true);

  // A narrow screen must size the viewport to the first three complete row heights.
  const rowHeights=[70,100,125,250];
  const container={style:{},getClientRects(){return [{}]}};
  const heightContext={
    tableWrap:container,table:{
      rows:rowHeights.map(height=>({getBoundingClientRect(){return {height}}})),
      closest(){return {tHead:{getBoundingClientRect(){return {height:0}}}}}
    }
  };
  vm.runInNewContext('const VIEWPORT_ROWS=3;'+ui.slice(begin,ui.indexOf('  function render(){',begin))+
    '\nsizeCrosswalkViewport();',heightContext);
  assert.equal(container.style.maxHeight,'297px');
});


test('Add Tests magnifier appears for unresolved names and codes in both calculators',()=>{
  for(const [app,page] of [['assets/js/app.js','index.html'],['labcorp-app.js','labcorp.html']]){
    const source=fs.readFileSync(app,'utf8'),html=fs.readFileSync(page,'utf8');
    const anchor=source.indexOf('refreshBatchHints = window.LabBatchInlineHints.mount');
    const start=source.indexOf('          lineTone: query => {',anchor);
    const end=source.indexOf('\n          },\n          onStatusRows:',start);
    assert.ok(anchor>=0&&start>anchor&&end>start,app+' must configure inline line tone');
    const tone=source.slice(start,end+'\n          }'.length);
    assert.match(source.slice(anchor,start),/colorUnavailable:\s*false/);
    assert.ok(tone.includes('findMatches('),app+' must distinguish fuzzy candidates from unresolved entries');
    const catalog=[
      {testCode:'123',testName:'Assay',status:'active',aliases:[]},
      {testCode:'005215',testName:'Sed Rate',status:'active',aliases:['esr']},
      {testCode:'999999',testName:'Blocked',status:'blocked',aliases:[]}
    ];
    const normalizeSearch=x=>String(x||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,' ');
    const context={
      database:catalog,
      normalizeSearch,
      findCategoryMatches:q=>q==='hematology'?{label:'Hematology'}:null,
      findMatches:q=>q==='Assad'?[catalog[0]]:[],
      librarySearchIndex:test=>({
        code:normalizeSearch(test.testCode),name:normalizeSearch(test.testName),aliases:test.aliases
      })
    };
    vm.runInNewContext('const opts={'+tone+'};result=['+
      "opts.lineTone('Assad'),opts.lineTone('Stunt'),opts.lineTone('Guinbbf'),"+
      "opts.lineTone('Assay'),opts.lineTone('005215'),opts.lineTone('esr'),"+
      "opts.lineTone('999999'),opts.lineTone('hematology'),opts.lineTone('777777'),opts.lineTone('')];",context);
    assert.deepEqual(Array.from(context.result),
      [null,'unavailable','unavailable',null,null,null,null,null,'unavailable',null],app);
    assert.match(html,/<textarea id="searchInput"[^>]*spellcheck="false"/);
    assert.match(html,/<textarea id="searchInput"[^>]*autocorrect="off"/);
    assert.match(html,/<textarea id="searchInput"[^>]*autocapitalize="off"/);
  }
});

test('both conversion textareas disable spellcheck, autocorrect and automatic capitalization',()=>{
  for(const page of ['index.html','labcorp.html']){
    const html=fs.readFileSync(page,'utf8');
    for(const id of ['crosswalkQuestInput','crosswalkLabcorpOutput']){
      const tag=html.match(new RegExp('<textarea[^>]*id="'+id+'"[^>]*>'))?.[0];
      assert.ok(tag,page+' has '+id);
      assert.match(tag,/spellcheck="false"/,page+' '+id+' spellcheck');
      assert.match(tag,/autocorrect="off"/,page+' '+id+' autocorrect');
      assert.match(tag,/autocapitalize="off"/,page+' '+id+' capitalization');
      assert.match(tag,/autocomplete="off"/,page+' '+id+' autocomplete');
    }
  }
});

/* Additional 2026-11-25 catalog cross-reference sweep. Candidates are not verified clinical equivalents. */
test('expanded individual allergen and specialty candidates preserve exact indexed codes and specimens',()=>{
 const pairs=[["2308","602496"],["2309","602869"],["2311","602871"],["2414","602484"],["2415","602971"],["2416","602570"],["2502","602545"],["2503","602936"],["2504","602925"],["2505","602926"],["2507","602480"],["2508","602476"],["2510","602494"],["2511","602948"],["2519","602931"],["2538","602705"],["2559","602801"],["2561","602818"],["2606","602686"],["2614","602710"],["2625","602811"],["2638","602808"],["2652","602702"],["2653","602701"],["2654","602700"],["2655","602699"],["2656","602697"],["2659","602690"],["2684","602851"],["2701","602502"],["2720","602828"],["2723","602678"],["2726","602486"],["2730","602774"],["2731","602886"],["2732","602887"],["2740","602894"],["2749","602881"],["2812","602517"],["2835","602499"],["2875","602492"],["2887","602737"],["3010","602794"],["3326","602956"],["3394","602978"],["6634","602900"],["6692","602559"],["6809","602566"],["11011","605610"],["13717","602816"],["14535","602673"],["23860","602741"],["23861","602963"],["23862","602747"],["23865","602677"],["26578","602974"],["30765","605621"],["30766","602757"],["39548","602728"],["91996","602675"],["38685","140150"],["91684","008851"],["5164","117340"],["10216","247800"],["19897","500179"],["18921","502124"],["92687","502122"],["93020","502120"],["8625","182204"],["14950","183805"],["8564","010272"],["1748","188110"],["654","006189"],["443","017996"],["4212","104018"],["4213","104026"],["906","139172"],["8352","140715"]];
 const labMap=new Map(indexedLab.map(r=>[r[0],r]));
 for(const [qc,lc] of pairs){const q=byQuest.get(qc),l=labMap.get(lc);assert.ok(q&&l,qc+' / '+lc);assert.equal(q[3],lc,qc);assert.equal(q[4],l[1],qc);assert.equal(q[2].toLowerCase(),l[2].toLowerCase(),qc);assert.ok(!q[8]?.length,qc);}
});
test('expanded related alternatives remain manual-review only',()=>{
 const pairs=[["2736","602481,602488"],["6696","602560"],["17040","602511"],["23894","602567"],["30531","602817"],["17591","101170"],["17592","101170"],["39625","004069"],["10379","503205"],["10380","503205"],["19593","005009"],["10265","004556,004416"],["19108","303758,335362"],["19113","303758,209603"],["34391","303755"],["34471","550390,550470,550520"],["8757","324732,336050"],["95084","504904,504907"],["6635","791194"],["236","007203,007204,007205"],["481","007161,007162,007163"],["888","007153,007154,007155"],["917","070326,070327,070328"],["801","910625"],["15434","303756"],["30673","001842"],["8856","182246"]];
 for(const [qc,codes] of pairs){const q=byQuest.get(qc);assert.ok(q,qc);assert.equal(q[3],'',qc);for(const lc of codes.split(','))assert.ok(q[8]?.some(x=>x[0]===lc),qc+' / '+lc);}
});

/* Further specialty and toxicology candidate sweep, 2026-11-25. */
test('specialty and urine drug candidates preserve indexed codes, names and specimens',()=>{
 const pairs=[["38119","605145"],["38121","605092"],["38132","605119"],["38133","605176"],["38134","605073"],["38142","605117"],["38562","605054"],["92851","605044"],["15514","605187"],["14776","605198"],["92030","831752"],["978","002139"],["3930","008656"],["949","833851"],["700","701768"],["90389","183020"],["93256","819213"],["39350","701863"],["39353","761160"],["39354","701861"],["39356","721575"],["39357","701875"],["39358","701869"],["39359","701873"],["39361","701864"],["39363","701866"],["39364","701871"],["39365","701872"],["39367","737691"],["39369","737695"],["39371","763900"],["39375","764200"],["39376","737933"],["39377","737738"],["39380","737856"],["39381","763896"],["39382","737760"],["39383","737477"],["39432","791750"]];
 const labMap=new Map(indexedLab.map(r=>[r[0],r]));
 for(const [qc,lc] of pairs){const q=byQuest.get(qc),l=labMap.get(lc);assert.ok(q&&l,qc+' / '+lc);assert.equal(q[3],lc,qc);assert.equal(q[4],l[1],qc);assert.equal(q[2].toLowerCase(),l[2].toLowerCase(),qc);assert.ok(!q[8]?.length,qc);}
});
test('further specialty and drug alternatives remain manual-review only',()=>{
 const pairs=[["13590","083971"],["13670","083909"],["39246","141330"],["5789","083885,820138"],["39360","701874"],["39368","737693"],["39378","737740"],["39379","737026"],["11831","702515"],["13113","738610"],["39384","701737"],["39386","714766"],["39387","701732"],["39389","701735"],["39391","701279"],["39395","701747"],["39398","701738"],["39399","701742"],["39403","701736"],["39409","791170"],["39410","702508"],["39414","702518"],["39431","791750"],["39435","081100"],["18713","817203"],["18728","607740"],["94469","603972"],["94470","604159"],["3423","602928"],["92857","605191"],["70107","706500,824197"],["93875","141330"],["16141","900049"],["90903","906006"],["90912","900133"],["19872","117079"],["90923","117310"],["19955","334971"],["15681","334971"],["17612","334971"],["14325","005280"],["15122","121137"],["90810","042045"],["36742","504796"],["13817","002006,500458"],["19724","138644"],["19723","138479"],["2339","716563,790856"],["3303","807644"],["18365","121022"],["70240","828679,828689"],["4661","161836"],["4662","161810"],["4663","161828"],["7352","161950"],["345","071506"],["5248","071522"],["400","808891"],["7649","164284"],["36330","716936,911186"],["10294","164657"],["10295","164657"],["92474","115101"],["36187","123110"],["91003","379720"],["91068","164624"],["11790","832400"],["15586","117157"],["90129","830732"],["93888","505500"]];
 for(const [qc,codes] of pairs){const q=byQuest.get(qc);assert.ok(q,qc);assert.equal(q[3],'',qc);for(const lc of codes.split(','))assert.ok(q[8]?.some(x=>x[0]===lc),qc+' / '+lc);}
});

/* Broad catalog sweep, 2026-11-25. Prior exclusions are retained except explicitly re-reviewed pairs. */
test('broad catalog candidates retain exact indexed names and codes',()=>{
 const pairs=[["10188","002014"],["10196","001016"],["10200","001339"],["10317","605106"],["10325","605114"],["11235","213092"],["18831","510750"],["18842","504600"],["18573","512275"],["36164","484656"],["34088","012580"],["34283","012700"],["36178","141598"],["37056","012518"],["37098","503725"],["36721","702891"],["37923","016360"],["39044","520385"],["39226","504805"],["38105","605177"],["38111","605107"],["38113","605104"],["38128","605086"],["38129","605131"],["38138","605102"],["38141","605064"],["90896","004593"],["1291","407154"],["92413","505430"],["92416","505355"],["92435","511405"],["94218","123283"],["38945","185041"],["4408","180448"],["16377","183988"],["10183","070140"],["90649","125561"],["16963","834968"],["90668","512212"],["16924","512212"],["10378","500115"],["36296","503890"],["2657","602994"],["10276","605213"],["8474","096230"],["34188","123049"],["36577","201959"],["34931","605598"],["15075","121139"],["14523","013664"],["4411","001842"],["10178","120251"],["10233","001800"],["16447","139380"],["37402","833923"],["37801","117052"],["91743","117052"],["10019","008722"],["10564","606650"],["10571","606659"],["10629","606656"],["18720","607740"],["37900","603927"],["37906","603940"],["91747","603916"],["94464","603972"],["94467","604600"],["94468","604734"],["216","015040"],["5158","015057"],["7017","015594"],["1777","117705"],["1779","164525"],["14461","086340"],["37700","117180"],["820","790700"],["6041","809383"],["26499","810259"],["6213","809484"],["2958","071548"],["5375","811554"],["7131","811745"],["951","834160"],["11040","823579"],["4946","144618"],["523","004069"],["946","003434"],["14761","071514"],["36434","072249"],["36440","007633"],["36441","007773"]];
 const labMap=new Map(indexedLab.map(r=>[r[0],r]));
 const specimenExceptions=new Set(["216","5158","7017","1777","1779","14461","37700","820","6041","26499","6213","2958","5375","7131","951","11040","4946","8856","523","946","14761","36434","36440","36441"]);
 for(const [qc,lc] of pairs){const q=byQuest.get(qc),l=labMap.get(lc);assert.ok(q&&l,qc+' / '+lc);assert.equal(q[3],lc,qc);assert.equal(q[4],l[1],qc);if(!specimenExceptions.has(qc))assert.equal(q[2].toLowerCase(),l[2].toLowerCase(),qc);assert.ok(!q[8]?.length,qc);}
 assert.equal(byQuest.get('8474')[3],'096230','VCA IgG must never use IgM');
 assert.equal(byQuest.get('2657')[3],'602994','Mouse epithelium IgE must never use mouse urine or IgG');
});
test('new broader references are manual-review only',()=>{
 const pairs=[["1175","899828"],["13574","510940"],["13694","489140"],["15485","167259,167190"],["16515","452423"],["17347","480566"],["17813","511200"],["19525","167660,167297"],["19526","176082,176098"],["37859","001941,006452,001834"],["38312","505295"],["38321","505295,821075"],["39510","512143"],["70159","253801,163067"],["90382","505295,821075"],["90924","550066,550072"],["91065","480481,481544,481552"],["92140","898000,898047"],["92414","143008"],["92560","452423"],["93941","844017"],["95732","176082,176098"],["97112","167245,167190"],["10372","402145,403604"],["12735","402145,402175"],["12736","402145,402175"],["30555","403604,402145"],["30710","402145,403604"],["38313","505758"],["38323","505758"],["27","006635,006619"],["7942","324732,165100"],["15561","042045"],["30278","042045,006685"],["10104","165620"],["10211","165620"],["7432","221010"],["7311","007914"],["36581","096149,806649"],["6646","163600"],["17904","511154"],["70071","791886"],["91378","811653"],["19880","164947"],["37669","001768,002295"],["94761","164075"],["10177","833591"],["37231","550672"],["90071","164065"],["93859","165620"],["14890","117079"],["1776","700068"],["19779","700068"],["10583","606656"],["10558","606650"],["10569","606659"],["94463","604764"],["36763","608005"],["36766","608035"],["18739","608035"],["10662","716795"],["10719","706556"],["11068","138880,139380"],["11173","164914,520008"],["11177","186197"],["11447","117985"],["12084","140230"],["13600","083973"],["13646","082339"],["13986","010397"],["14312","139825"],["14598","511045,899373"],["14599","511045"],["14601","511035"],["15061","121137"],["15076","121228"],["15087","121228"],["15109","914280"],["15498","138420"],["15714","700603"],["15948","070228,868141"],["16284","150018"],["16446","139380"],["16553","138880"],["16845","004354"],["18218","504594"],["18224","504567"],["19502","815892"],["19550","188052"],["29477","163600"],["30340","330173"],["34282","138529,161075"],["34296","139326"],["34469","550653"],["36294","503890"],["36295","503890"],["36298","503890"],["36299","503890"],["36301","503870"],["36303","503870"],["36333","161802"],["36552","163900"],["36553","163908"],["36554","330173"],["36725","001974"],["36733","253801"],["37093","830721"],["37088","505016"],["37477","163295"],["37547","835027"],["37740","010505"],["37742","512300"],["38916","830721"],["39438","146704"],["39749","164068"],["90990","188730"],["91299","829670"],["91474","086884"],["91475","180076"]];
 for(const [qc,codes] of pairs){const q=byQuest.get(qc);assert.ok(q,qc);assert.equal(q[3],'',qc);for(const lc of codes.split(','))assert.ok(q[8]?.some(x=>x[0]===lc),qc+' / '+lc);}
});


test('method and order-scope expansion preserves indexed candidate codes',()=>{
 const pairs=[["6448","003384"],["5168","117245"],["4475","180141"],["2691","186031"],["36433","720847"],["91615","510305"],["19107","001370"],["973","003541"],["11320","003277"],["11314","003160"],["11316","003186"],["11317","003178"],["11321","003418"],["4555","140050"],["14521","013334"],["14522","013326"],["36087","502280"],["36086","502286"],["36176","502333"],["36168","504026"],["35167","501902"],["15480","113753"],["14532","117921"],["18456","180092"],["16505","188706"],["16506","188672"],["19774","006926"],["12070","511520"],["12343","167390"],["12342","167655"],["16122","500324"],["681","008623"],["11365","138677"],["17133","810820"],["34472","146803"],["90578","764032"],["94600","836195"],["15340","511881"],["19543","098657"],["16765","080176"],["17132","605223"],["36455","402300"],["3382","202314"],["21105","312920"],["11278","071530"]];
 const labMap=new Map(indexedLab.map(r=>[r[0],r]));
 for(const [qc,lc] of pairs){const q=byQuest.get(qc),l=labMap.get(lc);assert.ok(q&&l);assert.equal(q[3],lc);assert.equal(q[4],l[1]);assert.ok(!q[8]?.length);}
});

test("public directory audit additions and regional review safeguards",()=>{for(const [q,l] of [["16581","138880"],["16504","188730"],["70049","188748"],["70048","188714"],["70051","188698"],["8889","163402"]]){const r=byQuest.get(q);assert.equal(r[3],l);assert.equal(r[8]?.length||0,0);}for(const [q,...codes] of [["10285","602629","607100","676536"],["10286","606599","607022","676544"],["10643","602627","606995","676510"],["10644","602628","607111","676528"],["10646","602632","607099","676551"],["10647","602633","607115","676569"],["10648","602634","607125","676577"],["10649","602635","607020","676585"],["10650","602639","607105","676593"],["10651","602640","607025","676601"],["10653","602641","607050","676619"],["10654","603719","607055","676627"],["10655","602643","607075","676635"],["10657","602645","607005","676668"],["10658","602985","606990","676676"],["10668","602644","607090","676643"],["10669","602638","607095","676650"],["10673","602986","606980","676684"],["38828","606600","606985","650820"]]){const r=byQuest.get(q);assert.equal(r[3],"");for(const l of codes)assert.ok(r[8].some(a=>a[0]===l));}});


test('re-reviewed assays are available as converter candidates under their active directory codes', () => {
  const candidates = [
    ['257', '163050'],
    ['414', '150075'],
    ['767', '700068'],
    ['7018', '216010'],
    ['7020', '000455'],
    ['8435', '004556'],
    ['14520', '013656'],
    ['14994', '510840'],
    ['17609', '164657'],
    ['34057', '140640'],
    ['36712', '716712'],
    ['39245', '141330'],
    ['94148', '502251'],
    ['38687', '502251'],
    ['14600', '511035'],
    ['19546', '503640'],
    ['2550', '602725'],
    ['2312', '602872'],
    ['2371', '602880'],
    ['2609', '602796'],
    ['3490', '602882'],
    ['6799', '602899'],
    ['10625', '604506'],
    ['23893', '602759'],
    ['38410', '602897'],
    ['38751', '602840'],
    ['94472', '604443'],
    ['94476', '604757'],
    ['7655', '042580'],
    ['91372', '603833'],
    ['91403', '603849'],
    ['91681', '605971'],
    ['14098', '485126'],
    ['36183', '700140'],
    ['15843', '143302'],
    ['15844', '143333'],
    ['15845', '143324'],
    ['31345', '015798'],
    ['15846', '319609'],
    ['15847', '015801'],
    ['39385', '737694'],
    ['39392', '071324'],
    ['39393', '764160'],
    ['39394', '737907'],
    ['39401', '071464'],
    ['39402', '074567'],
    ['39405', '764171'],
    ['39406', '761019'],
    ['39407', '718719'],
    ['39408', '716258'],
    ['39411', '739070'],
    ['17161', '071318'],
    ['39397', '071318'],
    ['729', '003194'],
    ['90642', '071255'],
    ['2919', '602528'],
    ['39165', '140301'],
    ['11369', '511210'],
    ['91457', '511630'],
    ['36637', '716928'],
    ['90853', '007989'],
    ['36297', '503890'],
    ['36970', '182913'],
    ['36443', '071563'],
    ['37124', '706580'],
    ['38684', '007010'],
    ['91032', '716365'],
    ['37226', '500183'],
    ['36585', '121200'],
    ['13697', '100781'],
    ['16869', '481630'],
    ['14571', '140761'],
    ['17859', '071545'],
    ['13228', '700248'],
    ['15220', '706556'],
    ['8812', '706556'],
    ['16846', '500458'],
    ['11280', '500410'],
    ['39366', '737610'],
    ['11328', '791714'],
  ];
  const labByCode = new Map(indexedLab.map(row => [row[0], row]));
  for (const [questCode, labCode] of candidates) {
    const quest = byQuest.get(questCode);
    assert.equal(quest[7], 'active', questCode);
    assert.equal(quest[3], labCode, questCode);
    assert.equal(quest[4], labByCode.get(labCode)[1], questCode);
    assert.match(quest[6], /Possible match/, questCode);
    assert.equal(quest[8], undefined, questCode);
  }
});
