# v11.40: serum/plasma transport-tube sharing

**Change:** Two compatible tests per ordinary serum or plasma transport tube. Number of tubes = ceil(number of compatible tests / 2). This applies to the processed submission, not the collection/source tube count.

**Compatible:** same serum vs plasma material, original blood source, centrifugation processing flag, selected transport tube, transport temperature and STAT/routine routing. Test-specific transport requirements override the default.

**Not combined:** serum with plasma; separate STAT/routine; different temperatures or collection sources; original/primary tube submissions; tests requesting dedicated or multiple transport tubes; amber/light-protected, metal-free, cryovial and other specialty containers. Unmeasured or special handling must be verified manually.

**Printout:** retains all test codes and pairs them visibly: Tube 1: A + B, Tube 2: C + D. Bag-level tube counts and SST/Red Top transfer-source summaries use pooled quantities. Print note requires sufficient volume and receiving lab acceptance. Individual required specimen volumes remain visible in the detail table.

**QA:** `node qa_serum_plasma_transport_pooling_v11.40.js` passed 11,112 checks, covering 2–9 serum tests, plasma tests, explicit multi-tubes, no-pool instructions, STAT and temperature separation, 2,674 active single-test records, and mixed orders. `python /mnt/data/lab_work/qa_transport_print_1140.py` checked the 390px and 1440px Chromium print outputs, matching all measured sizes/spacing and exact tube-code grouping.

**Limitation:** The rule assumes receiving-lab permission to share an aliquot and sufficient specimen volume for both tests. It is not a substitute for official assay-specific handling requirements. The app does not attempt to validate final transport tube capacity for each assay.
