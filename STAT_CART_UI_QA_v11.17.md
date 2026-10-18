# v11.17 STAT / cart UI verification

Changes:
- For STAT-eligible, unselected library tests, show **Add as routine** and **Add as STAT**; the latter asks for confirmation and does not add the test if canceled.
- Non-STAT-eligible tests retain the original **+ Add** action.
- Once added, the cart provides a **Mark STAT** / **STAT ✓** toggle. Turning STAT on requests confirmation. Turning it off returns to Routine.
- Restored the cart delete control to the same visual row as the test code/name and STAT toggle. Long names fade out instead of obscuring actions; hovering the delete icon reveals "Delete".
- Moved the Quest STAT receiving lab selector to the search tools immediately before "Do not perform".
- Added a searchable expandable list of the selected receiving Quest lab's published STAT-menu codes and names. Codes not represented in the current collection catalog are labeled as such; availability still requires lab confirmation.

Automated Chromium UI tests conducted using the actual index HTML, styles.css, experience.css, data.js and app.js, with a localStorage test shim because the test browser blocks local URL navigation:

- Tested viewport widths: 1440, 900, 390 CSS px.
- Passed: Quest receiving lab selection, opening and filtering the STAT menu, and closing the panel.
- Passed: menu 'Add as STAT' confirmation canceled without adding and confirmed with STAT status assigned.
- Passed: turning STAT off and on from the cart, including the confirmation step.
- Passed: deleting an item from the cart, and 'Add as routine' producing a routine test.
- Passed: non-eligible test continued to show '+ Add', with no STAT add action.
- Passed: long test names, same-row delete visibility and geometric boundaries, and no uncaught browser JS errors.
- All clinical test-data and specimen calculation files were preserved unchanged.

The October 2025 Quest SoCal menu is a reference, not proof of current account-specific STAT availability. Confirm lab acceptance, operating hours, requisitions and courier routing.
