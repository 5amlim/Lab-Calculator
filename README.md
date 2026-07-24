# Quest Lab Calculator — GitHub Pages Edition

A static, browser-based tool for finding multiple Quest tests, adding missing tests, building a draw plan, and printing a specimen collection summary with a nurse order-of-draw guide and color-coded tubes and transport temperatures.

This edition uses no Supabase, server, login, or shared live database.

## Files to upload

Upload these files to the root of one GitHub repository:

- `index.html`
- `styles.css`
- `app.js`
- `data.js`
- `.nojekyll`

`data.js` contains the published master test list.

## Publish with GitHub Pages

1. Create or open your GitHub repository.
2. Choose **Add file → Upload files**.
3. Upload the files listed above.
4. Commit them to the `main` branch.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Select `main` and `/ (root)`, then save.

## Normal staff workflow

1. Paste test names or Quest codes into **Find tests**.
2. Select **Add best matches**.
3. Review the draw plan, nurse order of draw, and selected test details.
4. When a test is missing, select **Add missing test**.
5. Enter or look up the collection details.
6. Keep **Add this test to the current collection summary** checked.
7. Save, review, and select **Print summary / Save PDF**.
8. In the print dialog, enable **Background graphics** when available for the strongest color output. Tube and temperature labels remain readable without color.

## ChatGPT-assisted lookup

The add-test form includes an optional helper:

1. Enter a test name or Quest code.
2. Open **Use ChatGPT to help find a missing test**.
3. Select **Copy request and open ChatGPT**.
4. Paste the copied request into ChatGPT.
5. Copy ChatGPT's structured answer.
6. Paste it into the calculator and select **Fill the form from this answer**.
7. Verify every field against the official Quest Test Directory before saving.

This is a guided copy-and-paste workflow. It does not place an OpenAI API key in the public GitHub repository.

## Save and publish changes

Manually added or edited tests are first saved in the current browser.

To publish those changes for all users:

1. Open **Website maintenance and backup** near the bottom of the Test Library.
2. Select **Create website update file**.
3. The browser downloads a replacement file named `data.js`.
4. Replace the existing `data.js` file in GitHub.
5. Commit the change.
6. GitHub Pages republishes the updated list.

## Maintenance buttons

- **Download backup:** Saves the complete current test list as a backup file.
- **Restore saved backup:** Loads a previously downloaded backup.
- **Create website update file:** Creates the `data.js` file used to publish changes through GitHub.
- **Discard local changes:** Returns that browser to the current published test list.

## Important limitations

- GitHub Pages cannot receive shared live edits. Changes become shared only after replacing `data.js` in GitHub.
- Do not enter patient names, dates of birth, results, medical record numbers, or other PHI.
- ChatGPT-assisted information can be incomplete or incorrect.
- The nurse order-of-draw guide follows the Quest Diagnostics published sequence: cultures, light blue citrate, gold/SST, red serum, green heparin, lavender/pink EDTA, royal blue EDTA, gray fluoride, then yellow ACD last.
- If a winged collection set is used and light blue is first, use a citrate discard tube to fill tubing dead space before the test tube.
- Always confirm tube additives on the label and follow facility policy and test-specific Quest instructions.
- Contact Sam for any missing entries you would like added.
- Verify current collection requirements, service-area availability, and rejection criteria in the official Quest Test Directory before collection.

## Print color guide

The printed summary color-codes the draw container, transfer container, alternate container, nurse order of draw, and transport temperature. A compact legend is included on the printout. Room temperature is yellow, refrigerated is blue, and frozen is purple. Staff should still read the printed labels and confirm tube additives directly on the tube label.

## Version 2.4 update

- Removed the word **“labeled”** from generic transport-tube entries.
- Simplified the form and print labels to **Transport tube / container** and **Transport tube**.
- Automatically cleans the old wording from records previously saved in a staff member’s browser.

## Version 2.5 data cleanup

- Converted red-top serum tests that previously displayed “Verify Quest Instructions” into clear draw, clot, spin, and transfer steps.
- Corrected Quest code 90567 to show: red top, clot, centrifuge, transfer serum to a transport tube, room-temperature transport.
- Updated similar hormone, drug-level, autoimmune, and specialty serum tests with clearer collection workflows.
- Corrected several volume, temperature, specimen-type, and spelling inconsistencies.
- Refreshed published records in staff browsers while preserving manually added custom tests.
- Flagged legacy Troponin T code 34483 for verification instead of displaying an unverified red-top workflow.


## Version 2.6 print cleanup
The printed temperature column now shows only the color-coded standardized temperature badge. Duplicate raw labels such as “Room Temp” or “FROZEN” are no longer printed.
