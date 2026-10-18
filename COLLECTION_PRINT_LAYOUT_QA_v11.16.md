# v11.16 collection print layout QA

Changes verified on a 30-test sample with Quest SoCal area selected and a STAT-eligible test marked STAT:

- **One blood collection card per tube type:** Gold/SST, Lavender EDTA, Red Top, Light Blue Citrate, and Green Heparin appear only once in "What to collect" even with mixed STAT and routine orders.
- **Correct total source tubes:** The physical collection count adds priority-separated tube allocations from their individual STAT and routine submission bags. This is a presentation consolidation, not cross-priority source pooling.
- **STAT labels:** "· STAT" is shown after each applicable test name in collection card test lists; priority labels no longer appear on the collection tube headline or collection chips.
- **Compact draw estimates:** Estimated preferred and minimum draw values appear in a smaller inline area on the same top line as the tube type when space permits.
- **Bag separation:** STAT and routine shipments still receive separate bag cards, also separated by temperature.
- **Pagination:** Purple submission section can break naturally between pages. Bag cards no longer share one fixed-height CSS grid row; submission item cards are arranged in two columns inside each full-width bag.
- **No catalog changes:** data.js and all specimen definitions are unchanged.

Browser smoke test: Chromium rendered a 30-test printout (with and without a STAT-marked test), and the PDF pages were visually inspected. No giant empty framed bag or misaligned draw-volume values were observed.
