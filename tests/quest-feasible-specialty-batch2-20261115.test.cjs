'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('./helpers/browser-vm.cjs');
const read=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');
const bundle='assets/js/quest-feasible-specialty-20261115-batch2.js';
const expected=['17646','4404','4403','17696','17697','17698','17555','17410',
  '14435','14436','14437','8833','16186'];

function records(){
 const window={SEED_TESTS:[]};
 vm.runInNewContext(read(bundle),{window},{filename:bundle});
 return window.SEED_TESTS;
}
async function calculator(){
 const window={SEED_TESTS:[]};
 vm.runInNewContext(read(bundle),{window},{filename:bundle});
 const document={
  getElementById:id=>({id,value:'',checked:false,options:[],
    classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},querySelector(){return null;}}),
  querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}
 };
 const app=read('assets/js/app.js');
 assert(app.includes('  init();\n  };'));
 vm.runInNewContext(app.replace('  init();\n  };',
  '  window.__audit={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents,canonicalCollectionContainer};\n  };'),
  {window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
   setTimeout(){return 0;},clearTimeout(){},console:{warn(){},error(){}}},
  {filename:'assets/js/app.js',timeout:30000});
 await Promise.resolve();
 assert(window.__audit);
 return window.__audit;
}
function calculate(api,codes){
 const tests=codes.map(code=>api.database.find(x=>x.testCode===code));
 assert(tests.every(Boolean));
 const expanded=api.expandedCollectionTests(tests),bags=api.buildTransportBagPlan(expanded);
 return {tests,bags,collect:api.buildCollectionPlan(expanded,bags),
  submit:bags.flatMap(b=>api.buildSubmissionContents(b))};
}
test('13 new Quest codes are active, use standard Sterile cup and avoid unsupported supplies',()=>{
 const values=records();
 assert.equal(values.length,13);
 assert.equal(new Set(values.map(x=>x.testCode)).size,13);
 assert.deepEqual(values.map(x=>x.testCode).join(','),expected.join(','));
 for(const x of values){
  assert.equal(x.status,'active');
  assert.equal(x.drawContainer,'Sterile cup');
  assert.equal(x.transportContainer,'Sterile cup');
  assert.equal(x.transportTemperature,'Frozen');
  assert.equal(x.spin,'No');
  assert(x.testName&&x.preferredVolume&&x.minimumVolume&&x.source,x.testCode);
  assert.doesNotMatch(x.drawContainer+' '+x.transportContainer,/slide|6N HCl|acid-preserv|Aptima|InSure/i);
  assert.match(x.specialInstructions,/no slide preparation or separate transport tube/i);
 }
});
test('Synovial tests use a single named stock type but retain 3 distinct specimens',async()=>{
 const api=await calculator();
 const p=calculate(api,['17646','4404','4403']);
 assert.equal(p.collect.length,1);
 assert.equal(p.collect[0].label,'Sterile cup');
 assert.equal(p.collect[0].count,3);
 assert.equal(p.submit.length,1);
 assert.equal(p.submit[0].label,'Sterile cup');
 assert.equal(p.submit[0].count,3);
 assert.equal(p.submit[0].originalTube,true);
});
test('Three frozen adenosine deaminase fluids use labeled separate original cups',async()=>{
 const api=await calculator();
 const p=calculate(api,['17696','17697','17698']);
 assert.equal(p.collect.reduce((n,x)=>n+x.count,0),3);
 assert.equal(p.submit.reduce((n,x)=>n+x.count,0),3);
 assert.equal(p.submit.length,3,'do not mix CSF, pleural and peritoneal sources');
 assert(p.submit.every(x=>x.label==='Sterile cup'&&x.originalTube===true));
 assert.match(p.tests.find(x=>x.testCode==='17698').specialInstructions,/Do not centrifuge CSF/);
});
test('Four compatible watery fecal assays share one sufficiently filled original Sterile cup',async()=>{
 const api=await calculator();
 const p=calculate(api,['14435','14436','14437','8833']);
 assert.equal(p.collect.reduce((n,x)=>n+x.count,0),1);
 assert.equal(p.submit.reduce((n,x)=>n+x.count,0),1,
  'single shared stool cup should not duplicate into 4 sent cups');
 assert.equal(p.submit[0].label,'Sterile cup');
 assert.equal(p.submit[0].originalTube,true);
 for(const x of p.tests){
  assert.match(x.specialInstructions,/ONLY watery liquid stool/i);
  assert.match(x.specialInstructions,/verify total specimen volume/i);
 }
});
test('All 13 routes reconcile the physical count of collection and submission cups',async()=>{
 const api=await calculator(),p=calculate(api,expected);
 assert.equal(p.collect.reduce((n,x)=>n+x.count,0),10);
 assert.equal(p.submit.reduce((n,x)=>n+x.count,0),10);
 assert(p.submit.every(x=>x.label==='Sterile cup'&&x.className==='tube-urine-cup'));
});
test('New Quest file loads before reference-only directory and dropdown falls back to 2805',()=>{
 const html=read('index.html');
 assert(html.indexOf(bundle)>0&&html.indexOf(bundle)<html.indexOf('quest-missing-directory-loader'));
 assert.match(html,/assets\/js\/app\.js\?v=[\w.-]+/);
  assert(read('assets/js/lab-select.js').includes('quest:' + JSON.parse(read('assets/search/quest-tests.json')).tests.length));
});
