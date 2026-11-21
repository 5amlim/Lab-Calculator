'use strict';
const assert=require('node:assert/strict');
const test=require('node:test');
const {readFileSync}=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=readFileSync(path.join(root,'assets/js/labcorp/catalog/verified-final-remaining-20261121.js'),'utf8');
const html=readFileSync(path.join(root,'labcorp.html'),'utf8');
assert.match(html,/verified-final-remaining-20261121\.js/);
const pendingCodes=["183511","183631","316511","365200","716167","723202","910627","910650","910808"];
const db=pendingCodes.map(code=>({testCode:code,testName:code,status:'pending',id:'test-'+code}));
const sandbox={SEED_TESTS:db,LabDirectoryTat:{directory:{}}};sandbox.window=sandbox;vm.runInNewContext(source,sandbox,{timeout:20000});
test('nine formerly pending records become complete, searchable, cart-ready entries',()=>{
  assert.equal(pendingCodes.length,9);
  for(const code of pendingCodes){
    const r=db.find(x=>x.testCode===code);assert(r,'missing '+code);assert.equal(r.status,'active',code);
    for(const field of ['specimenType','drawContainer','transportContainer','transportTemperature','preferredVolume','specialLabeling','source','clinicalCategories']) assert(r[field]&&r[field].length>0,code+' '+field);
    assert.match(r.source,/^https:\/\//);assert.equal(r.collectionCount,1);assert.equal(r.submissionCount,1);
    assert(!/streck|hair|nail|tumor|cytology|acid.preserved|6n hcl/i.test(r.drawContainer+' '+r.transportContainer+' '+r.specialInstructions),code);
  }
});
test('nonblood specimens are labeled and cannot be confused with blood',()=>{
  for(const code of ['183511','316511','716167','723202']){const r=db.find(x=>x.testCode===code);assert.match(r.specialLabeling,/SPUTUM|URINE/);assert.equal(r.spin,'No')}
});
test('volatile blood specimens remain original, unopened, unspun, and never get a transfer container',()=>{
 for(const code of ['910627','910650','910808']){const r=db.find(x=>x.testCode===code);assert.equal(r.transportContainer,r.drawContainer);assert.equal(r.spin,'No');assert.match(r.specialInstructions,/UN?OPEN|DO NOT open|do NOT open/i)}
});
test('multi-specimen stillbirth profile preserves sample identities and three temperature groups',()=>{
 const r=db.find(x=>x.testCode==='365200');assert.equal(r.additionalDrawRequirements.length,3);
 assert.equal(r.transportTemperature,'Refrigerated');
 assert.deepEqual([...r.additionalDrawRequirements.map(x=>x.specimenType)].sort(),['Platelet-Poor Plasma','Whole Blood','Whole Blood'].sort());
 assert.deepEqual([...r.additionalDrawRequirements.map(x=>x.transportTemperature)].sort(),['Frozen','Refrigerated','Refrigerated'].sort());
 assert.match(r.additionalDrawRequirements[0].specialInstructions,/double.spin/i);
 assert.equal(sandbox.LabDirectoryTat.directory['365200'][0],'2–3 days');
});
