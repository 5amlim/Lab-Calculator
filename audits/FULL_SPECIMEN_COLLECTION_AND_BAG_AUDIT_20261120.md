# Full collection, original-container and shipping-bag audit

Reviewed: November 20, 2026 (Pacific time)

## Scope
This audit mechanically executes the current Quest and Labcorp calculators' full live active catalog rows through their specimen collection and shipping planners. It does not independently reverify every source test directory entry or confirm that every specialty collection device is stocked.

| Laboratory | Live active rows | Individual-order audit | Mixed cart checks |
| --- | ---: | --- | ---: |
| Quest | 3,314 | Source count, submission count, required transfers, physical bags, print reconciliation | 180 |
| Labcorp | 5,719 | Source count, submission count, required transfers, physical bags, print reconciliation | 180 |
| **Total** | **9,033** | **All 9,033** | **360** |

Specimens covered: serum, plasma, whole blood, RBCs, urine, stool, swabs, cerebrospinal fluid, saliva, synovial and other body fluids, and catalog specialty specimens. Testing covers duration, concentration, and volume versus physical quantity; original versus transfer containers; required dedicated/timed samples; specimen identity, source pooling, and temperature-specific shipping groups.

## Confirmed calculation defects corrected

1. **12/24-hour timed-urine collection duration mistaken for container quantity.** The stock label "24 Hour Urine Container" must not create 24 jugs. A 12-hour collection using that stock is still a separate 12-hour protocol.
2. **"Submit 10 mL aliquot" mistaken for ten submitted containers.** The quantity parser ignores mL amounts and preserves explicitly separate aliquots.
3. **"Use 6N HCl-preserved urine tube" mistaken for six collection tubes.** Verified Labcorp 316203 displayed six source cups instead of one. Both calculators now recognize reagent normality/concentration as a measurement rather than a vessel count. The same rule also protects transport container labels.
4. **Lavender EDTA blood and body-fluid sources collapsed into one card.** The same cap color does not permit one filled tube to carry unrelated biological specimens. The pooling estimator and physical collection cards now partition source types and the printed groups retain the distinction.

## After-fix mechanical results

* **0** active-order invalid/zero container counts, unhandled planner exceptions, or source/submission counts erroneously inferred from the protected unit/duration patterns.
* **0** differences between per-order physical shipping counts and printed per-bag counts.
* **0** mixed-card count reconciliation failures, specimen matrix collisions, or crashes in the 360 mixed-cart cases.
* **82 passed, 0 failed** in the expanded CI checks, including prior container grouping, source-volume, original-container, timed-collection, transfer, bag, and print regressions.
* No clinical route, device stock item, source-specific quantity, or special preservative was silently changed solely because an automated heuristic flagged it.

## Not yet independently verified against current receiving-lab instructions

The audit identifies **17 Quest and 27 Labcorp orders** for which the number of source tubes is more than twice the number of shipped containers. These are **review candidates, not 44 confirmed bugs**. Most reflect larger amounts of serum/plasma and volume-derived source-tube planning, or intentionally multiple original draws into one processed submission. Examples:

* Quest 16983: preferred 10 mL plasma, multiple EDTA collection tubes and one listed transport destination.
* Quest 36378: an explicit three-SST requirement, separate from ordinary pooling assumptions.
* Labcorp 120089: three EDTA whole-blood draws feed an ascorbic-acid-containing transport tube.
* Labcorp 502690: 18.8 mL preferred serum and multiple SST source draws.

Confirmation of large specimen volume, actual collection tube yield, and destination-vial capacity must come from the current performing-laboratory instructions and stocked container dimensions. No universal vial capacity has been assumed.

**Specialty exceptions requiring workflow approval before use:**

* **Labcorp 316203** (random urinary catecholamines): current Labcorp instructions call for an acid-preserved Monovette/6N HCl-compatible pathway. Although its quantity calculation is fixed, confirm the required collection and acid-handling supplies are actually available before treating it as performable.
* **Labcorp 501533** (fractionated urine metanephrines, specialty): the direct specialty listing requires 6N HCl-preserved 24-hour urine and frozen submission; the calculator's existing CDOS-derived route lists unpreserved/refrigerated. The calculator already leaves this collection separate and displays a verification warning. The clinical route needs confirmation before changing its specimen requirements.

## Persistent automated checks
- `tests/full-catalog-container-math-audit-20261120.test.cjs` audits all live active records and deterministic mixed carts across both laboratories.
- `tests/specimen-quantity-parsing-20261120.test.cjs` checks stock-capacity, reagent concentration, timed urine, CSF, stool, serum, plasma and whole-blood source-versus-transfer scenarios.
- `tests/labcorp-timed-urine-bag-reconciliation-20261120.test.cjs` audits the original seven-test urine example.
- `.github/workflows/catalog-discoverability-audit.yml` runs these alongside source-specific, grouping, specimen volume and print regressions.

The test suite verifies internal calculator consistency, not complete scientific verification of each of the thousands of test records. Where the catalog itself states a wrong protocol, that still requires a source-specific clinical audit.
