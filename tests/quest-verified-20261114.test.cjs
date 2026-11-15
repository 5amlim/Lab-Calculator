'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const bundles = [
  'assets/js/quest-verified-urine-20261114.js',
  'assets/js/quest-verified-blood-specialty-20261114.js',
  'assets/js/quest-verified-microbiology-20261114.js',
  'assets/js/quest-verified-gestational-20261114.js'
];
function catalog() {
  return bundles.flatMap(bundle => {
    const match = read(bundle).match(/const additions=(\[[\s\S]*?\]);\nfor\(const test of additions\)/);
    assert.ok(match, bundle + ' contains a JSON additions catalog');
    return JSON.parse(match[1]);
  });
}
test('Official Quest additions retain the established normalized schema, unique codes and direct provenance', () => {
  const tests = catalog();
  assert.equal(tests.length, 29);
  assert.equal(new Set(tests.map(t => t.testCode)).size, 29);
  for (const entry of tests) {
    assert.match(entry.testCode, /^\d+$/);
    assert.equal(entry.status, ['91448','11290'].includes(entry.testCode) ? 'blocked' : 'active');
    for (const key of ['id','testName','specimenType','drawContainer','transportContainer','preferredVolume','minimumVolume','transportTemperature','stability','spin','specialInstructions','source']) {
      assert.ok(String(entry[key] || '').trim(), entry.testCode + ' missing ' + key);
    }
    assert.ok(entry.source.includes('/test/test-detail/' + entry.testCode + '/'));
  }
});
test('Multi-specimen assays contain required additional draw plans', () => {
  const byCode = new Map(catalog().map(t => [t.testCode, t]));
  for (const code of ['19704','10372','12736','34194','1430','19834','16292']) {
    assert.ok(byCode.get(code).additionalDrawRequirements?.length > 0, code + ' requires additional specimen');
  }
  assert.equal(byCode.get('1430').additionalDrawRequirements[0].count, 1);
  assert.equal(byCode.get('19834').additionalDrawRequirements[0].count, 1);
  assert.equal(byCode.get('16292').additionalDrawRequirements[0].count, 3);
  assert.ok(byCode.get('19704').specialInstructions.includes('SECOND time'));
  assert.ok(byCode.get('10372').additionalDrawRequirements.some(x => /Lavender/.test(x.container)));
});
test('Local no-acid Quest pathways and independent cord/gestational groups', () => {
  const byCode = new Map(catalog().map(t => [t.testCode, t]));
  for (const code of ['523','39625','1648']) {
    const t = byCode.get(code);
    assert.equal(t.status, 'active');
    assert.equal(t.transportContainer, 'Sterile cup');
    assert.equal(t.transportTemperature, 'Frozen');
    assert.doesNotMatch(t.drawContainer, /HCl|acid[- ]preserv/i);
    assert.doesNotMatch(t.transportContainer, /HCl|acid[- ]preserv/i);
    assert.match(t.specialInstructions, /pH is 6 or below/i);
    assert.match(t.specialInstructions, /FREEZE/i);
  }
  assert.match(byCode.get('15281').drawContainer, /no preservative/);
  assert.match(byCode.get('4555').drawContainer, /no preservative/);
  assert.match(byCode.get('229').specialInstructions, /HCl-preserved urine is REJECTED/);
  const app = read('assets/js/app.js');
  assert.ok(app.includes('applyLocalSupplyPolicy'));
  assert.ok(app.includes('const dedicatedBlood ='));
  assert.ok(app.includes('/\\bcord\\b/i'));
  assert.ok(app.includes('/\\bgestational\\b/i'));
});
test('Verified addons precede the guarded directory-only fallback and application initialization', () => {
  const html = read('index.html');
  const positions = bundles.map(file => html.indexOf(file));
  const fallback = html.indexOf('quest-missing-directory-loader-20261114.js');
  const app = html.indexOf('assets/js/app.js?v=');
  assert.ok(positions.every(pos => pos >= 0 && pos < fallback));
  assert.ok(fallback > 0 && fallback < app);
});

test('Correct physical specimens and submission devices for Quest new codes', () => {
  const byCode = new Map(catalog().map(t => [t.testCode, t]));
  for (const code of ['8280','15281','4555']) {
    const entry = byCode.get(code);
    assert.match(entry.drawContainer, /Timed Urine|24-Hour Urine/);
    assert.match(entry.transportContainer, /Urinalysis Transport Tube \(Yellow-Top, Blue Fill Line\)/);
    assert.equal(entry.collectionCount || 1, 1);
    assert.equal(entry.submissionCount || 1, 1);
    assert.match(entry.specialInstructions, /ONE labeled UA transport tube/);
  }
  for (const code of ['523','39625','1648']) {
    assert.equal(byCode.get(code).transportContainer, 'Sterile cup');
  }
  assert.match(byCode.get('229').transportContainer, /Urine Aliquot Transport Tube/);
  assert.match(byCode.get('19081').transportContainer, /ACD Yellow Top/);
  assert.equal(byCode.get('70028').drawContainer, 'Sterile cup');
  assert.equal(byCode.get('34194').additionalDrawRequirements[0].container, 'Sterile cup');
  assert.equal(byCode.get('4556').drawContainer, 'Sterile cup');
  const affirm = byCode.get('14577');
  assert.equal(affirm.status, 'active');
  assert.match(affirm.drawContainer, /BD Affirm VPIII ATTS/i);
  assert.equal(affirm.drawContainer, affirm.transportContainer);
  assert.match(affirm.specialInstructions, /72 hours/i);
  for (const code of ['91448','11290']) {
    assert.equal(byCode.get(code).status, 'blocked');
    assert.notEqual(byCode.get(code).drawContainer, 'Do Not Collect');
    assert.notEqual(byCode.get(code).transportContainer, 'N/A');
  }
  assert.equal(byCode.get('4556').transportContainer, byCode.get('4556').drawContainer);
  assert.equal(byCode.get('16292').additionalDrawRequirements[0].count, 3);
  assert.equal(byCode.get('1430').additionalDrawRequirements[0].count, 1);
});
test('Collection source count does not use the blood capacity formula on other specimen types', () => {
  const app = read('assets/js/app.js');
  assert.match(app, /if \(collectionSpecimenGroupForTest\(test\) !== 'blood'\) return explicit;/);
  assert.match(app, /Yellow-Top UA Preservative Tube \(Blue Fill Line\)/);
  assert.match(app, /function applyLocalSupplyPolicy/);
  assert.match(app, /Separate labeled Sterile cup for each specimen source/);
  assert.match(app, /const matchingSpecialOriginal =/);
  assert.match(app, /19081': \{ count: 1, tubeMl: 5, dedicated: true \}/);
  assert.match(app, /Quest Diagnostics \(\?:official test directory, reviewed\|test directory, verified\) 2026-11-14/);
});
