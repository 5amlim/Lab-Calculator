// Diagnostics only: check official test directories from GitHub Actions runner.
const targets=[
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
  console.log(JSON.stringify({url,status:r.status,final:r.url,bytes:html.length,title,tat:tat?.slice(0,200),begin:html.slice(0,150)}));
 }catch(e){console.log(JSON.stringify({url,error:String(e)}))}
}
