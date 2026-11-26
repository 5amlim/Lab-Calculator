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
  assert.match(labcorp.records.find(row => row.testCode === '501533').collectionReview, /acid-preserved/);
  assert(labcorp.index.tests.some(row => row[0] === '501533'));
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

test('Quest 39749 remains searchable with its discontinuation warning', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  const {records, index, globals} = await loadCalculator(root, labs[0], {captureRecords: true});
  const row = records.find(record => record.testCode === '39749');
  assert.equal(row.status, 'active');
  assert.match(row.collectionReview, /39820.*spike.*nucleocapsid/);
  assert(index.tests.some(test => test[0] === '39749'));
  const crosswalk = globals.QUEST_TO_LABCORP_INDEX.find(row => row[0] === '39749');
  assert.equal(crosswalk[3], '');
  assert.equal(crosswalk[7], 'discontinued');
  const api = openCalculator(labs[0].app, ['applyUserState'], {records: [row]});
  const active = {...row, status: 'active', specialInstructions: ''};
  const loaded = api.applyUserState({overrides: [active], customTests: [{...active, id: 'custom-39749'}]});
  assert.equal(loaded.filter(record => record.testCode === '39749' && record.status === 'active' && record.collectionReview === row.collectionReview).length, 2);
});

test('Labcorp vendor deletions retain previously active search entries and stay unlinked', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  const [quest, labcorp] = await Promise.all(labs.map(lab => loadCalculator(root, lab, {captureRecords: true})));
  const app = openCalculator(labs[1].app, ['NOVEMBER_2026_LABCORP_DELETIONS', 'MAY_2026_LABCORP_DELETIONS', 'ARCHIVED_2026_LABCORP_DELETIONS', 'applyUserState', 'expandedCollectionTests'], {
    records: labcorp.records.filter(row => row.testCode === '070085')
  });
  const retired = app.NOVEMBER_2026_LABCORP_DELETIONS;
  assert.equal(Object.keys(retired).length, 36);
  assert.equal(Object.keys(app.MAY_2026_LABCORP_DELETIONS).length, 7);
  const updated = labcorp.records.filter(row => Object.hasOwn(retired, row.testCode));
  assert.equal(updated.length, 19);
  assert.equal(updated.filter(row => row.status === 'active' && row.collectionReview).length, 18);
  assert.equal(updated.filter(row => row.status === 'blocked').length, 1);
  assert.equal(app.expandedCollectionTests(updated.filter(row => row.status === 'active')).length, 0);
  assert.match(labcorp.records.find(row => row.testCode === '164000').collectionReview, /May 2026/);
  const pendingDeletion = labcorp.records.find(row => row.testCode === '160721');
  assert.equal(pendingDeletion.status, 'blocked');
  assert.match(pendingDeletion.specialInstructions, /May 2026/);
  const archive = app.ARCHIVED_2026_LABCORP_DELETIONS;
  assert.equal(Object.keys(archive).length, 9);
  for (const [code, [month]] of Object.entries(archive)) {
    const record = labcorp.records.find(row => row.testCode === code);
    const expectedActive = code !== '483496';
    assert.equal(record?.status, expectedActive ? 'active' : 'blocked', code);
    assert((record.collectionReview || record.specialInstructions).includes(month + ' 2026'), code);
    assert.equal(labcorp.index.tests.some(([indexed]) => indexed === code), expectedActive, code);
  }
  const crosswalk = quest.globals.QUEST_TO_LABCORP_INDEX;
  assert(!crosswalk.some(row => Object.hasOwn(archive, row[3]) ||
    row[8]?.some(option => Object.hasOwn(archive, option[0]))));
  const digital = crosswalk.find(row => row[0] === '92473');
  assert.equal(digital[3], '');
  assert(digital[8].some(([code]) => code === '489477'));
  const restored = app.applyUserState({overrides: [], customTests: [{id: 'custom-deleted', testCode: '231819', status: 'active'}]});
  assert.equal(restored.find(row => row.id === 'custom-deleted').status, 'blocked');

  // Reproduce the initial Labcorp page state as well as the final indexed view.
  const rows = labcorp.globals.QUEST_TO_LABCORP_INDEX;
  labcorp.globals.applyQuestLabcorpWorkbookMatches(labcorp.index.tests);
  assert(!rows.some(row => Object.hasOwn(retired, row[3]) ||
    row[8]?.some(option => Object.hasOwn(retired, option[0]))));
  for (const code of ['17180', '17182', '17183', '19894', '30289', '34309']) {
    const row = quest.globals.QUEST_TO_LABCORP_INDEX.find(record => record[0] === code);
    assert.match(row[6], /Labcorp deleted/);
    assert.equal(row[3], '');
  }
});

test('unresolved shipping warnings persist in search and cannot enter collection plans', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  for (const lab of labs) {
    const codes = lab.lab === 'quest' ? ['34329', '34499', '6447'] : ['164798'];
    const {records, index, globals} = await loadCalculator(root, lab, {captureRecords: true});
    for (const code of codes) {
      const row = records.find(record => record.testCode === code);
      assert.equal(row?.status, 'active', code);
      assert.match(row.collectionReview, /Collection on hold.*ship/i);
      assert(index.tests.some(([indexed]) => indexed === code), code);
      assert(index.collectionReviewCodes.includes(code), code);
      const app = openCalculator(lab.app, ['applyUserState', 'expandedCollectionTests'], {records: [row]});
      const override = {...row, status: 'active', specialInstructions: '', transportTemperature: 'Frozen'};
      const restored = app.applyUserState({overrides: [override], customTests: [{...override, id: 'custom-hold'}]});
      assert.equal(restored.filter(record => record.testCode === code && record.status === 'active' && record.collectionReview === row.collectionReview).length, 2);
      assert.equal(app.expandedCollectionTests(restored.filter(record => record.testCode === code)).length, 0);
    }
    const crosswalk = globals.QUEST_TO_LABCORP_INDEX;
    if (lab.lab === 'quest') {
      for (const code of codes) {
        const row = crosswalk.find(record => record[0] === code);
        assert.equal(row[7], 'hold', code);
        assert(!row[3] && !row[8]?.length, code);
      }
    } else {
      assert(!crosswalk.some(row => row[3] === '164798' || row[8]?.some(([code]) => code === '164798')));
    }
  }
});

test('recent volume and temperature discrepancies stay visible without collection quantities', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  for (const [lab, code, reason] of [
    [labs[0], '93876', /frozen serum.*refrigerated shipment/],
    [labs[1], '502690', /capacity of frozen transport vials/]
  ]) {
    const {records, index} = await loadCalculator(root, lab, {captureRecords: true});
    const row = records.find(record => record.testCode === code);
    assert.equal(row.status, 'active');
    assert.match(row.collectionReview, reason);
    assert(index.tests.some(([indexed]) => indexed === code));
    const api = openCalculator(lab.app, ['expandedCollectionTests', 'buildTransportBagPlan']);
    assert.equal(api.buildTransportBagPlan(api.expandedCollectionTests([row])).length, 0);
  }
});


test('reviewed orders use the published shipping and fasting instructions', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  const labcorp = await loadCalculator(root, labs[1], {captureRecords: true});
  const codes = ['001487', '001637', '007989'];
  const records = labcorp.records.filter(row => codes.includes(row.testCode));
  assert.equal(records.length, codes.length);
  const api = openCalculator(labs[1].app, ['applyUserState', 'expandedCollectionTests', 'buildTransportBagPlan', 'fastingRequirement'], {records});
  const overrides = records.map(row => ({
    ...row, transportTemperature: 'Room Temperature',
    transportTemperatureRaw: row.testCode === '007989'
      ? 'Room temperature for shipment under 3 days; refrigerate for longer storage' : 'Room Temperature',
    fastingStatus: '', fastingInstructions: '', specialInstructions: 'Local handling note'
  }));
  const restored = api.applyUserState({overrides}).filter(row => codes.includes(row.testCode));
  assert(restored.every(row => row.status === 'active' && row.transportTemperature === 'Refrigerated'));
  assert(records.filter(row => row.testCode !== '007989').every(row => row.specialInstructions.includes('2–8 °C')));
  const diazepam = restored.find(row => row.testCode === '007989');
  assert.equal(diazepam.drawContainer, 'Red Top');
  assert.equal(diazepam.transportContainer, 'Transport Tube');
  assert(restored.every(row => row.specialInstructions === 'Local handling note'));
  assert.equal(api.buildTransportBagPlan(api.expandedCollectionTests(restored)).length, 1);
  const isoenzymes = restored.find(row => row.testCode === '001637');
  assert.equal(api.fastingRequirement(isoenzymes)?.level, 'required');
  assert.match(api.fastingRequirement(isoenzymes)?.note, /Confirm the fasting duration/);

  const quest = await loadCalculator(root, labs[0], {captureRecords: true});
  const vitaminD = quest.records.find(row => row.testCode === '17306');
  assert.equal(vitaminD.status, 'active');
  assert.equal(vitaminD.fastingStatus, 'preferred');
  assert.match(vitaminD.fastingInstructions, /optional/);
});


test('Quest 16983 defaults to two frozen 5 mL pour-off tubes without changing the source draw', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  const {records, globals} = await loadCalculator(root, labs[0], {captureRecords: true});
  const row = records.find(test => test.testCode === '16983');
  assert.equal(row.status, 'active');
  assert.equal(row.submissionCount, 2);
  assert.match(row.specialInstructions, /Use two 5 mL pour-off tubes/);
  assert.match(globals.LabRegionalRestrictions.badge(row, 'quest'), /Not for NY patients/);
  assert.match(globals.LabRegionalRestrictions.printNotice([row], 'quest'), /16984/);
  const api = openCalculator(labs[0].app, [
    'applyUserState', 'buildTransportBagPlan', 'buildSubmissionContents', 'buildCollectionPlan'
  ], {records: [row]});
  const legacy = globals.SEED_TESTS.find(test => test.testCode === '16983');
  const [restored] = api.applyUserState({overrides: [{...legacy, submissionCount: 1, searchAliases: ['Local alias']}]})
    .filter(test => test.testCode === '16983');
  assert.equal(restored.submissionCount, 2);
  assert.equal(restored.searchAliases[0], 'Local alias');
  const bags = api.buildTransportBagPlan([restored]);
  assert.equal(bags.length, 1);
  assert.equal(bags[0].tests[0].transportTemperature, 'Frozen');
  const [shipment] = api.buildSubmissionContents(bags[0]);
  assert.equal(shipment.count, 2);
  assert.equal(shipment.label, 'Transport Tube (5 mL pour-off)');
  assert.equal(api.buildCollectionPlan([restored], bags).reduce((count, item) => count + item.count, 0), 5);
});
