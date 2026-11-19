// Collection requirements reviewed against the Quest MASTER directory.
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  const additions = [
  {
    "id": "quest-directory-next-338",
    "testCode": "338",
    "testName": "Cholinesterase, RBC and Plasma",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "4 mL whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Use two dedicated lavender EDTA draw tubes. Submit one tube unspun for whole blood. Centrifuge the other tube promptly and transfer separated plasma to a separate transport tube. Refrigerate both. For California patients use Quest 90372.",
    "specialLabeling": "",
    "stability": "Room temperature: 24 hours Refrigerated: 7 days Frozen: Unacceptable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/338/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1,
    "additionalDrawRequirements": [
      {
        "specimenType": "Plasma",
        "container": "Lavender EDTA",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL EDTA plasma",
        "minimumVolume": "0.5 mL",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "count": 1,
        "submissionCount": 1,
        "specialInstructions": "Use a dedicated draw tube for the plasma. Separate promptly and refrigerate the plastic transport tube.",
        "specialLabeling": "Label EDTA plasma"
      }
    ]
  },
  {
    "id": "quest-directory-next-16581",
    "testCode": "16581",
    "testName": "BK Virus DNA, Quantitative, Real-Time PCR, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "cobas PCR Media Tube",
    "preferredVolume": "4.3 mL urine",
    "minimumVolume": "4.3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Collect urine in a sterile cup. Immediately transfer to the cobas PCR Media tube. Fill between its black lines and refrigerate. Do not submit neat urine or freeze the media tube.",
    "specialLabeling": "Label urine",
    "stability": "Room temperature: 90 days Refrigerated: 90 days Frozen: Unacceptable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16581/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  },
  {
    "id": "quest-directory-next-18007",
    "testCode": "18007",
    "testName": "Post-Transplant, JC Virus DNA, Real-Time PCR, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL urine",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Submit in the original sterile plastic leak-proof container. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label Urine",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18007/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18009",
    "testCode": "18009",
    "testName": "Post-Transplant, JC Virus DNA, Real-Time PCR, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated serum to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18009/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18010",
    "testCode": "18010",
    "testName": "Post-Transplant, JC Virus DNA, Real-Time PCR, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL plasma",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated plasma to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label EDTA plasma",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18010/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18011",
    "testCode": "18011",
    "testName": "Post-Transplant, JC Virus DNA, Real-Time PCR, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL csf",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Submit in the original sterile plastic leak-proof container. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label CSF",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18011/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18018",
    "testCode": "18018",
    "testName": "Post-Transplant, Herpesvirus 6 DNA, Real-Time PCR, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated serum to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18018/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18020",
    "testCode": "18020",
    "testName": "Post-Transplant, Herpesvirus 6 DNA, Real-Time PCR, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL plasma",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated plasma to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label EDTA plasma",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18020/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18049",
    "testCode": "18049",
    "testName": "Post-Transplant, BK Virus DNA, Real-Time PCR, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated serum to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18049/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18051",
    "testCode": "18051",
    "testName": "Post-Transplant, BK Virus DNA, Real-Time PCR, Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "1 mL whole blood",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Submit the original EDTA whole blood tube. Do not spin or transfer. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "",
    "stability": "Room temperature: 48 hours Refrigerated: 8 days Frozen: Unacceptable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18051/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18052",
    "testCode": "18052",
    "testName": "Post-Transplant, BK Virus DNA, Real-Time PCR, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "cobas PCR Media Tube",
    "preferredVolume": "4.3 mL urine",
    "minimumVolume": "4.3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Collect urine in a sterile cup. Immediately transfer to the cobas PCR Media tube. Fill between its black lines and refrigerate. Do not submit neat urine or freeze the media tube. Confirm the Quest transplant shipper and account before collection. Package separately from routine submissions and document collection date and time on the requisition.",
    "specialLabeling": "Label urine",
    "stability": "Room temperature: 90 days Refrigerated: 90 days Frozen: Unacceptable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18052/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  },
  {
    "id": "quest-directory-next-18066",
    "testCode": "18066",
    "testName": "Post-Transplant, Parvovirus B19 DNA, Real-Time PCR, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated serum to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18066/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18074",
    "testCode": "18074",
    "testName": "Post-Transplant, Herpesvirus 7 DNA, Real-Time PCR, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated serum to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18074/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18076",
    "testCode": "18076",
    "testName": "Post-Transplant, Herpesvirus 7 DNA, Real-Time PCR, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL plasma",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated plasma to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label EDTA plasma",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18076/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18118",
    "testCode": "18118",
    "testName": "Post-Transplant, Adenovirus DNA, Real-Time PCR, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated serum to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18118/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18120",
    "testCode": "18120",
    "testName": "Post-Transplant, Adenovirus DNA, Real-Time PCR, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL plasma",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated plasma to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label EDTA plasma",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18120/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18126",
    "testCode": "18126",
    "testName": "Post-Transplant, Adenovirus DNA, Real-Time PCR, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL urine",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Submit in the original sterile plastic leak-proof container. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label Urine",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18126/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18128",
    "testCode": "18128",
    "testName": "Post-Transplant, Herpesvirus 8 DNA, Real-Time PCR, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated serum to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18128/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18130",
    "testCode": "18130",
    "testName": "Post-Transplant, Herpesvirus 8 DNA, Real-Time PCR, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL plasma",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated plasma to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label EDTA plasma",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18130/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18141",
    "testCode": "18141",
    "testName": "Post-Transplant, Cytomegalovirus DNA, Real-Time PCR, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated serum to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: 48 hours Refrigerated: 8 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18141/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18143",
    "testCode": "18143",
    "testName": "Post-Transplant, Cytomegalovirus DNA, Real-Time PCR, Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "1 mL whole blood",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Submit the original EDTA whole blood tube. Do not spin or transfer. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "",
    "stability": "Room temperature: 48 hours Refrigerated: 8 days Frozen: Unacceptable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18143/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18148",
    "testCode": "18148",
    "testName": "Post-Transplant, Varicella-Zoster Virus DNA, Real-Time PCR, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL csf",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Submit in the original sterile plastic leak-proof container. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label CSF",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18148/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18153",
    "testCode": "18153",
    "testName": "Post-Transplant, Toxoplasma gondii DNA, Qualitative Real-Time PCR, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL plasma",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated plasma to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label EDTA plasma",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18153/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18154",
    "testCode": "18154",
    "testName": "Post-Transplant, Toxoplasma gondii DNA, Qualitative Real-Time PCR, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer separated serum to a dedicated plastic transport tube. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18154/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-18155",
    "testCode": "18155",
    "testName": "Post-Transplant, Toxoplasma gondii DNA, Qualitative Real-Time PCR, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL csf",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Submit in the original sterile plastic leak-proof container. Confirm Quest Specialized Transplant Services account and shipper before collection. Keep refrigerated with cold packs. Repackage in the dedicated transplant shipper, separate from routine orders. Document collection date and time on the requisition.",
    "specialLabeling": "Label CSF",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18155/?cc=MASTER",
    "sourceLinks": [
      {
        "label": "Quest transplant shipper instructions",
        "url": "https://www.questdiagnostics.com/content/dam/corporate/documents/hct-hla-transplant/Shipping-Instruction-Card.pdf"
      }
    ]
  },
  {
    "id": "quest-directory-next-29812",
    "testCode": "29812",
    "testName": "Fructose, Semen",
    "status": "active",
    "specimenType": "Semen",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL fresh semen",
    "minimumVolume": "0.2 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "specialInstructions": "Collect in a plastic leak-proof container. Freeze immediately in the original container and keep frozen for transport. Verify receiving service-area acceptance.",
    "specialLabeling": "Label semen",
    "stability": "Room temperature: Unacceptable Refrigerated: Unacceptable Frozen: 6 months",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/29812/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  },
  {
    "id": "quest-directory-next-30445",
    "testCode": "30445",
    "testName": "Mercury, Fluid",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "4 mL fluid",
    "minimumVolume": "1.8 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Collect and submit provider-collected fluid in an acid-washed or certified trace-metal-free plastic container. Verify receiving service-area acceptance.",
    "specialLabeling": "Label body fluid source",
    "stability": "Room temperature: Undetermined Refrigerated: Undetermined Frozen: Undetermined",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/30445/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  },
  {
    "id": "quest-directory-next-35071",
    "testCode": "35071",
    "testName": "C4 Activation Panel",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and transfer serum to a separate transport tube. Freeze and ship frozen. Collect the EDTA plasma separately.",
    "specialLabeling": "Label serum",
    "stability": "Room temperature: Unacceptable Refrigerated: 4 hours Frozen: 14 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/35071/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1,
    "additionalDrawRequirements": [
      {
        "specimenType": "Plasma",
        "container": "Lavender EDTA",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL EDTA plasma",
        "minimumVolume": "0.5 mL",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "spin": "Yes",
        "count": 1,
        "submissionCount": 1,
        "specialInstructions": "Centrifuge and transfer EDTA plasma to a separate transport tube. Freeze and ship frozen.",
        "specialLabeling": "Label EDTA plasma"
      }
    ]
  },
  {
    "id": "quest-directory-next-36433",
    "testCode": "36433",
    "testName": "Arsenic, 24-Hour Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL aliquot of 24-hour urine",
    "minimumVolume": "3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Use an acid-washed or certified metal-free plastic jug and an acid-washed plastic submission container. Avoid worksite collection. Mix the full collection before taking the aliquot. Verify receiving service-area acceptance.",
    "specialLabeling": "Label 24-hour urine · Trace metal-free",
    "stability": "Room temperature: 48 hours Refrigerated: 5 days Frozen: 14 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36433/?cc=MASTER",
    "preparationInstructions": "Avoid seafood for 48 hours before collection."
  },
  {
    "id": "quest-directory-next-36434",
    "testCode": "36434",
    "testName": "Cadmium, 24-Hour Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL aliquot of 24-hour urine",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialInstructions": "Use an acid-washed or certified metal-free plastic jug and an acid-washed plastic submission container. Avoid worksite collection. Mix the full collection before taking the aliquot. Verify receiving service-area acceptance.",
    "specialLabeling": "Label 24-hour urine · Trace metal-free",
    "stability": "Room temperature: 5 days Refrigerated: 7 days Frozen: 14 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36434/?cc=MASTER"
  },
  {
    "id": "quest-directory-next-36440",
    "testCode": "36440",
    "testName": "Lead, 24-Hour Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL aliquot of 24-hour urine",
    "minimumVolume": "3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Use an acid-washed or certified metal-free plastic jug and an acid-washed plastic submission container. Avoid worksite collection. Mix the full collection before taking the aliquot. Verify receiving service-area acceptance.",
    "specialLabeling": "Label 24-hour urine · Trace metal-free",
    "stability": "Room temperature: 48 hours Refrigerated: 5 days Frozen: 14 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36440/?cc=MASTER"
  },
  {
    "id": "quest-directory-next-36441",
    "testCode": "36441",
    "testName": "Mercury, 24-Hour Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL aliquot of 24-hour urine",
    "minimumVolume": "3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Use an acid-washed or certified metal-free plastic jug and an acid-washed plastic submission container. Avoid worksite collection. Mix the full collection before taking the aliquot. Verify receiving service-area acceptance.",
    "specialLabeling": "Label 24-hour urine · Trace metal-free",
    "stability": "Room temperature: 48 hours Refrigerated: 5 days Frozen: 14 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36441/?cc=MASTER",
    "preparationInstructions": "Avoid seafood for 48 hours before collection."
  },
  {
    "id": "quest-directory-next-36736",
    "testCode": "36736",
    "testName": "PTH, Intact (ICMA) and Ionized Calcium",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1.5 mL EDTA plasma",
    "minimumVolume": "1 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Use EDTA plasma for intact PTH. Centrifuge and transfer to a transport tube, then refrigerate. Keep the ionized calcium tube unopened and at room temperature.",
    "specialLabeling": "Label EDTA plasma for PTH",
    "stability": "EDTA plasma for PTH, Intact Room temperature: 48 hours Refrigerated: 72 hours Frozen: 24 hours Serum for PTH, Intact Room temperature: Unacceptable Refrigerated: Unacceptable Frozen: 28 days Serum for Calcium Room temperature: 7 days Refrigerated: 7 days Frozen: 28 days Serum for Ionized Calcium Room temperature: 7 days Refrigerated: 7 days Frozen: Unacceptable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36736/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1,
    "additionalDrawRequirements": [
      {
        "specimenType": "Serum",
        "container": "SST / Gold",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "count": 1,
        "submissionCount": 1,
        "specialInstructions": "Collect a separate blood specimen for total calcium. Allow clotting, centrifuge, and submit the separated serum refrigerated.",
        "specialLabeling": "Label serum for total calcium"
      },
      {
        "specimenType": "Serum",
        "container": "SST / Gold",
        "transportContainer": "SST / Gold (spun)",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "0.6 mL",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "Yes",
        "count": 1,
        "submissionCount": 1,
        "specialInstructions": "Use a dedicated gel-barrier tube for ionized calcium. After clotting, spin immediately with the cap on. Do not open or transfer. Submit the original spun tube at room temperature.",
        "specialLabeling": "Identify ionized calcium"
      }
    ]
  },
  {
    "id": "quest-directory-next-36964",
    "testCode": "36964",
    "testName": "Sexually-Transmitted Infections (STIs) Male Urethritis Panel",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Aptima Urine Transport Tube",
    "preferredVolume": "2 mL first-catch male urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialInstructions": "Use the male first-catch urine route. Collect the first 20–30 mL without preservative, then transfer 2 mL to the Aptima urine kit within 24 hours. Check the black fill lines. This route is for male patients age 15 and older.",
    "specialLabeling": "Label first-catch male urine",
    "stability": "Room temperature: 14 days Refrigerated: 14 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36964/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  },
  {
    "id": "quest-directory-next-37966",
    "testCode": "37966",
    "testName": "Manganese, 24-Hour Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL aliquot of 24-hour urine",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialInstructions": "Use an acid-washed or certified metal-free plastic jug and an acid-washed plastic submission container. Avoid worksite collection. Mix the full collection before taking the aliquot. Verify receiving service-area acceptance.",
    "specialLabeling": "Label 24-hour urine · Trace metal-free",
    "stability": "Room temperature: 5 days Refrigerated: 14 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/37966/?cc=MASTER"
  },
  {
    "id": "quest-directory-next-38288",
    "testCode": "38288",
    "testName": "Sexually-Transmitted Infections (STIs) Male Urethritis Panel, Expanded",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Aptima Urine Transport Tube",
    "preferredVolume": "2 mL first-catch male urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialInstructions": "Use the male first-catch urine route. Collect the first 20–30 mL without preservative, then transfer 2 mL to the Aptima urine kit within 24 hours. Check the black fill lines. This route is for male patients age 15 and older.",
    "specialLabeling": "Label first-catch male urine",
    "stability": "Room temperature: 14 days Refrigerated: 14 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/38288/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  },
  {
    "id": "quest-directory-next-90106",
    "testCode": "90106",
    "testName": "Eastern Equine Encephalitis Virus Antibody, IFA, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.1 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialInstructions": "Submit the provider-collected CSF in a plastic screw-cap vial at room temperature. Verify receiving service-area acceptance.",
    "specialLabeling": "Label CSF",
    "stability": "Room temperature: 7 days Refrigerated: 14 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/90106/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  },
  {
    "id": "quest-directory-next-90107",
    "testCode": "90107",
    "testName": "St. Louis Encephalitis Virus Antibody, IFA, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.1 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialInstructions": "Submit the provider-collected CSF in a plastic screw-cap vial at room temperature. Verify receiving service-area acceptance.",
    "specialLabeling": "Label CSF",
    "stability": "Room temperature: 7 days Refrigerated: 14 days Frozen: 30 days",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/90107/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  },
  {
    "id": "quest-directory-next-90421",
    "testCode": "90421",
    "testName": "Chromium, Fluid",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "1 mL fluid",
    "minimumVolume": "0.4 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Collect and submit provider-collected fluid in an acid-washed or certified trace-metal-free plastic container. Verify receiving service-area acceptance.",
    "specialLabeling": "Label body fluid source",
    "stability": "Room temperature: Not established Refrigerated: Not established Frozen: Not established",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/90421/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  },
  {
    "id": "quest-directory-next-90438",
    "testCode": "90438",
    "testName": "Cobalt, Fluid",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "1 mL fluid",
    "minimumVolume": "0.4 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Collect and submit provider-collected fluid in an acid-washed or certified trace-metal-free plastic container. Verify receiving service-area acceptance.",
    "specialLabeling": "Label body fluid source",
    "stability": "Room temperature: Not established Refrigerated: Not established Frozen: Not established",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/90438/?cc=MASTER",
    "collectionCount": 1,
    "submissionCount": 1
  }
];
  const existing = new Map(window.SEED_TESTS.map(record => [String(record.testCode || '').trim(), record]));
  for (const record of additions) {
    const prior = existing.get(record.testCode);
    if (!prior) window.SEED_TESTS.push(record);
    else if (prior.status === 'reference' || prior.status === 'pending') {
      Object.assign(prior, record, { id: prior.id || record.id });
    }
  }
})();
