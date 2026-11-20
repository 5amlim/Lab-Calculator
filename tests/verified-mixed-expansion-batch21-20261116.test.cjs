'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('./helpers/browser-vm.cjs');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const files={
  Quest:'assets/js/quest-verified-mixed-expansion-20261116-batch21.js',
  Labcorp:'assets/js/labcorp/catalog/verified-mixed-expansion-20261116-batch21.js'
};
const codes={
  Quest:['91839','34972','6635','15575','38313'],
  Labcorp:['503660','500757','501007','506262','501247']
};
function load(lab,seed=[]){
 const window={SEED_TESTS:seed};
 vm.runInNewContext(read(files[lab]),{window},{filename:files[lab]});
 return window.SEED_TESTS;
}
test('batch21 loads before calculators with unique verified active records',()=>{
 for(const lab of ['Quest','Labcorp']){
  const entries=load(lab);
  assert.deepEqual(Array.from(entries,x=>x.testCode),codes[lab]);
  const html=read(lab==='Quest'?'index.html':'labcorp.html');
  const bootstrap=lab==='Quest'?'assets/js/app.js':'labcorp-app.js';
  assert.equal(html.split(files[lab]).length,2);
  assert(html.indexOf(files[lab])<html.indexOf('src="'+bootstrap));
  for(const row of entries){
   assert.equal(row.status,'active');
   for(const key of ['testCode','testName','specimenType','drawContainer','transportContainer','preferredVolume','minimumVolume','transportTemperature','stability','specialInstructions','source','specialLabeling'])
    assert(String(row[key]||'').trim(),row.testCode+' missing '+key);
   assert(row.source.includes(row.testCode));
   assert.doesNotMatch(row.drawContainer+' '+row.transportContainer,/slides?|acid.preserv|acid.washed|InSure|green.label Aptima/i);
  }
 }
});
test('batch21 respects existing active and blocked codes and upgrades only pending',()=>{
 for(const lab of ['Quest','Labcorp']){
  const original=load(lab);
  load(lab,original);
  assert.equal(original.length,codes[lab].length);
  const seed=[
   {testCode:codes[lab][0],testName:'Existing Active',status:'active'},
   {testCode:codes[lab][1],testName:'Existing Blocked',status:'blocked'},
   {testCode:codes[lab][2],testName:'Reference Only',status:'reference'}
  ];
  load(lab,seed);
  assert.equal(seed.length,codes[lab].length);
  assert.equal(seed[0].testName,'Existing Active');
  assert.equal(seed[1].testName,'Existing Blocked');
  assert.equal(seed[2].status,'active');
 }
});
test('Quest CSF antibody and NMO specimens preserve body fluid source and temperatures',()=>{
 const m=new Map(load('Quest').map(x=>[x.testCode,x]));
 for(const c of ['91839','34972','15575','38313']){
  const row=m.get(c);assert.equal(row.specimenType,'CSF');
  const container = c === '34972' ? 'Sterile cup' : 'Transport Tube';
  assert.equal(row.drawContainer, container, c);
  assert.equal(row.transportContainer, container, c);
  assert.equal(row.spin,'No');
  assert.equal(row.collectionCount,1);
  assert.equal(row.submissionCount,1);
 }
 assert.equal(m.get('38313').transportTemperature,'Refrigerated');
 assert.equal(m.get('6635').specimenType,'Urine');
 assert.equal(m.get('6635').transportContainer,'Sterile cup');
 assert.equal(m.get('6635').transportTemperature,'Room Temperature');
 assert.equal(m.get('6635').spin,'No');
});
test('Labcorp frozen serum submissions stay purple cap with correct original draws',()=>{
 const m=new Map(load('Labcorp').map(x=>[x.testCode,x]));
 for(const c of codes.Labcorp){
  const row=m.get(c);assert.equal(row.specimenType,'Serum');
  assert.equal(row.transportContainer,'Frozen Transport Tube (Purple Cap)');
  assert.equal(row.transportTemperature,'Frozen');
  assert.equal(row.spin,'Yes');
  assert.equal(row.submissionCount,1);
 }
 assert.equal(m.get('501007').drawContainer,'Red Top');
 assert.equal(m.get('501247').drawContainer,'Red Top');
 assert.equal(m.get('501247').collectionCount,2);
 assert.match(m.get('503660').specialInstructions,/45 MINUTES/);
 assert.match(m.get('500757').specialInstructions,/Transpak 49482/);
});

test('CSF and urine label badges are shown once with collection date/time',()=>{
  for(const row of load('Quest')){
    assert.equal(row.specialLabeling,'Label specimen source and collection date/time',row.testCode);
    assert.doesNotMatch(row.specialLabeling,/Label (?:CSF|Urine) specimen/i);
  }
  for(const file of ['assets/js/app.js','labcorp-app.js']){
    const source=read(file);
    assert.match(source, /const labelParts = \[source, drawSourceQualifier\]/);
    assert.match(source, /labelParts.filter\(Boolean\).join\(' • '\)/);
  }
});
