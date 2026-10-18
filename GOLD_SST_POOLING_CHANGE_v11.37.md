# v11.37 Gold SST pooling change

## Calculation

- Gold SST estimated usable serum increased from **2.0 mL to 2.5 mL** per fully filled **5 mL Gold SST**.
- Gold pooling still uses **preferred specimen volume** when it can be read; otherwise it falls back to minimum. Individual test requirements are still capped at a single SST unless explicit instructions require multiple or dedicated tubes.
- Original-submit and transferred serum remain in separate collection pools, and transfer destinations / temperature / STAT versus routine continue to be separated.
- Tiger SST (7.5 mL) has an independent algorithm and was not changed. Lavender, Red Top, and all other specimen types were not changed.
- The printout's tube-count explanation now states the Gold-specific assumption. The separate conservative 2.5x whole-blood draw-volume estimate is retained.

## Effect on counts

Three hundred reproducible random combinations were sampled from 748 bundled active Gold/SST-draw records for each order size. These are simulated orders, not claims about real-world order frequency.

| Tests in simulated order | Old average Gold tubes | New average Gold tubes | Orders with fewer tubes (out of 300) |
|---:|---:|---:|---:|
| 2 | 1.61 | 1.55 | 19 |
| 5 | 2.99 | 2.77 | 64 |
| 10 | 5.36 | 4.83 | 153 |
| 20 | 10.05 | 8.95 | 278 |

Example using 5 currently bundled test codes: TSH 899 + lipid panel 7600 + prolactin 746 + CMP 10231 + FSH 470. All are room-temperature original-submit SSTs, 1 mL preferred each. Gold tube count: **3 before -> 2 after**. Tiger tube count: 2 both before and after.

## Verification

- Syntax checked using `node --check app.js`.
- `node qa_gold_sst_pooling_v11.37.js`: **5,365 passing checks**, including each of 2,674 active single-test collection plans, pooling boundaries, dedicated tube requirements, and STAT/temperature/original-versus-transfer separation.
- 3,000 simulated order comparisons confirmed **zero changes in Tiger SST counts**.
- Two older bundled QA scripts have known stale assertions on the unchanged original v11.36 archive (search alias `esr` and hard-coded catalog count 2679); their failures are unrelated to this update.

## Safety limitation

**2.5 mL usable serum is an optimistic planning assumption, not a guaranteed yield.** Quest recommends collecting about 2 to 2.5 times the requested serum/plasma volume as whole blood (a range, not a guaranteed recovery), and collection/processing losses, variable hematocrit, underfilling, and repeat testing can reduce available serum. When specimen sufficiency is uncertain, collect additional compatible tubes or use the current laboratory's minimum/preferred submission instructions and clinical judgment. This update does not change or validate any test-specific directory requirements.

Source: Quest Diagnostics, Specimen handling guidance:
https://www.questdiagnostics.com/healthcare-professionals/test-directory/specimen-handling/laboratory-general
https://www.questdiagnostics.com/healthcare-professionals/test-directory/specimen-handling/specimen-collection
