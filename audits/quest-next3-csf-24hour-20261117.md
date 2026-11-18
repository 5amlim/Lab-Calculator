# Quest verified additions: CSF IgM, CSF pyruvate, urine cortisol/cortisone

Date: November 17, 2026

New code module `assets/js/quest-next-three-verified-csf-urine-20261117.js` loaded before `assets/js/app.js` in both `5amlim/Lab-Calculator` and `5amlim/Quest-Calculator-Test`.

## Activated

| Quest code | Test | Draw / source | Submit | Temperature | Volume |
|---|---|---|---|---|---|
| 4449 | IgM, CSF | Original sterile leak-proof, freezer-safe **Sterile cup** | SAME original capped **Sterile cup**, no transfer | **Frozen** | 1 mL preferred, 0.5 mL minimum |
| 38363 | Pyruvate, CSF | CSF collected in **Sterile cup** | Aliquot into a clean sterile **Transport Tube**, plastic screw-cap vial | **Frozen**, room-temp handling not permitted | 2 mL preferred. Quest MASTER does not publish a lower minimum. |
| 37355 | Cortisol, Free and Cortisone, 24-Hour Urine with Creatinine | Full unpreserved refrigerated **24-Hour Urine Container** | One well-mixed aliquot in a leakproof plastic **Sterile cup** | **Refrigerated** | 10 mL preferred, 2.6 mL minimum |

### Specific processing and labeling safeguards

- All CSF specimens are collected only by qualified procedural personnel. They show **CSF** as the specimen source, not blood or unspecified body fluid. No smear, slide, preservatives, or onsite specialized processing was added.
- **4449** is an *original-container* submission. Do not create a fictitious transfer vial. Quest requires frozen shipment even though stability differs in other temperatures.
- **38363** is a *transfer-container* submission. Move to a sterile plastic screw-cap transport vial promptly, freeze, and ship frozen. Do not leave at room temperature. The Quest directory provides no minimum volume for the unspecified receiving service area, so the complete **2 mL preferred** amount is planned.
- **37355** is a timed, unpreserved 24-hour urine collection. Keep the source jug refrigerated, record completed total volume and collection duration, mix before preparing a separate 10 mL aliquot, and ship the sealed aliquot refrigerated. The **collection jug is not a second submission container**. Do not introduce boric acid, 6N HCl, glacial acetic acid, or gray urine-culture preservative.
- Where the ordering lab requires timed urine start/end fields, these are noted for **37355 only**, not added generically to unrelated tests. Other labels retain the actual specimen type plus required source information, in keeping with the calculator naming convention.
- Frozen and refrigerated submissions remain in **separate bags**.
- Each entry is searchable by its exact code, clinical name, and task-specific aliases; categories are neurology, immunology, CSF, endocrinology, metabolism, and urine as applicable.

### Excluded as already active

- **16442** already appears in `quest-verified-from-unusable-audit-next100-20261116.js`
- **16595** already appears in `quest-verified-from-unusable-audit-next100-20261116.js`
- **36954** already appears in `quest-verified-from-unusable-audit-after36592-next100-20261116.js`
- **14534** already appears in `quest-verified-from-unusable-audit-next50c-20261116.js`
- **37554** already appears in `quest-feasible-from-master-20261115.js`

These were not counted as new additions. Other unsupported specialized workflows such as 37°C cold-agglutinin handling and acid-preserved urine were not activated.

### Sources

- [Quest 4449: IgM, CSF](https://testdirectory.questdiagnostics.com/test/test-detail/4449/igm-csf?cc=MASTER&p=r), 1 mL, 0.5 mL minimum, sterile leakproof original container, frozen.
- [Quest 38363: Pyruvate, CSF](https://testdirectory.questdiagnostics.com/test/test-detail/38363/pyruvate-csf?cc=MASTER&p=r), 2 mL CSF, plastic screw-cap vial, frozen shipment, room temperature unacceptable.
- [Quest 37355: Cortisol, Free and Cortisone, 24-Hour Urine](https://testdirectory.questdiagnostics.com/test/test-detail/37355/cortisol-free-and-cortisone-24-hour-urine-with-creatinine?cc=MASTER&p=r), 10 mL preferred, 2.6 mL minimum, no-preservative refrigerated option, plastic urine container, refrigerated shipping.

All three source pages include a warning that Nichols Institute San Juan Capistrano may not offer the code. **Actual Quest receiving-account/service-area orderability must be confirmed before collection.**

### Code verification

Both repositories returned the same blob SHA `584ab7b9905913779477e6d8feb0a421724df168` for the newly created JavaScript module. JavaScript syntax checked successfully; exact code count, original/transfer vessel fields, source links, specimen names, bag temperatures, 24-hour urine handling, no-overwrite safety for active/blocked rows, replay idempotency, and pre-app load order were inspected or tested. This was **not** a live browser print-preview or onsite clinical workflow validation, and no Quest ordering account was tested.
