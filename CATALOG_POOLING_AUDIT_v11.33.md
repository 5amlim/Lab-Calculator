# v11.33 collection / submission reconciliation

## Verified fixes

- **38287:** Quest's current published MRD test FAQ specifies two distinct 5 mL whole blood specimens in sodium-heparin green-top tubes. Collection and original-tube submission now each show **2 green tops**. The prior seed wording that said "Submit 1 aliquot" was removed; automatic original-tube reconciliation also now ensures an explicit multi-tube draw is not reduced to one submitted original tube.
- **90909:** The Quest directory lists EDTA **whole blood** as the preferred specimen. The collection group is now determined by the required specimen type, not the test name. The same rule prevents false urine classification for blood tests 2658, 37742, and 91745.
- **Dropdowns:** Native caret spacing increased for the specimen-type and STAT receiving-lab controls. No change to their widths or option lists.

## Programmatic audit scope

- Catalog entries checked for required fields and duplicate codes: **2,681** (2,674 active, 7 blocked).
- All **2,674 active** entries exercised through single-test collection and submission plan generation: **0 runtime errors, 0 empty collection plans, 0 empty submission plans, 0 zero-count containers**.
- **2,398 blood-test records** checked for original-tube collect/submission count mismatch: **0**.
- **960 reproducible mixed-order** STAT/routine scenarios, including Gold and Tiger SST settings, tested for source blood-tube count reconciliation: **0 mismatches and 0 exceptions**.
- Test-code duplicates: **0**.

## Limits

This validates the **calculator's bundled directory and internal workflow arithmetic**, NOT every combination of tests or every specimen requirement against Quest's live directory. Quest may change test codes, processing, stability, and regional availability. Collection/transport directions for an actual patient should always be checked against current receiving-lab instructions. This test does not establish clinical validation or guarantee zero specimen-processing errors.

## Sources checked

- Quest MRD FAQ: https://www.questdiagnostics.com/healthcare-professionals/clinical-education-center/faq/faq328
- Quest test 90909: https://testdirectory.questdiagnostics.com/test/test-detail/90909/maple-syrup-urine-disease-msud-mutation-analysis-ashkenazi-jewish?cc=MASTER&p=r
