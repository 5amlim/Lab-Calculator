'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const modulePath = 'assets/js/quest-verified-from-unusable-audit-after90168-next100-20261117.js';
const script = fs.readFileSync(path.join(root, modulePath), 'utf8');
const codes = ['90417', '90570', '90637', '90801', '91398', '91669', '91712', '91920'];
function load(seed = []) {
  const window = { SEED_TESTS: seed };
  vm.runInNewContext(script, { window });
  return window.SEED_TESTS;
}
test('source-verified next hundred adds exactly eight unique collectable codes', () => {
  const rows = load();
  assert.deepEqual(rows.map(x => x.testCode), codes);
  assert.equal(new Set(rows.map(x => x.testCode)).size, codes.length);
  for (const row of rows) {
    assert.equal(row.status, 'active');
    assert.ok(row.source && row.source.startsWith('https://'));
    assert.ok(row.searchAliases.length >= 3);
    assert.ok(row.clinicalCategories.length >= 2);
    assert.ok(row.specialLabeling);
    assert.ok(!/date\/time/i.test(row.specialLabeling));
    assert.ok(row.drawContainer && row.transportContainer);
    assert.ok(row.transportTemperature);
  }
});
test('respects existing active and blocked tests; promotes only reference and pending', () => {
  const rows = load([
    { id:'already-active', testCode:'90417', status:'active', custom:'preserve' },
    { id:'blocked-stays-blocked', testCode:'90570', status:'blocked' },
    { id:'reference-code', testCode:'90637', status:'reference' },
    { id:'pending-code', testCode:'90801', status:'pending' }
  ]);
  assert.equal(rows.length, 8);
  const by = new Map(rows.map(x => [x.testCode, x]));
  assert.equal(by.get('90417').id, 'already-active');
  assert.equal(by.get('90417').custom, 'preserve');
  assert.equal(by.get('90570').status, 'blocked');
  assert.equal(by.get('90637').status, 'active');
  assert.equal(by.get('90637').id, 'reference-code');
  assert.equal(by.get('90801').status, 'active');
  assert.equal(by.get('90801').id, 'pending-code');
});
test('original transport media and specimen-source labeling are not conflated', () => {
  const by = new Map(load().map(x => [x.testCode, x]));
  const nasal = by.get('90417');
  assert.equal(nasal.drawContainer, nasal.transportContainer);
  assert.match(nasal.specialLabeling,/NASAL SWAB/);
  const hsv = by.get('90570');
  assert.equal(hsv.drawContainer, hsv.transportContainer);
  assert.match(hsv.transportContainer,/Multitest.*Orange Label/i);
  assert.match(hsv.specialLabeling,/LESION SWAB/);
  const csf = by.get('90637');
  assert.equal(csf.specimenType, 'CSF');
  assert.equal(csf.drawContainer, csf.transportContainer);
  assert.equal(csf.spin, 'No');
  const urine = by.get('90801');
  assert.equal(urine.drawContainer, 'Sterile cup');
  assert.equal(urine.transportContainer, 'Aptima Urine Transport Tube');
  assert.match(urine.specialLabeling,/FIRST-CATCH URINE/);
});
test('paired serum and whole blood have distinct physical source and submission counts', () => {
  const by = new Map(load().map(x => [x.testCode, x]));
  const metabolic = by.get('91398');
  assert.equal(metabolic.usePreferredSerumYield,true);
  assert.equal(metabolic.preferredVolume,'3 mL SST serum');
  assert.equal(metabolic.additionalDrawRequirements.length,1);
  assert.equal(metabolic.additionalDrawRequirements[0].container,'Red Top');
  assert.equal(metabolic.additionalDrawRequirements[0].transportContainer,'Transport Tube');
  assert.equal(metabolic.additionalDrawRequirements[0].transportTemperature,'Frozen');
  assert.equal(metabolic.transportTemperature,'Frozen');
  assert.equal(metabolic.submissionCount + metabolic.additionalDrawRequirements[0].submissionCount,2);
  const diabetes = by.get('91920');
  assert.equal(diabetes.usePreferredSerumYield,true);
  assert.equal(diabetes.additionalDrawRequirements.length,1);
  assert.equal(diabetes.additionalDrawRequirements[0].container,'Lavender EDTA');
  assert.equal(diabetes.additionalDrawRequirements[0].spin,'No');
  assert.equal(diabetes.additionalDrawRequirements[0].transportContainer,'Lavender EDTA');
  assert.equal(diabetes.submissionCount + diabetes.additionalDrawRequirements[0].submissionCount,2);
});
test('CRE screening and three-source diabetes panel retain own specimen labels and temperatures', () => {
  const by = new Map(load().map(x => [x.testCode, x]));
  const cre = by.get('91669');
  assert.equal(cre.specimenType, 'Rectal Swab');
  assert.equal(cre.drawContainer, 'ESwab (Amies)');
  assert.equal(cre.transportContainer, 'ESwab (Amies)');
  assert.equal(cre.transportTemperature, 'Refrigerated');
  assert.match(cre.specialLabeling, /RECTAL SWAB/);
  const panel = by.get('91712');
  assert.equal(panel.specimenType, 'Serum');
  assert.equal(panel.transportTemperature, 'Refrigerated');
  assert.equal(panel.additionalDrawRequirements.length, 2);
  assert.equal(panel.additionalDrawRequirements[0].specimenType, 'Whole Blood');
  assert.equal(panel.additionalDrawRequirements[0].container, 'Lavender EDTA');
  assert.equal(panel.additionalDrawRequirements[1].specimenType, 'Urine');
  assert.equal(panel.additionalDrawRequirements[1].container, 'Sterile cup');
  assert.equal(panel.additionalDrawRequirements[1].transportContainer, 'Sterile cup');
  assert.match(panel.additionalDrawRequirements[1].specialLabeling, /RANDOM URINE/);
  assert.equal(panel.additionalDrawRequirements[0].transportTemperature, 'Room Temperature');
  assert.equal(panel.additionalDrawRequirements[1].transportTemperature, 'Room Temperature');
  assert.equal(1 + panel.additionalDrawRequirements.reduce((n,d) => n+d.submissionCount,0),3);
});
test('imported before quest calculator initializes and after prior audited modules', () => {
  const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  const old = html.indexOf('quest-verified-from-unusable-audit-after36592-next100-20261116.js');
  const fresh = html.indexOf('quest-verified-from-unusable-audit-after90168-next100-20261117.js');
  const app = html.indexOf('assets/js/app.js');
  assert.ok(old >= 0 && fresh > old && app > fresh);
});
