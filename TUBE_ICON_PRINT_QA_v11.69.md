# v11.69: Restore complete printed tube / container icons

The added specimen-type pill badges in v11.67 introduced `overflow: hidden` on the entire tube label, inadvertently clipping the top and bottom of its CSS-drawn tube/container icon.

The inner text label now clips long container names while the outer tube span remains visible and has adequate height for the complete icon. The right-aligned specimen badge, source/processing lines, and other print behavior are retained.

No collection, pooling, temperature, labeling, STAT, or bag-routing code changed.

## Print verification

- Reproduced v11.68 clipping: the inline tube spans measured 9 px high with `overflow: hidden`, which cut 16 px icons at the top and bottom.
- v11.69 fixed spans measure 20 px high with `overflow: visible`; all six representative tube/container icons fit entirely inside their spans.
- Tested serum transport, acid-washed/metal-free serum transport, Total-Fix, sterile cup, and royal blue EDTA examples.
- 390 px mobile and 1280 px desktop Chromium print measurements matched, including all existing specimen-type badges.
- Both mobile and desktop use the same print CSS. Browser-specific iOS Safari print engine not directly verified.
