#!/usr/bin/env python3
"""Build review reports from saved Labcorp exact-code page captures."""

import argparse
from collections import defaultdict, Counter
import csv
import json
from pathlib import Path
import re
from urllib.parse import urlsplit


def exact_public_page(row):
    url = urlsplit(row["url"])
    return (row["source"] == "public" and url.scheme == "https"
            and url.netloc == "www.labcorp.com"
            and url.path.startswith(f"/tests/{row['code']}/")
            and row.get("fields", {}).get("labcorpTestNumber") == row["code"])


def loinc_format(code):
    if not re.fullmatch(r"[1-9][0-9]{0,6}-[0-9]", code):
        return "Unexpected syntax"
    digits = [int(digit) for digit in reversed(code.replace("-", ""))]
    total = sum(sum(divmod(digit * 2, 10))
                if i % 2 else digit for i, digit in enumerate(digits))
    return "Checksum valid" if total % 10 == 0 else "Invalid checksum"


def write_csv(path, headers, rows):
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.writer(file, lineterminator="\n")
        writer.writerow(headers)
        writer.writerows(rows)


def build_reports(captures, pending, inventory, output):
    now = {(row["source"], row["code"]): row for row in captures}
    by_code = defaultdict(list)
    mappings = {}
    for (_, code), row in sorted(now.items()):
        if row["status"] != "exact page captured":
            continue
        by_code[code].append(row)
        if not exact_public_page(row):
            continue
        for published in row.get("loinc", []):
            for kind, result_code, term, name in (
                ("order", "", published["orderLoinc"], ""),
                ("result", published["resultCode"], published["resultLoinc"], published["resultName"]),
            ):
                if term:
                    mappings[code, kind, result_code, term] = [
                        code, kind, result_code, term, name, inventory.get(code, "absent"),
                        row["url"], row["accessDate"], row["sha256"], loinc_format(term),
                        "Published assignment. Current LOINC release and term axes require review.",
                    ]

    triage = Counter()
    pending_rows = []
    for row in pending:
        code = row["code"]
        captured = by_code[code]
        with_fields = [page for page in captured
                       if set(page.get("fields", {})) - {"labcorpTestNumber"}]
        if with_fields:
            stage = "Fields captured. Review missing requirements and clinic capability."
        elif captured:
            stage = "Exact code captured. Clinical fields unavailable."
        else:
            stage = "Exact page unavailable. Request receiving-lab documentation."
        triage[stage] += 1
        pending_rows.append([
            code, row["name"], row["reason"], stage,
            " | ".join(f"{page['source']}: {', '.join(sorted(page['fields']))}" for page in with_fields),
            " | ".join(page["url"] for page in captured) or row["source"],
            " | ".join(sorted({page["accessDate"] for page in captured})),
            "Hold from collection",
        ])
    write_csv(output / "LABCORP_PENDING_EVIDENCE_REVIEW.csv",
              ["code", "name", "reason", "evidenceStage", "capturedFields",
               "source", "accessDate", "collectionStatus"], pending_rows)
    write_csv(output / "LABCORP_PUBLISHED_LOINC_INTAKE.csv",
              ["orderCode", "kind", "resultCode", "loinc", "resultName", "runtimeDisposition",
               "source", "accessDate", "sourceSha256", "formatCheck", "verificationStatus"],
              [mappings[key] for key in sorted(mappings)])
    return {
        "pendingEvidence": dict(triage),
        "publishedLoincAssignments": dict(Counter(key[1] for key in mappings)),
        "publicCodesWithPublishedAssignments": len({key[0] for key in mappings}),
        "formatIssues": sum(row[9] != "Checksum valid" for row in mappings.values()),
    }


def main():
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("--captures", type=Path, nargs="+", required=True)
    cli.add_argument("--pending", type=Path, required=True)
    cli.add_argument("--inventory", type=Path, required=True)
    cli.add_argument("--out", type=Path, required=True)
    args = cli.parse_args()
    captures = []
    for path in args.captures:
        with path.open(encoding="utf-8") as file:
            captures.extend(json.loads(line) for line in file if line.strip())
    with args.inventory.open(encoding="utf-8") as file:
        inventory = {row["code"]: row["disposition"] for row in csv.DictReader(file)
                     if row["lab"] == "labcorp"}
    with args.pending.open(encoding="utf-8") as file:
        pending = list(csv.DictReader(file))
    args.out.mkdir(parents=True, exist_ok=True)
    print(json.dumps(build_reports(captures, pending, inventory, args.out), indent=2))


if __name__ == "__main__":
    main()
