const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = filename => fs.readFileSync(path.join(root, filename), 'utf8');
const paths = [
  ['Quest', 'index.html', 'assets/js/app.js'],
  ['LabCorp', 'labcorp.html', 'labcorp-app.js']
];

for (const [name, html, appFile] of paths) {
  assert.match(read(html), /<option value="sterile-cup">Sterile cup \(submitted\)<\/option>/,
    name + ': sterile-cup filter must exist');
  const context = vm.createContext({
    window: { SEED_TESTS: [] },
    document: { getElementById: () => null, querySelectorAll: () => [] },
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    console
  });
  const script = read(appFile).replace('  init();',
    '  window.testApi = { normalizeRecord, usesSterileCup, transportContainerFilterCategories, ' +
    'menuContainerBadges, buildTransportBagPlan, buildCollectionPlan };');
  vm.runInContext(script, context, { filename: appFile });
  const api = context.window.testApi;
  assert(api, name + ': test functions must be available');
  const mk = (code, specimenType, drawContainer, transportContainer, temp = 'Room Temperature',
      vol = '1 mL', stat = false) => {
    const t = api.normalizeRecord({
      id: 'case-' + code, testCode: code, testName: 'Test ' + code, specimenType,
      drawContainer, transportContainer, transportTemperature: temp,
      preferredVolume: vol, minimumVolume: '0.5 mL', spin: 'No'
    });
    t.isStat = stat;
    return t;
  };
  const urineCulture = mk('101', 'Urine', 'Sterile cup', 'Gray-Top Urine Culture Preservative Tube');
  const urineUA = mk('102', 'Urine', 'Sterile cup', 'Red/Yellow Swirl UA Preservative Tube');
  const stoolFix = mk('103', 'Stool', 'Sterile cup', 'Total-Fix® Transport Vial');
  const stoolCup = mk('104', 'Stool', 'Sterile cup', 'Sterile cup', 'Frozen');
  const directFluid = mk('105', 'Body Fluid', 'Sterile cup', 'Sterile cup');
  const serumA = mk('106', 'Serum', 'Gold SST', 'Serum Transport Tube', 'Room Temperature', '1 mL serum');
  const serumB = mk('107', 'Serum', 'Gold SST', 'Serum Transport Tube', 'Room Temperature', '1 mL serum');
  const statSerum = mk('108', 'Serum', 'Gold SST', 'Serum Transport Tube', 'Room Temperature', '1 mL serum', true);
  const specialStool = mk('109', 'Stool', 'Trace Metal-Free Plastic Container', 'Trace Metal-Free Plastic Container');
  const timedUrine = mk('110', 'Urine', '24-Hour Urine Container', '24-Hour Urine Container');
  for (const t of [stoolCup, directFluid])
    assert(api.usesSterileCup(t), name + ': sterile cup is submitted for ' + t.testCode);
  for (const t of [urineCulture, urineUA, stoolFix, serumA, specialStool, timedUrine])
    assert(!api.usesSterileCup(t), name + ': collection cups must not match transport filter ' + t.testCode);
  assert.equal(api.transportContainerFilterCategories(urineCulture).includes('urine-culture'), true);
  assert.equal(api.transportContainerFilterCategories(urineUA).includes('urine-ua'), true);
  assert.equal(api.transportContainerFilterCategories(stoolFix).includes('stool'), true);
  assert.equal(api.transportContainerFilterCategories(stoolFix).includes('stool'), true);
  assert.equal(api.transportContainerFilterCategories(stoolCup).includes('sterile-cup'), true);
  assert.equal(api.transportContainerFilterCategories(timedUrine).includes('urine-cup'), true);
  assert.match(api.menuContainerBadges(stoolFix), /container-path-arrow/,
    name + ': transfer needs visible arrow');
  assert.doesNotMatch(api.menuContainerBadges(stoolCup), /container-path-arrow/,
    name + ': no arrow if original cup is submitted');

  const selected = [urineCulture, urineUA, stoolFix, stoolCup, serumA, serumB, statSerum];
  const bags = api.buildTransportBagPlan(selected);
  const plan = api.buildCollectionPlan(selected, bags);
  const urineCups = plan.filter(p => p.label === 'Sterile cup' &&
    p.tests.some(t => t.specimenType === 'Urine'));
  const stoolCups = plan.filter(p => p.label === 'Sterile cup' &&
    p.tests.some(t => t.specimenType === 'Stool'));
  assert.equal(urineCups.length, 1, name + ': compatible urine tubes can share one source cup');
  assert.equal(urineCups[0].count, 1);
  assert.equal(urineCups[0].tests.length, 2);
  assert.equal(stoolCups.length, 1, name + ': compatible stool tests can share one stool cup');
  assert.equal(stoolCups[0].count, 1);
  assert(stoolCups[0].tests.every(t => t.specimenType === 'Stool'),
    name + ': urine and stool must not share a cup');
  const routine = bags.find(b => b.key === 'routine-room');
  const stat = bags.find(b => b.key === 'stat-room');
  assert(routine && stat && bags.some(b => b.key === 'routine-frozen'),
    name + ': separate STAT, routine, and frozen bags');
  assert.equal(routine.sstEstimate.totalTubes, 1,
    name + ': two 1 mL serum tests share one 2.5 mL-usable Gold SST');
  assert.equal(stat.sstEstimate.totalTubes, 1,
    name + ': STAT serum must use its own Gold SST');
  const sstCard = plan.find(p => /sst|gold/i.test(p.label));
  assert(sstCard && sstCard.count >= 2,
    name + ': collection totals remain additive across STAT/routine');
}

const cedars = read('cedars-app.js');
const from = cedars.indexOf('  const requiresOriginalStoolKit =');
const to = cedars.indexOf('  function makeRows()', from);
assert(from > -1 && to > from, 'Cedars source and submission workflow must exist');
const cedarsPath = new Function('clean', 'esc', 'specimenClass',
  cedars.slice(from, to) + '\nreturn cedarsMenuContainerPath;')(
    s => String(s == null ? '' : s).trim(),
    s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;'),
    () => 'type-stool'
  );
assert.doesNotMatch(cedarsPath({
  id: 'fecal-fit', category: 'Stool',
  collect: 'FOBT-CHEK OC sampling bottle', submit: 'FOBT-CHEK OC / FIT bottle'
}), /cedars-container-path-arrow/, 'Cedars FIT bottle has no false transfer arrow');
assert.match(cedarsPath({
  id: 'stool-preservative', category: 'Stool',
  collect: 'Sterile cup', submit: 'Total-Fix® Transport Vial'
}), /cedars-container-path-arrow/, 'Cedars stool transfer has an arrow');
assert.match(cedarsPath({
  id: 'urine-culture', category: 'Urine',
  collect: 'Sterile cup', submit: 'Gray-Top Urine Culture Tube'
}), /cedars-container-path-arrow/, 'Cedars urine transfer has an arrow');

assert.match(read('assets/css/styles.css'), /\.library-table \.container-path-arrow/,
  'Mobile Quest/LabCorp container arrow must be styled');
assert.match(read('labcorp-theme.css'), /@media print[\s\S]*?\.labcorp-page \.print-header/,
  'LabCorp print header must use its lab theme');
console.log('PASS: Quest, LabCorp, Cedars sterile cups, transfer arrows, pooling, priorities, and print styling');
