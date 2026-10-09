# QA v10.53

- Verified urine and stool collection items are categorized from specimen/test metadata rather than the container label.
- Verified shared physical container names use specimen-aware grouping keys, preventing urine and stool from merging into one collection card.
- Verified Blood, Urine, Stool, and Other specimen dividers render inside the existing What to collect section.
- JavaScript syntax checked after the grouping/render change.
- Verified JavaScript syntax after print-card markup change.
- Verified Estimated draw volume remains generated from the same calculation functions.
- Layout-only change: compact card, vertically centered left copy, centered Preferred/Minimum values.

- Verified duplicate Sterile Urine Cup urine cards are merged by specimen type + physical collection container.
- Verified urine and stool remain separate cards when both use Sterile Urine Cup.
- Verified spot-urine cup count uses the largest explicit requirement rather than adding one cup per urine test.
- Verified downstream UA/culture preservative tubes remain separate in What to submit after processing.

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
