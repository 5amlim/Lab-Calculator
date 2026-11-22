'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {test} = require('node:test');
const ctx = {window:{}};
vm.runInNewContext(fs.readFileSync('labcorp-crosswalk-data.js','utf8'),ctx);
const rows=Array.from(ctx.window.QUEST_TO_LABCORP_INDEX);
const byCode=new Map(rows.map(r=>[r[0],r]));
test('crosswalk sweep preserves unique source records and recognizes uncoded Quest placeholder',()=>{
 assert.equal(rows.length,2692);
 assert.equal(byCode.size,2692);
 assert.equal(rows.filter(r=>r[0]==='XXX').length,1);
 assert.equal(rows.filter(r=>r[0]!=='XXX').length,2691);
});
test('new candidates remain informational and never import collection rules',()=>{
 assert.ok(rows.filter(r=>r[3]).length>=400);
 assert.equal(byCode.get('201')[3],'007740');
 assert.equal(byCode.get('273')[3],'602478');
 assert.equal(byCode.get('2801')[3],'602452');
 assert.equal(byCode.get('2569')[3],''); // IgE cannot map to IgG
});
test('corrected one-to-one candidates',()=>{
 assert.equal(byCode.get('785')[3],'006056');
 assert.equal(byCode.get('15447')[3],'096248');
 assert.equal(byCode.get('10120')[3],'');
});
