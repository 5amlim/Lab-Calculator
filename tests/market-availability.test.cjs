'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/market-availability.js'), 'utf8');
function build(initial = '') {
  const storage = new Map(initial ? [['labCollectionCalculator.collectionMarket.v1', initial]] : []);
  const events = [];
  const controls = {};
  for (const id of ['collectionMarketSelect','marketAcceptanceCheck','marketSelectionHelp',
    'marketReviewPanel','marketReviewDescription','marketAcceptanceLabel','statAreaSelect']) {
    controls[id] = {
      value: '', checked: false, disabled: false, textContent: '',
      classList: { toggle() {}, contains() { return false; } },
      addEventListener(type, callback) { this['on' + type] = callback; }
    };
  }
  const document = {
    body: { classList: { contains() { return false; } } },
    getElementById(id) { return controls[id] || null; },
    dispatchEvent(event) { events.push(event.type); }
  };
  const window = { addEventListener(type, callback) { this['on' + type] = callback; } };
  const localStorage = {
    getItem(key) { return storage.get(key) ?? null; },
    setItem(key, value) { storage.set(key, value); },
    removeItem(key) { storage.delete(key); }
  };
  const CustomEvent = function(type, params) { this.type = type; this.detail = params?.detail; };
  vm.runInNewContext(source, { window, document, localStorage, CustomEvent });
  const gate = window.LabMarketAvailability;
  gate.mount();
  function selectMarket(value) {
    controls.collectionMarketSelect.value = value;
    controls.collectionMarketSelect.onchange();
  }
  return { gate, controls, selectMarket, events, window, storage };
}
const testRecord = (code, id = code) => ({
  id, testCode: code, testName: 'Test ' + code, drawContainer: 'Gold',
  transportContainer: 'Gold', specialInstructions: '', additionalDrawRequirements: []
});

test('no market chosen does not permit adding or printing', () => {
  const { gate } = build();
  const item = testRecord('809');
  assert.equal(gate.status(item, 'quest').kind, 'no-market');
  assert.equal(gate.canAdd(item, 'quest'), false);
  gate.review([item], 'quest');
  assert.equal(gate.confirmed([item], 'quest'), false);
});

test('CA-specific Quest codes block non-California markets', () => {
  const { gate, selectMarket } = build();
  for (const code of ['90368', '90369', '90372']) {
    selectMarket('ny');
    assert.equal(gate.status(testRecord(code), 'quest').kind, 'restricted');
    selectMarket('fl');
    assert.equal(gate.status(testRecord(code), 'quest').kind, 'restricted');
    selectMarket('socal');
    assert.equal(gate.status(testRecord(code), 'quest').kind, 'unverified');
  }
});

test('Quest non-California codes and NY-specific alternate are restricted', () => {
  const { gate, selectMarket } = build('socal');
  for (const code of ['335','39481','16167'])
    assert.equal(gate.status(testRecord(code), 'quest').kind, 'restricted');
  selectMarket('ny');
  assert.equal(gate.status(testRecord('16167'), 'quest').kind, 'restricted');
  assert.equal(gate.status(testRecord('335'), 'quest').kind, 'unverified');
});

test('LabCorp filter paper lead test restricted in CA and NY', () => {
  const { gate, selectMarket } = build();
  for (const market of ['socal','norcal','ny']) {
    selectMarket(market);
    assert.equal(gate.status(testRecord('791280'), 'labcorp').kind, 'restricted');
  }
  selectMarket('fl');
  assert.equal(gate.status(testRecord('791280'), 'labcorp').kind, 'unverified');
});

test('unknown codes are never approved by default', () => {
  const { gate } = build('ny');
  assert.equal(gate.status(testRecord('809'), 'quest').kind, 'unverified');
  assert.equal(gate.status(testRecord('001032'), 'labcorp').kind, 'unverified');
});

test('acknowledgement applies only to exact cart and receiving STAT site', () => {
  const { gate, controls, selectMarket } = build('ny');
  const first = testRecord('809');
  gate.review([first], 'quest');
  assert.equal(gate.confirmed([first], 'quest'), false);
  controls.marketAcceptanceCheck.checked = true;
  controls.marketAcceptanceCheck.onchange();
  assert.equal(gate.confirmed([first], 'quest'), true);
  assert.equal(gate.confirmed([first, testRecord('211')], 'quest'), false);
  gate.review([first, testRecord('211')], 'quest');
  assert.equal(controls.marketAcceptanceCheck.checked, false);
  gate.review([first], 'quest');
  controls.marketAcceptanceCheck.checked = true;
  controls.marketAcceptanceCheck.onchange();
  controls.statAreaSelect.value = 'ny_manhattan';
  assert.equal(gate.confirmed([first], 'quest'), false);
  selectMarket('socal');
  assert.equal(gate.confirmed([first], 'quest'), false);
});

test('STAT receiving laboratory may not override the selected market', () => {
  const { gate, selectMarket } = build();
  selectMarket('ny');
  assert.equal(gate.statAreaCompatible('socal_west_hills'), false);
  assert.equal(gate.statAreaCompatible('ny_manhattan'), true);
  selectMarket('fl');
  assert.equal(gate.statAreaCompatible('va_short_pump'), true);
  assert.equal(gate.statAreaCompatible('ny_manhattan'), false);
});

test('both application paths enforce collection-market verification on add and export', () => {
  for (const relativePath of ['assets/js/app.js', 'labcorp-app.js']) {
    const code = fs.readFileSync(path.join(root, relativePath), 'utf8');
    assert.match(code, /LabMarketAvailability\.canAdd\(test/);
    assert.match(code, /LabMarketAvailability\.confirmed\(tests/);
    assert.match(code, /function printSummary\(\)/);
    assert.match(code, /function exportSummaryCsv\(\)/);
    assert.match(code, /labmarketchange/);
    assert.match(code, /LabMarketAvailability\.reset\(\)/);
  }
});
