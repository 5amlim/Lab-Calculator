# Lab Collection Calculator

A tool for planning specimen collection and processing when sending multiple tests to the lab. Search by test name or code, add the tests to your cart, and use the combined printout instead of looking up each test separately.

## How to use it

1. Search for a test and add it to the cart. Repeat for all ordered tests.
2. Choose the collection options used at your location, such as Gold or Tiger SST and the urine culture container.
3. If a test is STAT, select the receiving lab and mark it STAT.
4. Review **What to Collect**, **What to Submit**, and the bag instructions before preparing the specimens.
5. Print the summary and use it during collection and processing.

The calculator groups compatible specimens where possible and separates STAT from routine submissions. Bags are also organized by transport temperature.

If a test is missing, use **Add Missing Test** to enter its collection and processing requirements. Tests added manually are saved in your browser, not in the shared test directory.

## Files

- `index.html` - Main page
- `assets/js/` - Test directory, calculator logic, and menus
- `assets/css/` - Page layout and print styles
- `docs/` - Supporting documents, sources, and change history
- `VERSION.txt` - Current version

## Updating the site

The calculator is hosted through GitHub Pages. Keep `index.html`, `assets/`, `docs/`, and `.nojekyll` in the repository. The page needs the files in `assets/` to work.

After an update, refresh the site. You may need to do a hard refresh if the previous version is still showing.

## Notes

This is a collection and processing aid. Confirm any unclear or changing requirements with the receiving lab's current test directory and your site's procedures.

Manually added tests are stored in your browser's local storage. They will not automatically appear on another device and may be lost if browser data is cleared.
