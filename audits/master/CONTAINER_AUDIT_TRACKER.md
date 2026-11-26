# Dedicated container audit

Run `node --test tests/full-catalog-container-math-audit-20261120.test.cjs` to generate the container-only tracker. Set `CONTAINER_AUDIT_OUT` to choose the output directory. CI automatically writes to its existing calculator-database-health artifact directory. Local default is audits/container-generated (ignored by Git).

The denominator is every active normalized record, including held orders. Inactive/reference-only records are outside the active clinical scope. Each order has a route fingerprint, structural outcome, clinical evidence outcome, collection/submission routes, physical labels/counts, and unresolved risks. Alternate containers and additional routes are inventoried. The current run uses default stock mode; existing regression tests separately cover stock toggles and mixed carts. The script makes no runtime modifications.

- CONTAINER_AUDIT_PROGRESS.json: exact counts, percentages and limitations.
- CONTAINER_AUDIT_ORDERS.csv: sortable order-level work queue.
- CONTAINER_AUDIT_DETAILS.json: route-level evidence and planner results.
- CONTAINER_AUDIT_GROUPS.json: grouped mapping signatures to accelerate review.

Structural pass means no detected review condition or planner failure, or correct suppression of a held order. It does not establish clinical correctness. Clinical verification is counted only with a matching fingerprint and all required dimensions documented in CONTAINER_ROUTE_VERIFICATION.json: source URL(s), reviewer, date, and field list. Existing field evidence is partial only; source-unavailable and held are not verified. A changed fingerprint invalidates prior approval. No review completion is fabricated.

Clinical ledger key: lab:code:record-id. Each entry requires fingerprint, reviewer, date, sources (array of exact-code source URLs), and fields (array of collection, submission, specimen/additive, processing, temperature, counts/capacity, alternatives/additional routes, regional acceptance). Record local capacity/receiving account evidence in the review record before approval. Do not bulk-approve groups solely because their mapping signature matches. Use groups to prioritize exact-code source verification. Do not remove active tests or change custom names/pooling/grouping.
