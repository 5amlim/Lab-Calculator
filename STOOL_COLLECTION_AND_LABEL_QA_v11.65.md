# Stool collection and labeling QA | v11.65

## Change
- Every submitted stool-containing card renders a **LABEL Stool** instruction even if the receiving container is the original collection cup.
- For compatible ordinary stool assays, **What to collect** shows one source Sterile Urine Cup marked **Stool**, regardless of how many test-specific final containers need to be filled. Includes tests requiring timely fresh-stool transfer to Total-Fix vials.
- No change to submission bag assignments, per-test final-container numbers, preservative vial types, submission temperature or STAT segregation.

## Explicit exclusions
- A requirement for a separate/dedicated stool sample or multiple source specimens overrides shared stool collection.
- Specialized primary sources such as trace-metal-free collection containers remain counted separately.
- Blocked timed total-stool collection tests remain blocked and keep their specialty source requirements.
- Urine and stool are never collected in the same cup. Sharing applies only to compatible tests from **one bowel movement**, with sufficient sample volume and compatible collection and processing instructions.

## Validation
- 5,741 Node regression assertions against v11.64, including all active directory records for submitted-container parity and non-stool collection parity, every active stool LABEL, 276 stool pair scenarios, a 5-test pooled stool collection, combined standard-cup + Total-Fix assays, separate trace-metal sample, urine + stool, and STAT/routine shipment separation.
- Browser print sample: 11235, 16796, 681, 90389. One stool source cup; 3 separately temperature-controlled shipment bags; final container quantities unchanged. Chrome print text matched across 390px and 1280px viewports, including page count (4). Safari on-device printing still needs verification.
