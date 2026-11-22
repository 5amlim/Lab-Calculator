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
 assert.ok(html.includes('labcorp-crosswalk-data.js?v=20261122-45-candidates'));
});

/* Converter alignment regression: ghost labels are not submitted or copied. */
const converterUI=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
const converterBegin=converterUI.indexOf('    function updateConverter(){');
const converterEnd=converterUI.indexOf("    converterInput.addEventListener('input'",converterBegin);
assert.ok(converterBegin>=0&&converterEnd>converterBegin,'Converter entry point is present');
const converterFunction=converterUI.slice(converterBegin,converterEnd);
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
    converterInput:{value:input},
    converterOutput:{value:'',placeholder:'Matching Quest codes'},
    outputPlaceholder:'Matching Quest codes',
    converterWarning:{hidden:true,textContent:''},
    emptyOutputHints:new Map(),
    generatedMatchRows:new Map(),
    generatedOutputRows:[],
    chosenMatches:new Map(chosen),
    manualOutputCodes:new Set(manual),
    cartCandidateCodes:[],matchFeedback:[],actionFeedback:'',
    refreshOutputHints(){},refreshManualSourceHints(){},
    renderNoMatchActions(){},renderSourceEntryActions(){},
    renderCart(){},syncConverterScroll(){}
  };
  vm.runInNewContext(converterFunction+'\nupdateConverter();',ctx);
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
  assert.ok(beforeCount>0&&beforeCount<indexedLab.length,'Baseline has indexed LabCorp links before workbook loading');
  assert.equal(typeof bare.window.applyQuestLabcorpWorkbookMatches,'function');
  bare.window.applyQuestLabcorpWorkbookMatches(indexedLab);
  const activeAfter=bare.window.QUEST_TO_LABCORP_INDEX.filter(r=>r[7]==='active');
  const linked=activeAfter.filter(r=>r[3]);
  assert.equal(linked.length,ctx.window.QUEST_TO_LABCORP_METADATA.questMatchedActive);
  assert.equal(new Set(linked.map(r=>r[3])).size,ctx.window.QUEST_TO_LABCORP_METADATA.labcorpMatched);
  assert.equal(activeAfter.find(r=>r[0]==='637')[3],'','Protected mercury exception');
});

test('badge counts active LabCorp links after workbook is applied',()=>{
  const ui=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
  assert.ok(ui.includes('window.applyQuestLabcorpWorkbookMatches?.(index.tests)'));
  assert.ok(ui.indexOf('window.applyQuestLabcorpWorkbookMatches?.(index.tests)') <
    ui.indexOf('reverse=buildReverse(index)'));
  assert.ok(ui.includes('new Set(questActive.filter(r=>r[3]).map(r=>String(r[3]))).size'));
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
  const held={'767':'700068','40066':'833600','15332':'878678',
    '16167':'017170','16165':'017100','94106':'830764','14268':'006445',
    '18516':'823263','35819':'827695','35820':'827695','3058':'717012',
    '91863':'898000','36952':'505310','94877':'899634'};
  for(const [quest,labcorp] of Object.entries(held)){
    const q=byQuest.get(quest);
    assert.ok(q,'Review-only Quest entry missing '+quest);
    assert.equal(q[3],'','Review-only row was promoted '+quest);
    assert.ok(q[8]?.some(r=>r[0]===labcorp),'Review candidate missing for '+quest);
  }
  for(const code of ['2569','11351','8474','92739']){
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
  for(const [qcode,lcode] of [['257','520137'],['16029','480510']]){
    const q=byQuest.get(qcode);
    assert.equal(q[3],'','Method-specific review row must remain unmapped '+qcode);
    assert.ok(q[8]?.some(ref=>ref[0]===lcode),'Review candidate must be retained '+qcode);
  }
  assert.ok(ctx.window.QUEST_TO_LABCORP_METADATA.questMatchedActive>=1085);
  assert.ok(ctx.window.QUEST_TO_LABCORP_METADATA.labcorpMatched>=1047);
});

test('narrow crosswalk shows five vertically scrollable, fully visible rows without horizontal overflow',()=>{
  const css=fs.readFileSync('labcorp-crosswalk.css','utf8');
  const ui=fs.readFileSync('labcorp-crosswalk-ui.js','utf8');
  const responsive=css.slice(css.indexOf('/* Narrow-screen crosswalk: five vertically scrollable rows, no horizontal pan. */'));
  assert.ok(responsive.startsWith('/* Narrow-screen crosswalk:'),'Responsive block must be present');
  assert.match(responsive,/@media screen and \(max-width: 900px\)/);
  assert.match(responsive,/#convertTestsView\.test-mode-converter \.crosswalk-table-wrap\s*\{[^}]*overflow-x: hidden;[^}]*overflow-y: auto;/);
  assert.match(responsive,/#convertTestsView\.test-mode-converter \.crosswalk-table\s*\{[^}]*min-width: 0;/);
  assert.match(responsive,/#convertTestsView\.test-mode-converter \.crosswalk-table tbody tr\s*\{[^}]*display: grid;/);
  assert.match(responsive,/#convertTestsView\.test-mode-converter \.crosswalk-table thead\s*\{\s*display: none;/);
  assert.match(ui,/const VIEWPORT_ROWS=5;/);
  assert.match(ui,/Array\.from\(table\.rows\)\.slice\(0,VIEWPORT_ROWS\)/);
  assert.match(ui,/tableWrap\.style\.maxHeight=Math\.ceil\(height\+2\)\+'px'/);
  assert.match(ui,/tableWrap\.addEventListener\('scroll'/);
  for(const page of ['index.html','labcorp.html']){
    const html=fs.readFileSync(page,'utf8');
    assert.match(html,/class="crosswalk-table-wrap" role="region" aria-label="Scrollable crosswalk results"/);
  }
});
