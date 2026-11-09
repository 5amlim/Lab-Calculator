const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = filename => fs.readFileSync(path.join(root, filename), 'utf8');
const script = read('assets/js/quest-39777-20261109.js');
const html = read('index.html');
assert.match(html, /<script src="assets\/js\/quest-39777-20261109\.js\?v=1"><\/script>/);
assert(html.indexOf('quest-39777-20261109.js') < html.indexOf('assets/js/app.js'), 'Quest 39777 loads before the calculator');

const context = vm.createContext({ window: { SEED_TESTS: [] } });
vm.runInContext(script, context, { filename: 'quest-39777-20261109.js' });
vm.runInContext(script, context, { filename: 'quest-39777-20261109.js' });
assert.equal(context.window.SEED_TESTS.length, 1, 'Quest 39777 must not duplicate after repeated script loads');

const test = context.window.SEED_TESTS[0];
assert.equal(test.testCode, '39777');
assert.equal(test.specimenType, 'Whole Blood');
assert.equal(test.spin, 'No');
assert.match(test.drawContainer, /Royal Blue EDTA/);
assert.match(test.alternativeContainer, /Lavender EDTA/);
assert.match(test.alternativeContainer, /Pink EDTA/);
assert.match(test.transportContainer, /Amber transport tube/);
assert.match(test.specialInstructions, /Without centrifuging/);
assert.match(test.specialInstructions, /transfer 1 mL whole blood/i);
assert.match(test.specialInstructions, /protect from light/i);
assert.match(test.transportTemperature, /Refrigerated/);
assert.match(test.stability, /Room temperature: unacceptable/i);
assert.match(test.stability, /refrigerated: 14 days/i);
assert.match(test.stability, /frozen: 30 days/i);
assert.match(test.source, /test-detail\/39777/);
console.log('PASS: Quest 39777 unspun whole-blood amber transfer, stability, inclusion, and deduplication');
