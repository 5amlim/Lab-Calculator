// Read-only official Labcorp page collection; does NOT enable any test.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const path=p=>resolve(root,p);
function htmlText(text){
 return String(text||'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<br\s*\/?>/gi,'; ')
  .replace(/<\/(?:p|li|tr|table)>/gi,'; ').replace(/<[^>]+>/g,' ')
  .replace(/&nbsp;|&#160;/gi,' ').replace(/&amp;/gi,'&').replace(/&#39;|&apos;/gi,"'")
  .replace(/&quot;/gi,'"').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>')
  .replace(/&micro;|&#181;/gi,'µ').replace(/&reg;/gi,'®')
  .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/\s+/g,' ').replace(/;\s*;/g,';').trim().replace(/;\s*$/,'');
}
async function sourceCatalog(){
 const html=read('labcorp.html');
 const scripts=[...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/gi)].map(x=>x[1].split('?')[0]);
 const end=scripts.indexOf('labcorp-app.js');
 const sb={console,URL,URLSearchParams,Blob,Response,DecompressionStream,atob,btoa,Uint8Array,TextDecoder,TextEncoder,setTimeout,clearTimeout,
  document:{body:{dataset:{}},addEventListener(){}}};sb.window=sb;sb.parent=sb;
 const context=vm.createContext(sb);
 for(const file of scripts.slice(0,end))vm.runInContext(read(file),context,{filename:file,timeout:30000});
 return new Map((sb.SEED_TESTS||[]).map(r=>[String(r.testCode||'').trim(),r]));
}
const existing=await sourceCatalog();
const sitemap=await fetch('https://www.labcorp.com/en.sitemap.tests-sitemap.xml',{signal:AbortSignal.timeout(30000)});
if(!sitemap.ok)throw Error('Official sitemap error '+sitemap.status);
const urls=new Map;
for(const [,url,code] of (await sitemap.text()).matchAll(/<loc>(https:\/\/www\.labcorp\.com\/tests\/(\d{3,8})\/[^<]*)<\/loc>/gi))
 if(!urls.has(code))urls.set(code,url);
const candidates=[...urls].filter(([code])=>!existing.has(code)||existing.get(code).status==='pending'||existing.get(code).status==='reference');
function extract(html,code,url) {
 const title=html.match(/<title[^>]*>\s*(\d{3,8})\s*:\s*([\s\S]*?)<\/title>/i);
 if(!title||title[1]!==code)return {code,url,error:'code/title mismatch'};
 const fields={};
 const block=/<div\b[^>]*class="[^"]*\bcmp-contentfragment__element--([a-zA-Z][a-zA-Z0-9]*)[^"]*"[^>]*>/gi;
 const matches=[...html.matchAll(block)];
 for(let i=0;i<matches.length;i++){
  const key=matches[i][1];
  const start=matches[i].index+matches[i][0].length;
  const end=Math.min(i+1<matches.length?matches[i+1].index:html.length,start+15000);
  const section=html.slice(start,end);
  // First dedicated field value; preserve HTML list rows in text.
  const m=section.match(/<div\b[^>]*class="[^"]*cmp-contentfragment__element-value[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if(m&&!fields[key])fields[key]=htmlText(m[1]).slice(0,2400);
 }
 const titleText=htmlText(title[2]).replace(/\s+(?:Information|\\| Labcorp).*$/,'');
 return {code,name:titleText,url,fields};
}
const output=[];
let next=0;
const stats={totalCandidates:candidates.length,verified:0,badPage:0,fail:0};
async function worker(){
 for(;;){
  const index=next++;
  if(index>=candidates.length)return;
  const [code,url]=candidates[index],previous=existing.get(code);
  try{
   const response=await fetch(url,{signal:AbortSignal.timeout(21000),headers:{'User-Agent':'Mozilla/5.0 (compatible; LabCalculatorDirectoryReview/1.0)','Accept':'text/html'}});
   if(!response.ok){output[index]={code,url,previousStatus:previous?.status||'new',error:'HTTP '+response.status};stats.fail++;continue}
   const html=await response.text();
   const data=extract(html,code,response.url);
   output[index]={...data,previousStatus:previous?.status||'new',previousName:previous?.testName||''};
   if(data.error)stats.badPage++;else stats.verified++;
  }catch(e){output[index]={code,url,error:String(e),previousStatus:previous?.status||'new'};stats.fail++}
 }
}
await Promise.all(Array.from({length:5},()=>worker()));
const records=output.sort((a,b)=>a.code.localeCompare(b.code));
const report={source:'Official Labcorp public test sitemap and individual test detail pages',retrieved:new Date().toISOString().slice(0,10),stats,records};
mkdirSync(dirname(path('audits/labcorp-candidate-source-review-20261120.json')),{recursive:true});
writeFileSync(path('audits/labcorp-candidate-source-review-20261120.json'),JSON.stringify(report,null,2)+'\n');
console.log('CANDIDATE_SUMMARY '+JSON.stringify({stats,fields:records.filter(x=>x.fields).slice(0,6).map(x=>({code:x.code,name:x.name,fields:x.fields})),keys:[...new Set(records.flatMap(x=>Object.keys(x.fields||{})))]}));
