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
    'buildCollectionPlan,buildSubmissionContents,groupSubmissionContainersForPrint,'+
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
function checkSingleCard(api,t,expected,lab){
  const p=plan(api,[t]);
  assert.equal(p.expanded.length,expected,lab+': expanded sources '+t.testCode);
  assert.equal(p.collectedCount,expected,lab+': collect '+t.testCode);
  assert.equal(p.submittedCount,expected,lab+': physically submit '+t.testCode);
  assert.equal(p.displayedCount,expected,lab+': display quantity '+t.testCode);
  assert.equal(p.displayed.length,1,lab+': one print card '+t.testCode);
  if(expected>1){
    const labels=api.printLabelingNotes(p.displayed[0]);
    assert.equal((labels.match(/class="print-label-note"/g)||[]).length,
      expected,lab+': every timed label preserved '+t.testCode);
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
  checkSingleCard(specialty,proinsulin,5,'Quest five timed frozen serum specimens');
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
