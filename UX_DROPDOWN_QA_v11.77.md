# v11.77 dropdown QA

- Tested actual calculator HTML, CSS, bundled data, and application code in Chromium at 1280, 768, and 390 px widths.
- No JavaScript errors. In-page STAT list opens and closes, stays within viewport, selects Orange RRL, and updates the STAT test menu/count.
- Verified keyboard arrow opening and Escape close; selected menu option persists in existing STAT selection flow.
- Filters popover opens/closes and no longer overlaps with an open STAT dropdown.
- Filter nested dropdowns and Add Missing Test form selects have 44 px reserved padding and the same chevron icon inset 14 px from right border.
- Bundled `data.js` matches v11.76 byte-for-byte; all print and calculation code preserved.
- iPhone Safari behavior still requires a real-device check.
