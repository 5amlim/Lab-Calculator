'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const modules = {
 Quest:'assets/js/quest-verified-mixed-expansion-20261116-batch29.js',
 Labcorp:'assets/js/labcorp/catalog/verified-specialty-expansion-20261116-batch29.js'
};
const expected = {
 Quest:['37675'],
 Labcorp:['520059','520149','520340','520298','520293','520194','520555','520385','006981']
};
function load(lab, existing=[]) {
 const window={SEED_TESTS:existing};
 vm.runInNewContext(read(modules[lab]),{window},{filename:modules[lab]});
 return window.SEED_TESTS;
}
test('corrected batch29 contains only genuinely additional active code records',()=>{
 for (const lab of Object.keys(expected)) {
  const rows=load(lab);
  assert.deepEqual(rows.map(x=>x.testCode), expected[lab]);
  assert.equal(new Set(rows.map(x=>x.testCode)).size, expected[lab].length);
  const html=read(lab==='Quest'?'index.html':'labcorp.html');
  const app=lab==='Quest'?'assets/js/app.js':'labcorp-app.js';
  assert.equal(html.split(modules[lab]).length-1, 1);
  assert(html.indexOf(modules[lab])<html.indexOf('src="'+app));
  for (const r of rows) {
   assert.equal(r.status,'active',r.testCode);
   for (const field of ['testCode','testName','specimenType','drawContainer','transportContainer',
     'preferredVolume','minimumVolume','transportTemperature','specialInstructions','source']) {
    assert(String(r[field]||'').trim(), r.testCode+' missing '+field);
   }
   assert(r.source.includes('/'+r.testCode+'/') || r.source.includes('/'+r.testCode+'?'));
   assert.equal(r.alternativeContainer,'');
   assert.doesNotMatch(r.drawContainer+' '+r.transportContainer,/slide|smear|acid.preserv|green.label aptima|insure card/i);
   assert(Array.isArray(r.searchAliases)&&r.searchAliases.length>0);
   assert(Array.isArray(r.clinicalCategories)&&r.clinicalCategories.length>0);
  }
 }
});
test('new batch29 updates pending catalog entries, never replaces verified or blocked ones',()=>{
 for (const lab of Object.keys(expected)) {
  const codes=expected[lab];
  const preserved=[
   {testCode:codes[0],testName:'verified and correct',status:'active'},
   {testCode:codes[1]||'SENTINEL',testName:'do not perform',status:'blocked'}
  ];
  const rows=load(lab,preserved);
  assert.equal(rows[0].testName,'verified and correct');
  assert.equal(rows[1].status,'blocked');
  const before=rows.length;
  load(lab,rows);
  assert.equal(rows.length,before);
  const pending=[{testCode:codes[0],testName:'reference only',status:'pending'}];
  load(lab,pending);
  assert.equal(pending[0].status,'active');
  assert.notEqual(pending[0].testName,'reference only');
 }
});
test('Quest 37675 is a single spun SST with no transfer',()=>{
 const q=load('Quest')[0];
 assert.equal(q.testCode,'37675');
 assert.equal(q.drawContainer,'SST / Gold');
 assert.equal(q.transportContainer,'SST / Gold (spun)');
 assert.equal(q.transportTemperature,'Room Temperature');
 assert.equal(q.spin,'Yes');
});
test('Labcorp new serum profiles have correct collection groups, minimum yields and transport',()=>{
 const m=new Map(load('Labcorp').map(x=>[x.testCode,x]));
 for (const r of m.values()) {
  assert.equal(r.specimenType,'Serum');
  assert.equal(r.drawContainer,'SST / Gold');
  assert.equal(r.spin,'Yes');
  assert.match(r.specialInstructions,/serum|SST/i);
 }
 for (const code of ['520059','520149','520340','520298','520293','520194']) {
  assert.equal(m.get(code).transportTemperature,'Refrigerated');
  assert.equal(m.get(code).transportContainer,'Transport Tube');
 }
 assert.equal(m.get('520340').collectionCount,2);
 assert.equal(m.get('520340').submissionCount,2);
 assert.equal(m.get('520340').preferredVolume,'5 mL serum');
 assert.equal(m.get('520555').transportTemperature,'Frozen');
 assert.equal(m.get('520555').transportContainer,'Frozen Transport Tube (Purple Cap)');
 assert.equal(m.get('520385').transportContainer,'SST / Gold (spun)');
 assert.equal(m.get('006981').transportTemperature,'Room Temperature');
});
test('new tests have correct clinical category filtering, no Quest region flag regression',()=>{
 const window={};
 vm.runInNewContext(read('assets/js/clinical-categories.js'),{window});
 const m=new Map([...load('Quest'),...load('Labcorp')].map(x=>[x.testCode,x]));
 for (const [code,category] of [
  ['37675','thyroid'],['520059','autoimmune'],
  ['520149','autoimmune'],['520340','autoimmune'],['520194','renal'],['520385','autoimmune']
 ])assert(window.LabClinicalCategories.forTest(m.get(code)).includes(category),code+' missing '+category);
 vm.runInNewContext(read('assets/js/market-restrictions.js'),{window});
 assert.equal(window.LabRegionalRestrictions.entry(m.get('37675'),'Quest'),null);
});
