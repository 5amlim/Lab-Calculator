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
const setup=source.slice(start,end);
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
const hclCollection = [/24-hour urine/i, /6N (?:HCl|hydrochloric acid)/i];
const explanationChecks = new Map([
  ['120519', [/24-hour urine/i, /boric acid or HCl/i, /neither (?:is )?supported/i]],
  ['483496', [/discontinued/i, /MLH1/i, /VistaSeq/i, /September 14, 2026/i, /(?:no|without an) exact replacement/i]],
  ['500473', hclCollection],
  ['500496', hclCollection],
  ['500520', hclCollection],
  ['501814', hclCollection],
  ['500720', [/24-hour urine/i, /pH 4(?:\.0)?\b/i, /acetic acid/i]],
]);
for (const [code, reason] of codes) {
  const row = rows.find(r => r[0] === code);
  assert(row, 'Missing audit row for ' + code);
  assert.equal(row[3], 'Do Not Perform', code);
  const requiredDetails = explanationChecks.get(code);
  if (requiredDetails) {
    for (const detail of requiredDetails) {
      assert.match(row[4], detail, code);
      assert.match(reason, detail, code);
    }
  } else {
    assert.equal(row[4], reason, code);
  }
}
assert.equal(rows.filter(r=>r[3]==='Directory-only').length,131);
assert.equal(rows.filter(r=>r[3]==='Do Not Perform').length,197);
assert.equal(rows.filter(r=>r[3]==='Added').length,25);
console.log('LabCorp review dispositions and blocked-code reasons passed.');
