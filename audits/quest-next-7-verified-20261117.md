# Quest remaining-reference audit: verified activation tranche

Reviewed and published 2026-11-17. This is a **seven-test incremental activation**, not a determination that the remaining Quest reference-only catalog is wholly collectable. Both `5amlim/Lab-Calculator` and `5amlim/Quest-Calculator-Test` load `assets/js/quest-source-verified-remaining-20261117.js` before `assets/js/app.js`.

| Code | Test | Collect | Submit | Ship | Verified source |
|---|---|---|---|---|---|
| 16186 | HIV-1 RNA quantitative CSF | Original Sterile cup, 3 mL (min 1.1) | Same original Sterile cup, no heparin | Frozen | https://testdirectory.questdiagnostics.com/test/test-detail/16186/hiv-1-rna-quantitative-real-time-pcr-csf?cc=MASTER |
| 16441 | JC polyoma DNA qualitative CSF | Original Sterile cup, 0.7 mL (min 0.3) | Same original | Frozen | https://testdirectory.questdiagnostics.com/test/test-detail/16441/jc-polyoma-virus-dna-qualitative-real-time-pcr-csf?cc=MASTER&p=r |
| 18889 | BK polyoma DNA qualitative CSF | Original Sterile cup, 0.7 mL (min 0.3) | Same original | Frozen | https://testdirectory.questdiagnostics.com/test/test-detail/18889/bk-virus-dna-qualitative-real-time-pcr-csf?cc=MASTER&p=r |
| 19895 | Coxsackie A antibodies CSF | Original sterile leakproof Sterile cup, 2 mL (min 0.5) | Dedicated sterile Transport Tube | Room temperature | https://testdirectory.questdiagnostics.com/test/test-detail/19895/coxsackie-a-antibodies-csf?cc=MASTER&p=r |
| 37476 | Echovirus antibodies CSF | Original sterile leakproof Sterile cup, 2 mL (min 1) | Same original | Room temperature | https://testdirectory.questdiagnostics.com/test/test-detail/37476/echovirus-antibodies-csf?cc=MASTER&p=r |
| 37612 | Varicella-zoster ACIF antibody CSF | Original sterile leakproof Sterile cup, 1 mL (min 0.1) | Same original | Room temperature | https://testdirectory.questdiagnostics.com/test/test-detail/37612/varicella-zoster-virus-antibody-acif-csf?cc=MASTER |
| 94263 | C-peptide 24-hour urine | 24-Hour Urine Container, keep refrigerated throughout collection | 2 mL well-mixed aliquot to approved sterile Transport Tube (min 0.5) | Frozen | https://testdirectory.questdiagnostics.com/test/test-detail/94263/c-peptide-24-hour-urine?cc=MASTER |

## Rules preserved

- CSF is collected only by qualified procedural personnel; no clinic-prepared smears or slides.
- Original Sterile cup remains the submit container when Quest calls for unchanged original sterile leakproof specimen; only transfer when required.
- The 24-hour urine source and submitted aliquot are correctly named and grouped; record collection volume/duration and never submit preservative gray urine tube as the aliquot.
- CSF and urine labels include the actual specimen; no automatic date/time prose was added.
- Frozen and room-temperature specimens stay in separate transport bags. Source-specific volumes and processing retained.
- Existing active/blocked entries cannot be overwritten; only reference/pending records with exact matching Quest codes are activated.
- Receiving market/account orderability is separate from specimen verification. Confirm Quest service area before collection. 94263 is not offered by Nichols San Juan Capistrano.

## Held

- 16581 BK virus quantitative urine: requires a cobas PCR media tube, which cannot be assumed stocked; no automatic generic urine cup substitution.
- 93196 Bisphenol A urine: requires verified polypropylene container supply, not a generic sterile cup. Held until collection stock is confirmed.
- 90861 Coccidioides CSF serology: specimen and transport protocol is not exposed for an unspecified service area in the currently accessible official page; held until region-specific acceptance and requirements confirmed.
- 37710 Hu CSF already active in a previous bundle, not duplicated.

## Validation

New script: seven distinct Quest codes; all entries include source link, specimen type, preferred/minimum volume, original collection and submitted container, special labeling, clinical categories, and a named transport temperature. Script loads before app initialization in both published repositories and is the same source code in both. Verified references, temperature grouping and duplicate guards by direct source/static checks. Full headless browser regression and live Quest account-orderability testing were not performed.
