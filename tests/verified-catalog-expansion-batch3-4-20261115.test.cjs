'use strict';
const {test}=require('node:test'), assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('./helpers/browser-vm.cjs');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const Q='assets/js/quest-official-expansion-20261115-batch3.js';
const L='assets/js/labcorp/catalog/verified-expansion-20261115-batch4.js';
const QC=['1744','11233','17307','91705','907'];
const LC=['520149','520059','520134','520194','520293','520298','006981','409500','505500','505575','520555','140715','005200'];
function seed(lab){
 const w={SEED_TESTS:[]};
 if(lab==='labcorp')vm.runInNewContext(read('labcorp-missing-tests-20261115.js'),{window:w,console});
 vm.runInNewContext(read(lab==='quest'?Q:L),{window:w,console});
 return w;
}
async function calculator(lab,mode='gold'){
 const w=seed(lab),doc={
  getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},querySelector(){return null;}}),
  querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}
 },store={getItem:key=>key.endsWith('.sstMode.v1')?mode:null,setItem(){},removeItem(){}};
 const app=read(lab==='quest'?'assets/js/app.js':'labcorp-app.js');
 assert(app.includes('  init();'));
 vm.runInNewContext(app.replace('  init();','  window.__audit={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};'),{
  window:w,document:doc,localStorage:store,setTimeout(){},clearTimeout(){},console:{warn(){},error(){}}
 },{timeout:30000});
 await Promise.resolve();
 assert(w.__audit);
 const h=w.__audit;
 return codes=>{
  const tests=codes.map(code=>h.database.find(r=>r.testCode===code));
  assert(tests.every(t=>t&&t.status==='active'));
  const expanded=h.expandedCollectionTests(tests),bags=h.buildTransportBagPlan(expanded);
  return {collection:h.buildCollectionPlan(expanded,bags),submitted:bags.flatMap(b=>h.buildSubmissionContents(b)),bags};
 };
}
test('new Quest and Labcorp bundles have only reviewed active codes and load before their app',()=>{
 for(const [lab,file,page,app,codes] of [['quest',Q,'index.html','assets/js/app.js',QC],['labcorp',L,'labcorp.html','labcorp-app.js',LC]]){
  const html=read(page),w=seed(lab),list=w.SEED_TESTS;
  assert(html.includes('src="'+file+'?v=1"'));
  assert(html.indexOf('src="'+file+'?v=1"')<html.indexOf('src="'+app+'?'));
  assert.equal(new Set(list.map(x=>x.testCode)).size,list.length);
  for(const code of codes){
   const r=list.find(x=>x.testCode===code);
   assert(r && r.status==='active');
   for(const k of ['specimenType','drawContainer','transportContainer','preferredVolume','minimumVolume','transportTemperature','source'])
    assert(r[k],code+' missing '+k);
   assert(r.source.includes(lab==='quest'?'testdirectory.questdiagnostics.com':'labcorp.com/tests/'));
  }
 }
 const list=seed('labcorp').SEED_TESTS;
 assert.equal(list.length,347);assert.equal(list.filter(x=>x.status==='active').length,98);
 for(const code of ['505770','160721','520340'])
  assert.equal(list.find(x=>x.testCode===code)?.status,'pending',code+' must stay unavailable');
});
test('Quest compatible random-urine tests share one original sterile cup',async()=>{
 const plan=await calculator('quest');
 const a=plan(['1744','11233']);
 assert.equal(a.collection.filter(x=>x.label==='Sterile cup').reduce((n,x)=>n+x.count,0),1);
 assert.equal(a.submitted.reduce((n,x)=>n+x.count,0),1);
});
test('Quest 24-hour urine and multi-specimen blood panels keep physical requirements',async()=>{
 const plan=await calculator('quest');
 const u=plan(['907']);assert.equal(u.collection.length,1);
 assert(u.collection[0].label.includes('24-Hour Urine Container'));
 assert.equal(u.submitted.length,1);assert.equal(u.submitted[0].label,'Sterile cup');
 assert.equal(u.submitted[0].count,1);
 const a=plan(['17307']);
 assert(a.collection.some(x=>x.className==='tube-sst'));
 assert(a.collection.some(x=>x.className==='tube-lavender'&&x.count>=2));
 assert(a.submitted.some(x=>x.label==='Transport Tube'));
 const h=plan(['91705']);
 assert.equal(h.collection.find(x=>x.className==='tube-sst').count,2);
 assert.equal(h.bags.length,2);
 assert.equal(h.submitted.filter(x=>x.className==='tube-sst').reduce((n,x)=>n+x.count,0),2);
});
test('Labcorp serum yields count Gold vs Tiger correctly, frozen purple vials stay separate',async()=>{
 const gold=await calculator('labcorp','gold'),tiger=await calculator('labcorp','tiger');
 for(const c of ['520149','520194','520293','520298','006981']){
  assert.equal(gold([c]).collection.find(x=>x.className==='tube-sst').count,1,c+' Gold');
  assert.equal(tiger([c]).collection.find(x=>x.className==='tube-sst').count,1,c+' Tiger');
 }
 for(const plan of [gold,tiger]){
  assert.equal(plan(['520555']).collection.find(x=>x.className==='tube-sst').count,2);
  const f=plan(['520555','140715','005200']);
  assert.equal(f.submitted.length,3);
  assert(f.submitted.every(x=>x.className==='tube-frozen-purple'));
  assert(f.collection.some(x=>x.className==='tube-blue'));
  assert(plan(['505500']).submitted.some(x=>x.className==='tube-sst'));
 }
});
