// Tests the production matcher against the bundled Quest catalog.
// Run: node qa_search_aliases.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const dir = __dirname;
const fixture = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(dir, 'data.js'), 'utf8'), fixture);
const records = Array.from(fixture.window.SEED_TESTS);
const src = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');
const block = src.slice(src.indexOf('  function normalizeSearch('), src.indexOf('  function isExactBatchMatch('));
assert(block.includes('LAB_SEARCH_ALIAS_RULES'));
const ctx = { database: records, additionalDrawRequirements: test => test.additionalDrawRequirements || [] };
vm.runInNewContext(block + '\nthis.searchMatches = findMatches; this.rank = rankLibraryTest; this.getIndex = librarySearchIndex;', ctx);
const cases = [
  ['hba1c', ['8181','16802','91732']],
  ['hemoglobin a1c', ['8181','16802','91732']],
  ['chem 14', ['10231']],
  ['chem 7', ['10165']],
  ['cbc diff', ['6399','32499']],
  ['ptt', ['763']],
  ['aptt', ['763']],
  ['hs crp', ['10124','91737']],
  ['crp', ['4420']],
  ['urine cx', ['395']],
  ['ucx', ['395']],
  ['ua reflex culture', ['3020']],
  ['uacr', ['6517']],
  ['qft', ['36970']],
  ['ntprobnp', ['11188','91739']],
  ['hs tni', ['34693']],
  ['hs tnt', ['38685']],
  ['hbsag', ['498','94333']],
  ['hbsab', ['499','8475']],
  ['hcv ab', ['8472','13667','94345']],
  ['hiv 4th gen', ['91431','13595','13670','13590']],
  ['iron tibc', ['7573']],
  ['ebv panel', ['6421']],
  ['ebv ea d', ['15447']],
  ['dht', ['90567']],
  ['lft', ['10256']],
  ['aso', ['265']],
  ['tsh reflex ft4', ['36127']],
  ['ft4', ['866','35167','36725']],
  ['vit b12', ['927','10194']],
  ['b12 folate', ['7065']],
  ['ct ng', ['11363','16506','70051','91773']],
  ['ck', ['374']],
  ['chemistry 14', ['10231']],
  ['quant gold', ['36970']],
  ['esr', ['809']],
  ['hct', ['509']],
  ['hgb', ['510']],
  ['plt', ['723']],
  ['ana screening', ['249','19880','90073','90074']],
  ['follicle stimulating hormone', ['470','36087','7137']],
  ['vit d 25', ['91735','16761','91935']],
  ['factor vii', ['346']],
  ['factor viii', ['347','90879']],
];
let count = 0;
for (const [q, allowed] of cases) {
  const matches = ctx.searchMatches(q, 5);
  assert(matches.length > 0, `No matches for ${q}`);
  const first = matches[0].test;
  assert(allowed.includes(first.testCode), `${q}: ${first.testCode} ${first.testName}, expected ${allowed.join('/')}`);
  count++;
}
for (const [query, code] of [['763','763'],['395','395'],['15447','15447'],['90567','90567']]) {
  assert.equal(ctx.searchMatches(query, 1)[0].test.testCode, code, `Exact numeric code ${code} was not first`);
  count++;
}
// Distinct tests must not pick up shorthand for other clinical tests.
const byCode = code => records.find(record => record.testCode === code);
assert.equal(ctx.rank('hs crp', byCode('4420')), 0, 'High sensitivity alias leaked to standard CRP');
assert.equal(ctx.rank('hbsab', byCode('498')), 0, 'HBsAb leaked to HBsAg');
assert.equal(ctx.rank('hbsag', byCode('499')), 0, 'HBsAg leaked to HBsAb');
assert.equal(ctx.rank('hbsas', byCode('498')), 0, 'Misspelled viral antigen acronym should not fuzzily select HBsAg');
// Approximate aliases must never bypass explicit batch confirmation.
const guard = src.slice(src.indexOf('  function isExactBatchMatch('), src.indexOf('  function batchRowOutcome('));
vm.runInNewContext(guard + '\nthis.canAutoAdd = canAutoAddBatchRow;', ctx);
for (const q of ['chem 14', 'hba1c', 'ucx', 'hbsab', 'qft', 'ptt']) {
  const matches = ctx.searchMatches(q, 5);
  assert(matches.length, `No candidate for ${q}`);
  assert.strictEqual(ctx.canAutoAdd({ query: q, matches, chosenId: matches[0].test.id }), false,
    `Alias ${q} incorrectly auto-adds without confirmation`);
}
for (const code of ['10231','763','395']) {
  const matches = ctx.searchMatches(code, 5);
  assert.strictEqual(ctx.canAutoAdd({ query: code, matches, chosenId: matches[0].test.id }), true,
    `Exact code ${code} should be safe to add`);
}
console.log(`PASS: ${count} catalog search cases, 4 abbreviation collision guards, 9 batch-confirmation checks. Catalog records: ${records.length}`);
