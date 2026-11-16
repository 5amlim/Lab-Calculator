'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
const Q = 'assets/js/quest-verified-blood-expansion-20261115-batch13.js';
const L = 'assets/js/labcorp/catalog/verified-blood-expansion-20261115-batch13.js';
const codes = { Quest: ['1468','93932'], Labcorp: ['520123','520114','520108','520081','520063','520174','520168','520166'] };
function bundle(lab, initial = []) {
  const window = { SEED_TESTS: initial };
  vm.runInNewContext(read(lab === 'Quest' ? Q : L), { window });
  return window.SEED_TESTS;
}
async function planner(lab) {
  const window = { SEED_TESTS: bundle(lab) };
  const document = {
    getElementById(id) { return { id, value:'', checked:false, options:[], classList:{ add(){}, remove(){}, toggle(){} }, addEventListener(){}, setAttribute(){}, querySelector(){ return null; } }; },
    querySelector(){ return null; }, querySelectorAll(){ return []; }, addEventListener(){}
  };
  const app = read(lab === 'Quest' ? 'assets/js/app.js' : 'labcorp-app.js');
  const hook = lab === 'Quest' ? '  init();\n  };' : '  init();';
  assert(app.includes(hook), 'expected planner bootstrap');
  const inject = '  window.__verified13={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};' + (lab === 'Quest' ? '\n  };' : '');
  vm.runInNewContext(app.replace(hook, inject), {
    window, document, localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
    setTimeout(){return 0;},clearTimeout(){},console:{log(){},warn(){},error(){}}
  }, { filename:lab,timeout:30000 });
  await new Promise(resolve=>setImmediate(resolve));
  const api=window.__verified13;
  assert(api, lab + ' planner hook');
  return selectedCodes => {
    const rows=selectedCodes.map(code=>api.database.find(t=>t.testCode===code));
    assert(rows.every(t=>t&&t.status==='active'), lab+' cart availability');
    const expanded=api.expandedCollectionTests(rows);
    const bags=api.buildTransportBagPlan(expanded);
    return { rows,bags,draw:api.buildCollectionPlan(expanded,bags),submitted:bags.flatMap(b=>api.buildSubmissionContents(b)) };
  };
}
test('The batch is loaded on both pages before their planner, and only contains new active order codes',()=>{
  for(const [lab,script,page,app] of [['Quest',Q,'index.html','assets/js/app.js'],['Labcorp',L,'labcorp.html','labcorp-app.js']]){
    const html=read(page);
    assert(html.includes(script+'?v=1'));
    assert(html.indexOf(script)<html.indexOf('<script src="'+app));
    const records=bundle(lab);
    assert.deepEqual(records.map(t=>t.testCode),codes[lab]);
    assert(records.every(t=>t.status==='active'&&t.source&&t.drawContainer&&t.transportContainer&&t.preferredVolume&&t.minimumVolume&&t.spin));
  }
});
test('Reapplying the batch does not duplicate codes or change validated/blocked records',()=>{
  for(const lab of Object.keys(codes)){
    const first=bundle(lab);
    const second=bundle(lab,first);
    assert.equal(second.length,first.length);
    const protectedRecords=[
      {testCode:codes[lab][0],testName:'Approved legacy route',status:'active'},
      {testCode:codes[lab][1],testName:'Blocked route',status:'blocked'}
    ];
    const after=bundle(lab,protectedRecords);
    assert.equal(after[0].testName,'Approved legacy route');
    assert.equal(after[1].status,'blocked');
  }
});
test('Quest HAMA is frozen standard green badge transport; HLA whole blood stays in intact dedicated lavender',async()=>{
  const plan=await planner('Quest'),p=plan(codes.Quest);
  assert.deepEqual(Array.from(p.bags,b=>b.label),['Room-temperature bag','Frozen bag']);
  assert(p.rows.find(t=>t.testCode==='1468').spin==='Yes');
  assert(p.rows.find(t=>t.testCode==='93932').spin==='No');
  const frozen=p.submitted.filter(t=>t.label==='Transport Tube');
  assert.equal(frozen.length,1);
  assert(frozen.every(t=>t.className.includes('green-top')&&!t.className.includes('purple')));
  assert(p.submitted.some(t=>t.className==='tube-lavender'));
  assert(p.draw.some(t=>t.className==='tube-red'));
  assert.match(p.rows.find(t=>t.testCode==='93932').specialInstructions,/do not spin/i);
  assert.match(p.rows.find(t=>t.testCode==='1468').specialInstructions,/NO GEL/);
});
test('Labcorp 8 compatible refrigerated serum orders pool in 4 standard transport tubes, not 8 dedicated frozen tubes',async()=>{
  const p=(await planner('Labcorp'))(codes.Labcorp);
  assert.deepEqual(Array.from(p.bags,b=>b.label),['Refrigerated bag']);
  assert.equal(p.draw.length,1);
  assert.equal(p.draw[0].className,'tube-sst');
  assert.equal(p.draw[0].count,4);
  assert.equal(p.submitted.reduce((sum,x)=>sum+x.count,0),4);
  assert(p.submitted.every(t=>t.label==='Transport Tube'&&t.className.includes('green-top')));
  assert(p.rows.every(t=>t.drawContainer==='SST / Gold'&&t.alternativeContainer==='Red Top'));
});
test('Batch 13 never enables slide, smear, acid-preserved urine, or unsupported collection kit instructions',()=>{
  for(const lab of Object.keys(codes)){
    for(const rec of bundle(lab)){
      assert.doesNotMatch([rec.drawContainer,rec.transportContainer,rec.specialInstructions].join(' '),/prepared (?:slide|smear)|acid.preserved|green.label aptima|insure card/i);
    }
  }
});
