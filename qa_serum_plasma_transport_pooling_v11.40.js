/** v11.40: two compatible serum OR plasma tests per standard transport tube.
 * Run: node qa_serum_plasma_transport_pooling_v11.40.js
 */
const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
function calculator(dir,mode='gold') {
  const fake = {value:'', classList:{add(){},remove(){},toggle(){}},addEventListener(){},options:[]};
  const ctx = vm.createContext({window:{},document:{getElementById:()=>fake,querySelectorAll:()=>[]},
    localStorage:{getItem:key => key === 'labCollectionCalculator.sstMode.v1' ? mode : null,setItem(){},removeItem(){}},
    console,setTimeout,clearTimeout,Intl,Date,Map,Set,Object,Array,Math,Number,String,Boolean,RegExp,JSON});
  vm.runInContext(fs.readFileSync(path.join(dir,'data.js'),'utf8'),ctx);
  const src=fs.readFileSync(path.join(dir,'app.js'),'utf8').replace(/^  init\(\);/m,'  // disable UI initialization')
    .replace(/\}\)\(\);\s*$/,`  globalThis.__qa={database,buildSubmissionContents,buildTransportBagPlan,buildCollectionPlan,
      sstEstimateForTests,tigerSstEstimateForTests,transferContainerCountForTests,bagTransferSourceSummaries,
      printSubmissionItemDetail,splitSubmissionContainers,printNotesFooter,expandedCollectionTests};\n})();`);
  vm.runInContext(src,ctx);return ctx.__qa;
}
const currentDir=__dirname, baselineDir=path.join(__dirname,'..','Lab_Collection_Calculator_GitHub_v11.39');
const now=calculator(currentDir), before=calculator(baselineDir), nowTiger=calculator(currentDir,'tiger');
let checks=0, reductions=0;
function eq(a,b,msg){assert.strictEqual(a,b,msg);checks++;}
function ok(a,msg){assert.ok(a,msg);checks++;}
function specimen(n,overrides={}){return {id:`qa-pool-${n}`,testCode:`TEST${n}`,testName:`Transport pairing test ${n}`,
  specimenType:'Serum',drawContainer:'SST / Gold',transportContainer:'Serum Transport Tube',
  preferredVolume:'1 mL serum',minimumVolume:'0.5 mL',transportTemperature:'Refrigerated',spin:'Yes',
  specialInstructions:'',specialLabeling:'',isStat:false,...overrides};}
function bags(a,tests){return a.buildTransportBagPlan(tests);}
function contents(a,tests){return bags(a,tests).flatMap(b=>a.buildSubmissionContents(b));}
function submissionCount(a,tests){return contents(a,tests).reduce((total,item)=>total+item.count,0);}
function byType(a,tests,needle='Serum Transport Tube') {return contents(a,tests).filter(x=>x.label===needle).reduce((total,x)=>total+x.count,0);}
function sourceCount(a,tests){return a.buildCollectionPlan(tests,bags(a,tests)).filter(x=>x.className==='tube-sst').reduce((n,x)=>n+x.count,0);}

for(const n of [1,2,3,4,5,6,7,8,9]){
 const tests=Array.from({length:n},(_,i)=>specimen(i+1,{preferredVolume:'0.15 mL'}));
 eq(byType(now,tests),Math.ceil(n/2),`${n} compatible serum tests -> ceil(n/2) transport tubes`);
 eq(byType(before,tests),n,`${n} serum tests were previously counted individually`);
 eq(now.transferContainerCountForTests(tests),Math.ceil(n/2),`${n} tests summary reconciles`);
 const card=contents(now,tests).find(x=>x.label==='Serum Transport Tube');
 ok(card.pooledSerumPlasmaTransport,`${n}: pooled flag is set`);
 eq(card.tests.length,n,`${n}: all test references are retained`);
 if(n>1){const msg=now.printSubmissionItemDetail(card);ok(msg.includes('Tube 1:'),`${n}: print lists the assigned test codes`);}
 reductions += n-Math.ceil(n/2);
}
for(const n of [1,2,3,4,5]) {
 const tests=Array.from({length:n},(_,i)=>specimen(i+20,{specimenType:'Plasma',drawContainer:'Lavender EDTA',transportContainer:'Plasma Transport Tube',preferredVolume:'0.1 mL plasma'}));
 eq(byType(now,tests,'Plasma Transport Tube'),Math.ceil(n/2),`${n}: plasma 2 per tube`);
 eq(now.transferContainerCountForTests(tests),Math.ceil(n/2),`${n}: plasma summary reconciles`);
}
const a=specimen(1), b=specimen(2), c=specimen(3),d=specimen(4);
eq(submissionCount(now,[a,b,c,d]),2,'four compatible serum tests in two tubes');
eq(submissionCount(now,[a,b,{...c,specimenType:'Plasma',drawContainer:'Lavender EDTA',transportContainer:'Plasma Transport Tube'}]),2,'two serum plus one plasma requires separate specimen types');
eq(submissionCount(now,[a,{...b,drawContainer:'Red Top'}]),2,'different source tubes keep separate aliquots');
eq(submissionCount(now,[a,{...b,transportTemperature:'Frozen'}]),2,'temperature groups remain separate');
eq(submissionCount(now,[a,{...b,isStat:true}]),2,'STAT and routine remain separate');
eq(submissionCount(now,[a,{...b,spin:'No'}]),2,'processing workflow must match');
eq(submissionCount(now,[a,{...b,transportContainer:'Amber Serum Transport Tube — Protect From Light'}]),2,'amber stays independent');
eq(submissionCount(now,[a,{...b,transportContainer:'Acid-Washed / Metal-Free Serum Transport Tube'}]),2,'acid-washed stays independent');
eq(submissionCount(now,[a,{...b,transportContainer:'Serum cryovial'}]),2,'cryovials stay independent');
eq(submissionCount(now,[a,{...b,specimenType:'Platelet-poor plasma',drawContainer:'Light Blue Citrate',transportContainer:'Transport tube'}]),2,'specialty plasma stays independent');
eq(submissionCount(now,[a,{...b,specialInstructions:'Use a separate transport tube for this assay'}]),2,'dedicated single vial stays independent');
eq(submissionCount(now,[a,{...b,specialInstructions:'Do not pool specimens.'}]),2,'no pooling instruction wins');
eq(submissionCount(now,[a,{...b,specialInstructions:'Submit 2 separate transport tubes'}]),3,'explicit 2-tube test plus one other counts three');
eq(submissionCount(now,[a,{...b,submissionCount:3}]),4,'explicit structured 3-tube test preserves all tubes');
eq(submissionCount(now,[a,{...b,transportContainer:'SST / Gold (spun)'}]),2,'original SST submission not pooled into transport');
eq(submissionCount(now,[a,{...b,transportTemperature:'Room Temperature'}]),2,'room vs cold bag separated');
// A source collection tube count does not get changed by a transport aliquot packing shortcut.
for (const mode of ['gold','tiger']) {
 const newer=mode==='gold'?now:nowTiger;const old=calculator(baselineDir,mode);
 const tests=[specimen(1,{preferredVolume:'0.4 mL'}),specimen(2,{preferredVolume:'0.3 mL'}),specimen(3,{preferredVolume:'0.5 mL'})];
 eq(sourceCount(newer,tests),sourceCount(old,tests),`${mode} SST source collection remains unchanged`);
 eq(submissionCount(newer,tests),2,`${mode} submit two for three tests`);
 const summaries=bags(newer,tests).flatMap(b=>newer.bagTransferSourceSummaries(b));
 ok(summaries.some(t=>t.startsWith('2 serum tubes')),`${mode} summary must say 2, not 3`);
}
// Test the whole published directory one-by-one, and broad mixed orders, against baseline.
const active=now.database.filter(t=>t.status==='active');
for(const test of active) {
  const present=now.expandedCollectionTests([test]);
  const previous=before.expandedCollectionTests([test]);
  const currentBags=bags(now,present), baselineBags=bags(before,previous);
  eq(currentBags.length,baselineBags.length,`bag routing kept for ${test.testCode}`);
  eq(sourceCount(now,present),sourceCount(before,previous),`Gold source count same for ${test.testCode}`);
  eq(submissionCount(now,present),submissionCount(before,previous),`single-test submissions unchanged for ${test.testCode}`);
}
let seed=41921;const random=()=>((seed=Math.imul(1664525,seed)+1013904223|0)>>>0)/4294967296;
for(const size of [2,3,5,8,12]) for(let n=0;n<200;n++) {
 const selected=new Set();while(selected.size<size) selected.add(active[Math.floor(random()*active.length)]);
 const tests=[...selected];
 const curr=bags(now,tests),prior=bags(before,tests);
 eq(curr.length,prior.length,`${size}-test order bag count unchanged`);
 eq(sourceCount(now,tests),sourceCount(before,tests),`${size}-test order Gold collection count unchanged`);
 ok(submissionCount(now,tests)<=submissionCount(before,tests),`${size}-test order submission tubes cannot increase`);
}
// Regression: data and every app/layout artifact except the intentional JS/print.css is untouched.
for(const filename of ['data.js','styles.css','experience.css','index.html'])
 eq(fs.readFileSync(path.join(currentDir,filename),'utf8'),fs.readFileSync(path.join(baselineDir,filename),'utf8'),`${filename} unchanged`);
ok(now.printNotesFooter().includes('Up to two compatible serum tests OR two compatible plasma tests'),'print notes explain pairing and safeguards');
console.log(`PASS ${checks} checks. Transport tube reductions in 1-9 test fixtures: ${reductions}; active directory records checked: ${active.length}.`);
