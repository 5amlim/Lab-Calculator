# v11.09 STAT routing and specimen label QA

## Scope
- Existing Quest test catalog and instructions preserved.
- Urine indicator in the printed collection summary and What to Collect cards: yellow.
- Stool indicator in those same print views: amber.
- Per-selected-test STAT toggle available in the collapsed test list and expanded test details.
- Priority persists independently of built-in test metadata, so tests default to Routine until staff choose STAT.
- Bag planning partitions by STAT/Routine **before** temperature grouping.
- Collection/pooling runs in independent STAT/Routine partitions, including SST, lavender, red-top, additional blood sources and sterile urine cups.
- Print notes instruct staff to confirm STAT ordering and courier routing with receiving lab.

## Test cases checked in headless Chromium using an inline test page
- Room-temperature routine 249 and 243 + STAT 255: no shared SST transfer source allocation between STAT and routine.
- STAT 395 and routine 397: two distinct sterile urine cup collection entries (both random urine).
- STAT 1304 pH Feces: separate frozen STAT bag and amber stool specimen pill.
- Yellow urine pills and amber stool pills have the expected computed background colors in print media.
- STAT badge appears in source collection cards, test table and transport bag headings.
- No JavaScript page errors in the tested combinations.

## Notes
- Marking a test STAT changes *planning*, not lab order submission or courier scheduling.
- Confirm the receiving lab offers STAT processing for the specific order and use the approved STAT ordering/delivery workflow.
- STAT specimens must not be placed inside routine bags; preserve individual transport temperature and processing requirements.
