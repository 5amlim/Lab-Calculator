# v11.45 UI and print verification

- Checked a 32-test order using Chromium with a 1280 px desktop and 390 px mobile viewport.
- Selected-test scroll view remained constrained to 340 px desktop / 290 px mobile, with the header and Show/Hide details button in a separate stable element.
- Detailed test view used the same scrolling region; switching modes reset the inner scroll to the top.
- STAT test menu button changed from Show STAT tests (66) to Hide STAT tests (66) and back, with matching expanded state.
- Long Gold/SST list with 21 tests used two internal columns inside a normal half-width collection card in both mobile and desktop PDF outputs.
- Generated 12 pages in both test widths. PDF text matched apart from generated timestamp. Same print font size and layout dimensions.
- No specimen collection, STAT routing, bag assignment, or pooling calculations changed.
