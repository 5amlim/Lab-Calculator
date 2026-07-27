## Version 4.8 updates

- Quest code 363 Copper now displays **Acid-Washed / Metal-Free Plasma Transport Tube** in the transport bag.
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

- Quest code **70049** now displays **Aptima** in the submission section with **Submit as Aptima**.
- The collection section still identifies the Aptima Multitest tube with the orange label.

## Version 4.2 updates

- Yellow blood tubes are labeled **Yellow ACD**.
- Quest code **70049** uses a dedicated **Aptima Multitest (orange label)** badge.
- The standard urinalysis preservative tube remains the separate red/yellow swirl urine tube.

# Quest Lab Calculator v4.1

**v3.8:** The printout now keeps the same tube badge when a specimen is submitted in its original collection tube. Original-tube submissions clearly identify the specimen inside, such as “Royal Blue EDTA · Whole Blood · Submit in original tube” for arsenic. Transferred serum, plasma, and RBC specimens continue to use transport-tube labels.

**v3.7:** The printout separates what staff collect from the patient from what staff submit after processing. Spot urine orders automatically add one sterile urine cup, and UA with culture displays separate red/yellow swirl UA and gray-top urine culture tube badges. Each transport-temperature bag lists its processed contents and the tests assigned to them.


Static GitHub Pages website for searching multiple Quest tests, building a specimen collection summary, and printing a nurse- and lab-friendly workflow.

## Staff workflow

1. Enter one Quest test code or test name per line.
2. Select **Add best matches**.
3. Review the draw tube, specimen type, processing, preferred and minimum volume, transport temperature, and special handling instructions.
4. Use **Add missing test** when a test is not in the local list.
5. Verify missing or specialty tests in the official Quest Test Directory.
6. Select **Print summary / Save PDF**.

The printout includes tube colors, temperature colors, specimen-type text colors, preferred volume, order of draw, a clearly counted Total to Collect section, and a temperature-separated Total to Submit bag plan.

## Missing entries

Contact Sam for any missing entries you would like added or for corrections to existing entries. Staff may manually add a test for the current browser and collection summary. Manual entries are stored only in that browser until the published `data.js` file is updated by the website administrator.

## GitHub Pages publishing

Upload all files to the repository root, then configure **Settings → Pages** to deploy from the `main` branch and `/ (root)` folder. Committing replacement files to `main` triggers a new deployment.

## Important

- Do not enter patient information.
- The local list is curated and is not the complete Quest menu.
- Verify current collection requirements and service-area availability in the official Quest Test Directory before collection.
- Confirm tube additives from the label, not stopper color alone.
- Follow facility policy and test-specific instructions.

## Version 3.5

Quest code 3020 now clearly shows the required red/yellow swirl-top UA preservative tube plus the gray-top urine culture preservative tube. The printed summary also includes a transport bag plan. Room-temperature, refrigerated, frozen, and mixed/verify specimens are kept separate. SST tube estimates use a planning assumption of 2 mL usable serum/plasma per SST, round up within each temperature group, and keep dedicated/full-tube requirements separate. Staff must verify specialty instructions and actual specimen yield before collection.


## Manual container entry
Choose **Other / manually type** in the Draw container dropdown to enter an uncommon tube, cup, swab, or collection kit.


## Manual draw container
The custom draw-container text box is always visible below the dropdown. Staff can either select **Other / manually type** first or simply start typing; the calculator automatically selects Other and saves the typed container.

### v4.7 badge refinement

Acid-washed, acid-rinsed, metal-free, and trace-metal transport containers use the neutral transport-tube badge. They do not use the green-top-third serum/plasma badge. Standard serum, plasma, and platelet-poor plasma transport tubes remain green-top-third.
