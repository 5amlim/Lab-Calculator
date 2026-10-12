// Regression checks for the clinic collection/transport workflow.
// Run: node qa_urine_collection_audit.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = __dirname;
const context = {
  window: {},
  document: { getElementById() { return null; }, querySelectorAll() { return []; } },
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  console,
  Date,
  URL,
  Blob,
  setTimeout,
  clearTimeout,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
let app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
app = app.replace('  init();\n', '  // init skipped in audit harness\n');
app = app.replace(/\}\)\(\);\s*$/, `  window.__audit = { seedDatabase, normalizeRecord, buildTransportBagPlan,
    buildCollectionPlan, buildSubmissionContents, requiredDrawContainerBadges,
    printContainerBadges, printCollectionSubmissionPlan,
    isOriginalContainerSubmission, is24HourUrineTest };
})();`);
vm.runInContext(app, context);
const api = context.window.__audit;
assert.ok(api, 'audit API loaded');
const db = api.seedDatabase;
const urine = db.filter(x => /\burine\b/i.test(x.specimenType));
// The complete catalog must remain renderable, not just urine tests.
for (const test of db) {
  assert.ok(api.requiredDrawContainerBadges(test, 'print-tube-badge'),
    `${test.testCode} collection badge renders`);
  api.printContainerBadges(test);
  const bags = api.buildTransportBagPlan([test]);
  api.buildCollectionPlan([test], bags);
  for (const bag of bags) api.buildSubmissionContents(bag);
}
assert.equal(db.length, 2680, 'all catalog tests loaded');
assert.equal(urine.length, 192, 'urine test population');
for (const test of urine) {
  assert.match(test.drawContainer, /^(Sterile Urine Cup|24-Hour Urine Container|Do Not Collect)$/,
    `urine collection source for ${test.testCode}`);
}
// Exercise collection and submission builders for every urine entry, not just
// the specific urine culture and UA examples supplied by the user.
for (const test of urine) {
  const bags = api.buildTransportBagPlan([test]);
  const collection = api.buildCollectionPlan([test], bags);
  const submission = bags.flatMap(bag => api.buildSubmissionContents(bag));
  api.printContainerBadges(test);
  assert.ok(Array.isArray(submission), `${test.testCode} submission plan generated`);
  if (test.drawContainer === 'Sterile Urine Cup') {
    assert.ok(collection.some(item => item.label === 'Sterile Urine Cup'),
      `${test.testCode} retains initial sterile cup`);
    assert.equal(collection.some(item => /gray[- ]?top urine|red\s*\/\s*yellow/i.test(item.label)), false,
      `${test.testCode} avoids preservative tubes in collection list`);
  }
  if (test.drawContainer === '24-Hour Urine Container') {
    assert.ok(collection.some(item => item.label === '24-Hour Urine Container'),
      `${test.testCode} retains 24-hour collection jug`);
  }
}
for (const code of ['395','91684','16174']) {
  const test = urine.find(x => x.testCode === code);
  assert.equal(test.drawContainer, 'Sterile Urine Cup', `${code} initial cup`);
  assert.match(test.transportContainer, /Gray-Top Urine Culture Preservative Tube/,
    `${code} gray urine transport tube`);
  const original = api.isOriginalContainerSubmission(test);
  assert.equal(original, false, `${code} requires separate submission`);
  const bags = api.buildTransportBagPlan([test]);
  const collect = api.buildCollectionPlan([test], bags);
  assert.equal(collect.length, 1, `${code} collects only cup`);
  assert.equal(collect[0].label, 'Sterile Urine Cup', `${code} collection plan shows cup`);
  assert.match(api.requiredDrawContainerBadges(test, 'print-tube-badge'), /Sterile Urine Cup/);
  assert.match(api.printContainerBadges(test), /Gray-Top Urine Culture Preservative Tube/);
}
for (const code of ['5463','3020','288','7048']) {
  const test = urine.find(x => x.testCode === code);
  assert.equal(test.drawContainer, 'Sterile Urine Cup', `${code} initial cup`);
  assert.match(test.transportContainer, /UA Preservative Tube/);
}
for (const [code, drawContainer, transportContainer] of [
  ['395','Gray-Top Urine Culture Preservative Tube','Gray-Top Urine Culture Preservative Tube'],
  ['395','Gray-top urine transport tube','Gray-top urine transport tube'],
  ['5463','Red/Yellow Swirl UA Preservative Tube','Red/Yellow Swirl UA Preservative Tube'],
  ['3020','Red/Yellow Swirl UA Preservative Tube','Red/Yellow Swirl UA Preservative Tube + Gray-Top Urine Culture Preservative Tube'],
]) {
  const test = api.normalizeRecord({ ...urine.find(x => x.testCode === code), drawContainer, transportContainer });
  assert.equal(test.drawContainer, 'Sterile Urine Cup', `${code} repairs outdated saved override`);
  assert.match(api.requiredDrawContainerBadges(test, 'print-tube-badge'), /Sterile Urine Cup/);
}
for (const code of ['14962','XXX','1635']) {
  const test = urine.find(x => x.testCode === code);
  assert.notEqual(test.drawContainer, 'Sterile Urine Cup', `${code} special collection preserved`);
}
const stool = db.find(x => /stool/i.test(x.specimenType));
assert.equal(api.normalizeRecord(stool).drawContainer, stool.drawContainer, 'stool collection unchanged');
const blood = db.find(x => /serum/i.test(x.specimenType));
assert.equal(api.normalizeRecord(blood).drawContainer, blood.drawContainer, 'blood collection unchanged');
console.log(`PASS: ${db.length} catalog records checked, ${urine.length} urine entries reviewed; urine culture, UA, custom overrides, 24-hour, stool and blood regression checks passed.`);
