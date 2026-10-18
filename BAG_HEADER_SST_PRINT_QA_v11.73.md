# v11.73 Bag header and SST print naming QA

- Changed printed bag topbar from blank spacer, centered priority, plain `Bag N/M` on right to `BAG` on left, centered Routine/STAT, and `N/M` in a small light-colored badge on the right.
- Printed original spun SST headers are `Gold SST (Spun)` and `Tiger SST (Spun)` without changing collection/transport calculations or source data.
- Verified with a real print view using Chromium from 390px and 1280px screen widths; output has the same content and topbar dimensions at both widths. Checked Gold/Tiger name on both.
- Ran `qa_submission_source_layout_v11.70.js` against 2692 directory records: PASS 8096 checks for unchanged counts and LABEL instructions. iPhone Safari on-device print not verified.
