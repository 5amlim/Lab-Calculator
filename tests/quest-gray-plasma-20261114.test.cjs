'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const source = read('assets/js/quest-gray-plasma-processing-20261114.js');
const codes = ['8477','19833','484','1430','19834','16292','35181','18927','6745'];
const expectedDraws = {8477:1,19833:1,484:1,1430:2,19834:2,16292:4,35181:2,18927:3,6745:4};
function load(extra=[]) {
  const sandbox = {window: {SEED_TESTS:extra}};
  vm.runInNewContext(source, sandbox);
  return sandbox.window;
}
test('Quest fluoride/oxalate glucose tests all produce a separated-plasma submission pathway', () => {
  const {SEED_TESTS} = load();
  assert.equal(SEED_TESTS.length, 9);
  assert.equal(new Set(SEED_TESTS.map(t => t.testCode)).size, 9);
  for(const code of codes) {
    const t=SEED_TESTS.find(t=>t.testCode===code);
    assert.ok(t, 'Missing '+code);
    assert.equal(t.spin, 'Yes', code);
    assert.equal(t.specimenType, 'Plasma', code);
    assert.match(t.drawContainer, /Gray Top.*Fluoride/i, code);
    assert.match(t.transportContainer, /Plastic Screw-Cap Plasma Vial.*No Additive/i, code);
    assert.match(t.specialInstructions, /centrifuge within 1 hour/i, code);
    assert.match(t.specialInstructions, /NEW, clean, additive-free plastic screw-cap transport vial/i, code);
    assert.match(t.specialInstructions, /Do NOT transfer separated plasma into another additive-containing gray-top Vacutainer/i, code);
    assert.match(t.source, new RegExp('/test/test-detail/'+code+'/'), code);
    assert.equal(t.collectionCount,1,code);
    assert.equal(t.submissionCount,1,code);
    assert.equal(1+t.additionalDrawRequirements.length,expectedDraws[code],code);
    for(const x of t.additionalDrawRequirements) {
      assert.equal(x.spin,'Yes',code);
      assert.equal(x.count,1,code);
      assert.equal(x.specimenType,'Plasma',code);
      assert.match(x.transportContainer,/No Additive/,code);
      assert.match(x.specialLabeling,/hour/i,code);
    }
  }
});
test('50g one-hour screens are not mistaken for fasting GTTs',()=>{
 const {SEED_TESTS}=load();
 for(const code of ['8477','19833']) {
   const t=SEED_TESTS.find(t=>t.testCode===code);
   assert.equal(t.fastingStatus,'',code);
   assert.match(t.specialLabeling,/1-hour/,code);
   assert.equal(t.additionalDrawRequirements.length,0,code);
 }
 for(const code of ['1430','19834','16292','35181','18927','6745','484']) {
   assert.equal(SEED_TESTS.find(t=>t.testCode===code).fastingStatus,'required',code);
 }
});
test('Existing built-in records are updated without duplicates; blocked records remain blocked',()=>{
 const extra=[{id:'original-8477',testCode:'8477',testName:'legacy',spin:'No',status:'active'},
 {id:'blocked-484',testCode:'484',status:'blocked'},
 {id:'unrelated-test',testCode:'999999',status:'active'}];
 const w=load(extra);
 assert.equal(w.SEED_TESTS.find(t=>t.testCode==='8477').id,'original-8477');
 assert.equal(w.SEED_TESTS.find(t=>t.testCode==='8477').spin,'Yes');
 assert.equal(w.SEED_TESTS.find(t=>t.testCode==='484').status,'blocked');
 assert.equal(w.SEED_TESTS.find(t=>t.testCode==='999999').id,'unrelated-test');
 const first=w.SEED_TESTS.length;
 vm.runInNewContext(source,{window:w});
 assert.equal(w.SEED_TESTS.length,first);
});
test('Collection and bag planners dedicate each gray-top sample and its plastic transport vial',()=>{
 const app=read('assets/js/app.js');
 assert.match(app,/function isGrayFluoridePlasmaTransfer\(test\)/);
 assert.match(app,/if \(isGrayFluoridePlasmaTransfer\(test\)\) return true;/);
 assert.match(app,/if \(isGrayFluoridePlasmaTransfer\(test\)\) return false;/);
 assert.match(app,/timed-gray-plasma/);
 assert.match(app,/gray-oxalate-separated-plasma/);
 assert.match(app,/Plastic Plasma Transport Vial \(Additive-Free\)/);
 assert.match(app,/key: \`gray-oxalate-separated-plasma\|\$\{test\.id\}\`/);
 assert.match(app,/Quest Diagnostics \(\?:official test directory, reviewed\|test directory, verified\)/);
});
test('New data loads after other verified test records and before directory-only fallback and app',()=>{
 const html=read('index.html');
 const p=html.indexOf('quest-gray-plasma-processing-20261114.js');
 const v=html.indexOf('quest-verified-gestational-20261114.js');
 const d=html.indexOf('quest-missing-directory-loader-20261114.js');
 const a=html.indexOf('assets/js/app.js?v=12.95');
 assert.ok(v>=0&&v<p&&p<d&&d<a);
});
