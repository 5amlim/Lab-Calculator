const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const pages = ['index.html', 'labcorp.html', 'cedars.html', 'cedars-container-guide.html', 'cedars-test-menu.html'];
const bundles = [
  'assets/js/labcorp/catalog/workbook-additions-core.js',
  'assets/js/labcorp/catalog/workbook-additions-specialty.js',
  'assets/js/labcorp/catalog/verified-expansions-a-e.js',
  'assets/js/labcorp/catalog/verified-expansions-f-j.js',
  'assets/js/labcorp/catalog/respiratory-and-food-allergens.js',
  'assets/js/labcorp/catalog/specialty-chemistry-and-hormones.js',
  'assets/js/labcorp/catalog/infectious-and-immunity.js',
  'assets/js/labcorp/catalog/metabolic-nmr-and-gestational.js'
];

const scripts = html => [...html.matchAll(/<script\s+src="([^"?]+)(?:\?[^"]*)?"[^>]*><\/script>/g)].map(m => m[1]);

test('all local script and stylesheet paths still resolve after cleanup', () => {
  for (const page of pages) {
    const html = read(page);
    const paths = [
      ...scripts(html),
      ...[...html.matchAll(/<link\s+[^>]*href="([^"?]+)(?:\?[^"]*)?"[^>]*>/g)].map(m => m[1])
    ].filter(p => !/^(?:https?:|data:|\/\/)/i.test(p));
    for (const asset of paths) assert(fs.existsSync(path.join(root, asset)), page + ': missing ' + asset);
  }
});

test('Labcorp catalog bundles appear exactly once, in the required order', () => {
  const loaded = scripts(read('labcorp.html'));
  const positions = bundles.map(file => loaded.indexOf(file));
  assert(positions.every(index => index >= 0), 'Every consolidated Labcorp bundle must be loaded');
  assert.equal(new Set(positions).size, bundles.length);
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, 'Preserve original loading order');
  assert(positions.every(i => i < loaded.indexOf('labcorp-app.js')), 'Catalog must load before calculator code');
});

test('Labcorp catalog loads with no duplicate codes or missing specimen essentials', () => {
  const loaded = scripts(read('labcorp.html'));
  const catalogSources = loaded.filter(file =>
    file.startsWith('labcorp-') || file.startsWith('assets/js/labcorp/catalog/'));
  const context = vm.createContext({ window: { SEED_TESTS: [] } });
  for (const file of catalogSources) {
    if (file === 'labcorp-app.js' || file === 'labcorp-crosswalk-ui.js' ||
        file === 'labcorp-crosswalk-data.js' ||
        file === 'labcorp-quest-workbook-crosswalk-overrides.js') continue;
    vm.runInContext(read(file), context, { filename: file, timeout: 10000 });
  }
  const records = context.window.SEED_TESTS;
  assert(records.length > 500, 'Unexpected reduction in Labcorp catalog records');
  const codes = records.map(test => String(test.testCode));
  assert.equal(new Set(codes).size, records.length, 'Duplicate Labcorp test codes');
  for (const item of records) {
    assert(item.testCode && item.testName && item.specimenType, 'Incomplete identity: ' + item.testCode);
    assert(item.drawContainer && item.transportContainer, 'Missing container: ' + item.testCode);
    assert(item.transportTemperature, 'Missing submission temperature: ' + item.testCode);
  }
});
