# v11.08 Print-label and catalog QA

## Label duplication

- Reviewed the print-label generation logic across the entire catalog, including derived specimen labels and explicit `specialLabeling` values.
- 187 test records had nonempty `specialLabeling` entries in this version.
- 174 redundant derived/explicit source-label combinations were suppressed by the new comparison logic.
- No duplicated LABEL segments remained in the catalog-wide single-test check.
- Separate instructions such as patient identifiers, collection date/time, and explicit special handling continue to appear.
- Specifically checked #22 Activated Protein C-Resistance and other citrate/platelet-poor plasma tests.

## Test additions

Four new code-specific records: 213, 6921, 37355, 39165. Each sourced from Quest's official Test Directory and described in `QUEST_NEW_TESTS_v11.08.md`.

- Original catalog entries: 2,677
- New catalog entries: 4
- Total catalog entries: 2,681
- Duplicate test codes: 0
- Individual print-plan generation errors across all active tests: 0
- Individual print plans with missing submission cards: 0

## Caveats

- Static/programmatic verification of the print-plan functions was completed. Full end-to-end visual browser verification was unavailable in this environment.
- Quest code availability varies by service area/account; official directory pages are not live account-orderability confirmation.
- Specialized collection kits and refrigerated centrifuge-only tests were excluded without confirmation of supplies/equipment.
- Existing collection pooling formulas were not modified.
