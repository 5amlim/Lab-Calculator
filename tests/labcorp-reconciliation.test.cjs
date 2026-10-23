const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const html = read('labcorp.html');
const scriptPaths = [...html.matchAll(/<script\s+src="([^"?]+)(?:\?[^"]*)?"[^>]*><\/script>/g)]
  .map(match => match[1]);
const catalogPaths = scriptPaths.filter(file =>
  file === 'labcorp-data.js' ||
  file.startsWith('assets/js/labcorp/catalog/') ||
  (file.startsWith('labcorp-') && file.endsWith('-data.js') && !file.includes('crosswalk')) ||
  /^labcorp-(?:renal|verified|specialty|serology|heavy|infectious).*\.js$/.test(file));

const load = file => {
  const context = { window: { SEED_TESTS: [] } };
  vm.runInNewContext(read(file), context, { filename: file, timeout: 20000 });
  return Array.from(context.window.SEED_TESTS);
};

test('each loaded LabCorp catalog code has a single canonical source record', () => {
  const codes = new Map();
  for (const file of catalogPaths) {
    for (const row of load(file)) {
      const code = String(row.testCode || '').trim();
      assert(code, 'Missing code in ' + file);
      assert(!codes.has(code), code + ' repeated in ' + codes.get(code) + ' and ' + file);
      codes.set(code, file);
    }
  }
  assert.equal(codes.size, 1319, 'Unexpected LabCorp catalog loss or duplication');
});

function openCalculator(records) {
  const window = { SEED_TESTS: records };
  const document = {
    getElementById: id => ({ id }),
    querySelectorAll: () => []
  };
  const localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  const app = read('labcorp-app.js');
  assert(app.includes('  init();'), 'Calculator initialization marker missing');
  const testApp = app.replace('  init();',
    '  window.__audit = { normalizeRecord, expandedCollectionTests, buildTransportBagPlan, buildSubmissionContents, buildCollectionPlan };');
  vm.runInNewContext(testApp, { window, document, localStorage }, {
    filename: 'labcorp-app.js', timeout: 20000
  });
  return window.__audit;
}

test('multi-container assays produce distinct physical collection and submission cards', () => {
  const records = [
    ...load('assets/js/labcorp/catalog/nutrition-metabolic-neuroendocrine-20261023.js'),
    ...load('assets/js/labcorp/catalog/renal-gi-metabolic-specialty-20261023.js')
  ];
  const api = openCalculator(records);
  const plan = code => {
    const source = records.find(test => test.testCode === code);
    assert(source, 'Missing profile ' + code);
    const expanded = api.expandedCollectionTests([api.normalizeRecord(source)]);
    const bags = api.buildTransportBagPlan(expanded);
    return {
      expanded,
      collection: api.buildCollectionPlan(expanded, bags),
      bags: bags.map(bag => ({
        temperature: bag.key,
        items: api.buildSubmissionContents(bag)
      }))
    };
  };
  const count = (items, phrase) =>
    items.filter(item => item.label.toLowerCase().includes(phrase.toLowerCase()))
      .reduce((sum, item) => sum + item.count, 0);

  const cadmium = plan('724344');
  assert.equal(count(cadmium.collection, 'Royal Blue'), 1);
  assert.equal(count(cadmium.collection, 'Sterile cup'), 1);
  assert.equal(count(cadmium.bags[0].items, 'Royal Blue'), 1);
  assert.equal(count(cadmium.bags[0].items, 'Sterile cup'), 1);
  assert.equal(cadmium.expanded.length, 2);
  assert.equal(cadmium.bags[0].temperature, 'routine-room');

  const copper = plan('081162');
  assert(count(copper.collection, 'Royal Blue') >= 1, 'Needs a trace-metal-free source tube');
  assert.equal(count(copper.bags[0].items, 'Plasma Transport Tube'), 1);
  assert.equal(count(copper.bags[0].items, 'RBC Transport Tube'), 1);
  assert.equal(copper.bags[0].temperature, 'routine-refrigerated');

  const orotic = plan('007010');
  assert.equal(count(orotic.collection, 'Sterile cup'), 1,
    'Two aliquots from one urine collection, not two patient collections');
  assert.deepEqual([...orotic.bags.map(b => b.temperature)].sort(),
    ['routine-frozen', 'routine-room']);
  for (const bag of orotic.bags) assert.equal(bag.items.reduce((n, item) => n + item.count, 0), 1);

  for (const code of ['001750', '144057']) {
    const vitamins = plan(code);
    assert.equal(count(vitamins.collection, 'Gold / SST'), 1,
      code + ': two aliquots do not automatically require two blood draws');
    assert.equal(count(vitamins.bags[0].items, 'Gold / SST'), 1);
    assert.equal(count(vitamins.bags[0].items, 'Amber Serum'), 1);
  }
});
