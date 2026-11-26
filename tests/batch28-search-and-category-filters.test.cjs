'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const root = path.join(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

const windowForCategories = {};
vm.runInNewContext(read('assets/js/clinical-categories.js'), {window: windowForCategories});
const categories = windowForCategories.LabClinicalCategories;

const datasets = [
  {
    lab: 'Quest',
    source: 'assets/js/quest-verified-csf-expansion-20261116-batch28.js',
    app: 'assets/js/app.js',
    page: 'index.html',
    expectedCount: 10,
    expectedSpecimen: 'CSF',
    category: 'neurology',
    extraCategory: 'infectious'
  },
  {
    lab: 'Labcorp',
    source: 'assets/js/labcorp/catalog/verified-endocrine-20261116-batch28.js',
    app: 'labcorp-app.js',
    page: 'labcorp.html',
    expectedCount: 13,
    expectedSpecimen: 'Serum',
    category: 'endocrinology'
  }
];

function getRecords(file) {
  const window = {SEED_TESTS: []};
  vm.runInNewContext(read(file), {window}, {filename: file});
  return window.SEED_TESTS;
}

const openCalculator = require('./helpers/calculator-vm.cjs');

function fromApp(app, rawRows) {
  const { database, rankLibraryTest, findMatches, findCategoryMatches, specimenFilterCategoriesForType } =
    openCalculator(app, ['database', 'rankLibraryTest', 'findMatches', 'findCategoryMatches', 'specimenFilterCategoriesForType'],
      { records: rawRows, window: { LabClinicalCategories: categories } });
  const rows = rawRows.map(raw => database.find(row => row.testCode === raw.testCode));
  return {
    rows,
    search: { rankLibraryTest, findMatches, findCategoryMatches },
    specimenMatch: specimenFilterCategoriesForType
  };
}

for (const sample of datasets) {
  test(sample.lab + ' batch28: normalized records, codes, shorthand, clinical categories, and specimen filtering', () => {
    const rawRows = getRecords(sample.source);
    assert.equal(rawRows.length, sample.expectedCount);
    const page = read(sample.page);
    assert(page.includes('id="categoryFilter"'));
    assert.equal(page.split('src="' + sample.source + '?v=').length - 1, 1);
    assert(page.indexOf(sample.source) < page.indexOf(sample.app));

    const {rows, search, specimenMatch} = fromApp(sample.app, rawRows);
    assert.equal(rows.length, sample.expectedCount);
    assert.equal(new Set(rows.map(row => row.testCode)).size, rows.length);

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i], raw = rawRows[i];
      if (sample.lab === 'Labcorp' && ['500108', '500152', '500161', '500167'].includes(row.testCode)) {
        assert.equal(row.status, 'blocked');
        assert.match(row.specialInstructions, /November 2026.*alternative/);
        assert.equal(search.findMatches(row.testCode, 5)[0].test.status, 'blocked');
        continue;
      }
      assert.equal(row.status, 'active', row.testCode);
      assert.equal(row.specimenType, sample.expectedSpecimen, row.testCode);
      assert.equal(row.transportContainer, raw.transportContainer, row.testCode);
      assert.equal(row.transportTemperature, raw.transportTemperature, row.testCode);
      assert.equal(row.spin, raw.spin, row.testCode);
      assert.equal(row.collectionCount, raw.collectionCount, row.testCode);
      assert.equal(row.submissionCount, raw.submissionCount, row.testCode);
      assert.deepEqual(Array.from(row.searchAliases), Array.from(raw.searchAliases),
        row.testCode + ': normalizeRecord must retain aliases');
      assert.deepEqual(Array.from(row.clinicalCategories), Array.from(raw.clinicalCategories),
        row.testCode + ': normalizeRecord must retain explicit clinical categories');
      assert(specimenMatch(row.specimenType).includes(sample.expectedSpecimen),
        row.testCode + ': specimen filter');

      assert.equal(search.rankLibraryTest(row.testCode, row), 2000,
        row.testCode + ': exact-code search');
      assert.equal(search.findMatches(row.testCode, 5)[0].test.testCode, row.testCode,
        row.testCode + ': exact code should be the first match');
      assert(search.rankLibraryTest(row.testName, row) >= 1400,
        row.testCode + ': official name should match');
      assert(row.searchAliases.length > 0, row.testCode + ': at least one shorthand');
      for (const alias of row.searchAliases)
        assert(search.rankLibraryTest(alias, row) >= 500,
          row.testCode + ': shorthand search failed: ' + alias);

      const matchedCategories = categories.forTest(row);
      assert(matchedCategories.includes(sample.category),
        row.testCode + ': missing ' + sample.category);
      for (const clinicalCategory of row.clinicalCategories) {
        assert(matchedCategories.includes(clinicalCategory), row.testCode + ': ' + clinicalCategory);
        const results = search.findCategoryMatches(clinicalCategory)?.results || [];
        assert(results.some(testRow => testRow.testCode === row.testCode),
          row.testCode + ': not included in category browse ' + clinicalCategory);
      }
    }
  });
}

test('CSF viral, fungal and parasitic tests have Infectious Disease category', () => {
  const quest = getRecords(datasets[0].source);
  for (const code of ['5297','18874','16013','36597','70028','8804','10485','91839','14881']) {
    const row = quest.find(x => x.testCode === code);
    assert(row && categories.forTest(row).includes('infectious'), code);
  }
});

test('IGF-1 is endocrinology, not coagulation or diabetes', () => {
  const labcorp = getRecords(datasets[1].source);
  const row = labcorp.find(x => x.testCode === '500485');
  const found = categories.forTest(row);
  assert(found.includes('endocrinology'));
  assert(!found.includes('coagulation'));
  assert(!found.includes('diabetes'));
});

test('each calculator still has independent specimen and clinical-category filters', () => {
  for (const sample of datasets) {
    const app = read(sample.app);
    assert(app.includes('els.categoryFilter.value'));
    assert(app.includes('LabClinicalCategories.forTest(test)'));
    assert(app.includes('specimenFilterCategories(test).includes(specimen)'));
    assert(app.includes('function matchesLibraryFilters(test)'));
    assert(app.includes('Array.isArray(test.searchAliases)'));
  }
});
