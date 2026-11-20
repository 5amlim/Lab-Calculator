'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
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
    '  window.__questFluidAudit={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents,menuContainerBadges,canonicalCollectionContainer,printSubmissionItemDetail};\n  };'),
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
    assert.equal(item.transportContainer,'Sterile cup');
    assert.equal(item.transportTemperature,'Frozen');
    assert.equal(item.spin,'No');
    for(const field of ['testName','specimenType','preferredVolume','source','specialLabeling','specialInstructions'])
      assert(item[field],item.testCode+': missing '+field);
    assert.match(item.source,/https:\/\//);
    assert.match(item.specialInstructions,/Do not mix different specimen sources/i);
    assert.match(item.specialInstructions,/Submit the original labeled Sterile cup/i);
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
  assert.equal(p.submission.reduce((n,x)=>n+x.count,0),4,'one physically separate sterile cup per test');
  assert.equal(p.submission.length,1,'group the same physical stock and source under one card');
  assert(p.submission.every(x=>x.className==='tube-urine-cup'));
  assert(p.submission.every(x=>x.label==='Sterile cup'));
  assert.match(p.submission[0].detail,/Submit in original container/i);
  assert(records.every(x=>api.canonicalCollectionContainer(x).label==='Sterile cup'));
});
test('Different body fluid sources do not share submission or collection containers',async()=>{
  const api=await calculator();
  const codes=['17593','17596','17658','17417'];
  const p=plan(api,codes.map(c=>api.database.find(x=>x.testCode===c)));
  assert.equal(p.collection.filter(x=>x.label==='Sterile cup').length,4);
  assert.equal(p.collection.reduce((n,x)=>n+x.count,0),4);
  assert.equal(p.submission.reduce((n,x)=>n+x.count,0),4);
  assert.equal(new Set(p.submission.map(x=>x.label)).size,1,'all use identical Sterile cup inventory');
  assert.equal(new Set(p.submission.map(x=>x.key)).size,4,'separate specimen identities remain separate');
  assert(p.submission.every(x=>/original container/i.test(x.detail)));
});
test('All 18 fluid tests share the Sterile cup stock type without doubling the transport inventory',async()=>{
  const api=await calculator();
  const all=catalog().map(t=>api.database.find(x=>x.testCode===t.testCode));
  const p=plan(api,all);
  assert.equal(p.collection.length,5,'one labeled collection card per fluid source');
  assert(p.collection.every(item=>item.label==='Sterile cup'));
  assert.equal(p.collection.reduce((n,item)=>n+item.count,0),18);
  assert.equal(p.submission.reduce((n,x)=>n+x.count,0),18);
  assert(p.submission.every(x=>x.label==='Sterile cup'&&x.className==='tube-urine-cup'));
  assert.equal(new Set(p.submission.map(x=>x.key)).size,5,'five distinct body-fluid specimen sources');
  assert(p.submission.every(x=>x.originalTube===true),'one physical cup is collected and submitted, not extra transfer tubes');
});
test('Printed Sterile cup submissions say original container, not original tube',async()=>{
  const api=await calculator();
  const tests=['17593','17417'].map(code=>api.database.find(x=>x.testCode===code));
  const p=plan(api,tests);
  for(const item of p.submission){
    const text=api.printSubmissionItemDetail(item);
    assert.match(text,/Submit in original container/);
    assert.doesNotMatch(text,/Submit in original tube/);
  }
});
test('Quest loads active additions before the directory-only fallback',()=>{
  const html=read('index.html');
  const added=html.indexOf('quest-verified-fluid-chemistry-20261115.js');
  const fallback=html.indexOf('quest-missing-directory-loader-20261114.js');
  const app=html.indexOf('assets/js/app.js?v=');
  assert(added>0&&added<fallback&&fallback<app);
});
