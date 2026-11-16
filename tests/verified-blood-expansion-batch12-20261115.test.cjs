'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const bundles={
  quest:{file:'assets/js/quest-verified-blood-expansion-20261115-batch12.js',page:'index.html',app:'assets/js/app.js',codes:['16485','37838','37866']},
  labcorp:{file:'assets/js/labcorp/catalog/verified-blood-expansion-20261115-batch12.js',page:'labcorp.html',app:'labcorp-app.js',codes:['520018','520023','163050','520158','520119','004575']}
};
const apply=(type,initial=[])=>{
 const window={SEED_TESTS:initial};
 vm.runInNewContext(read(bundles[type].file),{window,console},{filename:bundles[type].file});
 return window.SEED_TESTS;
};
test('Both laboratory pages load the new verified bundles before their planners',()=>{
 for(const b of Object.values(bundles)){
  const html=read(b.page);
  assert(html.includes('<script src="'+b.file+'?v=1"></script>'));
  assert(html.indexOf(b.file)<html.indexOf('<script src="'+b.app));
 }
});
test('Every order code is a unique active blood record with a source and supported containers',()=>{
 for(const [lab,b] of Object.entries(bundles)){
  const rows=apply(lab);assert.equal(rows.length,b.codes.length);
  for(const code of b.codes){
   const r=rows.find(t=>t.testCode===code);assert(r,code);
   assert.equal(r.status,'active');assert.equal(r.spin,'Yes');
   assert.equal(r.specimenType,'Serum');
   for(const k of ['testName','drawContainer','transportContainer','preferredVolume','minimumVolume','transportTemperature','stability','specialInstructions','source'])assert(r[k],code+' '+k);
   assert.match(r.source,/https:\/\//);
   assert.equal(r.collectionCount,1);assert.equal(r.submissionCount,1);
   assert.doesNotMatch(r.drawContainer+' '+r.transportContainer,/slide|smear|acid.preserved|Insure/i);
   assert(!r.testName.includes('Result Component'),code);
  }
 }
});
test('Quest HDL and liver antibody routes use one green-badge transport type and preserve fasting notices',()=>{
 const rows=apply('quest'),get=code=>rows.find(r=>r.testCode===code);
 assert.equal(rows.length,3);
 for(const r of rows){assert.equal(r.transportContainer,'Transport Tube');assert.equal(r.transportTemperature,'Refrigerated');assert.equal(r.drawContainer,'SST / Gold');}
 for(const code of ['37838','37866']){
  const r=get(code);assert.match(r.specialInstructions,/fast 10-12 hours/i);
  assert.match(r.specialInstructions,/ship the same day/i);
  assert.match(r.stability,/Room temperature unacceptable/);
 }
 assert.match(get('16485').specialInstructions,/Centrifuge and aliquot/i);
});
test('Labcorp separates spun SST original tubes from plastic serum transfers and documents NY restrictions',()=>{
 const rows=apply('labcorp'),get=code=>rows.find(r=>r.testCode===code);
 for(const code of ['163050','004575'])assert.equal(get(code).transportContainer,'SST / Gold (spun)');
 for(const code of ['520018','520023','520158','520119'])assert.equal(get(code).transportContainer,'Transport Tube');
 for(const code of ['520158','520119'])assert.match(get(code).specialInstructions,/not approved.*New York/i);
 assert.match(get('004575').specialInstructions,/plasma/i);
 assert.equal(get('004575').testCode,'004575');
});
test('Re-running bundle is idempotent and pre-existing validated and blocked codes are preserved',()=>{
 for(const [lab,b] of Object.entries(bundles)){
  const initial=[
   {testCode:b.codes[0],testName:'Existing validated profile',status:'active'},
   {testCode:b.codes[1],testName:'Safety-blocked profile',status:'blocked'}
  ];
  const once=apply(lab,initial);
  const twice=apply(lab,once);
  assert.equal(twice.length,b.codes.length);
  assert.equal(twice.find(r=>r.testCode===b.codes[0]).testName,'Existing validated profile');
  assert.equal(twice.find(r=>r.testCode===b.codes[1]).status,'blocked');
 }
});
test('Matching reference-only record becomes active; colliding code with different name is not replaced',()=>{
 const pending=[{testCode:'16485',testName:'GP210 antibody serum',status:'pending'}];
 let rows=apply('quest',pending);
 assert.equal(rows.find(r=>r.testCode==='16485').status,'active');
 rows=apply('quest',[{testCode:'16485',testName:'Unrelated competing test',status:'reference'}]);
 assert.equal(rows.find(r=>r.testCode==='16485').status,'reference');
});
