# v11.72 submission print QA

- Original Gold and Tiger SST headings now say `Gold / Spun SST` or `Tiger Spun SST · 7.5 mL`, with body text `Submit in original tube · Spin ✓`.
- Transfer-source pills retain the original source count, tube illustration, and `From spun [source]` wording. Colored specimen-type text appears before `From` inside the pill, and an upward arrow outside the pill indicates a transfer.
- Printed `· Spin` cues end in `✓`. All test-specific LABEL lines are unchanged.
- Existing 8,096 source-layout regression checks passed, comparing every active test's collection, submission, and label output to v11.69.
- Rendered Chromium print comparisons passed at 390px and 1280px viewport widths for both Gold and Tiger modes; identical four-page print counts and source/label content. Actual mobile Safari printing remains unverified.
