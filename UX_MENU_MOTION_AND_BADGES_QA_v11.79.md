# v11.79 dropdown motion and container icon QA

- Added a 145 ms, subtle fade/vertical movement animation to in-page Filters, STAT receiving lab, and Add/Edit Test option menus. Portal-select closing uses a 105 ms fade and slight upward motion; native select values are unchanged. `prefers-reduced-motion` suppresses animation.
- In Add/Edit Test draw-container and transport-container menus, existing tube illustrations are reused for identifiable tubes and cups. Icons also appear in the selected control; unknown/special manual options are left without potentially misleading icons.
- “No transfer / submit in original tube” (and “Whole Blood / Original Tube”) derives the icon from the currently selected draw container, refreshing on draw-container selection or custom draw text updates. It does not modify the transport selection value.
- Escape closes the active portal menu without triggering a native dialog close.
- Chromium tests at widths 390, 768, and 1280 px passed option selection, dynamic Gold SST to Lavender EDTA icon switching, Filters and STAT menu open/close, and keyboard Escape. Reduced-motion override passed.
- Add Missing Test was saved with specimen type, Gold SST, original-tube transport and temperature selected via the new portal controls in Chromium at widths 390 and 1280 px. For this isolated local-file test only, localStorage was shimmed because about:blank blocks storage. No runtime page errors were observed.
- `app.js`, `data.js`, and `styles.css` are byte-for-byte identical to v11.78. Existing STAT menu regression passed; no catalog, handling, label, pooling, container count or print logic changes.
- Actual iPhone Safari dropdown performance has not been independently tested.
