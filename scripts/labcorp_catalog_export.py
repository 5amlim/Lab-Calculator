#!/usr/bin/env python3
"""Export Labcorp order codes and compare against this calculator; read-only."""
import csv, json, re, subprocess, sys, tempfile
from pathlib import Path
from collections import defaultdict
from html.parser import HTMLParser
from urllib.request import Request, urlopen
from urllib.parse import urlsplit
import argparse

URL="https://cdos.halfpenny.com/labcorp/Home/PrintCatalog"
CODE=re.compile(r"^\d{6}$")
ROOT=Path(__file__).resolve().parents[1]

class Catalog(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.rows=[]; self.row=None; self.cell=None
    def handle_starttag(self, tag, attrs):
        if tag=="tr": self.row=[]; self.cell=None
        elif tag in ("td","th") and self.row is not None: self.cell=[]
        elif tag=="br" and self.cell is not None: self.cell.append(" ")
    def handle_data(self, data):
        if self.cell is not None: self.cell.append(data)
    def handle_endtag(self, tag):
        if tag in ("td","th") and self.cell is not None and self.row is not None:
            self.row.append(" ".join("".join(self.cell).split())); self.cell=None
        elif tag=="tr" and self.row is not None:
            if len(self.row)>=2 and CODE.fullmatch(self.row[0]): self.rows.append(self.row)
            self.row=None; self.cell=None

class Scripts(HTMLParser):
    def __init__(self): super().__init__(); self.files=[]
    def handle_starttag(self, tag, attrs):
        if tag=="script":
            s=urlsplit(dict(attrs).get("src",""))
            if s.path and not s.netloc and not s.scheme: self.files.append(s.path.lstrip("./"))

NODE="""
const fs=require('fs'),vm=require('vm');
const paths=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const ctx={document:{body:{dataset:{galleryLab:'L'}}},console:{log(){},warn(){},error(...a){throw Error(a.join(' '));}}};
ctx.window=ctx;ctx.self=ctx;
vm.createContext(ctx,{codeGeneration:{strings:false,wasm:false}});
for(const p of paths) vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:p,timeout:5000});
if(!Array.isArray(ctx.SEED_TESTS)||!ctx.SEED_TESTS.length)throw Error('No seed data');
process.stdout.write(JSON.stringify(ctx.SEED_TESTS.map(t=>({code:String(t.testCode||'').trim(),name:String(t.testName||''),status:['blocked','pending'].includes(t.status)?t.status:'active'}))));
"""

def seed(repo):
    parser=Scripts(); parser.feed((repo/"labcorp.html").read_text(encoding="utf-8-sig"))
    paths=[]
    for p in parser.files:
        if p.endswith("labcorp-app.js"): break
        if ("labcorp" in p.lower() and "crosswalk" not in p.lower()) or p.endswith("regional-catalog-20261115.js"):
            paths.append(str(repo/p))
    if not any(p.endswith("/labcorp-data.js") for p in paths): raise ValueError("Missing seed file")
    with tempfile.TemporaryDirectory() as d:
        d=Path(d); (d/"load.cjs").write_text(NODE); (d/"paths.json").write_text(json.dumps(paths))
        result=subprocess.run(["node",str(d/"load.cjs"),str(d/"paths.json")],capture_output=True,text=True,check=True)
        return json.loads(result.stdout)

def flag(name):
    if re.search(r"\b(?:hair|fingernails?|toenails?|nails?|insure fit|acid[- ]preserved urine)\b|\b(?:prepared|fixed|stained|unstained)\s+(?:slides?|smears?)\b",name,re.I):
        return "Possible unsupported specimen or supply"
    if re.search(r"\b(?:biopsy|biopsies|tissue|amniotic fluid|chorionic vill|surgical pathology|bone marrow|cytology|paraffin|add[- ]on|susceptibility|isolate|slide|smear)\b",name,re.I):
        return "Specialty or procedural review"
    if re.search(r"\b(?:invitae|single gene|genetic|sequencing|clinical trial|research)\b",name,re.I):
        return "Specialty/account review"
    return "Unverified candidate"

def save(path, fields, rows):
    with path.open("w",encoding="utf-8-sig",newline="") as f:
        w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(rows)

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--repo",type=Path,default=ROOT); ap.add_argument("--output",type=Path,default=ROOT/"catalog-export"); ap.add_argument("--catalog-html",type=Path); args=ap.parse_args()
    out=args.output; out.mkdir(parents=True,exist_ok=True)
    parser=Catalog()
    if args.catalog_html: parser.feed(args.catalog_html.read_text(encoding="utf-8-sig"))
    else:
        with urlopen(Request(URL,headers={"User-Agent":"Mozilla/5.0"}),timeout=90) as r:
            parser.feed(r.read().decode("utf-8-sig",errors="replace"))
    if len(parser.rows)<5000: raise ValueError(f"Only {len(parser.rows)} rows; refusing incomplete export")
    catalog={}
    for row in parser.rows:
        code,name=row[:2]; cpt=row[2] if len(row)>2 else ""
        item=catalog.setdefault(code,{"names":[],"cpts":[]})
        if name not in item["names"]: item["names"].append(name)
        if cpt and cpt not in item["cpts"]: item["cpts"].append(cpt)
    base=[{"test_code":c,"test_name":v["names"][0],"alternate_names":" | ".join(v["names"][1:]),"cpt_codes":" | ".join(v["cpts"]),"source":URL} for c,v in catalog.items()]
    fields=list(base[0]); save(out/"01_full_labcorp_catalog.csv",fields,base)
    (out/"01_all_codes.txt").write_text("\n".join(catalog)+"\n")
    print(f"Catalog: {len(parser.rows)} rows, {len(catalog)} unique codes",flush=True)
    records=seed(args.repo)
    existing=defaultdict(set)
    for t in records:
        if CODE.fullmatch(t["code"]): existing[t["code"]].add(t["status"])
    rows=[]
    for row in base:
        states=existing.get(row["test_code"],set())
        rows.append(dict(row,calculator_status=" / ".join(sorted(states)).upper() if states else "NOT IN CALCULATOR",review_flag=flag(row["test_name"]) if not states or "pending" in states else "Existing status preserved"))
    missing=[r for r in rows if r["calculator_status"]=="NOT IN CALCULATOR"]
    candidates=[r for r in missing if r["review_flag"]=="Unverified candidate"]
    flagged=[r for r in missing if r["review_flag"]!="Unverified candidate"]
    pending=[r for r in rows if "PENDING" in r["calculator_status"]]
    for name, group in [("02_catalog_crossmatch",rows),("03_all_missing_tests",missing),("04_missing_candidates",candidates),("05_missing_flagged_for_review",flagged),("06_existing_pending_matches",pending)]:
        save(out/(name+".csv"),fields+["calculator_status","review_flag"],group)
    (out/"03_missing_codes.txt").write_text("\n".join(r["test_code"] for r in missing)+"\n")
    save(out/"07_calculator_codes_not_in_catalog.csv",["test_code","test_name","status"],[{"test_code":t["code"],"test_name":t["name"],"status":t["status"]} for t in records if t["code"] not in catalog])
    summary={"catalog_rows":len(parser.rows),"unique_catalog_codes":len(catalog),"duplicate_catalog_rows":len(parser.rows)-len(catalog),"existing_codes":len(existing),"existing_active":sum("active" in v for v in existing.values()),"existing_pending":sum("pending" in v for v in existing.values()),"existing_blocked":sum("blocked" in v for v in existing.values()),"missing_codes":len(missing),"candidate_codes":len(candidates),"flagged_codes":len(flagged),"pending_catalog_matches":len(pending)}
    (out/"00_summary.json").write_text(json.dumps(summary,indent=2)+"\n")
    print(json.dumps(summary,indent=2))
    print("Name-only review flags are preliminary; no specimen instructions inferred or live records changed.")
if __name__=="__main__":
    main()
