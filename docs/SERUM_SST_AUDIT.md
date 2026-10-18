# Serum collection and SST pooling audit

Date: 2026-10-18

## Scope

Reviewed all 2,692 bundled tests in the Lab Collection Calculator, including 1,730 entries with specimen type `Serum`. This is a **catalog-based review of the recorded requirements**, not a live confirmation of every individual Quest test page. The receiving laboratory's current test instructions take precedence.

## Changes

- 631 serum-only tests previously defaulted to `Red Top` now default to `SST / Gold`, because their recorded requirements do not explicitly direct a red-top draw, forbid gel/SST, require a special collection tube, or identify a multi-timepoint collection. Existing submission containers, transport temperatures, processing instructions, and specimen volumes were left unchanged.
- Those 631 entries now join the calculator's existing Gold/Tiger SST source pooling calculations when the processing, specimen volume, destination, and bag temperature rules allow. **Changing the draw source does not authorize mixing serum from different patients, time points, or incompatible tests.**
- 13 existing multi-timepoint SST assays now have explicit collection and submission tube counts. Each timed specimen must remain its own labeled tube and must not be pooled across collection times.
- Of the 950 serum tests originally defaulting to red-top collection, 319 continue to use red-top due to recorded gel restrictions, red-top wording, other special collection rules, or multi-timepoint handling pending individual review.
- The 28 royal-blue serum tests and 2 `Do Not Collect` entries were not changed. Existing tests already using SST retained their requirements, apart from the 13 timed-count corrections.

## Examples

| Test code | Test | Audit action |
|---|---|---|
| 206 | Acetylcholine Receptor Binding Antibody | SST default, serum transport tube unchanged |
| 231 | Alkaline Phosphatase Isoenzymes | SST default, serum transport tube unchanged |
| 257 | Glomerular Basement Membrane Antibody (IgG) | SST default, serum transport tube unchanged |
| 683 | Angiotensin-1-Converting Enzyme | SST default, retain existing prompt serum-separation instructions |
| 201 | Acetaminophen | Keep Red Top, SST explicitly listed as unacceptable |
| 297 | C1 Esterase Inhibitor, Functional | Keep Red Top, no gel required |
| 345 | Cobalt | Keep Royal Blue No Additive, trace-metal collection |
| 6691 | Insulin Response to Glucose, 6 Specimens | Keep separate timed collection, not eligible for shared SST pooling in this pass |
| 6738 | Cortisol, 2 Specimens | Retain SST, require 2 separate collection/submission tubes |
| 7469 | Growth Hormone, 9 Specimens | Retain SST, require 9 separate collection/submission tubes |

## Handling rules

- An SST is a **collection tube**, not an automatic submission container. Continue to separate, aliquot, freeze, refrigerate, shield from light, or submit in the original tube exactly as the test record requires. Frozen serum is not shipped inside an SST.
- Compatible SST sources are pooled only according to the calculator's existing Gold (assumed 2.5 mL usable serum) or Tiger (assumed 4 mL usable serum) planning volumes. These estimates are not guaranteed yields.
- Do not override a specific red-top-only, no-gel, therapeutic drug, trace-metal, microtainer, timed-draw, dedicated-tube, or special specimen requirement based on the generic serum rule.
- STAT and routine bags remain separate. Transport temperature and submission container grouping are unchanged.
- Browser-level edits to built-in tests are retained by the application and can override newly published catalog defaults. Manually added tests are not modified.

## Review status

The changes were checked for catalog integrity, strict exemption rules, and unchanged transport/temperature fields. The full converted and excluded code list is recorded in the audit details CSV generated with this release. Browser-based visual smoke testing was unavailable in the execution environment; verify the live printout with a mixed order before relying on revised collection instructions clinically.

Reference: https://www.questdiagnostics.com/links/test/am/specimen-handling/specimen-collection
