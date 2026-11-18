# Quest next five: frozen body-fluid and post-transplant molecular testing

**Reviewed and activated:** November 17, 2026.
**Source code:** `assets/js/quest-official-next5-fluid-transplant-20261117.js` in `5amlim/Lab-Calculator` and `5amlim/Quest-Calculator-Test`.

This is an incremental activation of five previously reference-only candidate codes. The same module, content blob SHA `c9a8708df2f9767639362ac8e338a854430c7bd5`, loads before `assets/js/app.js` on both repositories. Existing `active` and `blocked` records are not overwritten.

| Quest code | Test | What to collect | What to submit | Bag | Required note |
| --- | --- | --- | --- | --- | --- |
| **17587** | hCG, Total, Peritoneal Fluid | 3 mL (2 mL minimum) peritoneal fluid directly into an additive-free sterile plastic screw-cap **Transport Tube** | SAME original sterile **Transport Tube** | **Frozen** | Label **PERITONEAL FLUID**; qualified procedural collection only; do not substitute blood tubes, pancreatic fluid, or hemolyzed material |
| **17643** | CA 19-9, Pericardial Fluid | 3 mL (2 mL minimum) pericardial fluid into a sterile plastic screw-cap **Transport Tube** | SAME original sterile **Transport Tube** | **Frozen** | Label **PERICARDIAL FLUID**; qualified procedural collection only; no pooled frozen sample or anticoagulant |
| **18088** | Post-Transplant EBV DNA, Quantitative PCR, Serum | SST / Gold (Tiger SST alternative under existing toggle), obtain 1 mL serum (min 0.5) | Spin; transfer serum into one plain **Transport Tube** | **Refrigerated** | Label **SERUM · SST SOURCE**; confirm Quest transplant-program shipper and account |
| **18003** | Post-Transplant HIV-1 RNA PCR, Plasma | Lavender EDTA, conservative planning of **two** appropriately filled source tubes to provide 3 mL EDTA plasma (min 1 mL) | Spin; one plain **Transport Tube** with separated EDTA plasma | **Refrigerated** | Label **PLASMA · LAVENDER EDTA SOURCE**; no heparin, unspun specimen older than 24 h, or frozen primary tubes |
| **18060** | Post-Transplant HBV DNA PCR, Plasma | Lavender EDTA, conservative planning of **two** appropriately filled source tubes to provide 3 mL EDTA plasma (min 1 mL) | Spin; one plain **Transport Tube** with separated EDTA plasma | **Refrigerated** | Label **PLASMA · LAVENDER EDTA SOURCE**; no heparin, unspun specimen older than 24 h, or frozen primary tubes |

## Container conventions and grouping

- Original **Transport Tube** is used for direct-collected sterile body fluid because Quest specifies a sterile transport tube, not a separate collection cup plus an inferred transfer. Both are separate **specimen types**, with PERITONEAL FLUID and PERICARDIAL FLUID labels.
- Frozen specimens use screw-cap, additive-free plastic transport vessels and separate frozen bags. Do not pool different source fluids or divide one already-frozen sample between separate tests. No slide, cytology, culture media, or heparin substitution.
- Blood source and submission containers are explicitly different for the three molecular tests: spun serum from SST, or separated EDTA plasma from Lavender EDTA, submitted in a **Transport Tube**. **SERUM** and **PLASMA** never merge.
- The established Gold/Tiger toggle applies only to the serum SST source. The EDTA plasma routes are unrelated to SST pooling.
- For the two 3-mL plasma tests, two dedicated Lavender EDTA collection tubes are a *conservative local yield plan*, not a statement that Quest formally requires exactly two tubes. Verify actual EDTA tube size, obtainable plasma yield, and Quest receiving instructions before collection. Each test submits **one** plasma transport tube.
- Labels state required fluid type and blood origin, without adding unsupported routine date/time wording. Standard patient identification and applicable transplant-program requisition handling still apply.
- Receiving-lab ordering restrictions are not resolved by catalog activation. Do not offer any post-transplant assays until specialized program/shipper requirements and local account eligibility are confirmed.

## Quest test-specific sources

- [17587 hCG Total, Peritoneal Fluid](https://testdirectory.questdiagnostics.com/test/test-detail/17587/hcg-total-peritoneal-fluid?cc=MASTER): 3 mL preferred, 2 mL minimum; sterile transport tube; frozen; Nichols San Juan Capistrano not offered.
- [17643 CA 19-9, Pericardial Fluid](https://testdirectory.questdiagnostics.com/test/test-detail/17643/ca-19-9-pericardial-fluid?cc=MASTER): 3 mL preferred, 2 mL minimum; sterile transport tube; frozen; Nichols San Juan Capistrano not offered.
- [18088 Post-Transplant EBV DNA, Serum](https://testdirectory.questdiagnostics.com/test/test-detail/18088/post-transplant-epstein-barr-virus-dna-quantitative-real-time-pcr-serum?cc=MASTER&p=r): 1 mL serum (minimum 0.5); transport tube; refrigerated; shipper instructions required.
- [18003 Post-Transplant HIV-1 RNA, Plasma](https://testdirectory.questdiagnostics.com/test/test-detail/18003/post-transplant-hiv-1-rna-real-time-pcr-plasma?cc=MASTER&p=r): 3 mL (minimum 1 mL) EDTA plasma; transport tube refrigerated; frozen in primary tube or heparin rejected.
- [18060 Post-Transplant HBV DNA, Plasma](https://testdirectory.questdiagnostics.com/test/test-detail/18060/post-transplant-hepatitis-b-virus-dna-real-time-pcr-plasma?cc=MASTER&p=r): 3 mL (minimum 1 mL) EDTA plasma; transport tube refrigerated; whole blood >24 h unspun, heparin or frozen primary tube rejected.
- [Quest packaging rules](https://www.questdiagnostics.com/links/test/am/specimen-handling/logistics): specimen temperature separation, plastic screw-cap frozen specimens, separate frozen bag and requisite dry ice.

## Duplicate and feasibility audit

Scanned 79 Quest-linked loading modules on the live `Lab-Calculator` index for these codes and other potential candidates. None of these five codes occurred as an activated `testCode` in the scanned modules. Earlier candidate codes **14541, 15319, 17088, 17515, 16602, 37513** were already present and not added. Other exclusions:
- 17873 Toxocara antibody body fluid is specifically **ocular fluid only** (not general CSF/pleural/urine); do not generalize it into a generic body-fluid workflow.
- 17639 Quest MASTER omitted service-area-specific specimen fields; not modeled from a similarly named assay.
- 14203 exact Quest test-specific specimen instructions not retrievable; ARUP's differently identified assay is not a sufficient source for assuming the Quest code's pathway.
- No hair/nails, on-site IHC/tissue workflows, unavailable 37°C warm handling or acid-preserved 6N HCl workflows added.

## Validation

- Five unique exact codes and official Quest URLs checked in each module.
- Both repositories' new JS module passed JavaScript syntax parsing.
- Read back both repository blobs, identical SHA.
- Evaluated module twice on seeded existing `reference`, `blocked`, and `active` test records: reference activated once; existing active/blocked unchanged; no duplicate on replay.
- Checked specimen-specific label strings, original-vs-transfer container identity, nonzero preferred/minimum volumes, explicit source tube and submission counts, all transport temperatures, and module placement before `assets/js/app.js`.
- **Not performed:** end-to-end live browser render/print-preview regression, Quest service-area orderability, transplant-program shipper approval, or local tube inventory verification.
