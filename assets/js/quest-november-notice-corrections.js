(() => {
  'use strict';

  const catalog = window.SEED_TESTS;
  if (!Array.isArray(catalog)) return;

  // Quest IntelliTest Manager, changes effective November 16, 2026.
  // https://intellitestmanager.questdiagnostics.com/home/output/305852
  const source = 'https://intellitestmanager.questdiagnostics.com/home/output/305852';
  const changes = new Map([
    ['37386', {
      stability: 'Room temperature: unacceptable. Refrigerated: 1 hour. Frozen: 9 months.'
    }],
    ['91475', {
      minimumVolume: '1 swab'
    }],
    ['91477', {
      minimumVolume: '1 swab',
      collectionNote: 'For the alternative male first-catch urine route, use an unpreserved cup and transfer 2 mL to the Aptima urine transport tube within 24 hours of collection. Fill to the clear pane on the tube label.'
    }]
  ]);

  for (const record of catalog) {
    const change = changes.get(String(record.testCode).trim());
    if (!change || record.status !== 'active') continue;

    const {collectionNote, ...fields} = change;
    Object.assign(record, fields);
    if (collectionNote && !record.specialInstructions?.includes(collectionNote)) {
      record.specialInstructions = [record.specialInstructions, collectionNote].filter(Boolean).join(' ');
    }
    if (!String(record.source).includes(source)) {
      record.source = [record.source, source].filter(Boolean).join(' • ');
    }
  }
})();
