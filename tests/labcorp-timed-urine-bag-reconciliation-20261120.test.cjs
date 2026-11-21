'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const openCalculator = require('./helpers/calculator-vm.cjs');

const read = name => fs.readFileSync(path.resolve(__dirname, '..', name), 'utf8');
const codes = ['130021', '201752', '209641', '375002', '501533', '806813', '909231'];
function openSeven() {
  const window = { SEED_TESTS: [], LabDirectoryTat: { directory: {} } };
  for (const file of [
    'assets/js/labcorp/catalog/verified-cdos-supported-20261120.js',
    'assets/js/labcorp/catalog/verified-complex-collection-20261120.js'
  ]) vm.runInNewContext(read(file), {window}, {filename:file, timeout:30000});
  const records = codes.map(code => {
    const row = window.SEED_TESTS.find(record => record.testCode === code);
    assert(row, 'Missing published route ' + code);
    return row;
  });
  const api = openCalculator('labcorp-app.js', [
    'database', 'urineCollectionType', 'expandedCollectionTests',
    'buildTransportBagPlan', 'buildCollectionPlan', 'buildSubmissionContents',
    'printCollectionGroups', 'isOriginalContainerSubmission'
  ], {records, window: {LabDirectoryTat: window.LabDirectoryTat}});
  const rows = codes.map(code => {
    const row = api.database.find(item => item.testCode === code);
    assert(row, 'Missing live normalized test ' + code);
    return row;
  });
  const expanded = api.expandedCollectionTests(rows);
  const bags = api.buildTransportBagPlan(expanded);
  const collected = api.buildCollectionPlan(expanded, bags);
  const submitted = bags.flatMap(bag => api.buildSubmissionContents(bag));
  return {api, rows, bags, collected, submitted};
}
const sum = entries => entries.reduce((total, entry) => total + (Number(entry.count)||0), 0);

test('12-hour protein urine never becomes a 24-hour collection because of the jug stock label', () => {
  const {api,rows,collected} = openSeven();
  const protein = rows.find(row => row.testCode === '130021');
  assert.equal(api.urineCollectionType(protein).key, '12-hour-urine');
  assert(collected.some(item => item.tests.some(test => test.testCode === '130021') &&
    item.tests.every(test => test.testCode === '130021')), '12-hour original source stays separate');
});

test('24-hour source jugs count physical collections rather than every test or every aliquot', () => {
  const {collected,api} = openSeven();
  assert.equal(sum(collected), 4, 'Separate 12-hour source, compatible unpreserved 24-hour source, 17-ketosteroids source, and unresolved metanephrines source');
  const shared = collected.find(item => ['201752','209641','375002','909231']
    .every(code => item.tests.some(test => test.testCode === code)));
  assert(shared, 'Compatible unpreserved 24-hour urine has one shared source');
  assert.equal(shared.count, 1);
  assert.equal(collected.filter(item => item.tests.some(t=>t.testCode==='501533')).length,1,
    'Conflicting metanephrine preservative route is not silently pooled');
  const html = api.printCollectionGroups(collected, []);
  assert(!/>\s*168\s*</.test(html),'Never show 168 urine collection jugs');
  assert.match(html, /listed aliquots total/i);
  assert.match(html, /original collection jug is not an additional shipping container/i);
});

test('original collection and destination bags reconcile 8 submitted containers and 83 mL of aliquots', () => {
  const {rows,bags,submitted} = openSeven();
  assert.equal(sum(submitted), 8);
  const byTemp = new Map(bags.map(bag => {
    const temp = bag.tests[0].transportTemperature;
    assert(bag.tests.every(item => item.transportTemperature === temp));
    const items = submitted.filter(entry =>
      entry.tests.some(test => bag.tests.some(bagTest => bagTest.id === test.id)));
    return [temp, sum(items)];
  }));
  assert.equal(byTemp.get('Room Temperature'), 2);
  assert.equal(byTemp.get('Refrigerated'), 5);
  assert.equal(byTemp.get('Frozen'), 1);
  const volumes = rows.map(row => {
    const text = String(row.preferredVolume);
    const double = text.match(/\b(?:two|2)\s+(\d+(?:\.\d+)?)\s*mL\s+aliquots?\b/i);
    const single = text.match(/\b(\d+(?:\.\d+)?)\s*mL\b/i);
    assert(double || single, 'Volume missing ' + row.testCode);
    return double ? Number(double[1])*2 : Number(single[1]);
  });
  assert.equal(volumes.reduce((a,b)=>a+b,0),83);
  assert(rows.every(row=>!submitted.some(item=>item.originalTube && item.tests.includes(row))),
    'Transport aliquots never double-count source jugs as bag contents');
});
