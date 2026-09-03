## Version 8.3 label-display refinement

- Standard SST serum is displayed as `Serum` without an automatic `Serum from SST` label reminder.
- An SST source label is still shown when the test has an explicit label instruction.
- Plasma always receives a label reminder and includes the source tube when it is known.
- RBCs retain their source-tube reminder, including original-tube submissions.
- Urine and stool receive specimen-type reminders. Swabs receive the specific collection site when it can be identified, or a prompt to clarify the source.
- Serum from special-color or additive tubes retains its source label.

## Version 8.1 automatic specimen-source labeling

- This is a system-wide display rule rather than a list of one-off test edits.
- RBC specimens display `RBCs from [source tube]`, including original-tube submissions.
- Transferred plasma displays `[plasma type] from [source tube]` for EDTA, citrate, heparin, ACD, and other recognized additive or special-color sources.
- Transferred serum displays `Serum from [source tube]` for SST/Gold and special-color sources such as Royal Blue No Additive.
- An ordinary Red Top source does not generate an extra generic reminder unless the official test record has its own specific label requirement.
- Explicit official label instructions are retained and merged with the automatic source wording without duplicating plain SERUM or PLASMA instructions.

## Version 8.0 transport-temperature and special-label audit

- Audit date: 2026-09-02.
- Scope: all 263 built-in records.
- The 247 records with numeric codes represent 245 unique Quest codes. Each unique code was queried against the current Quest MASTER Test Directory.
- 239 unique codes returned a current MASTER record. The exact `TransportTemperature` value was copied into the raw-temperature field for every resolved record, with only obvious source typos/spacing normalized for display.
- Six codes did not return a MASTER record: 6447, 34329, 34483, 34499, 39749, and 91001. Their temperature is now `Not specified`, and each record tells staff to verify the active code and service-area instructions.
- The remaining 16 records are local `XXX` do-not-collect placeholders without an order code; no Quest temperature was inferred for them.
- Eleven resolved records required a categorical temperature correction: 466, 793, 10256, 15447, 17569, 19955, 31348, 32499, 34897, 36577, and 91003.
- Quest codes 3020 and 7909 list preserved urine at room temperature and unpreserved urine refrigerated. The calculator's modeled workflows use preservative tubes, so their bag category remains Room Temperature while the raw field retains both official conditions.
- Quest codes 17569 and 31348 list Frozen, with room temperature acceptable only when received within 72 hours. The bag category is Frozen and the complete condition remains visible in the raw field.
- Specific label text was separated from general handling instructions and added for 13595, 13600, 31789, 35202, 37847, 37849, and 91431.
- Generic labeling statements and collection-device color descriptions were intentionally excluded from the compact bag label note.
- `QUEST_TEMPERATURE_AUDIT_2026-09-02.csv` provides a record-by-record audit trail for all 263 built-ins.
- Service-area requirements may differ from MASTER. The active service-area test page remains the final source of truth before collection.

## Version 7.9 collection-pooling correction

- This release changes collection and submission counting logic only; no built-in test requirements were changed.
- Compatible Lavender EDTA whole-blood tests can share one collection tube when their combined planned volume fits and no test requires a full or dedicated tube.
- Lavender whole-blood submissions are kept separate from Lavender source tubes used to prepare plasma or RBC specimens.
- Compatible Red Top serum tests can share collection source tubes within the same transport-temperature group; their required transport aliquots remain separately listed for submission.
- Original-submit Lavender or Red Top tubes are pooled consistently in both the collection count and the bag contents.
- A single test is capped at one collection tube of the same kind based on volume alone. Multiple tubes are permitted only for explicit collection counts, full/dedicated requirements, or different required tube types.
- Regression checks include compatible whole-blood Lavender pooling, Lavender whole blood versus plasma separation, Red Top serum pooling, temperature separation, full-tube handling, two-aliquot submission cases, and explicit two- or three-SST collection instructions.

## Version 7.8 calculation correction

- This release changes collection-count logic only; no built-in test specimen requirements were changed.
- SSTs submitted in the original tube are now estimated separately from SSTs used as source material for transferred/aliquoted serum or plasma.
- Regression case: 34429 T3 Free, 58984 TSH and Free T4, 7260 Thyroid Peroxidase and Thyroglobulin Antibodies, 10124 hs-CRP, and 809 ESR now produce 3 Gold/SST + 1 Lavender EDTA for collection, while the room-temperature submission bag contains 2 original SSTs + 1 serum transport tube + 1 Lavender EDTA tube.

## Version 7.7 additions and verification
- Added 16963 — Streptococcus pneumoniae Antibody (IgG) (23 Serotypes), MAID: serum, 0.5 mL preferred, 0.25 mL minimum, room-temperature transport; special PRE/POST vaccination note retained.
- Added 35135 — Haemophilus influenzae Type b Antibody (IgG): serum, 1 mL preferred, 0.2 mL minimum, plastic screw-cap serum transport vial, room-temperature transport.
- Reverified existing 7083 — Immunoglobulins Panel, Serum (IgA, IgG, IgM): 2 mL serum, 0.5 mL minimum, SST transport container; room-temperature stability 72 hours, refrigerated 7 days, frozen 90 days.
- Added 34042 — Diphtheria and Tetanus Antitoxoids: 4 mL total serum submitted as two separate transport aliquots (2 mL each), room-temperature transport. The collection plan does not automatically equate this with two phlebotomy tubes.
- Corrected 37847 and 37849 NMR lipoprotein transport from mixed room/refrigerated to refrigerated only.
- Built-in record count after this update: 263.

## Version 7.6 audit
- Quest code 19826 Coenzyme Q10 verified 2026-08-14 against the official directory.
- Preferred: 1 mL serum from SST; minimum 0.3 mL. Protect from direct light. Amber transport tube; refrigerated transport. Same-day shipment preferred; if not shipped same day, foil-wrap or transfer to amber tube.

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



## Version 7.1 display-only update

The printed order-of-draw cards now place the tube color/name and additive on separate lines. Existing verify wording and all data logic remain unchanged.


## Cytokine test additions — 2026-08-05

- 34473 — Interleukin-6 (IL-6), Serum: 1 mL frozen serum (minimum 0.5 mL); no biotin for 48 hours; centrifuge, transfer serum, freeze immediately; do not thaw; consistent collection time recommended for longitudinal comparison. Current Quest-referral collection guidance uses SST/Gold, with Red Top acceptable.
- 34485 — Tumor Necrosis Factor-Alpha, Highly Sensitive: plain Red Top with no gel; 1 mL serum (minimum 0.5 mL); clot 10–15 minutes, centrifuge, transfer serum, freeze immediately; SST rejected; room-temperature and refrigerated transport unacceptable.


## Version 7.4 full tube-source consistency audit

Audited all 259 built-in records for the class of error where a specific collection tube can be reduced to a generic additive/color in the selected summary, nurse order of draw, or submission bag.

Key correction:
- 945 Zinc: preferred plasma is collected in Royal Blue EDTA (purple stripe) or Royal Blue Sodium Heparin; serum alternative is Royal Blue No Additive (red stripe). Separated plasma/serum is transferred to an acid-washed or metal-free vial. The prior record incorrectly labeled the preferred draw as Lavender EDTA.

Logic checks across the full built-in database:
- Royal Blue EDTA is classified as Royal Blue, never generic Lavender EDTA.
- Royal Blue No Additive is classified as Royal Blue, never generic Red Top.
- Royal Blue Sodium Heparin is classified as Royal Blue for order-of-draw grouping.
- All Royal Blue variants remain grouped in the single Royal Blue order-of-draw step.
- Stripe/additive-specific badges remain visible outside the order-of-draw step.
- Acid-washed/metal-free transport vials remain neutral transport badges and show the exact source tube when known.
- Standard serum/plasma/platelet-poor-plasma transport tubes retain the green-top transport badge.

This was a full structural consistency audit of the built-in database for tube/source classification. Current official test pages remain the source of truth for service-area-specific requirements.


### Quest code 1715
- Protein, Total, Random Urine with Creatinine: preferred 10 mL well-mixed random urine, no preservative. Calculator collection container set to Sterile Urine Cup; transport container plastic urine container; yellow-top urinalysis transport tube retained as alternative.
