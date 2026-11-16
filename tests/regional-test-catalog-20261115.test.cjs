/* Regression coverage for the 14 source-backed regional test records. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.resolve(__dirname, '../assets/js/regional-catalog-20261115.js'), 'utf8');
function load(lab, prior = []) {
  const window = { SEED_TESTS: prior.map(t => ({ ...t })) };
  const document = { body: { dataset: { galleryLab: lab } } };
  vm.runInNewContext(source, { window, document });
  return window.SEED_TESTS;
}
const questCodes = ['90368','90369','90372','335','39481','16167','16973','17329','17332','16924','16592','19769','16866'];
test('all thirteen Quest codes are active and searchable, without Labcorp leakage', () => {
  const records=load('Q');
  assert.equal(records.length,13);
  assert.deepEqual(records.map(t=>t.testCode).sort(), questCodes.sort());
  records.forEach(t=>{assert.equal(t.status,'active');assert.ok(t.testName);assert.ok(t.drawContainer);assert.ok(t.transportContainer);assert.ok(t.source.startsWith('Quest official'))});
});
test('Labcorp filter-paper lead test is independently included with correct card', () => {
  const records=load('L');
  assert.equal(records.length,1);
  assert.equal(records[0].testCode,'791280');
  assert.equal(records[0].status,'active');
  assert.match(records[0].drawContainer,/Filter Paper Collection Card/);
  assert.match(records[0].specialInstructions,/not available in California or New York/i);
});
test('90368 is EDTA plasma to refrigerated standard transport tube, not original blood', () => {
  const record=load('Q').find(t=>t.testCode==='90368');
  assert.equal(record.specimenType,'Plasma');
  assert.equal(record.drawContainer,'Lavender EDTA');
  assert.equal(record.transportContainer,'Transport Tube');
  assert.equal(record.spin,'Yes');
  assert.equal(record.transportTemperature,'Refrigerated');
});
test('CA cholinesterase panels retain every separate draw and specimen class', () => {
  const m=new Map(load('Q').map(t=>[t.testCode,t]));
  for(const code of ['90369','39481']) {
    const t=m.get(code);
    assert.equal(t.spin,'No');
    assert.deepEqual(Array.from(t.additionalDrawRequirements,t=>t.specimenType),['Plasma','Serum']);
    assert.deepEqual(Array.from(t.additionalDrawRequirements,t=>t.transportContainer),['Transport Tube','Transport Tube']);
    assert.equal(t.additionalDrawRequirements[0].spin,'Yes');
  }
  assert.equal(m.get('90372').additionalDrawRequirements.length,1);
  assert.equal(m.get('90372').additionalDrawRequirements[0].specimenType,'Plasma');
});
test('NY lymphocyte panels do not accept lithium heparin or refrigerated whole blood', () => {
  for(const t of load('Q').filter(t=>['17329','17332'].includes(t.testCode))) {
    assert.equal(t.spin,'No');
    assert.equal(t.transportTemperature,'Room Temperature');
    assert.match(t.specialInstructions,/NOT lithium heparin/);
    assert.match(t.stability,/refrigeration.*unacceptable/i);
  }
});
test('24-hour selenium retains metal-free handling, not a generic urine cup', () => {
  const r=load('Q').find(t=>t.testCode==='16866');
  assert.match(r.drawContainer,/Metal-Free/);
  assert.match(r.transportContainer,/Metal-Free/);
  assert.doesNotMatch(r.transportContainer,/Sterile cup/i);
});
test('existing active and deliberately blocked records are not silently overwritten', () => {
  const active={testCode:'90368',testName:'existing active',status:'active',id:'original'};
  const blocked={testCode:'90369',testName:'existing blocked',status:'blocked',id:'blocked-original'};
  const records=load('Q',[active,blocked]);
  assert.equal(records.length,13);
  assert.equal(records.find(t=>t.testCode==='90368').testName,'existing active');
  assert.equal(records.find(t=>t.testCode==='90369').status,'blocked');
});
test('pending or reference placeholders upgrade without duplicating the code', () => {
  const records=load('Q',[{testCode:'90368',testName:'placeholder',status:'reference',id:'legacy'}]);
  assert.equal(records.length,13);
  const r=records.find(t=>t.testCode==='90368');
  assert.equal(r.id,'legacy');
  assert.equal(r.status,'active');
});
