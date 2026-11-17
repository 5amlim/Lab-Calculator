'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

const calculators = [
  ['Quest', 'index.html', 'assets/js/app.js'],
  ['Labcorp', 'labcorp.html', 'labcorp-app.js']
];

function selectMarkup(html, id) {
  const start = html.indexOf('<select id="' + id + '"');
  assert(start >= 0, 'Missing ' + id);
  const end = html.indexOf('</select>', start);
  assert(end > start, 'Unclosed ' + id);
  return html.slice(start, end);
}

function fixture(id, specimenType, drawContainer, transportContainer, transportTemperature = 'Room Temperature', additionalDrawRequirements = []) {
  return { id, testCode: id, testName: id, status: 'active', specimenType,
    drawContainer, transportContainer, transportTemperature, additionalDrawRequirements };
}

function loadedCalculator(appFile) {
  const window = { QUEST_MISSING_DIRECTORY_READY: Promise.resolve(0), SEED_TESTS: [
    fixture('cary', 'Stool', 'Sterile cup', 'Cary-Blair Stool Culture Transport Vial'),
    fixture('totalfix', 'Stool', 'Sterile cup', 'Total-Fix® Transport Vial'),
    fixture('op-pair', 'Stool', 'Sterile cup', 'Pink Formalin O&P Vial + Gray PVA O&P Vial'),
    fixture('clean-stool', 'Stool', 'Sterile cup', 'Sterile Screw-cap Stool Vial (Para-Pak white clean)'),
    fixture('urisponge', 'Urine', 'Sterile cup', 'UriSponge Urine Culture Transport'),
    fixture('culture', 'Whole Blood', 'BacT/ALERT FA PLUS', 'BacT/ALERT FA PLUS (original bottle)'),
    fixture('qft', 'Whole Blood', 'QuantiFERON TB1 Tube', 'QuantiFERON TB1 Tube (original tube)'),
    fixture('salivette', 'Saliva', 'Salivette Collection Device', 'Separate Salivette Collection Devices (123724)'),
    fixture('red-tube', 'Whole Blood', 'Red Top', 'Red Top (original tube)'),
    fixture('generic', 'CSF', 'Sterile cup', 'Transport Tube'),
    fixture('paired', 'Serum', 'SST / Gold', 'Serum Transport Tube', 'Refrigerated', [
      { container: 'Sterile cup', specimenType: 'Stool',
        transportContainer: 'Cary-Blair Stool Culture Transport Vial', transportTemperature: 'Room Temperature' }
    ]),
    fixture('frozen', 'Plasma', 'Green Lithium Heparin',
      'Dedicated Frozen Polypropylene Plasma Transport Tube', 'Frozen')
  ] };
  const elements = new Map();
  const makeElement = () => ({
    value: '', checked: false, options: [], dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {}, setAttribute() {}, querySelector() { return null; },
    appendChild(child) { this.options.push(child); return child; }
  });
  const document = {
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, makeElement());
      return elements.get(id);
    },
    querySelector() { return null; }, querySelectorAll() { return []; },
    addEventListener() {}, createElement() { return makeElement(); }
  };
  const src = read(appFile);
  assert(src.includes('  init();'));
  vm.runInNewContext(src.replace('  init();',
    '  window.__audit = {database, transportContainerFilterCategories, matchesLibraryFilters, filters:els};'),
    { window, document,
      localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
      setTimeout() { return 0; }, clearTimeout() {}, console: { warn() {}, error() {} } },
    { filename: appFile, timeout: 30000 });
  return window;
}

for (const [name, page, app] of calculators) {
  test(name + ': container filter and manual entry menus include named devices without duplicates', () => {
    const html = read(page);
    const filter = selectMarkup(html, 'transportContainerFilter');
    const draw = selectMarkup(html, 'drawContainer');
    const transport = selectMarkup(html, 'transportContainer');
    for (const key of ['cary-blair','stool-formalin','stool-pva','stool-clean','urisponge',
      'blood-culture','salivette','qft','microtainer','blood-royal-blue-edta',
      '24h-urine','serum','plasma'])
      assert(filter.includes('<option value="' + key + '">'), key + ' missing');
    for (const choice of ['Cary-Blair Stool Culture Transport Vial','Total-Fix® Transport Vial',
      'Pink Formalin O&P Vial','Gray PVA O&P Vial','Salivette Saliva Collection Device',
      'Blood Culture Bottles','Microtainer'])
      for (const [field, markup] of [['draw',draw], ['transport',transport]])
        assert.equal(markup.split('>' + choice + '</option>').length - 1, 1,
          name + ' ' + field + ' missing/duplicate: ' + choice);
    assert(html.includes('id="containerNameFilter"'), 'Missing fallback search');
    const ids = [...filter.matchAll(/<option value="([^"]*)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, 'Duplicated filter categories');
  });

  test(name + ': distinguish stool preservation media and original collection devices', async () => {
    const w = loadedCalculator(app);
    await Promise.resolve(); await Promise.resolve();
    const api = w.__audit;
    assert(api, 'App audit hook did not initialize');
    const record = id => api.database.find(t => t.id === id);
    const categories = id => api.transportContainerFilterCategories(record(id));
    assert(categories('cary').includes('cary-blair'));
    assert(!categories('cary').includes('stool'));
    assert(categories('totalfix').includes('stool'));
    assert(!categories('totalfix').includes('cary-blair'));
    assert(categories('op-pair').includes('stool-formalin'));
    assert(categories('op-pair').includes('stool-pva'));
    assert(categories('clean-stool').includes('stool-clean'));
    assert(!categories('clean-stool').includes('stool-formalin'));
    assert(categories('urisponge').includes('urisponge'));
    assert(categories('urisponge').includes('urine-culture'));
    assert(categories('culture').includes('blood-culture'));
    assert(categories('qft').includes('qft'));
    assert(categories('salivette').includes('salivette'));
    assert(categories('red-tube').includes('blood-red'));
    assert(categories('generic').includes('transport'));
    assert(categories('paired').includes('cary-blair'), 'Missing secondary container filter');
  });

  test(name + ': named-container text filter checks submissions, not source cups', async () => {
    const w = loadedCalculator(app);
    await Promise.resolve(); await Promise.resolve();
    const api = w.__audit;
    const record = id => api.database.find(t => t.id === id);
    api.filters.containerNameFilter.value = 'Cary-Blair';
    assert(api.matchesLibraryFilters(record('cary')));
    assert(api.matchesLibraryFilters(record('paired')));
    assert(!api.matchesLibraryFilters(record('totalfix')));
    api.filters.containerNameFilter.value = 'sterile cup';
    assert(!api.matchesLibraryFilters(record('cary')),
      'Source-only sterile cup incorrectly matched a transferred vial');
    api.filters.containerNameFilter.value = 'Formalin';
    assert(api.matchesLibraryFilters(record('op-pair')));
    api.filters.containerNameFilter.value = '';
    api.filters.transportContainerFilter.value = 'stool-pva';
    assert(api.matchesLibraryFilters(record('op-pair')));
    assert(!api.matchesLibraryFilters(record('totalfix')));
  });
}

test('Labcorp frozen polypropylene retains frozen classification; Quest generic tube behavior stays separate', async () => {
  for (const [name, , app] of calculators) {
    const w = loadedCalculator(app);
    await Promise.resolve(); await Promise.resolve();
    const record = w.__audit.database.find(t => t.id === 'frozen');
    const categories = w.__audit.transportContainerFilterCategories(record);
    if (name === 'Labcorp') {
      assert(categories.includes('frozen-transport'));
      assert(!categories.includes('transport'), 'Frozen PP vial was grouped with green transport tubes');
    } else {
      assert(!categories.includes('frozen-transport'), 'Quest should not show Labcorp purple-cap filter');
    }
  }
});
