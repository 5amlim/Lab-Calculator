# v11.13 regional STAT controls QA

- Catalog: 2,681 current test records, not edited.
- Selector defaults to **Select receiving Quest area**. No STAT action until an area is explicitly selected.
- Eligibility keyed to exact Quest test code, not the test's name or generic STAT instructions.
- Southern California: ESR 809 is a user-requested clinic workflow rule, not an officially verified SoCal Quest STAT menu.
- Northern California / New York / Florida: no test is enabled until market-specific Quest-approved codes are obtained.
- Virginia / Short Pump RRL only: 64 available catalog codes from Quest's geographically limited July 24, 2025 publication. One code in the source PDF (310) is not in this calculator's catalog and is not displayed.
- Hidden STAT controls in both selected-test cart and collapsed/expanded test overview for ineligible tests.
- Changing the selected area removes previously saved STAT selections for codes that are not in the new area's eligibility list.
- Printed submission and blood pooling still use the approved isStat flag, ensuring any ineligible tests are routine.
- Mobile toggle controls reduced from 288px to 226px. Labels have minimum usable width and wrap as groups rather than word-by-word.

Static validation: JavaScript syntax checked with Node and source/catalog assertions passed. Automated Chromium visual testing was blocked in this environment; no end-to-end visual test is claimed.
