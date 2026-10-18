# v11.29 Print heading and draw-volume spacing QA

## Changes
- Reordered the purple "What to Submit After Processing" heading so the bag-type chips appear before the existing bag-count badge, putting the count at the far right without resizing it.
- Applied 2px vertical / 9px horizontal internal spacing to Preferred and Minimum volume metric pills. Both pills remain compact and the parent card-header height is preserved.

## Browser print checks
- Chromium print media, 1440px viewport.
- Tested small (2 bags) and large mixed-temperature (4 bags) orders.
- In each order, the bag count was the final element and its right edge aligned with the heading summary right edge (0px residual gap).
- Collection header height before/after remained 33px in both test orders.
- Preferred and Minimum metric pills measured 18px high with padding `2px 9px`.
- No horizontal overflow or JavaScript page errors observed.
- Bag counts and per-bag container totals matched v11.28.
- Visually checked cropped screenshots of the bag heading and collection header.

No collection logic or catalog changes were made.
