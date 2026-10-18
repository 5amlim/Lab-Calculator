# v11.74 QA: Transfer labels and Microtainer collection

- Audited 2,685 active directory tests using the baseline v11.73 and the new build. Non-Microtainer collection counts, submission containers and labeling are unchanged.
- Three explicit Microtainer neonate bilirubin entries: 6631, 20381, 34162. Each requires 2 amber Microtainer SSTs under its bundled special handling instructions. Their Microtainer sources are counted independently rather than as regular Gold/Tiger SSTs.
- Mixed regression: 3 neonatal tests + standard SST 899 + Red Top 201 produces 6 Microtainers, 1 Gold SST, 1 Red Top; routine transport counts are unchanged.
- Microtainer cards display a distinct visual icon and MICROTAINER flag. They do not create any extra order-of-draw tiles.
- “↑ Transfer” appears outside each source pill, without removing the pill count, icon or colored specimen text.
- Mobile-width (390px) and desktop (1280px) Chromium print text and layout checks passed. Real iOS Safari printout requires a device confirmation.
- Automated QA: 8,080 source-count/label/directory checks plus visual-print comparison.
