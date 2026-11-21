# Labcorp 273 remaining-reference disposition audit

Reviewed 2026-11-21. Scope: the 273 **directory-only** Labcorp orders in `audits/labcorp-remaining-review-20261121.csv` before this change.

- **122 moved to Do Not Perform**, each with a code-specific or workflow-specific reason below.
- **151 retained directory-only** because specimen collection, supply availability, route, or exact-code instructions are unverified, not demonstrably excluded.
- **66 pre-existing Do Not Perform** and **14 previously added** in the 353-row review were not changed.
- The status means **not performable using the present clinic's Labcorp specimen sendout workflow**, not necessarily that Labcorp does not offer the test. Point-of-care analyzers remain in directory-only and are not marked unavailable at Sollis merely because they lack a Labcorp sendout pathway.

## All newly blocked codes and reasons

| Labcorp code | Test | Reason | Source |
| --- | --- | --- | --- |
| 007351 | /A/L/A/ /D/e/l/t/a/,/ /R/a/n/d/o/m/ /U/r/i/n/e/ | Requires acid-preserved urine, which the clinic does not collect. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/007351) |
| 008458 | /R/e/f/e/r/e/n/c/e/ /B/a/c/t/e/r/i/a/l/ /C/u/l/t/u/r/e/ /I/d/e/n/t/i/f/i/c/a/t/i/o/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/008458/reference-bacterial-culture-identification) |
| 008474 | /O/r/g/a/n/i/s/m/ /I/d/e/n/t/i/f/i/c/a/t/i/o/n/,/ /M/o/l/d/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/008474/organism-identification-mold) |
| 008664 | /O/r/g/a/n/i/s/m/ /I/d/e/n/t/i/f/i/c/a/t/i/o/n/,/ /B/a/c/t/e/r/i/a/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/008664/organism-identification-bacteria) |
| 008680 | /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /A/e/r/o/b/i/c/ /a/n/d/ /F/a/c/u/l/t/a/t/i/v/e/l/y/ /A/n/a/e/r/o/b/i/c/O/r/g/a/n/i/s/m/s/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/008680/susceptibility-testing-aerobic-and-facultatively-anaerobic-organisms) |
| 009449 | /S/p/i/r/o/m/e/t/r/y/ | Spirometry is a clinical procedure, not a Labcorp specimen sendout order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/009449) |
| 009456 | /H/e/a/r/i/n/g/ /T/e/s/t/ | Hearing test is a clinical procedure, not a Labcorp specimen sendout order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/009456) |
| 009464 | /S/l/i/t/ /L/a/m/p/ /E/x/a/m/i/n/a/t/i/o/n/ | Slit-lamp examination is a clinical examination, not a Labcorp specimen sendout order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/009464) |
| 017422 | /A/d/d/ /O/n/:/ /h/C/G/,/u/E/3/,/I/n/h/i/b/i/n/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/017422) |
| 088005 | /M/i/n/i/m/u/m/ /I/n/h/i/b/i/t/o/r/y/ /C/o/n/c/e/n/t/r/a/t/i/o/n/ /(/M/I/C/)/,/ /2/ /D/r/u/g/s/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/088005/minimum-inhibitory-concentration-mic-two-drugs) |
| 088013 | /M/i/n/i/m/u/m/ /I/n/h/i/b/i/t/o/r/y/ /C/o/n/c/e/n/t/r/a/t/i/o/n/ /(/M/I/C/)/,/ /3/ /D/r/u/g/s/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/088013/minimum-inhibitory-concentration-mic-three-drugs) |
| 088021 | /M/i/n/i/m/u/m/ /I/n/h/i/b/i/t/o/r/y/ /C/o/n/c/e/n/t/r/a/t/i/o/n/ /(/M/I/C/)/,/ /M/o/r/e/ /T/h/a/n/ /3/ /D/r/u/g/s/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/088021/minimum-inhibitory-concentration-mic-more-than-three-drugs) |
| 088161 | /A/c/i/d/-/F/a/s/t/ /(/M/y/c/o/b/a/c/t/e/r/i/a/)/ /A/n/t/i/b/i/o/t/i/c/ /S/u/s/c/e/p/t/i/b/i/l/i/t/i/e/s/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/088161/acid-fast-mycobacteria-antibiotic-susceptibilities) |
| 096388 | /M/i/n/i/m/u/m/ /I/n/h/i/b/i/t/o/r/y/ /C/o/n/c/e/n/t/r/a/t/i/o/n/ /(/M/I/C/)/,/ /1/ /D/r/u/g/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/096388/minimum-inhibitory-concentration-mic-one-drug) |
| 100874 | /F/a/x/ /R/e/p/o/r/t/ | Fax report code, not an independent specimen collection. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/100874) |
| 150201 | /I/m/m/u/n/e/ /D/e/f/i/c/i/e/n/c/y/ /P/r/o/f/i/l/e/ /V/I/I/I/ | Requires a prepared blood film. The clinic does not prepare slides or smears. | [Test details](https://www.labcorp.com/tests/150201/immune-deficiency-profile-viii) |
| 180175 | /E/x/t/e/n/d/-/S/p/e/c/t/./B/e/t/a/-/L/a/c/t/a/./D/e/t/c/t/./ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/180175) |
| 180307 | /C/u/l/t/u/r/e/ /o/f/ /D/i/a/l/y/s/i/s/ /W/a/t/e/r/ | Environmental or equipment-monitoring specimen, outside the patient lab collection service. | [Test details](https://www.labcorp.com/tests/180307/culture-of-dialysis-water) |
| 180315 | /C/u/l/t/u/r/e/ /o/f/ /D/i/a/l/y/s/a/t/e/ | Environmental or equipment-monitoring specimen, outside the patient lab collection service. | [Test details](https://www.labcorp.com/tests/180315/culture-of-dialysate) |
| 181560 | /B/i/o/l/o/g/i/c/a/l/ /I/n/d/i/c/a/t/o/r/s/ /(/S/t/e/r/i/l/e/)/ | Environmental or equipment-monitoring specimen, outside the patient lab collection service. | [Test details](https://www.labcorp.com/tests/181560/biological-indicators-sterile) |
| 182212 | /O/r/g/a/n/i/s/m/ /I/d/e/n/t/i/f/i/c/a/t/i/o/n/,/ /Y/e/a/s/t/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182212/organism-identification-yeast) |
| 182220 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /F/l/u/c/o/n/a/z/o/l/e/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182220/yeast-susceptibility-testing-fluconazole) |
| 182261 | /A/e/r/o/b/i/c/ /I/d/e/n/t/i/f/i/c/a/t/i/o/n/ /a/n/d/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182261/aerobic-identification-and-susceptibility) |
| 182329 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /A/m/p/h/o/t/e/r/i/c/i/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182329/yeast-susceptibility-testing-amphotericin) |
| 182345 | /O/r/g/a/n/i/s/m/ /I/d/e/n/t/i/f/i/c/a/t/i/o/n/,/ /A/n/a/e/r/o/b/i/c/ /B/a/c/t/e/r/i/a/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182345/organism-identification-anaerobic-bacteria) |
| 182436 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /I/t/r/a/c/o/n/a/z/o/l/e/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182436/yeast-susceptibility-testing-itraconazole) |
| 182576 | /M/y/c/o/b/a/c/t/e/r/i/u/m/ /t/u/b/e/r/c/u/l/o/s/i/s/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/,/ /B/r/o/t/h/ /D/i/l/u/t/i/o/n/w/i/t/h/ /C/o/n/f/i/r/m/a/t/i/o/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182576/mycobacterium-tuberculosis-susceptibility-broth-dilution-and-confirmation) |
| 182808 | /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /G/r/a/m/ /P/o/s/i/t/i/v/e/ /R/o/d/s/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/182808) |
| 182832 | /M/y/c/o/b/a/c/t/e/r/i/u/m/ /a/v/i/u/m/ /C/o/m/p/l/e/x/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /-/ /B/r/o/t/h/ /D/i/l/u/t/i/o/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182832/mycobacterium-avium-complex-susceptibility-broth-dilution) |
| 182840 | /M/y/c/o/b/a/c/t/e/r/i/u/m/ /m/a/r/i/n/u/m/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /(/A/S/T/)/ /-/ /B/r/o/t/h/ /D/i/l/u/t/i/o/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182840/mycobacterium-marinum-susceptibility-ast-broth-dilution) |
| 182857 | /N/o/c/a/r/d/i/a/,/ /A/e/r/o/b/i/c/ /A/c/t/i/n/o/m/y/c/e/t/e/s/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /(/A/S/T/)/ /-/ /B/r/o/t/h/D/i/l/u/t/i/o/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182857/nocardia-aerobic-actinomycetes-susceptibility-ast-broth-dilution) |
| 182915 | /R/a/p/i/d/l/y/ /G/r/o/w/i/n/g/ /M/y/c/o/b/a/c/t/e/r/i/u/m/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /-/ /B/r/o/t/h/D/i/l/u/t/i/o/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182915/rapidly-growing-mycobacterium-susceptibility-broth-dilution) |
| 182923 | /N/o/n/-/t/u/b/e/r/c/u/l/o/u/s/ /S/l/o/w/l/y/ /G/r/o/w/i/n/g/ /M/y/c/o/b/a/c/t/e/r/i/u/m/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/-/ /B/r/o/t/h/ /D/i/l/u/t/i/o/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/182923/nontuberculous-slowly-growing-mycobacterium-susceptibility-broth-dilution) |
| 183158 | /A/c/i/d/-/f/a/s/t/ /O/r/g/a/n/i/s/m/ /I/d/e/n/t/i/f/i/c/a/t/i/o/n/ /b/y/ /P/C/R/,/ /M/A/L/D/I/-/T/O/F/ /a/n/d///o/r/S/e/q/u/e/n/c/i/n/g/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183158/acid-fast-organism-identification-by-pcr-maldi-tof-and-or-sequencing) |
| 183166 | /A/c/i/d/-/f/a/s/t/ /O/r/g/a/n/i/s/m/ /I/d/e/n/t/i/f/i/c/a/t/i/o/n/ /b/y/ /P/C/R/,/ /M/A/L/D/I/-/T/O/F/ /a/n/d///o/r/S/e/q/u/e/n/c/i/n/g/ /w/i/t/h/ /R/e/f/l/e/x/ /t/o/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183166/acid-fast-organism-identification-by-pcr-maldi-tof-and-or-sequencing-with-reflex-to-susceptibility-testing) |
| 183255 | /Y/e/a/s/t/ /S/u/s/c/e/p/,/ /I/s/a/v/u/c/o/n/a/z/o/l/e/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183255/yeast-susceptibility-testing-isavuconazole) |
| 183257 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /C/o/m/p/r/e/h/e/n/s/i/v/e/ /P/a/n/e/l/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183257/yeast-susceptibility-testing-comprehensive-panel) |
| 183260 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /R/e/z/a/f/u/n/g/i/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183260/yeast-susceptibility-testing-rezafungin) |
| 183285 | /O/r/g/a/n/i/s/m/ /I/d/e/n/t/i/f/i/c/a/t/i/o/n/,/ /U/n/s/p/e/c/i/f/i/e/d/ /G/r/o/u/p/,/ /b/y/ /S/e/q/u/e/n/c/e/A/n/a/l/y/s/i/s/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183285/organism-identification-unspecified-group-by-sequence-analysis) |
| 183402 | /O/r/g/a/n/i/s/m/ /I/D/ /b/y/ /M/a/t/r/i/x/-/a/s/s/i/s/t/e/d/ /L/a/s/e/r/ /D/e/s/o/r/p/t/i/o/n///I/o/n/i/z/a/t/i/o/n/T/i/m/e/-/o/f/-/F/l/i/g/h/t/ /M/S/ /W/i/t/h/ /R/e/f/l/e/x/ /t/o/ /S/e/q/u/e/n/c/e/-/b/a/s/e/d/I/d/e/n/t/i/f/i/c/a/t/i/o/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183402/organism-identification-by-matrix-assisted-laser-desorption-ionization-time-of-flight-ms-with-reflex-to-sequence-based-identification) |
| 183442 | /M/o/d/i/f/i/e/d/ /H/o/d/g/e/ /T/e/s/t/ | Requires a cultured bacterial isolate; patient swabs are not an acceptable substitute. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/183442) |
| 183483 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /A/n/i/d/u/l/a/f/u/n/g/i/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183483/yeast-susceptibility-testing-anidulafungin) |
| 183491 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /C/a/s/p/o/f/u/n/g/i/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183491/yeast-susceptibility-testing-caspofungin) |
| 183509 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /M/i/c/a/f/u/n/g/i/n/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183509/yeast-susceptibility-testing-micafungin) |
| 183517 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /P/o/s/a/c/o/n/a/z/o/l/e/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183517/yeast-susceptibility-testing-posaconazole) |
| 183525 | /Y/e/a/s/t/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ /T/e/s/t/i/n/g/,/ /V/o/r/i/c/o/n/a/z/o/l/e/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://www.labcorp.com/tests/183525/yeast-susceptibility-testing-voriconazole) |
| 183566 | /S/t/a/t/e/ /L/a/b/o/r/a/t/o/r/y/ /R/e/p/o/r/t/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/183566) |
| 183809 | /S/t/r/e/p/ /G/p/ /B/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/183809) |
| 183939 | /S/u/s/c/e/p/t/i/b/i/l/i/t/y/,/ /C/F/ /P/s/ /a/e/r/u/g/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/183939) |
| 199995 | /Q/A/P/A/M/ | QAPAM quality-program reference, not an independent specimen collection. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/199995) |
| 272104 | /S/p/e/c/ /R/e/c/'/d/,/ /N/o/ /R/e/q/./ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/272104) |
| 278734 | /M/u/l/t/i/p/l/e/ /R/e/f/e/r/r/a/l/ | Multiple-referral administrative routing code, not an independent specimen collection. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/278734) |
| 345334 | /E/D/I/ /M/i/s/c/e/l/l/a/n/e/o/u/s/ /T/e/s/t/i/n/g/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/345334) |
| 345345 | /E/D/I/ /M/i/s/c/e/l/l/a/n/e/o/u/s/ /T/e/s/t/i/n/g/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/345345) |
| 345358 | /E/D/I/ /M/i/s/c/e/l/l/a/n/e/o/u/s/ /T/e/s/t/i/n/g/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/345358) |
| 501999 | /C/y/t/o/g/e/n/e/t/i/c/ /S/e/t/ /u/p/ /T/i/s/s/u/e///S/k/i/n/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/501999) |
| 502273 | /N/e/g/a/t/i/v/e/ /P/N/H/ /B/i/l/l/i/n/g/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/502273) |
| 510100 | /S/N/P/ /M/i/c/r/o/a/r/r/a/y/-/P/r/e/n/a/t/a/l/ /(/R/e/v/e/a/l/(/R/)/)/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://www.labcorp.com/tests/510100/snp-microarray-prenatal-reveal) |
| 519013 | /S/e/m/e/n/ /A/n/a/l/y/s/i/s/ /(/A/U/A/ /G/u/i/d/e/l/i/n/e/s/)/,/ /P/o/s/t/v/a/s/e/c/t/o/m/y/ | Semen analysis requires testing within 60 minutes; no approved rapid collection-to-testing workflow is established. | [Test details](https://www.labcorp.com/tests/519013/semen-analysis-aua-guidelines-postvasectomy) |
| 519114 | /S/e/m/e/n/ /A/n/a/l/y/s/i/s/,/ /B/a/s/i/c/ | Semen analysis requires testing within 60 minutes; no approved rapid collection-to-testing workflow is established. | [Test details](https://www.labcorp.com/tests/519114/semen-analysis-basic) |
| 519481 | /S/e/m/e/n/ /A/n/a/l/y/s/i/s/,/ /B/a/s/i/c/ | Semen analysis requires testing within 60 minutes; no approved rapid collection-to-testing workflow is established. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/519481) |
| 700600 | /T/o/x/A/s/s/u/r/e/ /R/e/p/o/r/t/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/700600) |
| 716506 | /./ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/716506) |
| 737224 | /P/h/y/s/i/c/a/l/-/P/r/o/d/./ /S/p/e/c/./,/e/t/c/./ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/737224) |
| 737440 | /P/h/y/s/i/c/a/l/-/I/n/s/t/a/l/l/e/r/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/737440) |
| 737441 | /P/h/y/s/i/c/a/l/-/G/e/n/e/r/a/l///R/e/p/a/i/r/ /O/p/e/r/a/t/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/737441) |
| 737442 | /P/h/y/s/i/c/a/l/-/I/n/s/t/a/l/l/e/r/ /W///O/ /E/K/G/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/737442) |
| 737444 | /P/h/y/s/i/c/a/l/-/E/x/e/c/u/t/i/v/e/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/737444) |
| 780304 | /T/e/s/t/ /(/1/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780304) |
| 780305 | /T/e/s/t/ /(/2/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780305) |
| 780306 | /T/e/s/t/ /(/3/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780306) |
| 780307 | /T/e/s/t/ /(/4/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780307) |
| 780308 | /T/e/s/t/ /(/5/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780308) |
| 780309 | /T/e/s/t/ /(/6/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780309) |
| 780310 | /T/e/s/t/ /(/7/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780310) |
| 780311 | /T/e/s/t/ /(/8/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780311) |
| 780312 | /T/e/s/t/ /(/9/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780312) |
| 780313 | /T/e/s/t/ /(/1/0/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/780313) |
| 818380 | /M/o/l/d/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/,/ /5/-/F/l/u/o/r/o/c/y/s/t/o/s/i/n/e/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/818380) |
| 818383 | /M/o/l/d/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/,/ /A/m/p/h/o/t/e/r/i/c/i/n/ /B/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/818383) |
| 818386 | /M/o/l/d/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/,/ /F/l/u/c/o/n/a/z/o/l/e/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/818386) |
| 818389 | /M/o/l/d/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/,/ /I/t/r/a/c/o/n/a/z/o/l/e/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/818389) |
| 818395 | /M/o/l/d/ /S/u/s/c/e/p/t/i/b/i/l/i/t/y/,/ /V/o/r/i/c/o/n/a/z/o/l/e/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/818395) |
| 821243 | /S/e/q/u/e/n/o/m/ /T/r/a/c/k/i/n/g/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/821243) |
| 821439 | /W/A/ /S/t/a/t/e/ /N/e/w/b/o/r/n/ /S/c/r/e/e/n/ /R/e/p/e/a/t/ | Washington State newborn-screen repeat; not an applicable order in the clinics' current markets. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/821439) |
| 824044 | /C/O/L/1/A/1/ /+/ /C/O/L/1/A/2/ /g/D/N/A/ /P/r/e/n/a/t/a/l/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/824044) |
| 824471 | /S/u/s/./A/n/t/i/./A/e/r/o/./B/a/c/t/./C/u/s/t/./M/I/C/(/1/)/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/824471) |
| 826555 | /E/n/d/o/t/o/x/i/n/ /-/ /L/A/L/ /Q/u/a/n/t/ /(/W/a/t/e/r/)/ | Environmental or equipment-monitoring specimen, outside the patient lab collection service. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/826555) |
| 830408 | /C/o/c/c/i/d/i/o/i/d/e/s/ /I/m/m/i/t/i/s/ /I/d/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/830408) |
| 830618 | /N/y/s/t/a/t/i/n/ /(/N/Y/S/)/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/830618) |
| 830829 | /H/e/t/e/r/o/t/r/o/p/h/i/c/ /P/l/a/t/e/ /C/t/./ /(/H/P/C/)/ | Environmental or equipment-monitoring specimen, outside the patient lab collection service. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/830829) |
| 830832 | /D/u/o/d/e/n/o/s/c/o/p/e/ /S/a/m/p/l/e/ /(/D/U/O/)/ | Environmental or equipment-monitoring specimen, outside the patient lab collection service. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/830832) |
| 830835 | /C/u/l/t/u/r/a/b/l/e/ /S/u/r/f/a/c/e/ /S/w/a/b/ /(/B/A/C/T/)/ | Environmental or equipment-monitoring specimen, outside the patient lab collection service. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/830835) |
| 832180 | /F/u/n/g/a/l/ /S/u/r/f/a/c/e/ /S/w/a/b/ /(/F/U/N/G/)/ | Environmental or equipment-monitoring specimen, outside the patient lab collection service. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/832180) |
| 832488 | /C/o/l/o/S/e/n/s/e/ /K/i/t/ /R/e/q/u/e/s/t/ | Patient-direct ColoSense kit request, not a clinic specimen collection or shipment. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/832488) |
| 833843 | /B/a/c/t/e/r/i/a/l/ /S/t/r/a/i/n/ /T/y/p/i/n/g/ /b/y/ /N/G/S/ | Requires an already cultured organism or isolate. The clinic does not produce or submit isolate-only referrals. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/833843) |
| 898196 | /L/a/b/c/o/r/p/ /R/e/p/r/o/d/u/c/t/i/v/e/ /R/i/s/k/ /S/u/m/m/a/r/y/ | Reproductive risk summary report, not an independent specimen collection. | [Test details](https://www.labcorp.com/tests/898196/labcorp-reproductive-risk-summary) |
| 909531 | /F/e/t/a/l/ /R/h/ /D/ /D/N/A/ /A/n/a/l/y/s/i/s/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/909531) |
| 909549 | /F/e/t/a/l/ /K/e/l/l/ /D/N/A/ /A/n/a/l/y/s/i/s/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/909549) |
| 909556 | /F/e/t/a/l/ /R/h/ /C///c/ /D/N/A/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/909556) |
| 909561 | /F/e/t/a/l/ /S///s/ /D/N/A/ /A/n/a/l/y/s/i/s/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/909561) |
| 909564 | /F/e/t/a/l/ /R/h/ /E///e/ /D/N/A/ /A/n/a/l/y/s/i/s/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/909564) |
| 909576 | /F/e/t/a/l/ /K/i/d/d/ /D/N/A/ /A/n/a/l/y/s/i/s/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/909576) |
| 909581 | /F/e/t/a/l/ /D/u/f/f/y/ /D/N/A/ /A/n/a/l/y/s/i/s/ | Requires cultured prenatal cells, tissue or specialized cell-culture media, which are outside the clinic specimen workflow. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/909581) |
| 910343 | /L/i/t/h/o/l/i/n/k/ /C/K/D/ /P/r/o/g/r/a/m/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://www.labcorp.com/tests/910343/litholink-ckd-program) |
| 910374 | /L/o/w/ /B/o/n/e/ /D/e/n/s/i/t/y/ /P/r/o/g/r/a/m/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/910374) |
| 910377 | /C/o/a/g/ /S/t/u/d/i/e/s/ /I/n/t/e/r/p/ /R/e/p/o/r/t/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/910377) |
| 910385 | /C/a/r/d/i/o/v/a/s/c/u/l/a/r/ /R/e/p/o/r/t/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://www.labcorp.com/tests/910385/cardiovascular-report) |
| 910445 | /A/l/l/e/r/g/e/n/ /C/o/m/p/o/n/e/n/t/ /C/o/m/m/e/n/t/s/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/910445) |
| 977717 | /C/A/ /P/r/e/n/a/t/a/l/ /S/c/r/e/e/n/i/n/g/ /P/r/o/g/r/a/m/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/977717) |
| 977995 | /S/e/n/d/ /t/o/ /P/S/C/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/977995) |
| 980102 | /R/e/v/i/e/w/e/d/ /B/y/:/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/980102) |
| 990010 | /E/D/I/ /M/i/s/c/e/l/l/a/n/e/o/u/s/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/990010) |
| 990011 | /I/n/p/a/t/i/e/n/t/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/990011) |
| 990689 | /E/m/e/r/g/e/n/c/y/ /S/T/A/T/ /F/e/e/ /2/ /H/r/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/990689) |
| 996662 | /D/r/a/w/ /F/e/e/ /(/F/i/n/g/e/r/s/t/i/c/k/)/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/996662) |
| 998096 | /T/r/a/v/e/l/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/998096) |
| 998257 | /R/e/c/o/l/l/e/c/t/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/998257) |
| 998272 | /H/a/n/d/w/r/i/t/t/e/n/ /O/r/d/e/r/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/998272) |
| 998310 | /P/a/c/k/e/d/ /P/l/a/t/e/l/e/t/s/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/998310) |
| 998686 | /P/a/s/s/ /T/h/r/o/u/g/h/ /t/o/ /S/t/a/t/e/ /L/a/b/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/998686) |
| 999524 | /S/T/A/T/ /C/o/u/r/i/e/r/ | Administrative, billing, tracking or reporting code. No independent patient specimen order. | [Test details](https://cdos.halfpenny.com/labcorp/TestDisplay/999524) |

## Retained directory-only

These 151 codes must not become active without verified collection and receiving-lab instructions. Outstanding specialty kits or unknown referral workflows were **not** automatically treated as a permanent Do Not Perform exclusion.

- 001594 Cryoglobulin, Qualitative With Quantitative Reflex: Requires prewarmed collection or continuous warm processing through separation. Clinic verification of that workflow is outstanding.
- 002180 Angiotensin II: Requires the lab-supplied Trasylol collection kit and immediate specialized processing. Clinic stock and processing workflow are unconfirmed.
- 004220 Complement C3a: Requires Labcorp Futhan kit 78946 and immediate preservative addition. Clinic stock and processing workflow are unconfirmed.
- 004330 Complement C4a: Requires Labcorp Futhan kit 78946 and immediate preservative addition. Clinic stock and processing workflow are unconfirmed.
- 004438 Cortisol Free, Random Urine: No complete exact-code specimen/container record was available in the sources reviewed.
- 005512 RBC, Fluid: Found in Labcorp result or reflex mappings. Independent orderability or the exact standalone collection requirements are unconfirmed.
- 005736 Nucleated Cells, Synovial Fld: Found in Labcorp result or reflex mappings. Independent orderability or the exact standalone collection requirements are unconfirmed.
- 009985 Miscellaneous Testing: No complete exact-code specimen/container record was available in the sources reviewed.
- 010421 Melanocyte-stimulating Hormone (MSH): Requires the lab-supplied Trasylol collection kit and immediate specialized processing. Clinic stock and processing workflow are unconfirmed.
- 013730 Magnesium, U: The exact code calls for the Urine Monovette with pH stabilizer. An ordinary sterile cup is unconfirmed for this code.
- 013731 Magnesium, Random Urine: No complete exact-code specimen/container record was available in the sources reviewed.
- 016868 Citric Acid, Random Urine: No complete exact-code specimen/container record was available in the sources reviewed.
- 023804 Lactate and Pyruvate: Requires dedicated reagent or acid processing before shipment. Clinic processing workflow is unconfirmed.
- 038596 CreatU+Ca U: The components are known, but the exact panel does not confirm acceptance of the unpreserved 24-hour workflow. Do not infer acceptance for this order from a different code.
- 080317 Cryofibrinogen, Qualitative: Requires prewarmed collection or continuous warm processing through separation. Clinic verification of that workflow is outstanding.
- 102087 Glucose Hemocue Waived: Point-of-care or immediate on-site workflow. The reference lacks a verified routine sendout collection path.
- 103226 Glucose (Fingerstick): Point-of-care or immediate on-site workflow. The reference lacks a verified routine sendout collection path.
- 112185 Arterial Blood Gas: Point-of-care or immediate on-site workflow. The reference lacks a verified routine sendout collection path.
- 115512 CoaguChek XS/INR Waived: Point-of-care or immediate on-site workflow. The reference lacks a verified routine sendout collection path.
- 115601 P2Y12 Platelet Inhibition: The exact code calls for a 2 mL Greiner 3.2% citrate product and a time-sensitive platelet workflow. Approved local tube stock and delivery are unconfirmed.
- 115920 Bayer DCA Hb A1c Waived: Point-of-care or immediate on-site workflow. The reference lacks a verified routine sendout collection path.
- 117810 Activated Protein C Rfx FVDNA: Exact order lacks a verified shipping temperature or complete component instructions.
- 120519 Cortisone, Urine: Exact instructions require preservative or use conditional language. The receiving laboratory must confirm an unpreserved route for this code.
- 120543 Lactic/Pyruvic Ratio: Requires dedicated reagent or acid processing before shipment. Clinic processing workflow is unconfirmed.
- 120956 Cryoglobulin, Ql, Serum: Requires prewarmed collection or continuous warm processing through separation. Clinic verification of that workflow is outstanding.
- 121194 Citrate/Creatinine Ratio: Exact order lacks a verified shipping temperature or complete component instructions.
- 121202 CreatU+Citric U: No complete exact-code specimen/container record was available in the sources reviewed.
- 121229 Free Kappa Lt Chains,Ur: Found in Labcorp result or reflex mappings. Independent orderability or the exact standalone collection requirements are unconfirmed.
- 121230 Free Lambda Lt Chains,Ur: Found in Labcorp result or reflex mappings. Independent orderability or the exact standalone collection requirements are unconfirmed.
- 127910 Fecal Weight (Total): Exact order lacks a verified shipping temperature or complete component instructions.
- 139883 FDA Guidance Female No Reflex: FDA guidance panels have multiple required specimen pathways. Order-specific tube allocation and transport conditions are unconfirmed.
- 139884 FDA Guidance Female With Rflx: FDA guidance panels have multiple required specimen pathways. Order-specific tube allocation and transport conditions are unconfirmed.
- 139885 FDA Guidance Male No Reflex: FDA guidance panels have multiple required specimen pathways. Order-specific tube allocation and transport conditions are unconfirmed.
- 139886 FDA Guidance Male With Reflex: FDA guidance panels have multiple required specimen pathways. Order-specific tube allocation and transport conditions are unconfirmed.
- 140768 Dehydroepiandrosterone (DHEA), ACTH Stimulation: No complete exact-code specimen/container record was available in the sources reviewed.
- 144441 Pre-Biologic Screening Profile: Directory specifies dedicated large gel-barrier tubes. Exact approved substitute for the clinic’s available SST sizes is unconfirmed.
- 146068 E1+E2Sens+E3Free: No complete exact-code specimen/container record was available in the sources reviewed.
- 160721 Antipancreatic Islet Cells: No complete exact-code specimen/container record was available in the sources reviewed.
- 165054 HIV 1/2 Ag/Ab by Abbott: Point-of-care or immediate on-site workflow. The reference lacks a verified routine sendout collection path.
- 165350 HIV 1/2 by OraQuick Advance: Point-of-care or immediate on-site workflow. The reference lacks a verified routine sendout collection path.
- 167145 Auto-Crossmatch: Requires coordinated donor and recipient collections for crossmatch. An ordinary single-patient sendout plan is not appropriate.
- 167160 Allo-Crossmatch: Requires coordinated donor and recipient collections for crossmatch. An ordinary single-patient sendout plan is not appropriate.
- 176160 Parentage/Relationship/Immigration Testing: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 180885 Helicobacter pylori Culture: Requires a provider-collected gastric biopsy and a dedicated culture transport route. The clinic has not confirmed that referral workflow.
- 182893 QuantiFERON(R)-TB Gold Plus (Client Incubated): Requires validated client incubation of the four tubes before shipping. This differs from the receiving laboratory incubation workflow.
- 182980 Urine Kit Culture: Requires inoculated Uricult media from a verified collection workflow. Ordinary urine in a sterile cup is a different submission.
- 183033 Veritor Flu A/B Waived: Point-of-care or immediate on-site workflow. The reference lacks a verified routine sendout collection path.
- 183210 Chlamydia Culture + NAA: Exact order lacks a verified shipping temperature or complete component instructions.
- 183511 AFB Smear+Culture+AST-Mtb ONLY: Specialized culture referral and receipt conditions are not established for the clinic sendout route.
- 183631 Acid Fast Culture W/Rfx: Specialized culture referral and receipt conditions are not established for the clinic sendout route.
- 186197 Influenza A+B Ag, EIA W/Reflex: Exact order lacks a verified shipping temperature or complete component instructions.
- 188045 C difficile Toxigenic Culture: Specialized culture referral and receipt conditions are not established for the clinic sendout route.
- 188433 Stool + Yersinia Culture: Requires two separately submitted stool specimens. Exact transport temperature for the unpreserved aliquot remains unconfirmed for this combination.
- 188755 ID and Susceptibility, Urine: Requires inoculated Uricult media from a verified collection workflow. Ordinary urine in a sterile cup is a different submission.
- 211524 Diabetes (Fruct/Insulin-4): Timed insulin routes require 2 mL per draw and refrigerated transport. The exact time-point set for the four-insulin order is unconfirmed.
- 216834 Pyruvic Acid, CSF: Requires dedicated reagent or acid processing before shipment. Clinic processing workflow is unconfirmed.
- 230999 Fetal Screen: Reference specifies a particular state program or facility-specific receiving workflow.
- 231550 Protoporphyrins,Fraction.RBC: Requires ice handling, washed red-cell preparation and reporting of packed-cell/total volumes. Clinic processing workflow is unconfirmed.
- 236949 TestT+17OHP+Andros+DHEA: The exact panel lists serum gel while constituent instructions exclude gel for at least one assay. Receiving laboratory must resolve the collection discrepancy.
- 236958 Cryofi+Cryogl: Requires prewarmed collection or continuous warm processing through separation. Clinic verification of that workflow is outstanding.
- 242823 ESR Wes+ANA+CRP C+Homocy (combination profile): Combination codes could not be tied to a complete, exact specimen and processing record. The components cannot be inferred from the abbreviated name.
- 243678 CMP14+LP+CBC/D/Plt+Mg RBC+T... (combination profile): Combination codes could not be tied to a complete, exact specimen and processing record. The components cannot be inferred from the abbreviated name.
- 260184 Female Adv Lipid and Inflamm: Requires NMR plus separate EDTA and citrate processing. Exact panel-specific sharing and volume allocation between components are unconfirmed.
- 260222 Male Adv Lipid and Inflamm: Requires NMR plus separate EDTA and citrate processing. Exact panel-specific sharing and volume allocation between components are unconfirmed.
- 260267 Advanced Lipid: Requires NMR plus separate EDTA and citrate processing. Exact panel-specific sharing and volume allocation between components are unconfirmed.
- 270461 Finger/Heel Stick: Point-of-care or immediate on-site workflow. The reference lacks a verified routine sendout collection path.
- 271351 Cholecystokinin (CCK) Plasma: Requires a dedicated specialty preservative tube and exact client processing. Clinic stock and handling workflow are unconfirmed.
- 316511 CreatU+Beta2U: Exact order lacks a verified shipping temperature or complete component instructions.
- 320154 Cryofi+Cryogl: Requires prewarmed collection or continuous warm processing through separation. Clinic verification of that workflow is outstanding.
- 322700 TSH+TestT+DHEA-S+Cort+E2+E1...: No complete exact-code specimen/container record was available in the sources reviewed.
- 323182 Kleihauer Betke Fetal Stain: No complete exact-code specimen/container record was available in the sources reviewed.
- 327673 Cortisone U+Cortisol U: No complete exact-code specimen/container record was available in the sources reviewed.
- 329656 HVA24h+VMA24U: No complete exact-code specimen/container record was available in the sources reviewed.
- 332425 Creat U+ALA Delta U: Exact order lacks a verified shipping temperature or complete component instructions.
- 340337 CreatU+HVA24H: Exact order lacks a verified shipping temperature or complete component instructions.
- 360744 HVA U+VMA U: No complete exact-code specimen/container record was available in the sources reviewed.
- 361661 Creatinine U+Citric Acid U: No complete exact-code specimen/container record was available in the sources reviewed.
- 361725 E2+Estrogen+E1: No complete exact-code specimen/container record was available in the sources reviewed.
- 364869 CreatU+Phos U: No complete exact-code specimen/container record was available in the sources reviewed.
- 365200 Intrauterine Fetal Demise/Stillborn Follow-up Panel: Listed specimen volumes or temperature instructions do not fully reconcile between the exact panel record and available component instructions.
- 370144 CMP14+LP+TP+TSH+5AC+CBC/D/P...: Listed specimen volumes or temperature instructions do not fully reconcile between the exact panel record and available component instructions.
- 374357 ALA U+PBG UU+Porphy U: No complete exact-code specimen/container record was available in the sources reviewed.
- 376565 CreatU+IFE U+Kappa/Lambda Q...: No complete exact-code specimen/container record was available in the sources reviewed.
- 381231 CreatU+Cyst U: Exact order lacks a verified shipping temperature or complete component instructions.
- 385845 Thrombosis, Venous Risk Profile, Congenital: Listed specimen volumes or temperature instructions do not fully reconcile between the exact panel record and available component instructions.
- 385897 NuSwab VG Plus+Mycopl+Genita: Exact order lacks a verified shipping temperature or complete component instructions.
- 389151 Immune Deficiency Profile VII: Directory specifies dedicated large gel-barrier tubes. Exact approved substitute for the clinic’s available SST sizes is unconfirmed.
- 390390 CBC/D/Plt-Clinical Trials: Protocol-specific reference. The applicable study collection and ordering materials are unconfirmed.
- 390394 TSH-Clinical Trials: Protocol-specific reference. The applicable study collection and ordering materials are unconfirmed.
- 390395 Creatinine, Serum: No complete exact-code specimen/container record was available in the sources reviewed.
- 451830 Pompe Disease Enzyme Analysis: Blood-spot title and specimen instructions conflict. Verify specimen, collection device and transport with the receiving laboratory.
- 452421 Acute Lymphoblastic Leukemia MRD for COG/Day 29: No complete exact-code specimen/container record was available in the sources reviewed.
- 483496 VistaSeq® MLH1 Comprehensive Analysis: A listing was found, but current orderable status and exact code-specific route are unconfirmed.
- 500473 Catecholamines, Total, Urine (Includes Creatinine): No complete exact-code specimen/container record was available in the sources reviewed.
- 500496 Vanillylmandelic Acid (VMA) (Includes Creatinine): No complete exact-code specimen/container record was available in the sources reviewed.
- 500520 Catecholamines, Fractionated, Urine (Includes Creatinine): No complete exact-code specimen/container record was available in the sources reviewed.
- 500720 Hydroxyindoleacetic Acid, 5- (5-HIAA), Urine (Includes Creatinine): No complete exact-code specimen/container record was available in the sources reviewed.
- 501814 Homovanillic Acid (HVA), Urine (Includes Creatinine): No complete exact-code specimen/container record was available in the sources reviewed.
- 501984 Culture, Neoplastic Blood/Bone: No complete exact-code specimen/container record was available in the sources reviewed.
- 502421 Gonadotropin-releasing Hormone: Requires the lab-supplied Trasylol collection kit and immediate specialized processing. Clinic stock and processing workflow are unconfirmed.
- 505770 Lupus Monitor Profile: Requires Labcorp Futhan kit 78946 and immediate preservative addition. Clinic stock and processing workflow are unconfirmed.
- 510166 Reveal (SM) Adjunct Microarray: No complete exact-code specimen/container record was available in the sources reviewed.
- 520057 Anti-HMGCR Ab (RDL): No complete exact-code specimen/container record was available in the sources reviewed.
- 630428 Fibrinogen Genetic Analysis: No complete exact-code specimen/container record was available in the sources reviewed.
- 701785 Meconium Tramadol Confirmation: Found in Labcorp result or reflex mappings. Independent orderability or the exact standalone collection requirements are unconfirmed.
- 702655 Naltrexone and Mtb, MS, UR: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 706705 Amiodarone (Cordarone), Serum: No complete exact-code specimen/container record was available in the sources reviewed.
- 707194 Drug Abuse, HHS-Unbund: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 707195 Drug Abuse, HHS-Unbund: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 707392 Drug Abuse Profile (DOT), Urine (9 Drugs) (MSConfirmation Included at an additional Charge): Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 707492 Drug Abuse, DOT-Unbund: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 708125 Drug Abuse, HHS-Bund: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 708126 Drug Abuse, HHS-Bund: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 708392 Drug Abuse, DOT-Bund: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 708492 Drug Abuse, DOT-Bund: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 716167 Ethanol, Urine: Exact order lacks a verified shipping temperature or complete component instructions.
- 723202 BENZENE,OCC EXP,EMERG EXAM, UR: Exact order lacks a verified shipping temperature or complete component instructions.
- 737368 737368 5+MDMA+Alc-Unb: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 737465 737465 5+MDMA+Alc-Unb: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 737467 737467 7+MDMA-Unb: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 737498 Opiates and Oxycodone MS, UR: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 737522 737522 9+MDMA-Unb: Legal, occupational or forensic collection. Validated chain of custody, required kit and local collection workflow are unconfirmed.
- 788901 Specific Gravity: No complete exact-code specimen/container record was available in the sources reviewed.
- 798230 Diphenhydramine Retest, MS, UR: No complete exact-code specimen/container record was available in the sources reviewed.
- 804389 Acanthamoeba+Naegleria Culture: Requires unusual provider-collected ocular material and specialized medium. Local supply or receiving workflow is unconfirmed.
- 804391 Amoeba Calcofluor Stain: Requires unusual provider-collected ocular material and specialized medium. Local supply or receiving workflow is unconfirmed.
- 811103 Porphyrin Evaluation, RBC: Requires washed red-cell processing and reporting of packed/total volume. Clinic processing is unconfirmed.
- 811121 PBG Deaminase, RBC: Requires washed red-cell processing and reporting of packed/total volume. Clinic processing is unconfirmed.
- 811137 ALA Dehydratase, RBC: Requires washed red-cell processing and reporting of packed/total volume. Clinic processing is unconfirmed.
- 818694 Neutrophil Ab and HLA Screen: Listed specimen volumes or temperature instructions do not fully reconcile between the exact panel record and available component instructions.
- 819052 Secretin: Requires a dedicated specialty preservative tube and exact client processing. Clinic stock and handling workflow are unconfirmed.
- 819210 Ghrelin Total, Plasma: Requires a dedicated specialty preservative tube and exact client processing. Clinic stock and handling workflow are unconfirmed.
- 819227 Pancreastatin: Requires a dedicated specialty preservative tube and exact client processing. Clinic stock and handling workflow are unconfirmed.
- 819433 Neurotensin: Requires a dedicated specialty preservative tube and exact client processing. Clinic stock and handling workflow are unconfirmed.
- 830808 Oxalate, Plasma: Requires dedicated reagent or acid processing before shipment. Clinic processing workflow is unconfirmed.
- 834040 CJD Evaluation, CSF: Requires provider CSF collection using the specified original tubes and coordinated specialty referral. The workflow is unconfirmed.
- 834288 Brain Health Study: Study-specific order. Shipment and eligibility requirements depend on the study protocol.
- 834742 Brisk Study: Study-specific order. Shipment and eligibility requirements depend on the study protocol.
- 845135 Donath Landsteiner Test: Requires prewarmed collection or continuous warm processing through separation. Clinic verification of that workflow is outstanding.
- 847447 Neurokinin A (Substance K), P: Requires a dedicated specialty preservative tube and exact client processing. Clinic stock and handling workflow are unconfirmed.
- 847472 Neuropeptide Y: Requires a dedicated specialty preservative tube and exact client processing. Clinic stock and handling workflow are unconfirmed.
- 909200 Peptide (PYY): Requires a dedicated specialty preservative tube and exact client processing. Clinic stock and handling workflow are unconfirmed.
- 909206 Thyrotropin Releas. Hormone: Requires a dedicated specialty preservative tube and exact client processing. Clinic stock and handling workflow are unconfirmed.
- 910235 Litholink 24 Hour Urine KS: Litholink kit uses its own preservative and transport workflow. Clinic participation in this kit-based route is unconfirmed.
- 910245 Litholink 24 Hour Urine Cystine Panel: Litholink kit uses its own preservative and transport workflow. Clinic participation in this kit-based route is unconfirmed.
- 910475 Prescribed Drugs/Enhanced Rpt: No complete exact-code specimen/container record was available in the sources reviewed.
- 910531 Alcohol, Ethyl, WB/S/P: No complete exact-code specimen/container record was available in the sources reviewed.
- 910627 Isopropyl Alcohol: Exact order lacks a verified shipping temperature or complete component instructions.
- 910650 Methyl Alcohol: Exact order lacks a verified shipping temperature or complete component instructions.
- 910808 Volatiles: Exact order lacks a verified shipping temperature or complete component instructions.
- 911325 Litho 24Hr Testing-Clinic Kit: Litholink kit uses its own preservative and transport workflow. Clinic participation in this kit-based route is unconfirmed.
