# v11.19 UI and printout checks

Validated against the v11.19 application and its catalog in headless Chromium by loading the packaged HTML, CSS and JS.

- Desktop (1440px): single-test search occupies its own first row above specimen type, Quest STAT lab and Do not perform controls. No horizontal overflow.
- Tablet (900px): search first, other controls wrap below; no horizontal overflow.
- Mobile (390px): search first, filters then receiving-lab controls and Do not perform; no horizontal overflow.
- Printed nurse order of draw: all nine number bubbles and tube badges render on one horizontal line; tested centerline difference was 0 px.
- Real-catalog tests 8837 and 7903 in one serum transport card: a single label “Serum from Gold / SST” lists both 8837 and 7903, without repeating “Serum from SST / Gold”.
- Other label instructions tested and retained: platelet-poor plasma (22), metal-free serum transport (345), and 24-hour urine total volume / start / end (37355).
- No changes to dataset, bag groups, source counts, or STAT rules.
