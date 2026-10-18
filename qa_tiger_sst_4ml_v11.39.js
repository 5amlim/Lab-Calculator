/** v11.39 Tiger SST 4.0 mL usable-serum pooling QA against v11.38. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const currentDir = __dirname;
const baselineDir = path.join(__dirname, '..', 'Lab_Collection_Calculator_GitHub_v11.38');
function load(dir,mode='gold') {
  const fakeEl={value:'',classList:{add(){},remove(){},toggle(){}},addEventListener(){},options:[]};
  const localStorage={getItem:key => key === 'labCollectionCalculator.sstMode.v1' ? mode : null,setItem(){},removeItem(){}};
  const ctx=vm.createContext({window:{},document:{getElementById:()=>fakeEl,querySelectorAll:()=>[]},localStorage,
    console,setTimeout,clearTimeout,Intl,Date,Map,Set,Object,Array,Math,Number,String,Boolean,RegExp,JSON});
  vm.runInContext(fs.readFileSync(path.join(dir,'data.js'),'utf8'),ctx);
  const source=fs.readFileSync(path.join(dir,'app.js'),'utf8').replace(/^  init\(\);/m,'  // skip UI init')
    .replace(/\}\)\(\);\s*$/,`  globalThis.__qa={database,isSstDraw,expandedCollectionTests,
       sstEstimateForTests,tigerSstEstimateForTests,buildTransportBagPlan,buildCollectionPlan,
       singleSstSpecimenVolumeWarning,printNotesFooter,requiresDedicatedSst,
       explicitSstTubeCount,parseVolumeMl};\n})();`);
  vm.runInContext(source,ctx);return ctx.__qa;
}
const before=load(baselineDir),after=load(currentDir),afterTiger=load(currentDir,'tiger');
let checks=0;
const eq=(a,b,msg)=>{assert.strictEqual(a,b,msg);checks++};
const ok=(v,msg)=>{assert.ok(v,msg);checks++};
const st=(code,ml,opt={})=>({id:`test-${code}`,testCode:String(code),testName:`Scenario ${code}`,
  specimenType:'Serum',drawContainer:'SST / Gold',transportContainer:'SST / Gold (spun)',
  preferredVolume:`${ml} mL serum`,minimumVolume:'0.4 mL',transportTemperature:'Room Temperature',
  specialInstructions:'',isStat:false,...opt});
const count=(a,tests,field='tigerSstEstimate')=>a.buildTransportBagPlan(tests).reduce((n,b)=>n+b[field].totalTubes,0);
// Thresholds use 4.0 mL serum per 7.5 mL Tiger tube.
eq(count(after,[st(1,2),st(2,2)]),1,'2+2 mL Tiger fits one source SST');
eq(count(before,[st(1,2),st(2,2)]),2,'v11.38 used lower effective pooled Tiger capacity');
eq(count(after,[st(1,2.1),st(2,2)]),2,'4.1 mL requires two pooled Tiger SSTs');
eq(count(after,[st(1,.8),st(2,.8),st(3,.8),st(4,.8),st(5,.8)]),1,'five 0.8 mL serum tests fit one Tiger');
eq(count(after,[st(1,1),st(2,1),st(3,1),st(4,1),st(5,1)]),2,'five 1 mL serum tests need two Tigers');
eq(count(after,[st(1,8)]),1,'one non-explicit test never increases single Tiger SST count');
// Gold pooling is unchanged.
eq(count(after,[st(1,2),st(2,2)],'sstEstimate'),2,'Gold still 2.5 mL');
eq(count(after,[st(1,1.25),st(2,1.25)],'sstEstimate'),1,'Gold threshold still 2.5 mL');
// Explicit collection rules, dedicated, and full source collection.
for(const a of [before,after]) {
 eq(count(a,[st(10,1,{specialInstructions:'Submit two SST tubes for testing'})]),2,'explicit two tubes');
 eq(count(a,[st(11,1,{specialInstructions:'Three full SST tubes required'})]),3,'explicit three full tubes');
 eq(count(a,[st(12,1,{specialInstructions:'Dedicated tube; do not share'}),st(13,1)]),2,'dedicated unpooled');
 eq(count(a,[st(14,1,{specialInstructions:'Full collection tube'}),st(15,1)]),2,'full and shared separate');
 eq(count(a,[st(16,1),st(17,1,{isStat:true})]),2,'STAT and routine separate');
 eq(count(a,[st(18,1),st(19,1,{transportTemperature:'Frozen'})]),2,'temperature separation');
 eq(count(a,[st(20,1),st(21,1,{transportContainer:'Serum transport tube'})]),2,'original vs transfer separate');
 eq(count(a,[st(22,1,{transportContainer:'Frozen transfer tube'}),st(23,1,{transportContainer:'Serum transport tube'})]),2,'distinct transfer destinations');
}
// Printed assumptions and warning thresholds now use serum units, not blood conversion.
ok(after.printNotesFooter().includes('4 mL of usable serum per fully filled 7.5 mL Tiger tube'),'print notes explain Tiger planning assumption');
ok(!afterTiger.singleSstSpecimenVolumeWarning(st(24,4)),'4 mL does not trigger volume warning');
ok(afterTiger.singleSstSpecimenVolumeWarning(st(25,4.1)).includes('preferred volume may exceed'),'>4 mL triggers volume warning');
ok(!afterTiger.singleSstSpecimenVolumeWarning(st(26,3.99)),'below 4 mL no warning');
ok(afterTiger.singleSstSpecimenVolumeWarning(st(27,1,{minimumVolume:'4.5 mL'})).includes('minimum required volume may exceed'),'minimum sufficiency takes priority');
const sst=after.database.filter(x=>x.status==='active'&&after.isSstDraw(x));
const EXCEPTIONS=new Set(['6631','20381','34162','36378','94345']);
for(const x of sst) {
 const a=after.buildTransportBagPlan(after.expandedCollectionTests([x]));
 const b=before.buildTransportBagPlan(before.expandedCollectionTests([x]));
 const sum=(bags,key)=>bags.reduce((n,bag)=>n+bag[key].totalTubes,0);
 eq(sum(a,'sstEstimate'),sum(b,'sstEstimate'),`Gold count unchanged for ${x.testCode}`);
 eq(sum(a,'tigerSstEstimate'),sum(b,'tigerSstEstimate'),`Tiger single count unchanged for ${x.testCode}`);
 if(!EXCEPTIONS.has(x.testCode)) eq(sum(a,'tigerSstEstimate'),1,`one Tiger per single ${x.testCode}`);
}
const all=after.database.filter(x=>x.status==='active');
// Seeded sampling covers mixed orders and all strata of larger pooling demand.
let seed=96291; const rnd=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;
const mean={};
for(const size of [2,3,5,8,10,20]) {
 const stats={old:0,updated:0,lower:0,equal:0};
 for(let i=0;i<350;i++) {
  const chosen=new Set();while(chosen.size<size)chosen.add(all[Math.floor(rnd()*all.length)]);
  const picked=[...chosen];const b=before.buildTransportBagPlan(picked),a=after.buildTransportBagPlan(picked);
  const sum=(bags,key)=>bags.reduce((n,bag)=>n+bag[key].totalTubes,0);
  eq(sum(a,'sstEstimate'),sum(b,'sstEstimate'),`Gold unchanged in mixed ${size}-test order ${i}`);
  eq(a.length,b.length,`same number of bags in mixed order ${i}`);
  for(let j=0;j<a.length;j++){
    eq(a[j].key,b[j].key,`bag key preserved in mixed order ${i} bag ${j}`);
    eq(a[j].tests.length,b[j].tests.length,`bag test grouping preserved ${i} bag ${j}`);
    ok(a[j].tigerSstEstimate.totalTubes <= b[j].tigerSstEstimate.totalTubes,`Tiger didn't grow in mixed order ${i} bag ${j}`);
  }
  const cOld=sum(b,'tigerSstEstimate'),cNew=sum(a,'tigerSstEstimate');
  stats.old+=cOld;stats.updated+=cNew;if(cNew<cOld)stats.lower++;else stats.equal++;
 }
 mean[size]={old:+(stats.old/350).toFixed(2),updated:+(stats.updated/350).toFixed(2),lower:stats.lower,equal:stats.equal};
}
// No CSS, source data, or print layout changed.
for(const f of ['data.js','styles.css','experience.css','print.css'])
 eq(fs.readFileSync(path.join(baselineDir,f),'utf8'),fs.readFileSync(path.join(currentDir,f),'utf8'),`${f} unchanged`);
console.log(`PASS ${checks} checks, including ${sst.length} active SST single-test rules.`);
console.log('Mixed-order sample means:',JSON.stringify(mean));
