# v11.49 cart header QA

- Relocated the live selected test count immediately after **Cart**.
- Relocated the existing `printButton` into the cart header, aligned to the second row opposite Show/Hide details. The single original print handler and disabled state remain intact.
- Browser-tested at 375, 390, 520, 700, 980 and 1280 px: Add a missing test and Clear all combined row width matches Print / Save PDF width to within 1 px; no viewport horizontal overflow or JS page errors.
- Browser-tested with one selected test at 390 and 1280 px: dynamic count updates to `1 test`, print button becomes enabled, clicking it invokes the original print routine and populates the Lab Collection Summary, and Details toggling remains functional.
- No specimen routing, pooling, count calculations or print stylesheet changes.
