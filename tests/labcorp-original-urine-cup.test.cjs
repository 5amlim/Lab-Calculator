const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = relative => fs.readFileSync(path.join(__dirname, '..', relative), 'utf8');

const context = vm.createContext({
  window: { SEED_TESTS: [] },
  document: { getElementById: () => null, querySelectorAll: () => [] },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  console
});
for (const filename of [
  'labcorp-urgent-pcp-data.js',
  'labcorp-screening-immunity-data.js',
  'labcorp-verified-toxassure-urine-20261022.js'
]) vm.runInContext(read(filename), context, { filename });

vm.runInContext(read('labcorp-app.js').replace('  init();',
  '  window.testApi={normalizeRecord,menuContainerBadges,buildTransportBagPlan,' +
  'buildCollectionPlan,buildSubmissionContents,printCollectionSubmissionPlan,' +
  'isOriginalContainerSubmission};'), context);
const api = context.window.testApi;
const find = code => {
  const record = context.window.SEED_TESTS.find(row => row.testCode === code);
  assert(record, 'Real catalog record missing: ' + code);
  return api.normalizeRecord(record);
};
const contents = tests => api.buildTransportBagPlan(tests)
  .flatMap(bag => api.buildSubmissionContents(bag));
const collection = tests => api.buildCollectionPlan(tests, api.buildTransportBagPlan(tests));

for (const code of ['140285', '003129', '912334', '912847']) {
  const test = find(code);
  assert.equal(test.drawContainer, 'Sterile cup', code + ': source is sterile cup');
  assert.equal(test.transportContainer, 'Sterile cup', code + ': submit original cup');
  assert.equal(api.isOriginalContainerSubmission(test), true);
  assert.doesNotMatch(api.menuContainerBadges(test), /container-path-arrow/,
    code + ': no false transfer arrow');
  const submission = contents([test]);
  assert.equal(submission.length, 1);
  assert.equal(submission[0].count, 1);
  assert.equal(submission[0].label, 'Sterile cup');
  assert.equal(submission[0].originalTube, true);
  assert.match(submission[0].detail, /original sterile cup; no transfer/i);
  const printed = api.printCollectionSubmissionPlan([test]);
  assert(printed.includes(test.testCode) && printed.includes('What to submit'));
  assert.match(printed, /Submit original sterile cup · No transfer/i);
}

const direct = [find('140285'), find('003129')];
assert.equal(collection(direct).filter(x => x.label === 'Sterile cup')
  .reduce((n, x) => n + x.count, 0), 1,
  'Two compatible random urine assays collect into one sterile cup');
const directSubmit = contents(direct);
assert.equal(directSubmit.length, 1, 'Same unpreserved urine specimen shares one submission cup');
assert.equal(directSubmit[0].count, 1, 'One physical cup, not an extra fake aliquot');
assert.equal(directSubmit[0].tests.length, 2);

const combined = [find('140285'), find('377036')];
assert.match(api.menuContainerBadges(combined[1]), /container-path-arrow/,
  'Urinalysis/culture still requires the actual preservative tubes');
assert.equal(collection(combined).filter(x => x.label === 'Sterile cup')
  .reduce((n, x) => n + x.count, 0), 1,
  'One source cup supplies compatible random urine assays');
const combinedSubmissions = contents(combined);
assert(combinedSubmissions.some(x => x.label === 'Sterile cup' && x.originalTube));
assert(combinedSubmissions.some(x => /Swirl UA/i.test(x.label) && !x.originalTube));
assert(combinedSubmissions.some(x => /Urine Culture Preservative/i.test(x.label) && !x.originalTube));
assert.equal(combinedSubmissions.reduce((n, x) => n + x.count, 0), 3);
assert.match(api.printCollectionSubmissionPlan(combined), /original cup for direct-submit tests/i);

const stool = find('008144');
assert.match(api.menuContainerBadges(stool), /container-path-arrow/);
assert(contents([stool]).some(x => /Cary-Blair/.test(x.label)));

const fixture = (code, transport) => api.normalizeRecord({
  id: 'fixture-' + code, testCode: code, testName: 'Test urine ' + code,
  specimenType: 'Urine', drawContainer: 'Sterile Urine Cup',
  transportContainer: transport, transportTemperature: 'Room Temperature',
  preferredVolume: '10 mL urine', minimumVolume: '2 mL', spin: 'No'
});
for (const transport of [
  'Sterile Urine Cup (original specimen)',
  'Submit in Original Sterile Cup',
  'Plastic Urine Container, No Preservative',
  'Plastic urine container without preservative',
  'Sterile specimen cup (urine)'
]) {
  const t = fixture('910001', transport);
  assert.equal(t.transportContainer, 'Sterile cup', 'Direct cup alias: ' + transport);
  assert.doesNotMatch(api.menuContainerBadges(t), /container-path-arrow/);
  assert.equal(contents([t])[0].label, 'Sterile cup');
}
for (const transport of [
  'Plastic Urine Aliquot Container',
  'Gray Top Urine Culture Tube',
  'Aptima Urine Transport Tube',
  'Amber Frozen Urine Transport Tube',
  'Acidified Plastic Urine Aliquot Container'
]) {
  const t = fixture('910002', transport);
  assert.notEqual(t.transportContainer, 'Sterile cup',
    'Special transport cannot be disguised as an original cup: ' + transport);
  assert.match(api.menuContainerBadges(t), /container-path-arrow/);
}
console.log('PASS: direct LabCorp urine cups, pooled original specimens, preserved transfers and printed instructions');
