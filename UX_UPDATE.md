# v10.22 UI update
- **Show details** is now a smaller button aligned directly under **Tests**.
- Added a disclosure arrow that flips between **▾ Show details** and **▴ Hide details**.
- No calculation, test-data, or printout changes.

## v10.21
- Restored **Show details** to the compact button treatment.
- All other v10.20 behavior is unchanged.

# Interface update

This edition updates the interface of the supplied v10.6 calculator.

- Search-first workspace with compact expandable batch entry.
- Distinct collection summary and expanded draw plan.
- Mobile test cards and a shortcut to the collection summary.
- Clear selected states, readable controls, keyboard focus, and empty states.
- Print and spreadsheet export stay disabled until tests are selected.
- Local library pages show 30 results at a time.

The curated data, specimen rules, storage keys, custom test editor, and print layout are preserved. Existing saved records remain available when replacing the application on the same browser and origin. A different preview URL has separate browser storage.

Replace index.html and app.js, and add experience.css alongside styles.css. Or use the complete folder. Open index.html to run locally, or upload the folder contents to your existing static host. No installation is required.

Validation: JavaScript syntax; unique and complete element references; representative search equivalence; selected-test operations; draw-plan, alert, and printed-summary equivalence against v10.6; batch entry; empty search results; disabled empty export controls; byte-for-byte unchanged data.js. Browser visual and interaction testing has not been performed. Clinical content was not re-audited in this interface update.

## Neutral interface wording
Removed the laboratory brand name from visible interface labels and record wording, including printed collection notes and previously saved browser records. Directory destinations, source attribution, test identifiers, and collection requirements remain intact.

## SST transfer counts
Each transport container prepared from an SST now has its own source SST in collection totals. Explicit higher SST draw counts are preserved. Original-submit SST, Lavender EDTA, and Red Top pooling remain unchanged. Checked every individual and paired SST record and the full library, grouped by transport temperature. The reported seven-test example now requires four SSTs and one Lavender EDTA tube.

## Print layout
Printouts now start with collection counts and the draw/pack plan, followed by labeled instructions for each test. Includes volumes, stability, full handling notes, exact temperature wording, alternative containers, fasting instructions, and labels. Dedicated print.css improves readability and allows long sections to flow across pages. Calculation and content checks passed; browser print pagination has not been visually verified.

## v10.13
- Draw plan now starts collapsed to reduce visual clutter.
- Printed transfer workflows now show a small visual badge for the source collection container (for example, SST/Gold or Sterile Urine Cup) next to the source text.
