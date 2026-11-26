# Container accuracy follow-up — 2026-11-26

Reviewed the committed inventory at a7a76744d41e685f24dc02589ed99ef43dec43a6. The inventory has 451 distinct lab/role/runtime-label entries (Labcorp 124 collect, 201 submit; Quest 50 collect, 76 submit). These are raw mapping labels, not 451 physically distinct supplies and not clinical verification. Held routes may remain visible in the raw inventory; confirm runtime hold status before treating a label as an actionable collection plan.

## Exact-code source comparisons

| Code | Finding | Disposition | Source |
| --- | --- | --- | --- |
| Labcorp 004788 | Active search code is not collection-held. Vendor specifies chilled fluoride/oxalate gray-top and a specialized perchloric-acid preparation kit; submitted material is supernatant, not routine whole blood. Published preferred/minimum are 0.5/0.2 mL, refrigerated. | Confirm clinic approval, specialized kit and SOP; no automatic substitution with ordinary gray-top or generic transport. Perchloric-acid blood processing is distinct from the expressly excluded acid-preserved urine collection workflow. No runtime change until scope is established. | https://www.labcorp.com/tests/004788/pyruvic-acid-whole-blood |
| Labcorp 071548 | Vendor permits royal blue EDTA plasma or no-additive serum routes; certified metal-free shipment vessel 111166 required. Preferred/minimum 7/0.6 mL; ambient storage. Search index identifies plasma. | Verify selected additive, certified vessel, volume and capacity against exact runtime record; do not treat serum and plasma alternatives as simultaneous draws. | https://www.labcorp.com/tests/071548/aluminum-serum-or-plasma |
| Labcorp 081162 | Vendor requires packed RBC and plasma as separate outputs from metal-free EDTA collection; preferred/minimum 3/0.5 mL each, refrigerated, received within five days. Runtime splitSubmissionContainers explicitly emits separate plasma and RBC outputs with shared source. | Preserve the distinct existing labels and non-pooling keys; verify draw yields, quantities and time limit in runtime regression before closing. | https://www.labcorp.com/tests/081162/copper-rbc-and-plasma |

## Mapping inventory exceptions to trace

- Quest raw submission mapping contains `ThinPrep vial (swab transferred immediately)` on one route. Identify exact active code and whether it is already suppressed; preserve cytology/Pap/ThinPrep exclusion. Do not remove an active record or presume an alternative route.
- Labcorp raw mapping contains four acidified urine aliquot routes and one preserved Monovette route. Five specific preserved-urine orders already have runtime holds; reconcile remaining raw mappings against hold codes and exact source rather than assuming all raw labels are actionable.
- Acid-washed/metal-free vessels, ascorbic-acid blood collection and acid-preserved urine are distinct. No broad substring-based exclusion or renaming.
- The collection/submission count register contains 41 high-volume entries. Resolve remaining approved vial capacity and exact aliquot requirements independently of collection counts.

This follow-up is a partial evidence/triage note, not a regenerated clinical ledger. No records are counted as newly fully verified; no clinical runtime change or active-test removal was made in this note. Keep 8477 Transport Tube and 16983 two 5 mL transport tubes, all other naming/grouping/pooling rules, and existing holds intact.

## ThinPrep exception resolved at exact-code level

Quest 14263 is the identified active route. The exact directory confirms both supported self-collection devices require ThinPrep and states the minimum as 1.5 mL. The code remains active/searchable with a collection-review hold, suppression of automatic collection/shipment counts, and no automatic crosswalk mapping. No substitute container was assumed. Source: https://testdirectory.questdiagnostics.com/test/test-detail/14263/hpv-dna-16-18-other-high-risk-pcr-vaginal-self-collected?cc=MASTER


## High-volume and trace-metal follow-up

- 700844: Plain red-top; no separator gel; Room Temperature for routine transport; refrigerate or freeze for storage beyond 3 days. Collection tube and account-specific transport verified; 7 mL and vial allocation not verified. Source: https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog
- 702879: Plain red-top; no separator gel; Room Temperature for routine transport under 3 days. Collection tube and account-specific transport verified; 7 mL and vial allocation not verified. Source: https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog
- 502013: Gel-barrier tube or plain red-top; Frozen. SST selected in catalog; source tube and freezing supported, exact volume and frozen-vial type/count remain unverified. Source: https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog
- 502511: Gel-barrier tube or plain red-top; Frozen. SST selected in catalog; source tube and freezing supported, exact volume and frozen-vial type/count remain unverified. Source: https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog
- 502577: Gel-barrier tube; Frozen. SST selected in catalog; source tube and freezing supported, exact volume and frozen-vial type/count remain unverified. Source: https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog
- 502669: Gel-barrier tube or plain red-top; Frozen. SST selected in catalog; source tube and freezing supported, exact volume and frozen-vial type/count remain unverified. Source: https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog
- 551725: EDTA lavender or PPT; Frozen. Reconciled previously recorded exact-code client listing; volume and vial allocation remain unverified. Source: https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog
- 551870: EDTA lavender or PPT; Frozen. Reconciled previously recorded exact-code client listing; volume and vial allocation remain unverified. Source: https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog
- 284459: EDTA lavender; Refrigerated. Indexed SJMC client listing excerpt supports current draw and temperature. Full listing and exact page could not be retrieved; separation time, volumes and shipment vessel remain open. Do not substitute requirements from 138962. Source: https://cdos.halfpenny.com/labcorp/sjmc/Home/PrintCatalog
- 071548: Royal blue EDTA for plasma or royal blue without EDTA for serum; Room Temperature. Exact vendor source reviewed. Existing search selects plasma; confirm actual normalized source and certified transport tube 111166, available fill capacity and regional acceptance before closing. Source: https://www.labcorp.com/tests/071548/aluminum-serum-or-plasma
- 081162: Metal-free royal blue EDTA; Refrigerated. Exact vendor source reviewed. Existing runtime explicitly separates plasma and packed RBC outputs; confirm draw yields and five-day receiving limit in complete plan. Source: https://www.labcorp.com/tests/081162/copper-rbc-and-plasma

Labcorp 500335: public catalog lists the two-measurement order, but exact-code container/volume details were unavailable. Do not extrapolate from single-order 500138. Remains open. No runtime, custom stock naming, grouping, pooling or search changes in this batch.

## Swab and neonatal source intake

- quest 10016: Partially verified. Exact public source reviewed; normalized per-code route and all receiving accounts still require comparison. Preserve the clinic's orange-label kit and existing label aliases. Do not extrapolate the freezing allowance to Labcorp. Source: https://testdirectory.questdiagnostics.com/test/test-detail/10016/sureswab-advanced-bacterial-vaginosis-bv-tma?cc=MASTER
- quest 10119: Partially verified. Exact public source reviewed; normalized per-code route and all receiving accounts still require comparison. Preserve the clinic's orange-label kit and existing label aliases. Do not extrapolate the freezing allowance to Labcorp. Source: https://testdirectory.questdiagnostics.com/test/test-detail/10119/sureswab-advanced-vaginitis-tma?cc=MASTER&p=r
- quest 10120: Partially verified. Exact public source reviewed; normalized per-code route and all receiving accounts still require comparison. Preserve the clinic's orange-label kit and existing label aliases. Do not extrapolate the freezing allowance to Labcorp. Source: https://testdirectory.questdiagnostics.com/test/test-detail/10120/sureswab-r-advanced-vaginitis-plus-tma?cc=DAL
- quest 10123: Partially verified. Exact public source reviewed; normalized per-code route and all receiving accounts still require comparison. Preserve the clinic's orange-label kit and existing label aliases. Do not extrapolate the freezing allowance to Labcorp. Source: https://testdirectory.questdiagnostics.com/test/test-detail/10123?cc=MASTER
- quest 6631: Partially verified. Indexed exact Quest directory supports existing neonatal override for original spun amber Microtainers; existing regression fixture also asserts two tubes. Direct page access returned a browser notice; receiving-account and full runtime comparison remain open. Source: https://testdirectory.questdiagnostics.com/test/test-detail/6631/?cc=MASTER
- quest 20381: Source inaccessible. Exact Quest page returned browser notice. DLO's same-code page supports two spun amber SST Microtainers as a shipment option (https://www.dlolab.com/bilirubin-total-neonatal); do not treat this as receiving-account confirmation. Existing override retained. Source: https://testdirectory.questdiagnostics.com/test/test-detail/20381/?cc=MASTER
- quest 34162: Source inaccessible. Exact Quest page unavailable. Existing neonatal override retained, not independently confirmed in this pass. Source: https://testdirectory.questdiagnostics.com/test/test-detail/34162/?cc=MASTER
- labcorp 180021: Partially verified. Exact vendor container and temperature agree with located raw catalog entry. Runtime plan and receiving account still open. Source: https://www.labcorp.com/tests/180021/vaginitis-plus-vg-nuswab
- labcorp 180039: Partially verified. Exact vendor source reviewed; normalized per-code route still needs comparison. Do not assume kit compatibility or change existing aliases. Source: https://www.labcorp.com/tests/180039/vaginitis-vg-nuswab
- labcorp 180042: Partially verified. Exact vendor container and temperature agree with located raw catalog entry. Runtime plan and receiving account still open. Source: https://www.labcorp.com/tests/180042/vaginitis-vg-with-candida-six-species-nuswab
- labcorp 180066: Partially verified. Exact vendor source reviewed; normalized per-code route still needs comparison. Do not assume kit compatibility or change existing aliases. Source: https://www.labcorp.com/tests/180066/vaginitis-plus-vg-herpes-simplex-virus-hsv-nuswab
- labcorp 180068: Partially verified. Exact vendor source reviewed; normalized per-code route still needs comparison. Do not assume kit compatibility or change existing aliases. Source: https://www.labcorp.com/tests/180068/vaginitis-plus-vg-with-candida-six-species-nuswab
- labcorp 180071: Partially verified. Exact vendor source reviewed; normalized per-code route still needs comparison. Do not assume kit compatibility or change existing aliases. Source: https://www.labcorp.com/tests/180071/vaginitis-vg-herpes-simplex-virus-hsv-nuswab
- labcorp 180026: Partially verified. Exact source reviewed; compare normalized route in next pass. Aptima is not a substitute for this order. Source: https://www.labcorp.com/tests/180026/vaginitis-vaginosis-dna-probe
- labcorp 138677: Partially verified. Exact source agrees with located raw preferred pathway. Other validated routes and runtime plan still open. Source: https://www.labcorp.com/tests/138677/bordetella-pertussis-and-bordetella-parapertussis-real-time-dna-pcr
- labcorp 180800: Partially verified. Exact source reviewed; compare normalized per-code route and receiving account. Source: https://www.labcorp.com/tests/180800/group-a-streptococcus-detection-naa?letter=B
- labcorp 015602: Partially verified. Exact source reviewed; verify calculator's selected route. Do not extrapolate Quest's two-Microtainer rule to Labcorp. Source: https://www.labcorp.com/tests/015602/bilirubin-total-neonatal

Source intake is not normalized runtime verification. No clinical runtime changes; no active-test removal or new holds. The Quest and Labcorp stability rules must remain distinct.
