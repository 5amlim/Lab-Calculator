'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const folder = 'assets/js/labcorp/catalog/';
const inOrder = [
  'verified-mixed-expansion-20261116-batch17.js',
  'verified-mixed-expansion-20261116-batch18.js',
  'verified-serum-specialty-20261116-batch26.js',
  'verified-specialty-expansion-20261116-batch29.js',
  'verified-coagulation-expansion-20261116-batch30.js'
];
function run(names, existing = []) {
  const window = { SEED_TESTS: existing };
  for (const name of names) {
    vm.runInNewContext(fs.readFileSync(path.join(root, folder, name), 'utf8'), { window }, { filename: name });
  }
  return window.SEED_TESTS;
}
const later = inOrder.slice(-2);
const duplicateCodes = [
  '006981', '117150', '117340', '117359', '117713', '117739', '117921',
  '520059', '520134', '520149', '520194', '520293', '520298'
];

test('later verified November batches reconcile 13 duplicate codes once', () => {
  const rows = run(inOrder);
  for (const code of duplicateCodes) {
    const matches = rows.filter(row => row.testCode === code);
    assert.equal(matches.length, 1, code + ' duplicated');
    const row = matches[0];
    assert.equal(row.status, 'active', code);
    assert.ok(row.searchAliases?.length >= 2, code + ' lost shorthand aliases');
    assert.ok(row.clinicalCategories?.length >= 1, code + ' lost category filters');
    assert.ok(row.specialLabeling?.trim(), code + ' lost specimen label');
  }
  const by = new Map(rows.map(row => [row.testCode, row]));
  assert.equal(by.get('006981').collectionCount, 1, 'Autoimmune Profile uses yield-based SST calculation');
  assert.equal(by.get('006981').usePreferredSerumYield, true);
  for (const code of ['117340', '117359', '117713', '117739', '117921']) {
    assert.match(by.get(code).specialInstructions, /double[- ]centrifug|double[- ]spin/i, code + ' PPP workflow');
    assert.match(by.get(code).transportTemperature, /frozen/i);
  }
});

test('existing older active rows and clinic-blocked rows remain untouched', () => {
  const older = { id: 'legacy-approved', testCode: '117921', testName: 'Previously approved', status: 'active', specialInstructions: 'Original instructions' };
  const blocked = { id: 'blocked-test', testCode: '117739', testName: 'Blocked', status: 'blocked' };
  const rows = run(later, [older, blocked]);
  assert.equal(rows.find(row => row.testCode === '117921'), older);
  assert.equal(older.specialInstructions, 'Original instructions');
  assert.equal(rows.find(row => row.testCode === '117739'), blocked);
  assert.equal(blocked.status, 'blocked');
  assert.equal(rows.filter(row => row.testCode === '117921').length, 1);
  assert.equal(rows.filter(row => row.testCode === '117739').length, 1);
});

test('updated catalog scripts load before app with fresh cache keys', () => {
  const html = fs.readFileSync(path.join(root, 'labcorp.html'), 'utf8');
  const a = html.indexOf('verified-specialty-expansion-20261116-batch29.js?v=20261117-audit2');
  const b = html.indexOf('verified-coagulation-expansion-20261116-batch30.js?v=20261117-audit2');
  const app = html.indexOf('labcorp-app.js');
  assert.ok(a >= 0 && b > a && app > b);
});
