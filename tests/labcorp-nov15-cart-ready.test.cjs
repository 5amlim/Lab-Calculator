'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const { test } = require('node:test');

const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
const catalogPath = 'labcorp-missing-tests-20261115.js';
const addedCodes = [
  '500118','500130','500135','500138','500156','500159','500171',
  '500348','500467','500471','500477','500485','500550','500563',
  '500600','500634','500638','500644','500716','500724','500778',
  '500834','500848','500850','501878','503725','503830','504020',
  '504674','504677','504805',
  '015230','086231','086249','086306','086330','117028','117050',
  '117085','117985','163002','500102','500510','500611','500632',
  '500647','500650','501807','501902','501949','503068','503600','503663'
];

function load() {
  const window = { SEED_TESTS: [] };
  vm.runInNewContext(read(catalogPath), { window, console }, { filename: catalogPath });
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
  const app = read('labcorp-app.js');
  assert(app.includes('  init();'), 'Labcorp app initialization marker missing');
  vm.runInNewContext(app.replace('  init();',
    '  window.__cartAudit = { database, expandedCollectionTests, buildTransportBagPlan, ' +
    'buildCollectionPlan, buildSubmissionContents, menuContainerBadges };'
  ), { window, document, localStorage,
    setTimeout(){ return 0; }, clearTimeout(){},
    console: { warn(){}, error(){} }
  }, {filename:'labcorp-app.js', timeout:30000});
  assert(window.__cartAudit);
  return { seed:window.SEED_TESTS, api:window.__cartAudit };
}

test('Nov 15 catalog keeps 347 distinct IDs, 85 approved, and 262 pending', () => {
  const {seed}=load();
  assert.equal(seed.length,347);
  assert.equal(new Set(seed.map(x=>x.testCode)).size,347);
  assert.equal(seed.filter(x=>x.status==='active').length,85);
  assert.equal(seed.filter(x=>x.status==='pending').length,262);
  assert.equal(new Set(addedCodes).size,53);
  for (const code of addedCodes) {
    const t=seed.find(x=>x.testCode===code);
    assert(t && t.status==='active', 'Not cart-ready: '+code);
    for (const key of ['specimenType','drawContainer','transportContainer',
      'preferredVolume','transportTemperature','source']) {
      assert(t[key], code+': missing '+key);
    }
    assert.match(t.source,/labcorp\.com\/tests\//i,code+': direct specimen source missing');
  }
});

test('Frozen transfer tubes are purple and independently counted per test', () => {
  const {api}=load();
  const codes=['500550','500171','500471'];
  const records=codes.map(code=>api.database.find(t=>t.testCode===code));
  assert(records.every(t=>t?.status==='active'));
  const bags=api.buildTransportBagPlan(records);
  const submissions=bags.flatMap(b=>api.buildSubmissionContents(b));
  assert.equal(submissions.reduce((sum,x)=>sum+x.count,0),3);
  assert.equal(submissions.length,3, 'Each frozen assay needs its own transport tube');
  for(const item of submissions) assert.equal(item.className,'tube-frozen-purple');
  for(const record of records)
    assert.match(api.menuContainerBadges(record),/tube-frozen-purple/);
});

test('Coagulation PT mixing study calculates two light-blue sources for 2 mL plasma', () => {
  const {api}=load();
  const t=api.database.find(x=>x.testCode==='117028');
  assert(t && t.status==='active');
  const expanded=api.expandedCollectionTests([t]);
  const bags=api.buildTransportBagPlan(expanded);
  const collection=api.buildCollectionPlan(expanded,bags);
  const blue=collection.find(x=>x.className==='tube-blue');
  assert(blue,'Light-blue citrate collection is missing');
  assert.equal(blue.count,2,'2 mL plasma should not be collected from one standard citrate tube');
  const submitted=bags.flatMap(b=>api.buildSubmissionContents(b));
  assert.equal(submitted.length,1);
  assert.equal(submitted[0].className,'tube-frozen-purple');
  assert.match(t.specialInstructions,/Double-spin/i);
});

test('Routine plasma drug level and SST assays remain separate from frozen submissions', () => {
  const {api}=load();
  const codes=['117050','501949','500550'];
  const records=codes.map(code=>api.database.find(t=>t.testCode===code));
  const bags=api.buildTransportBagPlan(records);
  const submitted=bags.flatMap(b=>api.buildSubmissionContents(b));
  assert(submitted.some(x=>x.className==='tube-frozen-purple'));
  assert(submitted.some(x=>x.className==='tube-transport tube-transport-green-top'));
  assert(submitted.some(x=>/SST/i.test(x.label)),'Ferritin original spun SST should remain original');
  assert(records.every(x=>x.status==='active'));
});
