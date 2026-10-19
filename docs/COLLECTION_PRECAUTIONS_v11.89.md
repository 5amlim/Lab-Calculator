# Collection precaution alerts (v11.89)

The printed Collection and Submission Plan now includes **Collection precautions** beneath the existing fasting panel when selected tests have relevant pre-collection requirements. Each warning identifies the test code, name, and actionable instruction. The on-screen special-handling alert panel also surfaces these requirements.

The rules use the test's recorded special instructions plus narrowly scoped, independently verified test-code-specific Quest instructions for the examples below. They do not assume that every cortisol or testosterone assay needs the same draw window.

## Examples and source checks

- **4212, Cortisol, A.M.:** Draw between **7–9 AM**; record collection time. This is **not** a strict “before 8 AM” cutoff. [Quest](https://testdirectory.questdiagnostics.com/test/test-detail/4212/cortisol-am?cc=MASTER)
- **4213, Cortisol, P.M.:** Draw between **3–5 PM**; record collection time, based on the current packaged test entry.
- **873 and 30741, adult male testosterone immunoassay/screening:** Two **8–10 AM** samples on separate days are recommended for screening. This is not imposed on testosterone MS tests or all patients. [Quest 873](https://testdirectory.questdiagnostics.com/test/test-detail/873/?cc=SKB) | [Quest 30741](https://testdirectory.questdiagnostics.com/test/test-detail/30741/?cc=MASTER)
- **636, Mercury, Blood**, and other tests whose packaged instructions explicitly specify the restriction: avoid seafood for **48 hours** before collection. [Quest](https://testdirectory.questdiagnostics.com/test/test-detail/636/mercury-blood?cc=TMP)
- **94154, TMAO:** avoid fish and seafood the preceding day, as recorded in the test entry.
- Other recorded requirements include morning iron collection, special serotonin diet, biotin-interference review, drug level peak/trough timing, prescribed DST timing, postural rest, and separate time labels on serial specimens.

## Validation

- Parsed and syntax-checked the full revised application source.
- Scanned all **2,692 packaged tests**; **129** have at least one new pre-collection precaution (133 total, including tests with multiple requirements).
- Confirmed 4212, 4213, 873, 30741, 636, 7655, 94154, 571, 6921, and relevant biotin and drug-monitoring cases produce the intended alerts.
- Confirmed generic cortisol 367 and testosterone MS 15983/36170 **do not** receive an automatic fixed draw-time alert.
- Existing fasting logic, specimen collection/container calculations, transport bags, and source catalog were not changed.

Warnings aid planning; current receiving-lab and ordering-clinician instructions take precedence. Do not withhold prescribed medications or supplements without clinician guidance. For tests not listed, staff must still check the current test directory.
