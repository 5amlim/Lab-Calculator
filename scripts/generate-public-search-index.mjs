// Generate the public search index from the *same* scripts and policy pipeline
// as the two calculators. No browser storage, patient information or local edits.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {labs, loadCalculator} from './load-calculator-catalog.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(resolve(root,path),'utf8');
async function build(source){
 const {index: message} = await loadCalculator(root, source);
 const tests=Array.from(message.tests).sort((a,b)=>String(a[0]).localeCompare(String(b[0]),'en',{numeric:true})||String(a[0]).localeCompare(String(b[0])));
 const codes=new Set();
 for(const row of tests){
  assert(Array.isArray(row)&&row.length===4,'Invalid index row');
  const [code,name,specimen,aliases]=row;
  assert(typeof code==='string'&&/^\d{2,8}$/.test(code),source.lab+' invalid code '+code);
  assert(!codes.has(code),source.lab+' duplicate code '+code);
  codes.add(code);
  assert(typeof name==='string'&&name.trim(),'Missing test name '+code);
  assert(typeof specimen==='string'&&Array.isArray(aliases)&&aliases.every(a=>typeof a==='string'),'Invalid metadata '+code);
 }
 // Active policy regression checks: do not leak blocked or reference-only rows.
 if(source.lab==='quest'){
  assert(codes.has('18420'),'Missing active pediatric CSF assay');
  assert(!codes.has('92717'),'Blocked Quest 92717 leaked');
 }
 return {schema:1,lab:source.lab,tests};
}

// Build both indexes fully before writing either one.
const indexes=await Promise.all(labs.map(build));
const folder=resolve(root,'assets/search');
mkdirSync(folder,{recursive:true});
for(const index of indexes){
 const output=JSON.stringify(index)+'\n';
 writeFileSync(resolve(folder,index.lab+'-tests.json'),output);
 console.log(index.lab+': '+index.tests.length+' active test codes, '+Buffer.byteLength(output)+' bytes');
}

// Keep the offline lab picker aligned with the published active catalogs.
const counts = Object.fromEntries(indexes.map(index => [index.lab, index.tests.length]));
const selectorPath = 'assets/js/lab-select.js';
const selector = read(selectorPath);
const publishedCounts = /const counts = \{quest:\d+, cedars:(\d+), labcorp:\d+\};/;
assert(publishedCounts.test(selector), 'Lab selector count declaration is missing');
writeFileSync(resolve(root, selectorPath), selector.replace(publishedCounts,
 (_, cedars) => `const counts = {quest:${counts.quest}, cedars:${cedars}, labcorp:${counts.labcorp}};`));
