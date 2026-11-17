'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const modules={
 Quest:'assets/js/quest-verified-mixed-expansion-20261116-batch30.js',
 Labcorp:'assets/js/labcorp/catalog/verified-coagulation-expansion-20261116-batch30.js'
};
const codes={
 Quest:['10156','10379','92062','19681'],
 Labcorp:['117150','117921','086284','117713','117340','117359','117739']
};
const load=(lab,initial=[])=>{
 const window={SEED_TESTS:initial};
 vm.runInNewContext(read(modules[lab]),{window},{filename:modules[lab]});
 return window.SEED_TESTS;
};
const get=(lab)=>new Map(load(lab).map(r=>[r.testCode,r]));
test('batch30 is unique, active, and present before each calculator engine exactly once',()=>{
 for(const lab of Object.keys(codes)){
  const rows=load(lab),expected=codes[lab];
  assert.deepEqual(Array.from(rows,r=>r.testCode),expected);
  const page=read(lab==='Quest'?'index.html':'labcorp.html'),app=lab==='Quest'?'assets/js/app.js':'labcorp-app.js';
  assert.equal(page.split(modules[lab]).length-1,1);
  assert(page.indexOf(modules[lab])<page.indexOf('src="'+app));
  for(const r of rows){
   assert.equal(r.status,'active');
   for(const field of ['testCode','testName','specimenType','drawContainer','transportContainer','preferredVolume','minimumVolume','transportTemperature','specialInstructions','source']) assert(String(r[field]||'').trim(),r.testCode+' '+field);
   assert.equal(r.alternativeContainer,'');
   assert.equal(typeof r.collectionCount,'number');
   assert.equal(typeof r.submissionCount,'number');
   assert(Array.isArray(r.searchAliases)&&r.searchAliases.length>0,r.testCode);
   assert(Array.isArray(r.clinicalCategories)&&r.clinicalCategories.length>0,r.testCode);
   assert.doesNotMatch(r.drawContainer+' '+r.transportContainer,/slide|smear|acid.preserv|green.label aptima|insure card/i);
  }
 }
});
test('batch30 does not append duplicates or replace active/blocked tests',()=>{
 for(const lab of Object.keys(codes)){
  const rows=load(lab),initial=[
   {testCode:codes[lab][0],status:'active',testName:'existing verified'},
   {testCode:codes[lab][1],status:'blocked',testName:'do not perform'},
   {testCode:codes[lab][2],status:'pending',testName:'placeholder'}
  ];
  load(lab,initial);
  assert.equal(initial.length,rows.length);
  assert.equal(initial[0].testName,'existing verified');
  assert.equal(initial[1].testName,'do not perform');
  assert.equal(initial[2].status,'active');
  load(lab,initial);
  assert.equal(initial.length,rows.length);
 }
});
test('Quest stool is original frozen Sterile cup with no transfer or spin',()=>{
 const r=get('Quest').get('10156');
 assert.equal(r.specimenType,'Stool');
 assert.equal(r.drawContainer,'Sterile cup');
 assert.equal(r.transportContainer,'Sterile cup');
 assert.equal(r.transportTemperature,'Frozen');
 assert.equal(r.spin,'No');
});
test('Quest paired serum and whole blood panels count distinct tubes and processing',()=>{
 const m=get('Quest');
 for(const code of ['10379','92062']){
  const r=m.get(code);
  assert.equal(r.specimenType,'Serum');
  assert.equal(r.drawContainer,'SST / Gold');
  assert.equal(r.additionalDrawRequirements.length,1);
  const edta=r.additionalDrawRequirements[0];
  assert.equal(edta.container,'Lavender EDTA');
  assert.equal(edta.transportContainer,'Lavender EDTA');
  assert.equal(edta.specimenType,'Whole Blood');
  assert.equal(edta.spin,'No');
  assert.equal(edta.count,1);
  assert.equal(edta.submissionCount,1);
 }
 assert.equal(m.get('10379').transportTemperature,'Room Temperature');
 assert.equal(m.get('92062').transportTemperature,'Refrigerated');
 assert.equal(m.get('92062').preferredVolume,'4 mL serum');
});
test('Quest von Willebrand comprehensive requires four separate frozen PPP aliquots',()=>{
 const r=get('Quest').get('19681');
 assert.equal(r.drawContainer,'Light Blue Citrate');
 assert.equal(r.transportContainer,'Transport Tube');
 assert.equal(r.specimenType,'Platelet-poor plasma');
 assert.equal(r.collectionCount,4);
 assert.equal(r.submissionCount,4);
 assert.match(r.specialInstructions,/FOUR full light-blue 3\.2% sodium citrate tubes/);
 assert.equal(r.transportTemperature,'Frozen');
 assert.match(r.specialInstructions,/SECOND time|second time/i);
});
test('Labcorp coagulation requires unique frozen purple-cap vials, and serum remains refrigerated',()=>{
 const m=get('Labcorp');
 const serum=m.get('117150');
 assert.equal(serum.drawContainer,'SST / Gold');
 assert.equal(serum.transportContainer,'Transport Tube');
 assert.equal(serum.transportTemperature,'Refrigerated');
 for(const [code,r] of m){
  if(code==='117150')continue;
  assert.equal(r.specimenType,'Plasma');
  assert.equal(r.drawContainer,'Light Blue Sodium Citrate');
  assert.equal(r.transportContainer,'Frozen Transport Tube (Purple Cap)');
  assert.equal(r.transportTemperature,'Frozen');
  assert.match(r.specialInstructions,/aliquot/i);
 }
 assert.equal(m.get('086284').submissionCount,3);
 assert.equal(m.get('086284').collectionCount,3);
});
test('new codes are searchable with current clinical category filters',()=>{
 const window={};vm.runInNewContext(read('assets/js/clinical-categories.js'),{window});
 for(const [lab,category] of [['Quest','coagulation'],['Labcorp','coagulation']]){
  const items=load(lab);
  assert(items.some(r=>window.LabClinicalCategories.forTest(r).includes(category)));
  for(const r of items)assert(window.LabClinicalCategories.forTest(r).length>0,r.testCode);
 }
});
