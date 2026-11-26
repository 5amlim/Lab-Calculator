# Calculator regression tests

Command `node --test --test-reporter=tap tests/*.test.cjs` with Node v24.22.3.

| Test run | Passed | Failed | Skipped |
|---|---:|---:|---:|
| Baseline | 447 | 5 | 0 |
| First audit checkpoint | 457 | 0 | 0 |
| Second audit checkpoint | 459 | 0 | 0 |
| Third audit checkpoint | 461 | 0 | 0 |
| Active test preservation and review flags | 463 | 0 | 0 |
| Vendor shipping and patient preparation continuation | 464 | 0 | 0 |
| Quest pour-off and patient-state restriction review | 465 | 0 | 0 |

The baseline failures came from a browser test stub missing dataset and horizontal scroll, three stale assertions about the size of a Quest catalog fixture after the 10676 addition, and historical Labcorp exclusion wording that differed from runtime text. Updated tests assert the underlying material requirements. Unqualified Node discovery also treated the browser script `assets/js/test-mode-toggle.js` as a test based on its name. The explicit glob runs all 103 original test files, plus the new audit regression file.

Added four tests for published source loading, clinical holds, workbook override precedence, reverse partial relationships and SST boundaries. Extended the existing timed-urine suite with one test covering saved browser override and custom-row attempts to bypass the 501533 hold. The second checkpoint adds two tests for the 18634 collection, shipping and print counts and the 39749 retirement across published and saved data. Existing tests continued to exercise search, autocomplete, regional behavior, cart, bag and print logic.

The latest full-catalog math run exercised 3,310 Quest and 5,985 Labcorp records with actionable plans and 180 mixed carts per laboratory. No mixed-category collisions, lost print counts or invalid container quantities were observed in those cases. A headless Chromium check exercised both calculators at 390 px and 1280 px. It verified exact-code cart entry, active flagged cart entries and exclusion of flagged routes from printed bags, print content, both conversion directions, saved region, saved SST mode, and viewport width. Field-level clinical audit and browser checks of remaining workflows are open.

The archive regression checks eight retained active codes with vendor deletion warnings, one pre-existing blocked code, the absence of unsafe converter links, and manual-review-only treatment of Labcorp 489477.

The Quest notice test checks the exact BNP temperature stability bands, the swab minimum quantities, and separation of swab and urine collection paths.

The collection review regressions check exact-code search, custom and saved data, absence of collection routes and bags, public flags, converter rows, and two high-volume or temperature conflicts. The 78-test print baseline matches draw counts, bag counts, and test detail across both builds.

The latest browser run checked three corrected Labcorp codes at 390 px and 1280 px. All three appeared in one refrigerated bag, and 001637 showed fasting as required. The Quest baseline kept its collection groups and all bag totals, with the expected optional fasting update for 17306.

Quest 16983 browser checks at 390 px and 1280 px verified a five-source-tube plan, one frozen bag containing two 5 mL pour-off tubes, and the New York restriction in print. The 78-test Quest baseline still matched the 46 collection containers and all bag totals.
