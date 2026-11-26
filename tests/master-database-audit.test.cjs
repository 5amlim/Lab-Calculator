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

test('Quest 18634 separates the four serum aliquots from one original EDTA shipment', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  const {records} = await loadCalculator(root, labs[0], {captureRecords: true});
  const row = records.find(record => record.testCode === '18634');
  const api = openCalculator(labs[0].app, [
    'expandedCollectionTests', 'buildTransportBagPlan', 'buildCollectionPlan',
    'buildSubmissionContents', 'groupSubmissionContainersForPrint', 'applyUserState'
  ], {records: [row]});

  const legacy = {...row, preferredVolume: '9.7 mL serum', searchAliases: ['Site alias'],
    additionalDrawRequirements: [], specialInstructions: 'Obsolete instructions'};
  const [updated] = api.applyUserState({overrides: [legacy]});
  assert.equal(updated.preferredVolume, row.preferredVolume);
  assert.equal(updated.searchAliases[0], 'Site alias');
  const expanded = api.expandedCollectionTests([updated]);
  const bags = api.buildTransportBagPlan(expanded);
  const collection = api.buildCollectionPlan(expanded, bags);
  const total = items => items.reduce((count, item) => count + item.count, 0);
  assert.equal(total(collection), 5);
  assert.deepEqual(Array.from(collection, item => item.count).sort(), [1, 1, 3]);
  for (const bag of bags) {
    const items = api.buildSubmissionContents(bag);
    const refrigerated = bag.tests.every(test => test.transportTemperature === 'Refrigerated');
    assert.equal(total(items), refrigerated ? 4 : 1);
    assert(items.every(item => Boolean(item.originalTube) !== refrigerated));
    assert.equal(total(api.groupSubmissionContainersForPrint(items)), total(items));
  }
  assert.equal(bags.length, 2);
});

test('Quest 39749 cannot return to the cart or converter through saved data', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  const {records, index, globals} = await loadCalculator(root, labs[0], {captureRecords: true});
  const row = records.find(record => record.testCode === '39749');
  assert.equal(row.status, 'blocked');
  assert.match(row.specialInstructions, /39820.*spike.*nucleocapsid/);
  assert(!index.tests.some(test => test[0] === '39749'));
  const crosswalk = globals.QUEST_TO_LABCORP_INDEX.find(row => row[0] === '39749');
  assert.equal(crosswalk[3], '');
  assert.equal(crosswalk[7], 'discontinued');
  const api = openCalculator(labs[0].app, ['applyUserState'], {records: [row]});
  const active = {...row, status: 'active', specialInstructions: ''};
  const loaded = api.applyUserState({overrides: [active], customTests: [{...active, id: 'custom-39749'}]});
  assert.equal(loaded.filter(record => record.testCode === '39749' && record.status === 'blocked').length, 2);
});
