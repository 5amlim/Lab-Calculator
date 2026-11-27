#!/usr/bin/env python3
"""Read-only, bulk comparison of an indexed Labcorp client print catalog.
This is client-specific source screening, NOT receiving-account clinical approval.
One public request per invocation; no retry or bypass of access restrictions.
"""
import argparse
import csv
import hashlib
import json
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen

URL = "https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog"

class CatalogRows(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.rows = []
        self.row = None
        self.cell = None

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self.row = []
            self.cell = None
        elif tag == "td" and self.row is not None:
            self.cell = []
        elif tag in {"br", "div", "p", "li"} and self.cell is not None:
            self.cell.append(" ")

    def handle_data(self, data):
        if self.cell is not None:
            self.cell.append(data)

    def handle_endtag(self, tag):
        if tag == "td" and self.row is not None and self.cell is not None:
            self.row.append(" ".join("".join(self.cell).split()))
            self.cell = None
        elif tag == "tr" and self.row is not None:
            self.rows.append(self.row)
            self.row = None
            self.cell = None

def parse_catalog(page):
    parser = CatalogRows()
    parser.feed(page)
    data = defaultdict(list)
    for row in parser.rows:
        # Require the performing lab and exact code in dedicated columns.
        if len(row) < 3 or row[0].casefold() != "labcorp" or not re.fullmatch(r"[0-9]{6}", row[1]):
            continue
        description = " ".join(row[2:-1] if len(row) > 3 else row[2:])
        fields = {}
        markers = list(re.finditer(r"\b(Container|Temperature|Stability|Place of Service|Alternate IDs|Synonyms):\s*", description, re.I))
        for i, match in enumerate(markers):
            end = markers[i + 1].start() if i + 1 < len(markers) else len(description)
            key = match[1].lower()
            value = description[match.end():end].strip()
            if value:
                fields[key] = " | ".join(filter(None, (fields.get(key), value)))
        data[row[1]].append(fields)
    return data

def family(value):
    """Conservative exact or near-exact single-container families only."""
    v = value.casefold().strip().replace("–", "-")
    patterns = {
        "sst": r"(?:sst(?:\s*/\s*gold)?|gel[- ]barrier tube|serum separator tube|gold[- ]top tube)",
        "red": r"(?:red top|red[- ]top tube|plain red[- ]top tube)(?:\s*\(no additive\))?",
        "edta": r"(?:lavender edta|lavender[- ]top\s*\(edta\)\s*tube|lavender[- ]top tube\s*\(edta\)|lavender[- ]top edta tube|lavender[- ]top tube|edta tube)",
        "citrate": r"(?:light blue(?: sodium citrate)?|light blue[- ]top(?:\s*\(sodium citrate\))? tube|blue[- ]top\s*\(sodium citrate\)\s*tube)",
        "acd": r"(?:yellow acd|yellow[- ]top\s*\(acd(?:-a)?\)\s*tube|yellow[- ]top acd tube)",
        "royal-blue-edta": r"(?:royal blue edta(?:\s*\([^)]*\))?|royal blue[- ]top\s*\(edta\)\s*tube)",
        "royal-blue-serum": r"(?:royal blue no additive(?:\s*\([^)]*\))?|royal blue[- ]top\s*\(no additive\)\s*tube)",
    }
    for key, pattern in patterns.items():
        if re.fullmatch(pattern, v):
            return key
    return None

def simple_container(value):
    # No semantic inference from free text, multi-tube counts, or ambiguous
    # "sterile container". Those entries remain in the manual queue.
    return family(value)

def simple_temperature(value):
    v = re.sub(r"\s+", " ", value.casefold()).strip().rstrip(".")
    # Explicit simple transport directions only, no stability tables,
    # storage durations, conditional statements or "do not freeze" inference.
    if re.fullmatch(r"(?:maintain specimen at )?(?:room temp(?:erature)?|ambient)", v):
        return "Room Temperature"
    if re.fullmatch(r"(?:refrigerate(?: specimen)?|refrigerated)(?:\s*(?:at )?\(?2\s*(?:-|to)\s*8\s*(?:°|degrees?)?\s*c\)?)?", v):
        return "Refrigerated"
    if re.fullmatch(r"(?:freeze|frozen)(?:\s*\(ship on dry ice\))?", v):
        return "Frozen"
    return None

def compare(catalog, routes):
    by_code = defaultdict(list)
    for row in routes:
        if row["lab"] == "labcorp" and row["disposition"] == "active":
            by_code[row["code"]].append(row)
    counts = Counter()
    fields = Counter()
    output = []
    for code, rr in sorted(by_code.items()):
        counts["activeCodes"] += 1
        entries = catalog.get(code, [])
        if not entries:
            counts["absentFromClientListing"] += 1
            continue
        counts["exactCodeListed"] += 1
        unique = {json.dumps(e, sort_keys=True) for e in entries}
        if len(unique) != 1:
            counts["conflictingListingRows"] += 1
            continue
        source = entries[0]
        if not source:
            counts["listedWithoutFields"] += 1
            continue
        counts["codesWithSourceFields"] += 1
        if len(rr) != 1:
            counts["multiRouteNeedsReview"] += 1
            continue
        route = rr[0]
        for key, source_key, stored_key, normalize in [
            ("collectionContainer", "container", "draw", simple_container),
            ("shipmentTemperature", "temperature", "temperature", simple_temperature),
        ]:
            published = source.get(source_key, "")
            stored = route.get(stored_key, "")
            a, b = normalize(stored), normalize(published)
            # A client container listing does not always describe collection
            # rather than submission. Never treat a mismatch as proof of error.
            if not published:
                status = "source field missing"
            elif not a or not b:
                status = "complex or ambiguous; review"
            elif a == b:
                status = "simple agreement"
            else:
                status = "possible difference; review"
            fields[key + ": " + status] += 1
            output.append({"code": code, "id": route["id"], "field": key,
                "runtimeValue": stored, "sourceValue": published,
                "normalizedRuntime": a or "", "normalizedSource": b or "",
                "outcome": status, "source": URL})
        # Stability is source intake only. Print listings don't reliably
        # identify all conditions and may omit volumes/processing.
        if source.get("stability"):
            counts["codesWithStabilityText"] += 1
    return {"counts": dict(counts), "fieldOutcomes": dict(fields)}, output

def main():
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("--routes", type=Path, required=True)
    cli.add_argument("--out", type=Path, required=True)
    cli.add_argument("--html", type=Path, help="Use a previously acquired public catalog snapshot")
    args = cli.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    report = {"source": URL, "accessDate": datetime.now(timezone.utc).date().isoformat(),
        "scope": "Public KSB client listing. Screening only; not Sollis receiving account approval.",
        "status": "unavailable"}
    try:
        if args.html:
            payload = args.html.read_bytes()
        else:
            request = Request(URL, headers={"User-Agent":"LabCalculatorAudit/1.0","Accept":"text/html"})
            with urlopen(request, timeout=25) as response:
                if response.geturl().lower().rstrip("/") != URL.lower():
                    raise ValueError("Unexpected source redirect")
                payload = response.read(25_000_001)
            if len(payload) > 25_000_000:
                raise ValueError("Catalog exceeds safe input size")
        catalog = parse_catalog(payload.decode("utf-8", "replace"))
        if len(catalog) < 1000:
            raise ValueError(f"Insufficient exact-code rows ({len(catalog)}); parser or access failure")
        with args.routes.open(newline="", encoding="utf-8") as f:
            comparison, rows = compare(catalog, csv.DictReader(f))
        report.update(status="screened", sourceSha256=hashlib.sha256(payload).hexdigest(),
            exactListingCodes=len(catalog), **comparison)
        with (args.out/"LABCORP_BULK_CLIENT_SCREEN.csv").open("w", newline="", encoding="utf-8") as f:
            cols = ["code","id","field","runtimeValue","sourceValue","normalizedRuntime","normalizedSource","outcome","source"]
            writer = csv.DictWriter(f, fieldnames=cols)
            writer.writeheader()
            writer.writerows(rows)
    except (OSError, ValueError) as error:
        report["error"] = str(error)
    (args.out/"LABCORP_BULK_CLIENT_SCREEN.json").write_text(json.dumps(report, indent=2)+"\n")
    print("LABCORP_BULK_CLIENT_SCREEN "+json.dumps(report), flush=True)

if __name__ == "__main__":
    main()
