'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const root = path.join(__dirname,'..');
const read = f => fs.readFileSync(path.join(root,f),'utf8');
const modules = {
  Quest:[
    'assets/js/quest-verified-mixed-expansion-20261116-batch29.js',
    'assets/js/quest-verified-mixed-expansion-20261116-batch30.js'
  ],
  Labcorp:[
    'assets/js/labcorp/catalog/verified-specialty-expansion-20261116-batch29.js',
    'assets/js/labcorp/catalog/verified-coagulation-expansion-20261116-batch30.js'
  ]
};
const load = lab => {
 const window = {SEED_TESTS:[]};
 for(const file of modules[lab]) vm.runInNewContext(read(file),{window});
 return new Map(window.SEED_TESTS.map(r=>[r.testCode,r]));
};
const openCalculator = require('./helpers/calculator-vm.cjs');
function getCalculatorSstFns(lab) {
 return openCalculator(lab === 'Quest' ? 'assets/js/app.js' : 'labcorp-app.js',
   ['sstEstimateForTests','tigerSstEstimateForTests']);
}
test('Quest 92062 plans two Gold OR one Tiger plus a separate lavender; 10379 stays one SST plus lavender',()=>{
 const rows=load('Quest');
 const f=getCalculatorSstFns('Quest');
 for(const [code,gold,tiger] of [['92062',2,1],['10379',1,1]]) {
  const r=rows.get(code);
  assert.equal(f.sstEstimateForTests([r]).totalTubes,gold);
  assert.equal(f.tigerSstEstimateForTests([r]).totalTubes,tiger);
  assert.equal(r.additionalDrawRequirements.length,1);
  assert.equal(r.additionalDrawRequirements[0].container,'Lavender EDTA');
  assert.equal(r.additionalDrawRequirements[0].count,1);
 }
 assert.equal(rows.get('92062').usePreferredSerumYield,true);
});
test('Labcorp 3-5mL preferred serum profiles plan Gold/Tiger volumes without blanket 2-tube forcing',()=>{
 const rows=load('Labcorp');
 const f=getCalculatorSstFns('Labcorp');
 const cases=[
  ['520149',1,1],['520298',1,1],['520293',1,1],
  ['520194',1,1],['520555',2,2],['006981',1,1],
  ['520340',2,2],['520059',1,1],['520385',1,1]
 ];
 for(const [code,gold,tiger] of cases) {
  const r=rows.get(code);
  assert(r,code+' not found');
  assert.equal(f.sstEstimateForTests([r]).totalTubes,gold,code+' Gold');
  assert.equal(f.tigerSstEstimateForTests([r]).totalTubes,tiger,code+' Tiger');
 }
 for(const code of ['520149','520298','520293','520194','520555','006981']) assert.equal(rows.get(code).usePreferredSerumYield,true);
});
test('multi-aliquot coagulation submission counts stay separate from draw counts',()=>{
 const q=load('Quest').get('19681');
 assert.equal(q.collectionCount,4);
 assert.equal(q.submissionCount,4);
 const l=load('Labcorp').get('086284');
 assert.equal(l.collectionCount,3);
 assert.equal(l.submissionCount,3);
 for(const code of ['117921','117713','117340','117359','117739']) {
  const r=load('Labcorp').get(code);
  assert.equal(r.collectionCount,1,code);
  assert.equal(r.submissionCount,1,code);
  assert.equal(r.transportContainer,'Frozen Transport Tube (Purple Cap)');
 }
});
test('Legacy Quest tests retain the volume estimate when no compatible pool applies',()=>{
 const js=read('assets/js/app.js');
 assert.match(js,/usePreferredSerumYield: record\.usePreferredSerumYield === true/);
 assert.match(js,/needsPreferredSerumYieldSstCount\(test\).*&& plannedMl !== null/);
 const fn=getCalculatorSstFns('Quest');
 const unflagged={drawContainer:'SST / Gold',preferredVolume:'4 mL serum',minimumVolume:'2 mL serum',collectionCount:1};
 assert.equal(fn.sstEstimateForTests([unflagged]).totalTubes,2);
 assert.equal(fn.tigerSstEstimateForTests([unflagged]).totalTubes,1);
});
