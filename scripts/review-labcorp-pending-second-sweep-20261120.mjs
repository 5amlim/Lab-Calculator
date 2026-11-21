// Inspect unresolved Labcorp reference codes using official test-detail endpoints.
// Read-only: no records are activated by this script.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const out=p=>resolve(root,p);
const sanitize=value=>String(value||'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<br\s*\/?>/gi,'; ').replace(/<\/(?:p|li|tr|table)>/gi,'; ').replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/gi,' ').replace(/&amp;/gi,'&').replace(/&#39;|&apos;/gi,"'").replace(/&quot;/gi,'"').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/\s+/g,' ').replace(/;\s*;/g,'; ').trim();
async function catalog(){
 const paths=[...read('labcorp.html').matchAll(/<script\b[^>]*\bsrc="([^"]+)"/gi)].map(x=>x[1].split('?')[0]);
 const sb={console,URL,URLSearchParams,Blob,Response,DecompressionStream,atob,btoa,Uint8Array,TextDecoder,TextEncoder,setTimeout,clearTimeout,document:{body:{dataset:{}},addEventListener(){}}};sb.window=sb;sb.parent=sb;
 const ctx=vm.createContext(sb);
 for(const path of paths.slice(0,paths.indexOf('labcorp-app.js')))vm.runInContext(read(path),ctx,{filename:path,timeout:30000});
 return sb.SEED_TESTS||[];
}
const rows=await catalog(),recent=JSON.parse(read('audits/labcorp-candidate-source-review-20261120.json'));
const known=new Set(recent.records.map(x=>x.code));
const candidates=rows.filter(x=>(x.status==='pending'||x.status==='reference')&&/^\d{6}$/.test(String(x.testCode||''))&&!known.has(String(x.testCode)));
const chosen=candidates.slice(0,500);
function extract(html,code,url){
 const title=html.match(/<title[^>]*>\s*(\d{3,8})\s*:\s*([\s\S]*?)<\/title>/i);
 if(!title||title[1]!==code)return {code,url,error:'no exact-code official test detail page'};
 const fieldset=new Set('specimen volume minimumVolume container collectionInstructions storageInstructions stabilityRequirements resultTurnaroundTime specialInstructions patientPrep causesForRejection'.split(' '));
 const fields={};
 for(const match of html.matchAll(/<div\b[^>]*class="[^"]*\bcmp-contentfragment__element--([a-zA-Z][a-zA-Z0-9]*)[^"]*"[^>]*>/gi)){
  const key=match[1];if(!fieldset.has(key))continue;
  const section=html.slice(match.index+match[0].length,match.index+match[0].length+11000);
  const m=section.match(/<div\b[^>]*class="[^"]*cmp-contentfragment__element-value[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if(m&&!fields[key])fields[key]=sanitize(m[1]).slice(0,1700);
 }
 return {code,name:sanitize(title[2]).replace(/\s+(?:Information|\\| Labcorp).*$/,''),url,fields};
}
const records=Array(chosen.length);
const count={sourceCandidates:candidates.length,checked:chosen.length,verified:0,noExactPage:0,failed:0,notFound:0};
let next=0;
async function worker(){
 for(;;){
  const i=next++;if(i>=chosen.length)return;
  const r=chosen[i],code=String(r.testCode),url='https://www.labcorp.com/tests/'+code;
  try{
   const resp=await fetch(url,{signal:AbortSignal.timeout(14000),headers:{'User-Agent':'Mozilla/5.0 (compatible; LabCalculatorSpecimenReview/1.0)','Accept':'text/html'}});
   if(!resp.ok){records[i]={code,name:r.testName,url,status:resp.status};if(resp.status===404)count.notFound++;else count.failed++;continue}
   const obj=extract(await resp.text(),code,resp.url);
   records[i]={...obj,priorName:r.testName,priorStatus:r.status};
   if(obj.error)count.noExactPage++;else count.verified++;
  }catch(e){count.failed++;records[i]={code,name:r.testName,url,error:String(e)}}
 }
}
await Promise.all(Array.from({length:6},()=>worker()));
const report={source:'Labcorp test detail pages for unresolved catalog references (exact code checked)',retrieved:new Date().toISOString().slice(0,10),stats:count,records:records.filter(Boolean).sort((a,b)=>a.code.localeCompare(b.code))};
mkdirSync(dirname(out('audits/labcorp-pending-official-sweep-20261120.json')),{recursive:true});
writeFileSync(out('audits/labcorp-pending-official-sweep-20261120.json'),JSON.stringify(report,null,2)+'\n');
console.log('OFFICIAL_PENDING_SWEEP '+JSON.stringify({stats:count,examples:report.records.filter(x=>x.fields).slice(0,10).map(x=>({code:x.code,name:x.name,specimen:x.fields.specimen,container:x.fields.container,tat:x.fields.resultTurnaroundTime})),status:report.records.slice(0,5)}));
