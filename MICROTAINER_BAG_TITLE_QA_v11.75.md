# v11.75 display-only QA

- The printed Microtainer collection pill reads **MICROTAINER**; the phrase "separate count" was removed.
- The printed handling note reads: "Microcollection tubes · protect from light; follow the test-specific Microtainer instructions." It no longer mentions separation from standard SSTs.
- Routine Microtainer collection/count behavior remains unchanged, as do gold/tiger pooling, submission bags and LABEL notes.
- The printed temperature bag title (Room-temperature / Refrigerated / Frozen) now uses 13.5 px rather than 11 px; the container count and priority badge sizes were not changed.
- Existing `qa_microtainer_v11.74.js` regression suite passed: **8,080 checks**.
- Headless Chromium simulated print styles at viewport widths 390 and 1280 px. Both computed the bag title at **13.5px**, and the new Microtainer strings displayed as specified. This is not an on-device Safari verification.
