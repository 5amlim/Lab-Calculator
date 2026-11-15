# Quest and Labcorp container grouping audit

Reviewed November 14, 2026 (Pacific time). Applies to Quest and Labcorp collection calculators. This is a structural planner audit, not a line-by-line certification of all vendor directory entries. Always check the current test-specific performing-laboratory requirements before collecting a specialized specimen.

## Changes

| Area | Previous failure or inconsistency | Updated behavior |
| --- | --- | --- |
| Quest 1430 and related gray-top glucose tests | The gray-top source and additive-free separated-plasma alternate could be confused with an additional additive-containing gray tube. The generic centrifuge settings could overstate official test directions. | Each timed source is a dedicated gray fluoride/oxalate draw, processed separately; the selected submission is a clean **additive-free** plastic screw-cap vial, with a green **transport** badge for the vial. The 1430 fasting and 1-hour specimens remain separate. Use lab-validated centrifugation. |
| Unpreserved urine aliquot | Plain plastic urine aliquot labels generated an extra proprietary transport tube even when an ordinary sterile leakproof screw-cap cup is appropriate. | Normalize supported unpreserved urine aliquot tubes/vials/containers to the existing **Sterile cup** stock in Quest and Labcorp. Keep the original 24-hour/timed urine collection jug and show its submission aliquot separately. |
| Quest 229 and negative acid qualifiers | A test with a collection jug labeled **no HCl** was misread as needing an acid-preserved specialty container, causing Quest 229 to submit a fabricated *24-Hour Urine Transport Tube* rather than a sterile-cup aliquot. | Both calculator classifiers now distinguish **no/without HCl** and **no acid preservative** from genuinely acid-preserved collection devices. Quest 229 keeps the original 24-hour jug and submits one unpreserved sterile-cup aliquot, subject to receiving-lab acceptance. |
| Specialty urine | Broad cup grouping could incorrectly represent a metal-free collection cup as an ordinary sterile cup. | Special source devices retain exact identifiers and container classes. Verified regression: Labcorp 809523 shows **Metal-free Plastic Urine Collection Cup**, not plain sterile cup. |
| Ordinary serum/plasma transfers | Equivalent plastic transport vial names produced separate green badge groups. | Use the same green-top-style **transport badge** for compatible plastic serum/plasma tube/vial naming variants. Keep source tube, specimen type, source material, transport temperature, required processing, priority and dedicated aliquots distinct. |
| Frozen and specialty materials | Broad matching could mix incompatible tubes visually. | Frozen serum/plasma/platelet-poor plasma uses dedicated frozen badges; amber/light-protected, acid-washed, metal-free, preservative, and other specialty devices remain distinct. |
| Browser caching | Old calculator scripts could remain cached after deployment. | Bumped Quest and Labcorp script versions in their HTML entrypoints. |

### Quest 1430 clinical note

The user-requested transfer into a **new gray-top oxalate tube** was **not** implemented as mandatory. The directory lists gray fluoride/oxalate as the preferred collection/transport tube and separately collected plasma in an additive-free screw-cap vial as an allowed alternative. Adding plasma to a second empty additive-containing anticoagulant tube must not be represented as a vendor-validated requirement without explicit written approval. The calculator currently follows the separated-plasma, additive-free transport-vial alternative. Confirm accepted routing with the receiving laboratory.

### Controls preserved

- Do not convert red/yellow swirl UA, gray urine-culture, Aptima, acid-preserved, trace-metal, or light-protected containers to a plain sterile cup.
- Never combine distinct patient specimens, separate glucose timepoints, or separately ordered timed urine collections.
- Do not substitute a blood collection tube with a transfer device merely because the same green *transport illustration* is used.
- Do not pool separate source matrices, frozen aliquots, or dedicated test-specific transports.

### Validation

An additional structural planner sweep executed 52 active Quest supplemental records and 469 Labcorp catalog records in available modules, checking for missing submission cards, incorrect plain urine alias submissions and acid-preserved source containers collapsing to sterile cups. No such errors were found in that selection; this is not a complete independent review of all catalog records. Targeted direct planner execution after the follow-up fix confirmed Quest 229 (one sterile cup), Quest 8280 (one yellow-top UA tube), Quest 523 (one sterile-cup frozen aliquot), Quest 1430 (two separately submitted additive-free plasma vials), and Labcorp 809523 (separate metal-free transport). The regression suite now tests negated versus genuine HCl-preserved urine source labels. The application scripts were syntax-checked. The Quest catalog (base data and selected November verified overlays) and Labcorp catalog modules (audited in four batches) were inspected programmatically for missing submission cards, frozen serum/plasma shown as ordinary green transports, and specialty urine shown as plain cups. Additional targeted planner runs verified compatible serum aliases consolidate, 24-hour urine retains its source container, and frozen plasma is isolated. The Labcorp 809523 misclassification found during the audit was corrected and separately rechecked. Regression cases are maintained in `tests/container-grouping-parity-20261115.test.cjs` and the existing Quest/Labcorp specimen tests.

**Limit:** This does not constitute a fresh official-directory comparison of every test's current minimum volume, stability, collection tube, and processing instructions, and the full Node test suite was not run in this connection. Do not claim that all vendor records have been independently validated.


## Timed-specimen print grouping and allocation, November 14 follow-up

A repeated container type does **not** mean two different draw times can be combined physically. The printed shipping-bag presentation now groups matching containers from the *same ordered timed protocol* into one card and sums the displayed quantity. It preserves independent label instructions and the explicit warning **Keep separate, do not pool**. Physical collection and submission allocations continue to contain one specimen per required timepoint. Groups remain separate by test/order, transport temperature, source tube, specimen matrix and submitted container.

- Quest **1430**, **19834**, **35181**, **18927**, **23475**, **16292** and **6745**: matching gray fluoride/oxalate tubes transfer to independent additive-free plastic plasma vials using the verified alternate route. The printout displays one card per selected protocol, with two, three or four separately labeled specimens as appropriate. Quest 23475 was corrected from an erroneous four-source-tube pathway to the official *three* samples (fasting, 1-hour, 2-hour). The preferred original gray tube remains a laboratory-accepted alternative; verify locally before selecting the transfer route.
- Quest **15853**: corrected to **five** distinct serum draws and **five** separate frozen serum transport tubes. All five show under one print card, with individual labeled sample numbers and actual collection times. The post-load timing follows the provider's ordered five-specimen protocol; the calculator must not invent the time schedule.
- Labcorp **042045** and **042060**: exactly **two** separate serum transport tubes per order, each with its specified individual volume. The earlier 042045 total of three was caused by reading a two-tube total as an additional two tubes and then including its separately required second aliquot.
- Multi-timepoint original collection tubes also remain distinct in the physical plan, even if shown in one print card. Ordinary compatible same-timepoint serum/plasma pooling remains available; separately timed specimens are excluded.

Validation: direct JavaScript execution of Quest gray-top protocols, Quest 15853, Labcorp two-tube thyroglobulin protocols, synthetic timed original-tube and transfer-tube protocols, ordinary compatible serum pooling, and cross-temperature behavior. Source/submit/print counts reconciled for the tested scenarios. Structural screening of 76 Quest supplemental catalog records and 336 Labcorp catalog records found no empty submission plans or physical-versus-print count mismatches; this is **not** a complete vendor-directory audit. New regression coverage: `tests/print-timed-specimen-grouping.test.cjs`. Full Node test suite was not executed in this connection.

Official sources:
- Quest 23475: https://testdirectory.questdiagnostics.com/test/test-detail/23475/?cc=MASTER
- Quest 15853: https://testdirectory.questdiagnostics.com/test/test-detail/15853/?cc=MASTER
- Labcorp 042045: https://www.labcorp.com/tests/042045
- Labcorp 042060: https://www.labcorp.com/tests/042060

