#!/usr/bin/env python3
"""Reconcile Labcorp listings and collect exact-code evidence in resumable batches."""
import argparse
import csv
import hashlib
import html
import json
import re
import time
import xml.etree.ElementTree as ET
from collections import Counter
from datetime import datetime
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

CDOS_DETAIL = "https://cdos.halfpenny.com/labcorp/TestDisplay/"
PUBLIC_INDEX = "https://www.labcorp.com/en.sitemap.tests-sitemap.xml"
CDOS_INDEX = "https://cdos.halfpenny.com/labcorp/Home/PrintCatalog"
STOP_STATUSES = {"HTTP 401", "HTTP 403", "HTTP 429", "HTTP 503"}
RETRY_STATUSES = STOP_STATUSES | {"network error"}
PUBLIC_PATH = re.compile(r"/tests/(?P<code>[0-9]{3,8})/[^/]+/?")
LOINC = re.compile(r"[0-9]{1,7}-[0-9]")
PUBLIC_FIELDS = set("""
labcorpTestNumber synonyms methodology resultTurnaroundTime testIncludes specimen
volume minimumVolume container collectionInstructions patientPreparation
stabilityRequirements storageInstructions causesForRejection specialInstructions
""".split())
CDOS_FIELDS = set("""
synonym specimentype container volume minvolume minimumvolume specimencollection
rejection temperature methodology stability testingfrequency patientprep fasting
specialinstructions
""".split())


def clean(markup):
    markup = re.sub(r"(?i)<br\s*/?>|</(?:tr|p|li)>", " | ", markup)
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", markup)).split()).strip(" |")


def public_urls(path):
    sitemap = ET.parse(path)
    urls = {}
    for node in sitemap.findall(".//{*}loc"):
        parsed = urlsplit(node.text or "")
        match = PUBLIC_PATH.fullmatch(parsed.path)
        if parsed.scheme == "https" and parsed.netloc == "www.labcorp.com" and match:
            urls.setdefault(match["code"], node.text)
    if len(urls) < 2000:
        raise ValueError(f"Unexpectedly small public test sitemap: {len(urls)} codes")
    return urls


def extract_public(page, code):
    title = re.search(r"<title[^>]*>\s*([0-9]+)\s*:\s*(.*?)</title>", page, re.I | re.S)
    if not title or title[1] != code:
        return None
    blocks = re.split(r'<div\b[^>]*class="[^"]*cmp-contentfragment__element--(\w+)[^"]*"[^>]*>', page)
    mapped = {}
    fields = {}
    for field, body in zip(blocks[1::2], blocks[2::2]):
        if field == "loincCodesJson":
            for row in re.findall(r"<tr\b[^>]*>(.*?)</tr>", body, re.I | re.S):
                cells = [clean(cell) for cell in re.findall(r"<td\b[^>]*>(.*?)</td>", row, re.I | re.S)]
                if len(cells) == 7 and cells[0] == code and cells[3]:
                    _, _, order, result, name, units, term = cells
                    mapped[result, term] = dict(orderLoinc=order if LOINC.fullmatch(order) else "",
                        resultCode=result, resultName=name, units=units,
                        resultLoinc=term if LOINC.fullmatch(term) else "")
        if field == "labcorpTestNumber":
            marker = re.search(r'data-tid="([0-9]+)"', body)
            if marker:
                fields[field] = marker[1]
        elif field in PUBLIC_FIELDS:
            value = re.search(r'<(div|span)\b[^>]*cmp-contentfragment__element-value[^>]*>(.*?)</\1>', body, re.I | re.S)
            if value:
                fields[field] = clean(value[2])
    if fields.get("labcorpTestNumber") != code:
        return None
    return dict(name=clean(title[2]).split(" | Labcorp")[0], fields=fields, loinc=list(mapped.values()))


def extract_cdos(page, code):
    if not re.search(rf">\s*Test Code:\s*{re.escape(code)}\s*</span>", page):
        return None
    fields = {}
    for field, value in re.findall(r'<span\b[^>]*class="field-value-([^"]+)"[^>]*>(.*?)</span>', page, re.I | re.S):
        key = field.lower()
        if key in CDOS_FIELDS and key not in fields:
            fields[key] = clean(value)
    return dict(fields=fields)


def fetch(source, code, url, date):
    evidence = dict(source=source, code=code, url=url, accessDate=date)
    try:
        request = Request(url, headers={"User-Agent": "LabCalculatorAudit/1.0", "Accept": "text/html"})
        with urlopen(request, timeout=20) as response:
            final = urlsplit(response.url)
            public = PUBLIC_PATH.fullmatch(final.path)
            exact = ((source == "public" and final.netloc == "www.labcorp.com" and public and public["code"] == code)
                     or (source == "cdos" and final.netloc == "cdos.halfpenny.com" and final.path.lower() == f"/labcorp/testdisplay/{code}"))
            if final.scheme != "https" or not exact:
                return dict(evidence, status="unexpected redirect")
            payload = response.read(2_000_001)
            if len(payload) > 2_000_000:
                return dict(evidence, status="oversize response")
        extracted = (extract_public if source == "public" else extract_cdos)(payload.decode("utf-8", "replace"), code)
        if not extracted:
            return dict(evidence, status="exact order page unavailable")
        return dict(evidence, status="exact page captured", sha256=hashlib.sha256(payload).hexdigest(), **extracted)
    except HTTPError as error:
        return dict(evidence, status=f"HTTP {error.code}")
    except (URLError, TimeoutError) as error:
        return dict(evidence, status="network error", detail=str(error))


def main():
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("--inventory", type=Path, required=True, help="Runtime RECORD_CHECKPOINT.csv or TEST_INVENTORY.csv")
    cli.add_argument("--sitemap", type=Path, required=True)
    cli.add_argument("--cdos", type=Path, required=True, help="01_full_labcorp_catalog.csv from labcorp_catalog_export.py")
    cli.add_argument("--out", type=Path, required=True)
    cli.add_argument("--source", choices=["public", "cdos"], default="public")
    cli.add_argument("--limit", type=int, default=0, help="Maximum requests this run. Zero reconciles listings only.")
    cli.add_argument("--interval", type=float, default=1.25, help="Minimum seconds between individual requests")
    args = cli.parse_args()
    if args.interval < 1 or args.limit < 0:
        cli.error("Use a request interval of at least one second and a nonnegative batch size.")
    date = datetime.now(ZoneInfo("America/Los_Angeles")).date().isoformat()
    with args.inventory.open(encoding="utf-8-sig") as stream:
        inventory = {row["code"]: row for row in csv.DictReader(stream) if row["lab"] == "labcorp"}
    if not inventory:
        raise ValueError("No Labcorp runtime rows found")
    with args.cdos.open(encoding="utf-8-sig") as stream:
        cdos = {row["test_code"]: row["test_name"] for row in csv.DictReader(stream)
                if re.fullmatch(r"[0-9]{6}", row["test_code"])}
    if len(cdos) < 5000:
        raise ValueError(f"Unexpectedly small CDOS catalog: {len(cdos)} codes")
    public = public_urls(args.sitemap)
    args.out.mkdir(parents=True, exist_ok=True)
    codes = sorted(public.keys() | cdos.keys() | inventory.keys())
    with (args.out/"SOURCE_LISTING_RECONCILIATION.csv").open("w", newline="") as stream:
        writer = csv.writer(stream, lineterminator="\n")
        writer.writerow(["code", "runtimeDisposition", "CDOSListing", "publicListing"])
        for code in codes:
            writer.writerow([code, inventory.get(code, {}).get("disposition", "missing"),
                "yes" if code in cdos else "", "yes" if code in public else ""])
    summary = dict(accessDate=date, publicSitemap=PUBLIC_INDEX, cdosCatalog=CDOS_INDEX,
        publicCodes=len(public), cdosCodes=len(cdos), runtimeRecords=len(inventory),
        unionCodes=len(public.keys() | cdos.keys()), publicMissing=len(public.keys()-inventory.keys()),
        cdosMissing=len(cdos.keys()-inventory.keys()),
        runtimeAbsentFromBoth=len(inventory.keys()-(cdos.keys() | public.keys())),
        dispositionInPublic=dict(Counter(inventory[c]["disposition"] for c in inventory.keys() & public.keys())),
        dispositionInCdos=dict(Counter(inventory[c]["disposition"] for c in inventory.keys() & cdos.keys())))
    (args.out/"SOURCE_LISTING_SUMMARY.json").write_text(json.dumps(summary,indent=2)+"\n")
    print(json.dumps(summary), flush=True)
    if not args.limit:
        return

    numeric_inventory = {code for code in inventory if re.fullmatch(r"[0-9]{6}", code)}
    urls = public if args.source == "public" else {
        code: CDOS_DETAIL+code for code in cdos.keys() | numeric_inventory
    }
    checkpoint = args.out/(args.source+"-evidence.jsonl")
    results = {}
    if checkpoint.exists():
        with checkpoint.open() as stream:
            for line in stream:
                row = json.loads(line)
                results[row["code"]] = row
    # Review missing and pending records first, then active routes, then exclusions.
    order = {"missing": 0, "pending": 1, "reference": 1, "active": 2, "blocked": 3}
    work = sorted(urls, key=lambda code: (order.get(inventory.get(code, {}).get("disposition", "missing"), 4), code))
    attempted = 0
    with checkpoint.open("a", encoding="utf-8") as stream:
        for code in work:
            if code in results and results[code]["status"] not in RETRY_STATUSES:
                continue
            result = fetch(args.source, code, urls[code], date)
            stream.write(json.dumps(result, ensure_ascii=False)+"\n")
            stream.flush()
            results[code] = result
            attempted += 1
            if result["status"] in STOP_STATUSES:
                print(f"Stopped at {code} with {result['status']}.", flush=True)
                break
            if attempted % 25 == 0:
                print(f"{args.source}: {attempted} attempted this batch", flush=True)
            if attempted >= args.limit:
                break
            time.sleep(args.interval)
    print(json.dumps(dict(source=args.source, attempted=attempted, checkpointCodes=len(results),
        remaining=sum(code not in results or results[code]["status"] in RETRY_STATUSES for code in urls), statuses=dict(Counter(row["status"] for row in results.values())))), flush=True)


if __name__ == "__main__":
    main()
