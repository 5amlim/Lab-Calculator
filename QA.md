# QA v10.51

- Verified JavaScript syntax after print-card markup change.
- Verified Estimated draw volume remains generated from the same calculation functions.
- Layout-only change: compact card, vertically centered left copy, centered Preferred/Minimum values.

# Current release QA

This file replaces the accumulated per-version `V10.xx_QA.txt` files in the deployable package. Historical release QA remains available in prior release packages / Git history rather than being copied into every new build.

## v10.50 checks

- JavaScript syntax checked for `app.js` and `data.js`.
- Built-in catalog loads successfully: 2,679 records total, 2,672 active and 7 Do Not Perform.
- Storage architecture remains catalog-in-`data.js` with browser storage reserved for user changes and selected tests.
- Original-container SST grouping audit completed across all active tests.
- Test 306 (Calcium, Ionized) now groups with other room-temperature original-submit SST/Gold specimens instead of creating a second SST card solely because its transport wording says `Primary tube (do not open)`.
- Test 306 remains an original-tube workflow and its source data / special handling instructions are unchanged.
- Other original-container grouping variants were reviewed. Different additives or genuinely different physical containers remain separate.
- No test data, transport temperature, collection count, pooling rule, Do Not Perform status, or draw-volume conversion was changed by this release.
