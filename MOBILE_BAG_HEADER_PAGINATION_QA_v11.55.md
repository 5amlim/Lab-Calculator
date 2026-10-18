# Mobile submission header pagination (v11.55)

The printed submission section now always starts a fresh page when at least one transport bag is present. In v11.54, 1-2 bag orders could start partway down a collection page. Mobile WebKit then deferred the first indivisible bag row, while leaving the section heading and purple border on the prior page.

This is a print-only pagination change. Print CSS continues to use the existing two-column bag grid, matching desktop. No changes were made to pooling, test data, labels, bag counts, or routing logic.

Browser verification: Chromium at 390 px and 1280 px with a multi-serum-test order. Safari iOS requires real-device verification.
