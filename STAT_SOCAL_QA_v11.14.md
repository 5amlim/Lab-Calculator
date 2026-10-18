# v11.14 Southern California STAT eligibility QA

- Source: user-supplied October 2025 Quest Southern California STAT workbook, nine laboratory tabs plus revisions.
- Compared every facility code list in `app.js` to the corresponding source worksheet. Exact matches after excluding code 713 explicitly removed by the revision history.
- Southern California generic option equals the 66-code intersection of all nine labs.
- Each of the nine specific Quest lab options is present in the user interface.
- Sed Rate 809 is eligible at each laboratory, but starts Routine (no automatic STAT selection).
- Previous v11.12/v11.13 automatic sed-rate STAT selection is cleared once upon upgrading. Subsequent manual STAT choices are retained.
- 14 listed codes are absent from the present test catalog. They were not created without individual specimen validation.
- JavaScript parsed successfully in Node, and source-to-config comparisons passed.
- Browser end-to-end testing was not completed because file navigation was blocked by the browser environment.
