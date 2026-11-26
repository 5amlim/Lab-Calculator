# Quest and Labcorp calculator audit

Audit date November 26, 2026. Baseline commit `b81f79958661971bad3a6799d6a0465a7525156e`. This checkpoint covers the production runtime inventory and targeted clinical review and the Labcorp public listing and 2026 bulletin reconciliation. Clinical verification remains incomplete.

## Catalog reconciliation

| Measure | Quest before | Quest after | Labcorp before | Labcorp after |
|---|---:|---:|---:|---:|
| Runtime catalog records | 3,829 | 3,829 | 6,601 | 6,601 |
| Active runtime records | 3,315 | 3,314 | 6,015 | 5,987 |
| Active codes in published search | 3,314 | 3,313 | 6,015 | 5,987 |
| Blocked runtime records | 514 | 515 | 455 | 485 |
| Pending runtime records | 0 | 0 | 131 | 129 |
| Fully clinically verified in this audit | 0 | 0 | 0 | 0 |
| Partially verified in this audit | 0 | 15 | 0 | 42 |
| Clinical conflict recorded | 0 | 1 | 0 | 1 |
| Current source inaccessible | 0 | 3 | 0 | 0 |
| Specific official field unavailable | 0 | 0 | 0 | 1 |
| Official review unstarted in this audit | 3,829 | 3,809 | 6,601 | 6,527 |
| Runtime records corrected | 0 | 7 | 0 | 68 |
| Runtime records added or removed | 0 | 0 | 0 | 0 |
| Published result-level LOINC mappings captured in this audit | 0 | 1 | 0 | 9 |
| Published order-level LOINC mappings captured in this audit | 0 | 0 | 0 | 1 |
| Verified discontinued orders held from collection | 0 | 1 | 0 | 30 |

Quest's additional active row is the existing uncoded `XXX` 24-hour urine reference. It stays outside the numeric published search index. Labcorp's 129 pending rows are directory references held from normal collection. Runtime active status, published indexing and local regional acceptance answer different questions. These counts exclude staff-created data, browser overrides, and patient data.

All 10,430 runtime records have a reproducible inventory and audit status. The field evidence ledger now covers 20 Quest and 74 Labcorp runtime records. Automated page capture is tracked separately. An inventory status does not establish clinical accuracy. A complete national and service-area denominator remains open. The public Labcorp listing comparison and all 23 exact-code exceptions are documented separately.

## Labcorp public listing reconciliation

Labcorp CDOS lists 6,510 exact codes. All are present in the runtime catalog. The public test sitemap lists 3,303 exact codes and identifies 23 outside the calculator. Their exact pages were reviewed against clinic scope. The outcomes are nine operational exclusions, nine procedural referrals and five manual-review workflows. Sixty-nine runtime codes appear in neither public listing and remain a source-confirmation queue.

[Source comparison](LABCORP_SOURCE_LISTING_RECONCILIATION.csv) · [23 public sitemap entries](MISSING_TESTS.csv) · [Exact page intake checkpoint](LABCORP_EXACT_PAGE_CHECKPOINT.csv)

The [manual review queue](MANUAL_REVIEW_REQUIRED.csv) preserves the reason for all 129 pending records. The [exclusions register](EXCLUDED_TESTS.csv) records the runtime reason for every blocked Quest and Labcorp record. An exact vendor page in the intake queue establishes the code identity and captured fields. Collection remains on hold for pending records until their route is reviewed.

## Changes and clinical review

- The November Labcorp bulletin names 36 deleted codes. All 19 existing runtime records are blocked, including 18 previously active and one previously pending. Five obsolete converter links were removed. Vendor alternatives remain visible as references for order-scope review.
- The May bulletin accounts for two further calculator holds and one obsolete conversion link. The other five May deletions were absent from the runtime catalog.
- The January through October archive, excluding the previously reviewed May edition, yielded [259 deleted-order rows covering 258 codes](LABCORP_ARCHIVE_DELETIONS.csv). Eight cart-ready codes were blocked and a ninth, already blocked, gained explicit vendor evidence. The conversion tool removed one candidate pair and two manual-review pairs. One vendor-proposed alternative was added for manual review.
- Exact-code bulletin changes update stability, Apolipoprotein B volumes and the functional C1 esterase inhibitor rejection criteria. These changes preserve each test's existing shipment rules.
- Labcorp 501533 is blocked before cart selection and public indexing. The exact specialty test page specifies a different preservative and temperature than the historical CDOS route. Receiving-lab confirmation is required before the code can return to the cart.
- Quest 10676 retains the established urine-only exception and now displays one clear volume-confirmation instruction. The exact public detail page could not be retrieved. The published Quest cytology manual corroborates the specimen type, and local acceptance, volume and stability remain open.
- Quest 8477 and 1430 retain the directory-listed plasma-vial alternative. The current directory does not establish transfer into a fresh fluoride/oxalate tube for 8477. Quest 8280's preserved UA tube is an alternative to the unpreserved aliquot. Quest 229's sterile cup acceptance remains an explicit receiving-lab confirmation point covered by the existing clinician-facing note.
- Quest 18634 now plans one red-top, three SSTs and one original lavender EDTA tube. The four refrigerated serum vials are separate from the room-temperature whole blood. Combined serum volume is shown in the handling instructions and no longer treated as the volume of one source route.
- Quest 18216 retains nine plain red-top source tubes. The displayed three-vial plan is a calculator estimate based on vial capacity. The vendor does not prescribe a fixed transport count.
- Quest 39749 is discontinued. The calculator retains a historical listing but excludes it from collection and automatic conversion. Quest names 39820 as an alternative. Its target changes from nucleocapsid IgG to total spike antibody.
- Quest’s November notice corrects BNP plasma stability and the minimum quantity on the supported Aptima swab routes for 91475 and 91477. Male first-catch urine for 91477 is documented separately. Quest 14867 and 14435 already align with the reviewed handling requirements. The Quest November 30 entries for 213, 90137 and 38480 are queued for effective-date review. Ten Quest codes deleted in the reviewed notices were absent from the runtime catalog.
- Labcorp 164090 now includes published stability and rejection information.
- Five active runtime routes have an unspecified temperature. One is the uncoded Quest reference, three Quest exact-code sources remain unavailable, and Labcorp 164798's exact source omits shipment temperature.
- Labcorp 005215's official TAT starts at pickup and is already labeled accordingly in the calculator. No regional substitution was made.
- Vendor-published LOINC results were recorded separately from order codes. No inferred mapping was promoted. Exact order-to-result compendia and receiving-lab region exports are outstanding.

## Conversion reconciliation

| Measure | Before | After |
|---|---:|---:|
| Active Quest codes represented | 3,314 | 3,313 |
| Unique active candidate pairs | 1,456 | 1,448 |
| Distinct active Quest codes with a candidate | 1,456 | 1,448 |
| Distinct active Labcorp codes with a candidate | 1,396 | 1,388 |
| Active review-only pairs | 799 | 799 |
| Relationship rows, including legacy and uncoded | 2,257 | 2,249 |
| Quest active codes without a candidate or review reference | 1,228 | 1,234 |

The count of distinct destination codes is lower because multiple Quest orders can have the same Labcorp candidate. The raw 16802 pair now consistently points to Labcorp 102525, which includes eAG. The previous raw target, 001453, did not specify eAG. The workbook had already applied that correction in the fully loaded browser, so the runtime candidate count is unchanged. Workbook fallback now preserves explicit candidates and review-only decisions. Quest 937 and Labcorp 028142 are a partial panel relationship visible from both directions and excluded from automatic conversion. Quest 229 and Labcorp 004291 now require manual review because only Quest lists creatinine. Quest 18216 and Labcorp 123075 have different specimen and result scopes, now stated explicitly in both directions. The discontinued 39749 relationship was removed. Existing candidate pairs require separate clinical review.

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

Continue the unexplored exact-code Quest and Labcorp records from the record inventory. The [collection-to-submission review queue](COLLECTION_SUBMISSION_COUNT_REVIEW.csv) captures 16 Quest and 27 Labcorp records flagged for high draw-to-vial ratios. These are review triggers. Compare the receiving laboratory’s documented aliquot counts and the actual transport vial capacity before changing a plan. Resolve held specimen routes and calculate manual review priority for active tests with missing temperature, suspected discrepancies in declared versus calculated aliquot counts, and mixed or dedicated draws. Reconcile official catalog omissions, current discontinuations, regional acceptance, and special instructions in free text. Obtain authorized vendor extracts for order and result LOINC, verify candidate and unpaired orders from both sides, and record clinically significant panel and method differences. Review the index, cart, bag and print UI in supported browsers before deployment. A structural pass or passing test suite does not close these tasks.
