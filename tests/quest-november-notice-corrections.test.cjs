'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {resolve} = require('node:path');

test('Quest November notice applies BNP stability and keeps Aptima amounts on the proper route', async () => {
  const {labs, loadCalculator} = await import('../scripts/load-calculator-catalog.mjs');
  const {records} = await loadCalculator(resolve(__dirname, '..'), labs[0], {captureRecords: true});
  const bnp = records.find(record => record.testCode === '37386');
  assert.equal(bnp.transportTemperature, 'Frozen');
  assert.equal(bnp.stability, 'Room temperature: unacceptable. Refrigerated: 1 hour. Frozen: 9 months.');

  for (const code of ['91475', '91477']) {
    const record = records.find(test => test.testCode === code);
    assert.equal(record.minimumVolume, '1 swab');
    assert.match(record.drawContainer, /Aptima Multitest/);
    assert.equal(record.additionalDrawRequirements.length, 0);
    assert.match(record.specialInstructions, /Aptima urine transport tube/i);
    assert.match(record.source, /305852/);
  }
});
