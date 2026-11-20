'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

async function make(lab) {
  const win = { SEED_TESTS: [], QUEST_MISSING_DIRECTORY_READY: Promise.resolve(0) };
  const doc = {
    getElementById: id => ({
      id, value: '', checked: false, options: [],
      classList: { add() {}, remove() {}, toggle() {} },
      addEventListener() {}, setAttribute() {}, querySelector() { return null; }
    }),
    querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener() {}
  };
  const base = lab === 'Quest' ? 'assets/js/data.js' : 'labcorp-data.js';
  const additions = lab === 'Quest' ? [
    'assets/js/quest-additions-20261023.js',
    'assets/js/quest-verified-from-unusable-audit-fifth20-20261116.js'
  ] : [
    'labcorp-urgent-pcp-data.js',
    'labcorp-microbiology-infectious-20261025.js',
    'labcorp-expanded-menu-data.js',
    'assets/js/labcorp/catalog/workbook-additions-core.js',
    'assets/js/labcorp/catalog/verified-expansions-f-j.js',
    'assets/js/labcorp/catalog/specialty-chemistry-and-hormones.js',
    'labcorp-verified-additions-20261023.js',
    'assets/js/labcorp/catalog/directory-reconciliation-20261119.js'
  ];
  const context = {
    window: win, document: doc,
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    setTimeout() { return 0; }, clearTimeout() {},
    console: { warn() {}, error() {} }
  };
  for (const file of [base, ...additions]) vm.runInNewContext(read(file), context, { filename: file, timeout: 30000 });
  const app = lab === 'Quest' ? 'assets/js/app.js' : 'labcorp-app.js';
  const code = read(app);
  assert(code.includes('  init();'), app + ' init hook changed');
  vm.runInNewContext(code.replace('  init();',
    '  window.__mediaAudit = {database,splitSubmissionContainers,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents,printCollectionSubmissionPlan};'),
    context, { filename: app, timeout: 30000 });
  await new Promise(setImmediate);
  await new Promise(setImmediate);
  assert(win.__mediaAudit, lab + ' missing audit hook');
  return win.__mediaAudit;
}

function record(api, code) {
  const t = api.database.find(t => t.testCode === code);
  assert(t, 'Missing test ' + code);
  return t;
}

function assertPlan(api, code, draw, labels, original) {
  const t = record(api, code);
  assert.equal(t.drawContainer, draw, code + ' collection container changed');
  const contents = api.splitSubmissionContainers(t);
  assert.deepEqual(Array.from(contents, c => c.label), labels, code + ' wrong submission container');
  if (original !== undefined) assert(contents.every(c => Boolean(c.originalTube) === original), code + ' original/transfer state');
  const printed = api.printCollectionSubmissionPlan([t]);
  for (const label of labels) {
    const visible = label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    assert(printed.includes(visible), code + ' missing media label in printed bag');
  }
  return contents;
}

test('Quest Total-Fix and Cary-Blair names survive transport rendering', async () => {
  const api = await make('Quest');
  for (const code of ['8625', '681', '3930', '3562']) {
    const contents = assertPlan(api, code, 'Sterile cup', ['Total-Fix® Transport Vial'], false);
    assert.equal(contents[0].className, 'tube-total-fix');
  }
  const cary = assertPlan(api, '32114', 'Sterile cup',
    ['Cary-Blair Stool Culture Transport Vial'], false);
  assert.equal(cary[0].className, 'tube-cary-blair');
  const amies = assertPlan(api, '10553', 'Dual Throat Swab',
    ['Amies Liquid Transport Dual Swab'], true);
  assert.equal(amies[0].className, 'tube-eswab');
  const tests = ['8625', '3562'].map(code => record(api, code));
  const bags = api.buildTransportBagPlan(tests);
  const vials = bags.flatMap(bag => api.buildSubmissionContents(bag)).filter(row => /total[- ]?fix/i.test(row.label));
  assert.equal(vials.reduce((sum, v) => sum + v.count, 0), 2, 'Two tests still need two submitted vials');
});

test('Labcorp keeps named media and multi-vial stool pathways', async () => {
  const api = await make('Labcorp');
  assertPlan(api, '180935', 'Sterile cup',
    ['Stool Culture Transport (Cary Blair / Para-Pak Orange)'], false);
  assertPlan(api, '182240', 'Sterile cup',
    ['Sterile Screw-cap Stool Vial (Para-Pak white clean)'], false);
  assertPlan(api, '120980', 'Sterile cup',
    ['Amber Plastic Urine Transport Tube (23598), No Preservative'], false);
  assertPlan(api, '183194', 'Sterile cup', ['Aptima Urine Transport'], false);
  assertPlan(api, '008169', 'Amies Gel Bacterial Swab Transport',
    ['Amies Gel Bacterial Swab Transport'], true);
  const op = assertPlan(api, '008623', 'Sterile cup',
    ['Pink Formalin O&P Vial', 'Gray PVA O&P Vial'], false);
  assert.equal(op.length, 2, 'Formalin and PVA must remain distinct');
  const parasitePanel = assertPlan(api, '205281', 'Sterile cup',
    ['Pink Formalin O&P Vial', 'Gray PVA O&P Vial'], false);
  assert.deepEqual(Array.from(parasitePanel, vial => vial.count), [1, 1]);
  const [respiratorySwab] = assertPlan(api, '140140', 'Universal Transport Medium (UTM) Swab',
    ['Universal Transport Medium (UTM) Swab'], true);
  assert.equal(respiratorySwab.count, 1, 'Medium volume does not set swab count');
});

test('Labcorp uses the original sterile cup for eligible unpreserved stool orders', async () => {
  const api = await make('Labcorp');
  const refrigerated = ['001677', '049684', '180764', '183988', '183992', '187013'];
  const frozen = ['120071', '123010', '123016', '123234', '123255', '828387'];
  for (const [codes, temperature] of [[refrigerated, 'Refrigerated'], [frozen, 'Frozen']]) {
    for (const code of codes) {
      const [cup] = assertPlan(api, code, 'Sterile cup', ['Sterile cup'], true);
      assert.equal(cup.count, 1, code);
      assert.equal(record(api, code).transportTemperature, temperature, code);
      assert.match(api.printCollectionSubmissionPlan([record(api, code)]), /Submit the original unpreserved sterile cup/);
    }
  }

  const tests = ['123010', '123255', '183988', '008144'].map(code => record(api, code));
  const bags = api.buildTransportBagPlan(tests);
  const cups = bags.flatMap(bag => api.buildSubmissionContents(bag))
    .filter(item => item.label === 'Sterile cup' && item.originalTube);
  assert.deepEqual(Array.from(cups, item => item.count), [1, 1]);
  assert(cups.some(item => item.tests.length === 2), 'Two compatible frozen orders share one submitted cup');
  const plan = api.buildCollectionPlan(tests, bags).find(item => item.sharedStoolSource);
  assert.equal(plan.count, 2, 'Different bag temperatures need different sterile cups');
  assert.match(plan.detail, /each shipping temperature/);
});

test('Generic transport tube still uses standard label without inferring special media', async () => {
  for (const lab of ['Quest', 'Labcorp']) {
    const api = await make(lab);
    const t = {
      id: 'generic-audit', testCode: '999999', specimenType: 'CSF',
      testName: 'Generic CSF', drawContainer: 'Sterile cup',
      transportContainer: 'Transport Tube', transportTemperature: 'Refrigerated',
      spin: 'No', submissionCount: 1
    };
    const plan = api.splitSubmissionContainers(t);
    assert.equal(plan[0].label, 'Transport Tube');
  }
});
