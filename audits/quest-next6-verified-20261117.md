# Quest additional test activation, November 17, 2026

Six remaining historical Quest reference-only entries activated in both repositories, without overriding active or blocked catalog entries. Published module: `assets/js/quest-verified-candidate-review-next6-20261117.js` loaded before `assets/js/app.js`.

| Quest code | Test | Draw | Submit | Ship | Notes |
|---|---|---|---|---|---|
| 264 | Antimony, Urine | Trace Metal-Free Plastic Container | Same original trace-metal-free urine container | Refrigerated | 3 mL preferred; 1.1 mL minimum. Received room temperature rejected. Avoid gadolinium contrast 48h. Not offered by SJC. |
| 6054 | Barium, Urine | Trace Metal-Free Plastic Container | Same original trace-metal-free urine container | Room Temperature | 1 mL preferred; 0.4 mL minimum. Quest lists room stability 30d but does not separately state transport temperature. Check receiving account; SJC/Chantilly do not offer. |
| 10287 | C3 Nephritic Factor, Serum | PLAIN Red Top (no gel) | Plastic Transport Tube containing centrifuged serum | Frozen | 1 mL serum preferred; 0.5 mL minimum. NO SST, no thaw, no pooling; Quest referral to National Jewish. |
| 17407 | Rheumatoid Factor, CSF | Original sterile leakproof Sterile cup | Dedicated sterile plastic Transport Tube | Frozen | 1.5 mL preferred; 1 mL minimum. Frozen per reference Quest referral laboratory manual, verify current acceptance. |
| 34164 | Cysticercus Antibody (IgG), ELISA, CSF | Sterile cup | Sterile plastic screw-cap Transport Tube | Refrigerated | 1 mL preferred; 0.1 mL assay minimum. Standalone ELISA, distinguish from reflex order 11790 and lab-performed Western blot 34869. |
| 34698 | Uranium, Urine | Trace Metal-Free Plastic Container | Same original trace-metal-free urine container | Room Temperature | 1 mL preferred; 0.4 mL minimum. Avoid gadolinium contrast 48h. SJC does not offer. |

## Practical guardrails

- Room-temperature, refrigerated, and frozen specimen bags are separated according to each row above; never infer shipping from laboratory stability for unverified sources.
- Urine for metals MUST be collected directly into a stocked, certified acid-washed or trace-metal-free plastic vessel. Do not silently substitute a generic `Sterile cup`.
- CSF must be collected only by qualified procedural personnel and properly labeled as CSF. For 17407, aliquot into a verified freezer-compatible Transport Tube; for 34164, refrigerate.
- Standard SST yield/grouping logic is intentionally bypassed for 10287, which explicitly rejects SST.
- Code-specific Quest service-area restrictions are included as collection notes. Adding a test to the calculator does not establish that the receiving local Quest lab offers it.
- No unsupported clinic-prepared slides, hair/nails, chemistry preservatives, or unavailable specialty kits added.

## Verification references

- [Quest 264](https://testdirectory.questdiagnostics.com/test/test-detail/264/antimony-urine?cc=MASTER&p=r)
- [Quest 6054](https://testdirectory.questdiagnostics.com/test/test-detail/6054/barium-urine?cc=MASTER&p=r)
- [Rady Children's / Quest reference 10287](https://www.rchsd.org/lab-test/c3-nephritic-factor-c3nef-10287x/)
- [Referral catalog for 17407](https://www.testmenu.com/mhslabs/TestDirectory/SiteFile?fileName=sidebar%5CREF+5+LAMR+021026.pdf)
- [Mayo / Quest performed assay 34164](https://www.mayocliniclabs.com/test-catalog/overview/75587)
- [Quest 34698](https://testdirectory.questdiagnostics.com/test/test-detail/34698/uranium-urine?cc=MASTER)

## Checks

Both repositories have identical new-bundle blob SHA, JavaScript syntax is valid, module import order is correct, six distinct codes render under standard seed catalog, duplicate status guards were exercised, per-source labels were checked, frozen rules verified. Added source test script `tests/quest-verified-candidate-review-next6-20261117.test.cjs`. Full browser/end-to-end UI regression suite has **not** been run.
