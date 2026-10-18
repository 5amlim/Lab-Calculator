# v11.26 QA

- JavaScript syntax checked with `node --check app.js`.
- Verified that `data.js` is byte-for-byte identical to v11.25.
- Browser-tested with 2,681 bundled records and test code 8837.
- Confirmed print `What to Collect` tube-card header background is `rgb(246, 248, 249)` (#f6f8f9), while the card body is `rgb(255, 255, 255)` (#fff).
- Generated a print PDF and inspected the rendered card.
- Confirmed UI uses `STAT receiving lab` instead of vendor-branded labels and that regional menu help text is vendor-neutral.
- Preserved genuine directory links, test names, and internal metadata/source attribution.
- Collection logic and test catalog were not modified.
