'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');

const timedOriginal={
  id:'test-timed-original',testCode:'99101',testName:'Two-timepoint original-tube control',
  specimenType:'Whole Blood',drawContainer:'Gray Top (Sodium Fluoride/Potassium Oxalate)',
  transportContainer:'Gray Top (Sodium Fluoride/Potassium Oxalate)',
  transportTemperature:'Room Temperature',spin:'No',
  preferredVolume:'1 mL',minimumVolume:'0.5 mL',
  specialLabeling:'Fasting - record collection time',
  additionalDrawRequirements:[{
    container:'Gray Top (Sodium Fluoride/Potassium Oxalate)',
    specimenType:'Whole Blood',
    transportContainer:'Gray Top (Sodium Fluoride/Potassium Oxalate)',
    spin:'No',specialLabeling:'1-hour - record collection time'
  }]
};
const timedPlasma={
  ...timedOriginal,id:'test-timed-plasma',testCode:'99102',
  testName:'Two-timepoint separated-plasma control',specimenType:'Plasma',
  transportContainer:'Plastic Plasma Transport Vial',spin:'Yes',
  additionalDrawRequirements:[{
    container:'Gray Top (Sodium Fluoride/Potassium Oxalate)',
    specimenType:'Plasma',transportContainer:'Plastic Plasma Transport Vial',
    spin:'Yes',specialLabeling:'1-hour - record collection time'
  }]
};
const routineSerum=code=>({
  id:'routine-serum-'+code,testCode:code,testName:'Routine serum '+code,
  specimenType:'Serum',drawContainer:'Red Top',
  transportContainer:'Plastic Serum Transport Tube',spin:'Yes',
  transportTemperature:'Room Temperature',
  preferredVolume:'0.5 mL',minimumVolume:'0.3 mL'
});

async function openCalc(app,layers,extra=[]) {
  const window={addEventListener() {},SEED_TESTS:[]};
  for(const layer of layers) new Function('window',read(layer))(window);
  window.SEED_TESTS.push(...extra);
  const document={
    getElementById:id=>({id,value:'',checked:false,options:[],
      classList:{add(){},remove(){},toggle(){}},
      addEventListener(){},setAttribute(){},querySelector(){return null;}}),
    querySelector(){return null;},querySelectorAll(){return[];},
    addEventListener(){}
  };
  const storage={getItem(){return null;},setItem(){},removeItem(){}};
  const src=read(app);
  assert.ok(src.includes('  init();'),app+': initialization boundary');
  const instrumented=src.replace('  init();',
    '  window.__timedAudit={database,expandedCollectionTests,buildTransportBagPlan,'+
    'buildCollectionPlan,buildSubmissionContents,groupSubmissionContainersForPrint,groupSwabCollectionCardsForPrint,'+
    'printLabelingNotes,applyBloodSourceCountAllocations};');
  new Function('window','document','localStorage','console','setTimeout','clearTimeout',
    instrumented)(window,document,storage,{warn(){},error(){}},()=>0,()=>{});
  await new Promise(setImmediate);
  assert.ok(window.__timedAudit);
  return window.__timedAudit;
}

function plan(api,tests){
  const expanded=api.expandedCollectionTests(tests);
  const bags=api.buildTransportBagPlan(expanded);
  const collected=api.buildCollectionPlan(expanded,bags);
  const submitted=bags.flatMap(bag=>api.buildSubmissionContents(bag));
  api.applyBloodSourceCountAllocations(submitted);
  const displayed=bags.flatMap(bag=>{
    const contents=submitted.filter(item=>bag.tests.some(test=>
      item.tests && item.tests.some(part=>part.id===test.id)));
    return api.groupSubmissionContainersForPrint(contents);
  });
  const count=arr=>arr.reduce((sum,item)=>sum+(Number(item.count)||0),0);
  return {expanded,bags,collected,submitted,displayed,
    collectedCount:count(collected),submittedCount:count(submitted),
    displayedCount:count(displayed)};
}
function checkSingleCard(api,t,expected,lab,labelCount=expected){
  const p=plan(api,[t]);
  assert.equal(p.expanded.length,expected,lab+': expanded sources '+t.testCode);
  assert.equal(p.collectedCount,expected,lab+': collect '+t.testCode);
  assert.equal(p.submittedCount,expected,lab+': physically submit '+t.testCode);
  assert.equal(p.displayedCount,expected,lab+': display quantity '+t.testCode);
  assert.equal(p.displayed.length,1,lab+': one print card '+t.testCode);
  if(expected>1){
    const labels=api.printLabelingNotes(p.displayed[0]);
    assert.equal((labels.match(/class="print-label-note"/g)||[]).length,
      labelCount,lab+': distinct timed labels preserved '+t.testCode);
    assert.match(p.displayed[0].printAllocationNote,/do not pool/i);
  }
}

test('Quest ten verified gray-plasma protocols use one visual card without combining any timepoints',async()=>{
  const api=await openCalc('assets/js/app.js',
    ['assets/js/quest-gray-plasma-processing-20261114.js'],
    [timedOriginal,timedPlasma,routineSerum('99103'),routineSerum('99104')]);
  const expected={8477:1,19833:1,484:1,1430:2,19834:2,
    16292:4,35181:2,23475:3,18927:3,6745:4};
  for(const [code,n] of Object.entries(expected)){
    const t=api.database.find(t=>t.testCode===code);
    assert.ok(t,'Quest test '+code);
    checkSingleCard(api,t,n,'Quest');
  }
  for(const code of ['99101','99102']){
    checkSingleCard(api,api.database.find(t=>t.testCode===code),2,'Quest synthetic');
  }
  const specialty=await openCalc('assets/js/app.js',
    ['assets/js/quest-directory-expansion-20261114.js',
      'assets/js/quest-gray-plasma-processing-20261114.js']);
  const proinsulin=specialty.database.find(t=>t.testCode==='15853');
  assert.ok(proinsulin,'Quest 15853 present');
  checkSingleCard(specialty,proinsulin,5,'Quest five timed frozen serum specimens',2);
  const frozenPlan=plan(specialty,[proinsulin]);
  assert.equal(frozenPlan.bags.length,1);
  assert.ok(frozenPlan.submitted.every(x=>x.className==='tube-transport tube-transport-green-top'));
  assert.equal(new Set(frozenPlan.submitted.map(x=>x.key)).size,5);
  assert.match(frozenPlan.displayed[0].printAllocationNote,/Timed specimen 5/);

  const combined=plan(api,['1430','19834'].map(code=>api.database.find(t=>t.testCode===code)));
  assert.equal(combined.submittedCount,4);
  assert.equal(combined.displayedCount,4);
  assert.equal(combined.displayed.length,2,'Different orders remain distinct print groups');

  const ordinary=plan(api,['99103','99104'].map(code=>api.database.find(t=>t.testCode===code)));
  assert.equal(ordinary.submittedCount,1,'Ordinary compatible serum assays may still pool');
});

test('Labcorp timed transfers and original tubes preserve physical counts and readable print groups',async()=>{
  const api=await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/verified-specialty-20261114.js'],
    [timedOriginal,timedPlasma,routineSerum('99103'),routineSerum('99104')]);
  for(const code of ['99101','99102'])
    checkSingleCard(api,api.database.find(t=>t.testCode===code),2,'Labcorp synthetic');

  for(const code of ['042045','042060']){
    const t=api.database.find(t=>t.testCode===code);
    const p=plan(api,[t]);
    assert.equal(p.collectedCount,2,code+' source serum tubes');
    assert.equal(p.submittedCount,2,code+' two distinct serum transfers');
    assert.equal(p.displayedCount,2,code+' printed count');
    assert.equal(p.displayed.length,1,code+' one print card');
    assert.match(p.displayed[0].printAllocationNote,/Separate containers/i);
  }
  const ordinary=plan(api,['99103','99104'].map(code=>api.database.find(t=>t.testCode===code)));
  assert.equal(ordinary.submittedCount,1,'Ordinary compatible serum pooling remains intact');
});

test('Labcorp frozen stimulation pairs use separate SST draws and purple-cap aliquots', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  for (const code of ['500770', '500773']) {
    const test = api.database.find(record => record.testCode === code);
    assert.equal(test?.status, 'active', code);
    checkSingleCard(api, test, 2, 'Labcorp frozen stimulation');
    const result = plan(api, [test]);
    assert.equal(new Set(result.submitted.map(item => item.key)).size, 2);
    assert(result.submitted.every(item => item.className === 'tube-frozen-purple'));
  }
});

test('Changing the temperature or protocol prevents false timed grouping',async()=>{
  const a=await openCalc('labcorp-app.js',[],[timedPlasma,{
    ...timedPlasma,id:'different-protocol',testCode:'99108'
  }]);
  const different=a.database.filter(t=>['99102','99108'].includes(t.testCode));
  const p=plan(a,different);
  assert.equal(p.collectedCount,4);
  assert.equal(p.submittedCount,4);
  assert.equal(p.displayedCount,4);
  assert.equal(p.displayed.length,2,'Different lab orders retain separate print groups');
  const frozen={
    ...timedPlasma,id:'frozen-protocol',testCode:'99109',
    transportTemperature:'Frozen',
    additionalDrawRequirements:timedPlasma.additionalDrawRequirements.map(x=>({
      ...x,transportTemperature:'Frozen'
    }))
  };
  const b=await openCalc('labcorp-app.js',[],[timedPlasma,frozen]);
  const split=plan(b,b.database.filter(t=>['99102','99109'].includes(t.testCode)));
  assert.equal(split.bags.length,2,'Frozen and ambient bags are separate');
  assert.equal(split.submittedCount,4);
});

test('Labcorp eight-specimen insulin print shows one common serum label', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  const test = api.database.find(record => record.testCode === '201285');
  assert.equal(test?.status, 'active');
  const result = plan(api, [test]);
  assert.equal(result.collectedCount, 8);
  assert.equal(result.submittedCount, 8);
  assert.equal(new Set(result.submitted.map(item => item.key)).size, 8);
  assert.equal(result.displayed.length, 1);
  const card = result.displayed[0];
  assert.equal(card.count, 8);
  const labels = api.printLabelingNotes(card);
  assert.equal((labels.match(/class="print-label-note"/g) || []).length, 1);
  assert.match(labels, />Serum</);
  assert.match(card.printAllocationNote, /keep separate, do not pool/i);
  for (let index = 1; index <= 8; index++) {
    assert(card.printAllocationNote.includes('Timed specimen ' + index + ' × 1'));
  }
  assert.match(card.printAllocationNote, /label each container with its collection time/i);
});

test('Labcorp matching timed insulin orders share one label and sum tube counts', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  const codes = ['053330', '053348', '053355', '053363'];
  const result = plan(api, codes.map(code => api.database.find(record => record.testCode === code)));
  assert.equal(result.collectedCount, 18);
  assert.equal(result.submittedCount, 18);
  assert.equal(new Set(result.submitted.map(item => item.key)).size, 18);
  assert.equal(result.displayed.length, 1);
  const [card] = result.displayed;
  assert.equal(card.count, 18);
  assert.equal([...card.sourceCountOverrides.values()].reduce((sum, count) => sum + count, 0), 18);
  assert.equal((api.printLabelingNotes(card).match(/class="print-label-note"/g) || []).length, 1);
  codes.forEach((code, index) => assert(card.printAllocationNote.includes(code + ' × ' + (index + 3))));
});

test('Labcorp timed original SSTs retain their allocation and AM/PM labels', async () => {
  const api = await openCalc('labcorp-app.js', [
    'assets/js/labcorp/catalog/verified-common-expansion-20261118-batch35.js',
    'assets/js/labcorp/catalog/directory-reconciliation-20261119.js'
  ]);
  for (const [code, count] of [['104000', 2], ['313700', 2], ['090381', 6], ['090399', 7]]) {
    const result = plan(api, [api.database.find(row => row.testCode === code)]);
    assert.equal(result.collectedCount, count, code);
    assert.equal(result.submittedCount, count, code);
    assert.equal(result.displayed.length, 1, code);
    assert.match(result.displayed[0].printAllocationNote, /label each container with its collection time/i);
    if (code === '104000') {
      const notes = api.printLabelingNotes(result.displayed[0]);
      assert.match(notes, /\bAM\b.*Collection date\/time/);
      assert.match(notes, /\bPM\b.*Collection date\/time/);
    }
  }
});

test('Labcorp single-tube orders retain their required fill and original tube', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  for (const [code, size, bag] of [
    ['182913', /6 mL minimum in one tube/, 'Refrigerated bag'],
    ['800039', /10 mL tube/, 'Room-temperature bag'],
    ['827243', /10 mL tube/, 'Room-temperature bag']
  ]) {
    const result = plan(api, [api.database.find(row => row.testCode === code)]);
    assert.equal(result.collectedCount, 1, code);
    assert.equal(result.submittedCount, 1, code);
    assert.equal(result.bags[0].label, bag, code);
    assert.match(result.collected[0].label, size, code);
    assert.match(result.submitted[0].label, size, code);
    assert.equal(result.submitted[0].originalTube, true, code);
  }
});

test('Labcorp ACTH pairs keep two collection times on a single print card', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  for (const code of ['070624', '140758', '140761', '501197', '503130']) {
    const result = plan(api, [api.database.find(row => row.testCode === code)]);
    assert.equal(result.expanded.length, 2, code);
    assert.equal(result.submittedCount, 2, code);
    assert.equal(result.displayed.length, 1, code);
    assert.match(result.displayed[0].printAllocationNote, /Baseline × 1.*60 minutes × 1/i, code);
    assert.match(api.printLabelingNotes(result.displayed[0]), /Serum/i, code);
  }
});

test('Labcorp keeps trace-metal urine collection separate from routine urine', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  const result = plan(api, ['081073', '738078'].map(code =>
    api.database.find(record => record.testCode === code)));
  const expected = ['Sterile cup', 'Trace Metal-Free Plastic Container'];
  for (const items of [result.collected, result.submitted, result.displayed]) {
    assert.deepEqual(items.map(item => item.label).sort(), expected);
    assert(items.every(item => item.count === 1));
  }
});

test('Labcorp HAE submits two room-temperature serum aliquots and one frozen aliquot', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  const result = plan(api, [api.database.find(record => record.testCode === '123020')]);
  assert.equal(result.submittedCount, 3);
  assert.equal(result.submitted.find(item => item.label === 'Transport Tube').count, 2);
  assert.equal(result.submitted.find(item => item.label === 'Frozen Transport Tube').count, 1);
  assert.deepEqual(result.bags.map(bag => bag.label).sort(), ['Frozen bag', 'Room-temperature bag']);
});

test('Labcorp combined profiles retain EDTA tube counts and UA transport fill', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  const result = plan(api, [api.database.find(record => record.testCode === '206938')]);
  const edta = result.submitted.find(item => item.label === 'Lavender EDTA');
  assert.equal(edta.count, 2);
  assert.equal(edta.originalTube, true);
  const ua = result.submitted.find(item => /red\/yellow swirl/i.test(item.label));
  assert.equal(ua.count, 1);
  assert.equal(Boolean(ua.originalTube), false);
  assert.match(ua.tests[0].preferredVolume, /3–9 mL in transport tube/);
});

test('Labcorp CBC and ESR profile ships the two original EDTA tubes at distinct temperatures', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  const result = plan(api, [api.database.find(record => record.testCode === '304858')]);
  const edta = result.submitted.filter(item => item.label === 'Lavender EDTA');
  assert.equal(edta.length, 2);
  assert(edta.every(item => item.originalTube && item.count === 1));
  assert.deepEqual(edta.flatMap(item => item.tests.map(test => test.transportTemperature)).sort(),
    ['Refrigerated', 'Room Temperature']);
});

test('Labcorp paired blood and urine glucose tolerance orders keep each specimen separate', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  for (const [code, count] of [['203216', 4], ['203224', 5], ['203232', 6], ['203240', 7],
    ['203257', 8], ['211193', 3], ['239830', 2]]) {
    const result = plan(api, [api.database.find(record => record.testCode === code)]);
    assert.equal(result.collectedCount, count * 2, code);
    assert.equal(result.submittedCount, count * 2, code);
    const cups = result.submitted.filter(item => item.label === 'Sterile cup');
    assert.equal(cups.reduce((total, item) => total + item.count, 0), count, code);
    assert(cups.every(item => item.originalTube), code);
  }
});

test('Labcorp urinalysis reflex culture transfers one urine collection to both transport tubes', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  const result = plan(api, [api.database.find(record => record.testCode === '377069')]);
  assert.equal(result.collectedCount, 1);
  assert.equal(result.submittedCount, 2);
  assert(result.submitted.every(item => !item.originalTube));
  assert.deepEqual(result.submitted.map(item => item.label).sort(),
    ['Gray-Top Urine Culture Preservative Tube', 'Red/Yellow Swirl UA Preservative Tube']);
});

test('Labcorp cfDNA kit orders collect and submit one original Streck tube', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  for (const code of ['451927', '452112', '833927']) {
    const result = plan(api, [api.database.find(record => record.testCode === code)]);
    assert.equal(result.collectedCount, 1, code);
    assert.equal(result.submittedCount, 1, code);
    assert.match(result.collected[0].label, /Streck cfDNA Tube/, code);
    assert.equal(result.submitted[0].originalTube, true, code);
    assert.equal(result.bags[0].label, 'Room-temperature bag', code);
  }
});

test('Labcorp prints one Aptima card with the combined count and distinct swab sites', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  const codes = ['180033', '180069', '180078', '180082', '180093', '180098', '374018',
    '374457', '383800', '188706', '188730', '188714', '188748', '140092'];
  const result = plan(api, codes.map(code => api.database.find(row => row.testCode === code)));
  for (const cards of [api.groupSwabCollectionCardsForPrint(result.collected), result.displayed]) {
    const aptima = cards.filter(item => /Aptima Multitest/i.test(item.label));
    assert.equal(aptima.length, 1);
    assert.equal(aptima[0].count, 13);
    assert.equal(cards.filter(item => /ESwab/i.test(item.label)).length, 1);
  }
  const labels = api.printLabelingNotes(result.displayed.find(item => /Aptima Multitest/i.test(item.label)));
  for (const site of ['vaginal', 'rectal', 'pharyngeal']) {
    assert.match(labels, new RegExp(site, 'i'));
  }
});

test('Labcorp enforces each timed saliva device count on one print card per protocol', async () => {
  const api = await openCalc('labcorp-app.js',
    ['assets/js/labcorp/catalog/directory-reconciliation-20261119.js']);
  for (const [code, count] of [['502424', 12], ['504855', 8]]) {
    const result = plan(api, [api.database.find(row => row.testCode === code)]);
    assert.equal(result.submittedCount, count);
    assert.equal(result.displayed.length, 1);
    const [card] = result.displayed;
    assert.equal(card.count, count);
    assert.match(card.printAllocationNote, new RegExp('Timed specimen ' + count + ' × 1'));
    assert.equal((api.printLabelingNotes(card).match(/class="print-label-note"/g) || []).length, 1);
  }
});
