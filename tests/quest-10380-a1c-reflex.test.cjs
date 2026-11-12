const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = filename => fs.readFileSync(path.join(root, filename), 'utf8');
const html = read('index.html');
const script = read('assets/js/quest-10380-20261112.js');

assert.match(html, /<script src="assets\\/js\\/quest-10380-20261112\\.js\\?v=1"><\\/script>/);
assert(html.indexOf('quest-10380-20261112.js') < html.indexOf('assets/js/app.js'), 'Load Quest 10380 before app initialization');

const context = vm.createContext({ window: { SEED_TESTS: [] } });
vm.runInContext(script, context);
vm.runInContext(script, context);
assert.equal(context.window.SEED_TESTS.length, 1, 'Repeated script loads must not duplicate Quest 10380');
const test = context.window.SEED_TESTS[0];
assert.equal(test.testCode, '10380');
assert.match(test.testName, /Hemoglobin A1c with Reflex to 1,5-Anhydroglucitol/);
assert.equal(test.drawContainer, 'SST / Gold');
assert.equal(test.spin, 'Yes');
assert.equal(test.transportTemperature, 'Room Temperature');
assert.match(test.preferredVolume, /1 mL serum/);
assert.match(test.minimumVolume, /0.5 mL serum/);
assert.equal(test.additionalDrawRequirements.length, 1);
const extra = test.additionalDrawRequirements[0];
assert.equal(extra.container, 'Lavender EDTA');
assert.equal(extra.count, 1);
assert.equal(extra.specimenType, 'Whole Blood');
assert.equal(extra.spin, 'No');
assert.equal(extra.transportTemperature, 'Room Temperature');
assert.match(extra.minimumVolume, /0.5 mL/);
assert.match(test.specialInstructions, /TWO SEPARATE SPECIMENS REQUIRED/);
assert.match(test.specialInstructions, /unspun SST/);
assert.match(test.specialInstructions, /NOT offered.*San Juan Capistrano/i);
assert.match(test.source, /test-detail\\/10380/);
console.log('PASS: Quest 10380 inclusion, separate SST and lavender collection, volumes, processing, temperature and dedupe');
