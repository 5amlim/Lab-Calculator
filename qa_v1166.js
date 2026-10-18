const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
function load(dir){
 const dummy={value:'',classList:{add(){},remove(){},toggle(){}},addEventListener(){},options:[]};
 const ctx=vm.createContext({window:{},document:{getElementById:()=>dummy,querySelectorAll:()=>[]},localStorage:{getItem(){return null},setItem(){},removeItem(){}},console,setTimeout,clearTimeout,Intl,Date,Map,Set,Object,Array,Math,Number,String,Boolean,RegExp,JSON});
 vm.runInContext(fs.readFileSync(path.join(dir,'data.js'),'utf8'),ctx);
 const app=fs.readFileSync(path.join(dir,'app.js'),'utf8').replace(/^  init\(\);/m,'  // skip init')
  .replace(/\}\)\(\);\s*$/,`  globalThis.__qa = {database,buildCollectionPlan,buildTransportBagPlan,buildSubmissionContents,printLabelingNotes,collectionSpecimenGroupForTest,collectionSpecimenGroupForItem,canonicalCollectionContainer,isOriginalContainerSubmission,normalizeRecord};\n})();`);
 vm.runInContext(app,ctx); return ctx.__qa;
}
const base=load('/mnt/data/work1165'),newv=load(__dirname);let checks=0;
const check=(v,desc)=>{assert(v,desc); checks++};
const eq=(a,b,desc)=>{assert.deepEqual(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b)),desc);checks++};
const active=newv.database.filter(t=>t.status==='active');
const stool=active.filter(t=>newv.collectionSpecimenGroupForTest(t)==='stool');
const urine=active.filter(t=>newv.collectionSpecimenGroupForTest(t)==='urine');
const plans=(qa,tests)=>{const b=qa.buildTransportBagPlan(tests);return {coll:qa.buildCollectionPlan(tests,b),sub:b.flatMap(bag=>qa.buildSubmissionContents(bag).map(item=>({...item,bag:bag.label})))}};
const signature=items=>items.map(i=>[i.bag,i.label,i.count,Boolean(i.originalTube),i.tests.map(t=>t.testCode).sort().join(',')]).sort((x,y)=>JSON.stringify(x).localeCompare(JSON.stringify(y)));
const get=code=>{const t=newv.database.find(t=>t.testCode===String(code));check(t,`missing ${code}`);return t};
check(stool.length===24,`expected 24 stool active; actual ${stool.length}`);
for(const t of stool){
 const c=newv.canonicalCollectionContainer(t),bag=plans(newv,[t]);
 check(bag.sub.length>0,`missing submission ${t.testCode}`);
 for (const i of bag.sub) check(/class="print-label-notes"/.test(newv.printLabelingNotes(i)) && /Stool/.test(newv.printLabelingNotes(i)),`label stool missing ${t.testCode}`);
 if(t.testCode !== '3141') {
  eq(t.drawContainer,'Sterile Cup',`stool first source should be sterile cup ${t.testCode}`);
  check(c.className==='tube-urine-cup',`stool cup visual ${t.testCode}`);
  check(bag.coll.length===1 && bag.coll[0].count===1 && bag.coll[0].label==='Sterile Cup',`one collection cup ${t.testCode}`);
 }
 if(/total[- ]?fix/i.test(t.transportContainer)) {
  check(!newv.isOriginalContainerSubmission(t),`TotalFix not original tube ${t.testCode}`);
  check(bag.sub.some(x=>/Total[- ]?Fix/i.test(x.label)),`TotalFix vial submission ${t.testCode}`);
  check(!bag.sub.some(x=>x.originalTube),`TotalFix submission not flagged original ${t.testCode}`);
 }
}
const many=[681,1748,16796,11235,14693,90389].map(get);
const combined=plans(newv,many);
check(combined.coll.length===1 && combined.coll[0].count===1, 'pooled 6 stool tests initial 1 sterile cup');
check(combined.sub.some(x=>/Total[- ]?Fix/i.test(x.label)),'TotalFix transport in combined bag');
check(combined.sub.some(x=>x.label==='Sterile Cup'),'original stool cup in bag');
const metal=plans(newv,[get(3141),...many]).coll;
check(metal.some(x=>/Trace Metal/i.test(x.label)) && metal.some(x=>x.label==='Sterile Cup'), 'trace metal stool kept separate');
const u=[395,3020,444,504,548].map(x=>newv.database.find(t=>t.testCode===String(x))).filter(Boolean);
for(const t of urine){const old=base.database.find(o=>o.id===t.id);if(old){eq(t.drawContainer,old.drawContainer,`urine source unmodified ${t.testCode}`);eq(signature(plans(newv,[t]).sub),signature(plans(base,[old]).sub),`urine submission unmodified ${t.testCode}`)}}
for(const t of active.filter(t=>newv.collectionSpecimenGroupForTest(t)!=='stool')){
 const old=base.database.find(o=>o.id===t.id);if(!old)continue;
 eq(plans(newv,[t]).coll.map(x=>[x.label,x.count]),plans(base,[old]).coll.map(x=>[x.label,x.count]),`non stool collection ${t.testCode}`);
}
console.log(`PASS ${checks} regression checks: ${stool.length} active stool tests; urine and nonstool unchanged; correct cup->TotalFix; special container, pooled and labels`);
