# Quest test-code request, 11 entries (November 17, 2026)

**Implemented in both repositories:** `5amlim/Lab-Calculator` (source) and `5amlim/Quest-Calculator-Test` (published calculator). Module `assets/js/quest-requested-tc-11-20261117.js` loads before `app.js` after previous Quest batches.

The module reconciles all **11 requested codes** without creating duplicate catalog records. The standard verified collection routes are active for up to **10** entries that were absent or reference-only. **Only 94569 remains searchable reference-only** without a prearranged overnight dry-ice shipment. **92717 is now cart-ready** with two physically separate original EDTA blood specimens and a mandatory precollection referral-shipping warning. Already active records are preserved, except a focused correction to 10380's two-specimen count/label and 38470's specimen label. Existing blocked records are never reactivated. Counts of *brand new* codes cannot be determined from this audit alone because the large historic baseline and older modules may already contain records.

| Code | Test | Status behavior | Draw to submit, transport | Important rule |
|---|---|---|---|---|
| `15434` | Lipid Panel (REFL) | Active / preserved if already active | SST Gold or Tiger, 2 mL serum; original spun SST; room temp | Client-specific reflex criteria; routine fasting not required |
| `15060` | Adiponectin | Active / preserved if already active | SST serum 1 mL, separate Transport Tube; refrigerated | OVERNIGHT fasting; same-day cold shipment |
| `10380` | A1c with reflex to 1,5-AG | Active / preserved + normalized two-sample route | SST serum 1 mL, plastic Transport Tube + separate full original Lavender EDTA blood, both room temp | Extra reflex when A1c 6.5% to 8.0%; SJC not offered |
| `38470` | GI Pathogen PCR Panel | Active / preserved + print label corrected | Stool Sterile cup -> Cary-Blair stool medium to fill line, room temp | Do not submit original stool cup or Total-Fix |
| `30673` | LD (REFL) | Active / preserved if already active | SST serum, plastic screw-cap Transport Tube, room temp | DO NOT refrigerate/freeze; client-specific reflex |
| `672` | Cadmium, Random Urine | Active / preserved if already active | Direct random urine into original Trace Metal-Free Plastic Container, room temp | No ordinary urine cup substitutions; SJC not offered |
| `270` | Arsenic, Urine | Active / preserved if already active | Direct random urine into original Trace Metal-Free Plastic Container, refrigerated | Quest service-area verification |
| `94569` | Interferon-gamma (IFN-γ), Serum | REFERENCE ONLY unless already approved active | 1 mL SST serum -> Transport Tube, FROZEN | Requires OVERNIGHT DRY ICE shipment; otherwise do not collect |
| `13808` | Peripheral Blood Smear Review | Active / preserved if already active | Original Lavender EDTA whole blood 4.5mL at room temp | Quest accepts blood ALT, in-house same-day CBC results and history required; NO CLINIC slides |
| `92717` | Immune Assessment B Cell Subsets, Blood | **ACTIVE, cart-selectable**, unless intentionally blocked by staff | Original Lavender EDTA: TBBS 4 mL (3 mL min) ROOM TEMPERATURE, plus separate original Lavender EDTA IABC 10 mL adult (5 mL min) REFRIGERATED; pediatric ≤14 years 4 mL preferred (3 mL min) | Quest special logistics confirmation required **before collection**, date of draw and ordering physician contact required; Mayo weekday arrival, by 4 p.m. Friday |
| `19593` | CBC with Differential and Platelets (REFL) | Active / preserved if already active | Full original Lavender EDTA, room temp | Client-specific reflex; Quest performs any microscopy, no clinic slides |

## Sources

- 15434: https://testdirectory.questdiagnostics.com/test/test-detail/15434/lipid-panel-refl?cc=MASTER&p=r
- 15060: https://testdirectory.questdiagnostics.com/test/test-detail/15060/adiponectin-?cc=MASTER&p=r
- 10380: https://testdirectory.questdiagnostics.com/test/test-detail/10380/hemoglobin-a1c-with-reflex-to-15-anhydroglucitol-15-ag?cc=MASTER&p=r
- 38470: https://testdirectory.questdiagnostics.com/test/test-detail/38470/gastrointestinal-pathogen-panel-real-time-pcr?cc=MASTER&p=r
- 30673: https://testdirectory.questdiagnostics.com/test/test-detail/30673/lactate-dehydrogenase-ld-refl?cc=MASTER&p=r
- 672: https://testdirectory.questdiagnostics.com/test/test-detail/672/cadmium-random-urine?cc=MASTER&p=r
- 270: https://testdirectory.questdiagnostics.com/test/test-detail/270/arsenic-urine?cc=MASTER&p=r
- 94569: https://testdirectory.questdiagnostics.com/test/test-detail/94569/interferon-gamma-ifn-y-serum?cc=MASTER&p=r
- 13808: https://testdirectory.questdiagnostics.com/test/test-detail/13808/peripheral-blood-smear-review?cc=MASTER&p=r
- 92717: https://testdirectory.questdiagnostics.com/test/test-detail/92717/immune-assessment-b-cell-subsets-blood?cc=MASTER&p=r
- 19593: https://testdirectory.questdiagnostics.com/test/test-detail/19593/cbc-includes-differential-and-platelets-refl?cc=MASTER&p=r

## Specimen and UI guardrails

- Local *no clinic slides/smears* policy is preserved. Quest 13808 explicitly accepts original Lavender EDTA whole blood as the alternative to clinician-prepared slides, but **same-day in-house CBC results and history** MUST accompany the order or Quest cancels it.
- **92717** is now **active and Add to Cart enabled**. It requires two distinct original Lavender EDTA specimens, labeled WHOLE BLOOD · TBBS (ambient) and WHOLE BLOOD · IABC (refrigerated), never pooled or aliquoted. The adult IABC specimen needs a suitable 10 mL EDTA original collection tube (5 mL minimum); the pediatric ≤14-year specimen prefers 4 mL (3 mL minimum). Collection date and ordering physician name/phone are required. A clear precollection warning requires coordination with Quest for rapid Mayo delivery. The source module updates existing active and reference-only 92717 records; the app migrates stale browser overrides while preserving staff blocking.
- **94569** requires a **frozen serum Transport Tube** and shipment overnight on **dry ice**. It cannot be accepted via a normal room-temperature or refrigerator bag.
- **38470** is Cary-Blair stool medium with fill line, not raw stool, Total-Fix or a stool 'transport tube'; the specimen source is STOOL on the printout. Routine generic date/time label text removed.
- **10380** needs a separate serum-source tube and a dedicated original lavender whole-blood tube. Search aliases/categories and split specimen route are explicit.
- **15060** requires overnight fasting and refrigerated separated serum. **15434** routine lipid panel does not require fasting unless the provider separately specifies.
- **30673** is room-temperature-only for shipment. Do not copy refrigerated LDH workflows; Quest specifically instructs not to refrigerate or freeze.
- **672 / 270** original metal-free random urine collections. No generic sterile-cup substitution.
- **15434 / 30673 / 19593** are client-specific reflex codes, not necessarily valid across all Quest accounts; staff must verify the requisition's Quest service area.

## Verification run

Checked identical module blob hashes in source and published repository, JavaScript syntax of the module and app files, unique 11-code list, metadata/aliases/categories, reference-only guard, existing active/blocked record handling, 10380 two-source route, Cary-Blair label and transport route, split-temperature 92717, same-day CBC requirements, import order. Source regression file `tests/quest-requested-tc-11-20261117.test.cjs` added; full browser/end-to-end regression suite not run.


## November 17 follow-up: cart eligibility repair

The earlier reference-only status for **92717** disabled the Add action. Official Quest and Mayo collection instructions now support a cart-ready planning record, provided staff coordinate shipping **before drawing**. The module promotes existing reference records to active, refreshes its specific two-source EDTA requirements and keeps existing record IDs. Both repositories' `app.js` preserve staff Do Not Perform status but migrate older local saved directory-only overrides to the new active catalog version. Both `index.html` files use versioned script URLs for cache refresh. This is a catalog/cart eligibility change, not evidence that courier logistics have been arranged or that a specific clinic stocks an adult 10 mL lavender tube.
