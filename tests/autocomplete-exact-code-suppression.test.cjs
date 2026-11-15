'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

for (const app of ['assets/js/app.js','labcorp-app.js']) {
  const source=fs.readFileSync(path.join(__dirname,'..',app),'utf8');
  const start=source.indexOf('function hasSingleExactCodeMatch(');
  const end=source.indexOf('\n  function ',start+20);
  assert.ok(start>=0 && end>start, app+': helper exists');
  const hasSingleExactCodeMatch=new Function('return '+source.slice(start,end).trim())();
  const match=code=>({test:{testCode:code,testName:'Test '+code}});

  test(app+': unique exact code does not open the suggestion card',()=>{
    assert.equal(hasSingleExactCodeMatch('229',[match('229')]),true);
    assert.equal(hasSingleExactCodeMatch('229',[match('229'),match('2290')]),true);
    assert.equal(hasSingleExactCodeMatch('001453',[match('001453')]),true);
    assert.match(source,/!matches\.length \|\| hasSingleExactCodeMatch\(query, matches\)/);
  });
  test(app+': partial, textual, ambiguous and leading-zero-altered codes still suggest',()=>{
    assert.equal(hasSingleExactCodeMatch('22',[match('229')]),false);
    assert.equal(hasSingleExactCodeMatch('229',[match('229'),match('229')]),false);
    assert.equal(hasSingleExactCodeMatch('cbc',[match('229')]),false);
    assert.equal(hasSingleExactCodeMatch('1453',[match('001453')]),false);
  });
}
