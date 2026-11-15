'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

async function openCalculator(appFile, seedFiles = []) {
  const window = { SEED_TESTS: [] };
  const document = {
    getElementById: id => ({
      id, value: '', checked: false, options: [],
      classList: { add(){}, remove(){}, toggle(){} },
      addEventListener(){}, setAttribute(){}, querySelector(){ return null; }
    }),
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    addEventListener(){}
  };
  const localStorage = { getItem(){ return null; }, setItem(){}, removeItem(){} };
  const context = vm.createContext({ window, document, localStorage,
    console: { warn(){}, error(){} }, setTimeout(){ return 0; }, clearTimeout(){} });
  for (const file of seedFiles) vm.runInContext(read(file), context, { filename: file });
  const source = read(appFile);
  assert.ok(source.includes('  init();'), appFile + ' initialization boundary');
  vm.runInContext(source.replace('  init();', [
    '  window.__frozenAudit = { database, normalizeRecord, expandedCollectionTests,',
    '    buildTransportBagPlan, buildSubmissionContents, groupSubmissionContainersForPrint,',
    '    transportTubeClass, tubeClass, menuContainerBadges, printCollectionSubmissionPlan };'
  ].join('\n')), context, { filename: appFile });
  await Promise.resolve();
  assert.ok(window.__frozenAudit, appFile + ' audit hooks available');
  return window.__frozenAudit;
}
function record(api, code, specimen, container, temperature) {
  return api.normalizeRecord({
    id: 'frozen-audit-' + code, testCode: code, testName: 'Frozen transport audit ' + code,
    specimenType: specimen, drawContainer: 'Red Top',
    transportContainer: container, transportTemperature: temperature,
    spin: 'Yes', preferredVolume: '1 mL', minimumVolume: '0.5 mL'
  });
}
const submitted = (api, tests) => api.buildTransportBagPlan(tests)
  .flatMap(bag => api.buildSubmissionContents(bag));
const QUEST_STANDARD = 'tube-transport tube-transport-green-top';

test('Quest uses one standard transport badge across temperatures but keeps separate bags', async () => {
  const api = await openCalculator('assets/js/app.js');
  const room = record(api, '990001', 'Serum', 'Serum Transport Tube', 'Room Temperature');
  const chilled = record(api, '990002', 'Serum', 'Serum Transport Tube', 'Refrigerated');
  const frozen = record(api, '990003', 'Serum', 'Serum Transport Tube', 'Frozen');
  const manual = record(api, '990004', 'Plasma', 'Frozen Transport Tube', 'Frozen');
  const ppp = record(api, '990005', 'Platelet-Poor Plasma', 'Frozen Platelet-Poor Plasma Transport Tube', 'Frozen');
  for (const item of [room, chilled, frozen, manual, ppp]) {
    assert.equal(api.transportTubeClass(item, item.transportContainer), QUEST_STANDARD, item.testCode);
    assert.match(api.menuContainerBadges(item), /tube-transport-green-top/, item.testCode);
  }
  assert.equal(api.tubeClass('Frozen Transport Tube'), QUEST_STANDARD);
  assert.equal(api.buildTransportBagPlan([room, chilled, frozen]).length, 3);
  assert.equal(submitted(api, [manual])[0].className, QUEST_STANDARD);
  assert.equal(submitted(api, [ppp])[0].className, QUEST_STANDARD);
  assert.match(api.printCollectionSubmissionPlan([frozen]), /tube-transport-green-top/);
});

test('Quest 15853 five timed frozen specimens keep five distinct submission aliquots', async () => {
  const api = await openCalculator('assets/js/app.js',
    ['assets/js/quest-directory-expansion-20261114.js']);
  const testRecord = api.database.find(t => t.testCode === '15853');
  assert.ok(testRecord, 'Real Quest proinsulin glucose-response record');
  const expanded = api.expandedCollectionTests([testRecord]);
  const parts = submitted(api, expanded);
  assert.equal(expanded.length, 5);
  assert.equal(parts.length, 5);
  assert.ok(parts.every(item => item.className === QUEST_STANDARD));
  assert.equal(new Set(parts.map(item => item.key)).size, 5,
    'Distinct draws must never be pooled into the same aliquot');
  const displayed = api.groupSubmissionContainersForPrint(parts);
  assert.equal(displayed.reduce((count, item) => count + item.count, 0), 5);
});

test('Quest specialty containers remain distinct from standard frozen plastic aliquot tubes', async () => {
  const api = await openCalculator('assets/js/app.js');
  const amber = record(api, '990006', 'Serum', 'Amber Serum Transport Tube — Protect From Light', 'Frozen');
  const metalFree = record(api, '990007', 'Plasma', 'Metal-Free Plasma Transport Tube', 'Frozen');
  const edta = record(api, '990008', 'Plasma', 'EDTA Plasma Transport Tube', 'Frozen');
  assert.equal(api.transportTubeClass(amber, amber.transportContainer), 'tube-amber');
  assert.match(api.transportTubeClass(metalFree, metalFree.transportContainer), /metal-free/);
  assert.notEqual(api.transportTubeClass(edta, edta.transportContainer), QUEST_STANDARD);
});

test('Labcorp retains its dedicated purple-cap frozen transport icon', async () => {
  const api = await openCalculator('labcorp-app.js');
  const frozen = record(api, '990009', 'Serum', 'Frozen Transport Tube', 'Frozen');
  assert.equal(api.transportTubeClass(frozen, frozen.transportContainer), 'tube-frozen-purple');
  assert.equal(submitted(api, [frozen])[0].className, 'tube-frozen-purple');
  assert.match(api.menuContainerBadges(frozen), /tube-frozen-purple/);
});

test('Add/Edit Test picker shows Quest green and Labcorp purple based on active lab', () => {
  const portalSource = read('assets/js/portal-selects.js');
  assert.match(portalSource, /data-gallery-lab/);
  const injection = '  window.__testTubeIconClass = tubeIconClass;\n  if (document.readyState === \'loading\')';
  for (const [lab, expected] of [['Q', 'tube-transport-green-top'], ['L', 'tube-frozen-purple']]) {
    const window = { matchMedia: () => ({ matches: true }) };
    const document = {
      body: { getAttribute: () => lab }, readyState: 'loading', addEventListener(){}
    };
    vm.runInNewContext(portalSource.replace('  if (document.readyState === \'loading\')', injection),
      { window, document }, { filename: 'portal-selects.js' });
    assert.equal(window.__testTubeIconClass('Frozen Transport Tube'), expected, lab);
  }
  assert.match(read('index.html'), /Frozen Transport Tube \(plastic screw-cap\)/);
  assert.match(read('labcorp.html'), /Frozen Transport Tube \(purple cap\)/);
});
