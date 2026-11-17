'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const bundles = {
  Quest: 'assets/js/quest-verified-mixed-expansion-20261116-batch20.js',
  Labcorp: 'assets/js/labcorp/catalog/verified-mixed-expansion-20261116-batch20.js'
};
const expected = {
  Quest: ['39309','58792','8463','17658','17584','17593','17555','4410','17646','4404','15384'],
  Labcorp: ['086252','086270','086306','117365','086302','086304','086010','800599','086015','117904','012229','005355','019588']
};
function load(lab, seed = []) {
  const window = { SEED_TESTS: seed };
  vm.runInNewContext(read(bundles[lab]), {window}, {filename:bundles[lab]});
  return window.SEED_TESTS;
}
function byCode(lab) {
  return new Map(load(lab).map(t => [t.testCode, t]));
}
test('batch20 is loaded exactly once before startup and has unique verified codes', () => {
  for (const lab of ['Quest','Labcorp']) {
    const rows = load(lab);
    assert.deepEqual(Array.from(rows, x => x.testCode), expected[lab]);
    assert.equal(new Set(rows.map(x => x.testCode)).size, rows.length);
    const html = read(lab === 'Quest' ? 'index.html' : 'labcorp.html');
    const app = lab === 'Quest' ? 'assets/js/app.js' : 'labcorp-app.js';
    assert.equal(html.split(bundles[lab]).length - 1, 1);
    assert(html.indexOf(bundles[lab]) > -1 && html.indexOf(bundles[lab]) < html.indexOf('src="' + app));
    for (const r of rows) {
      assert.equal(r.status, 'active', r.testCode);
      for (const key of ['testName','specimenType','drawContainer','transportContainer',
        'preferredVolume','minimumVolume','transportTemperature','specialInstructions','source']) {
        assert(String(r[key] || '').trim(), r.testCode + ' missing ' + key);
      }
      assert.match(r.source, /2026-11-16/);
      assert.doesNotMatch(r.drawContainer + ' ' + r.transportContainer,
        /microscope slide|smear|acid[- ]preserved|InSure|green label Aptima/i);
    }
  }
});
test('running batch20 twice does not duplicate entries, overwrite active, or enable blocked codes', () => {
  for (const lab of ['Quest','Labcorp']) {
    const originals = load(lab);
    load(lab, originals);
    assert.equal(originals.length, expected[lab].length);
    const seed = [
      {testCode:expected[lab][0],testName:'Preserved Active',status:'active'},
      {testCode:expected[lab][1],testName:'Preserved Blocked',status:'blocked'},
      {testCode:expected[lab][2],testName:'Directory Only',status:'reference'}
    ];
    load(lab, seed);
    assert.equal(seed.length, expected[lab].length);
    assert.equal(seed[0].testName, 'Preserved Active');
    assert.equal(seed[1].testName, 'Preserved Blocked');
    assert.equal(seed[2].testName, load(lab)[2].testName);
    assert.equal(seed[2].status, 'active');
  }
});
test('Quest urine and individual fluids retain distinct source and handling rules', () => {
  const m = byCode('Quest');
  assert.equal(m.get('39309').spin, 'Yes');
  assert.equal(m.get('39309').transportContainer, 'Transport Tube');
  assert.equal(m.get('39309').transportTemperature, 'Refrigerated');
  assert.equal(m.get('58792').specimenType, 'Urine');
  assert.equal(m.get('58792').drawContainer, 'Sterile cup');
  assert.equal(m.get('58792').transportContainer, 'Sterile cup');
  assert.equal(m.get('58792').spin, 'No');
  assert.equal(m.get('8463').transportTemperature, 'Refrigerated');
  assert.equal(m.get('8463').spin, 'No');
  for (const c of ['17584','17593','17555']) {
    assert.equal(m.get(c).specimenType, 'Pleural Fluid');
    assert.equal(m.get(c).transportTemperature, 'Frozen');
  }
  for (const c of ['17658','4410','17646','4404']) {
    assert.equal(m.get(c).specimenType, 'Synovial Fluid');
    assert.equal(m.get(c).transportTemperature, 'Frozen');
  }
  assert.equal(m.get('15384').transportTemperature, 'Refrigerated');
  assert.match(m.get('15384').specialInstructions, /NOT AVAILABLE for New York/);
  assert.match(read('assets/js/market-restrictions.js'), /'15384': \{ label: 'Unavailable in NY'/);
});
test('Labcorp frozen coagulation uses one dedicated purple cap each and proper citrate draws', () => {
  const m = byCode('Labcorp');
  for (const c of expected.Labcorp.slice(0, 10)) {
    const r = m.get(c);
    assert.equal(r.specimenType, 'Plasma');
    assert.equal(r.drawContainer, 'Light Blue Sodium Citrate');
    assert.equal(r.transportContainer, 'Frozen Transport Tube (Purple Cap)');
    assert.equal(r.transportTemperature, 'Frozen');
    assert.equal(r.spin, 'Yes');
    assert.equal(r.submissionCount, 1);
    assert.match(r.specialInstructions, /SEPARATE purple-cap aliquots/);
  }
  assert.equal(m.get('117365').collectionCount, 2);
  assert.equal(m.get('086252').collectionCount, 2);
  assert.equal(m.get('086302').collectionCount, 2);
  assert.equal(m.get('086304').collectionCount, 2);
  assert.match(m.get('117904').specialInstructions, /MANDATORY DOUBLE SPIN/);
});
test('Labcorp body fluids avoid any slide or inappropriate transfer', () => {
  const m = byCode('Labcorp');
  const crystals = m.get('005355');
  assert.equal(crystals.drawContainer, 'Green Sodium Heparin');
  assert.equal(crystals.transportContainer, 'Green Sodium Heparin');
  assert.equal(crystals.transportTemperature, 'Refrigerated');
  assert.match(crystals.specialInstructions, /NO MICROSCOPE SLIDE REQUIRED/);
  assert.equal(m.get('012229').specimenType, 'CSF');
  assert.equal(m.get('012229').transportContainer, 'Transport Tube');
  assert.equal(m.get('019588').specimenType, 'Body Fluid');
  assert.equal(m.get('019588').transportContainer, 'Sterile cup');
  assert.equal(m.get('019588').spin, 'No');
});
