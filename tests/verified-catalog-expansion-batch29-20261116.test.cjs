'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const modules={
  Quest:'assets/js/quest-verified-mixed-expansion-20261116-batch29.js',
  Labcorp:'assets/js/labcorp/catalog/verified-specialty-expansion-20261116-batch29.js'
};
const expected={
  Quest:['1304','17321','14693','13581','94588','5022','3967','36576','35167','36725','37675'],
  Labcorp:['117985','501949','500638','500850','500477','500848','500159','500600','500510','702891','500102','500650','500713','500712','504115','500726']
};
function load(lab,seed=[]){
 const window={SEED_TESTS:seed};
 vm.runInNewContext(read(modules[lab]),{window},{filename:modules[lab]});
 return window.SEED_TESTS;
}
test('batch29 loads exactly once before both calculator engines and all codes are active',()=>{
 for(const lab of Object.keys(expected)){
  const rows=load(lab);
  assert.deepEqual(Array.from(rows,r=>r.testCode),expected[lab]);
  const html=read(lab==='Quest'?'index.html':'labcorp.html');
  const app=lab==='Quest'?'assets/js/app.js':'labcorp-app.js';
  assert.equal(html.split(modules[lab]).length-1,1);
  assert(html.indexOf(modules[lab])<html.indexOf('src="'+app));
  assert.equal(new Set(rows.map(r=>r.testCode)).size,rows.length);
  for(const r of rows){
   assert.equal(r.status,'active',r.testCode);
   for(const field of ['testCode','testName','specimenType','drawContainer','transportContainer','preferredVolume','minimumVolume','transportTemperature','specialInstructions','source']){
    assert(String(r[field]||'').trim(),r.testCode+' '+field);
   }
   assert(r.source.includes('/'+r.testCode+'/')||r.source.includes('/'+r.testCode+'?'),r.testCode);
   assert.doesNotMatch(r.drawContainer+' '+r.transportContainer,/slide|smear|acid.preserv|green.label aptima|insure card/i);
   assert.equal(r.alternativeContainer,'');
   assert.equal(r.collectionCount,1);
   assert.equal(r.submissionCount,1);
   assert(Array.isArray(r.searchAliases));
   assert(Array.isArray(r.clinicalCategories));
  }
 }
});
test('batch29 preserves verified/blocked entries, upgrades pending records and is idempotent',()=>{
 for(const lab of Object.keys(expected)){
  const codes=expected[lab];
  const seeds=[
   {testCode:codes[0],testName:'already verified',status:'active'},
   {testCode:codes[1],testName:'blocked',status:'blocked'},
   {testCode:codes[2],testName:'awaiting verification',status:'pending'}
  ];
  const rows=load(lab,seeds);
  assert.equal(rows.length,codes.length);
  assert.equal(rows[0].testName,'already verified');
  assert.equal(rows[1].status,'blocked');
  assert.equal(rows[2].status,'active');
  load(lab,rows);
  assert.equal(rows.length,codes.length);
 }
});
test('Quest stool specimens are direct-collection sterile cups, separated by required temperatures',()=>{
 const m=new Map(load('Quest').map(r=>[r.testCode,r]));
 for(const code of ['1304','5022','3967','14693']){
  assert.equal(m.get(code).drawContainer,'Sterile cup');
  assert.equal(m.get(code).transportContainer,'Sterile cup');
  assert.equal(m.get(code).transportTemperature,'Frozen');
  assert.equal(m.get(code).spin,'No');
 }
 assert.equal(m.get('17321').transportTemperature,'Refrigerated');
 for(const code of ['13581','94588','36576','35167','36725']){
  assert.equal(m.get(code).drawContainer,'SST / Gold');
  assert.equal(m.get(code).transportContainer,'Transport Tube');
  assert.equal(m.get(code).spin,'Yes');
 }
 assert.equal(m.get('37675').transportContainer,'SST / Gold (spun)');
 assert.equal(m.get('35167').transportTemperature,'Refrigerated');
 assert.equal(m.get('36725').transportTemperature,'Refrigerated');
});
test('Labcorp frozen serum is in purple-cap frozen transport; red-only routes do not pool into SST',()=>{
 const m=new Map(load('Labcorp').map(r=>[r.testCode,r]));
 for(const r of m.values()){
  assert.equal(r.specimenType,'Serum');
  assert.equal(r.spin,'Yes');
  if(r.transportTemperature==='Frozen'){
   assert.equal(r.transportContainer,'Frozen Transport Tube (Purple Cap)',r.testCode);
   assert.match(r.specialInstructions,/TRANSFER/i);
  }
 }
 for(const code of ['702891','500713','500712','500726']){
  assert.equal(m.get(code).drawContainer,'Red Top');
  assert.doesNotMatch(m.get(code).specialInstructions,/pool.*SST serum/i);
 }
 assert.equal(m.get('702891').transportContainer,'Transport Tube');
 assert.equal(m.get('702891').transportTemperature,'Room Temperature');
 assert.equal(m.get('500159').transportTemperature,'Refrigerated');
 for(const code of ['117985','501949'])assert.equal(m.get(code).transportContainer,'SST / Gold (spun)');
});
