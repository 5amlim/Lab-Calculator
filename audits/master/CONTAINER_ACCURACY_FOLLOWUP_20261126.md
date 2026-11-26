# Container accuracy follow-up — 2026-11-26

Reviewed the committed inventory at a7a76744d41e685f24dc02589ed99ef43dec43a6. The inventory has 451 distinct lab/role/runtime-label entries (Labcorp 124 collect, 201 submit; Quest 50 collect, 76 submit). These are raw mapping labels, not 451 physically distinct supplies and not clinical verification. Held routes may remain visible in the raw inventory; confirm runtime hold status before treating a label as an actionable collection plan.

## Exact-code source comparisons

| Code | Finding | Disposition | Source |
| --- | --- | --- | --- |
| Labcorp 004788 | Active search code is not collection-held. Vendor specifies chilled fluoride/oxalate gray-top and a specialized perchloric-acid preparation kit; submitted material is supernatant, not routine whole blood. Published preferred/minimum are 0.5/0.2 mL, refrigerated. | Confirm clinic approval, specialized kit and SOP; no automatic substitution with ordinary gray-top or generic transport. Perchloric-acid blood processing is distinct from the expressly excluded acid-preserved urine collection workflow. No runtime change until scope is established. | https://www.labcorp.com/tests/004788/pyruvic-acid-whole-blood |
| Labcorp 071548 | Vendor permits royal blue EDTA plasma or no-additive serum routes; certified metal-free shipment vessel 111166 required. Preferred/minimum 7/0.6 mL; ambient storage. Search index identifies plasma. | Verify selected additive, certified vessel, volume and capacity against exact runtime record; do not treat serum and plasma alternatives as simultaneous draws. | https://www.labcorp.com/tests/071548/aluminum-serum-or-plasma |
| Labcorp 081162 | Vendor requires packed RBC and plasma as separate outputs from metal-free EDTA collection; preferred/minimum 3/0.5 mL each, refrigerated, received within five days. Runtime splitSubmissionContainers explicitly emits separate plasma and RBC outputs with shared source. | Preserve the distinct existing labels and non-pooling keys; verify draw yields, quantities and time limit in runtime regression before closing. | https://www.labcorp.com/tests/081162/copper-rbc-and-plasma |

## Mapping inventory exceptions to trace

- Quest raw submission mapping contains `ThinPrep vial (swab transferred immediately)` on one route. Identify exact active code and whether it is already suppressed; preserve cytology/Pap/ThinPrep exclusion. Do not remove an active record or presume an alternative route.
- Labcorp raw mapping contains four acidified urine aliquot routes and one preserved Monovette route. Five specific preserved-urine orders already have runtime holds; reconcile remaining raw mappings against hold codes and exact source rather than assuming all raw labels are actionable.
- Acid-washed/metal-free vessels, ascorbic-acid blood collection and acid-preserved urine are distinct. No broad substring-based exclusion or renaming.
- The collection/submission count register contains 41 high-volume entries. Resolve remaining approved vial capacity and exact aliquot requirements independently of collection counts.

This follow-up is a partial evidence/triage note, not a regenerated clinical ledger. No records are counted as newly fully verified; no clinical runtime change or active-test removal was made in this note. Keep 8477 Transport Tube and 16983 two 5 mL transport tubes, all other naming/grouping/pooling rules, and existing holds intact.

## ThinPrep exception resolved at exact-code level

Quest 14263 is the identified active route. The exact directory confirms both supported self-collection devices require ThinPrep and states the minimum as 1.5 mL. The code remains active/searchable with a collection-review hold, suppression of automatic collection/shipment counts, and no automatic crosswalk mapping. No substitute container was assumed. Source: https://testdirectory.questdiagnostics.com/test/test-detail/14263/hpv-dna-16-18-other-high-risk-pcr-vaginal-self-collected?cc=MASTER

