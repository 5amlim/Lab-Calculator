'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const bundles = {
  Quest: 'assets/js/quest-official-mixed-expansion-20261115-batch14.js',
  Labcorp: 'assets/js/labcorp/catalog/official-mixed-expansion-20261115-batch14.js'
};
const apps = { Quest: 'assets/js/app.js', Labcorp: 'labcorp-app.js' };
const codes = {
  Quest: ['36586', '10189', '90353', '92688', '34484', '968'],
  Labcorp: [ '520194', '520293', '520298', '520340', '520385', '123010', '123016', '123255']
};
function seed(lab, initial = []) {
  const window = { SEED_TESTS: initial };
  vm.runInNewContext(read(bundles[lab]), { window });
  return window.SEED_TESTS;
}
async function planner(lab) {
  const window = { SEED_TESTS: seed(lab), QUEST_MISSING_DIRECTORY_READY: Promise.resolve(0) };
  const document = {
    getElementById: id => ({ id, value: '', checked: false, options: [],
      classList: { add(){}, remove(){}, toggle(){} },
      addEventListener(){}, setAttribute(){}, querySelector(){return null;} }),
    querySelector(){return null;}, querySelectorAll(){return [];}, addEventListener(){}
  };
  const app = read(apps[lab]);
  const boundary = lab === 'Quest' ? '  init();\n  };' : '  init();';
  assert(app.includes(boundary), lab+' bootstrap boundary');
  const hook = '  window.__mixedBatchAudit={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};'
      + (lab === 'Quest' ? '\n  };' : '');
  vm.runInNewContext(app.replace(boundary, hook), {
    window, document, localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
    setTimeout(){return 0;}, clearTimeout(){},
    console:{warn(){},error(){}}
  }, {filename:apps[lab],timeout:30000});
  await new Promise(resolve => setImmediate(resolve));
  assert(window.__mixedBatchAudit, lab+' calculator hook');
  return window.__mixedBatchAudit;
}
function plan(api, testCodes) {
  const selected = testCodes.map(code => api.database.find(row => row.testCode === code));
  assert(selected.every(row => row && row.status === 'active'), 'codes should be cart-ready');
  const expanded = api.expandedCollectionTests(selected);
  const bags = api.buildTransportBagPlan(expanded);
  return {
    selected, bags,
    draw: api.buildCollectionPlan(expanded,bags),
    submit: bags.flatMap(bag=>api.buildSubmissionContents(bag))
  };
}
test('Verified batch is loaded once before both planners and all candidates have source and handling metadata',()=>{
  for(const lab of ['Quest','Labcorp']){
    const rows = seed(lab), page = read(lab === 'Quest' ? 'index.html' : 'labcorp.html');
    assert.deepEqual(Array.from(rows, x=>x.testCode), codes[lab]);
    assert.equal(page.split(bundles[lab]).length-1,1);
    assert(page.indexOf(bundles[lab]) < page.indexOf('src="'+apps[lab]));
    for(const row of rows){
      assert.equal(row.status,'active');
      for(const key of ['source','testName','drawContainer','transportContainer','preferredVolume','minimumVolume','specialInstructions']){
        assert(row[key], lab+' '+row.testCode+' '+key);
      }
      assert.match(row.source,/2026-11-15/);
      assert.doesNotMatch(row.drawContainer+' '+row.transportContainer,/smear|slide|6N HCl|acid.preserv|InSure|green.label Aptima/i);
    }
  }
});
test('Batch is idempotent and does not overwrite existing active or blocked orders',()=>{
  for(const lab of ['Quest','Labcorp']){
    const entries = seed(lab);
    assert.equal(seed(lab,entries).length,entries.length);
    const protectedRows = [
      { testCode:codes[lab][0],testName:'Existing validated order',status:'active' },
      { testCode:codes[lab][1],testName:'Existing blocked order',status:'blocked' }
    ];
    const after=seed(lab,protectedRows);
    assert.equal(after[0].testName,'Existing validated order');
    assert.equal(after[1].status,'blocked');
  }
});
test('Quest light-protected thiamine tubes remain distinct and stool original cup is one-to-one',async()=>{
  const api=await planner('Quest');
  const p=plan(api,codes.Quest);
  assert(p.draw.some(x=>x.label==='Sterile cup'&&x.count===1));
  assert.equal(p.submit.filter(x=>x.label==='Sterile cup').length,1);
  assert.equal(p.submit.find(x=>x.label==='Sterile cup').count,1);
  const amber=p.submit.filter(x=>x.className==='tube-amber');
  assert.equal(amber.length,2);
  assert(amber.every(x=>x.count===1));
  assert(p.selected.find(x=>x.testCode==='10189').spin==='No');
  assert(p.selected.find(x=>x.testCode==='90353').spin==='Yes');
});
test('Labcorp frozen fecal tests share one original Sterile cup without inventing extra submitted cups',async()=>{
  const api=await planner('Labcorp');
  const p=plan(api,['123010','123016','123255']);
  assert.equal(p.draw.length,1);
  assert.equal(p.draw[0].label,'Sterile cup');
  assert.equal(p.draw[0].count,1);
  assert.equal(p.submit.length,1);
  assert.equal(p.submit[0].label,'Sterile cup');
  assert.equal(p.submit[0].count,1);
  assert.equal(p.submit[0].originalTube,true);
  assert.equal(p.submit[0].tests.length,3);
  assert.deepEqual(Array.from(p.bags,b=>b.label),['Frozen bag']);
});
test('Labcorp multi-SST serum panels retain additional source volume; anti-HMGCR remains original spun SST',async()=>{
  const api=await planner('Labcorp');
  const p=plan(api,codes.Labcorp.filter(x=>!['123010','123016','123255'].includes(x)));
  assert.equal(p.draw.length,1);
  assert.equal(p.draw[0].label,'Gold / SST');
  assert(p.draw[0].count>=2);
  assert(p.submit.some(x=>x.originalTube&&x.className==='tube-sst'));
  assert(p.submit.some(x=>x.className.includes('tube-transport-green-top')));
});
