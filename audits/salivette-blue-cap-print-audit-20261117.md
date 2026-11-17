# Salivette Cortisol: blue-cap badge and timed-container print audit

Date: 2026-11-17

## Defect and correction

The former generic gray icon appeared because Quest and Labcorp `tubeClass` and `transportTubeClass` did not recognize Salivette. Printed Quest bag cards also combined separate timed saliva tests into a single visual group, obscuring per-test container allocation and collection-time labels.

- New shared stylesheet: `assets/css/salivette-blue-cap.css`. The Salivette icon has a cobalt blue cap, light-blue collar and translucent tube body; print backgrounds are preserved.
- Both `assets/js/app.js` (Quest) and `labcorp-app.js` map Salivette device aliases, including legacy Labcorp `Salivette Kit (123724)` and `Separate Salivette Collection Devices (123724)`, to `tube-salivette` in both collection and submission views.
- Salivette-specific print presentation grouping is disabled so independent order codes retain separate cards and their true physical counts, rather than being visually folded into one generic group.
- Collection grouping and original submission keys keep different timed Salivette tests separate. Shared specimen SALIVA badge remains distinct from the new blue container icon.
- Cortisol labels now display collection time and per-test physical device numbering as needed. No date/time text was added to unrelated tests.
- Both `index.html` and `labcorp.html` load the shared CSS and cache-bust the updated JavaScript.
- Equivalent fixes published in the primary `5amlim/Lab-Calculator` repository and mirror `5amlim/Quest-Calculator-Test`.

## Existing Quest Salivette cortisol records audited

| Quest code | Test | Draw / submit devices | Print label |
| --- | --- | --- | --- |
| 19897 | Cortisol LC/MS, saliva | 1 / 1 | SALIVA, collection time |
| 93020 | Cortisol LC/MS, saliva, 2 samples | 2 / 2 | SALIVA, collection time, numbered 1–2 |
| 92687 | Cortisol LC/MS, saliva, 3 samples | 3 / 3 | SALIVA, collection time, numbered 1–3 |
| 18921 | Cortisol LC/MS, saliva, 4 samples | 4 / 4 | SALIVA, collection time, numbered 1–4 |

Selecting all four tests requires ten separate Salivettes in total; the collection and submission quantities are still 1 + 2 + 3 + 4, but they are now visually allocated by test rather than shown as a generic shared 10-device card.

## Previously added Labcorp timed-saliva records audited

| Labcorp code | Draw / submit devices |
| --- | --- |
| 502120 | 2 / 2 |
| 502122 | 3 / 3 |
| 502124 | 4 / 4 |
| 503775 | 5 / 5 |
| 503776 | 6 / 6 |
| 503777 | 7 / 7 |

All six older records use Salivette Kit (123724) / Separate Salivette Collection Devices (123724) and now use the same blue-cap badge. They retain their timed, separate-device logic and specimen collection time labeling. None were changed to blood tubes or generic transport tubes.

## Verification completed

- Successfully parsed both app scripts in both repositories with JavaScript syntax checks.
- Executed extracted `tubeClass` mappings and confirmed `tube-salivette` for both current Quest and older Labcorp names; unrelated Lavender EDTA and gray urine-culture badge mappings remain unchanged.
- Inspected source for separated per-code Salivette collection grouping, suppression of print recombination, timed label generation and original submission keys.
- Confirmed stylesheet links and cache-busted app scripts in Quest and Labcorp pages in each repository.
- Reviewed all ten listed catalog entries and their source-level collection/submission device counts.
- No comprehensive live-browser print-layout regression or actual printer test was run, so the exact appearance should be checked in print preview after deploy.

## Product differentiation

This blue cap is the **Salivette Cortisol** device. Other Sarstedt Salivette variants exist with different caps; do not assume unrelated Salivette kits use this cap color without checking the actual collection device.

## Scope

This review covers Salivette-related entries found in the Quest recent-addition module and historical Labcorp timed-cortisol catalog, plus their shared icon and print logic. This is not a code-level clinical re-verification of every Quest and Labcorp assay.
