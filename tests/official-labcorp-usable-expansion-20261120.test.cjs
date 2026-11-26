'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
const codes=['001875','008201','071538','115101','120','140','180232','183444','183469','183531',
 '190256','372','373','480566','481020','489200','489590','591','631596','738534','808417','504965','504980'];
const script='assets/js/labcorp/catalog/official-suitable-expansion-20261120.js';
const source=JSON.parse(read('audits/labcorp-candidate-source-review-20261120.json'));
const bySource=new Map(source.records.map(r=>[r.code,r]));
test('All new Labcorp routes match code-verified source, valid handling and published routine TAT',()=>{
 const original=codes.map((code,i)=>({id:'old-'+i,testCode:code,testName:'Old pending name',status:'pending'}));
 const blocked={id:'blocked-protected',testCode:'92717',testName:'Do not perform',status:'blocked'};
 const active={id:'active-protected',testCode:'001016',testName:'Existing active',status:'active'};
 const window={SEED_TESTS:[...original,blocked,active],LabDirectoryTat:{directory:{'001016':['Within 1 day',1,'Labcorp directory','']}}};
 vm.runInNewContext(read(script),{window},{filename:script,timeout:30000});
 assert.equal(window.SEED_TESTS.length,codes.length+2,'No duplicate/additional codes');
 assert.equal(window.SEED_TESTS.find(r=>r.testCode==='92717'),blocked,'Blocked test must not change');
 assert.equal(window.SEED_TESTS.find(r=>r.testCode==='001016'),active,'Existing active test must not change');
 assert.equal(window.LabDirectoryTat.directory['001016'][0],'Within 1 day');
 for(const code of codes){
  const record=window.SEED_TESTS.find(r=>r.testCode===code);
  const directory=bySource.get(code);
  assert(directory,'Missing official page '+code);
  assert(['pending','new'].includes(directory.previousStatus),'Only verified pending or newly indexed codes can be activated '+code);
  assert.equal(record.status,'active',code+' not active');
  assert.equal(record.id,original.find(x=>x.testCode===code).id,code+' lost stable id');
  assert.equal(record.source,directory.url,code+' wrong official source');
  assert(record.testName && record.specimenType && record.drawContainer && record.transportContainer,code+' missing collection instruction');
  assert(['Room Temperature','Refrigerated','Frozen'].includes(record.transportTemperature),code+' missing storage class');
  assert(!/streck|hair|nails|microscope slides|prepared smear/i.test(record.drawContainer+' '+record.transportContainer),code+' forbidden equipment');
  assert(!/verify official|not verified|do not collect/i.test(record.drawContainer+' '+record.transportContainer),code+' unverifiable collection');
  const tat=window.LabDirectoryTat.directory[code];
  assert(tat&&tat[0]&&tat[4]===directory.url,code+' lost official TAT/source');
  assert(directory.fields.resultTurnaroundTime?.match(/\d/),code+' missing source TAT');
 }
});
test('Cart and searchable catalog load all new Labcorp tests',()=>{
 const html=read('labcorp.html');
 assert(html.includes('src="'+script+'?'), 'Verified overlay not loaded');
 assert(html.indexOf('src="'+script+'?')<html.indexOf('src="labcorp-app.js?'),
  'Overlay must load before calculator');
 const index=JSON.parse(read('assets/search/labcorp-tests.json'));
 const indexed=new Set(index.tests.map(row=>row[0]));
 for(const code of codes) assert(indexed.has(code), code);
 for(const code of ['481020', '489200']) assert(index.collectionReviewCodes.includes(code), code);
});
