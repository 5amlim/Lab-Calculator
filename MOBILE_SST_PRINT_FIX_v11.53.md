# v11.53 mobile SST print fix

- Problem: iOS Safari PDF/print sometimes renders `-webkit-mask-image` gradients on long SST test list items as solid black bars, hiding all names.
- Fix: In print CSS, remove WebKit/CSS masks from long SST list items and use `text-overflow: ellipsis` with `overflow: hidden` and `white-space: nowrap`.
- Preserves normal two-column layout for long SST test lists and full test names in the detailed table.
- Chromium tests at 390 px and 1280 px produce identical 10-inch-wide print card geometry and visible names. iOS Safari print should be manually tested after deployment because Chromium cannot emulate WebKit printing.
- No changes to processing requirements, pooling or tube counts, STAT/routine separation, or application functionality.
