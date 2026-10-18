# Mobile printing: v11.36

Based directly on v11.35.

- Desktop print remains unchanged: SST collection cards still span both columns when they have long test lists.
- Mobile printing now applies an explicit three-column grid for the test names in long collection cards, preserving column-first reading order, instead of relying on browser-dependent CSS multicol pagination.
- No changes to test data, collection or submission calculations, page sequence, bag styling, or online UI.
- Physical print orientation depends on mobile browser and printer; choose landscape where the print dialog permits.

Validation (Chromium):
- Screen widths 390px and 1440px; 31-test mixed order, including 28 SST tests.
- Both produce 19 collection tubes and 2 transport bags in the test scenario.
- Both create 8-page landscape PDFs with the same print sequence.
- At 390px only, long SST lists become a column-first three-column CSS grid; at 1440px, the existing multicol stylesheet remains untouched.
- Local print validation completed in Chromium; direct Safari/iOS print-preview validation was not available.
