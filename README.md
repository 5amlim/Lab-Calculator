# Lab Collection Calculator

A browser-based reference for laboratory specimen collection, processing, and send-out preparation. The site provides separate Quest, Cedars-Sinai, and Labcorp workflows so staff can search tests, review collection and submission containers, and prepare a printable collection plan.

**Published calculator:** https://5amlim.github.io/Quest-Calculator-Test/

**Source repositories:** [Lab-Calculator](https://github.com/5amlim/Lab-Calculator) and [Quest-Calculator-Test](https://github.com/5amlim/Quest-Calculator-Test). Both repositories are maintained with matching application files.

## Lab calculators

| Calculator | Features | Link |
| --- | --- | --- |
| Quest Lab Calculator | Test-code and name search, multiple-test collection plans, collection volumes, container estimates, processing instructions, STAT options, and temperature-organized submission groups | [Open Quest](https://5amlim.github.io/Quest-Calculator-Test/) |
| Cedars Lab Guide | Searchable test directory, illustrated collection and submission containers, specimen-source information, handling notes, and a separate print summary | [Open Cedars](https://5amlim.github.io/Quest-Calculator-Test/cedars.html) |
| Labcorp Lab Calculator | Quest-style cart, volume estimates, specimen bags, print summary, and a searchable comparison of all 2,692 Quest tests. Labcorp specimen planning is limited to the individually documented Labcorp records. | [Open Labcorp](https://5amlim.github.io/Quest-Calculator-Test/labcorp.html) |

Use **Select Lab** to switch between calculators. The main page opens on Quest. Labcorp maintains its own catalog and browser storage. Its directory contains test-specific Labcorp entries loaded from the base dataset and grouped catalog bundles; use **Add a missing test** only after confirming the Labcorp code, specimen requirements and local acceptance. No Quest-specific test instructions or STAT menus are imported into Labcorp. The **Compare Quest tests to Labcorp** section indexes all 2,692 Quest tests, includes possible code/name crosswalk suggestions, and exports the entire comparison as CSV. **Suggestions are not certified equivalents.** Unmatched records do not enter the Labcorp collection calculator until code, method, specimen, minimum volume, stability, and container instructions are verified with Labcorp.

## Project structure

| File or folder | Purpose |
| --- | --- |
| `index.html` | Quest calculator interface |
| `labcorp.html`, `labcorp-app.js`, `labcorp-data.js`, `labcorp-theme.css` | Independent Labcorp interface, shared calculation model and verified starter directory |
| `assets/js/labcorp/catalog/` | Consolidated Labcorp assay batches grouped by specialty. The page loads each bundle in the same order as the former individual scripts. Source-file provenance is listed in each bundle. |
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

## Documentation and versioning

`VERSION.txt` records the release label. `docs/CHANGELOG.md` preserves the development history, while `docs/SOURCES.txt` and the collection audit documents record the basis and limitations of historical specimen-handling decisions. `docs/Sam_Hay_Workplace_Use_Agreement.docx` is retained as a workplace-use record. The project license is at the repository root in `LICENSE.md`; no second license copy is needed under `docs/`.

## Adding Labcorp tests

Labcorp assay definitions are intentionally separate from Quest and Cedars. For each new Labcorp code, verify the test-specific collection and submission requirements before adding it. Include specimen type, draw and submit containers, minimum/preferred volume, transport temperature, stability, spin/processing, and test-specific handling.

Existing Labcorp catalog bundles live under `assets/js/labcorp/catalog/`. Add related verified entries to the appropriate group rather than creating a new root-level JavaScript file for each small batch. Preserve the existing script order in `labcorp.html`, and avoid changing shared pooling/print logic as part of data-only additions. Each bundled section names the original source for traceability. The `tests/labcorp-catalog-bundles.test.cjs` regression checks script references, loading, and unique codes.

## Collection and specimen safety

The calculator is a workflow reference, not a replacement for the receiving laboratory's current test directory, specimen acceptance criteria, or internal laboratory procedures. Verify test-specific requirements, stability, processing, and transport before collecting or submitting specimens. Separate specimens when required and check current STAT routing and availability.

**Do not enter patient identifiers or protected health information.**

## Ownership

Proprietary software. See [LICENSE.md](LICENSE.md) for permitted use and licensing terms. Third-party laboratory names and trademarks belong to their respective owners. This independent resource is not represented as an official Quest Diagnostics or Cedars-Sinai product.
