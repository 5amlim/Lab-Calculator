# Lab Collection Calculator (v11.80, compact deployment)

This ZIP is ready for GitHub Pages. The live calculator and its catalog have not been modified; the compact file organization is retained. The transport-container form has one original-tube selection, with SST-specific display wording; collection and print logic are unchanged.

## Publish

1. Extract the ZIP.
2. Upload **all extracted files and the `assets/` and `docs/` folders** to the root of your GitHub Pages repository. Keep `.nojekyll`.
3. Replace the previous files, and remove obsolete standalone files and old `QA_*.md` files if you want a clean repository.
4. Open your GitHub Pages site and refresh. If it looks cached, hard-reload the page.

**Do not upload just `index.html`.** The app loads scripts and styles from the `assets/` folder. The Workplace Use Agreement link loads the file from `docs/`.

## Files and folders

- `index.html`: Main application page.
- `assets/js/`: Calculator logic, test directory, and portal dropdown interactions.
- `assets/css/`: Layout, print styles, and responsive styling.
- `docs/`: License, source information, workplace agreement, and full version history.
- `.nojekyll`: GitHub Pages configuration.
- `VERSION.txt`: Current compact package version.

The prior 92-file ZIP contained old QA reports, regression-test scripts, and historical notes that aren't loaded by the website. Those were separated into a **QA archive** for future reference and maintenance.

## Important

Tests you manually add within the calculator are saved to that browser's local storage. Replacing files on GitHub Pages should not normally erase them, but exporting or separately backing up important manually added tests is advisable before changing the site. This package does not merge custom browser records into the bundled directory.
