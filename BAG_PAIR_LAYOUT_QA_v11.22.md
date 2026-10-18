# Transport bag paired-row layout QA | v11.22

Changes:
- The area inside the purple submission-plan border and outside the temperature-coded bags is near-white gray (#fafbfc), not pale lavender.
- Bags are paired by similar transport-card counts, producing two aligned, equal-height bags per row. A single unpaired bag fills the available width.
- Each bag retains one submission tube card per row. Bag colors and STAT/Routine badges are unchanged.
- A bag may still continue across printed pages for especially long lists; pagination is browser/printer-dependent. Paired equal-height bags can produce blank space inside the shorter bag.

Checks:
- Chromium print computed background: rgb(250, 251, 252).
- Single-bag plan: 1 matched row, 1 bag, 1 container.
- Two-bag plan: 1 row, paired bag heights 139px / 139px, both 1 container.
- Four-bag/30-test plan: 2 rows, paired heights 947px / 947px and 301px / 301px; container counts 19, 5, 5, 1, total 30.
- Rendered 1-, 2-, and 4-bag PDF outputs inspected, including page continuations.
- app.js passes Node syntax check; browser test had no script errors.
- data.js SHA-256 unchanged compared with v11.21.
