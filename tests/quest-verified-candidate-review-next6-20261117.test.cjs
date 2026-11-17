'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root=path.resolve(__dirname,'..');
const file='assets/js/quest-verified-candidate-review-next6-20261117.js';
const source=fs.readFileSync(path.join(root,file),'utf8');
function run(seed=[]){const window={SEED_TESTS:seed};vm.runInNewContext(source,{window});return window.SEED_TESTS;}
const codes=['264','6054','10287','17407','34164','34698'];
test('new tests active, nonduplicate and source-labeled',()=>{
 const rows=run();assert.deepEqual(rows.map(x=>x.testCode),codes);
 for(const r of rows){
  assert.equal(r.status,'active');assert.ok(r.source.startsWith('https://'));
  assert.ok(r.specialLabeling.includes(r.specimenType.toUpperCase()),r.testCode);
  assert.ok(r.searchAliases.length>=3,r.testCode);assert.ok(r.clinicalCategories.length>=2,r.testCode);
  assert.ok(r.drawContainer&&r.transportContainer&&r.transportTemperature);
  assert.ok(!/date\/time/i.test(r.specialLabeling));
 }
});
test('active and blocked entries kept, reference-only entries promoted without ID change',()=>{
 const rows=run([{testCode:'264',status:'blocked',id:'locked'},{testCode:'6054',status:'active',id:'already-active'},{testCode:'10287',status:'reference',id:'reference-id'}]);
 assert.equal(rows.length,6);
 assert.equal(rows.find(x=>x.testCode==='264').status,'blocked');
 assert.equal(rows.find(x=>x.testCode==='6054').id,'already-active');
 assert.equal(rows.find(x=>x.testCode==='10287').status,'active');
 assert.equal(rows.find(x=>x.testCode==='10287').id,'reference-id');
});
test('urinary metals preserve original trace-metal-free collection vessel and source label',()=>{
 for(const row of run().filter(x=>['264','6054','34698'].includes(x.testCode))){
  assert.equal(row.specimenType,'Urine');
  assert.equal(row.drawContainer,'Trace Metal-Free Plastic Container');
  assert.equal(row.transportContainer,row.drawContainer);
  assert.match(row.specialLabeling,/RANDOM URINE/);
  assert.match(row.specialInstructions,/gadolinium/i);
 }
});
test('frozen specimens neither pooled with SST nor mislabeled',()=>{
 const rows=run(),c3=rows.find(x=>x.testCode==='10287'),rf=rows.find(x=>x.testCode==='17407');
 assert.equal(c3.drawContainer,'Red Top');
 assert.equal(c3.spin,'Yes');
 assert.equal(c3.transportContainer,'Transport Tube');
 assert.equal(c3.transportTemperature,'Frozen');
 assert.match(c3.specialInstructions,/NO SST/);
 assert.equal(rf.specimenType,'CSF');
 assert.equal(rf.drawContainer,'Sterile cup');
 assert.equal(rf.transportContainer,'Transport Tube');
 assert.equal(rf.transportTemperature,'Frozen');
});
test('neurocysticercosis CSF is in an additive-free sterile tube under refrigeration',()=>{
 const c=run().find(x=>x.testCode==='34164');
 assert.equal(c.specimenType,'CSF');
 assert.equal(c.drawContainer,'Sterile cup');
 assert.equal(c.transportContainer,'Transport Tube');
 assert.equal(c.transportTemperature,'Refrigerated');
 assert.match(c.specialInstructions,/11790/);
});
test('script loaded before app, after previous shortlist review',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const prev=html.indexOf('quest-verified-candidate-review-20261117.js');
 const next=html.indexOf('quest-verified-candidate-review-next6-20261117.js');
 const app=html.indexOf('assets/js/app.js');
 assert.ok(prev>=0&&next>prev&&app>next);
});
