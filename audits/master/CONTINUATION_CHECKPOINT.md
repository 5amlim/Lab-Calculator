# PR 7 continuation checkpoint, November 26, 2026

- Original baseline: `b81f79958661971bad3a6799d6a0465a7525156e`.
- Starting PR head: `1ef5d140f9f6febbc81f6b3824d42dd3d91ec9b3`, 201 commits beyond the original baseline.
- Protection commit: `86111caf33cbc543a5422f8af72f5bbd813aaa52`.
- Scope: 10,430 total records, including 3,829 Quest and 6,601 Labcorp. The active container scope is 9,330 records (3,315 Quest, 6,015 Labcorp), including the existing uncoded Quest reference hold. Search contains 9,329 orderable codes.
- Active container structural checks: 9,330 of 9,330, including 43 correctly held orders. Zero active records lost against either baseline. All 9,330 remain pending complete fingerprint-bound clinical verification.
- Active container evidence categories: 486 partial, 17 source unavailable, 43 held, and 8,784 pending. Partial evidence coverage is 486/9,330 (5.21%). Full container verification is 0/9,330. These mutually exclusive counts use the container tracker, which classifies held records first. The broader catalog ledger uses different statuses and includes inactive records.
- The custom rules registry includes 35 entries. The 31 starting rule entries are unchanged, and four existing Quest overrides were registered. Existing and new rule checks run in the Node suite. CI enforces the starting rule fingerprints and active record identities; required branch protection has not been verified.
- The archived 78-test Quest SoCal Common Labs Gold SST selection was recovered from the November 26 PDF and tested against the original and continuation builds. Both produced 46 collection containers and three routine bags with 38 ambient, nine refrigerated, and five frozen submissions. The fixture checks quantities and availability. Print pagination, visual layout, per-route labels, instructions, and TAT still need an independent comparison for this continuation.
- This batch added evidence to three previously reviewed Labcorp records and completed missing stability text for 505725. That correction does not change frozen shipment on dry ice. 724344 confirms two specimen routes, pending local urine vessel and pH workflow. 829030 confirms frozen shipment and direct-vessel examples, pending local sterile cup acceptance. The three updates add field evidence without increasing unique partial record coverage.
- 833848, 816477, and 827969 retain prior partial findings. Targeted detail lookups did not return usable content. Confirm acid-washed stock, the CSF vessel, and the initial collection device respectively. Quest 16984 was verified independently against its exact public page and remains in the missing-order receiving-account queue. The 16983 route is unchanged.
- Resume container verification with the six Labcorp orders above, starting with dry-ice capability for 505725 and local vessel confirmation for 829030. Request exact receiving-account evidence for the open routes. Next, use `CONTAINER_AUDIT_ORDERS.csv` and `CLINICAL_FIELD_REVIEW_QUEUE.csv` to resume the unreviewed active records. The remaining clinical categories, conversion expansion and application audits stay open. Production clearance is pending.

## Quest 16984 missing-order evidence

The [exact Quest 16984 page](https://testdirectory.questdiagnostics.com/test/test-detail/16984/?cc=MASTER)
was checked November 26, 2026. It lists New York patient testing with frozen
EDTA plasma, 10 mL preferred and 5 mL minimum. Collect in two 10 mL lavender
EDTA tubes or five standard lavender EDTA tubes. Separate and combine plasma
and submit in one 10 mL pour-off tube, or two 5 mL pour-offs if the 10 mL tube
is unavailable. Frozen stability is 28 days. Ambient or refrigerated receipt
is unacceptable. The 16984 page does not specify the four-hour processing
deadline shown for 16983. Confirm processing timing, local stock and account
availability before adding a runtime route.

## Labcorp follow-up batch

Eight previously unreviewed active orders now have partial exact-code evidence:
006213, 008185, 017996, 046557, 054494, 070038, 070195, and 071255.
Updated the stability display for 070038 and 070195. No route, quantity,
stock label, or active status changed. Database integrity passed against
both baselines and all 479 regression tests passed.

Local verification remains open for tube count on 006213, refrigerated
centrifugation and immediate freezing on 046557, and validated deep-freeze
or dry ice on 054494. The currently displayed handling notes already list
the required conditions for the latter two. Exact detail endpoints for
833848, 816477, and 827969 remained inaccessible. Their earlier partial
findings remain in the ledger.

Resume with the remaining pending higher-risk routes and exact public
Labcorp pages for 008003, 008201, 008565, 008573, 008900, and 008904.
Use the existing route queue and preserve local collection exclusions.

## Approved collection-review quantity change

The user explicitly approved provisional collection and shipment quantities
for every held test code, including vendor-discontinued orders. Cart and
print retain the review warnings. Counts use the stored route and do not
establish permission to collect or ship. Quest XXX remains an uncoded
reference and produces no quantities. STAT and automatic conversion
restrictions remain in effect.
