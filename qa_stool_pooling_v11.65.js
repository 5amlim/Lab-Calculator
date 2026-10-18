/** Stool source pooling and LABEL regression tests for v11.65. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
function load(dir) {
 const dummy={value:'',classList:{add(){},remove(){},toggle(){}},addEventListener(){},options:[]};
 const ctx=vm.createContext({window:{},document:{getElementById:()=>dummy,querySelectorAll:()=>[]},
  localStorage:{getItem(){return null},setItem(){},removeItem(){}},console,setTimeout,clearTimeout,Intl,Date,Map,Set,Object,Array,Math,Number,String,Boolean,RegExp,JSON});
 vm.runInContext(fs.readFileSync(path.join(dir,'data.js'),'utf8'),ctx);
 let app=fs.readFileSync(path.join(dir,'app.js'),'utf8').replace(/^  init\(\);/m, '  // skipped init for QA')
  .replace(/\}\)\(\);\s*$/,`  globalThis.__qa = {database,seedDatabase,buildCollectionPlan,buildTransportBagPlan,buildSubmissionContents,printLabelingNotes,expandedCollectionTests,printCollectionGroups,collectionSpecimenGroupForItem,isShareableStoolSourceTest: typeof isShareableStoolSourceTest === "function" ? isShareableStoolSourceTest : () => false};\n})();`);
 vm.runInContext(app,ctx);
 return ctx.__qa;
}
const current=load(__dirname), before=load(path.join(__dirname,'..','work1164'));
const db=current.database;const stool=db.filter(x=>x.status==='active' && /^stool$/i.test(x.specimenType));
let checks=0;const eq=(a,b,m)=>{assert.deepStrictEqual(a,b,m);checks++},ok=(a,m)=>{assert.ok(a,m);checks++};
const get=(code)=>{const t=db.find(x=>x.testCode===String(code));assert(t,`missing ${code}`);return t};
const collect=(api,tests)=>api.buildCollectionPlan(tests,api.buildTransportBagPlan(tests));
const submit=(api,tests)=>api.buildTransportBagPlan(tests).flatMap(b=>api.buildSubmissionContents(b).map(i=>({...i,bag:b.label})));
const cups=(api,tests,group='stool')=>collect(api,tests).filter(x=>x.className==='tube-urine-cup'&&api.collectionSpecimenGroupForItem(x)===group);
const signature=(api,tests)=>submit(api,tests).map(i=>[i.bag,i.label,i.count,i.tests.map(t=>t.testCode).join(',')]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
const shared=[get(11235),get(16796),get(14693),get(19098),get(34838)];
eq(cups(current,shared).length,1,'five compatible tests share one source cup');eq(cups(current,shared)[0].count,1,'one source cup');
eq(cups(before,shared)[0].count,5,'original count was five cups');
eq(signature(current,shared),signature(before,shared),'submission plan unchanged for five stool specimens');
ok(collect(current,shared)[0].detail.includes('submission / preservative'), 'shared collection detail clarifies separate final containers');
for(const t of stool) {
  const items=submit(current,[t]);ok(items.length>0,`${t.testCode} has submission`);
  for(const i of items) ok(/\bStool\b/.test(current.printLabelingNotes(i)),`${t.testCode} has Stool LABEL in ${i.label}`);
  eq(signature(current,[t]),signature(before,[t]),`${t.testCode} single test submission unchanged`);
  ok(collect(current,[t]).length>=1,`${t.testCode} initial collection`);
}
const fix=[get(681),get(1748),get(3930),get(39441)];
for(const t of fix) ok(current.isShareableStoolSourceTest(t),`${t.testCode} Total-Fix entry supports clean collection source`);
eq(cups(current,[...fix,...shared]).length,1,'mixed Total-Fix and standard stool test share clean source cup');
eq(cups(current,[...fix,...shared])[0].count,1,'one clean stool source across types');
ok(!collect(current,[...fix,...shared]).some(i=>i.className==='tube-total-fix'),'Total-Fix is downstream container, not extra starting sample');
ok(submit(current,[...fix,...shared]).some(i=>i.className==='tube-total-fix'),'Total-Fix transport still required');
eq(signature(current,[...fix,...shared]),signature(before,[...fix,...shared]),'all separate final containers maintained');
const special=get(3141);ok(!current.isShareableStoolSourceTest(special),'trace metal stool not pooled');
ok(collect(current,[special,...shared]).some(i=>i.className==='tube-trace-metal-container'),'special trace metal original container remains separate');
eq(signature(current,[special,...shared]),signature(before,[special,...shared]),'special final containers unchanged');
const rt={...get(11235),isStat:false}, st={...get(16796),isStat:true};
eq(cups(current,[rt,st]).length,1,'one stool cup across routine and STAT');
eq(cups(current,[rt,st])[0].count,1,'one source across priorities');
eq(current.buildTransportBagPlan([rt,st]).length,2,'two separate priority shipment bags');
eq(signature(current,[rt,st]),signature(before,[rt,st]),'STAT submission contents unchanged');
const urine=get(395);
eq(cups(current,[...shared,urine],'stool').length,1,'stool cup present');
eq(cups(current,[...shared,urine],'urine').length,1,'urine cup remains separate');
// Full directory: collection/source counts unchanged for every non-stool single test,
// and bag contents for all tests unchanged, including special collection types.
for(const t of db.filter(t=>t.status==='active')) {
 const one=[t];
 if(!/^stool$/i.test(t.specimenType)) {
  eq(JSON.stringify(collect(current,one).map(x=>[x.label,x.count])),JSON.stringify(collect(before,one).map(x=>[x.label,x.count])),`${t.testCode} nonstool collection unchanged`);
 }
 eq(JSON.stringify(signature(current,one)),JSON.stringify(signature(before,one)),`${t.testCode} final submission unchanged`);
}
for (let i=0;i<stool.length;i++) for(let j=i+1;j<stool.length;j++) {
 const pair=[stool[i],stool[j]];
 eq(JSON.stringify(signature(current,pair)),JSON.stringify(signature(before,pair)),`stool pair ${i},${j} unchanged submission`);
}
console.log('PASS',checks,'checks;',stool.length,'active stool entries; full active directory bag and nonstool collection parity; mixed-collection, special container, priority and LABEL verified.');
