# Collection vs transport audit (v10.88)

Scope: scanned all 2,680 built-in test records and exercised the draw-container,
transport-container, collection-plan, and submission-plan functions for each.
Individually reviewed the 192 records with urine specimen type.

Results:
- All 192 published urine records already identify their intended source collection
  container as Sterile Urine Cup, 24-Hour Urine Container, or Do Not Collect.
- Code 395 (Routine Urine Culture), 91684 (Prenatal Urine Culture), and 16174
  (AspirinWorks 11-Dehydrothromboxane B2) collect urine in a sterile cup and
  transfer to a Gray-Top Urine Culture Preservative Tube.
- UA entries including 5463, 3020, 288, and 7048 collect in a sterile cup first,
  then use the designated red/yellow UA tube. Code 3020 requires two types of
  downstream submission tubes, as already modeled in the calculator.
- Code 14962 and the general 24-hour urine instruction entry retain their
  24-hour collection containers. Code 1635 remains Do Not Collect.
- The v10.87 guard covered only one exact spelling of gray-top urine culture
  transport tube; it did not cover alternate urine-culture names or UA
  preservative tube overrides. v10.88 additionally repairs those recognizable
  erroneous collection-container entries when loading saved browser edits.
- Swab transport media, stool fixative vials, blood tubes, and non-urine
  specialist containers are not changed by the normalization rule.

Testing: `node qa_urine_collection_audit.js` exercised all 2,680 record print
functions and verified normalized urine test examples, saved-override scenarios,
collection pooling into a cup, and 24-hour/stool/blood exceptions.

This is an internal catalog/workflow consistency audit, not a fresh individual
verification of every test's current reference-laboratory requirements. For
unusual specimens and updated test-directory instructions, follow the current
performing-lab guidance.
