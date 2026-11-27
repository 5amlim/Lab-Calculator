// Exact-field updates from Labcorp Diagnostics Update, November 2026 (pp. 5–9).
// Storage stability does not change the calculator's selected shipping route.
(() => {
  'use strict';
  const groups = [
    { codes: '340897 382965 164947', stability: 'Room temperature: 14 days. Refrigerated: 14 days. Frozen: 14 days. Stable through 6 freeze/thaw cycles.' },
    { codes: '161836 161950 161810 161802 161828 163059 163061 163067 163900 163915 163882 163002 163908 164010 165126 164002 165142 161646 161687', stability: 'Room temperature: 14 days. Refrigerated: 14 days. Frozen: 14 days. Stable through 5 freeze/thaw cycles.' },
    { codes: '520117', stability: 'Room temperature: 14 days. Refrigerated: 30 days. Frozen: 30 days. Stable through 1 freeze/thaw cycle.' },
    { codes: '007245 085340 042580 706200 717016 717009 007625 700433 085324', stability: 'Room temperature: 28 days. Refrigerated: 28 days. Frozen: 28 days. Stable through 4 freeze/thaw cycles.' },
    { codes: '102525', stability: 'Room temperature: 3 days. Refrigerated: 7 days. Frozen: 6 months. Stable through 1 freeze/thaw cycle.' }
  ];
  const updates = new Map();
  for (const {codes, stability} of groups) {
    for (const code of codes.split(' ')) updates.set(code, {stability});
  }
  updates.set('140822', {
    stability: 'Do not store or transport at room temperature. Refrigerated: 48 hours. Frozen: 14 days. Stable through 6 freeze/thaw cycles.'
  });
  updates.set('167015', {
    preferredVolume: '1 mL serum',
    minimumVolume: '0.5 mL',
    specialInstructions: 'Separate serum or plasma from cells and transfer to a plastic transport tube, including when using a gel-barrier tube. The minimum volume does not allow repeat testing.'
  });
  updates.set('120220', {
    specialInstructions: 'Use serum or EDTA plasma. Separate from cells, transfer to a plastic transport tube, and freeze. Maintain frozen and send a separate specimen if other frozen assays are ordered. Reject non-EDTA plasma, gross hemolysis, and samples received thawed or unfrozen.'
  });
  window.LabcorpNovember2026Updates = updates;
})();
