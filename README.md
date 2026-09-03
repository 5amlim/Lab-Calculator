## Version 8.8
- Add Missing Test now requires Test code, Test name, Specimen type, Draw container, Transport tube / container, and Transport temperature.
- `Not specified` remains a valid Transport temperature selection.
- Minimum volume remains optional.
- The custom draw-container text field is disabled unless `Other / manually type` is selected.
- No test records, collection calculations, pooling, processing, or labeling rules changed.

## Version 8.6
- Multi-test searches now call out every search term that was not added or did not produce a reliable local match.
- After **Add best matches**, a dedicated **Not added** box lists each missed test name/code and the reason.
- Searches that are already selected are treated as accounted for rather than incorrectly reported as missing.
- No test records, collection calculations, pooling, processing, or labeling rules changed.

## Version 8.5
- Removed duplicate Labels explanatory footer text while keeping all actual specimen-label badges and rules unchanged.
- Improved visibility of total/selected test counts on screen and in print.
- Highlighted Missing a test? Contact Sam callouts.
- Made the copyright/ownership background more compact.
- No collection or test-requirement logic changed.

## Version 8.4

- Restored `Serum from SST` in the bag/submission detail so staff can see where the serum came from.
- Standard SST serum does not receive a `Label` badge unless the test has an explicit labeling instruction.
- Plasma, RBC, urine, stool, swab, and special-source serum label rules are unchanged.
- Collection counts, pooling, processing, and test requirements are unchanged.

## Version 8.3

- Serum prepared from a standard SST is now shown simply as `Serum`; an SST source label appears only when the test specifically requires it.
- Plasma always receives a label reminder and includes its source tube when known.
- RBCs retain source-tube labels. Urine and stool receive specimen-type labels, and swabs show the collection site when it can be identified.
- Serum from special-color or additive tubes, such as Royal Blue No Additive, retains its source label.
- Shortened the print footnotes and standardized the instruction to `Submit in original tube`.
- The browser database version was increased so the revised wording reaches existing installations while preserving custom entries.

## Version 8.2

- Fasting badges in the printed test table now always appear on their own line beneath the test name.
- Reworked the printed planning notes and footer into short, clearly labeled instructions that are easier to scan.
- No collection calculations or built-in test requirements changed in this release.

## Version 8.1

- Added automatic specimen-source label reminders to the transport-bag summary.
- RBC specimens are labeled with their source tube even when the original collection tube is submitted.
- Transferred plasma is labeled with its source tube, including Lavender EDTA, Pink EDTA, Royal Blue EDTA, Light Blue Citrate, heparin, ACD, and other recognized additive tubes.
- Transferred serum is labeled when it comes from SST/Gold or a special-color source such as Royal Blue No Additive.
- Ordinary Red Top serum does not receive a redundant generic source reminder unless the test has a specific label requirement.
- Existing test-specific instructions, such as “No Additive Serum Red,” remain visible and are merged without duplicating generic SERUM or PLASMA wording.
- The rules apply to current built-ins and future manually added tests when their specimen type and draw container are entered.

## Version 8.0

- Audited all 245 unique numeric test codes against the Quest MASTER Test Directory on 2026-09-02; 239 current records resolved and 6 unresolved codes are now marked for verification instead of retaining an unverified transport temperature.
- Refreshed the exact transport-temperature wording for every resolved numeric record.
- Corrected 623 to refrigerated with cold packs, 32499 to room temperature, and 37847/37849 to refrigerated with cold packs.
- Corrected additional categorical temperature errors found during the full audit, including Folate Serum, Reticulocyte Count, hepatic function panel, EBV antibody panel, PSA tests, celiac panel, Candida antibody, TSH antibody, and Methylmalonic Acid with Homocysteine.
- Added a small, low-emphasis label note inside the applicable submission-container card. Only test-specific labeling content is shown.
- Added structured labeling instructions for 13595, 13600, 31789, 35202, 37847, 37849, and 91431.
- Updated QuantiFERON-TB Gold Plus 1 Tube to match the current MASTER listing; unsupported date/time-label and light-protection claims were removed.
- Added `QUEST_TEMPERATURE_AUDIT_2026-09-02.csv`, with one row for every built-in record and its verification status.
- The browser database version was increased so these published corrections replace stale built-ins while preserving custom entries.

## Version 7.9

- Compatible Lavender EDTA and Red Top collection tubes are now pooled by specimen workflow and transport temperature.
- Whole-blood Lavender tubes are kept separate from Lavender tubes used to prepare plasma or RBC specimens.
- Original collection tubes are never treated as available source tubes for separate transport aliquots.
- A listed volume alone cannot create more than one collection tube for one test. Additional tubes of the same kind require explicit multiple-tube, dedicated-tube, or full-tube instructions.
- Different required tube types remain separate.

## Version 7.8

- Fixed the SST collection estimator so original-submit SSTs and SSTs used to create transfer/aliquot specimens are counted as separate collection workflows.
- This prevents under-collection when the submission plan contains both original SST tubes and serum/plasma transport tubes sourced from SST.
- SST volume sharing still occurs within each workflow, with the existing rule that one test does not generate more than one collection tube unless explicitly stated.

## Version 7.6
- Corrected Quest code 19826 Coenzyme Q10 light-protection and amber transport requirements.
- Added amber transport-tube handling to the printed submission plan.

## Version 7.3

- Added 34473 Interleukin-6 (IL-6), Serum.
- Added 34485 Tumor Necrosis Factor-Alpha, Highly Sensitive.
- Both entries include draw container, centrifugation/transfer instructions, frozen transport, preferred/minimum volume, and relevant preparation notes.
- Built-in data refreshes while preserving custom staff entries.

## Version 7.2

- The nurse order-of-draw uses a solid Royal Blue badge for the grouped Royal Blue step.
- Stripe-specific Royal Blue badges remain visible everywhere outside order of draw.
- No collection logic or test data changed.

## Version 7.1

- Corrected processed-specimen source labels for Royal Blue EDTA (purple stripe) and Royal Blue No Additive (red stripe).
- All royal-blue trace-metal tubes now appear together in one Royal Blue nurse order-of-draw step.
- Royal Blue No Additive is no longer shown beside ordinary Red Top tubes.

## Version 6.9 updates

- Fixed nurse order-of-draw activation for Green Sodium Heparin and Green Lithium Heparin when they are the preferred draw tube.
- Alternative containers no longer create unnecessary order-of-draw highlights.
- Added separate Royal Blue badges for EDTA with a purple stripe and no-additive with a red stripe.
- Superseded in v7.0: all Royal Blue tubes are grouped in one dedicated Royal Blue order-of-draw step, while their stripe/additive remains explicit on the tube badge.
- Increased the browser database version so published corrections replace stale built-in records while preserving custom entries.

- Audited every built-in record that mentions green heparin against the current Quest Test Directory.
- Required/preferred collection: 528 uses Green Sodium Heparin as preferred (EDTA or Yellow ACD also accepted); 14596 requires sodium heparin with green top preferred; 36970 requires a no-gel Green Lithium Heparin tube.
- Alternative-only collection: 16265, 17180, 17182, 17183, 19894, and 8579 accept either sodium or lithium heparin plasma; 22060 accepts sodium heparin only.
- The calculator now spells out the additive instead of using a generic Green Heparin alternative.

## Version 6.6 updates

### Fasting preparation audit

- Reviewed all 257 built-in records for fasting requirements and recommendations.
- Added structured fasting status and instructions to 27 verified tests.
- Fasting notices appear in the selected-test summary and in the printout near Total to Collect, with the affected test code and name.
- Standard lipid panels remain unflagged because fasting is not required when they are ordered as lipid panels.
- Improved recognition of wording such as “fast 12 hours,” “fasting state,” and “fasting recommended but not required.”
- See `DATA_AUDIT.md` for the full list of flagged records and audit limitations.

## Version 6.4 updates

- Added a prominent fasting-instructions panel directly below **Total to Collect** on the printout.
- The panel identifies whether fasting is **required** or **preferred** and lists each affected test code and name.
- Added fasting badges to the on-screen selected-test summary and the printed test list.
- Fasting details are pulled from each test's collection instructions.
- All version 6.3 test additions and workflow rules remain unchanged.

## Version 6.3 updates

- Added test codes **36562**, **37859**, **90559**, and **94612** from the current official test directory.
- **36562 Cryoglobulin (% Cryocrit), Serum** is marked **Do Not Collect Onsite** because it requires the specimen to clot for 1 hour at 37°C in a water bath, incubator, heat block, or heel warmer.
- Added collection and processing details for frozen complement serum aliquots, very-long-chain fatty acids, and copper-free serum/plasma.
- The database refresh preserves staff-created custom tests.

## Version 5.6 updates

- Removed the **Name / MRN** field and all patient-information entry from the website and printout.
- Updated the independent-project notice to state that organizational use requires separate authorization, does not itself transfer ownership, and that access to the personally hosted version may be withdrawn.
- Added the ownership notice to both the website and printed summary.
- All other v5.5 behavior remains unchanged.

## Version 5.4 updates

- The print heading **Collection and submission plan** is larger, bolder, and visually separated with a teal accent panel.
- All other website and print behavior remains unchanged.

## Version 5.0 updates

- Added a print-only **Processing instructions** section above **What to submit after processing**.
- Processing steps are grouped by transport-temperature bag.
- Each step identifies whether to centrifuge, keep the original tube, transfer/aliquot the specimen, the number of processed containers to prepare, the destination bag, and the related tests.

## Version 4.9 updates

- Test code 363 Copper now displays **Acid-Washed / Metal-Free Plasma Transport Tube** in the transport bag.
- It intentionally uses the neutral specialty-container badge.
- The source is shown as **Plasma from Royal Blue**.


- **Platelet-poor plasma** uses the same green-top-third transport-tube badge as other serum/plasma transport tubes.
- The printed label remains **Platelet-Poor Plasma Transport Tube** so the specimen type is explicit.

## Version 4.4 updates

- Swab and transport-tube entries identify their specimen source, such as **throat swab**, **serum from SST**, or **plasma from Lavender EDTA**.
- The Add/Edit Missing Test form includes a source-clarification reminder.
- Generic swabs are labeled **source must be clarified** until the collection source is documented.
- Serum/plasma transport-tube badges use a green top third.

## Version 4.3 updates

- Test code **70049** now displays **Aptima** in the submission section with **Submit as Aptima**.
- The collection section still identifies the Aptima Multitest tube with the orange label.

## Version 4.2 updates

- Yellow blood tubes are labeled **Yellow ACD**.
- Test code **70049** uses a dedicated **Aptima Multitest (orange label)** badge.
- The standard urinalysis preservative tube remains the separate red/yellow swirl urine tube.

# Lab Collection Calculator

**Version 7.1**

**v3.8:** The printout now keeps the same tube badge when a specimen is submitted in its original collection tube. Original-tube submissions clearly identify the specimen inside, such as “Royal Blue EDTA · Whole Blood · Submit in original tube” for arsenic. Transferred serum, plasma, and RBC specimens continue to use transport-tube labels.

**v3.7:** The printout separates what staff collect from the patient from what staff submit after processing. Spot urine orders automatically add one sterile urine cup, and UA with culture displays separate red/yellow swirl UA and gray-top urine culture tube badges. Each transport-temperature bag lists its processed contents and the tests assigned to them.


Static GitHub Pages website for searching multiple laboratory tests, building a specimen collection summary, and printing a nurse- and lab-friendly workflow.

## Staff workflow

1. Enter one test code or test name per line.
2. Select **Add best matches**.
3. Review the draw tube, specimen type, processing, preferred and minimum volume, transport temperature, and special handling instructions.
4. Use **Add missing test** when a test is not in the local list.
5. Verify missing or specialty tests in the official test directory.
6. Select **Print summary / Save PDF**.

The printout includes tube colors, temperature colors, specimen-type text colors, preferred volume, order of draw, a clearly counted Total to Collect section, and a temperature-separated Total to Submit bag plan.

## Missing entries

Contact Sam for any missing entries you would like added or for corrections to existing entries. Staff may manually add a test for the current browser and collection summary. Manual entries are stored only in that browser until the published `data.js` file is updated by the website administrator.

## GitHub Pages publishing

Upload all files to the repository root, then configure **Settings → Pages** to deploy from the `main` branch and `/ (root)` folder. Committing replacement files to `main` triggers a new deployment.


## Fasting alerts

When a selected test record states that fasting is required or preferred, the printout displays a prominent fasting panel beside the collection totals. The panel identifies the affected test code and test name and repeats the relevant fasting note. A fasting badge also appears in the selected-test summary and printed test list.

## Ownership and hosting

Independently developed and maintained by **Sam Hay** as a personal software project and hosted through a personally controlled account. Use by any organization is subject to separate authorization and does not, by itself, transfer ownership of the software or source code. Access to this hosted version is provided by permission and may be modified, suspended, or withdrawn by Sam Hay at any time and for any reason.

## Copyright and licensing

Copyright © 2026 Sam Hay. All rights reserved. No license or ownership interest is granted without express written authorization. See `LICENSE.md` for the proprietary notice and `WORKPLACE_USE_AGREEMENT_TEMPLATE.md` for a reusable organizational license template.

## Important

- The calculator does not include patient-information entry fields. Do not add patient identifiers to manual test records or notes.
- The local list is curated and is not the complete test menu.
- Verify current collection requirements and service-area availability in the official test directory before collection.
- Confirm tube additives from the label, not stopper color alone.
- Follow facility policy and test-specific instructions.

## Version 3.5

Test code 3020 now clearly shows the required red/yellow swirl-top UA preservative tube plus the gray-top urine culture preservative tube. The printed summary also includes a transport bag plan. Room-temperature, refrigerated, frozen, and mixed/verify specimens are kept separate. SST, Lavender EDTA, and Red Top tubes pool only within compatible specimen workflows and temperature groups. Planning uses 2 mL of usable serum/plasma/processed specimen per source tube and 4 mL of whole blood per Lavender tube. Original-submit tubes, transfer-source tubes, dedicated/full tubes, and different tube types remain separate. One test is capped at one tube of the same kind unless multiple tubes are explicitly required. Staff must verify specialty instructions and actual specimen yield before collection.


## Manual container entry
Choose **Other / manually type** in the Draw container dropdown to enter an uncommon tube, cup, swab, or collection kit.


## Manual draw container
The custom draw-container text box is always visible below the dropdown. Staff can either select **Other / manually type** first or simply start typing; the calculator automatically selects Other and saves the typed container.

### v4.7 badge refinement

Acid-washed, acid-rinsed, metal-free, and trace-metal transport containers use the neutral transport-tube badge. They do not use the green-top-third serum/plasma badge. Standard serum, plasma, and platelet-poor plasma transport tubes remain green-top-third.

## Version 5.1 print cleanup

The printout no longer includes the separate Processing instructions section or the repetitive tube-summary and color-legend tiles at the top. Collection counts and tube badges remain in **What to collect**, and processed contents remain in **What to submit after processing**.


## Version 5.2

The on-screen test cart and collection summary are restored. The printout remains streamlined as in v5.1.


## Version 5.9 update

The website footer now includes a visible **Download Editable Workplace Use Agreement** link. The link downloads `Sam_Hay_Workplace_Use_Agreement.docx`, which can be edited in Microsoft Word, Google Docs, or compatible software. The Markdown template remains bundled as `WORKPLACE_USE_AGREEMENT_TEMPLATE.md`.


## Green heparin differentiation (v6.7)

The calculator now distinguishes Green Sodium Heparin from Green Lithium Heparin in the database, collection plan, submission plan, search results, and manual-entry dropdown. HLA-B27 Antigen (528) and Chromosome Analysis, Blood (14596) use sodium heparin. QuantiFERON-TB Gold Plus, 1 Tube (36970) uses no-gel lithium heparin.


### Version 6.9 tube-additive update

The nurse order-of-draw panel distinguishes the tube additive rather than relying only on stopper color. Green sodium-heparin and lithium-heparin tubes trigger the heparin step when they are the preferred draw container. Royal Blue EDTA (purple stripe) and Royal Blue No Additive (red stripe) have separate badges and order-of-draw behavior. Alternative containers are listed with the test but do not add unnecessary tubes to the draw plan.

### Version 7.1 order-of-draw spacing

- In the printed nurse order-of-draw strip, the tube color/name now appears on its own line.
- The additive remains directly underneath it, including all existing “verify” wording.
- No tube classifications, order, or collection logic changed.

## Version 7.0 Royal Blue correction

- All Royal Blue additives are grouped in one nurse order-of-draw step.
- Individual badges continue to identify EDTA with purple stripe, no additive with red stripe, and sodium heparin.
- Processed specimen labels now preserve the exact Royal Blue source tube instead of shortening them to Lavender EDTA or Red Top.
- All built-in Royal Blue and trace-metal records were reviewed and corrected where needed.
