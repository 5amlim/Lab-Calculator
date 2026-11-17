'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const script = read('assets/js/clean-url.js');

function checkAddress(address) {
  const calls = [];
  const history = {
    state: {navigation: 'retained'},
    replaceState(state, unusedTitle, destination) {
      assert.equal(state, history.state);
      calls.push(destination);
    }
  };
  const window = {location: {href: address}, history};
  vm.runInNewContext(script, {window, URL});
  return calls;
}

test('removes marketing parameters without loading a new page', () => {
  assert.deepEqual(checkAddress('https://example.test/Lab-Calculator/?utm_source=referral'), ['/Lab-Calculator/']);
});

test('preserves real query parameters, hash and unrelated query state', () => {
  assert.deepEqual(
    checkAddress('https://example.test/Lab-Calculator/labcorp.html?lab=Labcorp&UTM_Source=referral&test=809&utm_campaign=fall#cart'),
    ['/Lab-Calculator/labcorp.html?lab=Labcorp&test=809#cart']
  );
});

test('does not replace a URL that has no campaign parameters', () => {
  assert.deepEqual(checkAddress('https://example.test/Lab-Calculator/?test=809#cart'), []);
  assert.deepEqual(checkAddress('https://example.test/Lab-Calculator/'), []);
});

test('removes all campaign parameter variants while leaving other parameters', () => {
  assert.deepEqual(
    checkAddress('https://example.test/Lab-Calculator/?utm_medium=a&utm_source=b&UTM_Content=c&mode=print'),
    ['/Lab-Calculator/?mode=print']
  );
});

test('all HTML entry pages load URL cleanup early without disturbing calculator script tags', () => {
  const pages = [
    'index.html', 'labcorp.html', 'cedars.html',
    'cedars-container-guide.html', 'cedars-stat-menu.html', 'cedars-test-menu.html'
  ];
  for (const page of pages) {
    const html = read(page);
    const scriptTag = '<script src="assets/js/clean-url.js?v=1"></script>';
    assert.equal(html.split(scriptTag).length - 1, 1, page);
    assert(html.indexOf(scriptTag) < html.indexOf('</head>'), page + ': script should run in head');
    if (page === 'cedars-test-menu.html') {
      assert(html.indexOf(scriptTag) < html.indexOf('window.location.replace('),
        'redirect page must strip attribution before redirect');
    }
    if (page === 'index.html') assert(html.includes('assets/js/app.js'));
    if (page === 'labcorp.html') assert(html.includes('labcorp-app.js'));
    if (page === 'cedars.html') assert(html.includes('cedars-app.js'));
  }
});
