# v11.12: STAT terminology and transport bag layout audit

## Test name corrections
- 809: Sed Rate by Modified Westergren (Quest official MASTER directory)
- 4914: Prothrombin with INR and Partial Thromboplastin Times (Quest official MASTER directory)
- 8847: Prothrombin Time with INR (Quest official MASTER directory)
- 6631: Bilirubin, Total and Direct, Neonatal (Quest official MASTER directory)
- 20381: Bilirubin, Total, Neonatal (Quest official MASTER directory)
- 34162: Bilirubin, Direct, Neonatal (legacy STAT suffix removed; Quest page could not be retrieved during this check; verify by regional Quest representative)

Quest references:
- https://testdirectory.questdiagnostics.com/test/test-detail/809/?cc=MASTER
- https://testdirectory.questdiagnostics.com/test/test-detail/4914/?cc=MASTER
- https://testdirectory.questdiagnostics.com/test/test-detail/8847/?cc=MASTER
- https://testdirectory.questdiagnostics.com/test/test-detail/6631/?cc=MASTER
- https://testdirectory.questdiagnostics.com/test/test-detail/20381/?cc=MASTER

## STAT routing
- Newly selected test 809 defaults to STAT as a requested local workflow policy.
- Previously selected 809 receives this default once on upgrade, after which staff can toggle it back to Routine and that choice is preserved.
- Other tests default to Routine unless staff explicitly mark STAT. Do not interpret 'offered STAT' on Quest as 'must send STAT'.
- Shipping STAT requires confirmation with the receiving Quest service area and courier/requisition arrangements.

## Print layout
- The purple submission header shows the dynamic number of bags and their STAT/temperature categories in compact micro-pills.
- Individual bag titles are larger, without changing collection or pooling calculations.

## Automated checks
- Same 2681 test records; exactly 6 testName fields updated, no code or collection fields changed.
- Browser test: old selected ESR migrates to STAT; manual change back to Routine remains possible.
- Browser test: exact code batch additions, names, three bag categories, visible card titles, and header badge counts all pass.
