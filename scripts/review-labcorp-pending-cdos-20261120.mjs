// Exact-code verification against the published Labcorp CDOS compendium.
// This is read-only. Collection routes are selected only after a separate review.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const out=p=>resolve(root,p);
const clean=s=>String(s||'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<br\s*\/?>/gi,'; ').replace(/<\/(?:p|li)>/gi,'; ').replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/gi,' ').replace(/&amp;/gi,'&').replace(/&#39;|&apos;/gi,"'").replace(/&quot;/gi,'"').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&micro;|&#181;/gi,'µ').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/\s+/g,' ').replace(/;\s*;/g,'; ').trim();
async function pendingCatalog(){
 const scripts=[...read('labcorp.html').matchAll(/<script\b[^>]*\bsrc="([^"]+)"/gi)].map(x=>x[1].split('?')[0]);
 const sb={console,URL,URLSearchParams,Blob,Response,DecompressionStream,atob,btoa,Uint8Array,TextDecoder,TextEncoder,setTimeout,clearTimeout,document:{body:{dataset:{}},addEventListener(){}}};sb.window=sb;sb.parent=sb;
 const context=vm.createContext(sb);
 for(const f of scripts.slice(0,scripts.indexOf('labcorp-app.js')))vm.runInContext(read(f),context,{filename:f,timeout:30000});
 return sb.SEED_TESTS||[];
}
const existing=await pendingCatalog();
const already=JSON.parse(read('audits/labcorp-candidate-source-review-20261120.json')).records;
const existingOfficial=new Set(already.map(x=>x.code));
const rows=existing.filter(r=>(r.status==='pending'||r.status==='reference')&&/^\d{6}$/.test(String(r.testCode||''))&&!existingOfficial.has(String(r.testCode)));
const output=Array(rows.length),counts={total:rows.length,verified:0,missing:0,otherError:0};
let next=0;
function extract(html,code,name,url){
 const item={code,name,url};
 // The CDOS page must contain patient/specimen field data, not a successful empty or generic page.
 const raw=[...html.matchAll(/<span\b[^>]*class="field-value-([^"]+)"[^>]*>([\s\S]*?)<\/span>/gi)];
 const fields={};
 const keep=new Set(['synonym','specimentype','container','volume','minvolume','minimumvolume','specimencollection','temperature','testingfrequency','rejection','stability','patientprep','specialinstructions','testnotes','fasting','fastingstatus','collectionnote','specimenrequirement']);
 for(const match of raw){
  const k=match[1].toLowerCase().replace(/[^a-z]/g,'');
  if(!keep.has(k)||fields[k])continue;
  fields[k]=clean(match[2]).slice(0,2000);
 }
 const orderText=clean(html.slice(html.indexOf('<body'),html.indexOf('<body')+6500));
 const hasExactCode=new RegExp('(^|[^0-9])'+code+'([^0-9]|$)').test(orderText);
 if(!fields.specimentype&&!fields.container) return {...item,error:'no official specimen or container fields'};
 // The page path itself is exact code; preserve page evidence instead of guessing from a title.
 return {...item,fields,hasExactCode,header:orderText.slice(0,550)};
}
async function worker(){
 for(;;){
  const i=next++;if(i>=rows.length)return;
  const r=rows[i],code=String(r.testCode),url='https://cdos.halfpenny.com/labcorp/TestDisplay/'+code;
  try{
   const resp=await fetch(url,{signal:AbortSignal.timeout(18000),headers:{'User-Agent':'Mozilla/5.0','Accept':'text/html'}});
   if(!resp.ok){output[i]={code,name:r.testName,url,status:resp.status};if(resp.status===404)counts.missing++;else counts.otherError++;continue}
   const obj=extract(await resp.text(),code,r.testName,url);
   output[i]=obj;
   if(obj.error)counts.otherError++;else counts.verified++;
  }catch(e){counts.otherError++;output[i]={code,name:r.testName,url,error:String(e)}}
 }
}
await Promise.all(Array.from({length:7},()=>worker()));
const result={source:'Labcorp CDOS individual compendium test pages',retrieved:new Date().toISOString().slice(0,10),stats:counts,records:output.sort((a,b)=>a.code.localeCompare(b.code))};
mkdirSync(dirname(out('audits/labcorp-pending-cdos-source-review-20261120.json')),{recursive:true});
writeFileSync(out('audits/labcorp-pending-cdos-source-review-20261120.json'),JSON.stringify(result,null,2)+'\n');
console.log('CDOS_REVIEW_SUMMARY '+JSON.stringify({stats:counts,verifiedSample:result.records.filter(x=>x.fields).slice(0,15).map(x=>({code:x.code,name:x.name,fields:x.fields,hasExactCode:x.hasExactCode})),bad:result.records.filter(x=>x.error||x.status).slice(0,12)}));
