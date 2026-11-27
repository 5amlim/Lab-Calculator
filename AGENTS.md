# Quest and Labcorp calculator audit

Use the existing draft PR #7 and branch `audit/quest-labcorp-master` for the master audit.
The original catalog comparison starts at `b81f79958661971bad3a6799d6a0465a7525156e`.
The continuation checkpoint is `1ef5d140f9f6febbc81f6b3824d42dd3d91ec9b3`.

The [protected rules registry](audits/master/CUSTOM_RULES_REGISTRY.json) records
established calculator behavior and its tests. Preserve stock names, badges,
grouping, capacity, pooling, transfers, search, cart and print behavior.
Preserve every active order and exact-code cart entry. Keep unresolved orders
active and use the existing collection-review workflow where appropriate.
Changing a protected rule requires explicit user approval with the rule ID,
affected codes, source, expected behavior and regression impact documented.

Use the official exact-code directory for clinical requirements. Document
disagreements in the [conflict ledger](audits/master/CLINICAL_CONFLICTS_REQUIRING_REVIEW.csv)
and record field-level evidence in [FIELD_EVIDENCE.json](audits/master/FIELD_EVIDENCE.json).
Use the fingerprint-bound route ledger to record complete verification only
when source, local stock and receiving-account requirements are established.

Run the full Node suite and the database integrity workflow commands before
pushing an audit batch. Publish generated indexes with source updates when
the index content changes. Keep the draft PR open for verification and track
structural results, partial evidence and complete verification independently.
