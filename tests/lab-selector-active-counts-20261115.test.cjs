'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const selector = read('assets/js/lab-select.js');

function openSelector(lab, initialCount, storage) {
  const states = {};
  for (const name of ['quest', 'cedars', 'labcorp']) {
    const badge = { textContent: '', attributes: {},
      setAttribute(key, value) { this.attributes[key] = value; }
    };
    states[name] = {
      badge, classList: { contains: cls => cls === name },
      getAttribute(key) { return key === 'aria-current' && name === lab ? 'page' : null; },
      querySelector() { return badge; }
    };
  }
  const record = { textContent: initialCount };
  let notify = () => {};
  class MutationObserver {
    constructor(callback) { notify = callback; }
    observe() {}
  }
  const document = {
    querySelector(css) { return css === '.lab-select--' + lab ? {} : null; },
    getElementById(id) { return id === 'recordCount' ? record : null; },
    querySelectorAll(css) { return css === '.lab-select-choice' ? Object.values(states) : []; },
    createElement() { return { setAttribute() {} }; },
    addEventListener() {}
  };
  const sessionStorage = {
    getItem(key) { return storage.get(key) ?? null; },
    setItem(key, value) { storage.set(key, value); }
  };
  vm.runInNewContext(selector, {
    document, sessionStorage, MutationObserver,
    location: { pathname: '/Lab-Calculator/' + (lab === 'quest' ? 'index' : lab) + '.html' }
  }, { filename:'assets/js/lab-select.js' });
  return {
    getBadge: name => states[name].badge,
    update(text) { record.textContent = text; notify(); }
  };
}

test('Labcorp and Quest main counters separate cart-eligible tests from references', () => {
  const labcorp = read('labcorp-app.js');
  const quest = read('assets/js/app.js');
  for (const source of [labcorp, quest]) {
    const active = /database\.filter\(test => test\.status === 'active'\)\.length} active tests/;
    assert.match(source, active);
    assert.match(source, /directory-only references/);
  }
  assert.equal((labcorp.match(/database\.filter\(test => test\.status === 'active'\)\.length} active tests/g) || []).length,2,
    'Labcorp must update its count on initialization AND after manual changes');
  assert.doesNotMatch(labcorp, /els\.recordCount\.textContent = `${database\.length} tests`/);
});

test('Lab selection dropdown shows only active test totals, keeping X tests badge format', () => {
  const fresh = openSelector('labcorp', '0 tests', new Map());
  assert.equal(fresh.getBadge('quest').textContent, '2845 tests');
  const storage = new Map();
  const quest = openSelector('quest', '0 tests', storage);
  assert.equal(quest.getBadge('labcorp').textContent, '1561 tests');
  quest.update('2820 active tests · 1010 directory-only references');
  assert.equal(quest.getBadge('labcorp').textContent, '1561 tests');
  assert.equal(quest.getBadge('quest').textContent, 'Selected');

  const labcorp = openSelector('labcorp', '0 tests', storage);
  assert.equal(labcorp.getBadge('quest').textContent, '2820 tests');
  labcorp.update('1458 active tests · 299 directory-only references');
  assert.equal(labcorp.getBadge('quest').textContent, '2820 tests');
  assert.equal(labcorp.getBadge('labcorp').textContent, 'Selected');

  const cedars = openSelector('cedars', '39 tests', storage);
  assert.equal(cedars.getBadge('quest').textContent, '2820 tests');
  assert.equal(cedars.getBadge('labcorp').textContent, '1458 tests');
  assert.equal(cedars.getBadge('cedars').textContent, 'Selected');
  assert.equal(cedars.getBadge('labcorp').attributes['aria-label'], '1458 available tests');
});

test('All receiving lab pages load the refreshed selector script', () => {
  for (const page of ['index.html', 'labcorp.html', 'cedars.html']) {
    assert.match(read(page), /src="assets\/js\/lab-select\.js\?v=12"/);
  }
  assert.match(read('labcorp.html'), /src="labcorp-app\.js\?v=[^"\s]+"/);
});
