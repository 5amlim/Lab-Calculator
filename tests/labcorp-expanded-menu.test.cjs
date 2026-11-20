const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({
  window: {},
  document: { getElementById: () => null, querySelectorAll: () => [] },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  console
});
const scripts = [...read('labcorp.html').matchAll(/<script src="([^"?]+)(?:\?[^\"]*)?"/g)].map(m => m[1]);
const additionFile = 'labcorp-expanded-menu-data.js';
assert(scripts.indexOf(additionFile) < scripts.indexOf('labcorp-app.js'));
let before;
let additions;
for (const file of scripts) {
  if (file === 'labcorp-app.js') break;
  if (file === additionFile) before = JSON.stringify(context.window.SEED_TESTS);
  vm.runInContext(read(file), context, { filename: file });
  if (file === additionFile) additions = context.window.SEED_TESTS.slice(JSON.parse(before).length);
}
const catalog = context.window.SEED_TESTS;
const original = JSON.parse(before);
assert.equal(additions.length, 34);
assert.equal(new Set(catalog.map(t => t.testCode)).size, catalog.length);
assert.equal(original.every(row => catalog.some(current => current.testCode === row.testCode)), true, 'Preserve existing codes');
const length = catalog.length;
vm.runInContext(read(additionFile), context);
assert.equal(context.window.SEED_TESTS.length, length, 'Loading twice must not duplicate codes');
for (const test of additions) {
  assert.match(test.testCode, /^\d{6}$/);
  assert(test.source.includes('/tests/' + test.testCode + '/'));
  assert(test.testName && test.preferredVolume && test.transportContainer);
  assert(['Room Temperature', 'Refrigerated', 'Frozen'].includes(test.transportTemperature));
}
// Exercise the actual normalization and planning functions without UI initialization.
const app = read('labcorp-app.js').replace('  init();',
  '  window.testApi = { normalizeRecord, buildTransportBagPlan, buildCollectionPlan };');
vm.runInContext(app, context, { filename: 'labcorp-app.js' });
const api = context.window.testApi;
const added = additions.map(t => api.normalizeRecord(t));
const get = code => added.find(t => t.testCode === code);
assert.equal(get('005280').spin, 'No');
assert.match(get('005280').transportContainer, /original/i);
assert.match(get('007740').drawContainer, /red/i);
assert.doesNotMatch(get('007740').drawContainer, /sst|gold/i);
assert.equal(get('123010').specimenType, 'Stool');
assert.equal(get('123010').transportTemperature, 'Frozen');
assert.match(get('001842').specialInstructions, /DO NOT FREEZE/);
assert.equal(get('006494').transportTemperature, 'Room Temperature');
assert.equal(get('016931').minimumVolume, '');
assert.equal(get('001560').transportContainer, 'Transport Tube');
assert.equal(get('004333').fastingStatus, 'required');
for (const test of added) {
  const bags = api.buildTransportBagPlan([test]);
  const plan = api.buildCollectionPlan([test], bags);
  assert(bags.length > 0, test.testCode + ' needs a transport plan');
  assert(plan.length > 0, test.testCode + ' needs a collection plan');
}
const bags = api.buildTransportBagPlan(added);
assert(api.buildCollectionPlan(added, bags).length > 0);
console.log(`PASS: ${added.length} additions; ${catalog.length} unique codes; existing records preserved; individual and combined plans generated.`);
