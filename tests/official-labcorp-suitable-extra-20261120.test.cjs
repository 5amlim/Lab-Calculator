'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const read=x=>fs.readFileSync(path.resolve(__dirname,'..',x),'utf8');
const codes=['008136','008482','188243','086884','140046','140111','085506','086868','180026','186015','186031'];
const script='assets/js/labcorp/catalog/official-suitable-extra-20261120.js';
const source=JSON.parse(read('audits/labcorp-candidate-source-review-20261120.json'));
const by=new Map(source.records.map(x=>[x.code,x]));
test('Extra Labcorp routes use published source, full handling and exact TAT; never change blocked tests',()=>{
 const rows=codes.map((code,i)=>({testCode:code,id:'prior-'+i,status:code==='180026'?'reference':'pending'}));
 const blocked={testCode:'92717',status:'blocked',testName:'Do not perform'};
 const active={testCode:'005595',status:'active',testName:'Existing active'};
 const window={SEED_TESTS:[...rows,blocked,active],LabDirectoryTat:{directory:{'005595':['3–4 days',4,'Labcorp directory']}}};
 vm.runInNewContext(read(script),{window},{filename:script,timeout:30000});
 assert.equal(window.SEED_TESTS.length,codes.length+2);
 assert.equal(window.SEED_TESTS.find(x=>x.testCode==='92717'),blocked);
 assert.equal(window.SEED_TESTS.find(x=>x.testCode==='005595'),active);
 for(const code of codes){
  const record=window.SEED_TESTS.find(x=>x.testCode===code);
  const original=by.get(code);
  assert(original&&original.url,'Official page missing '+code);
  assert.equal(record.status,'active',code);
  assert(record.id.startsWith('prior-'),'Must preserve previous record id for '+code);
  assert.equal(record.source,original.url,'Source mismatch '+code);
  assert.equal(record.specialLabeling,'','No duplicate label instruction: '+code);
  assert(record.specimenType&&record.drawContainer&&record.transportContainer,code+' missing container data');
  assert(['Room Temperature','Refrigerated','Frozen'].includes(record.transportTemperature),code+' missing handling');
  assert(!/streck|microscope slides|hair|nail|prepared smear|preservative urine/i.test(record.drawContainer+' '+record.transportContainer),code+' unsupported supply');
  assert(!/verify official|not verified|do not collect/i.test(record.drawContainer+' '+record.transportContainer),code+' unverified container');
  assert.equal(window.LabDirectoryTat.directory[code][4],original.url,code+' missing official TAT');
  assert(window.LabDirectoryTat.directory[code][0]);
 }
});
test('All 11 new codes are published and H5 NY restriction is visible',()=>{
 const html=read('labcorp.html');
 assert(html.includes('src="'+script+'?'));
 assert(html.indexOf('src="'+script+'?')<html.indexOf('src="labcorp-app.js?'));
 const idx=new Set(JSON.parse(read('assets/search/labcorp-tests.json')).tests.map(x=>x[0]));
 for(const code of codes)assert(idx.has(code),code+' not in active search index');
 const flags=read('assets/js/market-restrictions.js');
 assert(flags.includes("'140111': { label: 'Unavailable in NY'"),'NY H5 restriction not flagged');
});
