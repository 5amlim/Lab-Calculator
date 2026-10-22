# Lab Collection Calculator

A browser-based reference for laboratory specimen collection, processing, and send-out preparation. The site provides separate Quest, Cedars-Sinai, and Labcorp workflows so staff can search tests, review collection and submission containers, and prepare a printable collection plan.

**Live application:** https://5amlim.github.io/Quest-Calculator-Test/

## Lab calculators

| Calculator | Features | Link |
| --- | --- | --- |
| Quest Lab Calculator | Test-code and name search, multiple-test collection plans, collection volumes, container estimates, processing instructions, STAT options, and temperature-organized submission groups | [Open Quest](https://5amlim.github.io/Quest-Calculator-Test/) |
| Cedars Lab Guide | Searchable test directory, illustrated collection and submission containers, specimen-source information, handling notes, and a separate print summary | [Open Cedars](https://5amlim.github.io/Quest-Calculator-Test/cedars.html) |
| Labcorp Lab Calculator | Quest-style cart, volume estimates, specimen bags, print summary, and a searchable comparison of all 2,692 Quest tests. Labcorp specimen planning is limited to the individually documented Labcorp records. | [Open Labcorp](https://5amlim.github.io/Quest-Calculator-Test/labcorp.html) |

Use **Select Lab** to switch between calculators. The main page opens on Quest. Labcorp maintains its own catalog and browser storage. Its starter directory includes 10 tests checked against Labcorp's official pages; use **Add a missing test** for others only after confirming the Labcorp test code, specimen requirements and local acceptance. No Quest-specific test instructions or STAT menus are imported into Labcorp. The **Compare Quest tests to Labcorp** section indexes all 2,692 Quest tests, currently includes 29 possible code/name crosswalk suggestions, and exports the entire comparison as CSV. **Suggestions are not certified equivalents.** Unmatched records do not enter the Labcorp collection calculator until code, method, specimen, minimum volume, stability, and container instructions are verified with Labcorp.

## Project structure

| File or folder | Purpose |
| --- | --- |
| `index.html` | Quest calculator interface |
| `labcorp.html`, `labcorp-app.js`, `labcorp-data.js`, `labcorp-theme.css` | Independent Labcorp interface, shared calculation model and verified starter directory |
| `labcorp-crosswalk-data.js`, `labcorp-crosswalk-ui.js`, `labcorp-crosswalk.css` | Read-only all-Quest comparison index, possible Labcorp code suggestions, search and CSV export |
| `assets/js/data.js` | Quest reference test records |
| `assets/js/app.js` | Quest search, planning, and print logic |
| `assets/css/` | Shared interface and print layouts |
| `quest-theme.css` | Quest visual theme |
| `cedars.html` | Cedars interface |
| `cedars-data.js` | Cedars test records |
| `cedars-app.js` | Cedars search, planning, and print logic |
| `cedars.css`, `cedars-container-art.js` | Cedars styles and specimen illustrations |
| `cedars-container-guide.html` | Printable Cedars submission-container reference |
| `market-switch.css`, `assets/js/lab-select.js` | Three-lab navigation |
| `print-button-theme.css` | Shared print-action styling |

This is a static website. The calculators operate in the browser; they do not require a hosted application server.

## Collection and specimen safety

The calculator is a workflow reference, not a replacement for the receiving laboratory's current test directory, specimen acceptance criteria, or internal laboratory procedures. Verify test-specific requirements, stability, processing, and transport before collecting or submitting specimens. Separate specimens when required and check current STAT routing and availability.

**Do not enter patient identifiers or protected health information.**

## Ownership

Proprietary software. See [LICENSE.md](LICENSE.md) for permitted use and licensing terms. Third-party laboratory names and trademarks belong to their respective owners. This independent resource is not represented as an official Quest Diagnostics or Cedars-Sinai product.
