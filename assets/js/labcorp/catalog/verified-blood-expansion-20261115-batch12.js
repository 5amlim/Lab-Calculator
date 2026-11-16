/* Verified blood-only expansion batch 12 (2026-11-15), Labcorp.
 * Exact lab catalog codes, collection / submission distinction, source references.
 * Preserve pre-existing validated and blocked profiles. Upgrade only matching pending references.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "labcorp-verified-blood-20261115-batch12-520018",
    "testCode": "520018",
    "testName": "Anti-TPO Ab (RDL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room temperature 7 days; refrigerated 14 days; frozen 60 days",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells within 1 hour, transfer to a labeled plastic Transport Tube, and refrigerate. If shipping frozen, dedicate an individual aliquot to this assay.",
    "source": "Labcorp official directory, reviewed 2026-11-15: https://www.labcorp.com/tests/520018/anti-tpo-ab-rdl"
  },
  {
    "id": "labcorp-verified-blood-20261115-batch12-520023",
    "testCode": "520023",
    "testName": "Anti-PR-3 Ab (RDL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room temperature 7 days; refrigerated 14 days; frozen 60 days",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells within 1 hour, transfer to a labeled plastic Transport Tube, and refrigerate. If shipping frozen, dedicate an individual aliquot to this assay.",
    "source": "Labcorp official directory, reviewed 2026-11-15: https://www.labcorp.com/tests/520023/anti-pr-3-ab-rdl"
  },
  {
    "id": "labcorp-verified-blood-20261115-batch12-163050",
    "testCode": "163050",
    "testName": "Antiglomerular Basement Membrane Antibodies",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top",
    "transportContainer": "SST / Gold (spun)",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "0.6 mL serum",
    "minimumVolume": "0.3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "stability": "Room temperature 14 days; refrigerated 14 days; frozen 14 days",
    "spin": "Yes",
    "specialInstructions": "Allow clotting and centrifuge the SST / Gold; the official directory does not require transfer for gel-barrier serum. Submit the intact, spun SST at room temperature. If a plain red-top is used instead, prepare a separated serum aliquot. Do not confuse with distinct RDL code 520137.",
    "source": "Labcorp official directory, reviewed 2026-11-15: https://www.labcorp.com/tests/163050/antiglomerular-basement-membrane-antibodies"
  },
  {
    "id": "labcorp-verified-blood-20261115-batch12-520158",
    "testCode": "520158",
    "testName": "Anti-Ovary Antibodies by IFA (RDL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room temperature 7 days; refrigerated 14 days; frozen 60 days",
    "spin": "Yes",
    "specialInstructions": "Not approved for use in New York state. Separate serum within 1 hour, transfer to a plastic Transport Tube, and refrigerate. If shipping frozen, submit a dedicated frozen aliquot.",
    "source": "Labcorp official directory, reviewed 2026-11-15: https://www.labcorp.com/tests/520158/anti-ovary-antibodies-by-indirect-fluorescent-antibody-ifa-rdl"
  },
  {
    "id": "labcorp-verified-blood-20261115-batch12-520119",
    "testCode": "520119",
    "testName": "Anti-Pancreatic Antibodies by IFA (RDL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room temperature 7 days; refrigerated 14 days; frozen 60 days",
    "spin": "Yes",
    "specialInstructions": "Not approved for use in New York state. Separate serum within 1 hour, transfer to a plastic Transport Tube, and refrigerate. If shipping frozen, submit a dedicated frozen aliquot.",
    "source": "Labcorp official directory, reviewed 2026-11-15: https://www.labcorp.com/tests/520119/anti-pancreatic-antibodies-by-indirect-fluorescent-antibody-ifa-rdl"
  },
  {
    "id": "labcorp-verified-blood-20261115-batch12-004575",
    "testCode": "004575",
    "testName": "Estradiol by Ionify LC-MS/MS",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top",
    "transportContainer": "SST / Gold (spun)",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "0.75 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room temperature 5 days; refrigerated 14 days; frozen 12 weeks",
    "spin": "Yes",
    "specialInstructions": "Preferred collection is gel-barrier SST / Gold: allow complete clotting, spin, and submit original spun gel tube. Plain red-top and heparin/EDTA plasma are separate alternative routes that require transfer to plastic Transport Tube after centrifugation. Do not mix serum and plasma.",
    "source": "Labcorp official directory, reviewed 2026-11-15: https://www.labcorp.com/tests/004575/estradiol-by-ionify-lc-ms-ms"
  }
];
const comparable=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,' ').split(/\s+/).filter(x=>x.length>2&&!['test','panel','antibody','antibodies','serum','profile'].includes(x));
for(const record of additions){
 const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);
 if(!existing){window.SEED_TESTS.push(record);continue;}
 if(!['pending','reference'].includes(existing.status))continue;
 const a=new Set(comparable(existing.testName)),b=new Set(comparable(record.testName));
 if([...a].filter(x=>b.has(x)).length>=1){Object.assign(existing,record,{id:existing.id||record.id});}
}
})();
