'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
const file='assets/js/labcorp/catalog/verified-complex-collection-20261120.js';
const codes='117700 117853 164044 164049 140250 375002'.split(' ');
const labcorp=new Map(JSON.parse(read('audits/labcorp-candidate-source-review-20261120.json')).records.map(r=>[r.code,r]));
const cdos=new Map(JSON.parse(read('audits/labcorp-pending-cdos-source-review-20261120.json')).records.map(r=>[r.code,r]));
function inject(){
 const blocked={testCode:'92717',status:'blocked',testName:'Unperformable'};
 const active={testCode:'001016',status:'active',testName:'Existing validated'};
 const window={SEED_TESTS:[...codes.map((testCode,i)=>({testCode,status:'pending',id:'original-'+i})),blocked,active],LabDirectoryTat:{directory:{'001016':['Within 1 day',1,'Labcorp directory','','source']}}};
 vm.runInNewContext(read(file),{window},{filename:file,timeout:30000});
 return {window,blocked,active};
}
test('All six complex Labcorp orders retain their required collection components and verified TAT',()=>{
 const {window,blocked,active}=inject();
 assert.equal(window.SEED_TESTS.length,8);
 assert.strictEqual(window.SEED_TESTS.find(x=>x.testCode==='92717'),blocked);
 assert.strictEqual(window.SEED_TESTS.find(x=>x.testCode==='001016'),active);
 for(const [i,code] of codes.entries()){
  const src=labcorp.get(code)||cdos.get(code);
  assert(src,'Official source missing '+code);
  const row=window.SEED_TESTS.find(x=>x.testCode===code);
  assert(row,code+' not in cart');
  assert.equal(row.status,'active',code);
  assert.equal(row.id,'original-'+i,'Stable original ID overwritten: '+code);
  assert.equal(row.source,src.url,'Source code mismatch '+code);
  assert(row.testName&&row.specimenType&&row.drawContainer&&row.transportContainer,code+' missing specimen');
  assert(['Room Temperature','Refrigerated','Frozen'].includes(row.transportTemperature),code+' missing temperature');
  for(const extra of row.additionalDrawRequirements||[]){
   assert(extra.container&&extra.specimenType&&extra.transportContainer&&extra.transportTemperature,code+' incomplete additional draw');
   assert(extra.spin==='Yes'||extra.spin==='No',code+' ambiguous additional processing');
   assert(Number(extra.count)>0,'Missing required additional draw count');
  }
  if(code!=='375002'){
   const tat=window.LabDirectoryTat.directory[code];
   assert(tat?.[0]&&tat?.[4]===src.url,code+' missing verified TAT');
  } else {
   assert(!window.LabDirectoryTat.directory[code],'Do not invent absent routine TAT for '+code);
  }
 }
 assert.equal(window.SEED_TESTS.find(x=>x.testCode==='117700').submissionCount,3,'Three mandatory citrate aliquots');
 assert.equal(window.SEED_TESTS.find(x=>x.testCode==='117700').collectionCount,4,'Adequate citrate draws for 6 mL plasma');
 const dic=window.SEED_TESTS.find(x=>x.testCode==='117853');
 assert.equal(dic.collectionCount,2,'5 mL EDTA whole blood requires two standard lavender draws');
 assert(dic.additionalDrawRequirements.some(x=>x.spin==='Yes'&&x.submissionCount===2&&x.count===3),'DIC needs two frozen 2 mL citrate aliquots');
 const progression=window.SEED_TESTS.find(x=>x.testCode==='164049');
 assert.equal(progression.additionalDrawRequirements.length,2,'COVID progression profile needs separate citrate and EDTA');
 assert(progression.additionalDrawRequirements.some(x=>x.spin==='No'&&x.specimenType==='Whole Blood'),'EDTA whole blood must not be spun');
 assert.equal(window.SEED_TESTS.find(x=>x.testCode==='140250').submissionCount,2,'GM1 needs two frozen transport aliquots');
 assert.equal(window.SEED_TESTS.find(x=>x.testCode==='375002').specimenType,'24-hour Urine');
});
test('Complex Labcorp additions load into the calculator before the app',()=>{
 const html=read('labcorp.html');
 assert(html.includes('src="'+file+'?'));
 assert(html.indexOf('src="'+file+'?')<html.indexOf('src="labcorp-app.js?'));
});
