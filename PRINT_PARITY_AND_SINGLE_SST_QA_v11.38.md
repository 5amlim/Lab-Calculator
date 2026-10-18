# v11.38 printing and single-test SST QA

- Gold and Tiger both cap a single standard test at one SST. Explicit multiple tubes, including microtainer/neonatal and assay-specific instructions, are exceptions.
- High listed volumes that may exceed single-tube yield are marked for specimen sufficiency review; these are clinical collection questions, not proof that one SST is sufficient.
- Desktop print CSS and DOM are shared on all devices. Print sheet is fixed 10in wide, with text-size adjustment disabled and a shared three-column grid for long SST test lists.
- `@page` requests landscape and 12mm margins; mobile Safari, print vendors, and PDF services may override page orientation, printable margins, pagination, fonts and scaling. Exact physical parity requires matching paper, browser and printer settings.
- This is a browser-based approximation, not a pre-rendered PDF or manufacturer-specific print driver.

Browser parity validation (Chromium): 390 px mobile versus 1440 px desktop, 31-test mixed order; identical print CSS measurements, both 9-page US Letter landscape PDFs, same content apart from generation timestamp. Checked that text stays within page bounds. Direct Safari/iOS print driver testing not available.
