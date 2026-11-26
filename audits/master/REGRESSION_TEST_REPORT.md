# Calculator regression tests

Command `node --test --test-reporter=tap tests/*.test.cjs` with Node v24.22.3.

| Test run | Passed | Failed | Skipped |
|---|---:|---:|---:|
| Baseline | 447 | 5 | 0 |
| First audit checkpoint | 457 | 0 | 0 |
| Second audit checkpoint | 459 | 0 | 0 |
| Third audit checkpoint | 460 | 0 | 0 |

The baseline failures came from a browser test stub missing dataset and horizontal scroll, three stale assertions about the size of a Quest catalog fixture after the 10676 addition, and historical Labcorp exclusion wording that differed from runtime text. Updated tests assert the underlying material requirements. Unqualified Node discovery also treated the browser script `assets/js/test-mode-toggle.js` as a test based on its name. The explicit glob runs all 103 original test files, plus the new audit regression file.

Added four tests for published source loading, clinical holds, workbook override precedence, reverse partial relationships and SST boundaries. Extended the existing timed-urine suite with one test covering saved browser override and custom-row attempts to bypass the 501533 hold. The second checkpoint adds two tests for the 18634 collection, shipping and print counts and the 39749 retirement across published and saved data. Existing tests continued to exercise search, autocomplete, regional behavior, cart, bag and print logic.

The full-catalog math run exercised 3,314 Quest and 5,987 Labcorp active runtime records and 180 mixed carts per laboratory. No mixed-category collisions, lost print counts or invalid container quantities were observed in those cases. A headless Chromium check exercised both calculators at 390 px and 1280 px. It verified exact-code cart entry, discontinued-code blocking, print content, both conversion directions, saved region, saved SST mode, and viewport width. Field-level clinical audit and browser checks of remaining workflows are open.

The archive regression checks nine blocked codes, their absence from public search and both converter directions, and manual-review-only treatment of Labcorp 489477.
