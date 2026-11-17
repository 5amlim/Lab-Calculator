# Non-blood specimen collection and submission audit
Date: 2026-11-17
Scope: Quest and Labcorp calculator test catalogs, print-bag renderer, collection source, transport media names and test-specific submission containers.

## Root cause and fix
The generic transfer-container display branch in assets/js/app.js and labcorp-app.js used the specimen type to render a label such as "Stool Transport Tube" even when the canonical record named a specialty transport vial. This is a display error, not an error in the Quest 8625 directory record. For tests whose required transport media is explicitly named, the submitted-container label now retains that actual name. Ordinary generic Transport Tube aliases are unchanged.

The collection record, source sterile cup and preserved/unpreserved transport requirements were not changed. The source collection and destination submission remain separate concepts. The printout uses the same submission plan as the cart and transfer handling rules; container icons continue to follow the stock-kit classification.

## Specific cases confirmed by live rendering-function checks

| Lab | Code(s) | Collection | Submission / result |
| --- | --- | --- | --- |
| Quest | 8625, 681, 3930, 3562 | Sterile cup | Total-Fix® Transport Vial, with transfer |
| Quest | 32114 | Sterile cup | Cary-Blair Stool Culture Transport Vial, with transfer |
| Quest | 10553 | Dual Throat Swab | Amies Liquid Transport Dual Swab, original kit / no transfer |
| Labcorp | 008169 | Amies Gel Bacterial Swab Transport | Same original kit / no transfer |
| Labcorp | 008623 | Sterile cup | Pink Formalin O&P Vial AND Gray PVA O&P Vial, two separate submissions |
| Labcorp | 180935 | Sterile cup | Stool Culture Transport (Cary Blair / Para-Pak Orange) |
| Labcorp | 183988 | Sterile cup | Sterile Screw-cap Stool Vial (Para-Pak white clean) |
| Labcorp | 123010 | Sterile cup | Clean screw-capped plastic vial (no preservative) |
| Labcorp | 120980 | Sterile cup | Amber Plastic Urine Transport Tube (23598), No Preservative |
| Labcorp | 183194 | Sterile cup | Aptima Urine Transport |

The original source vial is still used for direct swab kits; a false transfer arrow was not introduced. A paired Quest 8625/3562 test order retained two separately submitted Total-Fix vials.

## Full catalog scan and rendering checks

- Quest: All 2,685 active base records were available for review; the 280 active base entries classified as non-blood were rendered individually. Sixty-seven Quest supplementary scripts were then inspected in batches with their base records. No additional missing printed container label or lost Total-Fix/Cary-Blair media was found after correcting a harmless SST/Gold display alias.
- Labcorp: The base and 76 supplementary catalog scripts were inspected in batches. Every active non-blood record in the loaded batch was passed through submission planning and the HTML print renderer. No additional missing container labels or lost Total-Fix/Cary-Blair names were found.
- Checks also covered preserving a standard source Sterile cup, named swab kits, and multi-vial O&P submission counts, while leaving serum/plasma pooling, priority separation and temperature-bag grouping unchanged.
- Regression coverage added at tests/nonblood-transport-media-audit-20261117.test.cjs. The browser-independent renderer was executed against representative current records; full Node suite and physical printed-page/browser QA were not run.

## Official reference spot checks
- Quest 8625: https://testdirectory.questdiagnostics.com/test/test-detail/8625/giardia-antigen-eia-stool?cc=MASTER
- Quest 10018: https://testdirectory.questdiagnostics.com/test/test-detail/10018/cyclospora-and-isospora-examination?cc=MASTER
- Quest 32114: https://testdirectory.questdiagnostics.com/test/test-detail/32114/salmonellashigella-cult-campy-eia-and-shiga-toxin-reflex-ecoli-o157-cult?cc=MET
- Labcorp 008169: https://www.labcorp.com/tests/008169/b-hemolytic-streptococcus-culture-group-a-only
- Labcorp 180935: https://www.labcorp.com/tests/180935/enterohemorrhagic-e-coli-ehec-shiga-toxin-eia
- Labcorp 183988: https://www.labcorp.com/tests/183988/clostridioides-difficile-toxin-gene-naa
- Labcorp 123010: https://www.labcorp.com/tests/123010/a1-antitrypsin-fecal-quantitative

## Limits and safeguards
This is a full catalog *rendering and internal-data* audit, not a fresh performing-laboratory clinical confirmation of every specimen instruction. Requirements vary by site and account. No test's specimen requirements, transport temperature, preservative selection or original physical collection container was silently replaced based on narrative alternatives. For clinical use, the current receiving-laboratory directory takes precedence when collection or shipping instructions conflict.
