'use strict';
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {resolve} = require('node:path');
const {test} = require('node:test');
const vm = require('node:vm');
const openCalculator = require('./helpers/calculator-vm.cjs');

const root = resolve(__dirname, '..');
const read = path => readFileSync(resolve(root, path), 'utf8');

for (const app of ['assets/js/app.js', 'labcorp-app.js']) {
  test(app+' preserves the compatible SST pool boundaries and dedicated counts', () => {
    const api = openCalculator(app, ['normalizeRecord', 'sstEstimateForTests', 'tigerSstEstimateForTests']);
    const makeRecord = (index, fields) => api.normalizeRecord({
      id: 'audit-'+index, testCode: String(700000+index), testName: 'Audit fixture '+index,
      specimenType: 'Serum', drawContainer: 'SST / Gold', transportContainer: 'Transport Tube',
      preferredVolume: '2 mL serum', minimumVolume: '1 mL serum',
      transportTemperature: 'Refrigerated', spin: 'Yes', ...fields
    });
    const cart = Array.from({length: 11}, (_, index) => makeRecord(index));
    for (const estimate of [api.sstEstimateForTests, api.tigerSstEstimateForTests]) {
      for (const [count, target] of [[0, 0], [1, 1.5], [9, 13.5], [10, 12], [11, 13.2]]) {
        assert(Math.abs(estimate(cart.slice(0, count)).sharedMl-target)<1e-8, 'pool size '+count);
      }
      assert.equal(estimate([makeRecord(50, {preferredVolume: '5 mL', minimumVolume: '4 mL'})]).totalTubes, 2);
      assert.equal(estimate([makeRecord(51, {collectionCount: 3})]).dedicatedTubes, 3);
      assert.equal(estimate([makeRecord(52, {preferredVolume: '', minimumVolume: ''})]).unmeasuredTubes, 1);
    }
    assert.equal(api.sstEstimateForTests(cart.slice(0, 4)).totalTubes, 3);
    assert.equal(api.tigerSstEstimateForTests(cart.slice(0, 4)).totalTubes, 2);
  });
}

test('workbook fallback cannot replace an explicit pair, protected row or manual review', () => {
  const row = (code, destination = '', blocked = 0, review) =>
    [code, 'Fixture', 'Serum', destination, 'Fixture destination', blocked, '', 'active', review];
  const rows = [row('16802', '001453'), row('211'), row('223', '', 0, [['001081', 'Review only']]), row('234', '', 1)];
  const window = {QUEST_TO_LABCORP_INDEX: rows};
  vm.runInNewContext(read('labcorp-quest-workbook-crosswalk-overrides.js'), {window});
  window.applyQuestLabcorpWorkbookMatches([
    ['102525', 'A1c with eAG'], ['004440', 'ACTH'], ['001081', 'Albumin'], ['001107', 'Alkaline Phosphatase']
  ]);
  assert.deepEqual(rows.slice(0, 4).map(item => item[3]), ['001453', '004440', '', '']);
});

test('published catalogs execute the HTML overlays and apply clinical holds', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  const [quest, labcorp] = await Promise.all(labs.map(lab => loadCalculator(root, lab, {captureRecords: true})));
  assert.equal(quest.records.filter(row => row.testCode === '10676').length, 1);
  assert.equal(quest.records.find(row => row.testCode === '10676').id, 'quest-tc-20261125-10676');
  assert.equal(labcorp.records.find(row => row.testCode === '501533').status, 'blocked');
  assert(!labcorp.index.tests.some(row => row[0] === '501533'));
  quest.globals.applyQuestLabcorpWorkbookMatches(labcorp.index.tests);
  const row = code => quest.globals.QUEST_TO_LABCORP_INDEX.find(row => row[0] === code);
  assert.equal(row('16802')[3], '102525');
  assert.equal(row('937')[3], '');
  assert.equal(row('937')[8][0][0], '028142');

  const source = read('labcorp-crosswalk-ui.js');
  const reverseSource = source.slice(source.indexOf('  function buildReverse('), source.indexOf('  function getRows('));
  const reverse = vm.runInNewContext(reverseSource+'\nbuildReverse(index)', {
    rows: quest.globals.QUEST_TO_LABCORP_INDEX,
    sourceType: row => row[7] || 'uncoded', index: labcorp.index
  });
  const partial = reverse.find(item => item.code === '028142').matches.find(match => match.code === '937');
  assert.equal(partial.status, 'review');
  assert.match(partial.basis, /Partial panel match only/);
});
