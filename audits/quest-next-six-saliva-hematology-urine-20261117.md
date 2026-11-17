# Quest additional feasible workflow audit: six tests (2026-11-17)

Six formerly reference-only Quest codes promoted with source-specific collection data. Published in **both** `5amlim/Lab-Calculator` and `5amlim/Quest-Calculator-Test`. Scripts are loaded before calculator `app.js` and never overwrite an existing `active` or `blocked` record. These are *conditional collection workflows*, not confirmation of current Quest account/orderability or availability of special supplies at each clinic.

| Quest code | Test | Collection & submit | Qty | Temperature | Special guard |
|---|---|---|---|---|---|
| 19897 | Cortisol LC/MS saliva | Original blue-cap Salivette Cortisol | 1 draw / 1 submit | Refrigerated | Do not use white-cap, preserve instructed collection time |
| 93020 | Cortisol LC/MS saliva, 2 | Separate original blue-cap Salivette Cortisol devices | 2 / 2 | Refrigerated | Clinician-scheduled collection times; no pooling |
| 92687 | Cortisol LC/MS saliva, 3 | Separate original blue-cap Salivette Cortisol devices | 3 / 3 | Refrigerated | Clinician-scheduled collection times; no pooling |
| 18921 | Cortisol LC/MS saliva, 4 | Separate original blue-cap Salivette Cortisol devices | 4 / 4 | Refrigerated | Each tube separately timed; no pooling |
| 35080 | Leukemia/Lymphoma Evaluation | Original Lavender EDTA peripheral whole blood; alternative sodium-heparin Green Top | 1 / 1 | Room temp, immediate dispatch | Non-NY only; regional acceptance, hematopathology shipping route and box must be confirmed |
| 30422 | Glycosaminoglycans, Urine | Original freezer-safe Sterile cup of random urine | 1 / 1 | Freeze immediately, ship frozen | Adult 20 mL / minimum 10; pediatric 4 mL / minimum 2; record age; container must be confirmed freezer-compatible |

## Labels and grouping
- Each cortisol timed specimen retains a **separate** original Salivette, with `collectionCount` and `submissionCount` set to 1/1, 2/2, 3/3 or 4/4. The calculator's existing `libraryContainerPreviewRoutes` expands a matched multi-draw/multi-submit pair into separately numbered routes. It recognizes Salivette as an existing transport-container category. No saliva pooling.
- Collection and submitted containers for all six stay the same physical ORIGINAL vessel. No fictitious centrifugation or transfer.
- Label text is specimen-specific (SALIVA, WHOLE BLOOD, RANDOM URINE), and does not invent label time fields for unrelated tests. For timed salivary cortisol, collection times are clinically required and the samples must be distinguishable and numbered.
- All saliva samples stay refrigerated. Whole blood stays room temperature and goes out immediately. Urine GAGs is frozen *immediately* and stays frozen. Bag separation follows the existing calculator temperature logic.

## Availability prerequisites
- Blue screw-cap Salivette Cortisol or approved Super SAL kits **must be confirmed stocked**. The calculator shows the blue-cap Salivette route and explicitly rejects white-cap substitution. Quest's online test directory notes that some service areas, including SJC, may not offer these codes.
- Quest 35080 is a **non-New York code** (NY test code 37340). No bone marrow, tissue, or slides are modeled. Receiving Quest routing and special hematopathology packaging are prerequisites.
- Quest 30422 is grounded in Geisinger's **Quest-code-specific** referral instructions; specimen container is not identified on that catalog page. The calculator therefore restricts collection to an original, *confirmed freezer-safe* Sterile cup, with no implied transfer, and requires Quest service area confirmation.

## Sources
- Quest 19897: https://testdirectory.questdiagnostics.com/test/test-detail/19897/cortisol-lcms-saliva?cc=MASTER
- Quest 93020/92687/18921 specimen details: https://intellitestmanager.questdiagnostics.com/home/output/233220
- Quest updated cold shipping: https://intellitestmanager.questdiagnostics.com/home/output/235087
- Quest 92687: https://testdirectory.questdiagnostics.com/test/test-detail/92687/cortisol-lcms-saliva-3-samples?cc=MASTER&p=r
- Quest 18921: https://testdirectory.questdiagnostics.com/test/test-detail/18921/cortisol-lcms-saliva-4-samples?cc=MASTER&p=r
- Quest saliva timing guide: https://www.questhealth.com/on/demandware.static/-/Sites-QD-CIT-Library/default/CollectionInstructionsSalivaryCortisol.pdf
- Quest 35080: https://testdirectory.questdiagnostics.com/test/test-detail/35080/leukemialymphoma-evaluation?cc=MASTER
- Geisinger Quest-linked 30422: https://www.geisingermedicallabs.com/catalog/Details?tid=2491

## Checks performed
- All six unique Quest codes verified not already active within the previously loaded historical activation modules audited for this batch.
- Both repositories: module contents and script load order read back; the two new modules precede app initialization.
- Structurally checked six entries for source URL, exact specimen type, original draw/submit, valid transport temperatures, nonzero volume and tube counts, source-specific label, and no overwriting active/blocked catalog records.
- `app.js` inspected: `collectionCount = submissionCount > 1` is expanded to individually numbered collection/submit paths in the container hover.
- **Not run**: full headless-browser regression, actual Quest account orderability or freezer/container inventory checks. Do not describe this as verified operational go-live for all markets.
