'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const paths={
 Quest:'assets/js/quest-verified-mixed-expansion-20261116-batch22.js',
 Labcorp:'assets/js/labcorp/catalog/verified-mixed-expansion-20261116-batch22.js'
};
const expected={Quest:['6740','94675','17656','95185'],Labcorp:['140335','620009','182776']};
function load(lab,initial=[]){
 const window={SEED_TESTS:initial};
 vm.runInNewContext(read(paths[lab]),{window},{filename:paths[lab]});
 return window.SEED_TESTS;
}
test('batch22 codes are unique, active, and loaded before calculator startup',()=>{
 for(const lab of Object.keys(expected)){
  const rows=load(lab);
  assert.deepEqual(rows.map(x=>x.testCode),expected[lab]);
  const page=read(lab==='Quest'?'index.html':'labcorp.html');
  const app=lab==='Quest'?'assets/js/app.js':'labcorp-app.js';
  assert.equal(page.split(paths[lab]).length-1,1);
  assert(page.indexOf(paths[lab])<page.indexOf('src="'+app));
  for(const r of rows){
   assert.equal(r.status,'active');
   for(const field of ['testName','specimenType','drawContainer','transportContainer',
       'preferredVolume','minimumVolume','transportTemperature','specialInstructions','source']){
     assert(String(r[field]||'').trim(),r.testCode+' '+field);
   }
   assert(r.source.includes('/'+r.testCode+'/')||r.source.includes('/'+r.testCode+'?'),r.testCode);
   assert.doesNotMatch(r.drawContainer+' '+r.transportContainer,/slide|smear|acid.preserv|green.label aptima|insure card/i);
   assert.equal(r.alternativeContainer,'','only fully configured collection routes shown');
  }
 }
});
test('batch22 does not change existing active or blocked records',()=>{
 for(const lab of Object.keys(expected)){
  const initial=load(lab);load(lab,initial);
  assert.equal(initial.length,expected[lab].length);
  const seed=[
   {testCode:expected[lab][0],testName:'already verified',status:'active'},
   {testCode:expected[lab][1],testName:'do not perform',status:'blocked'},
   {testCode:expected[lab][2],testName:'to verify',status:'reference'}
  ];
  load(lab,seed);
  assert.equal(seed.length,expected[lab].length);
  assert.equal(seed[0].testName,'already verified');
  assert.equal(seed[1].status,'blocked');
  assert.equal(seed[2].status,'active');
 }
});
test('Quest body fluids, original swabs and no-spin specimens remain distinct',()=>{
 const m=new Map(load('Quest').map(x=>[x.testCode,x]));
 assert.equal(m.get('6740').drawContainer,'Lavender EDTA');
 assert.equal(m.get('6740').transportContainer,'Lavender EDTA');
 assert.equal(m.get('6740').spin,'No');
 assert.equal(m.get('6740').specimenType,'Pericardial Fluid');
 assert.equal(m.get('94675').specimenType,'Body Fluid');
 assert.equal(m.get('94675').drawContainer,'Sterile cup');
 assert.equal(m.get('94675').transportContainer,'Transport Tube');
 assert.equal(m.get('94675').spin,'Yes');
 assert.equal(m.get('17656').drawContainer,'ESwab (Amies)');
 assert.equal(m.get('17656').transportContainer,'ESwab (Amies)');
 assert.equal(m.get('17656').transportTemperature,'Refrigerated');
 assert.equal(m.get('95185').transportContainer,'Sterile cup');
 assert.equal(m.get('95185').spin,'No');
});
test('Labcorp neopterin and urine culture use distinct temperatures and submissions',()=>{
 const m=new Map(load('Labcorp').map(x=>[x.testCode,x]));
 assert.equal(m.get('140335').specimenType,'Serum');
 assert.equal(m.get('140335').transportContainer,'SST / Gold (spun)');
 assert.equal(m.get('140335').transportTemperature,'Refrigerated');
 assert.match(m.get('140335').specialInstructions,/PROTECT FROM SUNLIGHT/);
 assert.equal(m.get('620009').specimenType,'CSF');
 assert.equal(m.get('620009').transportContainer,'Transport Tube');
 assert.equal(m.get('620009').transportTemperature,'Frozen');
 assert.match(m.get('620009').specialInstructions,/72-hour stability/);
 assert.equal(m.get('182776').specimenType,'Urine');
 assert.equal(m.get('182776').drawContainer,'Sterile cup');
 assert.equal(m.get('182776').transportContainer,'Sterile cup');
 assert.equal(m.get('182776').spin,'No');
});
