# Lab Calculator repository instructions

## Crosswalk changes: mandatory preflight

For every Quest/LabCorp equivalent expansion, correction, or converter UI change:

- Inspect the existing crosswalk, workbook overrides, active search indexes and regression tests together. Keep test codes as strings, including leading zeros.
- Preserve established collection/transport, pooling, naming, exclusions and regional rules. Candidate links are informational, not verified clinical equivalents. Do not promote review-only or protected mismatches without documented evidence for the exact analyte, specimen, method, panel/order scope and relevant regional constraints.
- Keep code and tests synchronized in the same change. Update historical expected mappings only when an intentional, evidence-supported mapping change requires it; retain explicit protections and add coverage for the replacement. Never delete, skip or weaken tests merely to get a passing build.
- If converter state or helper functions change, update the converter regression fixture in the same change and test both directions, unmatched rows, explicit multiple selection, aligned source/destination rows, manual entries and cart behavior.
- Before pushing to main or merging, run the complete crosswalk preflight from the repository root with Node 22:

```sh
node --check labcorp-crosswalk-ui.js
node --check labcorp-crosswalk-data.js
node --check labcorp-quest-workbook-crosswalk-overrides.js
node --test tests/full-quest-labcorp-crosswalk-20261121.test.cjs tests/quest-labcorp-crosswalk-second-sweep-20261121.test.cjs tests/quest-labcorp-crosswalk-sweep-20261121.test.cjs
```

- Require zero failures and zero skipped tests. If local execution is unavailable, validate on a separate branch via the crosswalk pull request workflow before merging; do not treat a source-only inspection as passing CI. Check the workflow on the exact final commit and report its result.
