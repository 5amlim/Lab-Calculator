# Stool collection and transport review (v11.84)

Reviewed 26 stool test records in the packaged directory.

## Standard collection

- 23 tests now specify `Sterile Urine Cup` as the **collection** container, including seven previously labeled `Total-Fix® Transport Vial` as the source.
- Total-Fix remains the **transport** container for codes 681, 1748, 3930, 8625, 10018, 39441, and 90389. The original transfer and timing instructions were not changed.
- On the Add Missing Test form, choosing Stool automatically selects Sterile Urine Cup for ordinary collection. Explicitly entered specialized containers are preserved.
- Removed `Stool Container` from collection choices. It is not a substitute for a test-specific preservative or transport vial.

## Exceptions retained

- **3141** Cathartic Laxatives Profile, Stool: trace-metal-free plastic collection container.
- **455** Fecal Fat, Total, Quantitative: 72-hour 1-gallon collection container. Blocked for onsite collection.
- **5014** Nitrogen, Total, Feces: performing-lab-supplied total stool collection container. Blocked for onsite collection.

## Form transport options

Added and badged relevant labeled categories: Total-Fix, generic and screw-cap transport tubes, polypropylene, metal-free serum/plasma/RBC containers, UriSponge, amber protection, specialty vials, viral media, Amies swab transport, and other supported categories. The form still allows a manually entered transport container when the directory specifies one not in the list.

**Verified** in scripted Chromium desktop and mobile viewports: portal menu selection and badges, new stool test save/reopen, existing O&P edit, exception preservation, printed collection and submission separation. No changes to pooling calculations or transport temperatures.

This audit verifies the bundled requirements and UI behavior. Staff must still confirm active, test-specific requirements in the receiving laboratory directory.
