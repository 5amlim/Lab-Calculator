# v11.15 UI and STAT QA

Checked source structure, JS syntax, and safe action ordering. The browser preview was unavailable due to a browser environment restriction, so full visual verification must be performed after deployment.

- SST and urine-culture toggle widths: 198px; per-option font sizes retained.
- Selected test names stay single-line with a fade when space runs out; delete remains inline with hover/focus reveal.
- Test menu displays STAT eligibility for the selected Quest receiving laboratory and provides a Mark STAT action.
- New STAT routing requires explicit confirmation before adding or changing anything. Cancel leaves the order unchanged.
- Cart STAT assignments also require confirmation.
- Switching Quest regions refreshes eligibility and resets unsupported routing to Routine.
- No data, tube calculations or pooling code changed.
