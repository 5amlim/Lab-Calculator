// Diagnostics only: check official test directories from GitHub Actions runner.
const targets=[
  'https://www.labcorp.com/robots.txt',
  'https://www.labcorp.com/sitemap.xml',
  'https://www.labcorp.com/sitemap_index.xml',
  'https://www.labcorp.com/en.sitemap.tests-sitemap.xml',
  'https://www.labcorp.com/tests/005595/hemoglobin-hb-free-plasma',
  'https://www.labcorp.com/tests/005595',
  'https://www.labcorp.com/tests/000018',
  'https://testdirectory.questdiagnostics.com/test/test-detail/27/?cc=MET',
  'https://testdirectory.questdiagnostics.com/test/test-detail/27/?cc=PHP'
];
for(const url of targets){
 try{
  const signal=AbortSignal.timeout(12000);
  const r=await fetch(url,{signal,headers:{'User-Agent':'Mozilla/5.0 (compatible; LabCalculatorTatAudit/1.0)','Accept':'text/html'}});
  const html=await r.text();
  const title=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const tat=html.match(/Result Turnaround Time[\s\S]{0,400}/i)?.[0]?.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');
  console.log(JSON.stringify({url,status:r.status,final:r.url,bytes:html.length,title,tat:tat?.slice(0,200),begin:html.slice(0,150),sitemaps:html.split('\n').filter(x=>/sitemap/i.test(x)).slice(0,15).map(x=>x.slice(0,200)),locCount:[...html.matchAll(/<loc>([^<]+)<\/loc>/gi)].length,locs:[...html.matchAll(/<loc>([^<]+)<\/loc>/gi)].slice(0,20).map(x=>x[1]),has005595:html.includes('/005595/')}));
 }catch(e){console.log(JSON.stringify({url,error:String(e)}))}
}

try {
 const page='https://testdirectory.questdiagnostics.com/test/test-detail/231/?cc=MET';
 const response=await fetch(page,{signal:AbortSignal.timeout(20000)});
 const html=await response.text();
 const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/gi)].map(m=>m[1]);
 console.log('QUEST_SCRIPTS '+JSON.stringify(scripts.slice(-20)));
 const main=scripts.find(x=>/main[.-].*\.js(?:\?|$)/i.test(x))||scripts.find(x=>/main.*\.js/i.test(x));
 if(main){
  const url=new URL(main,page).href;
  const r=await fetch(url,{signal:AbortSignal.timeout(20000)});
  const js=await r.text();
  const snippets=[];
  for(const key of ['apiUrl','apiBaseUrl','turnaroundTime','turnAroundTime','turnaround','test-detail','serviceArea','testDetail']){
   const index=js.toLowerCase().indexOf(key.toLowerCase());
   if(index>=0)snippets.push({key,segment:js.slice(Math.max(0,index-170),index+300)});
  }
  const hosts=[...new Set([...js.matchAll(/https?:\/\/[a-z0-9.-]+(?:\/[a-z0-9/_-]*)?/gi)].map(m=>m[0]))]
    .filter(x=>!/fonts|google|w3|gstatic|facebook|googletag|analytics/i.test(x)).slice(0,35);
  console.log('QUEST_BUNDLE '+JSON.stringify({url,status:r.status,bytes:js.length,snippets,hosts}));
 }
}catch(e){console.log('QUEST_PROBE_ERROR '+String(e))}
