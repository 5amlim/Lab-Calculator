/**
 * v11.38 regression checks for the Gold SST 2.5 mL usable-serum assumption.
 * Run from the calculator directory: node qa_gold_sst_pooling_v11.38.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

function loadCalculator(dir) {
  const fakeEl = { value: '', classList: {add(){},remove(){},toggle(){}}, addEventListener(){}, options: [] };
  const saved = new Map();
  const ctx = vm.createContext({
    window: {}, document: {getElementById:()=>fakeEl,querySelectorAll:()=>[]},
    localStorage: {getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,String(v)),removeItem:k=>saved.delete(k)},
    console, setTimeout, clearTimeout, Intl, Date, Map, Set, Object, Array, Math, Number, String, Boolean, RegExp, JSON
  });
  vm.runInContext(fs.readFileSync(path.join(dir,'data.js'),'utf8'),ctx);
  const app = fs.readFileSync(path.join(dir,'app.js'),'utf8')
    .replace(/^  init\(\);/m,'  // no UI initialization in headless regression check')
    .replace(/\}\)\(\);\s*$/,`  globalThis.__qa = {database, sstEstimateForTests,
      sstCollectionEstimateForTests, tigerSstCollectionEstimateForTests,
      singleSstSpecimenVolumeWarning, selectedSstIsTiger,
      isSstDraw, buildTransportBagPlan, buildCollectionPlan,
      expandedCollectionTests, printNotesFooter, requiresDedicatedSst};\n})();`);
  vm.runInContext(app,ctx);
  return ctx.__qa;
}

const a = loadCalculator(__dirname);
let checks = 0;
function eq(got,want,description) {assert.strictEqual(got,want,description);++checks;}
function ok(got,description) {assert.ok(got,description);++checks;}
function specimen(code, vol, extra={}) {
  return {id:`qa-${code}`,testCode:String(code),testName:`QA ${code}`,
    specimenType:'Serum',drawContainer:'SST / Gold',transportContainer:'SST / Gold (spun)',
    preferredVolume:`${vol} mL serum`,minimumVolume:'0.3 mL',transportTemperature:'Room Temperature',
    specialInstructions:'',isStat:false,...extra};
}
const total = ts => a.sstEstimateForTests(ts).totalTubes;
const bagSst = ts => a.buildTransportBagPlan(ts).reduce((n,b)=>n+b.sstEstimate.totalTubes,0);
const tiger = ts => a.buildTransportBagPlan(ts).reduce((n,b)=>n+b.tigerSstEstimate.totalTubes,0);

// Pooling threshold, preferred volume priority, and per-test cap preserved.
eq(total([specimen(1,2.2)]),1,'2.2 mL fits one Gold SST');
eq(total(Array.from({length:5},(_,i)=>specimen(10+i,1))),2,'Five 1 mL tests share two Gold SSTs');
eq(total(Array.from({length:2},(_,i)=>specimen(20+i,1.1))),1,'Two 1.1 mL tests share one Gold SST');
eq(total(Array.from({length:6},(_,i)=>specimen(30+i,0.4))),1,'2.4 mL pooled serum fits one Gold SST');
eq(total([specimen(40,0.1,{preferredVolume:'',minimumVolume:'1.1 mL'})]),1,'Minimum fallback used only if preferred unavailable');
eq(total([specimen(41,3.8)]),1,'One test retains original single-tube cap');
eq(tiger([specimen(41,3.8)]),1,'Tiger also respects the one-test one-SST cap for non-explicit tests');
eq(tiger([specimen(41,8)]),1,'Even a high-volume one-test Tiger requirement triggers a warning rather than an inferred second source tube');
ok(a.singleSstSpecimenVolumeWarning(specimen(41,8)).includes('yield'),'High-volume SST warning remains visible');
eq(tiger([specimen(42,1,{specialInstructions:'Submit two SST tubes for testing'})]),2,'Tiger preserves explicit multi-tube collection requirements');
eq(total([specimen(42,1,{specialInstructions:'Submit two SST tubes for testing'})]),2,'Two explicit SST tubes override pooling');
eq(total([specimen(43,1,{specialInstructions:'Dedicated tube; do not share'})]),1,'Dedicated tube count preserved');
eq(total([specimen(44,1,{preferredVolume:'',minimumVolume:''})]),1,'Unmeasured test continues to take one source tube');

// Original-submit versus transfer and transport temperature remain separated.
const original = specimen(50,1);
const transferred = specimen(51,1,{transportContainer:'Serum transport tube'});
eq(bagSst([original,transferred]),2,'Original SST cannot also be used for transfer');
eq(bagSst([specimen(52,1),specimen(53,1,{transportTemperature:'Frozen',transportContainer:'Frozen transfer tube'})]),2,'Different temperature workflows are split');
eq(bagSst([specimen(54,1),specimen(55,1,{isStat:true})]),2,'STAT and routine shipments require separate draw tubes');

// Tiger stays on its own 7.5 mL blood-volume calculation.
eq(tiger([specimen(56,1),specimen(57,1),specimen(58,1)]),1,'Tiger retained its independent larger-tube logic');
ok(a.printNotesFooter().includes('2.5 mL of usable serum'),'Print notes explain Gold 2.5 mL assumption');

const activeSst = a.database.filter(t=>t.status === 'active' && a.isSstDraw(t));
const expectedExplicitMultiple = new Set(['6631','20381','34162','36378','94345']);
for (const t of activeSst) {
  const bags = a.buildTransportBagPlan(a.expandedCollectionTests([t]));
  for (const field of ['sstEstimate','tigerSstEstimate']) {
    const sourceTubes = bags.reduce((sum,bag)=>sum+bag[field].totalTubes,0);
    ok(sourceTubes >= 1, `Single test ${t.testCode} has at least one ${field} SST`);
    if (!expectedExplicitMultiple.has(t.testCode)) eq(sourceTubes,1, `Single test ${t.testCode} capped at one ${field} SST`);
  }
}
const active = a.database.filter(t=>t.status === 'active');
for(const t of active) {
  const expanded = a.expandedCollectionTests([t]);
  const bags = a.buildTransportBagPlan(expanded);
  const plan = a.buildCollectionPlan(expanded,bags);
  ok(Array.isArray(plan) && plan.length > 0,`Collection plan available: ${t.testCode}`);
  for(const item of plan) ok(Number.isSafeInteger(item.count) && item.count > 0,`Positive tube count: ${t.testCode}`);
}
console.log(`PASS ${checks} checks, including ${active.length} active single-test collection plans.`);
