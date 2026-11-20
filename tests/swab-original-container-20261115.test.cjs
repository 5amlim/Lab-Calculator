'use strict';

const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');

async function calculator(filename) {
  const source = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
  const injected = 'window.__SWAB_TEST__ = {' +
    'normalizeRecord, isDirectSwabKitSubmission, isOriginalContainerSubmission,' +
    'isTransferSubmission, menuSingleContainerPath, buildTransportBagPlan, buildSubmissionContents' +
    '};';
  const isQuest = filename.includes('assets/js/app.js');
  const originalFooter = isQuest ? '  init();\n  };' : '  init();\n})();';
  assert.ok(source.includes(originalFooter), filename + ' test hook marker');
  const replacementFooter = isQuest ? injected + '\n  };' : injected + '\n})();';
  const code = source.replace(originalFooter, replacementFooter);
  const window = {SEED_TESTS: [], QUEST_MISSING_DIRECTORY_READY: Promise.resolve()};
  const document = {
    getElementById: id => ({id, value: '', checked: false, options: [],
      classList: {add() {}, remove() {}, toggle() {}},
      addEventListener() {}, setAttribute() {}, querySelector() {return null;}}),
    querySelector() {return null;}, querySelectorAll() {return [];}, addEventListener() {}
  };
  const localStorage = {getItem() {return null;}, setItem() {}, removeItem() {}};
  vm.runInNewContext(code, {window, document, localStorage,
    console: {error() {}, warn() {}}, setTimeout: () => 0, clearTimeout() {}},
  {filename});
  await new Promise(setImmediate);
  await new Promise(setImmediate);
  assert.ok(window.__SWAB_TEST__, filename + ' functions');
  return window.__SWAB_TEST__;
}

function specimen(id, specimenType, drawContainer, transportContainer, specialInstructions = '') {
  return {
    id, testCode: id, testName: id, specimenType, drawContainer, transportContainer,
    specialInstructions, transportTemperature: 'Room Temperature', spin: 'No',
    preferredVolume: '1 swab', minimumVolume: '1 swab', status: 'active'
  };
}

for (const filename of ['assets/js/app.js', 'labcorp-app.js']) {
  test(filename + ': swab kits and short transport aliases remain single original submissions', async () => {
    const h = await calculator(filename);
    const rows = [
      specimen('13525', 'Swab', 'Aptima Multitest Transport Tube (orange label)', 'Aptima',
        'Collect a conjunctival swab. Submit the original tube.'),
      specimen('15031', 'Vaginal Swab', 'Aptima Multitest Transport Tube (orange label)', 'Aptima',
        'Submit 1 vaginal swab in original kit.'),
      specimen('15033', 'Vaginal Swab', 'Aptima Multitest Transport Tube (orange label)', 'Aptima'),
      specimen('throat-ct', 'Throat Swab', 'Aptima Multitest Transport Tube (orange label)', 'Aptima',
        '1 throat swab submitted in Aptima Multitest transport tube.'),
      specimen('throat-ng', 'Throat Swab', 'Aptima Multitest Transport Tube (orange label)', 'Aptima',
        'Use the Aptima Multitest transport tube.'),
      specimen('throat-combo', 'Throat Swab', 'Aptima Multitest Transport Tube (orange label)', 'Aptima'),
      specimen('wound-amies', 'Wound Swab', 'ESwab (Amies)', 'Amies Swab Transport'),
      specimen('vaginal-affirm', 'Vaginal Swab', 'BD Affirm VPIII ATTS swab transport kit', 'BD Affirm'),
      specimen('viral-utm', 'Nasopharyngeal Swab', 'UTM Viral Transport Kit', 'UTM')
    ];
    for (const row of rows) {
      const record = h.normalizeRecord(row);
      assert.equal(h.isDirectSwabKitSubmission(record), true, row.id);
      assert.equal(h.isOriginalContainerSubmission(record), true, row.id);
      assert.equal(h.isTransferSubmission(record), false, row.id);
      assert.match(h.menuSingleContainerPath(record), /container-path is-single/, row.id);
      assert.doesNotMatch(h.menuSingleContainerPath(record), /container-path-arrow/, row.id);
      const bags = h.buildTransportBagPlan([record]);
      const submission = bags.flatMap(bag => h.buildSubmissionContents(bag));
      assert.equal(submission.length, 1, row.id);
      assert.equal(submission[0].originalTube, true, row.id);
      assert.equal(submission[0].count, 1, row.id);
      if (row.id === 'throat-ct' || row.id === '13525') {
        assert.match(submission[0].label, /Aptima Multitest.*orange label/i, row.id);
      }
    }
  });

  test(filename + ': actual urine, stool and explicit liquid transfers are not hidden', async () => {
    const h = await calculator(filename);
    const rows = [
      specimen('urine-aptima', 'Urine', 'Sterile cup', 'Aptima Urine Specimen Collection Kit',
        'Transfer urine to the Aptima tube with the pipette.'),
      specimen('stool-cary', 'Stool Swab', 'Sterile cup', 'Cary-Blair Swab Transport',
        'Transfer stool from the collection cup using a swab.'),
      specimen('swab-special', 'Swab', 'Swab Collection Kit', 'Special Transfer Vial',
        'Transfer the specimen into another tube.'),
      specimen('quest-14263', 'Vaginal Swab',
        'COPAN FLOQSwab 552C.RM (self-collected in healthcare setting)',
        'ThinPrep vial (swab transferred immediately)',
        'Immediately transfer the collected swab into the ThinPrep vial.'),
      specimen('labcorp-008540', 'Swab or Material from Infected Site',
        'Clean Glass Slide (air dried)', 'Clean Glass Slide in Slide Holder',
        'Roll swab onto clean slide, air dry, and submit in slide holder.'),
      specimen('pap-aptima', 'Cervical Cytology Fluid', 'PreservCyt Pap Vial',
        'Aptima Pap-vial transfer tube (green label)', 'Transfer from the original Pap vial.')
    ];
    for (const row of rows) {
      const record = h.normalizeRecord(row);
      assert.equal(h.isDirectSwabKitSubmission(record), false, row.id);
      assert.match(h.menuSingleContainerPath(record), /container-path is-transfer/, row.id);
      const bags = h.buildTransportBagPlan([record]);
      const submission = bags.flatMap(bag => h.buildSubmissionContents(bag));
      assert.ok(submission.length, row.id + ' submission exists');
      assert.ok(submission.every(item => !item.originalTube), row.id + ' should not be direct');
    }
  });
}
