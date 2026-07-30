# Version 6.6 Fasting Preparation Audit

## Scope

All 257 built-in test records were reviewed for fasting-related patient preparation. Records with plausible fasting considerations were checked against current official test-directory entries or current performing-laboratory instructions.

## Results

- 15 records are explicitly marked **Fasting required**.
- 12 records are explicitly marked **Fasting preferred**.
- Records whose current instructions state no preparation, no fasting requirement, or no fasting preference remain unflagged.
- Standard lipid panels remain unflagged because fasting is not required when they are ordered as lipid panels.

## Required fasting records

- 372 — C-Peptide
- 561 — Insulin
- 571 — Iron, Total
- 5616 — Iron/TIBC and Ferritin Panel
- 7573 — Iron, Total and TIBC
- 37847 — Lipoprotein Fractionation, NMR
- 37849 — Lipoprotein Fractionation, NMR with Lipid Panel
- 91731 — Cardio IQ Insulin
- 17406 — Collagen Type I C-Telopeptide (CTx)
- 10189 — Micronutrient Vitamin B1
- 94154 — TMAO
- Vitamin E — blocked/local do-not-perform record
- Vitamin B6 — blocked/local do-not-perform record
- 36562 — Cryoglobulin, do not collect onsite
- 90559 — Very Long Chain Fatty Acids

## Preferred fasting records

- 10165 — Basic Metabolic Panel
- 10231 — Comprehensive Metabolic Panel
- 746 — Prolactin
- 549 — Immunofixation, Serum
- 747 — Serum Protein Electrophoresis
- 19894 — DHEA, Unconjugated
- 37859 — Complement C3, C4, CH50
- 92701 — OmegaCheck
- 91001 — Omega-3 and Omega-6 Fatty Acids
- Vitamin C — blocked/local do-not-perform record
- 36378 — ANAlyzeR ANA Reflex Panel
- ADMA/SDMA — blocked/local do-not-perform record

## Display behavior

The calculator stores verified fasting status separately from free-text notes. The selected-test summary and printed collection plan show the status, preparation instruction, test code, and test name.

## Limitations

Directory requirements may change and can differ by service area or orderable test version. This audit records the instructions verified for the current built-in test list; staff should confirm unusual, specialty, or recently changed orders in the current official directory.


## Green heparin audit — 2026-07-30
- 528 HLA-B27 Antigen: Green Sodium Heparin preferred; lithium heparin rejected.
- 14596 Chromosome Analysis, Blood: Green Sodium Heparin preferred.
- 36970 QuantiFERON-TB Gold Plus, 1 Tube: No-gel Green Lithium Heparin required.
- The prior generic Green Heparin label was split into additive-specific labels.


## Quest green-heparin audit — 2026-07-30

### Primary or preferred green-heparin collection
- 36970 — QuantiFERON-TB Gold Plus, 1 Tube: no-gel Green Lithium Heparin is required; sodium heparin is not an acceptable substitute.
- 14596 — Chromosome Analysis, Blood: sodium heparin is required; Green Sodium Heparin is preferred, with sodium-heparin royal-blue or tan tubes as alternatives.
- 528 — HLA-B27 Antigen: Green Sodium Heparin is preferred; Lavender EDTA or Yellow ACD are acceptable alternatives. Lithium heparin is rejected.

### Green heparin accepted only as an alternative
- 16265 — Procalcitonin: sodium or lithium heparin plasma accepted; red-top serum is preferred.
- 17180 — 17-Hydroxyprogesterone: sodium or lithium heparin plasma accepted; red-top serum is preferred.
- 17182 — Androstenedione: sodium or lithium heparin plasma accepted; red-top serum is preferred.
- 17183 — Progesterone, LC/MS: sodium or lithium heparin plasma accepted; red-top serum is preferred.
- 19894 — DHEA, Unconjugated: sodium or lithium heparin plasma accepted; frozen red-top serum is preferred.
- 8579 — Vancomycin, Trough: sodium or lithium heparin plasma accepted; red-top serum is preferred.
- 22060 — Lamotrigine: sodium heparin plasma accepted; lithium heparin is not listed. Red-top serum is preferred.

This audit covers the calculator’s current built-in test list, not every test offered by Quest. Quest requirements can vary by service area and may change.


## Order-of-draw and Royal Blue audit — 2026-07-30

- Fixed a browser-data migration issue that could leave older built-in tube labels in place.
- Order-of-draw detection now reads the preferred draw container only. Alternative containers do not imply that an additional tube should be drawn.
- Green Sodium Heparin and Green Lithium Heparin as the preferred draw tube activate the heparin step.
- Royal Blue EDTA tubes are labeled with a purple stripe.
- Royal Blue No Additive tubes are labeled with a red stripe.
- Royal Blue Sodium Heparin remains additive-specific.
- Superseded in v7.0: all Royal Blue tubes now appear together in one dedicated Royal Blue order-of-draw step.
- Staff should verify the additive on the tube label and not rely on stopper color alone.

## Royal-blue source and order-of-draw correction — 2026-07-30

- Corrected a matching-order defect that caused Royal Blue EDTA (purple stripe) to display as Lavender EDTA in processed-specimen source text.
- Corrected a matching-order defect that caused Royal Blue No Additive (red stripe) to display as Red Top in processed-specimen source text.
- Code 363 Copper now identifies the processed specimen as plasma from Royal Blue EDTA (purple stripe).
- Code 16599 Iodine, Serum/Plasma now identifies the processed specimen as serum from Royal Blue No Additive (red stripe).
- All royal-blue tubes are grouped together in the nurse order-of-draw panel; the stripe/additive remains explicit on each tube badge.

## Comprehensive Royal Blue / trace-metal audit — 2026-07-30

- Reviewed every built-in record containing a Royal Blue or trace-metal collection instruction.
- Corrected source attribution so processed specimens retain the exact original collection tube: Royal Blue EDTA (purple stripe), Royal Blue No Additive (red stripe), or Royal Blue Sodium Heparin.
- Consolidated all Royal Blue tubes into one nurse order-of-draw step; individual collection and submission badges still identify the stripe and additive.
- Corrected 623 Magnesium, RBC to the packed-RBC workflow: Lavender EDTA or Royal Blue Sodium Heparin collection, centrifuge, discard plasma, transfer RBCs to a trace-element/metal-free vial, refrigerate.
- Corrected 599 Lead (Venous), 6296 Selenium Blood, 6354 Zinc RBC, 3481 Copper RBC, and 17133 Selenium RBC collection/processing details.
- Confirmed 363 Copper and 16599 Iodine require an acid-washed/metal-free transport vial after separation from their Royal Blue source tubes.
- Confirmed 94612 Copper-Free uses Royal Blue No Additive serum or Royal Blue EDTA plasma followed by an acid-washed/trace-metal-free vial.

