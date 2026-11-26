# Crosswalk audit — 2026-11-25

Structural coverage: 3314 active Quest and 6015 active Labcorp orders. 6 additional directory-supported candidates; 59 added review-only relationships, including 57 across 19 respiratory allergy regions. No clinical equivalence approval. See JSON for detailed flags, evidence notes and limitations; CSV for status of every active order.

## Evidence sources
- Quest IntelliTest Manager: https://intellitestmanager.questdiagnostics.com/
- Quest test directory: https://testdirectory.questdiagnostics.com/
- Labcorp test menu and public result LOINCs: https://www.labcorp.com/tests
- Labcorp client test directory: https://cdos.halfpenny.com/

## Next step
Obtain current licensed order-to-result mapping exports from each vendor. Normalize into the documented input format and run the review-only importer. Result signatures must be verified complete against the actual order; matching signatures alone are insufficient. No automatic promotion.
