'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');

async function calculator(lab) {
  const window = { SEED_TESTS: [], QUEST_MISSING_DIRECTORY_READY: Promise.resolve(0) };
  const document = {
    getElementById: id => ({
      id, value: '', checked: false, options: [],
      classList: { add() {}, remove() {}, toggle() {} },
      addEventListener() {}, setAttribute() {}, querySelector() { return null; }
    }),
    querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener() {}
  };
  const context = {
    window, document,
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    setTimeout() { return 0; }, clearTimeout() {},
    console: { warn() {}, error() {} }
  };
  const sourceFile = lab === 'Quest' ? 'assets/js/data.js' : 'labcorp-data.js';
  const appFile = lab === 'Quest' ? 'assets/js/app.js' : 'labcorp-app.js';
  vm.runInNewContext(read(sourceFile), context, { filename: sourceFile, timeout: 30000 });
  const app = read(appFile), marker = '  init();';
  assert(app.includes(marker), 'Missing calculator test hook');
  vm.runInNewContext(app.replace(marker,
    '  window.__labelTest = {database,normalizeRecord,conciseSpecimenLabel,printCollectionSubmissionPlan,isOriginalContainerSubmission};'),
    context, { filename: appFile, timeout: 30000 });
  await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
  assert(window.__labelTest, lab + ' test hook did not initialize');
  return window.__labelTest;
}

function make(api, code, specimenType, drawContainer, transportContainer, specialLabeling = '') {
  return api.normalizeRecord({
    id: 'specimen-label-test-' + code, testCode: code, testName: 'Specimen label regression ' + code,
    specimenType, drawContainer, transportContainer, specialLabeling,
    preferredVolume: '1 mL', minimumVolume: '0.5 mL', transportTemperature: 'Room Temperature',
    spin: 'No', status: 'active'
  });
}

function labelFor(api, specimen) {
  return api.conciseSpecimenLabel(specimen, {
    originalTube: api.isOriginalContainerSubmission(specimen),
    label: specimen.transportContainer
  }).label;
}

for (const lab of ['Quest', 'Labcorp']) {
  test(lab + ': source tube and all required specimen labels appear on printed bags', async () => {
    const api = await calculator(lab);
    const cases = [
      ['stool', 'Stool', 'Sterile cup', 'Sterile cup', 'Stool'],
      ['body-fluid', 'Body Fluid', 'Sterile cup', 'Sterile cup', 'Body Fluid • Anatomical source/site: ____'],
      ['culture-swab', 'Culture Swab', 'UTM swab', 'UTM swab', 'Swab • Collection site: ____'],
      ['urine', 'Urine', 'Sterile cup', 'Sterile cup', 'Urine'],
      ['swab', 'Swab', 'UTM swab', 'UTM swab', 'Swab • Collection site: ____'],
      ['named-swab', 'Throat Swab', 'UTM swab', 'UTM swab', 'Throat Swab'],
      ['edta-plasma', 'Plasma', 'Lavender EDTA', 'Transport Tube', 'Plasma • Lavender EDTA'],
      ['citrate-plasma', 'Platelet-poor plasma', 'Light Blue Citrate', 'Frozen Transport Tube',
        'Platelet-Poor Plasma • Light Blue Citrate'],
      ['metal-serum', 'Serum', 'Royal Blue No Additive (red stripe)',
        'Acid-Washed / Metal-Free Transport Tube', 'Serum • Royal Blue No Additive (red stripe)'],
      ['unknown', 'Other clinical specimen', 'Sterile cup', 'Sterile cup', 'Specimen type/source: ____']
    ];
    for (const [id, specimen, draw, submit, expected] of cases) {
      const t = make(api, id, specimen, draw, submit);
      const label = labelFor(api, t);
      assert.equal(label, expected, lab + ' ' + id + ' label');
      assert.doesNotMatch(label, /collection date|collection time/i, id + ' added routine date/time');
      const printed = api.printCollectionSubmissionPlan([t]);
      assert(printed.includes(expected), id + ' label missing from printout');
      assert(printed.includes('print-label-note'), id + ' missing LABEL line');
    }
    const plainSst = make(api, 'plain-sst', 'Serum', 'SST / Gold', 'SST / Gold');
    assert.equal(api.conciseSpecimenLabel(plainSst, {originalTube: true, label: 'SST / Gold'}).label, '');
  });
  test(lab + ': seeded active stool, urine and swab records never lose specimen labels', async () => {
    const api = await calculator(lab);
    for (const t of api.database.filter(t => t.status === 'active')) {
      if (!/\b(?:stool|feces|fecal|urine|swab)\b/i.test(t.specimenType || '')) continue;
      const result = api.conciseSpecimenLabel(t, {
        originalTube: true, label: t.transportContainer
      });
      assert(result.label, lab + ' ' + t.testCode + ' missing specimen identity');
    }
  });
}

test('real ACTH, coagulation and fluoride examples keep their original additives', async () => {
  const quest = await calculator('Quest');
  const labcorp = await calculator('Labcorp');
  for (const [api, code, expected] of [
    [quest, '211', 'Plasma • Lavender EDTA'],
    [quest, '22', 'Platelet-Poor Plasma • Light Blue Citrate'],
    [labcorp, '001818', 'Plasma • Gray Fluoride'],
    [labcorp, '706994', 'Plasma • Lavender EDTA']
  ]) {
    const record = api.database.find(t => t.testCode === code);
    assert(record, 'missing ' + code);
    assert.equal(labelFor(api, record), expected);
    assert(api.printCollectionSubmissionPlan([record]).includes(expected));
  }
});
