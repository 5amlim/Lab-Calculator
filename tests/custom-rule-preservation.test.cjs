'use strict';
const assert = require('node:assert/strict');
const {test} = require('node:test');
const {existsSync,readFileSync} = require('node:fs');
const {resolve} = require('node:path');
const openCalculator = require('./helpers/calculator-vm.cjs');
const root = resolve(__dirname,'..');
const read = path => readFileSync(resolve(root,path),'utf8');
const rules = JSON.parse(read('audits/master/CUSTOM_RULES_REGISTRY.json'));
test('custom rules are traceable, unique and cover explicit user-required routes and labels',async()=>{
  const byId = new Map(rules.map(rule=>[rule.id,rule]));
  assert.equal(byId.size,rules.length);
  for(const rule of rules){
    assert(rule.expectedBehavior && rule.implementation.length && rule.regressionTests.length,rule.id);
    for(const file of [...rule.implementation,...rule.regressionTests])
      assert(existsSync(resolve(root,file.split(':')[0])),rule.id+' missing '+file);
  }
  for(const id of ["gold-tiger-sst","sst-minimum-floor","blood-pool-target","timed-no-pooling","specimen-transfer-spin","transport-display","specimen-specific-stock","gray-plasma-routing","quest-timed-urine","unsupported-workflows","quest-92717-hold","labcorp-501533-hold","regional-tat","search-code-and-aliases","print-separate-physical-routes","crosswalk-review-only","quest-39749-discontinued","labcorp-november-2026-deletions","labcorp-november-2026-notice-fields","labcorp-may-2026-deletions","unverified-shipment-holds","active-test-collection-review","quest-8477-transport-stock-label","quest-16983-two-pour-off-tubes","alternatives-not-additional-draws","specific-source-and-specimen-badges","urine-and-stool-stock-aliases","original-container-and-swab","transport-label-aliases","compatible-pool-isolation","microtainer-neonatal-original"]) assert(byId.has(id),id);
  const registered = [...byId.get('active-test-collection-review').testCodes].sort();
  const indexed = ['quest','labcorp'].flatMap(lab=>JSON.parse(read('assets/search/'+lab+'-tests.json')).collectionReviewCodes).sort();
  const {labs,loadCalculator}=await import('../scripts/load-calculator-catalog.mjs');
  const runtime=[];
  for(const lab of labs){
    const {records,index}=await loadCalculator(root,lab,{captureRecords:true});
    const searchable=new Set(index.tests.map(row=>row[0]));
    const holds=records.filter(row=>row.status==='active'&&row.collectionReview).map(row=>row.testCode);
    runtime.push(...holds);
    assert.deepEqual([...new Set(holds.filter(code=>searchable.has(code)))].sort(),[...index.collectionReviewCodes].sort(),lab.lab+' published holds must be searchable');
  }
  assert.deepEqual(registered,[...new Set(runtime)].sort(),'all active runtime holds must appear in the protected registry');
  assert.deepEqual(registered.filter(code=>code!=='XXX'),indexed,'only orderable indexed holds appear in public indexes');
});
for(const app of ['assets/js/app.js','labcorp-app.js']){
  test(app+' preserves alternative versus required specimens and exact nonblood and RBC badges',()=>{
    const api = openCalculator(app,['normalizeRecord','expandedCollectionTests','collectionSpecimenBadgesForItem','specimenBadge','microtainerIcon']);
    const base = api.normalizeRecord({id:'custom-rule-fixture',testCode:'777777',testName:'Fixture',status:'active',specimenType:'Serum',
      drawContainer:'Red Top',alternativeContainer:'SST / Gold',transportContainer:'Transport Tube',preferredVolume:'1 mL',minimumVolume:'0.5 mL',spin:'Yes',transportTemperature:'Room Temperature'});
    assert.equal(api.expandedCollectionTests([base]).length,1);
    assert.equal(base.drawContainer,'Red Top');
    assert.equal(base.alternativeContainer,'SST / Gold');
    const multi = api.normalizeRecord({...base,additionalDrawRequirements:[{container:'Lavender EDTA',specimenType:'Whole Blood',count:2,transportContainer:'Lavender EDTA',spin:'No'}]});
    const expanded=api.expandedCollectionTests([multi]);
    assert.equal(expanded.length,2);
    assert.equal(expanded[1].drawContainer,'Lavender EDTA');
    assert.equal(expanded[1].specimenType,'Whole Blood');
    assert.equal(expanded[1].collectionCount,2);
    assert.match(api.specimenBadge('RBCs'),/>Red Blood Cells</);
    for(const specimen of ['Worm','Pinworm','Tick','Arthropod']){
      const item={tests:[{...base,specimenType:specimen,drawContainer:'Sterile cup',transportContainer:'Sterile cup'}]};
      assert(api.collectionSpecimenBadgesForItem(item).some(x=>x.label===specimen),specimen);
    }
    assert.notEqual(api.microtainerIcon('Lavender EDTA Microtainer'),api.microtainerIcon('Gray fluoride Microtainer'));
    assert.notEqual(api.microtainerIcon('Gold SST Microtainer'),api.microtainerIcon('Lavender EDTA Microtainer'));
    const whole=api.normalizeRecord({...base,specimenType:'Whole Blood',drawContainer:'Lavender EDTA',transportContainer:'Amber transport tube',spin:'Yes'});
    assert.equal(whole.spin,'No');
  });
}
test('Quest neonatal microtainer override preserves the existing original spun container name',()=>{
  const api=openCalculator('assets/js/app.js',['normalizeRecord']);
  for(const code of ['6631','20381','34162']){
    const record=api.normalizeRecord({id:'micro-'+code,testCode:code,testName:'Neonatal bilirubin fixture',status:'active',specimenType:'Serum',drawContainer:'SST / Gold',transportContainer:'Amber transport tube',collectionCount:2,submissionCount:2,spin:'Yes',specialInstructions:'Collect two amber Microtainer SSTs. Protect from light.'});
    assert.equal(record.drawContainer,'Amber Microtainer SST');
    assert.equal(record.transportContainer,'Amber Microtainer SST (spun)');
    assert.equal(record.collectionCount,2);
    assert.equal(record.submissionCount,2);
    assert.match(record.specialInstructions,/Protect from light/);
  }
});
