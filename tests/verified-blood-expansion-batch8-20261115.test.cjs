'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('./helpers/browser-vm.cjs');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const Q='assets/js/quest-verified-blood-expansion-20261115-batch8.js';
const L='assets/js/labcorp/catalog/verified-blood-expansion-20261115-batch8.js';
const QCODES=['19651','19903','19671'];
const LCODES=['117170','117245','117365','117904','511162','800599','086015','086075','086302','086304','086250','086233','086300'];
function catalog(lab){
 const window={SEED_TESTS:[]};
 const paths=lab==='Quest'?[Q]:['labcorp-missing-tests-20261115.js',L];
 for(const file of paths)vm.runInNewContext(read(file),{window,console},{filename:file,timeout:15000});
 return window;
}
async function planner(lab){
 const window=catalog(lab);
 const document={getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},
 addEventListener(){},setAttribute(){},querySelector(){return null;}}),
 querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}};
 const file=lab==='Quest'?'assets/js/app.js':'labcorp-app.js',src=read(file);
 const hook=lab==='Quest'?'  init();\n  };':'  init();';
 assert(src.includes(hook),'Missing app hook');
 const inject=lab==='Quest'
  ?'  window.__batch8={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};\n  };'
  :'  window.__batch8={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};';
 vm.runInNewContext(src.replace(hook,inject),{window,document,
   localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
   setTimeout(){return 0;},clearTimeout(){},console:{warn(){},error(){}}},{filename:file,timeout:30000});
 await Promise.resolve();await Promise.resolve();
 const api=window.__batch8;
 assert(api,'Calculator API unavailable');
 return codes=>{
  const selected=codes.map(code=>api.database.find(x=>x.testCode===code));
  selected.forEach((x,i)=>assert(x&&x.status==='active',lab+' inactive/missing '+codes[i]));
  const expanded=api.expandedCollectionTests(selected),bags=api.buildTransportBagPlan(expanded);
  const draw=api.buildCollectionPlan(expanded,bags),submitted=bags.flatMap(b=>api.buildSubmissionContents(b));
  return {selected,expanded,bags,draw,submitted};
 };
}
test('Batch 8 activates precisely three Quest and 13 Labcorp blood codes with supported collection',()=>{
 const quest=catalog('Quest').SEED_TESTS,labcorp=catalog('Labcorp').SEED_TESTS;
 assert.deepEqual(Array.from(quest,x=>x.testCode),QCODES);
 assert.equal(quest.length,3);
 assert.equal(labcorp.length,347);
 assert.equal(labcorp.filter(t=>t.status==='active').length,98);
 for(const code of LCODES){
  const x=labcorp.find(t=>t.testCode===code);
  assert(x&&x.status==='active','Labcorp '+code);
  assert.match(x.source,/labcorp\.com\/tests\//);
 }
 for(const x of quest){
  assert.match(x.source,/testdirectory\.questdiagnostics\.com\/test\/test-detail\//);
  assert.equal(x.transportContainer,'Plasma Transport Tube');
  assert(!/slides|smears|acid-preserved|InSure/i.test(x.drawContainer+' '+x.transportContainer));
 }
});
test('Quest multi-aliquot coagulation panels preserve separate frozen vials and source temperatures',async()=>{
 const plan=await planner('Quest');
 for(const [code,amount] of [['19651',3],['19903',4]]){
  const p=plan([code]);
  assert.equal(p.draw.find(x=>x.className==='tube-blue')?.count,amount,code);
  assert.equal(p.submitted.reduce((n,x)=>n+x.count,0),amount,code);
  assert.equal(p.bags.length,1);
  assert.equal(p.bags[0].label,'Frozen bag');
  assert(p.submitted.every(x=>x.className!=='tube-frozen-purple'),'Quest must not use Labcorp purple-cap icon');
 }
 const mixed=plan(['19671']);
 assert.deepEqual(Array.from(mixed.bags,b=>b.label),['Room-temperature bag','Frozen bag']);
 assert.equal(mixed.draw.find(x=>x.className==='tube-blue')?.count,4);
 assert(mixed.draw.some(x=>x.className==='tube-red'));
 assert(mixed.draw.some(x=>x.className==='tube-lavender'));
 assert(mixed.submitted.some(x=>x.label==='Lavender EDTA'));
 assert(mixed.submitted.some(x=>x.label==='Transport Tube'&&x.className.includes('green-top')));
 assert(mixed.submitted.some(x=>x.count === 4 && x.tests.every(test => /plasma/i.test(test.specimenType))));
});
test('Labcorp DNA whole blood stays unspun, and all frozen coag vials remain separate',async()=>{
 const plan=await planner('Labcorp'),dna=plan(['511162']);
 assert.equal(dna.draw.find(x=>x.className==='tube-lavender')?.count,2);
 assert.equal(dna.submitted.find(x=>x.className==='tube-lavender')?.count,2);
 assert.deepEqual(Array.from(dna.bags,x=>x.label),['Room-temperature bag']);
 const coag=plan(LCODES.filter(x=>x!=='511162'));
 assert.equal(coag.bags.length,1);
 assert.equal(coag.bags[0].label,'Frozen bag');
 assert.equal(coag.submitted.reduce((n,x)=>n+x.count,0),13,
  'The multimer panel needs two distinct vials, other assays one each');
 assert(coag.submitted.every(x=>x.className==='tube-frozen-purple'));
 const two=plan(['117245']);
 assert.equal(two.draw[0].count,2);
 assert.equal(two.submitted[0].count,2);
});
test('New scripts load before the app, selector fallback only counts cart-ready tests',()=>{
 const quest=read('index.html'),labcorp=read('labcorp.html');
 assert(quest.includes('src="'+Q+'?v=1"'));
 assert(labcorp.includes('src="'+L+'?v=1"'));
 assert(quest.indexOf(Q)<quest.indexOf('assets/js/app.js?v='));
 assert(labcorp.indexOf(L)<labcorp.indexOf('labcorp-app.js?v='));
  assert(read('assets/js/lab-select.js').includes('quest:' + JSON.parse(read('assets/search/quest-tests.json')).tests.length));
 for(const page of ['index.html','labcorp.html','cedars.html'])
  assert(read(page).match(/assets\/js\/lab-select\.js\?v=[\w.-]+/));
});
