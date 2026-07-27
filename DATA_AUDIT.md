# v4.5 display correction

- Platelet-poor plasma is classified as a plasma subtype for specimen text styling and transport-tube badge selection.
- Its specific label is preserved; only the visual badge is standardized with serum/plasma transport tubes.

# Data audit — v2.7

This update corrected SST handling and added full-directory lookup links.

Built-in tests: **253**
Built-in records changed: **83**

## What changed

- Routine SST records that only said “SST” no longer default to a transport tube. They now say to clot, centrifuge, and submit the spun SST/gold tube.
- Explicit Quest transfer requirements were retained for specialty tests.
- The calculator now opens the official Quest search results for any unmatched test name or code.

## Complete Quest menu limitation

Quest advertises more than 3,500 tests, with service-area-specific availability and requirements. No public bulk export or browser-safe API was identified during this review. The calculator therefore keeps a curated local database and uses live Quest links for the full menu.

## Changed records

- `223` — Albumin: changed placeholder transport tube to spun SST
- `234` — Alkaline Phosphatase: changed placeholder transport tube to spun SST
- `243` — Amylase: changed placeholder transport tube to spun SST
- `267` — Thyroglobulin Antibodies: changed placeholder transport tube to spun SST
- `296` — BUN/Creatinine Ratio: changed placeholder transport tube to spun SST
- `303` — Calcium: changed placeholder transport tube to spun SST
- `367` — Cortisol: changed placeholder transport tube to spun SST
- `374` — Creatine Kinase (CK), Total: changed placeholder transport tube to spun SST
- `402` — DHEA - Sulfate: changed placeholder transport tube to spun SST
- `457` — Ferritin: changed placeholder transport tube to spun SST
- `466` — Folate, Serum: changed placeholder transport tube to spun SST
- `470` — FSH: changed placeholder transport tube to spun SST
- `482` — GGT: changed placeholder transport tube to spun SST
- `498` — Hepatitis B Surface Antigen with Reflex Confirmation: changed placeholder transport tube to spun SST
- `539` — IgA: changed placeholder transport tube to spun SST
- `571` — Iron, total: changed placeholder transport tube to spun SST
- `593` — Lactate Dehydrogenase (LDH): changed placeholder transport tube to spun SST
- `606` — Lipase: changed placeholder transport tube to spun SST
- `615` — Lutenizing Hormone (LH): changed placeholder transport tube to spun SST
- `622` — Magnesium: changed placeholder transport tube to spun SST
- `718` — Phosphate (phosphorus): changed placeholder transport tube to spun SST
- `745` — Progesterone, Immunoassay: changed placeholder transport tube to spun SST
- `754` — Protein, Total Serum: changed placeholder transport tube to spun SST
- `859` — T3, Total: changed placeholder transport tube to spun SST
- `866` — T4- free: changed placeholder transport tube to spun SST
- `867` — T4 Total: changed placeholder transport tube to spun SST
- `873` — Testosterone, Total, Males (Adult), Immunoassay: changed placeholder transport tube to spun SST
- `899` — TSH: changed placeholder transport tube to spun SST
- `905` — Uric Acid: changed placeholder transport tube to spun SST
- `927` — B12: changed placeholder transport tube to spun SST
- `4021` — Estradiol: changed placeholder transport tube to spun SST
- `4418` — Rheumatoid Factor: changed placeholder transport tube to spun SST
- `4420` — CRP: changed placeholder transport tube to spun SST
- `4698` — CA 19-9: changed placeholder transport tube to spun SST
- `4847` — Prealbumin: changed placeholder transport tube to spun SST
- `5081` — Thyroid Peroxidase Antibody - TPO: changed placeholder transport tube to spun SST
- `5363` — PSA total: changed placeholder transport tube to spun SST
- `5616` — Iron/ TIBC and Ferritin panel: changed placeholder transport tube to spun SST
- `7065` — B12 + folate panel: changed placeholder transport tube to spun SST
- `7137` — FSH and LH: changed placeholder transport tube to spun SST
- `7444` — Thyroid panel with TSH: changed placeholder transport tube to spun SST
- `7573` — lron, Total And Total lron Binding Capacity (TIBC): changed placeholder transport tube to spun SST
- `7600` — Lipid panel: changed placeholder transport tube to spun SST
- `8396` — HCG total quantitative: changed placeholder transport tube to spun SST
- `8472` — Hepatitis C Antibody with Reflex to HCV, RNA, Quantitative, Real-Time PCR: changed placeholder transport tube to spun SST
- `10124` — HS CRP: changed placeholder transport tube to spun SST
- `10165` — BMP: changed placeholder transport tube to spun SST
- `10231` — CMP: changed placeholder transport tube to spun SST
- `10256` — LFT/ Hepatic function panel: changed placeholder transport tube to spun SST
- `10378` — 1,5-Anhydroglucitol (1,5-AG), Intermediate Glycemic Control: changed placeholder transport tube to spun SST
- `34429` — T3 - Free: changed placeholder transport tube to spun SST
- `34499` — SARS Covid Antibody (IgG) Spike: changed placeholder transport tube to spun SST
- `34604` — Lipoprotein A: changed placeholder transport tube to spun SST
- `34879` — Methylmalonic Acid (MMA): changed placeholder transport tube to spun SST
- `36127` — TSH reflex free T4: changed placeholder transport tube to spun SST
- `58984` — TSH and Free T4: changed placeholder transport tube to spun SST
- `91431` — HIV-1/2 Antigen and Antibodies, Fourth Generation, with Reflexes: changed placeholder transport tube to spun SST
- `549` — Immunofixation, Serum: changed placeholder transport tube to spun SST
- `8293` — Direct LDL: changed placeholder transport tube to spun SST
- `7105` — Hepatitis B Immunity Panel: changed placeholder transport tube to spun SST
- `92170` — Allergy Mold Panel, Complete: changed placeholder transport tube to spun SST
- `7083` — Immunoglobulins Panel, Serum (IGM, IGG, IGA): changed placeholder transport tube to spun SST
- `5059` — Maternal Serum AFP (non-NY testing): changed placeholder transport tube to spun SST
- `92788` — Maternal Serum AFP (NY): changed placeholder transport tube to spun SST
- `14852` — Lipid Panel with Reflex to Direct LDL: changed placeholder transport tube to spun SST
- `13600` — PrEP HIV-1 RNA, Qualitative Real-Time PCR: replaced vague no-transfer wording with spun SST
- `13595` — PrEP HIV-1/2 Antigen/Antibodies, 4th Generation, Reflex to Differentiation: replaced vague no-transfer wording with spun SST
- `334` — Cholesterol, total: replaced vague no-transfer wording with spun SST
- `8475` — Hepatitis B Surface Antibody Immunity, Quantitative: replaced vague no-transfer wording with spun SST
- `237` — Alpha-Fetoprotein, Tumor Marker (AFP): replaced vague no-transfer wording with spun SST
- `891` — Transferrin: replaced vague no-transfer wording with spun SST
- `542` — IgE: replaced vague no-transfer wording with spun SST
- `746` — Prolactin: official Quest page correction
- `30551` — TSI (Thyroid Stimulating Immunoglobulin) REFRIGERATED: official Quest page correction
- `31789` — Homocysteine: official Quest page correction
- `91729` — Cardio IQ Lipoprotein a: official Quest page correction
- `91737` — CardioIQ HS CRP: official Quest page correction
- `14966` — Testosterone Free, total, bioavailable, Sex hormone BG: official Quest page correction
- `16558` — Calcitriol 1,25-Dihydroxyvitamin D: official Quest page correction
- `90963` — T3 reverse: official Quest page correction
- `91735` — Cardio IQ® Vitamin D, 25-Hydroxy: official Quest page correction
- `38683` — TRAb (TSH Receptor Binding Antibody): official Quest page correction
- `36378` — Analyzer ANA with reflex panel: official Quest page correction

## Version 3.5 correction

- `3020` — Urinalysis, Complete, with Reflex to Culture: corrected the workflow to require both a red/yellow swirl-top urinalysis preservative tube and a gray-top urine culture preservative tube. Both tubes must be filled to their marked lines and submitted.


## v3.6 correction

Quest code 3020 now distinguishes the gray-top **urine culture preservative tube** from the gray fluoride/oxalate **blood** tube. Urine specimens are excluded from the blood order-of-draw detector.


## v3.7 workflow update

- Quest code 3020 is modeled as collection into a sterile urine cup, followed by transfer into the red/yellow swirl-top UA preservative tube and the gray-top urine culture preservative tube.
- The gray urine culture tube remains distinct from gray fluoride/oxalate blood tubes.
- Print calculations now separate initial collection containers from processed submission containers and group submission by transport temperature.


## v3.8 original-tube submission display

- The print submission plan now distinguishes original collection tubes from transferred aliquots.
- Original-tube submissions retain the original tube color badge and display the specimen inside.
- Arsenic, Blood (269) is shown as Royal Blue EDTA containing whole blood, submitted in the original tube.
- Mercury, RBCs (3102) is shown as Royal Blue EDTA containing RBCs, submitted in the original tube after processing as directed.
- Whole-blood lavender, green-heparin, pink-EDTA, royal-blue, and light-blue original-tube workflows receive the same treatment when the record states no transfer or an original/primary tube.
- Routine spun SST specimens that remain in the gel tube continue to be pooled by temperature for tube-count planning, while the submission badge now explicitly says the spun serum remains in the original SST.

## v4.4 source clarification

Manual swab and transport-tube entries now carry a visible reminder to document the exact source. Generic swabs are flagged as requiring source clarification. Examples include throat swab, serum from SST, and plasma from Lavender EDTA.

## v4.7 badge correction

- Acid-washed / metal-free transport tubes are displayed with the neutral transport badge, regardless of whether the specimen is serum or plasma.
- Green-top-third transport badges remain reserved for standard serum, plasma, and platelet-poor plasma transport tubes.


## v4.8 copper submission clarification

- `363` — Copper: the bag label now explicitly says **Acid-Washed / Metal-Free Plasma Transport Tube**. The badge remains neutral because Quest requires a specialty acid-washed or metal-free vial. The specimen source remains plasma from a Royal Blue trace-metal tube.
