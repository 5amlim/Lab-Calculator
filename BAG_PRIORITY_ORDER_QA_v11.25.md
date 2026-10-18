# v11.25 Bag Priority and Order QA

## Requested presentation changes
- Transport bag reading order is Routine before STAT.
- Within either priority, the temperature sequence is room temperature, refrigerated, frozen, then mixed/verify.
- Paired bag cards still stretch to equal heights in each two-column row.
- STAT bags have an inset red left stripe matching the green inset stripe treatment for Routine bags. The outer border is temperature-coded.
- STAT / Routine badges are more legible and exactly as wide as their companion container-total badges.

## Test method
- Chromium browser print emulation and PDF generation.
- Tested one-bag, three-bag, and four-bag orders using the current catalog.
- Checked calculated DOM widths, badge vertical order, equal bag-row heights, left inset stripes, and bag sorting.
- Compared four-bag container totals with v11.24 (sorted totals 1, 5, 5, 19 in both builds).
- JavaScript syntax checked with Node.js.

## Result
PASS: All presentation assertions passed. The four-bag order is Routine room temp, Routine refrigerated, Routine frozen, STAT room temp. Other test collection and shipping logic is unchanged. Very large bags may continue across pages, as in v11.24.
