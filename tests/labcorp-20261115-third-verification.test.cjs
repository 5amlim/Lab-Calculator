'use strict';
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

const enabled = [
  '086270','086280','086295','086310','100768','117915','140080',
  '140269','140822','162045','163882','163915','500108','500133',
  '500144','500152','500163','500458','500540','500649','500881',
  '503658','504005','504510','504591','504680','504796'
];

function load() {
  const window = { SEED_TESTS: [] };
  vm.runInNewContext(read('labcorp-missing-tests-20261115.js'), {window, console},
    {filename:'labcorp-missing-tests-20261115.js',timeout:15000});
  const document = {
    getElementById(id) {
      return {id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},
        addEventListener(){},setAttribute(){},querySelector(){return null;}};
    },
    querySelector(){return null;},
    querySelectorAll(){return [];},
    addEventListener(){}
  };
  const app = read('labcorp-app.js');
  assert(app.includes('  init();'),'app initialization boundary changed');
  vm.runInNewContext(app.replace('  init();',
    '  window.__audit = {database,expandedCollectionTests,buildTransportBagPlan,'+
    'buildCollectionPlan,buildSubmissionContents,menuContainerBadges};'),
    {window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
      setTimeout(){return 0;},clearTimeout(){},console:{error(){},warn(){}}},
    {filename:'labcorp-app.js',timeout:30000});
  return {seed:window.SEED_TESTS,api:window.__audit};
}

function plan(api,code) {
  const record=api.database.find(t=>t.testCode===code);
  assert(record,code+' not present');
  const routes=api.expandedCollectionTests([record]);
  const bags=api.buildTransportBagPlan(routes);
  return {
    record, routes, bags,
    draw:api.buildCollectionPlan(routes,bags),
    submit:bags.flatMap(b=>api.buildSubmissionContents(b))
  };
}
test('Another 27 verified codes become cart-ready without enabling the remaining unverified references',()=>{
  const {seed}=load();
  assert.equal(seed.length,347);
  assert.equal(new Set(seed.map(t=>t.testCode)).size,347);
  assert.equal(seed.filter(t=>t.status==='active').length,85);
  assert.equal(seed.filter(t=>t.status==='pending').length,262);
  assert.equal(enabled.length,27);
  for(const code of enabled){
    const item=seed.find(t=>t.testCode===code);
    assert.equal(item?.status,'active',code+' must be cart-ready');
    for(const field of ['specimenType','drawContainer','transportContainer',
      'preferredVolume','transportTemperature','source','specialInstructions'])
      assert(item[field],code+' missing '+field);
    assert.match(item.source,/labcorp\.com\/tests\/|specialtytesting\.labcorp\.com\/tests\//i,
      code+' missing official source');
  }
  assert.equal(seed.find(t=>t.testCode==='160721').status,'pending',
    'discontinued antipancreatic islet cell order code must not be enabled');
});

test('3mL serum needs two Gold SSTs, and 5mL serum must never show one SST',()=>{
  const {api}=load();
  for(const code of ['500108','504796','500649','500540']){
    const result=plan(api,code);
    assert.equal(result.draw.find(t=>t.className==='tube-sst')?.count,2,
      code+' Gold SST count insufficient');
    assert.equal(result.submit.length,1);
    assert.equal(result.submit[0].className,'tube-frozen-purple');
  }
});

test('Galectin-3 and BNP show distinct ambient serum and frozen EDTA paths',()=>{
  const {api}=load(),result=plan(api,'140080');
  assert.equal(result.routes.length,2);
  assert.equal(result.bags.length,2);
  assert(result.draw.some(t=>t.className==='tube-sst'&&t.count===1));
  assert(result.draw.some(t=>t.className==='tube-lavender'&&t.count===1));
  assert(result.submit.some(t=>t.className==='tube-frozen-purple'));
  assert(result.submit.some(t=>t.className==='tube-transport tube-transport-green-top'));
});

test('Plasma renin and vWF use original EDTA/citrate sources and frozen dedicated transports',()=>{
  const {api}=load();
  for(const [code,source] of [['500458','tube-lavender'],['086280','tube-blue']]){
    const result=plan(api,code);
    assert(result.draw.some(t=>t.className===source));
    assert.equal(result.submit.length,1);
    assert.equal(result.submit[0].className,'tube-frozen-purple');
  }
});
test('Revised Labcorp catalog and shared dropdown versions are referenced by live pages',()=>{
  assert.match(read('labcorp.html'),/labcorp-missing-tests-20261115\.js\?v=20261115-4/);
  for(const page of ['index.html','labcorp.html','cedars.html'])
    assert.match(read(page),/assets\/js\/lab-select\.js\?v=4/);
  assert.match(read('assets/js/lab-select.js'),/labcorp:1481/);
});
