# Quest 14-test metal and CSF expansion

**Published:** November 17, 2026. Source and published repositories updated: `5amlim/Lab-Calculator` and `5amlim/Quest-Calculator-Test`. Module: `assets/js/quest-verified-metal-neuro-batch14-20261117.js`, loaded before calculator initialization. Existing active and blocked records are never overwritten.

All 14 candidates originated from the November 16 reference-only Quest audit and were checked against Quest's code-specific Test Directory collection instructions. No LabCorp entries changed.

| Quest code | Test | Collection | Submit | Transport | Safeguard |
|---|---|---|---|---|---|
| `494` | Gold, Urine | Random urine | Original trace-metal-free container | Frozen | Not SJC; received RT/refrigerated rejected |
| `6325` | Tin Total, Urine | Random urine | Original trace-metal-free container | Room temperature | Not SJC/Chantilly |
| `8330` | Titanium, Urine | Random urine | Original trace-metal-free container | Frozen | Not SJC/Chantilly; room/refrigerated rejected |
| `11042` | Silicon, Urine | Random urine | Original trace-metal-free container | Room temperature | Not SJC/Chantilly; glass rejected |
| `26506` | Strontium, Urine | Random urine | Original trace-metal-free container | Room temperature | Not SJC |
| `30290` | Silver, Urine | Random urine | Original trace-metal-free container, FULL light protection | Room temperature | Not SJC/Chantilly; light exposure rejected |
| `17515` | Iron, 24-Hour Urine | 24-hour additive-free urine jug | Separate 10 mL plain plastic Transport Tube | Room temperature | Record total 24-hour volume on tube and requisition; not SJC |
| `14761` | Cobalt, 24-Hour Urine | Certified metal-free 24-hour jug | Separate metal-free plastic aliquot container | Refrigerated | Not SJC |
| `35386` | Heavy Metals Panel with Cadmium, 24-Hour Urine | Certified metal-free 24-hour jug | Separate metal-free plastic aliquot container | Refrigerated | Avoid seafood 48h; not SJC |
| `36438` | Heavy Metals Panel, 24-Hour Urine | Certified metal-free 24-hour jug | Separate metal-free plastic aliquot container | Refrigerated | Avoid seafood 48h; not SJC |
| `37081` | Comprehensive Toxic Metal Panel, 24-Hour Urine | Certified metal-free 24-hour jug | Separate metal-free plastic aliquot container | Refrigerated | NOT AVAILABLE for NY; avoid seafood 48h; not SJC |
| `37124` | Thallium, 24-Hour Urine | Certified metal-free 24-hour jug | Separate metal-free plastic aliquot container | Refrigerated | Non-NY patients only; not SJC |
| `12598` | Encephalitis Antibody Panel, CSF | Original Sterile cup | Same original Sterile cup | Refrigerated | NOT AVAILABLE for NY; procedural CSF only |
| `12600` | Meningoencephalitis (Encephalitis) Panel, CSF | Original Sterile cup | Same original Sterile cup | Refrigerated | NOT AVAILABLE for NY; procedural CSF only |

## Critical collection logic

- **Random urine heavy metals**: original acid-washed or certified trace-metal-free plastic vessel, no ordinary `Sterile cup` substitution. Titanium and gold must arrive frozen. Silver must remain protected from light, including the entire trip.
- **24-hour metal panels**: a dedicated CERTIFIED TRACE METAL-FREE 24-hour urine collection jug is required, not merely a standard 24-hour jug. Collect the full 24 hours, mix and record the full collection volume/duration, and send a 7 mL aliquot (minimum 3 mL) in a separate certified trace-metal-free submission container refrigerated. If either supply is not available, do NOT collect. The structured `drawContainer` is `24-Hour Urine Container` for existing category/badge consistency; the restriction appears in each special instruction.
- **Iron 24-hour urine**: no preservative, standard 24-hour container and separate 10 mL plain plastic aliquot `Transport Tube` at room temperature. Keep distinct from heavy-metal samples with special containers.
- **CSF**: procedural clinician collects into an ORIGINAL sterile leakproof `Sterile cup` and submits the same container refrigerated. No on-site slide preparation, centrifugation or transfer.
- **Regions**: Quest documents explicit NY patient exclusion on codes 37081, 37124, 12598 and 12600. The calculator includes these in prominent specimen instructions; it does not currently enforce those blocks based on a selected market. Staff must check regional ordering before collecting. Many metal codes are not performed by SJC, so receiving-account acceptance is still necessary.
- Search aliases, clinical category tags, source URLs and specimen labels are included. No unnecessary date/time label text added. Physical collection type and submission type remain separate.
- The Quest tests were activated as directory workflows subject to special stock and service area confirmation; their addition does **not** imply every clinic is stocked for metal-free urine collection or that every local Quest account offers them.

## Verified reference pages

- `494`: https://testdirectory.questdiagnostics.com/test/test-detail/494/gold-urine?cc=MASTER
- `6325`: https://testdirectory.questdiagnostics.com/test/test-detail/6325/tin-total-urine?cc=MASTER
- `8330`: https://testdirectory.questdiagnostics.com/test/test-detail/8330/titanium-urine?cc=MASTER
- `11042`: https://testdirectory.questdiagnostics.com/test/test-detail/11042/silicon-urine?cc=MASTER
- `26506`: https://testdirectory.questdiagnostics.com/test/test-detail/26506/?cc=MASTER
- `30290`: https://testdirectory.questdiagnostics.com/test/test-detail/30290/silver-urine?cc=MASTER
- `17515`: https://testdirectory.questdiagnostics.com/test/test-detail/17515/iron-24-hour-urine?cc=MASTER
- `14761`: https://testdirectory.questdiagnostics.com/test/test-detail/14761/cobalt-24-hour-urine?cc=MASTER
- `35386`: https://testdirectory.questdiagnostics.com/test/test-detail/35386/heavy-metals-panel-with-cadmium-24-hour-urine?cc=MASTER
- `36438`: https://testdirectory.questdiagnostics.com/test/test-detail/36438/heavy-metals-panel-24-hour-urine?cc=MASTER
- `37081`: https://testdirectory.questdiagnostics.com/test/test-detail/37081/comprehensive-toxic-metal-panel-24-hour-urine?cc=MASTER
- `37124`: https://testdirectory.questdiagnostics.com/test/test-detail/37124/thallium-24-hour-urine?cc=MASTER
- `12598`: https://testdirectory.questdiagnostics.com/test/test-detail/12598/encephalitis-antibody-panel-csf?cc=MASTER
- `12600`: https://testdirectory.questdiagnostics.com/test/test-detail/12600/meningoencephalitis-encephalitis-panel-csf?cc=MASTER

## Regression checks

The 14-entry module is syntactically valid in both repositories, blob SHAs match, duplicate protections pass, script load order precedes `app.js`, distinct original vs submit containers, frozen/light-protected routes, sterile CSF, NY exclusion wording and aliases were checked. Regression test file: `tests/quest-verified-metal-neuro-batch14-20261117.test.cjs`. The full automated browser suite has not been executed.
