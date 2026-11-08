const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

const suites = [
  {
    name: 'Quest',
    data: ['assets/js/data.js'],
    app: 'assets/js/app.js',
    urinalysisOnly: ['5463', '6448', '7048', '8563'],
    reflexCulture: ['3020', '17667']
  },
  {
    name: 'LabCorp',
    data: ['labcorp-data.js', 'labcorp-urgent-pcp-data.js'],
    app: 'labcorp-app.js',
    urinalysisOnly: ['003772', '003038'],
    reflexCulture: ['377036']
  }
];

for (const suite of suites) {
  const context = vm.createContext({
    window: { SEED_TESTS: [] },
    document: { getElementById: () => null, querySelectorAll: () => [] },
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    console
  });
  for (const source of suite.data) {
    vm.runInContext(read(source), context, { filename: source });
  }

  const source = read(suite.app);
  const inactive = source.replace('  init();', '  window.testApi = { normalizeRecord, buildTransportBagPlan, buildSubmissionContents, requiresDualUrinalysisCultureContainers, printCollectionSubmissionPlan };');
  assert.notEqual(inactive, source, suite.name + ': test API could not be installed');
  vm.runInContext(inactive, context, { filename: suite.app });
  const api = context.window.testApi;
  assert(api, suite.name + ': missing test API');

  const get = code => {
    const entry = context.window.SEED_TESTS.find(t => String(t.testCode) === code);
    assert(entry, suite.name + ': missing catalog test ' + code);
    return api.normalizeRecord(entry);
  };
  const submissions = tests => api.buildTransportBagPlan(tests)
    .flatMap(bag => api.buildSubmissionContents(bag));
  const total = rows => rows.reduce((sum, row) => sum + row.count, 0);
  const isGrayCulture = item => /gray[- ]top.*(?:culture|urine)/i.test(item.label);
  const isUrinalysis = item => /red\s*\/\s*yellow|swirl/i.test(item.label);

  for (const code of suite.urinalysisOnly) {
    const test = get(code);
    assert.equal(api.requiresDualUrinalysisCultureContainers(test), false,
      suite.name + ' ' + code + ': an exclusion/referral is not a second requirement');
    const items = submissions([test]);
    assert.equal(total(items), 1, suite.name + ' ' + code + ': only one UA preservative tube');
    assert(items.some(isUrinalysis), suite.name + ' ' + code + ': UA tube missing');
    assert(!items.some(isGrayCulture), suite.name + ' ' + code + ': invented culture tube');
  }

  for (const code of suite.reflexCulture) {
    const test = get(code);
    assert.equal(api.requiresDualUrinalysisCultureContainers(test), true,
      suite.name + ' ' + code + ': explicit reflex culture must keep two containers');
    const items = submissions([test]);
    assert.equal(total(items), 2, suite.name + ' ' + code + ': require two preservative tubes');
    assert(items.some(isUrinalysis), suite.name + ' ' + code + ': UA tube missing');
    assert(items.some(isGrayCulture), suite.name + ' ' + code + ': culture tube missing');
  }

  const negativeFixture = api.normalizeRecord({
    id: 'negative-urinalysis-example',
    testCode: '999998',
    testName: 'Routine Urinalysis',
    specimenType: 'Urine',
    drawContainer: 'Sterile cup',
    transportContainer: 'Red/Yellow UA Preservative Tube',
    transportTemperature: 'Room Temperature',
    preferredVolume: '3 mL urine',
    minimumVolume: '3 mL',
    spin: 'No',
    specialInstructions: 'Do not use gray-top culture tube. If culture is ordered separately, submit a separate gray-top tube.'
  });
  assert.equal(api.requiresDualUrinalysisCultureContainers(negativeFixture), false);
  assert.equal(total(submissions([negativeFixture])), 1,
    suite.name + ': negative free-text instructions cannot create a second tube');

  if (suite.name === 'LabCorp') {
    const items = submissions([get('003772'), get('008847')]);
    assert.equal(total(items), 2, 'UA plus separately ordered urine culture = two containers');
    assert.equal(items.filter(isGrayCulture).length, 1,
      'The separate culture order contributes exactly one gray-top tube');
    assert.equal(items.filter(isUrinalysis).length, 1,
      'The complete urinalysis contributes exactly one red/yellow tube');
    const printed = api.printCollectionSubmissionPlan([get('003772'), get('008847')]);
    assert.match(printed, /<strong>2<\/strong><span>containers<\/span>/i,
      'Printed bag total must also be two containers');
  }
}

console.log('PASS: negative urine-container instructions never create extra tubes; real reflex orders retain both tubes');
