'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const src = 'assets/js/quest-verified-fluid-chemistry-20261115.js';

function catalog() {
  const window={SEED_TESTS:[]};
  vm.runInNewContext(read(src),{window},{filename:src,timeout:12000});
  return window.SEED_TESTS;
}
async function calculator() {
  const window={SEED_TESTS:[]};
  vm.runInNewContext(read(src),{window},{filename:src});
  const document={
    getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},querySelector(){return null;}}),
    querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}
  };
  const app=read('assets/js/app.js');
  assert(app.includes('  init();\n  };'));
  vm.runInNewContext(app.replace('  init();\n  };',
    '  window.__questFluidAudit={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents,menuContainerBadges,canonicalCollectionContainer};\n  };'),
    {window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},setTimeout:()=>0,clearTimeout(){},console:{warn(){},error(){}}},
    {filename:'assets/js/app.js',timeout:30000});
  await Promise.resolve();
  assert(window.__questFluidAudit);
  return window.__questFluidAudit;
}
function plan(api,records){
  const expanded=api.expandedCollectionTests(records);
  const bags=api.buildTransportBagPlan(expanded);
  return {bags,collection:api.buildCollectionPlan(expanded,bags),submission:bags.flatMap(b=>api.buildSubmissionContents(b))};
}
test('Quest adds exactly 18 unique slide-free, verified fluid entries',()=>{
  const list=catalog();
  assert.equal(list.length,18);
  assert.equal(new Set(list.map(x=>x.testCode)).size,18);
  for(const item of list) {
    assert.equal(item.status,'active');
    assert.equal(item.drawContainer,'Sterile cup');
    assert.equal(item.transportContainer,'Sterile Transport Tube');
    assert.equal(item.transportTemperature,'Frozen');
    assert.equal(item.spin,'No');
    for(const field of ['testName','specimenType','preferredVolume','source','specialLabeling','specialInstructions'])
      assert(item[field],item.testCode+': missing '+field);
    assert.match(item.source,/https:\/\//);
    assert.match(item.specialInstructions,/do not pool or combine/i);
    assert.doesNotMatch(item.drawContainer+' '+item.transportContainer,/slide|6N HCl|acid-preserv|Aptima|InSure/i);
  }
});
test('Source lab fluid and downstream frozen transport show existing badges and no incorrect pooling',async()=>{
  const api=await calculator();
  const records=['17593','17595','17413','17584'].map(code=>api.database.find(x=>x.testCode===code));
  assert(records.every(Boolean));
  assert(records.every(x=>x.status==='active'));
  const p=plan(api,records);
  assert.equal(p.bags.length,1,'same frozen bag, but physically separate source specimens');
  assert.equal(p.collection.find(x=>x.label==='Sterile cup').count,4);
  assert.equal(p.submission.reduce((n,x)=>n+x.count,0),4,'one distinct frozen submission per test');
  assert(p.submission.every(x=>x.className==='tube-transport'));
  assert(p.submission.every(x=>x.label==='Pleural Fluid Transport Tube'));
  assert(records.every(x=>api.canonicalCollectionContainer(x).label==='Sterile cup'));
});
test('Different body fluid sources do not share submission or collection containers',async()=>{
  const api=await calculator();
  const codes=['17593','17596','17658','17417'];
  const p=plan(api,codes.map(c=>api.database.find(x=>x.testCode===c)));
  assert.equal(p.collection.find(x=>x.label==='Sterile cup')?.count,4);
  assert.equal(p.submission.reduce((n,x)=>n+x.count,0),4);
  assert.equal(new Set(p.submission.map(x=>x.label)).size,4);
});
test('Quest loads active additions before the directory-only fallback',()=>{
  const html=read('index.html');
  const added=html.indexOf('quest-verified-fluid-chemistry-20261115.js');
  const fallback=html.indexOf('quest-missing-directory-loader-20261114.js');
  const app=html.indexOf('assets/js/app.js?v=');
  assert(added>0&&added<fallback&&fallback<app);
});
