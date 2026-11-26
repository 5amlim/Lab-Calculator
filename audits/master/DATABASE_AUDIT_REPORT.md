# Quest and Labcorp calculator audit

Audit date November 26, 2026. Baseline commit `b81f79958661971bad3a6799d6a0465a7525156e`. This checkpoint covers the production runtime inventory and targeted clinical review and the Labcorp public listing and 2026 bulletin reconciliation. Clinical verification remains incomplete.

## Catalog reconciliation

| Measure | Quest before | Quest after | Labcorp before | Labcorp after |
|---|---:|---:|---:|---:|
| Runtime catalog records | 3,829 | 3,829 | 6,601 | 6,601 |
| Active runtime records | 3,315 | 3,315 | 6,015 | 6,015 |
| Active codes in published search | 3,314 | 3,314 | 6,015 | 6,015 |
| Active codes with a collection review flag | 0 | 5 | 0 | 30 |
| Blocked runtime records | 514 | 514 | 455 | 457 |
| Pending runtime records | 0 | 0 | 131 | 129 |
| Fully clinically verified in this audit | 0 | 0 | 0 | 0 |
| Partially verified in this audit | 0 | 35 | 0 | 363 |
| Clinical conflict recorded | 0 | 4 | 0 | 1 |
| Current source inaccessible | 0 | 4 | 0 | 0 |
| Specific official field unavailable | 0 | 2 | 0 | 2 |
| Official review unstarted in this audit | 3,829 | 3,783 | 6,601 | 6,205 |
| Runtime records added or removed | 0 | 0 | 0 | 0 |

The active catalogs retain every baseline code and record ID. A collection review flag keeps a test visible in search and addable to the cart. The cart, printout and CSV show the reason. The specimen plan excludes those routes from automatic collection counts, submission bags and STAT. The converter does not propose those flagged orders as candidates. The [flag register](COLLECTION_REVIEW_FLAGS.csv) has all 35 codes, reasons and sources. Two previously pending Labcorp codes now appear in the exclusions register under vendor deletion notices.

Quest also contains an uncoded active `XXX` 24-hour urine reference outside the numeric search index. Its shipment temperature remains an open audit warning. The counts exclude browser overrides, staff-created tests and patient data.

All 10,430 runtime records have a reproducible inventory. The field evidence ledger covers 46 Quest and 396 Labcorp records. Separate Labcorp intake attempted 385 public pages and captured 381 exact order pages. Clinical verification, national catalog completeness and service-area acceptance remain open.

## Labcorp public listing reconciliation

Labcorp CDOS lists 6,510 exact codes. All are present in the runtime catalog. The public test sitemap lists 3,303 exact codes and identifies 23 outside the calculator. Their exact pages were reviewed against clinic scope. The outcomes are nine operational exclusions, nine procedural referrals and five manual-review workflows. Sixty-nine runtime codes appear in neither public listing and remain a source-confirmation queue.

[Source comparison](LABCORP_SOURCE_LISTING_RECONCILIATION.csv) · [23 public sitemap entries](MISSING_TESTS.csv) · [Exact page intake checkpoint](LABCORP_EXACT_PAGE_CHECKPOINT.csv)

The [manual review queue](MANUAL_REVIEW_REQUIRED.csv) preserves the reason for all 129 pending records. The [exclusions register](EXCLUDED_TESTS.csv) records the runtime reason for every blocked Quest and Labcorp record. An exact vendor page in the intake queue establishes the code identity and captured fields. Collection remains on hold for pending records until their route is reviewed. The [Labcorp pending evidence report](LABCORP_PENDING_EVIDENCE_REVIEW.csv) distinguishes 101 orders with captured fields, 23 with identity-only captures and five without an exact page.

## Changes and clinical review

- Quest 16983 defaults to two 5 mL pour-off tubes in one frozen bag. The vendor also lists a single 10 mL option. The existing five-standard-source-tube plan is preserved. The catalog and printout flag the New York restriction. Vendor-referenced code 16984 is in the missing-order queue pending its exact receiving-account instructions.
- The high-volume review added findings to 18 entries in the [43-order draw-to-submission queue](COLLECTION_SUBMISSION_COUNT_REVIEW.csv). Several vendor pages specify the source draw count while allowing more than one submission vial. Vial count should follow the receiving lab and usable capacity of stocked vials. This pass does not assume a universal size.
- The Labcorp public field comparison now sends storage directions that differ by specimen to manual review. For 008482, the exact page confirms the ambient route for the specimen selected by the calculator.


- Labcorp 001487, 001637 and 007989 now use refrigerated shipment. The old room-temperature defaults are migrated when present in saved orders. The current exact-code page for 001637 also establishes fasting as required and leaves its duration unspecified.
- Quest 17306 now displays the published fasting preference in the cart and printout. Fasting remains optional.
- The public Labcorp capture was screened against active single-route records. The [routine comparison table](LABCORP_ROUTINE_FIELD_COMPARISON.csv) matches 715 comparable volume or explicit storage fields across 298 orders after the corrections. Another 281 fields and nine orders with multiple routes require review. This comparison establishes agreement only for the fields reported. Reconciliation into the evidence ledger adds 171 previously unlisted active single-record orders with all three matching fields (513 matches), each linked to its exact public page and matching capture SHA-256. No new vendor retrieval or full clinical verification is claimed; the other 111 unlisted orders have now also been reconciled for 165 matching fields, including one equal decimal value written as 0.1 versus 0.10. Their missing fields remain open. All 298 orders from the routine comparison are now represented in the field ledger.
- Quest 249 and 927 public views give different specimen volumes from the current calculator route. Quest 8659 requires a service-area selection. The [clinical conflict queue](CLINICAL_CONFLICTS_REQUIRING_REVIEW.csv) records these account-specific questions.
- Quest 10231 in Tampa and Labcorp 322000 publish the same 18 result LOINCs, including eGFR. The [LOINC review](LOINC_AUDIT.csv) distinguishes those result identifiers from Labcorp's published order identifier. This supports the existing candidate. Test interchangeability still requires the receiving-account and assay review.


- The November Labcorp bulletin names 36 deleted codes. The 18 previously active records remain searchable with vendor deletion flags. One previously pending record is blocked. Five obsolete converter links were removed. Vendor alternatives remain visible as references for order-scope review.
- The May bulletin marks one active record for collection review, blocks one pending record and supersedes one conversion link. The other five May deletions were absent from the runtime catalog.
- The January through October archive, excluding the previously reviewed May edition, yielded [259 deleted-order rows covering 258 codes](LABCORP_ARCHIVE_DELETIONS.csv). Eight previously active codes remain in the cart with vendor deletion flags. A ninth, already blocked, gained explicit vendor evidence. The conversion tool removed one candidate pair and two manual-review pairs. One vendor-proposed alternative was added for manual review.
- Exact-code bulletin changes update stability, Apolipoprotein B volumes and the functional C1 esterase inhibitor rejection criteria. These changes preserve each test's existing shipment rules.
- Labcorp 501533 remains searchable with a collection review flag. The exact specialty test page and historical CDOS route specify different preservative and temperature requirements. The receiving lab must confirm the route before collection.
- Quest 10676 retains the established urine-only exception and now displays one clear volume-confirmation instruction. The exact public detail page could not be retrieved. The published Quest cytology manual corroborates the specimen type, and local acceptance, volume and stability remain open.
- Quest 8477 and 1430 retain the directory-listed plasma-vial alternative. The clinic confirmed the exact stock label Transport Tube for 8477 on November 26; its dedicated separated-plasma route, processing and quantities are unchanged. The current directory does not establish transfer into a fresh fluoride/oxalate tube for 8477. Quest 8280's preserved UA tube is an alternative to the unpreserved aliquot. Quest 229's sterile cup acceptance remains an explicit receiving-lab confirmation point covered by the existing clinician-facing note.
- Quest 18634 now plans one red-top, three SSTs and one original lavender EDTA tube. The four refrigerated serum vials are separate from the room-temperature whole blood. Combined serum volume is shown in the handling instructions and no longer treated as the volume of one source route.
- Quest 18216 retains nine plain red-top source tubes. The displayed three-vial plan is a calculator estimate based on vial capacity. The vendor does not prescribe a fixed transport count.
- Quest 39749 is discontinued. The calculator retains it in search and the cart with the discontinuation flag and excludes it from the generated plan and automatic conversion. Quest names 39820 as an alternative. Its target changes from nucleocapsid IgG to total spike antibody.
- Quest’s November notice corrects BNP plasma stability and the minimum quantity on the supported Aptima swab routes for 91475 and 91477. Male first-catch urine for 91477 is documented separately. Quest 14867 and 14435 already align with the reviewed handling requirements. The Quest November 30 entries for 213, 90137 and 38480 are queued for effective-date review. Ten Quest codes deleted in the reviewed notices were absent from the runtime catalog.
- Labcorp 164090 now includes published stability and rejection information.
- Quest 34329, 34499 and 6447 and Labcorp 164798 have collection review flags while their exact shipment instructions are unresolved. Two workbook candidate links and one manual-review crosswalk link were removed. The uncoded Quest reference XXX still requires a temperature decision from the receiving laboratory.
- Quest 93876 now shows a collection review flag because its exact directory entry lists frozen preferred serum and refrigerated shipment. Labcorp 502690 also has a flag while the receiving lab confirms vial count and capacity. Labcorp 120089's three draws and single dedicated vial match the vendor's instructions. Labcorp 501218's published volume and frozen plastic container are documented, with local usable vial capacity still open.
- Labcorp 005215's official TAT starts at pickup and is already labeled accordingly in the calculator. No regional substitution was made.
- Vendor-published LOINC results were recorded separately from order codes. No inferred mapping was promoted. The [Labcorp LOINC intake](LABCORP_PUBLISHED_LOINC_INTAKE.csv) records 309 published order assignments and 600 published result assignments from 354 exact codes. These captures passed the syntax and check-digit checks. Term axes and current release status remain open. Exact Quest order-to-result compendia and receiving-lab region exports are outstanding.

## Conversion reconciliation

| Measure | Before | After |
|---|---:|---:|
| Active Quest codes represented | 3,314 | 3,314 |
| Unique active candidate pairs | 1,456 | 1,446 |
| Distinct active Quest codes with a candidate | 1,456 | 1,446 |
| Distinct active Labcorp codes with a candidate | 1,396 | 1,387 |
| Active review-only pairs | 799 | 798 |
| Relationship rows, including legacy and uncoded | 2,257 | 2,246 |
| Quest active codes without a candidate or review reference | 1,228 | 1,238 |

The count of distinct destination codes is lower because multiple Quest orders can have the same Labcorp candidate. The raw 16802 pair now consistently points to Labcorp 102525, which includes eAG. The previous raw target, 001453, did not specify eAG. The workbook had already applied that correction in the fully loaded browser, so the runtime candidate count is unchanged. Workbook fallback now preserves explicit candidates and review-only decisions. Quest 937 and Labcorp 028142 are a partial panel relationship visible from both directions and excluded from automatic conversion. Quest 229 and Labcorp 004291 now require manual review because only Quest lists creatinine. Quest 18216 and Labcorp 123075 have different specimen and result scopes, now stated explicitly in both directions. The discontinued 39749 relationship was removed. Existing candidate pairs require separate clinical review.

## Source and calculation architecture

The live catalog is the result of HTML script order, seed data, directory bundles, and calculator policy. Quest begins at `assets/js/data.js`; Labcorp begins at `labcorp-data.js`. The two HTML entry points load the authoritative overlays before the app. Quest also loads compressed directory references and a final inline override. The generated files in `assets/search/` feed external search and reverse lookup. The converter uses `labcorp-crosswalk-data.js` with workbook fallback and a generated Labcorp search index. Region and TAT overlays are distinct from test order and specimen routes.

The audit loader now executes both external and inline scripts in production order and waits for the Quest catalog overlay. It then captures the clean published catalog after runtime policy, with no staff-created entries or saved overrides. Existing source bundles, TAT scripts, LOINC importer, audit history and calculator-specific presentation are tracked in the registry and linked reports.

The pull request workflow compares the before and after catalogs, fails if a previously active record disappears or changes disposition, checks reviewed values in active clinical changes against field evidence, and uploads the health report and test results. It performs no vendor requests. The workflow can be selected as a required GitHub check so deployments from the default branch depend on it. Existing branch and deployment settings must be verified separately.

## Audit files and reproduction

- `DATABASE_BASELINE.json` and `DATABASE_AUDIT_SUMMARY.json` contain baseline and current totals.
- `AUDIT_CHECKPOINT.json` records scope and how to resume. `RECORD_CHECKPOINT.csv` contains each runtime record and its status. `FIELD_EVIDENCE.json` records the exact completed batch.
- `CONTAINER_MAPPING_AUDIT.csv` lists active collection and submission labels and route counts. Full per-route data are generated on demand.
- `CUSTOM_RULES_REGISTRY.json` and `HISTORICAL_CORRECTIONS_AUDIT.csv` document discovered rules and overrides within this checkpoint.
- The report generator writes `TEST_INVENTORY.csv`, `SPECIMEN_CONTAINER_ROUTES.csv`, `COLLECTION_REVIEW_FLAGS.csv`, `CROSSWALK_AUDIT.csv`, `CLINICAL_FIELD_CHANGES.csv` and the record-hash snapshot. The inventory can be filtered by verification status, blocked and pending disposition, and source.

Run from the calculator checkout with Node 22 or newer.

```sh
git worktree add --detach ../calculator-audit-base b81f79958661971bad3a6799d6a0465a7525156e
node scripts/audit-calculator-database.mjs --root ../calculator-audit-base --out ../calculator-base-report
node scripts/audit-calculator-database.mjs --out ../calculator-current-report --baseline ../calculator-base-report/DATABASE_SNAPSHOT.json --check
node --test tests/*.test.cjs
```

To rebuild the Labcorp pending and published LOINC tables, pass the retained exact-page JSONL capture files to `scripts/audit-labcorp-captured-evidence.py --captures` with `--pending audits/master/MANUAL_REVIEW_REQUIRED.csv --inventory audits/master/RECORD_CHECKPOINT.csv --out audits/master`. Add `--routes` with the generated `SPECIMEN_CONTAINER_ROUTES.csv` to produce the routine field comparison. The output retains source URLs and page hashes. Run a licensed/current LOINC release comparison before promoting an assignment into term-level or equivalence evidence.

## Quest print baseline

The saved SoCal Common Labs printout and the reproduced Gold SST cart had the same 78 tests and 46 draws. The submission totals were 38 room-temperature, nine refrigerated and five frozen containers across three bags. The collection cards, submission cards and bag totals match the baseline. The expected text change is the optional fasting preference for Quest 17306. Both headless PDFs paginated to 22 pages, whereas the supplied PDF is 21 pages. Exact pagination in the supplied PDF's original print environment remains unverified.

## Outstanding scope

The available public sources establish individual test fields and show why local verification is still necessary. Quest service areas can publish different handling requirements for the same code. Closing the clinical review requires current receiving-account compendia for the supported markets and order-to-result mappings with assay and reflex definitions. Public page capture and automated field comparisons remain tracked separately from full clinical verification.


Continue the unexplored exact-code Quest and Labcorp records from the record inventory. The [collection-to-submission review queue](COLLECTION_SUBMISSION_COUNT_REVIEW.csv) captures 16 Quest and 27 Labcorp records flagged for high draw-to-vial ratios. The queue retains the verified Labcorp 120089 finding for traceability. The remaining entries are review triggers. Compare the receiving laboratory’s documented aliquot counts and the actual transport vial capacity before changing a plan. Resolve held specimen routes and calculate manual review priority for active tests with missing temperature, suspected discrepancies in declared versus calculated aliquot counts, and mixed or dedicated draws. Reconcile official catalog omissions, current discontinuations, regional acceptance, and special instructions in free text. Obtain authorized vendor extracts for order and result LOINC, verify candidate and unpaired orders from both sides, and record clinically significant panel and method differences. Review the index, cart, bag and print UI in supported browsers before deployment. A structural pass or passing test suite does not close these tasks.
