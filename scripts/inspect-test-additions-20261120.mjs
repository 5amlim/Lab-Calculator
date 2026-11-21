// Audit eligible catalog additions against current official Labcorp sitemap (read-only).
import {readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
async function catalog(page,app) {
 const scripts=[...read(page).matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)].map(m=>m[1].split('?')[0]);
 const end=scripts.indexOf(app);
 const sb={console,URL,URLSearchParams,Blob,Response,DecompressionStream,atob,btoa,Uint8Array,
   TextDecoder,TextEncoder,setTimeout,clearTimeout,document:{addEventListener(){},body:{dataset:{}}}};
 sb.window=sb;sb.parent=sb;
 const context=vm.createContext(sb);
 for(const f of scripts.slice(0,end))vm.runInContext(read(f),context,{filename:f,timeout:30000});
 if(sb.QUEST_MISSING_DIRECTORY_READY)await sb.QUEST_MISSING_DIRECTORY_READY;
 return sb.SEED_TESTS || [];
}
const [lab,quest]=await Promise.all([catalog('labcorp.html','labcorp-app.js'),catalog('index.html','assets/js/app.js')]);
for(const [name,rows] of [['labcorp',lab],['quest',quest]]){
 const codes=new Map;const statuses={};
 for(const r of rows){const code=String(r.testCode||'').trim();if(!codes.has(code))codes.set(code,r);statuses[r.status||'unspecified']=(statuses[r.status||'unspecified']||0)+1}
 console.log('CATALOG '+JSON.stringify({name,rows:rows.length,uniqueCodes:codes.size,statuses,
  references:[...codes.values()].filter(r=>r.status!=='active').slice(0,15).map(r=>({code:r.testCode,name:r.testName,status:r.status}))}));
}
const res=await fetch('https://www.labcorp.com/en.sitemap.tests-sitemap.xml',{signal:AbortSignal.timeout(25000)});
if(!res.ok)throw Error('Sitemap status '+res.status);
const xml=await res.text();const urls=new Map;
for(const [,url,code] of xml.matchAll(/<loc>(https:\/\/www\.labcorp\.com\/tests\/(\d{3,8})\/[^<]*)<\/loc>/gi)){
 if(!urls.has(code))urls.set(code,url);
}
const existing=new Map(lab.map(r=>[String(r.testCode||'').trim(),r]));
const eligible=[...urls].filter(([code])=>existing.get(code)?.status!=='active');
const noRecord=eligible.filter(([code])=>!existing.has(code));
const statusCount={};
for(const [code] of eligible){const s=existing.get(code)?.status||'not-in-calculator';statusCount[s]=(statusCount[s]||0)+1}
console.log('OFFICIAL_ELIGIBLE '+JSON.stringify({sitemapCodes:urls.size,nonActive:eligible.length,withoutAnyRecord:noRecord.length,
 statuses:statusCount,sample:eligible.slice(0,30).map(([code,url])=>({code,status:existing.get(code)?.status||'not-in-calculator',name:existing.get(code)?.testName||'',url}))}));
const samples=eligible.slice(0,3);
for(const [code,url] of samples){
 const response=await fetch(url,{signal:AbortSignal.timeout(20000)});
 const html=await response.text();
 console.log('HTML_EXAMPLE '+JSON.stringify({code,url,status:response.status,length:html.length,
  around: ['Specimen Requirements','Result Turnaround Time','Collection Instructions','Storage Instructions'].map(k=>{let pos=html.indexOf(k);return {k,pos,html:pos>=0?html.slice(Math.max(0,pos-300),pos+2500):''}})}));
}


for(const code of ['000315','000653','001305','003046','008037','009165','520057','182337','006668']){
 const url='https://cdos.halfpenny.com/labcorp/TestDisplay/'+code;
 try{
  const resp=await fetch(url,{signal:AbortSignal.timeout(13000)});
  const body=await resp.text();
  const title=body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.slice(0,180);
  console.log('HALFPENNY_CANDIDATE '+JSON.stringify({code,url,status:resp.status,final:resp.url,length:body.length,title,snippet:body.slice(0,600).replace(/\s+/g,' ')}));
 }catch(e){console.log('HALFPENNY_CANDIDATE '+JSON.stringify({code,error:String(e)}))}
}


for(const code of ['001305','006668','003046']){
 const body=await (await fetch('https://cdos.halfpenny.com/labcorp/TestDisplay/'+code,{signal:AbortSignal.timeout(12000)})).text();
 const found=['Specimen','Sample','Collection','Volume','Preferred','Minimum','Temperature','TAT','Turnaround','Test Name','Test Information','Specimen Requirements','Store','Handling'].map(term=>({term,pos:body.toLowerCase().indexOf(term.toLowerCase())})).filter(x=>x.pos>=0);
 console.log('HALFPENNY_STRUCTURE '+JSON.stringify({code,found,html:body.slice(5000,18500)}));
}


for(const code of ['000315','001305','006668','182337']){
 const body=await (await fetch('https://cdos.halfpenny.com/labcorp/TestDisplay/'+code,{signal:AbortSignal.timeout(12000)})).text();
 const values=[...body.matchAll(/<span\b[^>]*class="field-value-([^"]+)"[^>]*>([\s\S]*?)<\/span>/gi)].map(m=>[m[1],m[2].replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()]);
 const tatContext=(()=>{const idx=body.indexOf('TAT');return idx>=0?body.slice(Math.max(0,idx-600),idx+1100):''})();
 console.log('HALFPENNY_KEYS '+JSON.stringify({code,values:values.filter(x=>!/^(?:Result Code|Result Name|LOINC|Reflex Order)/i.test(x[0])).slice(0,60),tatContext,head:body.slice(900,5200)}));
}
