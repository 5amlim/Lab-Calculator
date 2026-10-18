# v11.31 Print layout verification

- Enlarged Routine and STAT text from 7.2px to 9px, while preserving the existing 92px by 16px pill dimensions.
- Changed print section sequence to Collection and Submission Plan, then Detailed Test Table on a fresh page, followed by routing/tube notes and copyright/ownership disclaimer.
- The warning/handling alerts remain near the top, before collection, for safety.
- Browser print-to-PDF checks with 2, 10, and 28 tests passed the ordered section and forced table new-page checks.
- Small two-test plan uses page one for collection and submission and begins the table on page two.
- The 10- and 28-test plans retain note/disclaimer blocks after the last table entries and retain transport bag cards before the table.
- data.js, experience.css and print.css are byte-for-byte unchanged from v11.30; tube counts/pooling/STAT rules were not modified.
