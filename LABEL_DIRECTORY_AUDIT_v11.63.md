# Directory LABEL Audit | v11.63

Audited all 2,692 built-in directory records, including 2,685 active records and 7 blocked records. Rendered each active test alone through the submission-card label generator.

## Audit results
- LABEL badges on active single-test printouts: 677 before; 481 after. 196 redundant badges removed.
- Cleared 9 records with non-label directives in `specialLabeling`: 599, 3058, 10251, 22996 (trace-metal-free collection containers), 948 (protect from light), 3141 (trace-metal-free stool container), 13595, 13600, 91431 (routine patient identifier/HIV-only submission notices). The core collection/handling restrictions remain in their actual fields.
- Routine primary-collection Urine/Stool badges removed. Routine RBC-source labels on original RBC tubes removed. True original-container exceptions (e.g. collection time, timed glucose, swab site, 24-hour urine) remain.
- Transport tube labels for serum, plasma, special source/additive, specimen site, PEAK/TROUGH and 24-hour urine remain. Amber serum from SST is labeled simply Serum, not Serum from Gold / SST.
- Generic Swab tests no longer auto-label a specific anatomical site merely because their instructions list that site as acceptable. They use Collection site: ____ unless the name or specimen type identifies a site.

## Regression checks
- 2,685 active records rendered without label-generation errors.
- 154 single/mixed order scenarios: same bag groups, container counts, collection tube counts, and Gold/Tiger estimates before and after the label-only changes.
- Label-specific checks: unwanted badges absent for 599, 3058, 10251, 22996, 948, 3141, 396, 3479, 13595; true labels retained for 6921, 19833, 250, 444, 890, 5406, 37847, 37849, XXX, 10212, 285, 22, 2692.
- Browser script loading and test-count display checked in Chromium at 390px and 1280px widths. Real iPhone/Safari print behavior not verified.

All specimens still require standard patient identifiers and reference-lab-compliant labeling. The absence of an additional LABEL badge does not override routine specimen identification policy.
