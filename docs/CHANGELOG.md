## October 22, 2026: Subtle Cart emphasis

- Gave the Quest and LabCorp Cart sections a lightly tinted blue-gray background, refined border, muted teal top edge and soft shadow.
- Kept the existing cart header, buttons, test list, scrolling, responsive layout and functional behavior.
- Scoped styles to screens only, leaving printed collection summaries unchanged.
- Increased the shared experience stylesheet cache version for both calculators.

## October 22, 2026: Clinical category search and filtering

- Added 31 test-name-based clinical categories for Quest and LabCorp, with searchable terms such as STI, GI, hematology, coagulation, and allergy.
- Added the category dropdown to existing Filters, including clear/reset and support for combining multiple filters.
- Category-only search is browsing only and is excluded from bulk auto-add matching. Tests may belong to several categories.
- No changes to collection requirements, test codes, specimen pooling, printouts, or STAT availability.

## October 22, 2026: Move print transfer spin beside downward arrow

- For transferred specimens requiring centrifugation, place lowercase `spin` directly beside the downward transfer arrow in the Quest and LabCorp print-detail tables, matching the arrow's 10 px font and removing the checkmark there.
- Remove the duplicate `Spin ✓` line for those transferred specimens; keep the existing `Spin ✓` reminder for original-tube SSTs without transfer and leave non-spun paths unchanged.
- Leave the web directory, specimen badges, collection data, clinical processing, pooling, and tube calculations unchanged. Updated print stylesheet and script cache versions.

## October 22, 2026: Concise print-table volumes

- Removed redundant specimen wording after numeric mL amounts in the Quest and LabCorp print-table Volume columns, such as `6 mL serum` to `6 mL`.
- Kept specimen badges in Container / specimen and preserved the original data and special handling instructions.
- Kept specimen qualifiers when a test requires additional draws of different specimen types.
- Updated the JavaScript cache versions to ensure the print change appears after refresh. No pooling, minimum-volume, or other calculation logic changed.

## October 22, 2026: LabCorp capitalization

- Standardized the displayed laboratory name to **LabCorp** across Quest, Cedars, and LabCorp navigation, page titles, collection plans, comparison tools, specimen instructions, and documentation in both repositories.
- Retained existing lowercase `labcorp` in filenames, paths, code identifiers, and external URLs for compatibility. No specimen collection or pooling calculations were changed.

## October 22, 2026: Repository synchronization and file cleanup

- Matched the Quest, LabCorp, and Cedars calculator source files, catalogs, layouts, and test suites in both repositories.
- Retained version information, the changelog, official-source notes, collection audits, and workplace-use agreement in both repositories.
- Removed the redundant second copy of the project license under `docs/`; the root `LICENSE.md` remains authoritative.
- Replaced the duplicate `cedars-test-menu.html` content with a small backwards-compatible redirect to `cedars-container-guide.html`.
- No changes were made to specimen pooling, minimum-volume rules, STAT eligibility, collection data, or print calculations.

## v11.98: Cedars lab integration and Quest print refresh (October 21, 2026)

- Incorporated the Cedars-Sinai test directory, separate planner, reference photos, specimen-container guide, and printing workflow from the Quest-Calculator-Test repository.
- Added the Quest/Cedars lab selector, with separate carts and requirements, plus updated lab-specific branding, favicon, and shared print styling.
- Updated Quest printout bag temperature text and symbols, including frozen bag markings, while retaining existing pooling and STAT processing logic.
- Synced the Quest directory's Vitamin D, 25-Hydroxy, Total, Immunoassay test name correction.
- Kept the existing Lab-Calculator documentation and historical audit files. Source: Quest-Calculator-Test main snapshot 441e97481034ae86d1532f69c6a7540edf319e25.

## v11.80: One original-tube transport option

- Removed the duplicate "Whole Blood / Original Tube" option from the Add/Edit Test transport menu.
- The remaining first transport option displays "Submit in original tube" for ordinary source containers, or "Spun SST / Original tube" for Gold/Tiger SST sources. Its underlying saved transport value is `Submit in original tube`, which the existing original-container logic recognizes.
- The illustrated container icon still follows the selected collection tube, including manually typed draw containers.
- Existing saved records using the older "Whole Blood / Original Tube" or "No transfer / submit in original tube" wording are mapped to the single choice when edited; no packaged test records are modified.
- All other transport choices, pooling calculations, and printed bag behavior are unchanged.

## v11.79: Subtle menu animations and container illustrations

- In-page dropdown menus animate with a short, soft fade and slight movement; closing nested option menus has a matching brief transition. A reduced-motion preference disables these effects.
- Add/Edit Test draw and transport container options show the existing tube/cup illustration where the container is identifiable, including the selected value in the closed control.
- “No transfer / submit in original tube” and “Whole Blood / Original Tube” mirror the current draw-container illustration, including after the draw container changes. This is a visual cue only and does not change the selected transport value.
- Specimen/temperature/fasting menus, form validation, label instructions, STAT routing, pooling, tube and bag calculations, and print output are unchanged.

## v11.77: Consistent in-page STAT dropdown and chevrons

- Replaced the browser-native STAT receiving lab select with an in-page scrollable list. It retains all receiving lab choices and existing STAT eligibility behavior.
- Unified Filter and STAT dropdown border, height, fonts, arrow icon, and arrow-to-edge spacing. Sub-selects inside Filters, Add Missing Test form selectors, and batch-match selectors have a consistent 14px caret inset.
- Keyboard support for the STAT list: Arrow Up/Down, Home/End, Escape, plus normal button activation.
- Renamed the directory cleanup control to **Clear manually added tests**; it still removes only user-created tests stored locally, not bundled tests or edits to bundled entries.
- No changes to print, specimen processing, test catalog, pooling, STAT eligibility, or bag counts.

## v11.76: Neonatal Microtainer submission, compact filters, and browser-added test cleanup

- For Quest neonatal bilirubin codes 6631, 20381, and 34162, submit the required spun amber Microtainer SSTs in their original containers, protected from light. No default amber serum transport-tube transfer. Preserve two Microtainers per assay and existing independent counts.
- Normalize the text spacing inside transport source-tube pills around “From” without changing numbers, specimen labels, or routing.
- Replace the specimen dropdown with a compact Filters panel: specimen, transport temperature, fasting (required/preferred/verify), explicitly named pediatric/neonatal tests, and centrifugation. Multiple selected filters narrow the displayed test list together; Clear filters restores all tests.
- Add Clear browser-added tests beside Show more tests in the directory footer. It asks for confirmation, removes only local custom entries (and their order selections), and preserves bundled directory entries plus local edits to those entries. The button is disabled when there are no browser-added tests.
- Pediatric filter uses explicitly named pediatric or neonatal entries, not inferred age eligibility. Test requirements still need to be verified against the current official directory.
- Mobile and desktop screen rendering, print data, and calculation checks performed in Chromium; iPhone Safari print output not independently tested.

## v11.75: Shorter Microtainer flag and larger printed bag temperatures
- Microtainer badge now reads “MICROTAINER”, and its handling note no longer mentions separate counting or separation from standard SSTs.
- Printed bag temperature headings are larger (13.5 px instead of 11 px).
- Microtainer source counting remains independent internally, and all specimen, transport, and LABEL instructions are unchanged.

## v11.74: Transfer cue and independent Microtainer collection
- Added “Transfer” beside the up arrow before source pills in printed bags.
- Microtainer-only neonatal bilirubin instructions now produce separate amber Microtainer SST collection counts and a Microtainer badge/icon. Standard Gold/Tiger SST pooling excludes Microtainers.
- Original collection volume estimates, actual submission container counts, specimen LABEL output, and existing order-of-draw tiles are otherwise unchanged.

## v11.73: Bag header and SST submission names

- Each printed transport bag now shows BAG at the left of the header, Routine/STAT centered, and the numbered bag count in a pale badge on the right.
- Original spun SST submission-card names are now Gold SST (Spun) and Tiger SST (Spun); all other details, counts, and tube-source instructions stay the same.

## v11.72: Transfer arrows, source specimen cue, and SST spin reminder

- For original Gold / Tiger SST submissions only, the printed container heading now says Gold / Spun SST or Tiger Spun SST; the handling note is Submit in original tube · Spin ✓.
- For transferred specimens, a small upward arrow precedes the original numbered source-tube pill. Inside the pill, colored specimen text appears before From spun [source tube], or From [source] if spinning is not required.
- Every printed · Spin cue now ends with a checkmark. No special LABEL instructions or pooling logic changed.

## v11.71: Submission card hairline and original-tube reminders

- Added a very faint gray separator between the tube/container title row and its source/handling detail below.
- Restored `Submit in original tube` on original-container submission cards.
- For either Gold or Tiger SST submitted in its original spun tube, the detail reads `Spun SST · Submit in original tube`.
- Transfer source pills remain unchanged, including `From spun ...` and the exterior `· Spin` cue where applicable.
- Label badges, tube illustrations, specimen badges, bag grouping, and pooling calculations are unchanged.

## v11.70: Printed tube / container icons

Fixed the tube illustrations being vertically cut off in submission-bag headers after the addition of specimen badges. Only long container text is clipped now; all tube illustrations render at full height. No logic changes.

v11.44
- Increased the printed What to submit footer bag total to a 19 px number in a 30 px high white badge.
- Condensed STAT, collection/transport tube sharing, yield assumptions, urine and order-of-draw notes into a two-column quick handling reminders grid. Preserved relevant exceptions and specimen-sufficiency warnings.
- Print-only presentation update. No changes to test catalog, pooling calculations or STAT routing.

## v11.42 update

- Standard serum aliquot LABEL instructions now say **Serum** instead of **Serum from Gold / SST** (also for Tiger SST). Explicit test-specific labeling requirements are kept.
- The specimen type and STAT receiving-lab dropdown chevrons are both 10px from the right border, matching the warnings disclosure.
- No changes to serum yields, tube pooling and quantities, label test-code references, STAT handling, source-tube instructions, or desktop/mobile print layout.

## v11.41 update

- Removed the obsolete “Must send STAT” parenthetical from Quest 809 Sed Rate notes and stability (24 hours remains). Test priority still defaults to Routine and can be changed manually where allowed.
- Removed per-tube test-code pairing text from the printed submission cards. Existing test references / label information and transport tube counts remain intact.
- Mobile and desktop printing still use the same styles; all specimen pooling and separation rules are unchanged.

## v11.39 update

- Tiger SST pooled tube calculation now assumes 4.0 mL usable serum per fully filled 7.5 mL tube. Gold SST remains at 2.5 mL usable serum per 5 mL tube.
- Single-test one-SST cap, explicit multi-tube instructions, dedicated/full-tube requirements, original-submit versus transfer-source grouping, destination, STAT, temperature and print layout are unchanged.
- Warnings for potentially insufficient serum now compare required serum volume against the selected SST's usable serum estimate (4.0 mL Tiger; 2.5 mL Gold). Whole-blood collection-volume estimates retain their independent conservative 2.5× factor. Actual recovery varies; these values are planning assumptions, not guaranteed yields.

## v11.38 update

- Gold and Tiger SST now enforce a maximum of one collection tube for a single test unless explicit multi-tube instructions exist. Tests with specimen requirements that may exceed estimated one-tube yield get an additional collection warning.
- All print devices use the same landscape desktop print layout, fixed physical print width and font sizing, including three-column SST lists. Printer and mobile browser overrides may still affect the final output.

## Version 10.3
- Added the estimated number of collection containers beside the test count on each Draw plan card.
- Container counts use the existing collection-planning logic, including pooling, dedicated-tube requirements, and separate transport-temperature workflows.
- Kept the Draw plan order and the collapsible Order of draw card unchanged.

## Version 10.1
- Replaced always-visible Remove text in the Tests summary and detail cards with a compact trash-can control that expands to **Remove** on hover or keyboard focus.
- Sorted Draw plan collection cards by the same blood-tube sequence used in Order of draw; non-blood containers follow afterward.
- Kept the Order of draw collapsible card and its content unchanged.

## Version 9.9
- Main manual-entry action buttons now read **Add missing tests** for consistent wording.
- The manual-entry dialog still adds one verified test record at a time.
- No calculator logic changed.

## Version 9.6
- Changed the top Tests overview in the Test Cart from collapsible to always visible.
- Restyled the Tests overview as a compact receipt-style list with test code and test name only.
- Kept the separate Test details section collapsible.
- No collection, pooling, processing, labeling, order-of-draw, or print logic changed.

## Version 9.5
- Moved test information above Draw plan and Order of draw in the Test Cart.
- Added a compact collapsible Tests list that shows only test code and test name.
- Kept the existing full test cards in a separate collapsible Test details section.
- Removed the repeated “Verify dedicated-tube requirements” text from Draw plan cards.
- No collection, pooling, processing, labeling, order-of-draw, or print logic changed.

## Version 9.4

- Converted Draw plan, Order of draw, and Tests in the Test Cart into compact click-to-expand sections.
- Collapsed headers keep useful totals visible: collection types, blood tube types in the draw sequence, and selected test count.
- Sections start collapsed to reduce visual clutter; print output and collection logic are unchanged.

## Version 9.3

- Changed the multi-test search hint from “20 tests” to “multiple tests.”
- Simplified the Add Missing Test label reminder wording.

- Add Missing Test required stars now sit inline with their field labels.
- Placeholder and unselected prompt text in the Add Missing Test form is lighter so it is visually distinct from entered values.
- No validation, collection, or calculation logic changed.

- Printed footer now uses **Order of draw:** instead of **Counts:**.
- Removed the repeated SST volume-count sentence and the divider line above the footer notes.
- Print background is forced to white below the copyright notice.
- No test records, collection calculations, pooling, processing, or labeling rules changed.

## Version 9.0
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

Test code 3020 now clearly shows the required red/yellow swirl-top UA preservative tube plus the gray-top urine culture preservative tube. The printed summary also includes a transport bag plan. Room-temperature, refrigerated, frozen, and mixed/verify specimens are kept separate. SST, Lavender EDTA, and Red Top tubes pool only within compatible specimen workflows and temperature groups. Planning assumes up to 2.5 mL usable serum per fully filled 5 mL Gold SST, 2 mL of usable plasma or other processed specimen per source tube, and 4 mL of whole blood per Lavender tube. Tiger SST pooling assumes 4.0 mL usable serum per 7.5 mL draw. Preferred/minimum whole-blood volume estimates continue to use the conservative 2.5× serum/plasma conversion. Original-submit tubes, transfer-source tubes, dedicated/full tubes, and different tube types remain separate. One test is capped at one tube of the same kind unless multiple tubes are explicitly required. Staff must verify specialty instructions and actual specimen yield before collection.


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

### v8.9 UI cleanup
- Reverted the printed copyright notice to the compact gray block used before v8.8.
- Kept the printed missing-test contact line as plain bold text.
- Reorganized Add Missing Test into clearer required sections plus collapsible optional details.
- Custom draw-container typing is hidden unless Other / manually type is selected.
- Required-field validation is unchanged; minimum volume remains optional.


### v9.0 print footer refinement
- Copyright and ownership notice now uses a compact full border in print, with a white background so it does not create a large gray block.


### v9.7 cart cleanup
- Consolidated the Tests overview and detailed test cards into one section.
- The Tests summary is always visible and each row now has a Remove button.
- A Details button reveals/hides the full test cards in place.
- Add missing test is available directly from the Tests header.

### v9.8 cart layout
- The Tests section switches between the compact test summary and the full test-detail cards rather than displaying both at once.
- Use **Show details** / **Hide details** to flip between the two views.
- **Clear all** is in the Tests action row beside **Add missing test**.


### v10.4 Draw plan hierarchy
- Draw-plan test counts now appear directly beneath the tube/container name in smaller muted text.
- Container totals remain highlighted in the compact badge on the right.



### v10.6 local availability correction
- Quest 1635 — Calcium, 24-Hour Urine with Creatinine is now marked **Do not perform at SH**.
- Quest requires acidification with 25 mL of 6N HCl, which is not available onsite.
- The test remains searchable so staff can see that it is intentionally blocked instead of treating it as a missing test.

### v10.5 test addition
- Added Quest 1635 — Calcium, 24-Hour Urine with Creatinine.
- Collection: 24-hour urine, refrigerated during/after collection, with 25 mL 6N HCl to maintain pH <2.
- Submission: well-mixed 10 mL aliquot preferred (2 mL minimum) in a plastic screw-cap container; room-temperature transport.
- Record total 24-hour volume and collection duration on the specimen container and requisition.

**v10.94:** When a supported urine culture test is in the collection summary, the Urine culture transport toggle switches between gray-top culture transport (default) and UriSponge. Applies to Quest codes 395, 3020, and 91684 in the current catalog. For UA reflex culture, the UA preservative tube remains a separate required submission. UriSponge must be completely saturated by immersing applicator in collected urine for five seconds; do not pour urine into the UriSponge tube. Confirm whether your local Quest service area accepts/supplies UriSponge before using it. Source: Quest Test Directory for these codes and Quest IDI collection guide.

### v11.09: STAT separation and specimen-label colors

In the Collection summary, use **Mark STAT** next to each selected test that is to be sent STAT. All newly selected tests default to **Routine**. The choice is stored in the browser with the selection, not in the shared Quest test catalog. The printed collection/transport plan puts STAT tests into separate bags from routine tests, with each priority still separated by temperature. The source tube counts are computed independently across STAT and routine, including tests whose specimens would otherwise pool. Urine specimen pills are yellow, and stool specimen pills are amber.

**Important:** STAT marking is a print and collection-planning designation. It does not submit a STAT order, reserve a courier pickup, or verify STAT availability. Confirm the receiving lab's STAT requirements and keep STAT specimens out of routine shipments.


## v11.74 changes
- Printed transfer pills have a small “↑ Transfer” cue before the intact source pill.
- Records with explicit Microtainer SST requirements (neonatal bilirubin codes 6631, 20381, 34162) use independent amber Microtainer collection counts, with a distinctive icon/flag. They do not pool with standard Gold/Tiger SSTs.
- The standard order-of-draw tiles are unchanged. The original test-specific Microtainer instructions remain available.

### v11.78: In-page dropdown consistency
- Southern California receiving-lab choices are visually indented beneath their region heading. All nine laboratory selections retain their existing values and STAT eligibility behavior.
- The Add Missing Test and Edit Test dropdowns (specimen, draw container, transport container, temperature, Spin) and Filters dropdowns (specimen, temperature, fasting) use scrollable in-page popovers instead of operating-system select menus. Popovers keep the original option lists and underlying values, and work inside the test dialog as well as the filter panel.
- All these controls reuse the existing shared chevron and right-side inset. The collection/transport, label, and calculation logic was not changed.
