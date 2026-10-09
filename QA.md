# QA v10.55

## Urine collection-type audit

- Catalog urine records reviewed: 192
- Classification now uses test name/specimen/draw/preferred/minimum fields for 24-hour, timed, and first-morning requirements.
- Free-text rejection/timing notes no longer drive those classifications.
- Expected categories after audit:
  - Random urine: 184
  - First-catch urine: 2
  - First-morning urine: 2
  - Timed urine: 1
  - 24-hour urine: 3
  - Note: counts include blocked/generic guide records where applicable.

### Regression cases
- 395 Culture, Urine, Routine: Random urine (Quest explicitly rejects 24-hour urine).
- 91684 Culture, Urine, Prenatal, with GBS Susceptibilities: Random urine.
- 5463 / 6448 / 7048 urinalysis records: Random urine; “24 hours” in stability/instructions does not change collection type.
- 17674 Albumin, Random Urine without Creatinine: Random urine; “within 24 hours” context does not change collection type.
- 6301 Delta Aminolevulinic Acid, Random Urine: Random urine; “do not use first morning” does not change collection type.
- 8525 Protein Electrophoresis and Total Protein, Random Urine: Random urine even though first morning is preferred when possible.
- 11363 and 13701 urogenital Aptima urine workflows: First-catch urine.
- 396 and 36614: First-morning urine.
- 92739: Timed urine.
- 14962: 24-hour urine.

### 24-hour labeling
True 24-hour urine submissions retain: `24h urine · Total volume: ____ mL · Start: ____ · End: ____`.
