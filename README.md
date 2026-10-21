# Lab Collection Calculator

A browser-based reference for laboratory specimen collection, processing, and send-out preparation. The site provides separate Quest and Cedars-Sinai workflows so staff can search tests, review collection and submission containers, and prepare a printable collection plan.

**Live application:** https://5amlim.github.io/Lab-Calculator/

## Lab calculators

| Calculator | Features | Link |
| --- | --- | --- |
| Quest Lab Calculator | Test-code and name search, multiple-test collection plans, collection volumes, container estimates, processing instructions, STAT options, and temperature-organized submission groups | [Open Quest](https://5amlim.github.io/Lab-Calculator/) |
| Cedars Lab Guide | Searchable test directory, illustrated collection and submission containers, specimen-source information, handling notes, and a separate print summary | [Open Cedars](https://5amlim.github.io/Lab-Calculator/cedars.html) |

Use the **Select Lab** dropdown to move between calculators. The main site opens on Quest. The calculators maintain separate lists and requirements.

## Project structure

| File or folder | Purpose |
| --- | --- |
| `index.html` | Quest calculator interface |
| `assets/js/data.js` | Quest reference test records |
| `assets/js/app.js` | Quest search, planning, and print logic |
| `assets/css/` | Shared interface and print layouts |
| `quest-theme.css` | Quest visual theme |
| `cedars.html` | Cedars interface |
| `cedars-data.js` | Cedars test records |
| `cedars-app.js` | Cedars search, planning, and print logic |
| `cedars.css`, `cedars-container-art.js` | Cedars styles and specimen illustrations |
| `cedars-container-guide.html` | Printable Cedars submission-container reference |
| `market-switch.css`, `assets/js/lab-select.js` | Laboratory navigation |
| `print-button-theme.css` | Shared print-action styling |

This is a static website. The calculators operate in the browser; they do not require a hosted application server.

## Collection and specimen safety

The calculator is a workflow reference, not a replacement for the receiving laboratory's current test directory, specimen acceptance criteria, or internal laboratory procedures. Verify test-specific requirements, stability, processing, and transport before collecting or submitting specimens. Separate specimens when required and check current STAT routing and availability.

**Do not enter patient identifiers or protected health information.**

## Ownership

Proprietary software. See [LICENSE.md](LICENSE.md) for permitted use and licensing terms. Third-party laboratory names and trademarks belong to their respective owners. This independent resource is not represented as an official Quest Diagnostics or Cedars-Sinai product.
