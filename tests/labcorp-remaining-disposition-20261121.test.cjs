'use strict';
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {resolve} = require('node:path');
const vm = require('node:vm');
const root=resolve(__dirname,'..');
const source=readFileSync(resolve(root,'labcorp-app.js'),'utf8');
const start=source.indexOf('  const REVIEWED_DNP_GROUPS_20261121 = [');
const end=source.indexOf('  function applySpecimenExclusions(test) {',start);
assert(start>=0&&end>start,'Review code map must precede exclusions');
const setup=source.slice(start,end);
const evalCode=setup+'\n[...REVIEWED_DNP_20261121.entries()]';
const codes=new Map(vm.runInNewContext(evalCode));
assert.equal(codes.size,122,'Exactly 122 of 273 review candidates are blocked');
const functionEnd=source.indexOf('  function applyUserState(state) {',end);
const fn=source.slice(end,functionEnd);
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
const reviewed=rows.filter(r=>r[2]==='pending'||r[2]==='active');
for(const [code,reason] of codes){const r=rows.find(r=>r[0]===code);assert(r,'Missing audit row for '+code);assert.equal(r[3],'Do Not Perform',code);assert.equal(r[4],reason,code)}
assert.equal(rows.filter(r=>r[3]==='Directory-only').length,151);
assert.equal(rows.filter(r=>r[3]==='Do Not Perform').length,188);
assert.equal(rows.filter(r=>r[3]==='Added').length,14);
console.log('Labcorp review: 122 newly blocked, 151 directory-only, 66 pre-existing exclusions preserved.');
