# Quest next six reference-only tests: collection and print specification

Reviewed November 17, 2026. Implemented as `assets/js/quest-verified-next-6-hcv-ob-nafld-hhv8-20261117.js` in both `5amlim/Lab-Calculator` and `5amlim/Quest-Calculator-Test`. The module loads before `assets/js/app.js` and activates only previously absent or `reference`/`pending` records, without overwriting active or blocked records.

| Test code | Name | Draw containers | Submit containers and temperature |
|---|---|---|---|
| **91704** | HCV-Infected Patient, Baseline Panel 1 | 3 full SST for RT serum, 1 **different** full SST for refrigerated serum, 1 full Lavender EDTA for unspun whole blood, 1 additional Lavender EDTA for separated plasma | 3 original spun SST at room temperature; 1 other original spun SST refrigerated; 1 original unspun Lavender EDTA room temperature; 1 dedicated labeled polypropylene plasma Transport Tube refrigerated |
| **91706** | HCV-Infected Patient, Treatment Panel | 1 SST, 1 separate whole-blood Lavender EDTA, 2 separate EDTA tubes for HCV RNA plasma | Original spun SST room temperature; original unspun Lavender EDTA room temperature; **2 dedicated** plasma Transport Tubes refrigerated |
| **91707** | HCV-Infected Patient, Baseline Panel 2 | 2 full SST, 1 original whole-blood Lavender EDTA, 1 additional Lavender EDTA for plasma | 2 original spun SST room temperature; whole-blood Lavender EDTA room temperature; 1 plasma Transport Tube refrigerated |
| **93802** | Obstetric Panel With Fourth-Generation HIV | SST serum totaling 7 mL; 1 full Lavender EDTA; 1 full Pink EDTA | Serum in approved plain Transport Tube(s), room temperature; 2 EDTA whole-blood original tubes room temperature. The catalog models **2** dedicated serum transfer tubes conservatively to accommodate volume, but Quest does **not** specify a universal vial count; verify each transport vial's capacity and the receiving lab allocation before collection |
| **91979** | NAFLD Fibrosis Score | 1 Gold SST (serum); 1 Lavender EDTA (whole blood) | Original spun SST and original Lavender EDTA room temperature. Crouse Quest-Syracuse referral guide says avoid Friday/weekend/preholiday collection; local service area requires confirmation |
| **15873** | HHV-8 DNA Qualitative PCR | 1 appropriately filled **dedicated** Lavender EDTA whole-blood tube | Same original Lavender EDTA, no spin/transfer; refrigerated; **never freeze whole blood** |

## Label and grouping rules

- **All routes explicitly identify the specimen**, preserving **SERUM**, **PLASMA FROM LAVENDER EDTA**, **WHOLE BLOOD (LAVENDER EDTA)** and **WHOLE BLOOD (PINK EDTA)** in the metadata. A transport tube label names the original source where needed, and physical source tubes are not mistakenly treated as transfer tubes.
- **No automatic date/time wording** was added to ordinary specimens. Patient labels must still meet standard identification requirements and any lab-specific HIV/blood-bank rules.
- **91704** has **four SSTs in total**: three room temperature and one refrigerated, not a pooled four-SST bag. An HIV original SST should remain unopened.
- **91706** requires a *separate* full Lavender EDTA whole-blood tube and **two additional Lavender EDTA draws** for two separately submitted plasma aliquots. A paired source/destination count of 2/2 is used.
- **91707** has **two intact room-temperature SSTs** and a different EDTA plasma source from the unspun EDTA blood tube.
- **93802** requires **7 mL serum** (minimum 5 mL), which is approximately 3 Gold SSTs (2.5 mL yield each) or 2 Tiger SSTs (4 mL yield each) according to established calculator assumptions. The primary route uses `usePreferredSerumYield: true`. There is also one full Lavender EDTA and one full Pink EDTA, not an interchangeable pair.
- **91979** requires age, sex, height, weight and diabetes status; its referral route is time-sensitive.
- **15873** is a dedicated, properly filled original EDTA whole-blood tube. Whole-blood cryostorage is not a permitted fallback. The standalone PCR entry must not silently inherit alternate plasma/serum instructions.

## Test-specific source evidence

Official Quest:
- [91704](https://testdirectory.questdiagnostics.com/test/test-detail/91704/hepatitis-c-infected-patient-baseline-panel-1?cc=MASTER&p=r) explicitly lists **3 original SST room**, **1 original SST refrigerated**, **1 full EDTA whole blood room**, and **2 mL separately spun EDTA plasma refrigerated**.
- [91706](https://testdirectory.questdiagnostics.com/test/test-detail/91706/hepatitis-c-infected-patient-treatment-panel?cc=MASTER&p=r) explicitly lists **1 SST room**, **1 EDTA whole blood room**, **2 EDTA plasma-source tubes with transfer into transport tubes refrigerated**.
- [91707](https://testdirectory.questdiagnostics.com/test/test-detail/91707/hepatitis-c-infected-patient-baseline-panel-2?cc=MASTER&p=r) explicitly lists **2 original SST room**, **1 EDTA whole blood room**, **2 mL EDTA plasma separate refrigerated or frozen**, plus HIV unopened requirement.
- [93802](https://testdirectory.questdiagnostics.com/test/test-detail/93802/obstetric-panel-with-fourth-generation-hiv?cc=MASTER&q=93802) specifies **7 mL serum** and separate full Lavender/Pink EDTA tubes; room-temperature transport.
Quest-performing referral catalogs:
- [91979 via Crouse Health Quest Syracuse referral](https://laboratory.crouse.org/tests/display/2900) specifies 1 mL SST serum, 1 mL EDTA whole blood, ambient, weekday timing and demographics; exact current Quest code/orderability must be checked locally.
- [15873 via Rady Children's Quest SJC referral](https://www.rchsd.org/lab-test/herpes-virus-8-dna-qualitative-rt-pcr-15873/) specifies Lavender EDTA whole blood acceptable, refrigerated acceptable, and frozen whole blood rejected. [Sanford's Quest Chantilly referral](https://sanfordlaboratories.testcatalog.org/show/BLOD1223) separately confirms EDTA whole blood route and refrigeration preference. The catalog limits the new route to unprocessed EDTA whole blood.

## Exclusions and constraints

No slide, smear, prepared histology material, hair, nails, nonstandard preservative container, 6N HCl collection, or other unavailable material was added. No code from previous historical batches was counted as a new addition; duplicates in the seed catalog are skipped or updated only when reference-only.

The selected Quest MASTER test codes are not necessarily orderable at a particular market. **Quest warns that several are not offered at Nichols San Juan Capistrano**. The user's clinics must verify receiving Quest account/service-area acceptance and kit/transport-vial supply before collection.

## Checks performed

- Source verified each of six code names and eligible specimen pathways against Quest directories or Quest-performing referral instructions.
- New module contents verified identical across main and mirror repositories, and parsed successfully as JavaScript.
- All six unique codes contain specimen labels, a source URL, a named temperature, a primary original/transfer container route, and a nonzero collection/submission count.
- Checked that 91704/91706/91707 additional routes and 93802 serum/blood route counts remain separate, including mixed temperatures.
- Executed a seeded duplicate/blocked record test: reference-only test is activated; active and blocked tests remain unchanged; double evaluation is idempotent.
- HTML script loader places the module **before** calculator `app.js` in both repositories.
- **Not completed:** full browser print preview and end-to-end testing, physical tube-capacity checks for 93802, or real-time service-area orderability. Treat 91979/15873 as conditional on receiving laboratory confirmation.
