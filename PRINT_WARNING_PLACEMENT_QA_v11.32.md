# v11.32 Print warning placement QA

- Moved the existing collection, rejection, time-sensitive processing, and light-protection warning list from the top of the printout to immediately before the detailed test table.
- Confirmed the warning list is inside the detailed-table section, which starts on a new printed page.
- Print-to-PDF browser check with seven representative tests generated four pages: collection first, submission second, warnings and test table third, remaining table and general notes fourth.
- The warning page was rendered and visually inspected; it shows warnings immediately above the table with no overlap.
- Existing notice text, style, source data, tube counts, collection pooling, and STAT rules were not modified.
