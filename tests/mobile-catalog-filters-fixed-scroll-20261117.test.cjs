'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('both calculator pages use fixed mobile filter sheet and refreshed assets', () => {
  const css = read('assets/css/experience.css');
  const mobile = css.split('Mobile catalog Filters are a viewport-anchored')[1];
  assert.ok(mobile, 'missing mobile-specific styles');
  assert.match(mobile, /#catalogFilterPanel\s*\{[^}]*position:\s*fixed/s);
  assert.match(mobile, /#catalogFilterPanel\s*\{[^}]*overflow-x:\s*hidden/s);
  assert.match(mobile, /#catalogFilterPanel\s*\{[^}]*overflow-y:\s*auto/s);
  assert.match(mobile, /touch-action:\s*pan-y/);
  assert.match(mobile, /html\.catalog-filter-scroll-lock/);
  for (const html of ['index.html', 'labcorp.html']) {
    const source = read(html);
    assert.match(source, /experience\.css\?v=12\.12-mobile-filter-fixed/);
    assert.match(source, /portal-selects\.js\?v=11\.98-mobile-filter/);
    assert.match(source, /(?:assets\/js\/app|labcorp-app)\.js\?v=20261117-mobile-filter-fixed/);
  }
});

test('both calculators stop the page from scrolling while mobile Filters are open', () => {
  for (const name of ['assets/js/app.js', 'labcorp-app.js']) {
    const source = read(name);
    new vm.Script(source, { filename: name });
    assert.match(source, /document\.documentElement\.classList\.toggle\('catalog-filter-scroll-lock', mobileOpen\)/);
    assert.match(source, /document\.body\.classList\.toggle\('catalog-filter-scroll-lock', mobileOpen\)/);
    assert.match(source, /panel\.style\.setProperty\('--catalog-filter-top'/);
    assert.match(source, /if \(!open && !els\.catalogFilterPanel\.classList\.contains\('hidden'\)\)/);
    assert.match(source, /window\.addEventListener\('resize'/);
  }
});

test('mobile specimen and container categories open in place, not in a side flyout', () => {
  const js = read('assets/js/portal-selects.js');
  new vm.Script(js, { filename: 'portal-selects.js' });
  assert.match(js, /matchMedia\('\(max-width: 720px\)'\)\.matches && item\.select\.closest\('#catalogFilterControl'\)/);
  assert.match(js, /item\.submenu\.style\.left\s*=\s*Math\.max\(12, Math\.min\(main\.left/);
  assert.match(js, /item\.submenu\.style\.top\s*=\s*main\.top/);
  assert.match(js, /item\.menu\.style\.visibility\s*=\s*'hidden'/);
  assert.match(js, /item\.menu\?\.style\.removeProperty\('visibility'\)/);
  assert.match(js, /returnToSpecimenCategories\(item, parentChoice\)/);
});
