# Lab Collection Calculator

A browser-based reference for laboratory specimen collection, processing, and send-out preparation. The site provides separate Quest, Cedars-Sinai, and LabCorp workflows so staff can search tests, review collection and submission containers, and prepare a printable collection plan.

**Published calculator:** https://5amlim.github.io/Quest-Calculator-Test/

**Source repositories:** [Lab-Calculator](https://github.com/5amlim/Lab-Calculator) and [Quest-Calculator-Test](https://github.com/5amlim/Quest-Calculator-Test). Both repositories are maintained with matching application files.

## Lab calculators

| Calculator | Features | Link |
| --- | --- | --- |
| Quest Lab Calculator | Test-code and name search, multiple-test collection plans, collection volumes, container estimates, processing instructions, STAT options, and temperature-organized submission groups | [Open Quest](https://5amlim.github.io/Quest-Calculator-Test/) |
| Cedars Lab Guide | Searchable test directory, illustrated collection and submission containers, specimen-source information, handling notes, and a separate print summary | [Open Cedars](https://5amlim.github.io/Quest-Calculator-Test/cedars.html) |
| LabCorp Lab Calculator | Quest-style cart, volume estimates, specimen bags, print summary, and a searchable comparison of all 2,692 Quest tests. LabCorp specimen planning is limited to the individually documented LabCorp records. | [Open LabCorp](https://5amlim.github.io/Quest-Calculator-Test/labcorp.html) |

Use **Select Lab** to switch between calculators. The main page opens on Quest. LabCorp maintains its own catalog and browser storage. Its directory contains test-specific LabCorp entries loaded from the base dataset and grouped catalog bundles; use **Add a missing test** only after confirming the LabCorp code, specimen requirements and local acceptance. No Quest-specific test instructions or STAT menus are imported into LabCorp. The **Compare Quest tests to LabCorp** section indexes all 2,692 Quest tests, includes possible code/name crosswalk suggestions, and exports the entire comparison as CSV. **Suggestions are not certified equivalents.** Unmatched records do not enter the LabCorp collection calculator until code, method, specimen, minimum volume, stability, and container instructions are verified with LabCorp.

## Project structure

| File or folder | Purpose |
| --- | --- |
| `index.html` | Quest calculator interface |
| `labcorp.html`, `labcorp-app.js`, `labcorp-data.js`, `labcorp-theme.css` | Independent LabCorp interface, shared calculation model and verified starter directory |
| `assets/js/labcorp/catalog/` | Consolidated LabCorp assay batches grouped by specialty. The page loads each bundle in the same order as the former individual scripts. Source-file provenance is listed in each bundle. |
| `labcorp-crosswalk-data.js`, `labcorp-crosswalk-ui.js`, `labcorp-crosswalk.css` | Read-only all-Quest comparison index, possible LabCorp code suggestions, search and CSV export |
| `assets/js/data.js` | Quest reference test records |
| `assets/js/app.js` | Quest search, planning, and print logic |
| `assets/css/` | Shared interface and print layouts |
| `quest-theme.css` | Quest visual theme |
| `cedars.html` | Cedars interface |
| `cedars-data.js` | Cedars test records |
| `cedars-app.js` | Cedars search, planning, and print logic |
| `cedars.css`, `cedars-container-art.js` | Cedars styles and specimen illustrations |
| `cedars-container-guide.html` | Printable Cedars submission-container reference |
| `market-switch.css`, `assets/js/lab-select.js` | Three-lab navigation |
| `print-button-theme.css` | Shared print-action styling |

This is a static website. The calculators operate in the browser; they do not require a hosted application server.

## Documentation and versioning

`VERSION.txt` records the release label. `docs/CHANGELOG.md` preserves the development history, while `docs/SOURCES.txt` and the collection audit documents record the basis and limitations of historical specimen-handling decisions. `docs/Sam_Hay_Workplace_Use_Agreement.docx` is retained as a workplace-use record. The project license is at the repository root in `LICENSE.md`; no second license copy is needed under `docs/`.

## Quest MASTER worksheet: feasible additions (2026-11-15)

From the user-supplied Quest 1,068-code MASTER missing-test workbook, **26 additional codes** have been promoted into verified, collectable workflows. Source modules:

- `assets/js/quest-feasible-from-master-20261115.js` (14 codes)
- `assets/js/quest-feasible-stool-stone-20261115.js` (5 codes)
- `assets/js/quest-feasible-24hr-urine-20261115.js` (7 codes)

Each added record includes the official directory source, collection/transport containers, preferred and minimum volumes, transport temperature, stability, and processing or handling notes. Multi-specimen panels retain distinct draw and submission requirements. These additions load before the directory-only reference catalog so verified codes are not overwritten.

**Collection scope:** The clinics do not prepare or submit microscope slides or smears, acid-preserved urine containers, green Aptima kits, or InSure cards. Tests requiring those are not promoted to collectable status. Stone Analysis **with Image** is a dry-stone specimen and does not mean a glass slide. If an otherwise eligible test can use an unpreserved collection route explicitly accepted by Quest, only that non-acid route is represented. The rest of the 1,068-code source remains **directory reference only** unless an independently verified and locally supported collection procedure is added; not every remaining test is intrinsically unsuitable.

**Important:** Quest's MASTER directory does not guarantee regional availability, and a verified national specimen route is not necessarily approved by the receiving service area. Confirm local acceptance, collection capability and current lab instructions before patient collection. This pass includes record-schema and duplicate/load-order checks, but not a full browser end-to-end test of every new draw plan.

## Adding LabCorp tests

LabCorp assay definitions are intentionally separate from Quest and Cedars. For each new LabCorp code, verify the test-specific collection and submission requirements before adding it. Include specimen type, draw and submit containers, minimum/preferred volume, transport temperature, stability, spin/processing, and test-specific handling.

Existing LabCorp catalog bundles live under `assets/js/labcorp/catalog/`. Add related verified entries to the appropriate group rather than creating a new root-level JavaScript file for each small batch. Preserve the existing script order in `labcorp.html`, and avoid changing shared pooling/print logic as part of data-only additions. Each bundled section names the original source for traceability. The `tests/labcorp-catalog-bundles.test.cjs` regression checks script references, loading, and unique codes.

## Collection and specimen safety

The calculator is a workflow reference, not a replacement for the receiving laboratory's current test directory, specimen acceptance criteria, or internal laboratory procedures. Verify test-specific requirements, stability, processing, and transport before collecting or submitting specimens. Separate specimens when required and check current STAT routing and availability.

**Do not enter patient identifiers or protected health information.**

## Ownership

Proprietary software. See [LICENSE.md](LICENSE.md) for permitted use and licensing terms. Third-party laboratory names and trademarks belong to their respective owners. This independent resource is not represented as an official Quest Diagnostics or Cedars-Sinai product.

## Clinical category search and filters

Quest and LabCorp share 31 clinical categories for browsing. Search for category keywords such as `STI`, `GI`, `hematology`, `coagulation`, `allergy`, and `thyroid`, or select one under **Filters → Clinical category**. Category filters combine with specimen, container, temperature, fasting, pediatric, and spin filters. One test may appear under multiple categories. Categories are based on test-name rules and do not change specimen requirements, order codes, STAT availability, or collection calculations. The classifications are navigational aids, not official clinical classifications or test equivalence recommendations.


## Quest MASTER missing-code integration (2026-11-14)

The 1,068-code/name worksheet is indexed as a reference-only catalog rather than assumed safe for specimen collection. The reference layer does **not** provide collection or processing plans until the test-specific specimen details are verified against the official Quest directory.

Four verified source bundles currently add **29** directory-reviewed workflows:

- `assets/js/quest-verified-urine-20261114.js`: 7 special urine, 24-hour urine, and timed-urine assays
- `assets/js/quest-verified-blood-specialty-20261114.js`: 9 whole-blood, paired-specimen, FIB-4, coagulation, and CSF assays
- `assets/js/quest-verified-microbiology-20261114.js`: 10 culture, swab, cytology transfer, sputum, and special-kit assays
- `assets/js/quest-verified-gestational-20261114.js`: 3 timed gestational glucose tests

These follow the existing `SEED_TESTS` schema and preserve separate draw requirements, fasting flags, specimen-specific temperatures, transport containers, and original naming. Existing validated codes are not overwritten. The grouping logic keeps HCl-preserved urine separate from ordinary urine, does not merge cord blood with routine blood, and keeps different gestational timing protocols distinct. All references without verified specimen details remain **Directory only** and cannot be added to the cart, tube calculator, or printouts.

**Clinical caution:** This is a national Quest MASTER lookup, not a confirmation that every code or special collection kit is accepted by each local receiving lab. Verify service-area availability and local supplies before collection. The remaining directory-only entries require individual Quest documentation before promotion to collectable status.


### Fluoride/oxalate plasma processing, Nov 14 2026

Code 8477 (50 g gestational screen, 135 cutoff), 19833 (140 cutoff), 484 (fasting glucose plasma), 1430, 19834, 16292, 35181, 18927 and 6745 use a standardized **gray fluoride/oxalate source tube → centrifuge → separated plasma in a fresh additive-free plastic screw-cap transport vial** workflow. Quest explicitly lists the plastic vial as an acceptable alternative for most of these assays, and its general plasma separation guidance supports additive-free plastic vials. Code 16292 does not explicitly list this alternative in its individual directory entry; verify that specific route with the receiving laboratory before collection. Do not transfer into a second gray-top blood-collection tube with anticoagulant additive. The vial must be identified as fluoride/oxalate plasma and separately labeled for its fasting/1-hour/2-hour/3-hour draw. 

The cart, collection plan, transport bag, and printouts use matching physical counts and never pool timed specimens. Tests 8477 and 19833 are one-hour, **nonfasting** 50 g screening tests, unlike fasting multi-timepoint tests. This workflow is subject to regional Quest acceptance and staff competency for plasma separation. The official directory also lists the original fluoride/oxalate gray tube as the preferred container; local use of the additive-free plastic vial should be confirmed with the receiving lab. Source: https://www.questdiagnostics.com/healthcare-professionals/test-directory/specimen-handling/specimen-collection and https://testdirectory.questdiagnostics.com/test/test-detail/8477/?cc=MASTER .

Coverage: `assets/js/quest-gray-plasma-processing-20261114.js`; tests: `tests/quest-gray-plasma-20261114.test.cjs` and `tests/quest-gray-plasma-plan-integration-20261114.test.cjs`.


### Special collection requirements and common sterile cups (November 14, 2026)

The Quest directory includes tests requiring specialized supplies or processes. The calculator uses **Special collection requirements** rather than an organization-specific "Do not perform" list. Quest codes **11290** (InSure FOBT card), **91448** (green-label Aptima Pap-vial transfer) and **1635** (acid-preserved urine) remain flagged for collection verification; their required original containers are shown, without implying that every facility lacks the supplies. The flags prevent adding an unverified workflow to the collection summary.

Quest **14577**, Bacterial Vaginosis/Vaginitis Panel (BD Affirm VPIII), is a selectable test using the dedicated ATTS swab and transport tube. The record carries collection steps, 72-hour stability and a prohibition on generic swab substitution. Labcorp **180026**, Vaginitis/Vaginosis DNA Probe, is likewise selectable with its own validated Affirm collection instructions.

**Quest 523, 39625, 1648** follow the Quest-listed **unpreserved frozen** 5-HIAA pathway with no acid-containing container. The specimen must have pH 6 or below and be frozen, with 24-hour urine refrigerated during collection and total volume documented. Collect only when specimen pH measurement, freezer-safe leakproof container, frozen transport, service-area acceptance and patient instructions are confirmed.

One stock **Sterile cup** is used for compatible **urine, stool, sputum, and CSF** submissions. Collection inventory groups and adds the number of physical cups, while maintaining each specimen's own label, contents, temperature, and submission. CSF collection remains a procedural-provider activity; microbiology CSF specimens that require particular numbered tubes or special media are not replaced by a cup. The container gallery shows a single sterile cup reference, searchable for all four source types, rather than duplicate stool/sputum/CSF cup products.

Code: `assets/js/app.js` and the `quest-verified-*-20261114.js` bundles. Regression: `tests/quest-sterile-cup-and-supplies-20261114.test.cjs` plus the updated 29-code catalog tests.
