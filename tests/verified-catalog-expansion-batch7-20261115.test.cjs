'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const QUEST_BUNDLE='assets/js/quest-verified-expansion-20261115-batch7.js';
const LABCORP_BUNDLE='assets/js/labcorp/catalog/verified-expansion-20261115-batch7.js';
const QUEST_CODES=['1687','39218','93795','17603','17604'];
const LABCORP_CODES=['117330','117180','117230','117169','140715','164535'];
function seed(lab){
  const window={SEED_TESTS:[]};
  const files=lab==='Quest'?[QUEST_BUNDLE]:['labcorp-missing-tests-20261115.js',LABCORP_BUNDLE];
  for(const file of files)vm.runInNewContext(read(file),{window,console},{filename:file,timeout:30000});
  return window;
}
function planner(lab){
 const window=seed(lab);
 const document={getElementById:id=>({id,value:'',checked:false,options:[],
   classList:{add(){},remove(){},toggle(){}},addEventListener(){},
   setAttribute(){},querySelector(){return null;}}),
   querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}};
 const file=lab==='Quest'?'assets/js/app.js':'labcorp-app.js',src=read(file);
 assert(src.includes('  init();'),file+' calculator hook missing');
 const replacement=src.replace('  init();',
  '  window.__batch7={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};');
 vm.runInNewContext(replacement,{window,document,
  localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
  setTimeout(){return 0;},clearTimeout(){},console:{warn(){},error(){}}},
  {filename:file,timeout:30000});
 const api=window.__batch7;
 assert(api,lab+' API unavailable');
 return codes=>{
  const selected=codes.map(code=>api.database.find(x=>x.testCode===code));
  selected.forEach((x,i)=>assert(x&&x.status==='active',lab+' '+codes[i]+' is not cart-ready'));
  const expanded=api.expandedCollectionTests(selected),bags=api.buildTransportBagPlan(expanded);
  return {selected,expanded,bags,draw:api.buildCollectionPlan(expanded,bags),
   submit:bags.flatMap(b=>api.buildSubmissionContents(b))};
 };
}
test('Batch 7 publishes only newly added Quest codes and activates six pending LabCorp codes',()=>{
 const quest=seed('Quest').SEED_TESTS,labcorp=seed('LabCorp').SEED_TESTS;
 assert.deepEqual(Array.from(quest,x=>x.testCode),QUEST_CODES);
 for(const code of LABCORP_CODES){
  const x=labcorp.find(t=>t.testCode===code);
  assert.equal(x?.status,'active',code);
 }
 assert.equal(labcorp.filter(x=>x.status==='active').length,91);
 assert.equal(labcorp.filter(x=>x.status==='pending').length,256);
 for(const item of quest) {
  assert.equal(item.status,'active');
  assert.match(item.source,/testdirectory\.questdiagnostics\.com/);
  assert.equal(item.drawContainer,'Sterile cup');
  assert.equal(item.transportContainer,'Sterile cup');
 }
});
test('Quest keeps differently sourced sterile cups separate and respects temperature',()=>{
 const plan=planner('Quest');
 const combo=plan(QUEST_CODES);
 assert.deepEqual(Array.from(combo.bags,x=>x.label),['Room-temperature bag','Refrigerated bag','Frozen bag']);
 assert.equal(combo.draw.reduce((n,x)=>n+x.count,0),5);
 assert(combo.draw.some(x=>x.tests.every(t=>t.specimenType==='JP Drainage')));
 assert(combo.draw.some(x=>x.tests.every(t=>t.specimenType==='Pancreatic Fluid')));
 assert(combo.draw.some(x=>x.tests.every(t=>t.specimenType==='CSF')));
 const frozen=combo.bags.find(x=>x.label==='Frozen bag');
 const submitted=combo.submit.filter(x=>['JP Drainage','Pancreatic Fluid'].includes(x.tests?.[0]?.specimenType));
 assert.equal(submitted.length,2);
 assert(submitted.every(x=>x.label==='Sterile cup'&&x.count===1));
 assert(frozen);
});
test('LabCorp keeps separate frozen citrated plasma aliquots and APS serum',()=>{
 const plan=planner('LabCorp');
 const combo=plan(LABCORP_CODES);
 assert.equal(combo.bags.length,2);
 assert.equal(combo.draw.find(x=>x.className==='tube-blue')?.count,8);
 assert.equal(combo.draw.find(x=>x.className==='tube-sst')?.count,2);
 const frozen=combo.submit.filter(x=>x.className==='tube-frozen-purple');
 assert.equal(frozen.length,6);
 assert(frozen.every(x=>x.count===1));
 assert(combo.submit.some(x=>x.className==='tube-sst'));
});
test('Catalog scripts load before calculators and selector fallback uses cart-ready counts',()=>{
 assert(read('index.html').includes('src="'+QUEST_BUNDLE+'?v=1"'));
 assert(read('labcorp.html').includes('src="'+LABCORP_BUNDLE+'?v=1"'));
  assert(read('assets/js/lab-select.js').includes('quest:' + JSON.parse(read('assets/search/quest-tests.json')).tests.length));
 for(const file of ['index.html','labcorp.html','cedars.html'])
  assert(read(file).match(/assets\/js\/lab-select\.js\?v=[\w.-]+/));
});
