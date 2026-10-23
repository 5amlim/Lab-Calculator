const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = p => fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const app = read('labcorp-app.js');
const source = read('labcorp-quest-sheet-matches-data.js');
const html = read('labcorp.html');
const theme = read('labcorp-theme.css');

assert.match(html,/labcorp-app\.js\?v=27/,'Load the patched app, not cached STAT behavior');
assert.match(html,/<option value="frozen-transport">Frozen transport tube \(purple cap\)<\/option>/);

assert.match(theme,/\.labcorp-page \.tube-frozen-purple::before[\s\S]{0,200}#8057b3/,
  'Frozen transport must have a distinct purple-cap badge');

function boot(area='socal',saveOldStat=false){
  const storage=new Map();
  const id='labcorp-121186';
  if(saveOldStat){
    storage.set('labcorpCollectionCalculator.selected.v1',JSON.stringify([id]));
    storage.set('labcorpCollectionCalculator.statSelected.v1',JSON.stringify([id]));
  }
  storage.set('labcorpCollectionCalculator.labcorpStatArea.v1',area);
  const ctx=vm.createContext({
    window:{SEED_TESTS:[]},
    document:{getElementById:()=>null,querySelectorAll:()=>[]},
    localStorage:{
      getItem:key=>storage.has(key)?storage.get(key):null,
      setItem:(key,val)=>storage.set(key,String(val)),
      removeItem:key=>storage.delete(key)
    },
    console
  });
  vm.runInContext(source,ctx,{filename:'labcorp-quest-sheet-matches-data.js'});
  vm.runInContext(app.replace('  init();',
    '  window.testApi={normalizeRecord,renderLibraryRow,isStatEligible,'+
    'menuContainerBadges,libraryTransportContainerBadges,transportContainerFilterCategories,'+
    'buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents,'+
    'printCollectionSubmissionPlan};'),ctx,{filename:'labcorp-app.js'});
  return {ctx,api:ctx.window.testApi,storage};
}

for(const area of ['unselected','socal','norcal','ny','fl','other']){
  const {ctx,api,storage}=boot(area,true);
  const b1=api.normalizeRecord(ctx.window.SEED_TESTS.find(t=>t.testCode==='121186'));
  assert(b1,'Vitamin B1 record must be present');
  assert.equal(api.isStatEligible(b1),false,
    area+': selecting a receiving region alone cannot authorize STAT');
  assert.doesNotMatch(api.renderLibraryRow(b1),/Add as STAT|Add as routine/,
    area+': must not display a misleading STAT-eligible action');
  assert.equal(storage.get('labcorpCollectionCalculator.statSelected.v1'),'[]',
    area+': saved unverified STAT selection resets to Routine on load');
}
const {ctx,api}=boot();
const b1=api.normalizeRecord(ctx.window.SEED_TESTS.find(t=>t.testCode==='121186'));
assert.equal(b1.specimenType,'Whole Blood');
assert.match(b1.drawContainer,/Lavender/i);
assert.equal(b1.spin,'No');
assert.match(b1.transportContainer,/Frozen Whole Blood Transport Tube/);
const vitaminBags=api.buildTransportBagPlan([b1]);
const vitaminTransport=vitaminBags.flatMap(bag=>api.buildSubmissionContents(bag));
assert.equal(vitaminBags.length,1);
assert.equal(vitaminBags[0].key,'routine-frozen');
assert(vitaminTransport.some(x=>x.originalTube!==true),
  'LabCorp 121186 requires unseparated whole blood moved from lavender into a plastic frozen tube');
assert.match(api.menuContainerBadges(b1),/container-path-arrow/);
assert.match(api.printCollectionSubmissionPlan([b1]),/121186/);

const create=(id,specimen,transport,temperature='Frozen')=>api.normalizeRecord({
  id,testCode:id,testName:'Frozen tube check '+id,specimenType:specimen,
  drawContainer:specimen==='Plasma'?'Lavender EDTA':'Gold / SST',
  transportContainer:transport,transportTemperature:temperature,
  preferredVolume:'1 mL',minimumVolume:'0.5 mL',spin:'Yes',
  specialInstructions:'Separate from cells and freeze the required aliquot.'
});
const one=create('990101','Serum','Dedicated Frozen Serum Transport Tube');
const two=create('990102','Serum','Dedicated Frozen Serum Transport Tube');
const plasma=create('990103','Plasma','Dedicated Frozen Plasma Transport Tube');
for(const t of [one,two,plasma]){
  const badges=api.libraryTransportContainerBadges(t);
  assert(api.transportContainerFilterCategories(t).includes('frozen-transport'),
    'Frozen serum/plasma assays must appear in the frozen container filter');
  assert.match(badges,/tube-frozen-purple/);
  assert.match(badges,/>Frozen Transport Tube</);
  const contents=api.buildTransportBagPlan([t]).flatMap(b=>api.buildSubmissionContents(b));
  assert.equal(contents.length,1);
  assert.equal(contents[0].label,'Frozen Transport Tube');
  assert.equal(contents[0].className,'tube-frozen-purple');
  assert.notEqual(contents[0].originalTube,true,'Frozen aliquot must not be the original source tube');
  assert.match(api.menuContainerBadges(t),/container-path-arrow/);
  assert.match(api.printCollectionSubmissionPlan([t]),/Frozen Transport Tube/);
}
const frozenBag=api.buildTransportBagPlan([one,two,plasma]);
const frozenItems=frozenBag.flatMap(b=>api.buildSubmissionContents(b));
assert.equal(frozenItems.length,3,
  'Different frozen serum/plasma orders must not share one transport aliquot');
assert.equal(frozenItems.reduce((n,item)=>n+item.count,0),3);
const amber=create('990104','Urine','Amber Frozen Urine Transport Tube');
assert.doesNotMatch(api.libraryTransportContainerBadges(amber),/tube-frozen-purple/);
const pp=create('990105','Plasma','PP Transpak Frozen Purple Plasma Transport Tube');
assert.match(api.libraryTransportContainerBadges(pp),/Frozen Transport Tube \(PP Transpak\)/);
console.log('PASS: STAT requires verified regional code, saved STAT is cleared, B1 remains transferred, frozen serum/plasma are purple and separate.');
