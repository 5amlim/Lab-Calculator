# Bulk clinical source screening

One public client print-catalog retrieval is compared against every active Labcorp exact code. Results are uploaded with the existing integrity workflow. The client listing is not the Sollis account directory. No catalog change, clinical approval, or clinical evidence ledger promotion happens automatically. Complex container choices, multiple required routes, conflicting source rows, and conditional temperatures remain review items. Counts reflect the exact-code source screen only; full clinical verification still requires official detail, receiving-account acceptance and actual route/volume/processing review. Network and parser failures are explicitly reported instead of being counted as success. The local runner can reuse a saved HTML snapshot with --html.

Reports: LABCORP_BULK_CLIENT_SCREEN.json, LABCORP_BULK_CLIENT_SCREEN.csv. Sort possible differences first and confirm on the exact official detail page before making a correction. All current stock names and forced overrides are preserved.

## Manual source-screen checkpoint

29 additional active exact-code client listing rows compared to prior CI normalized routes; the source is not the clinic receiving account. No clinical approval or runtime changes. The source-to-runtime notes are recorded individually in FIELD_EVIDENCE.json. Priority confirmations: 505725 dry ice, 833848 acid-washed vessel certification, 829030/816477 sterile vessel geometry, 827969 initial collection, and 724344 dual-specimen handling. Source: https://cdos.halfpenny.com/labcorp/ksb/Home/PrintCatalog
