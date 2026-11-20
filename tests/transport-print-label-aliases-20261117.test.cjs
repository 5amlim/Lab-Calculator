'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = pathFromRoot => fs.readFileSync(path.join(__dirname,'..',pathFromRoot),'utf8');

const apps=[['Quest','assets/js/app.js','index.html'],['Labcorp','labcorp-app.js','labcorp.html']];
const openCalculator = require('./helpers/calculator-vm.cjs');
function printLabelFunctions(app) {
  const { printTransportTubeLabel, printTransportTubeQualifier } =
    openCalculator(app, ['printTransportTubeLabel', 'printTransportTubeQualifier']);
  return { label: printTransportTubeLabel, qualifier: printTransportTubeQualifier };
}
for (const [name,file,page] of apps) {
  test(name+' printed ordinary transport tubes share one display name',()=>{
    const src=read(file);
    const {label,qualifier}=printLabelFunctions(file);
    const ordinary=[
      ['Serum transport tube / vial','Serum'],
      ['Plasma transport tube / vial','Plasma'],
      ['Chilled screw-cap transport vial','Serum'],
      ['Chilled Plastic Screw-Cap Vial','Plasma'],
      ['Clean screw-cap vial (no preservative)','Plasma'],
      ['Clean screw-capped plastic vial (no preservative)','Serum'],
      ['Plastic Serum Transport Tube','Serum'],
      ['Plastic Plasma Transport Tube','Plasma'],
      ['Transport Tube','Serum']
    ];
    for (const [v,specimenType] of ordinary)
      assert.equal(label(v,{specimenType}), 'Transport Tube',v);
    assert.equal(qualifier('Clean screw-cap vial (no preservative)',{specimenType:'Plasma'}),'No preservative');
    assert.equal(qualifier('Chilled screw-cap transport vial',{specimenType:'Serum'}),'');
    assert(src.includes("printTransportTubeLabel(item.label, item.tests)"),'Submission bag title not updated');
    assert(src.includes("printTransportTubeLabel(value || 'Verify', test)"),'Detailed print badge not updated');
    assert(src.includes("No preservative · Use an additive-free transport tube"),'No-preservative warning missing');
  });
  test(name+' print labels preserve specialty media and non-blood devices',()=>{
    const {label}=printLabelFunctions(file);
    const specials=[
      ['Amber Plastic Plasma Transport Tube','Plasma'],
      ['Dedicated Frozen Purple PP Plasma Transpak (49482)','Plasma'],
      ['Metal-Free Plasma Transport Tube','Plasma'],
      ['Cary-Blair Stool Culture Transport Vial','Stool'],
      ['Clean screw-capped plastic vial (no preservative)','Stool'],
      ['Clean screw-cap vial (no preservative)','Urine'],
      ['Serum transport tube / vial','CSF']
    ];
    for(const [v,specimenType] of specials)
      assert.equal(label(v,{specimenType}),v,'Specialty print label changed: '+v);
    assert(read(page).match(/(?:labcorp-app|app)\.js\?v=[\w.-]+/), 'App version missing');
  });
}

for (const [name, file] of apps) {
  test(name + ' retains an explicit no-preservative instruction from catalog to print', () => {
    const { normalizeRecord, printCollectionSubmissionPlan } =
      openCalculator(file, ['normalizeRecord', 'printCollectionSubmissionPlan']);
    const test = normalizeRecord({
      id: 'unpreserved-transfer',
      testCode: '999991',
      testName: 'Unpreserved transfer fixture',
      specimenType: 'Serum',
      drawContainer: 'SST / Gold',
      transportContainer: 'Clean screw-capped plastic vial (no preservative)',
      transportTemperature: 'Refrigerated',
      preferredVolume: '1 mL',
      minimumVolume: '0.5 mL',
      spin: 'Yes',
      status: 'active'
    });
    const html = printCollectionSubmissionPlan([test]);
    assert.match(html, /Transport Tube/);
    assert.match(html, /No preservative · Use an additive-free transport tube/);
  });
}
