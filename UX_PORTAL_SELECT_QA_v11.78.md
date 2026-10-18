# In-page dropdown QA (v11.78)

## Changes
- Indent nine Southern California RRL choices beneath their heading in STAT receiving lab picker.
- Replace native picker presentation for seven controls within Filters and Add/Edit Test (eight overall, including optional Spin) with in-page, scrollable popovers. Existing select elements remain the data source for existing filter, save, custom-container, and spin logic.
- Keep consistent chevrons, right padding, keyboard and Escape handling, and mobile scrolling.

## Browser checks
Verified in Chromium at viewport widths 390, 768, and 1280 pixels:
- Filter specimen and temperature combinations update values and the active filter count. Clear filters resets the visible and underlying selections.
- STAT receiving lab menu shows nine indented Southern California entries; selecting Arcadia updates the selected lab.
- Add Missing Test specimen and SST selection update the underlying form. The Spin choice becomes disabled and 'Yes' for SST as before.
- Custom transport container selection reveals and enables its text input.
- Transport temperature selection, saving a complete custom test, and required-field checks all pass.
- No runtime page errors in these checks. These are Chromium checks, not actual iPhone Safari print/popup checks.

## Data safety
`data.js` is byte-identical to the v11.77 release. Pooling, collection counts, bag assignments, and printed LABEL logic were not edited. The STAT-directory QA script also passed.
