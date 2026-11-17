/* Quest directory review request, 2026-11-16.
 * This list was nominated using specimen names alone: most entries have NOT
 * been verified and MUST stay directory references, not cart-ready tests.
 * Reuse existing code/name records; never duplicate them or invent collection data.
 */
(() => {
  'use strict';
  const requested = new Set(`37735 16493 92433 224 30523 14451 6024 29881 36183 14744 17415 34692 6035 264 38323 15904 7599 36433 30974 270 6054 3353 278 6057 10640 38994 4944 6060 93196 18889 18901 16581 3356 30540 94263 10287 17642 17419 36434 672 11313 11216 1633 17787 30338 39627 318 5244 16381 16382 10068 398 7709 327 4562 368 17585 338 10944 11278 4616 11315 14761 37513 11328 17788 5295 90861 36421 36167 37081 365 35378 15319 14534 11280 19895 592 17422 4563 13954 7002 388 4606 3021 34164 11790 34869 10947 401 219 14762 17101 14763 90106 37476 94958 12598 12672 94959 37560 6145 468 17424 17425 494 17587 17639 14573 34695 35402 35401 35386 15110 36438 7507 8542 725 4946 5297 39527 6346 37710 90122 4447 7558 4448 39484 4449 37962 6705 3136 16602 17515 16441 16442 94675 1659 585 17588 36440 601 625 11322 11220 6179 831 37966 6183 70240 18844 12600 36441 637 35444 35388 30323 19548 14961 10216 38583 10486 18970 10526 8804 36954 36443 3500 5215 38313 37562 674 7804 682 11318 10456 11222 3119 94536 94960 94603 18420 94088 5367 11319 11215 14168 17820 726 17198 729 36592 18122 18120 18118 18126 18000 18051 18050 18049 18052 18143 18142 18141 18088 18060 18059 18104 18103 18022 18020 18018 18078 18076 18074 18132 18130 18128 18003 18011 18010 18009 18007 18066 18155 18153 18154 18146 18148 734 749 16993 755 17428 38363 765 15384 17407 90121 90637 17843 16866 16867 818 11042 30290 838 8463 90107 26506 11013 14268 3397 37124 8835 6325 8329 8330 6328 10666 10485 17088 6339 17591 34698 11217 34972 37612 39517 934 1710 8299 94531 36597 16013 17808 16326 90117 94221 36758`.trim().split(/\s+/));
  const verified = [
    {
      id: 'quest-verified-3353-20261116',
      status: 'active',
      testCode: '3353',
      testName: 'Benzene, Blood',
      specimenType: 'Whole Blood',
      drawContainer: 'Gray Top (Sodium Fluoride/Potassium Oxalate)',
      alternativeContainer: '',
      transportContainer: 'Gray Top (Sodium Fluoride/Potassium Oxalate)',
      preferredVolume: '5 mL whole blood',
      minimumVolume: '2.2 mL whole blood',
      transportTemperature: 'Refrigerated',
      stability: 'Room temperature: unacceptable; refrigerated 60 days; frozen 21 days.',
      spin: 'No',
      specialInstructions: 'Collect whole blood into gray-top sodium fluoride/potassium oxalate tube. Invert to mix anticoagulant, DO NOT centrifuge or transfer; submit the original tube refrigerated with cold packs. Specimens received at room temperature are rejected. Confirm code acceptance in the receiving Quest service area.',
      source: 'Quest official test directory, verified 2026-11-16: https://testdirectory.questdiagnostics.com/test/test-detail/3353/benzene-blood?cc=MASTER'
    },
    {
      id: 'quest-verified-35378-20261116',
      status: 'active',
      testCode: '35378',
      testName: 'Copper, Blood',
      specimenType: 'Whole Blood',
      drawContainer: 'Royal Blue EDTA (purple stripe)',
      alternativeContainer: '',
      transportContainer: 'Royal Blue EDTA (purple stripe)',
      preferredVolume: '1 mL whole blood',
      minimumVolume: '0.3 mL whole blood',
      transportTemperature: 'Room Temperature',
      stability: 'Room 30 days; refrigerated 30 days; frozen 30 days.',
      spin: 'No',
      specialInstructions: 'Collect whole blood in a PLASTIC EDTA trace metal-free royal blue-top tube with purple stripe. Submit the original unspun EDTA tube; do not pool with ordinary lavender EDTA, or use heparin tubes. Clotted specimens are rejected. Confirm Quest code availability for the receiving service area.',
      source: 'Quest official test directory, verified 2026-11-16: https://testdirectory.questdiagnostics.com/test/test-detail/35378/copper-blood?cc=MASTER'
    },
    {
      id: 'quest-verified-7558-20261116',
      status: 'active',
      testCode: '7558',
      testName: 'IgG Synthesis Rate/Index, CSF',
      specimenType: 'CSF',
      drawContainer: 'Sterile cup',
      alternativeContainer: '',
      transportContainer: 'Sterile cup',
      preferredVolume: '2 mL CSF',
      minimumVolume: '1 mL CSF',
      transportTemperature: 'Refrigerated',
      stability: 'CSF: room 8 hours; refrigerated 7 days; frozen 90 days.',
      spin: 'No',
      specialInstructions: 'REQUIRES TWO DISTINCT SPECIMENS: 2 mL CSF (minimum 1 mL) and 1 mL serum (minimum 0.5 mL). CSF must be obtained by a qualified procedural clinician; fourth CSF tube is preferred. Collect CSF in a sterile leak-proof plastic screw-cap vial (Sterile cup stock when suitable) and send refrigerated at 2-8 C, or frozen at -20 C on dry ice. Paired serum is preferably collected at the same time, but within 48 hours is acceptable per the cited Quest service area. Label dates/times and specimen sources independently. Confirm local Quest acceptance and any area-specific handling before collection.',
      additionalDrawRequirements: [
        {
          container: 'SST / Gold',
          count: 1,
          specimenType: 'Serum',
          purpose: 'Required paired serum',
          preferredVolume: '1 mL serum',
          minimumVolume: '0.5 mL serum',
          transportContainer: 'Transport Tube',
          transportTemperature: 'Refrigerated',
          spin: 'Yes',
          specialInstructions: 'Required paired serum sample, drawn preferably at the same time as CSF (up to 48 hours apart per the Quest Southwest service-area directory). Allow to clot, centrifuge, transfer serum to labeled plastic transport tube, and refrigerate. Use a separate specimen bag from CSF according to the actual temperature requirements.'
        }
      ],
      source: 'Quest official directory, Southwest service area (DAL), verified 2026-11-16: https://testdirectory.questdiagnostics.com/test/test-detail/7558/igg-synthesis-rate-index-csf?cc=DAL — other service areas require confirmation'
    }
  ];

  // Chain after the existing asynchronous reference loader, and before the app
  // initializes. Failure of this layer must not prevent normal search and cart.
  window.QUEST_MISSING_DIRECTORY_READY = Promise.resolve(window.QUEST_MISSING_DIRECTORY_READY).then(() => {
    const catalog = window.SEED_TESTS;
    if (!Array.isArray(catalog)) throw new Error('Quest catalog missing');
    const byCode = new Map();
    for (const entry of catalog) {
      const code = String(entry.testCode || '').trim();
      if (!byCode.has(code)) byCode.set(code, entry);
    }
    let markedForVerification = 0;
    for (const code of requested) {
      const entry = byCode.get(code);
      if (!entry || entry.status !== 'reference') continue;
      entry.specialInstructions = 'VERIFICATION REQUESTED. ' +
        String(entry.specialInstructions || '').replace(/^VERIFICATION REQUESTED\.\s*/, '');
      markedForVerification++;
    }
    let newlyActivated = 0;
    for (const record of verified) {
      const original = byCode.get(record.testCode);
      if (!original) {
        catalog.push(record);
        byCode.set(record.testCode, record);
        newlyActivated++;
      } else if (original.status === 'reference') {
        Object.assign(original, { ...record, id: original.id });
        newlyActivated++;
        markedForVerification--;
      }
      // An existing active or blocked test takes priority over this layer.
    }
    window.QUEST_REVIEW_REQUESTED_STATS = Object.freeze({
      submitted: requested.size,
      markedForVerification,
      newlyActivated,
      alreadyActiveOrBlocked: [...requested].filter(code => {
        const record = byCode.get(code);
        return record && record.status !== 'reference' &&
          !verified.some(item => item.testCode === code);
      }).length,
      missing: [...requested].filter(code => !byCode.has(code))
    });
    return catalog.length;
  });
})();
