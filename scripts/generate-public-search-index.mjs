// Generate the public search index from the *same* scripts and policy pipeline
// as the two calculators. No browser storage, patient information or local edits.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(resolve(root,path),'utf8');
const labs=[
 {lab:'quest',page:'index.html',app:'assets/js/app.js',galleryLab:'Q',min:500},
 {lab:'labcorp',page:'labcorp.html',app:'labcorp-app.js',galleryLab:'L',min:500}
];

async function build(source){
 const scripts=[...read(source.page).matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)]
  .map(match=>match[1].split('?')[0]);
 const end=scripts.indexOf(source.app);
 assert(end>=0,source.page+' is missing its app');
 const document={
  body:{dataset:{galleryLab:source.galleryLab}},
  getElementById:()=>null,
  querySelectorAll:()=>[],
  querySelector:()=>null,
  addEventListener:()=>{}
 };
 const messages=[];
 const sandbox={
  document,console,URL,URLSearchParams,Blob,Response,DecompressionStream,atob,btoa,
  Uint8Array,TextDecoder,TextEncoder,setTimeout,clearTimeout,
  location:{search:'?labcentral-index=1',origin:'https://5amlim.github.io',
   href:'https://5amlim.github.io/Lab-Calculator/'+source.page+'?labcentral-index=1'},
  parent:{postMessage:(message,origin)=>messages.push({message,origin})},
  addEventListener:()=>{},removeEventListener:()=>{}
 };
 sandbox.window=sandbox;
 const context=vm.createContext(sandbox);
 for(const path of scripts.slice(0,end)){
  assert(!/^(?:https?:|\/\/)/i.test(path),'Unexpected external catalog dependency: '+path);
  vm.runInContext(read(path),context,{filename:path,timeout:30000});
 }
 // All async directory overlays must resolve before selecting the active rows.
 // Fail instead of publishing a silently incomplete index.
 if(source.lab==='quest')await sandbox.QUEST_MISSING_DIRECTORY_READY;
 vm.runInContext(read(source.app),context,{filename:source.app,timeout:30000});
 await Promise.resolve();
 await Promise.resolve();
 assert.equal(messages.length,1,source.lab+' did not export its published catalog');
 const {message,origin}=messages[0];
 assert.equal(origin,sandbox.location.origin);
 assert.equal(message.type,'labcentral:published-tests');
 assert.equal(message.lab,source.lab);
 assert.equal(message.schema,1);
 assert(Array.isArray(message.tests)&&message.tests.length>=source.min,source.lab+' suspiciously small export');
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
