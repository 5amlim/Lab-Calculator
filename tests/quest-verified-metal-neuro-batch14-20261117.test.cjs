'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const base=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(base,'assets/js/quest-verified-metal-neuro-batch14-20261117.js'),'utf8');
function seed(initial=[]){const window={SEED_TESTS:initial};vm.runInNewContext(source,{window});return window.SEED_TESTS;}
const codes=['494','6325','8330','11042','26506','30290','17515','14761','35386','36438','37081','37124','12598','12600'];
test('unique tested codes with required search, labeling and submission fields',()=>{
 const rows=seed();assert.deepEqual(rows.map(x=>x.testCode),codes);
 assert.equal(new Set(rows.map(x=>x.testCode)).size,14);
 for(const x of rows){
  assert.equal(x.status,'active');
  assert.ok(x.source.includes('/'+x.testCode+'/'),x.testCode);
  assert.ok(x.searchAliases.length>=3&&x.clinicalCategories.length>=2,x.testCode);
  assert.ok(x.specialLabeling.startsWith('Label '),x.testCode);
  assert.equal(x.specialLabeling.toLowerCase().includes('date/time'),false,x.testCode);
  assert.ok(x.drawContainer&&x.transportContainer&&x.transportTemperature,x.testCode);
 }
});
test('active and blocked entries unchanged; reference and pending promoted without ID change',()=>{
 const rows=seed([{testCode:'494',id:'blocked-id',status:'blocked'},{testCode:'6325',id:'active-id',status:'active'},{testCode:'8330',id:'reference-id',status:'reference'},{testCode:'17515',id:'pending-id',status:'pending'}]);
 const by=new Map(rows.map(x=>[x.testCode,x]));assert.equal(rows.length,14);
 assert.equal(by.get('494').status,'blocked');
 assert.equal(by.get('6325').id,'active-id');
 assert.equal(by.get('8330').id,'reference-id');
 assert.equal(by.get('8330').status,'active');
 assert.equal(by.get('17515').id,'pending-id');
 assert.equal(by.get('17515').status,'active');
});
test('random urine metals use original certified trace metal free container',()=>{
 const by=new Map(seed().map(x=>[x.testCode,x]));
 for(const code of ['494','6325','8330','11042','26506','30290']){
  const x=by.get(code);
  assert.equal(x.specimenType,'Urine');
  assert.equal(x.drawContainer,'Trace Metal-Free Plastic Container');
  assert.equal(x.transportContainer,x.drawContainer);
  assert.ok(x.specialLabeling.includes('RANDOM URINE'));
 }
 for(const code of ['494','8330'])assert.equal(by.get(code).transportTemperature,'Frozen');
 assert.equal(by.get('30290').lightProtect,true);
 assert.ok(by.get('30290').specialLabeling.includes('PROTECT FROM LIGHT'));
});
test('timed urine metal assays preserve separate 24 hour source and refrigerated submission aliquot',()=>{
 const by=new Map(seed().map(x=>[x.testCode,x]));
 for(const code of ['14761','35386','36438','37081','37124']){
  const x=by.get(code);
  assert.equal(x.drawContainer,'24-Hour Urine Container');
  assert.equal(x.transportContainer,'Trace Metal-Free Plastic Container');
  assert.equal(x.transportTemperature,'Refrigerated');
  assert.ok(x.specialInstructions.includes('certified metal-free 24-hour jug'));
  assert.ok(x.specialInstructions.includes('TOTAL COLLECTION VOLUME'));
  assert.ok(x.specialLabeling.includes('24-HOUR URINE'));
 }
 for(const code of ['37081','37124'])assert.ok(by.get(code).specialInstructions.includes('NEW YORK'));
 const iron=by.get('17515');
 assert.equal(iron.drawContainer,'24-Hour Urine Container');
 assert.equal(iron.transportContainer,'Transport Tube');
 assert.equal(iron.transportTemperature,'Room Temperature');
 assert.ok(iron.specialInstructions.includes('NO preservative'));
});
test('CSF encephalitis panels retain original cup, cold packing and NY restriction',()=>{
 for(const x of seed().filter(x=>['12598','12600'].includes(x.testCode))){
  assert.equal(x.specimenType,'CSF');
  assert.equal(x.drawContainer,'Sterile cup');
  assert.equal(x.transportContainer,'Sterile cup');
  assert.equal(x.transportTemperature,'Refrigerated');
  assert.ok(x.specialInstructions.includes('NOT AVAILABLE for NEW YORK'));
 }
});
test('module script loads after prior catalog and before app',()=>{
 const html=fs.readFileSync(path.join(base,'index.html'),'utf8');
 const prior=html.indexOf('quest-verified-candidate-review-next6-20261117.js');
 const current=html.indexOf('quest-verified-metal-neuro-batch14-20261117.js');
 const app=html.indexOf('assets/js/app.js');
 assert.ok(prior>=0&&current>prior&&app>current);
});
