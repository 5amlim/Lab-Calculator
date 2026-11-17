'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname,'..');
const modulePath = 'assets/js/quest-verified-from-unusable-audit-after92203-remaining86-20261117.js';
const source = fs.readFileSync(path.join(root,modulePath),'utf8');
const codes = ['93023','94088','94531','94577','94578','94603','94958','94959','94960','95512'];
function load(seed = []) {
 const window = {SEED_TESTS:seed};
 vm.runInNewContext(source,{window});
 return window.SEED_TESTS;
}
test('audited active entries have unique codes, categories, direct specimen labels and sources',()=>{
 const rows=load();
 assert.deepEqual(rows.map(r=>r.testCode),codes);
 assert.equal(new Set(rows.map(r=>r.testCode)).size,10);
 for(const row of rows){
   assert.equal(row.status,'active');
   assert.equal(row.source.includes('/'+row.testCode+'/'),true,row.testCode);
   assert.ok(row.searchAliases.length>=3,row.testCode+' aliases');
   assert.ok(row.clinicalCategories.length>=2,row.testCode+' categories');
   assert.ok(row.specialLabeling.includes(row.specimenType.toUpperCase()),row.testCode+' labeling');
   assert.ok(!/date\/time/i.test(row.specialLabeling));
   assert.ok(row.drawContainer&&row.transportContainer&&row.transportTemperature);
 }
});
test('reference-only entries promoted and active or blocked entries remain untouched',()=>{
 const row=load([
   {testCode:'93023',status:'active',id:'keep-active'},
   {testCode:'94088',status:'blocked',id:'keep-blocked'},
   {testCode:'94531',status:'reference',id:'preserve-id'},
   {testCode:'94577',status:'pending',id:'pending-preserve-id'},
 ]);
 assert.equal(row.length,10);
 const by=new Map(row.map(x=>[x.testCode,x]));
 assert.equal(by.get('93023').id,'keep-active');
 assert.equal(by.get('94088').status,'blocked');
 assert.equal(by.get('94531').status,'active');
 assert.equal(by.get('94531').id,'preserve-id');
 assert.equal(by.get('94577').status,'active');
 assert.equal(by.get('94577').id,'pending-preserve-id');
});
test('specialty whole blood samples remain unspun and source specific',()=>{
 const by=new Map(load().map(x=>[x.testCode,x]));
 for(const code of ['93023','94088']){
   const t=by.get(code);
   assert.equal(t.specimenType,'Whole Blood');
   assert.equal(t.drawContainer,'Lavender EDTA');
   assert.equal(t.transportContainer,'Lavender EDTA');
   assert.equal(t.spin,'No');
   assert.equal(t.transportTemperature,'Room Temperature');
 }
});
test('CSF transported refrigerated without slides or transfer in original sterile container',()=>{
 const by=new Map(load().map(x=>[x.testCode,x]));
 for(const code of ['94531','94603','94958','94959','94960']){
   const t=by.get(code);
   assert.equal(t.specimenType,'CSF');
   assert.equal(t.drawContainer,t.transportContainer);
   assert.equal(t.spin,'No');
   assert.equal(t.transportTemperature,'Refrigerated');
   assert.match(t.specialInstructions,/original/i);
   assert.match(t.specialLabeling,/CSF/);
 }
 for(const code of ['94958','94959','94960']) {
  assert.equal(by.get(code).drawContainer,'Sterile cup');
  assert.equal(by.get(code).preferredVolume,'4 mL CSF');
 }
});
test('sputum TB specimens use original cup with strict refrigerated transport',()=>{
 const by=new Map(load().map(x=>[x.testCode,x]));
 for(const code of ['94577','94578']){
   const t=by.get(code);
   assert.equal(t.specimenType,'Sputum');
   assert.equal(t.drawContainer,'Sterile cup');
   assert.equal(t.transportContainer,'Sterile cup');
   assert.equal(t.transportTemperature,'Refrigerated');
   assert.match(t.specialInstructions,/airborne-precaution|airborne precaution/i);
   assert.match(t.specialInstructions,/not.*induc|never induce/i);
   assert.match(t.specialLabeling,/SPUTUM/);
 }
 assert.equal(by.get('94577').preferredVolume,'5 mL sputum');
 assert.equal(by.get('94578').preferredVolume,'10 mL sputum');
});
test('viral PCR panel uses accepted original viral media only, not bacterial ESwab',()=>{
 const t=load().find(x=>x.testCode==='95512');
 assert.equal(t.specimenType,'Nasopharyngeal Swab');
 assert.equal(t.drawContainer,'Viral transport medium (VCM)');
 assert.equal(t.transportContainer,'Viral transport medium (VCM)');
 assert.equal(t.transportTemperature,'Refrigerated');
 assert.match(t.specialInstructions,/only|NP only/i);
});
test('final bundle loads after previous audited series, before calculator app',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const previous=html.indexOf('quest-verified-from-unusable-audit-after90168-next100-20261117.js');
 const current=html.indexOf('quest-verified-from-unusable-audit-after92203-remaining86-20261117.js');
 const app=html.indexOf('assets/js/app.js');
 assert.ok(previous>=0&&current>previous&&app>current);
});
