'use strict';
const assert=require('node:assert/strict');
const test=require('node:test');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'labcorp.html'),'utf8');
const code=fs.readFileSync(path.join(root,'assets/js/labcorp/catalog/verified-tail-135-20261121.js'),'utf8');
const previous=fs.readFileSync(path.join(root,'assets/js/labcorp/catalog/verified-final-remaining-20261121.js'),'utf8');
const app=fs.readFileSync(path.join(root,'labcorp-app.js'),'utf8');
const scripts=[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(x=>x[1]);
assert(scripts.some(x=>x.includes('verified-tail-135-20261121.js')));
assert(scripts.findIndex(x=>x.includes('verified-tail-135-20261121.js'))<scripts.findIndex(x=>x.includes('labcorp-app.js')));
const db=['186197','340337'].map(testCode=>({id:'old-'+testCode,testCode,status:'pending'}));
const sandbox={SEED_TESTS:db};sandbox.window=sandbox;vm.runInNewContext(code,sandbox,{timeout:10000});
test('all new active tests have valid container, label, source and temperature fields',()=>{
  for(const r of db){assert.equal(r.status,'active');assert.equal(r.collectionCount,1);assert.equal(r.submissionCount,1);assert(r.drawContainer&&r.transportContainer&&r.transportTemperature&&r.preferredVolume&&r.specialLabeling);assert(r.clinicalCategories.length&&r.searchAliases.length);assert.match(r.source,/^https:/)}
});
test('NP swab stays in original VTM, and unpreserved HVA has its own 24-hour collection',()=>{
 const x=db.find(x=>x.testCode==='186197'),y=db.find(x=>x.testCode==='340337');assert.equal(x.drawContainer,x.transportContainer);assert.equal(x.transportTemperature,'Refrigerated');assert.equal(x.spin,'No');assert.match(x.specialLabeling,/NASOPHARYNGEAL/);
 assert.equal(y.specimenType,'24-Hour Urine');assert.equal(y.transportContainer,'Sterile cup');assert.match(y.specialInstructions,/without|unpreserved/i);assert.match(y.specialLabeling,/TOTAL VOLUME/);
});
test('beta2 urine specifically warns of 6-8 pH handling',()=>{assert.match(previous,/pH 6–8/);assert.match(previous,/do not submit until the receiving laboratory/)});
test('Do Not Perform map declared before reference and covers ALA combo codes',()=>{
 const d=app.indexOf('const REVIEWED_DNP_GROUPS_20261121'),g=app.indexOf('REVIEWED_DNP_20261121.get('),s=app.indexOf('const seedDatabase');assert(d>=0&&d<g&&d<s);assert(app.includes('codes: "332425"'));assert(app.includes('codes: "374357"'));
});
test('complete audit has all 135 unique remaining candidates',()=>{
 const csv=fs.readFileSync(path.join(root,'audits/labcorp-135-disposition-20261121.csv'),'utf8');const ids=csv.trim().split(/\n/).slice(1).map(x=>x.split(',')[0]);assert.equal(ids.length,135);assert.equal(new Set(ids).size,135);
});
