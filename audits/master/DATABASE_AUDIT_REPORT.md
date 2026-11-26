# Quest and Labcorp calculator audit

Audit date November 25, 2026. Baseline commit `b81f79958661971bad3a6799d6a0465a7525156e`. This checkpoint covers the production runtime inventory and the first official evidence batch. Clinical verification remains incomplete.

## Catalog reconciliation

| Measure | Quest before | Quest after | Labcorp before | Labcorp after |
|---|---:|---:|---:|---:|
| Runtime catalog records | 3,829 | 3,829 | 6,601 | 6,601 |
| Active runtime records | 3,315 | 3,315 | 6,015 | 6,014 |
| Active codes in published search | 3,314 | 3,314 | 6,015 | 6,014 |
| Blocked runtime records | 514 | 514 | 455 | 456 |
| Pending runtime records | 0 | 0 | 131 | 131 |
| Fully clinically verified in this audit | 0 | 0 | 0 | 0 |
| Partially verified in this audit | 0 | 7 | 0 | 4 |
| Clinical conflict recorded | 0 | 1 | 0 | 1 |
| Current source inaccessible | 0 | 4 | 0 | 0 |
| Specific official field unavailable | 0 | 0 | 0 | 1 |
| Official review unstarted in this audit | 3,829 | 3,817 | 6,601 | 6,595 |
| Runtime records corrected | 0 | 1 | 0 | 1 |
| Runtime records added or removed | 0 | 0 | 0 | 0 |
| Published result-level LOINC mappings captured in this audit | 0 | 1 | 0 | 2 |

Quest's additional active row is the existing uncoded `XXX` 24-hour urine reference. It stays outside the numeric published search index. Labcorp's 131 pending rows are directory references held from normal collection. Runtime active status, published indexing and local regional acceptance answer different questions. These counts exclude staff-created data, browser overrides, and patient data.

All 10,430 runtime records have a reproducible inventory and audit status. This pass attached an evidence or attempted-source disposition to 18 records. Eleven of those are partially verified. An inventory status does not establish clinical accuracy. The official denominator for a complete missing-code audit is still open, as are all-record field verification and the four-market reconciliation.

## Changes and clinical review

- Labcorp 501533 is blocked before cart selection and public indexing. The exact specialty test page specifies a different preservative and temperature than the historical CDOS route. Receiving-lab confirmation is required before the code can return to the cart.
- Quest 10676 retains the established urine-only exception and now displays one clear volume-confirmation instruction. The exact public detail page could not be retrieved. The published Quest cytology manual corroborates the specimen type, and local acceptance, volume and stability remain open.
- Quest 8477 and 1430 retain the directory-listed plasma-vial alternative. The current directory does not establish transfer into a fresh fluoride/oxalate tube for 8477. Quest 8280's preserved UA tube is an alternative to the unpreserved aliquot. Quest 229's sterile cup acceptance remains an explicit receiving-lab confirmation point covered by the existing clinician-facing note.
- Six runtime routes have an unspecified temperature. One is the uncoded Quest reference, four Quest exact-code sources were unavailable, and Labcorp 164798's exact source omits shipment temperature. Review queue entries preserve these distinctions.
- Labcorp 005215's official TAT starts at pickup and is already labeled accordingly in the calculator. No regional substitution was made.
- Vendor-published LOINC results were recorded separately from order codes. No inferred mapping was promoted. Exact order-to-result compendia and receiving-lab region exports are outstanding.

## Conversion reconciliation

| Measure | Before | After |
|---|---:|---:|
| Active Quest codes represented | 3,314 | 3,314 |
| Unique active candidate pairs | 1,456 | 1,456 |
| Distinct active Quest codes with a candidate | 1,456 | 1,456 |
| Distinct active Labcorp codes with a candidate | 1,396 | 1,396 |
| Active review-only pairs | 799 | 800 |
| Relationship rows, including legacy and uncoded | 2,257 | 2,258 |
| Quest active codes without a candidate or review reference | 1,228 | 1,227 |

The count of distinct destination codes is lower because multiple Quest orders can have the same Labcorp candidate. The raw 16802 pair now consistently points to Labcorp 102525, which includes eAG. The previous raw target, 001453, did not specify eAG. The workbook had already applied that correction in the fully loaded browser, so the runtime candidate count is unchanged. Workbook fallback now preserves explicit candidates and review-only decisions. Quest 937 and Labcorp 028142 are a partial panel relationship visible from both directions and excluded from automatic conversion. Existing candidate pairs require separate clinical review.

## Source and calculation architecture

The live catalog is the result of HTML script order, seed data, directory bundles, and calculator policy. Quest begins at `assets/js/data.js`; Labcorp begins at `labcorp-data.js`. The two HTML entry points load the authoritative overlays before the app. Quest also loads compressed directory references and a final inline override. The generated files in `assets/search/` feed external search and reverse lookup. The converter uses `labcorp-crosswalk-data.js` with workbook fallback and a generated Labcorp search index. Region and TAT overlays are distinct from test order and specimen routes.

The audit loader now executes both external and inline scripts in production order and waits for the Quest catalog overlay. It then captures the clean published catalog after runtime policy, with no staff-created entries or saved overrides. Existing source bundles, TAT scripts, LOINC importer, audit history and calculator-specific presentation are tracked in the registry and linked reports.

The new pull request workflow runs structural integrity checks, diffs the before and after catalogs, checks reviewed values in active clinical changes against field evidence, and uploads the report and test results. It performs no vendor requests. The workflow can be selected as a required GitHub check so deployments from the default branch depend on it. Existing branch and deployment settings must be verified separately.

## Audit files and reproduction

- `DATABASE_BASELINE.json` and `DATABASE_AUDIT_SUMMARY.json` contain baseline and current totals.
- `AUDIT_CHECKPOINT.json` records scope and how to resume. `RECORD_CHECKPOINT.csv` contains each runtime record and its status. `FIELD_EVIDENCE.json` records the exact completed batch.
- `CONTAINER_MAPPING_AUDIT.csv` lists active collection and submission labels and route counts. Full per-route data are generated on demand.
- `CUSTOM_RULES_REGISTRY.json` and `HISTORICAL_CORRECTIONS_AUDIT.csv` document discovered rules and overrides within this checkpoint.
- The report generator writes `TEST_INVENTORY.csv`, `SPECIMEN_CONTAINER_ROUTES.csv`, `CROSSWALK_AUDIT.csv`, `CLINICAL_FIELD_CHANGES.csv` and the record-hash snapshot. The inventory can be filtered by verification status, blocked and pending disposition, and source.

Run from the calculator checkout with Node 22 or newer.

```sh
git worktree add --detach ../calculator-audit-base b81f79958661971bad3a6799d6a0465a7525156e
node scripts/audit-calculator-database.mjs --root ../calculator-audit-base --out ../calculator-base-report
node scripts/audit-calculator-database.mjs --out ../calculator-current-report --baseline ../calculator-base-report/DATABASE_SNAPSHOT.json --check
node --test tests/*.test.cjs
```

## Outstanding scope

Continue the unexplored exact-code Quest and Labcorp records from the record inventory. Resolve held specimen routes and calculate manual review priority for active tests with missing temperature, suspected discrepancies in declared versus calculated aliquot counts, and mixed or dedicated draws. Reconcile official catalog omissions, current discontinuations, regional acceptance, and special instructions in free text. Obtain authorized vendor extracts for order and result LOINC, verify candidate and unpaired orders from both sides, and record clinically significant panel and method differences. Review the index, cart, bag and print UI in supported browsers before deployment. A structural pass or passing test suite does not close these tasks.
