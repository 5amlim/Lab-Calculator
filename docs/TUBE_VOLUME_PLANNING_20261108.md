# Source-tube volume calculation audit (2026-11-08)

Source-tube counts are planning estimates based on the **preferred specimen volume** when it is numeric. For standard 4 mL light-blue sodium citrate, green sodium/lithium heparin, and lavender EDTA tubes, processed plasma yield is estimated at 1.6 mL (4 mL / 2.5). For whole blood the assumed draw capacity is 4 mL. This is a local planning assumption, not a specimen guarantee. Red-top and SST policies otherwise retain their existing yield assumptions.

The calculator no longer caps the contribution of any single test at one tube. A test that needs more than one source tube receives a separate collection allocation. Compatible small-volume assays can share source tubes only when their collection, destination, priority, and temperature group permit. The original-tube submission count is increased along with source tubes when necessary. Frozen plasma transport aliquots remain independent of source-tube counts.

**Explicit lab instructions override the estimate.** Quest 19790 and 15540 require four separate citrate source tubes and four separate frozen plasma transport vials, not three source tubes. Quest 33743 specifies five distinct citrate collections, each processed separately. Quest 16983 explicitly prescribes five standard EDTA collection tubes (or two 10 mL EDTA tubes), which must not be reduced by generic volume rules. QuantiFERON 36970 uses one 6 mL no-gel lithium-heparin tube; T-SPOT 37737 uses the specified Greiner 9 mL tube; 38287 requires two 5 mL sodium-heparin tubes; 7197 requires one dedicated 5 mL lavender tube. LabCorp 001917 and 120089 preserve their distinct two- and three-tube collection instructions respectively.

**Important:** The source tube may require a fixed fill ratio, full draw, different nominal size, or original-tube submission. If the calculator estimates multiple standard 4 mL original tubes for a test whose instructions specify a larger single tube, verify that the receiving laboratory will accept multiple originals before collecting. The estimated number is not permission to split a required dedicated original or to change tube additives. Double-spin/platelet-poor-plasma requirements and separate sample timepoints remain mandatory.

Quest's general specimen collection guidance: https://www.questdiagnostics.com/healthcare-professionals/test-directory/specimen-handling/specimen-collection

Regression tests: tests/source-tube-volume-regression.test.cjs
Full Quest code-level before/after results: docs/QUEST_TUBE_COUNT_CHANGES_20261108.csv
