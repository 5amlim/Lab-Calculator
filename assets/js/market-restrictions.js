/* Explicit, source-backed geographic restrictions only.
   Patient-state codes are not evidence of routine acceptance by any receiving lab.
   Unknown codes never receive a region badge. */
(() => {
  'use strict';

  const QUEST = Object.freeze({
    '16867': { label: 'Not for NY patients', detail: 'Quest selenium random urine with creatinine code 16867 is only for non-New York patients. NY uses code 8829 with refrigerated transport.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/16867/selenium-random-urine-with-creatinine?cc=MASTER&p=r' },
    '14573': { label: 'Not for NY patients', detail: 'Quest explicitly states that Heavy Metals Comprehensive Panel, Urine (14573) is not available for New York patient testing.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/14573/heavy-metals-comprehensive-panel-urine?cc=MASTER&p=r' },
    '12598': { label: 'Not for NY patients', detail: 'Quest explicitly states encephalitis antibody panel, CSF (12598) is not available for New York patient testing.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/12598/encephalitis-antibody-panel-csf?cc=MASTER&p=r' },
    '12600': { label: 'Not for NY patients', detail: 'Quest explicitly states meningoencephalitis panel, CSF (12600) is not available for New York patient testing.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/12600/meningoencephalitis-encephalitis-panel-csf?cc=MASTER&p=r' },
    '6060': { label: 'Not for NY patients', detail: 'Quest code 6060 is for non-New York patients. For New York use Quest code 13722, after verifying local acceptance.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/6060/bismuth-random-urine-with-creatinine?cc=MASTER&p=r' },
    '6183': { label: 'Not for NY patients', detail: 'Quest code 6183 is for non-New York patients. For New York use Quest code 13723, after verifying local acceptance.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/6183/manganese-random-urine-with-creatinine?cc=MASTER&p=r' },
    '3107': { label: 'Unavailable in NY', detail: 'Quest states that Metals/Metalloids Panel 1, Hair is not available for New York patient testing. Confirm receiving service-area acceptance elsewhere.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/3107/metalsmetalloids-hair-panel-1?cc=MASTER' },
    '3256': { label: 'Unavailable in NY', detail: 'Quest states that Thallium, Nails is not available for New York patient testing. Confirm receiving service-area acceptance elsewhere.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/3256/thallium-nails?cc=MASTER' },
    '3348': { label: 'Unavailable in NY', detail: 'Quest states that Zinc, Nails is not available for New York patient testing. Confirm receiving service-area acceptance elsewhere.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/3348/zinc-nails-?cc=MASTER' },
    '3386': { label: 'Unavailable in NY', detail: 'Quest states that Selenium, Hair is not available for New York patient testing. Confirm receiving service-area acceptance elsewhere.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/3386/selenium-hair?cc=MASTER' },
    '3411': { label: 'Unavailable in NY', detail: 'Quest states that Thallium, Hair is not available for New York patient testing. Confirm receiving service-area acceptance elsewhere.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/3411/thallium-hair?cc=MASTER' },
    '3419': { label: 'Unavailable in NY', detail: 'Quest states that Lead, Nails is not available for New York patient testing. Confirm receiving service-area acceptance elsewhere.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/3419/lead-nails?cc=MASTER' },
    '17321': { label: 'Unavailable in NY', detail: 'Quest states that quantitative stool lactoferrin is not available for New York patient testing. Confirm service-area acceptance in other states.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/17321?cc=MASTER' },
    '90368': { label: 'CA patients only', detail: 'California patient code. For non-California patient testing, Quest specifies 335.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/335/cholinesterase-plasma?cc=MASTER' },
    '90369': { label: 'CA patients only', detail: 'California patient code. For non-California patient testing, Quest specifies 39481.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/39481/cholinesterase-serum-plasma-rbc?cc=MASTER' },
    '90372': { label: 'CA patients only', detail: 'California patient code. For non-California patient testing, Quest specifies 338.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/90372/?cc=MASTER' },
    '335': { label: 'Not for CA patients', detail: 'For California patient testing use Quest 90368.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/335/cholinesterase-plasma?cc=MASTER' },
    '39481': { label: 'Not for CA patients', detail: 'For California patient testing use Quest 90369.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/39481/cholinesterase-serum-plasma-rbc?cc=MASTER' },
    '16167': { label: 'Not for CA or NY', detail: 'Quest says this code is unavailable for California patients. New York patients use code 16966.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/16167/?cc=SKB' },
    '16973': { label: 'NY patients only', detail: 'For non-New York patient testing, Quest specifies code 16165.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/16973/?cc=MASTER' },
    '17329': { label: 'NY patients only', detail: 'For non-New York patient testing, Quest specifies code 36420.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/17329/lymphocyte-subset-panel-2-ny?cc=MASTER' },
    '17332': { label: 'NY patients only', detail: 'For non-New York patient testing, Quest specifies code 8360.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/17332/lymphocyte-subset-panel-5-ny?cc=MASTER' },
    '16924': { label: 'Not for NY patients', detail: 'For New York patient testing, Quest specifies code 16925.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/16924/accutype-cp-clopidogrel-cyp2c19-genotype?cc=MASTER' },
    '16592': { label: 'Unavailable in NY', detail: 'Quest states that fetal RHD gene detection is not available for New York patient testing.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/16592?cc=MASTER' },
    '19769': { label: 'Unavailable in NY', detail: 'Quest states that HHV-7 DNA PCR is not available for New York patient testing.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/19769/herpes-virus-7-dna-qualitative-real-time-pcr?cc=MASTER' },
    '16866': { label: 'Unavailable in NY', detail: 'Quest states that 24-hour urine selenium is not available for New York patient testing.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/16866/selenium-24-hour-urine?cc=MASTER' },
    '15384': { label: 'Unavailable in NY', detail: 'Quest states that rheumatoid factor screen with reflex to titer on synovial fluid is unavailable for New York patient testing.', url: 'https://testdirectory.questdiagnostics.com/test/test-detail/15384/rheumatoid-factor-screen-with-reflex-to-titer-synovial-fluid?cc=MASTER' }
  });
  const LABCORP = Object.freeze({
    '139144': { label: 'Unavailable in NY', detail: 'Labcorp states that quantitative CMV urine PCR is not approved for use in New York state.', url: 'https://www.labcorp.com/tests/139144/cytomegalovirus-cmv-quantitative-urine-pcr' },
    '791280': { label: 'Unavailable in CA / NY', detail: 'Labcorp states this filter-paper blood lead test is unavailable in California and New York.', url: 'https://www.labcorp.com/tests/791280/lead-blood-filter-paper' }
  });

  function entry(test, lab) {
    if (!test) return null;
    const code = String(test.testCode ?? '').trim();
    return (String(lab).toLowerCase() === 'labcorp' ? LABCORP : QUEST)[code] || null;
  }
  function escape(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    })[char]);
  }
  function badge(test, lab) {
    const flag = entry(test, lab);
    if (!flag) return '';
    return '<span class="regional-restriction-badge" title="' + escape(flag.detail) + '" aria-label="Regional restriction: ' +
      escape(flag.label + '. ' + flag.detail) + '">' + escape(flag.label) + '</span>';
  }
  function printNotice(tests, lab) {
    const listed = new Map();
    for (const test of tests || []) {
      const flag = entry(test, lab);
      if (!flag) continue;
      listed.set(String(test.testCode), { test, flag });
    }
    if (!listed.size) return '';
    return '<section class="regional-restriction-print" aria-label="Regional test restrictions">' +
      '<strong>Regional test restrictions</strong><ul>' +
      [...listed.values()].map(({test,flag}) =>
        '<li><b>' + escape(test.testCode) + ' · ' + escape(test.testName) + ':</b> ' +
        escape(flag.label) + '. ' + escape(flag.detail) + '</li>').join('') +
      '</ul><p>Check current receiving-lab and account acceptance before collection.</p></section>';
  }
  window.LabRegionalRestrictions = Object.freeze({ entry, badge, printNotice });
})();