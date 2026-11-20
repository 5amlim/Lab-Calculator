'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const root = path.join(__dirname, '..');
const bundle = fs.readFileSync(path.join(root,'assets/js/quest-verified-candidate-review-20261117.js'),'utf8');
const expected=['270','30338','37129','37962','38404','39447','91713'];
function load(seed=[]) { const window={SEED_TESTS:seed}; vm.runInNewContext(bundle,{window}); return window.SEED_TESTS; }
test('verified candidate module registers seven unique active records with names, source, aliases and labeling',()=>{
 const rows=load();
 assert.deepEqual(rows.map(t=>t.testCode),expected);
 assert.equal(new Set(rows.map(t=>t.testCode)).size,7);
 for(const row of rows){
  assert.equal(row.status,'active');
  assert.ok(row.source.startsWith('https://'),row.testCode);
  assert.ok(row.searchAliases.length>=3,row.testCode);
  assert.ok(row.clinicalCategories.length>=2,row.testCode);
  assert.match(row.specialLabeling,/Label /);
  assert.ok(!/date\/time/i.test(row.specialLabeling));
  assert.ok(row.drawContainer && row.transportContainer && row.transportTemperature);
 }
});
test('existing active and blocked entries never overwritten; reference and pending promoted',()=>{
 const rows=load([
 {testCode:'270',id:'original-block',status:'blocked'},
 {testCode:'30338',id:'original-active',status:'active'},
 {testCode:'37129',id:'original-ref',status:'reference'},
 {testCode:'37962',id:'original-pending',status:'pending'}
 ]);
 assert.equal(rows.length,7);
 const by=new Map(rows.map(t=>[t.testCode,t]));
 assert.equal(by.get('270').status,'blocked');
 assert.equal(by.get('30338').id,'original-active');
 assert.equal(by.get('37129').status,'active');
 assert.equal(by.get('37129').id,'original-ref');
 assert.equal(by.get('37962').status,'active');
 assert.equal(by.get('37962').id,'original-pending');
});
test('non-blood specimen source and submission labels are distinct',()=>{
 const by=new Map(load().map(t=>[t.testCode,t]));
 const arsenic=by.get('270');
 assert.equal(arsenic.drawContainer,'Trace Metal-Free Plastic Container');
 assert.equal(arsenic.transportContainer,arsenic.drawContainer);
 assert.match(arsenic.specialLabeling,/RANDOM URINE/);
 const carnitine=by.get('30338');
 assert.equal(carnitine.drawContainer,'Sterile cup');
 assert.equal(carnitine.transportContainer,'Transport Tube');
 assert.equal(carnitine.transportTemperature,'Frozen');
 assert.match(carnitine.specialInstructions,/10 mL plastic urine/);
 const vre=by.get('37129');
 assert.equal(vre.specimenType,'Stool');
 assert.equal(vre.drawContainer,'Sterile cup');
 assert.equal(vre.transportContainer,'ESwab (Amies)');
 assert.equal(vre.transportTemperature,'Room Temperature');
 assert.match(vre.specialLabeling,/STOOL/);
 const csf=by.get('37962');
 assert.equal(csf.specimenType,'CSF');
 assert.equal(csf.transportContainer,'Sterile cup');
 assert.equal(csf.transportTemperature,'Refrigerated');
 const gc=by.get('38404');
 assert.equal(gc.drawContainer,'ESwab (Amies)');
 assert.equal(gc.transportTemperature,'Room Temperature');
 assert.match(gc.specialInstructions,/24 HOURS/);
});
test('metabolic and CKD panels retain all noninterchangeable specimen sources and separate storage conditions',()=>{
 const by=new Map(load().map(t=>[t.testCode,t]));
 const metabolic=by.get('39447');
 assert.equal(metabolic.specimenType,'Serum');
 assert.equal(metabolic.additionalDrawRequirements.length,1);
 assert.equal(metabolic.additionalDrawRequirements[0].specimenType,'Whole Blood');
 assert.equal(metabolic.additionalDrawRequirements[0].spin,'No');
 const ckd=by.get('91713');
 assert.equal(ckd.usePreferredSerumYield,true);
 assert.equal(ckd.preferredVolume,'3 mL serum');
 assert.equal(ckd.fastingStatus,'required');
 assert.equal(ckd.additionalDrawRequirements.length,3);
 assert.deepEqual(Array.from(ckd.additionalDrawRequirements, x=>x.specimenType),['Whole Blood','Plasma','Urine']);
 assert.deepEqual(Array.from(ckd.additionalDrawRequirements, x=>x.container),['Lavender EDTA','Lavender EDTA','Sterile cup']);
 assert.deepEqual(Array.from(ckd.additionalDrawRequirements, x=>x.transportContainer),['Lavender EDTA','Transport Tube','Sterile cup']);
 assert.deepEqual(Array.from(ckd.additionalDrawRequirements, x=>x.transportTemperature),['Room Temperature','Refrigerated','Room Temperature']);
 assert.equal(ckd.submissionCount+ckd.additionalDrawRequirements.reduce((n,x)=>n+x.submissionCount,0),4);
 assert.equal(ckd.additionalDrawRequirements[1].spin,'Yes');
 assert.match(ckd.additionalDrawRequirements[1].specialLabeling,/PLASMA/);
});
test('new catalog module loads after preceding Quest audit modules and before app boot',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const old=html.indexOf('quest-verified-from-unusable-audit-after92203-remaining86-20261117.js');
 const newer=html.indexOf('quest-verified-candidate-review-20261117.js');
 const app=html.indexOf('assets/js/app.js');
 assert.ok(old>=0 && newer>old && app>newer);
});
