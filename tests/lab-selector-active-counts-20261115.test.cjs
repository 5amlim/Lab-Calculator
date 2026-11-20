'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const { test } = require('node:test');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const selector = read('assets/js/lab-select.js');

function openSelector(lab, initialCount, fetch) {
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
  vm.runInNewContext(selector, { document, fetch, MutationObserver }, { filename:'assets/js/lab-select.js' });
  return {
    getBadge: name => states[name].badge,
    update(text) { record.textContent = text; notify(); }
  };
}

test('Labcorp and Quest main counters separate cart-eligible tests from references', () => {
  const labcorp = read('labcorp-app.js');
  const quest = read('assets/js/app.js');
  for (const source of [labcorp, quest]) {
    const active = /const activeCount = database\.filter\(test => test\.status === 'active'\)\.length/;
    assert.match(source, active);
    assert.match(source, /directory-only/);
  }
  assert.equal((labcorp.match(/^    renderRecordCount\(\);/gm) || []).length,2,
    'Labcorp must update its count on initialization AND after manual changes');
  assert.doesNotMatch(labcorp, /els\.recordCount\.textContent = `${database\.length} tests`/);
});

test('Lab selector starts with published counts and refreshes other labs', async () => {
  const activeCount = name => JSON.parse(read('assets/search/' + name + '-tests.json')).tests.length;
  const requested = [];
  const quest = openSelector('quest', '0 tests', async url => {
    requested.push(url);
    return {ok: true, json: async () => ({tests: [[1], [2], [3]]})};
  });
  assert.equal(quest.getBadge('labcorp').textContent, activeCount('labcorp') + ' tests');
  assert.equal(openSelector('labcorp', '0 tests').getBadge('quest').textContent, activeCount('quest') + ' tests');
  quest.update('3000 active tests · 10 directory-only references');
  await new Promise(setImmediate);
  assert.deepEqual(requested, ['assets/search/labcorp-tests.json']);
  assert.equal(quest.getBadge('labcorp').textContent, '3 tests');
  assert.equal(quest.getBadge('labcorp').attributes['aria-label'], '3 available tests');
  assert.equal(quest.getBadge('quest').textContent, 'Selected');
});
 
test('All receiving lab pages load the refreshed selector script', () => {
  for (const page of ['index.html', 'labcorp.html', 'cedars.html']) {
    assert.match(read(page), /src="assets\/js\/lab-select\.js\?v=[^"\s]+"/);
  }
  assert.match(read('labcorp.html'), /src="labcorp-app\.js\?v=[^"\s]+"/);
});
