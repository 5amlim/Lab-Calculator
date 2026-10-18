# v11.11 Layout QA

- Browser layout tested at 390 CSS px: 11-test and 31-test orders. STAT and remove buttons had no bounding-box overlap. Remove remained a separate touch target.
- Print layouts checked with 11 and 31 tests, including a 26-test SST collection card. Long SST card uses full collection width and displays its test list in three columns.
- Estimated draw volume label and preferred/minimum metrics did not overlap in checked cards, including citrate with three tubes to fill line.
- Collection order checked using Gold SST, Light Blue Citrate, Sterile Urine Cup (urine), Sterile Urine Cup (stool), and Viral Transport Media (swab): SST -> blood -> urine -> stool -> swab.
- JavaScript syntax check passed; no browser page errors in test harness. Data and pooling formulas unchanged.

These are representative browser checks, not exhaustive testing of all device print drivers or every lab-order combination.
