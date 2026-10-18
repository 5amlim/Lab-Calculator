# v11.28 print bag header and footer QA

## Changes

- Moved shipping, tube-sharing, urine, order-of-draw, missing-test, and ownership notes to **after** the complete What to Submit After Processing section.
- Added one compact dark gray masthead to each printed bag, numbered **Bag 1/N** through **Bag N/N**, centered in reading order.
- Relocated the Routine / STAT priority badge to the masthead's top right; the red or green left accent continues across the masthead and the bag body.
- Preserved bag priority order, temperature colors, paired bag rows, inner tube rows, specimen assignments, and calculations.

## Browser / print validation

Chromium headless print simulations compared v11.27 and v11.28 with one, three, and four bags:

| Case | Bag count | Order check | Notes after bag section | Container counts vs. v11.27 | Result |
|---|---:|---|---|---|---|
| Single urine culture | 1 | Bag 1/1 | Yes | Unchanged | Pass |
| Mixed STAT and routine | 3 | Bags 1/3 through 3/3 | Yes | Unchanged | Pass |
| 30-test mixed-temperature order | 4 | Bags 1/4 through 4/4 | Yes | Unchanged | Pass |

Tested centered label, 20px masthead height, dark gray background, priority badge positioning, the left-color bar, footer order, PDF text output, and JavaScript syntax. Large orders may continue onto another page, as in prior versions. The footer may start on the same page as the last bags and continue onto the next.
