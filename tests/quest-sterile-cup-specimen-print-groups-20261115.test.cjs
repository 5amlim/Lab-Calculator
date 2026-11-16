'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const bundles=[
  'assets/js/quest-verified-fluid-chemistry-20261115.js',
  'assets/js/quest-feasible-specialty-20261115-batch2.js'
];

async function calculator(){
 const window={SEED_TESTS:[]};
 for(const bundle of bundles)vm.runInNewContext(read(bundle),{window},{filename:bundle});
 const codes=window.SEED_TESTS.map(item=>item.testCode);
 const document={
  getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},querySelector(){return null;}}),
  querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}
 };
 const src=read('assets/js/app.js');
 assert(src.includes('  init();\n  };'));
 vm.runInNewContext(src.replace('  init();\n  };',
  '  window.__audit={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,'+
  'buildSubmissionContents,buildDrawGroups,printCollectionGroups,printBagSpecimenBadge,'+
  'collectionSpecimenBadgeForItem,collectionSpecimenBadgeKindForItem,collectionMergeSubtypeForItem};\n  };'),
  {window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
   console:{warn(){},error(){}},setTimeout(){return 0;},clearTimeout(){}},
  {filename:'assets/js/app.js',timeout:30000});
 await Promise.resolve();
 assert(window.__audit);
 return {h:window.__audit,codes};
}
function plan(h,codes) {
 const selected=codes.map(code=>h.database.find(item=>item.testCode===code));
 assert(selected.every(Boolean),'missing Quest seed test');
 const expanded=h.expandedCollectionTests(selected),bags=h.buildTransportBagPlan(expanded);
 return {selected,bags,expanded,
  collection:h.buildCollectionPlan(expanded,bags),
  submitted:bags.flatMap(bag=>h.buildSubmissionContents(bag))};
}
const expected={
 'Stool':1,
 'CSF':3,
 'Pericardial Fluid':2,
 'Peritoneal Fluid':9,
 'Pleural Fluid':6,
 'Synovial Fluid':7
};

test('31 Quest tests print separate Sterile cup cards, specimen badges and matching counts',async()=>{
 const {h,codes}=await calculator();
 assert.equal(codes.length,31);
 assert.equal(new Set(codes).size,31);
 const p=plan(h,codes);
 assert.equal(p.collection.length,6);
 assert.equal(p.collection.reduce((n,item)=>n+item.count,0),28);
 assert.equal(p.submitted.reduce((n,item)=>n+item.count,0),28);
 const actual=Object.fromEntries(p.collection.map(item=>[h.collectionSpecimenBadgeForItem(item),item.count]));
 assert.deepEqual(actual,expected);
 assert(p.collection.every(item=>item.label==='Sterile cup'&&item.className==='tube-urine-cup'));
 assert(p.collection.every(item=>new Set(item.tests.map(t=>t.specimenType)).size===1));
 const html=h.printCollectionGroups(p.collection,[]);
 assert.equal((html.match(/class="print-collection-card/g)||[]).length,6);
 for(const specimen of Object.keys(expected)) {
   assert(html.includes('>'+specimen+'</span>'),'specimen badge missing: '+specimen);
 }
 assert.doesNotMatch(html,/Separate labeled Sterile cup for each specimen source/i);
});

test('On-screen draw plan also splits the Sterile cup stock by actual specimen',async()=>{
 const {h,codes}=await calculator();
 const p=plan(h,codes);
 const groups=h.buildDrawGroups(p.expanded).filter(group=>group.container==='Sterile cup');
 assert.equal(groups.length,6);
 for(const group of groups)assert.equal(group.specimenTypes.size,1);
 assert.equal(groups.reduce((sum,group)=>
   sum+h.buildCollectionPlan(group.tests,h.buildTransportBagPlan(group.tests))
     .reduce((n,item)=>n+item.count,0),0),28);
});

test('Frozen bag cards use the same specimen badge labels, never Verify Specimen for known body fluids',async()=>{
 const {h,codes}=await calculator();
 const p=plan(h,codes);
 assert.equal(p.submitted.length,6);
 for(const item of p.submitted){
  assert.equal(item.label,'Sterile cup');
  const label=item.tests[0].specimenType;
  const badge=h.printBagSpecimenBadge(item);
  assert(badge.includes('>'+label+'</span>'),'submitted label mismatch: '+label);
  assert.doesNotMatch(badge,/Verify Specimen/i);
 }
 const style=read('assets/css/styles.css');
 for(const suffix of ['stool','fluid','csf','sputum']){
  assert(style.includes('.print-collection-specimen-badge.specimen-'+suffix));
  assert(style.includes('.print-collect-chip-specimen.specimen-'+suffix));
 }
});

test('Four watery stool assays still share one original cup and no transfer instructions',async()=>{
 const {h}=await calculator();
 const p=plan(h,['14435','14436','14437','8833']);
 assert.equal(p.collection.length,1);
 assert.equal(p.collection[0].count,1);
 assert.equal(p.submitted.length,1);
 assert.equal(p.submitted[0].count,1);
 assert.equal(h.collectionSpecimenBadgeForItem(p.collection[0]),'Stool');
 assert.match(p.collection[0].detail,/submit the original container/i);
 assert.doesNotMatch(p.collection[0].detail,/transfer to each required transport/i);
});

test('Quest HTML uses updated JavaScript and CSS versions',()=>{
 const html=read('index.html');
 assert.match(html,/assets\/js\/app\.js\?v=13\.15/);
 assert.match(html,/assets\/css\/styles\.css\?v=12\.57/);
});
