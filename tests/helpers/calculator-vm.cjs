'use strict';

const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const vm = require('./browser-vm.cjs');

const read = path => readFileSync(resolve(__dirname, '../..', path), 'utf8');

module.exports = function openCalculator(app, exposed, options = {}) {
  const window = { SEED_TESTS: options.records || [], ...options.window };
  const document = { getElementById: () => null, querySelectorAll: () => [] };
  const localStorage = {
    getItem: key => key.includes('sstMode') ? options.sstMode ?? null : null,
    setItem() {},
    removeItem() {}
  };
  const source = read(app);
  const hook = '  init();';
  assert(source.includes(hook), app + ': initialization point missing');
  vm.runInNewContext(source.replace(hook, '  window.testApi = { ' + exposed.join(', ') + ' };'),
    { window, document, localStorage, console }, { filename: app });
  return window.testApi;
};
