// Review-only LOINC comparison. Never changes production crosswalk.
// Usage: node scripts/audit-loinc-compendia.cjs quest-normalized.json labcorp-normalized.json
// Input row: {orderCode,orderLoinc,resultLoincs:[],specimen,method,reflex,source}.
const fs=require("node:fs"),path=require("node:path");
const load=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const valid=x=>typeof x==="string"&&/^\d{1,7}-\d$/.test(x);
const norm=x=>String(x??"").trim().toLowerCase().replace(/\s+/g," ");
function prepare(records,catalog){
 const codes=new Set(catalog.map(r=>String(r[0]))),seen=new Set(),accepted=[],excluded=[];
 for(const r of records){
 const c=String(r.orderCode??"");
 if(seen.has(c))throw Error("Duplicate order code: "+c);seen.add(c);
 if(!codes.has(c)||!r.source||!Array.isArray(r.resultLoincs)||!r.resultLoincs.length||!r.resultLoincs.every(valid)){excluded.push(c);continue;}
 accepted.push({...r,orderCode:c,signature:[...new Set(r.resultLoincs)].sort().join("|")});
 }return {accepted,excluded};
}
function compare(q,l,qcat,lcat){
 const a=prepare(q,qcat),b=prepare(l,lcat),index=new Map(),review=[];
 for(const r of b.accepted){if(!index.has(r.signature))index.set(r.signature,[]);index.get(r.signature).push(r);}
 for(const r of a.accepted)for(const s of index.get(r.signature)||[]){
 const same=k=>!!norm(r[k])&&norm(r[k])===norm(s[k]);
 review.push({quest:r.orderCode,labcorp:s.orderCode,resultSignature:r.signature,orderLoincMatch:valid(r.orderLoinc)&&r.orderLoinc===s.orderLoinc,specimenMatch:same("specimen"),methodMatch:same("method"),reflexMatch:same("reflex"),questSource:r.source,labcorpSource:s.source,status:"manual-review"});
 }return {questAccepted:a.accepted.length,labcorpAccepted:b.accepted.length,questExcluded:a.excluded,labcorpExcluded:b.excluded,review};
}
module.exports={compare};
if(require.main===module){
 if(process.argv.length!==4)throw Error("Provide two normalized vendor JSON exports");
 const root=path.resolve(__dirname,"..");
 console.log(JSON.stringify(compare(load(process.argv[2]),load(process.argv[3]),load(path.join(root,"assets/search/quest-tests.json")).tests,load(path.join(root,"assets/search/labcorp-tests.json")).tests),null,2));
}
