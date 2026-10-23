const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.join(__dirname, '..');
const file = 'assets/js/labcorp/catalog/nutrition-metabolic-neuroendocrine-20261023.js';
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

test('LabCorp sourced expansion loads before app without duplicate codes', () => {
  const html = read('labcorp.html');
  const marker = `<script src="${file}?v=1"></script>`;
  assert.equal(html.split(marker).length, 2, 'New LabCorp bundle included exactly once');
  assert(html.indexOf(marker) < html.indexOf('<script src="labcorp-app.js'), 'Catalog must load before calculator');

  const context = { window: { SEED_TESTS: [] } };
  vm.runInNewContext(read(file), context, { filename: file, timeout: 10000 });
  const records = context.window.SEED_TESTS;
  assert.equal(records.length, 18);
  assert.equal(new Set(records.map(r => r.testCode)).size, 20);
  for (const test of records) {
    assert.match(test.testCode, /^\d{6}$/);
    assert(test.testName && test.specimenType && test.drawContainer);
    assert(test.transportContainer && test.minimumVolume && test.preferredVolume);
    assert(['Room Temperature', 'Refrigerated', 'Frozen'].includes(test.transportTemperature));
    assert.equal(test.source.includes('https://www.labcorp.com/tests/' + test.testCode + '/'), true, test.testCode);
    assert(test.specialInstructions, 'Missing special instructions: ' + test.testCode);
  }

  for (const code of ['141325', '123420', '706500', '070228', '402362']) {
    const item = records.find(r => r.testCode === code);
    assert.equal(item.transportTemperature, 'Frozen', 'Freeze-only: ' + code);
    assert.match(item.transportContainer, /Frozen|frozen/i);
  }
  for (const code of ['001750', '144057']) {
    const item = records.find(r => r.testCode === code);
    assert.match(item.minimumVolume, /two separate/i);
    assert.match(item.specialInstructions, /two separate|Two separate/);
  }
  assert.match(records.find(r => r.testCode === '004770').specialInstructions, /15 minutes/i);
  assert.match(records.find(r => r.testCode === '402388').specialInstructions, /four days/);

  const repeated = { window: { SEED_TESTS: records.slice() } };
  vm.runInNewContext(read(file), repeated, { filename: file, timeout: 10000 });
  assert.equal(repeated.window.SEED_TESTS.length, 18, 'Idempotent reload must not duplicate catalog records');
});
