# Container filter and manual-entry coverage audit
Date: November 17, 2026
Repository: 5amlim/Lab-Calculator (production source branch: main)
Scope: Quest and Labcorp calculators; catalog transport-container filters, exact-name search, and Add Missing Test collection/transport dropdowns.

## Root cause
Previously, Cary-Blair/Para-Pak Orange had a proper container badge in print/display planning but no dedicated filter category, and it was absent from the Add Missing Test dropdowns. The same omission affected other distinct preservative and specimen-collection devices. A generic "Other / special container" catchall hid important differences between submission media.

## Changes
- Dedicated transport categories for Cary-Blair, Total-Fix, formalin O&P, PVA O&P, clean stool vials, unspecified stool containers, UriSponge, serum/plasma transports, chilled and clean screw-cap vials, 24-hour urine vessels, protease-inhibitor tubes, blood culture bottles, Microtainers, QuantiFERON tubes, NMR LipoTube, Salivette devices, CSF screw-cap tubes, dry swabs, cytology vials, breath bags and original blood tube additives/colors.
- Manual Add Missing Test **collection and transport** choices now include commonly used named media that had previously required Other / manually type. The manual override remains available for uncommon or test-specific devices.
- Added **Specific submitted container (optional)** text filter, matching the current transport container wording on both main and required additional specimen pathways, not unrelated collection-source cups. This lets staff find any remaining rare label without inventing an incorrect generic category.
- Used existing container badges in the portal dropdown. The expanded filter popover has a capped height with its own scroll on smaller screens.
- Differentiated Total-Fix from generic stool containers. Cary-Blair, formalin, PVA and unpreserved containers remain separate; dual formalin/PVA submissions match both filters. Quest and Labcorp retain their separate frozen transport-tube conventions.
- Corrected manufacturer spelling normalization for QuantiFERON and NMR LipoTube and recognized original bottles/devices/specimens.
- Bumped HTML asset versions to avoid old cached calculator scripts or styles.

## Scope of inspection and regression
- Inspected base Quest catalog container distribution plus all **67 Quest supplemental scripts** and **78 Labcorp catalog/data scripts** linked by the current HTML. Reviewed unique container strings in batches; spot checked actual test cases from the prior non-blood specimen audit.
- Both HTML menus checked for duplicate options. Quest: 55 transport filter entries, 53 collection choices, 45 transport choices. Labcorp: 56 filter entries, 53 collection choices, 46 transport choices, including placeholder/manual options.
- JavaScript syntax checked for both calculator apps. All seven tests in `tests/container-filter-completeness-20261117.test.cjs` passed in an isolated execution harness with app code and simulated DOM, including named media, original devices, additional routes, name search and Labcorp frozen-PP separation.
- Existing catalog test records, source specimen requirements, actual transport media, temperature, transfer, volume, labels and printout planner were not changed by this filter-only update.

## Validation limits
These are application-code and catalog-data checks, not new clinical confirmations against every performing laboratory's latest directory. The full Node regression suite and a physical browser/printout run were not executed. GitHub Pages deployment was not independently opened in the browsing environment. Receiving-lab instructions remain authoritative.
