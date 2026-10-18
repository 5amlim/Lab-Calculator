# Bag print layout QA | v11.20

Validated in Chromium with print backgrounds enabled, A4 landscape, against v11.19:

- Single bag: one urine culture (Quest 395), 1 transport bag and 1 container; item contents identical.
- Two bags: urine culture (395) + OmegaCheck (92701), 2 transport bags and 2 containers; item contents identical.
- Four bags: 30-test mixed STAT/routine, room-temperature, refrigerated and frozen scenario, 4 bags and 30 transport containers; item contents identical.
- The multi-bag print test puts all four bag cards on the same final bag page, balanced in two columns, without splitting a smaller refrigerated/frozen group onto a separate page.
- Room, refrigerated and frozen retain distinct backgrounds and outer border colors. Routine titles are dark; routine priority is indicated by a small green marker, while STAT uses a red marker and outline.
- No JavaScript page errors or syntax errors. Original catalog data.js is unchanged.

Notes: Browser pagination varies with paper size, print scale, printer margins, and installed fonts. Extremely large bag lists can still span pages.
