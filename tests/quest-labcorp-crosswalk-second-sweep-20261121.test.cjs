'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const data=fs.readFileSync('labcorp-crosswalk-data.js','utf8');
const index=JSON.parse(fs.readFileSync('assets/search/labcorp-tests.json','utf8')).tests;
const ctx={window:{SEED_TESTS:index.map(r=>({testCode:r[0],testName:r[1]}))}};
vm.runInNewContext(data,ctx);
vm.runInNewContext(fs.readFileSync('labcorp-quest-workbook-crosswalk-overrides.js','utf8'),ctx);
const rows=Array.from(ctx.window.QUEST_TO_LABCORP_INDEX);
const byCode=new Map(rows.map(r=>[r[0],r]));
const codes=new Set(index.map(x=>String(x[0])));
const eq=(code,labCode)=>assert.equal(byCode.get(code)?.[3],labCode);
test('complete source crosswalk, one uncoded directory reference and deduplicated workbook rows',()=>{
 const indexed=JSON.parse(fs.readFileSync('assets/search/quest-tests.json','utf8')).tests;
 assert.equal(rows.filter(x=>x[7]==='active').length,indexed.length);
 assert.equal(new Set(rows.filter(x=>x[7]==='active').map(x=>x[0])).size,indexed.length);
 assert.equal(rows.filter(x=>x[7]==='legacy').length,8);
 assert.equal(rows.filter(x=>x[0]==='XXX').length,16);
});
test('all suggested Labcorp codes exist in search directory',()=>{
 for(const r of rows)if(r[3])assert.ok(codes.has(String(r[3])),r[0]+':'+r[3]);
});
test('second sweep codes preserve targeted analyte classes and avoid false matches',()=>{
 eq('214','007443');eq('2306','602506');eq('2658','602689');
 eq('10278','605224');eq('17686','605321');eq('7462','026898');
 eq('7468','208835');eq('8181','102525');eq('498','006510');
 eq('751','007856');eq('15447','096248');eq('785','006056');
 eq('2569','');eq('2657','602994');eq('10120','');
});
test('candidate-only data does not include imported orderable container rules',()=>{
 assert.ok(rows.filter(r=>r[3]).length>=700);
 assert.ok(rows.every(r=>r.length<=9));
 assert.ok(rows.every(r=>typeof r[5]==='number'));
 assert.ok(!/drawContainer|transportContainer|preferredVolume|SEED_TESTS\.push/.test(data));
});
