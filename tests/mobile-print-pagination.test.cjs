const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

const css = read('assets/css/styles.css');
const quest = read('index.html');
const labcorp = read('labcorp.html');
const questApp = read('assets/js/app.js');
const labcorpApp = read('labcorp-app.js');

// Regression: iOS used to push What to Collect to a blank next page just
// because one tube card contained >8 test names. That is NOT a page fit test.
assert(!css.includes('html.mobile-print .print-logistics-plan:has('),
  'Dense SST and multiple precautions must not force a new print page');

// We intentionally leave desktop print formatting alone. Mobile styles
// override the earlier hard breaks at the end of the common stylesheet.
const desktopDetail = css.indexOf('.print-detail-table-section {\n    display: block;\n    break-before: page !important;');
const mobileRule = css.indexOf('/* Mobile print pagination:');
assert(desktopDetail > 0 && mobileRule > desktopDetail,
  'Mobile pagination rules must come after desktop page starts');
const mobile = css.slice(mobileRule);
assert.match(mobile,
  /html\.mobile-print \.print-sheet \.print-logistics-subheading\s*\{[^}]*break-before:\s*auto !important;[^}]*page-break-before:\s*auto !important;/);
assert.match(mobile,
  /html\.mobile-print \.print-sheet \.print-submit-section\.bag-page-start,\s*html\.mobile-print \.print-sheet \.print-detail-table-section\s*\{[^}]*break-before:\s*auto !important;[^}]*page-break-before:\s*auto !important;/);
assert.match(mobile,
  /html\.mobile-print \.print-sheet \.print-collection-grid,[\s\S]*?break-inside:\s*auto !important;/);
assert.match(mobile,
  /html\.mobile-print \.print-sheet \.print-collection-card\s*\{[^}]*break-inside:\s*avoid-page !important;/);
assert.match(mobile,
  /html\.mobile-print \.print-sheet \.print-bag-card:not\(\.bag-long\)\s*\{[^}]*break-inside:\s*avoid-page !important;/);
assert.match(mobile,
  /html\.mobile-print \.print-sheet \.print-table tr\s*\{[^}]*break-inside:\s*avoid-page !important;/);

// Both laboratories use the shared fix, and both set the mobile class before
// opening the native print sheet. No changes to collection/planning logic.
for (const [name, html, app] of [['Quest', quest, questApp], ['LabCorp', labcorp, labcorpApp]]) {
  assert.match(html, /assets\/css\/styles\.css\?v=12\.02/, name + ' must load new print CSS');
  assert.match(app, /classList\.toggle\('mobile-print', mobilePrint\)/,
    name + ' must detect phone print mode');
}
for (const source of [questApp, labcorpApp]) {
  assert.match(source, /class="print-collection-row"/,
    'Paired cards must have a shared page-break boundary');
}
assert.match(css, /\.print-sheet \.print-collection-row\s*\{[^}]*break-inside:\s*avoid-page !important;/,
  'Never split a paired collection-card row across print pages');
assert.match(css, /\.print-sheet \.print-collection-row > \.print-collection-card\s*\{[^}]*page-break-inside:\s*avoid !important;/,
  'Keep individual card borders with their contents');
console.log('PASS: iPhone pagination uses available space and preserves cards, headings, bags, and rows');
