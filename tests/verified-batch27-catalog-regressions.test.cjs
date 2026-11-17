'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const configs={
 quest:{file:'assets/js/quest-official-verified-mixed-batch27-20261116.js',page:'index.html',app:'assets/js/app.js',codes:['30555','12734']},
 urine:{file:'assets/js/labcorp/catalog/verified-urine-mixed-expansion-20261116-batch27.js',page:'labcorp.html',app:'labcorp-app.js',codes:['912854','912855','912856','912593','912051','701622','701985','701279','701957','703340','808548','703083','703025','701106','702550','702549','702515']},
 serum:{file:'assets/js/labcorp/catalog/verified-serum-specialty-20261116-batch27.js',page:'labcorp.html',app:'labcorp-app.js',codes:['122135','001941','161414','176056','176106']}
};
function load(file,initial=[]){const window={SEED_TESTS:initial};vm.runInNewContext(read(file),{window},{filename:file});return window.SEED_TESTS;}
test('batch27 pages include each loaded module exactly once before app startup',()=>{
 for(const c of Object.values(configs)){
  const page=read(c.page),fragment='src="'+c.file+'?';
  assert.equal(page.split(fragment).length-1,1,c.file);
  assert(page.indexOf(fragment)<page.indexOf('src="'+c.app),c.file);
 }
});
test('all 24 batch27 codes are unique and eligible with source, specimen and handling data',()=>{
 const all=new Set();
 for(const c of Object.values(configs)){
  const entries=load(c.file);
  assert.deepEqual(entries.map(r=>r.testCode),c.codes);
  for(const r of entries){
   assert(!all.has(r.testCode),r.testCode);all.add(r.testCode);
   for(const key of ['testName','specimenType','drawContainer','transportContainer','preferredVolume','minimumVolume','transportTemperature','spin','stability','specialInstructions','source'])
    assert(String(r[key]||'').trim(),r.testCode+' missing '+key);
   assert.equal(r.status,'active');
   assert.equal(r.alternativeContainer,'');
   assert.doesNotMatch(r.drawContainer+' '+r.transportContainer,/slides?|smear|acid.preserv|green.label aptima|insure card/i);
  }
 }
 assert.equal(all.size,24);
});
test('batch27 does not duplicate or override prior active or blocked records',()=>{
 for(const c of Object.values(configs)){
  const existing=load(c.file);load(c.file,existing);
  assert.equal(existing.length,c.codes.length);
  const seed=[{testCode:c.codes[0],status:'active',testName:'preexisting verified'},{testCode:c.codes[1],status:'blocked',testName:'blocked'},{testCode:c.codes[2]||'never-existing',status:'reference',testName:'directory only'}];
  load(c.file,seed);
  assert.equal(seed[0].testName,'preexisting verified');
  assert.equal(seed[1].testName,'blocked');
  if(c.codes[2])assert.equal(seed[2].status,'active');
 }
});
test('Quest FIB4 tests require separate refrigerated serum and room-temperature EDTA whole blood',()=>{
 for(const r of load(configs.quest.file)){
  assert.equal(r.specimenType,'Serum');
  assert.equal(r.drawContainer,'SST / Gold');
  assert.equal(r.transportContainer,'SST / Gold (spun)');
  assert.equal(r.transportTemperature,'Refrigerated');
  assert.equal(r.additionalDrawRequirements.length,1);
  const edta=r.additionalDrawRequirements[0];
  assert.equal(edta.container,'Lavender EDTA');
  assert.equal(edta.transportContainer,'Lavender EDTA');
  assert.equal(edta.specimenType,'Whole Blood');
  assert.equal(edta.transportTemperature,'Room Temperature');
  assert.equal(edta.spin,'No');
 }
});
test('Labcorp 17 urine assays use original unpreserved sterile cups and required frozen exception',()=>{
 for(const r of load(configs.urine.file)){
  assert.equal(r.specimenType,'Urine');
  assert.equal(r.drawContainer,'Sterile cup');
  assert.equal(r.transportContainer,'Sterile cup');
  assert.equal(r.spin,'No');
  assert.match(r.specialInstructions,/WITHOUT ANY PRESERVATIVE/);
  assert.equal(r.transportTemperature,r.testCode==='703083'?'Frozen':'Room Temperature');
 }
});
test('Labcorp serum tests retain their distinct transport and higher HLA yield',()=>{
 const by=new Map(load(configs.serum.file).map(r=>[r.testCode,r]));
 assert.equal(by.get('122135').transportContainer,'Transport Tube');
 assert.equal(by.get('001941').transportContainer,'Frozen Transport Tube (Purple Cap)');
 assert.equal(by.get('161414').transportContainer,'SST / Gold (spun)');
 for(const code of ['176056','176106']){
  assert.equal(by.get(code).preferredVolume,'7 mL serum');
  assert.equal(by.get(code).transportTemperature,'Refrigerated');
 }
});
