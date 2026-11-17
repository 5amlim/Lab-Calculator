# Quest collection workflow verification: fourteen shortlisted candidates

Reviewed: 2026-11-17. The user requested additions of all verified feasible tests from the 14-test shortlist. This review activates **seven**, with seven held as reference-only pending supply, process or orderability verification. No previously blocked/active record is overwritten. Both `5amlim/Lab-Calculator` and `5amlim/Quest-Calculator-Test` load `assets/js/quest-verified-candidate-review-20261117.js` before the calculator's application script.

## Activated (7)

| Quest code | Name | Exact specimen and packing pathway | Evidence |
|---|---|---|---|
| `270` | Arsenic, Urine | Trace Metal-Free Plastic Container -> same original container; refrigerated | Quest direct test 270 |
| `30338` | Carnitine, Random, Urine | Sterile cup -> plain 10 mL plastic urine Transport Tube; frozen, tube availability prerequisite | Quest direct test 30338 |
| `37129` | Vancomycin Resistant Enterococci (VRE), Culture | Stool in Sterile cup -> ESwab (Amies); room temperature | Quest direct test 37129 |
| `37962` | Immunofixation, CSF | Original sterile leakproof Sterile cup; refrigerated | Quest IntelliTest 220069 |
| `38404` | Neisseria gonorrhoeae Culture with Reflex to Susceptibility | ESwab (Amies) original, site-specific SWAB; room temperature <=24h; no refrigeration | Quest direct test 38404 |
| `39447` | Metabolic Risk Panel | 2.5 mL SST serum + separate lavender EDTA whole blood; both refrigerated, no automatic fasting | Quest direct test 39447 |
| `91713` | Diabetes, Advancing Chronic Kidney Disease Management Panel | 3 mL serum (2 Gold or 1 Tiger), 1 lavender whole blood room temp, separate 1.5 mL EDTA plasma refrigerated, 10 mL random urine room temp; fasting 9-12 h | Quest direct test 91713 |

Source URLs are retained in each entry. Only specimen collection workflows have been verified; actual market/account orderability still depends on the Quest patient service area. Where Quest marks the SJC laboratory as not offering a code, the record explicitly asks staff to check Quest acceptance.

## Held reference-only (7)

| Quest code | Test | Reason |
|---|---|---|
| `3356` | Boron, Blood | Needs immediate transfer to acid-washed plastic screw-cap vial. Standard Royal Blue EDTA tube alone does not satisfy the collection instructions; acid-washed vial stock and handling unconfirmed. |
| `14961` | Metanephrines, Fractionated, Random Urine | Nonpreserved route requires verified pH below 6 and frozen shipment (6N HCl alternative prohibited locally). No validated local pH/processing workflow confirmed. |
| `90106` | Eastern Equine Encephalitis Virus Antibody, IFA, CSF | Quest IntelliTest listing identifies this as a non-orderable component in CSF encephalitis panel. Do not treat code as a standalone order without Quest confirmation. |
| `90107` | St. Louis Encephalitis Virus Antibody, IFA, CSF | Quest IntelliTest listing identifies this as a non-orderable component. Requires Quest confirmation of separately orderable local code. |
| `16441` | JC Polyoma Virus DNA, Qualitative PCR, CSF | Current Quest code-specific collection volume, container and stability not sufficiently confirmed. |
| `17407` | Rheumatoid Factor, CSF | Current Quest code-specific collection volume, container and stability not sufficiently confirmed. |
| `18889` | BK Virus DNA, Qualitative PCR, CSF | Current Quest code-specific container/stability requirements not sufficiently confirmed; Quest updated performing site in 2024. |

## Key labeling, printout and pooling safeguards

- **270** retains a trace-metal-free urine collection container as the ORIGINAL submit container. No default sterile cup substitution.
- **30338** uses a plain **10 mL plastic urine tube** as a downstream transport vessel. The gallery/grouping term is `Transport Tube`. Do not use gray urine culture preservative tubes or collect if no compatible 10 mL tube is available.
- **37129** is **STOOL**, not a direct rectal swab. Collect in `Sterile cup` then submit `ESwab (Amies)`. Do not substitute Cary-Blair or Total-Fix.
- **37962** is original CSF in `Sterile cup` with no onsite slide preparation or transfer.
- **38404** is one swab per anatomic collection site in original ESwab/Amies, kept at room temperature and delivered within 24 hours. Exact anatomical site required on label/requisition.
- **39447** uses SST serum and a separate EDTA whole-blood tube; the manufacturer's lipid panel preparation instructions do not impose fasting by default. Do not turn it into a fasting-required card.
- **91713** requires **4 physically separate specimen preparations** in distinct physical collection/transport containers: (1) spun SST serum refrigerated (3 mL, 2 Gold SSTs or 1 Tiger SST); (2) separate full lavender EDTA whole blood unspun at ROOM temperature; (3) separate lavender EDTA plasma for PTH, centrifuged and aliquoted into dedicated `Transport Tube` REFRIGERATED; (4) original random urine in `Sterile cup` ROOM temperature. It requires fasting 9-12 hours. Do not pool the two lavender collections.
- No automatic date/time text added to special print labels, preserving the user's original specimen-source labeling convention.

## Verification evidence

- Quest test directory: [270](https://testdirectory.questdiagnostics.com/test/test-detail/270/arsenic-urine?cc=MASTER&p=r), [30338](https://testdirectory.questdiagnostics.com/test/test-detail/30338/carnitine-random-urine?cc=MASTER&p=r), [37129](https://testdirectory.questdiagnostics.com/test/test-detail/37129/vancomycin-resistant-enterococci-vre-culture?cc=MASTER&p=r), [38404](https://testdirectory.questdiagnostics.com/test/test-detail/38404/neisseria-gonorrhoeae-culture-with-reflex-to-susceptibility?cc=MASTER), [39447](https://testdirectory.questdiagnostics.com/test/test-detail/39447/metabolic-risk-panel?cc=MASTER&p=r), [91713](https://testdirectory.questdiagnostics.com/test/test-detail/91713/diabetes-advancing-chronic-kidney-disease-management-panel?cc=MASTER), [3356](https://testdirectory.questdiagnostics.com/test/test-detail/3356/?cc=MASTER), [14961](https://testdirectory.questdiagnostics.com/test/test-detail/14961/metanephrines-fractionated-lcmsms-random-urine?cc=MASTER&p=r).
- Quest IntelliTest Manager: [37962](https://intellitestmanager.questdiagnostics.com/home/output/220069); [90106/90107 non-orderable component listing](https://intellitestmanager.questdiagnostics.com/home/output/241607).
- GitHub verification: module syntactically valid in both repositories; codes, duplicate protection, loader order, source labels, specimen requirements, required SST volume calculation and separate bag temperatures checked. `node --test` regression file provided but full browser/end-to-end smoke tests not executed.
