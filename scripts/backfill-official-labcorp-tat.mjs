// Backfill ONLY code-verified, published routine TAT from Labcorp's official Test Menu.
// Does not infer TAT from related panels, specimen stability, or other tests.
import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const path=p=>resolve(root,p);
const read=p=>readFileSync(path(p),'utf8');
const codeRows=JSON.parse(read('assets/search/labcorp-tests.json')).tests;
const officialData=read('assets/js/labcorp-directory-tat.js');
const areaWindow={};
vm.runInNewContext(officialData,{window:areaWindow},{timeout:30000});
const prior=areaWindow.LabDirectoryTat.directory;
const output='assets/js/labcorp-directory-tat-backfill-20261120.js';
const existing=existsSync(path(output))?read(output):'';
const existingMatch=existing.match(/\/\* TAT_DATA_START \*\/([\s\S]*?)\/\* TAT_DATA_END \*\//);
const additions=existingMatch?JSON.parse(existingMatch[1]):{};
const hash=code=>{let h=2166136261;for(const c of code){h=Math.imul(h^c.charCodeAt(0),16777619);}return h>>>0};
// Use Labcorp's own published test sitemap to avoid 404s and stale code mappings.
const sitemapResponse=await fetch('https://www.labcorp.com/en.sitemap.tests-sitemap.xml',
  {signal:AbortSignal.timeout(25000),headers:{'User-Agent':'Mozilla/5.0 (compatible; LabCalculatorTatVerification/1.0)'}});
if(!sitemapResponse.ok)throw new Error('Official test sitemap unavailable: '+sitemapResponse.status);
const sitemap=await sitemapResponse.text();
const urlsByCode=new Map();
for(const [,url,code] of sitemap.matchAll(/<loc>(https:\/\/www\.labcorp\.com\/tests\/(\d{3,8})\/[^<]*)<\/loc>/gi)){
  if(!urlsByCode.has(code))urlsByCode.set(code,url.replace(/&amp;/g,'&'));
}
if(urlsByCode.size<2000)throw new Error('Unexpectedly small official Labcorp sitemap: '+urlsByCode.size);
const candidates=codeRows.filter(([code])=>!prior[code] && /^\d{3,8}$/.test(code))
  .sort((a,b)=>hash(a[0])-hash(b[0])||a[0].localeCompare(b[0]));
const offset=Math.max(0,Number.parseInt(process.env.START_INDEX||'0',10)||0);
const max=Math.min(3300,Math.max(1,Number.parseInt(process.env.FETCH_LIMIT||'160',10)||160));
const concurrency=Math.min(6,Math.max(1,Number.parseInt(process.env.CONCURRENCY||'4',10)||4));
const targets=candidates.slice(offset,offset+max)
  .filter(([code])=>!additions[code] && urlsByCode.has(code));

function htmlPlain(value) {
 return value.replace(/<!--[\s\S]*?-->/g,' ').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ')
  .replace(/&(?:nbsp|#160);/gi,' ').replace(/&(?:ndash|#8211);/gi,'–')
  .replace(/&(?:mdash|#8212);/gi,'-').replace(/&amp;/gi,'&')
  .replace(/&#(\d+);/g,(_,d)=>String.fromCharCode(Number(d))).replace(/\s+/g,' ').trim();
}
function extract(html,code,url) {
 // The title itself must bind the page to exactly the requested six-digit code.
 const title=html.match(/<title[^>]*>\s*(\d{3,8})\s*:\s*([\s\S]*?)<\/title>/i);
 if(!title || title[1]!==code) return {reason:'wrong-code-or-no-title'};
 if(!new URL(url).pathname.startsWith('/tests/'+code+'/')) return {reason:'wrong-redirect'};
 if(!new RegExp('Test Number\\s*'+code+'\\b','i').test(htmlPlain(html))) return {reason:'no-test-number'};
 const heading=/<h[2-5][^>]*>\s*Result Turnaround Time\s*<\/h[2-5]>/i.exec(html);
 const start=heading?heading.index+heading[0].length:html.indexOf('Result Turnaround Time');
 if(start<0)return {reason:'no-tat-heading'};
 const plain=htmlPlain(html.slice(start,start+1800))
  .replace(/^Result Turnaround Time\s*/i,'');
 // Never use the explanatory TAT definition itself as a measurement.
 const match=plain.match(/^(?:(?:Approximately|Approx\.?|About|Within|Up to)\s+)?\d+\s*(?:[-–]\s*\d+)?\s*(?:business\s+)?(?:days?|weeks?|hours?|months?)\b/i);
 if(!match) return {reason:'no-numeric-tat',preview:plain.slice(0,100)};
 const time=match[0].trim().replace(/\s*-\s*/g,'–').replace(/\s*–\s*/g,'–');
 if(time.length>60)return {reason:'unusually-long-tat'};
 const nums=[...time.matchAll(/\d+/g)].map(m=>Number(m[0]));
 const upper=Math.max(...nums);
 const unit=time.toLowerCase().match(/(days?|weeks?|hours?|months?)/)?.[1]||'days';
 const upperDays=unit.startsWith('hour')?Math.ceil(upper/24):
    unit.startsWith('week')?upper*7:unit.startsWith('month')?upper*30:upper;
 if(!Number.isFinite(upperDays)||upperDays<1||upperDays>365)return {reason:'implausible-duration'};
 return {entry:[time,upperDays,'Labcorp directory','',''+url]};
}

const counters={totalCandidates:candidates.length,sitemapCodeCount:urlsByCode.size,
 sitemapEligible:candidates.filter(([code])=>urlsByCode.has(code)).length,
 offset,requested:max,attempted:targets.length,
 verified:0,notFound:0,missingTat:0,mismatched:0,httpErrors:0,networkErrors:0,blocked:0};
let pointer=0,aborted=false;
async function worker(){
 for(;;){
  if(aborted)return;
  const index=pointer++;
  if(index>=targets.length)return;
  const [code,name]=targets[index];
  const url=urlsByCode.get(code);
  try{
   const response=await fetch(url,{signal:AbortSignal.timeout(18000),
    headers:{'User-Agent':'Mozilla/5.0 (compatible; LabCalculatorTatVerification/1.0)',
             'Accept':'text/html,application/xhtml+xml'}});
   if(response.status===404){counters.notFound++;continue}
   if(response.status===429||response.status===403){
     counters.blocked++; if(counters.blocked>=3)aborted=true;continue;
   }
   if(!response.ok){counters.httpErrors++;continue}
   const html=await response.text();
   if(html.length>2_000_000){counters.httpErrors++;continue}
   const result=extract(html,code,response.url);
   if(result.entry){additions[code]=result.entry;counters.verified++;
     if(counters.verified<=12)console.log('VERIFIED '+code+' | '+name+' | '+result.entry[0]+' | '+response.url);
   } else {
     if(result.reason==='no-numeric-tat'||result.reason==='no-tat-heading')counters.missingTat++;
     else counters.mismatched++;
     if(counters.mismatched<=5)console.log('SKIP '+code+' '+result.reason+' '+(result.preview||''));
   }
  }catch(e){counters.networkErrors++;if(counters.networkErrors<=6)console.log('NETWORK '+code+' '+String(e).slice(0,130))}
 }
}
await Promise.all(Array.from({length:concurrency},()=>worker()));
const sorted=Object.fromEntries(Object.entries(additions).sort((a,b)=>a[0].localeCompare(b[0])));
const js='// Verified Labcorp public Test Menu routine TAT additions. Source URL stored per code.\n'+
'// General directory estimates are NOT region-specific or STAT turnaround times.\n'+
'(() => {\n  const additions = /* TAT_DATA_START */\n'+JSON.stringify(sorted,null,2)+
'\n  /* TAT_DATA_END */;\n'+
'  const current = window.LabDirectoryTat || {};\n'+
'  window.LabDirectoryTat = Object.freeze({ ...current, directory: Object.freeze({ ...current.directory, ...additions }) });\n'+
'})();\n';
mkdirSync(dirname(path(output)),{recursive:true});
writeFileSync(path(output),js);
const report='audits/labcorp-tat-backfill-20261120-latest.json';
mkdirSync(dirname(path(report)),{recursive:true});
writeFileSync(path(report),JSON.stringify({...counters,entryCount:Object.keys(sorted).length,
  updatedOn:new Date().toISOString().slice(0,10)},null,2)+'\n');
console.log('TAT_SUMMARY '+JSON.stringify({...counters,entryCount:Object.keys(sorted).length}));
