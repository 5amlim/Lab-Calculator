'use strict';
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {resolve} = require('node:path');
const vm = require('node:vm');
const root=resolve(__dirname,'..');
const source=readFileSync(resolve(root,'labcorp-app.js'),'utf8');
const start=source.indexOf('  const REVIEWED_DNP_GROUPS_20261121 = [');
const mapDeclaration=source.indexOf('  const REVIEWED_DNP_20261121 = new Map(',start);
const end=source.indexOf(';\n',mapDeclaration)+2;
assert(start>=0&&mapDeclaration>start&&end>mapDeclaration,'Review code map must be initialized');
const noticeStart=source.indexOf('  const NOVEMBER_2026_LABCORP_DELETIONS = ');
assert(noticeStart>=0&&noticeStart<start);
const setup=source.slice(noticeStart,end);
const evalCode=setup+'\n[...REVIEWED_DNP_20261121.entries()]';
const codes=new Map(vm.runInNewContext(evalCode));
assert.equal(codes.size,131,'122 earlier + 7 preceding + 2 additional blocked codes');
const functionStart=source.indexOf('  function applySpecimenExclusions(test) {',end);
const functionEnd=source.indexOf('  function applyUserState(state) {',functionStart);
const fn=source.slice(functionStart,functionEnd);
const apply=vm.runInNewContext('const normalizeSearch=x=>String(x||" ").toLowerCase(); const additionalDrawRequirements=()=>[]; '+setup+fn+'\napplySpecimenExclusions');
for(const [code,reason] of codes){
  assert.match(code,/^\d{6}$/);
  const actual=apply({testCode:code,testName:'Review sample',specimenType:'Unverified',status:'pending'});
  assert.equal(actual.status,'blocked',code);
  assert.equal(actual.specialInstructions,reason,code);
}
const csv=readFileSync(resolve(root,'audits/labcorp-remaining-review-20261121.csv'),'utf8');
function parseCsv(s){let rows=[],row=[],field='',inside=false;for(let i=0;i<s.length;i++){let c=s[i];if(inside){if(c==='"'){if(s[i+1]==='"'){field+='"';i++}else inside=false}else field+=c}else if(c==='"')inside=true;else if(c===','){row.push(field);field=''}else if(c==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field=''}else field+=c}if(row.length||field){row.push(field);rows.push(row)}return rows}
const rows=parseCsv(csv).slice(1);
// The historical CSV records evidence. Runtime text can describe the same
// exclusion in clinic terminology, while the material requirement must agree.
const wordingDifferences = new Map([
  ['120519', [/boric acid/i, /HCl/i, /24-hour/i]],
  ['483496', [/discontinued/i, /MLH1/i, /September 14, 2026/i, /(?:no|without an) exact replacement/i]],
  ...['500473', '500496', '500520', '501814'].map(code =>
    [code, [/24-hour/i, /6N (?:HCl|hydrochloric acid)/i]]),
  ['500720', [/24-hour/i, /pH 4/i, /acetic acid/i]]
]);
for (const [code, reason] of codes) {
  const row = rows.find(row => row[0] === code);
  assert(row, 'Missing audit row for '+code);
  assert.equal(row[3], 'Do Not Perform', code);
  if (!wordingDifferences.has(code)) {
    assert.equal(row[4], reason, code);
    continue;
  }
  for (const requirement of wordingDifferences.get(code)) {
    assert.match(row[4], requirement, code);
    assert.match(reason, requirement, code);
  }
}
assert.equal(rows.filter(r=>r[3]==='Directory-only').length,131);
assert.equal(rows.filter(r=>r[3]==='Do Not Perform').length,197);
assert.equal(rows.filter(r=>r[3]==='Added').length,25);
console.log('Labcorp review: 197 blocked dispositions, 131 directory-only, 25 added in the historical CSV.');
