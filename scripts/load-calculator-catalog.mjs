// Generate the public search index from the *same* scripts and policy pipeline
// as the two calculators. No browser storage, patient information or local edits.
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

export const labs = [
  {lab: 'quest', page: 'index.html', app: 'assets/js/app.js', galleryLab: 'Q', min: 500},
  {lab: 'labcorp', page: 'labcorp.html', app: 'labcorp-app.js', galleryLab: 'L', min: 500}
];

export async function loadCalculator(root, source, {captureRecords = false} = {}) {
 const read = path => readFileSync(resolve(root, path), 'utf8');
 const scripts = [...read(source.page).matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .map(([, attributes, body], index) => {
    const path = attributes.match(/\bsrc="([^"]+)"/i)?.[1].split('?')[0];
    return {path, body, filename: path || source.page+' inline script '+(index+1)};
  });
 const end = scripts.findIndex(script => script.path === source.app);
 assert(end >= 0, source.page+' is missing its app');
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
 for (const {path, body, filename} of scripts.slice(0, end)) {
  assert(!/^(?:https?:|\/\/)/i.test(path || ''), 'Unexpected external catalog dependency: '+path);
  vm.runInContext(path ? read(path) : body, context, {filename, timeout: 30000});
 }
 // All async directory overlays must resolve before selecting the active rows.
 // Fail instead of publishing a silently incomplete index.
 if(source.lab==='quest')await sandbox.QUEST_MISSING_DIRECTORY_READY;
 let app = read(source.app);
 let records;
 if (captureRecords) {
  // Capture the clean policy result at the existing publication boundary.
  // Fail explicitly if that boundary changes.
  const hook = 'const published = applyUserState({customTests: [], overrides: []});';
  assert.equal(app.split(hook).length, 2, source.lab+' publication boundary changed');
  sandbox.captureAuditRecords = value => { records = structuredClone(value); };
  app = app.replace(hook, hook+' window.captureAuditRecords(published);');
 }
 vm.runInContext(app, context, {filename: source.app, timeout: 30000});
 await Promise.resolve();
 await Promise.resolve();
 assert.equal(messages.length,1,source.lab+' did not export its published catalog');
 const {message,origin}=messages[0];
 assert.equal(origin,sandbox.location.origin);
 assert.equal(message.type,'labcentral:published-tests');
 assert.equal(message.lab,source.lab);
 assert.equal(message.schema,1);
 assert(Array.isArray(message.tests)&&message.tests.length>=source.min,source.lab+' suspiciously small export');
 if (captureRecords) assert(Array.isArray(records), source.lab+' audit capture failed');
 return {index: structuredClone(message), records, globals: sandbox};
}
