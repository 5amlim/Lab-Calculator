# Stool and urine source collection / Total-Fix cap QA | v11.66

## Workflow changes
- Active routine stool tests start in a **Sterile Cup** (rather than displaying a sterile *urine* cup or a Total-Fix vial as the initial collection container).
- For stool tests requiring Total-Fix, the vial remains a separate transport/preservative destination. It is not presented as the original source container. Transfer/fill-line and temperature instructions are unchanged.
- Compatible stool tests from the same sample still share one sterile source cup; separate stool collections, timed collections and special primary containers such as trace-metal-free containers are exceptions.
- Routine urine continues to be collected in a sterile urine cup before preservative or culture transport tubes are prepared; 24-hour urine keeps its own collection jug. No urine logic was modified.
- Total-Fix icon now has a black/dark charcoal top above its pale green body.

## Checks
- 3,199 Node assertions including every active stool test, full active-directory non-stool collection parity, all urine submission/source counts, a six-test pooled stool order, a special trace-metal stool collection, Total-Fix source-versus-transport separation and stool LABEL directives.
- Chromium PDF checks at 390 px and 1280 px: four pages, matching print text, a sterile stool source cup, Total-Fix transport vials and black Total-Fix top.
- iOS Safari printing is not tested on physical hardware.
