# Quest remaining reference-candidate audit after 92203

**Reviewed:** November 17, 2026. This is the end of the November 16 reference-only worksheet, not a full 100-row batch. It contains **86 candidates, from Quest 92211 through 95512**. **10** routes were activated after verifying source-level requirements; **76** remain reference-only. The historic snapshot file was intentionally not rewritten.

## Guardrails and assumptions

- Honor unsupported local supplies and procedures: no clinic-prepared slides/smears, tissue pathology processing, hair or nails, 6N HCl preserved collection, InSure brush/cards, unavailable Aptima green-label transfer, or specialized kit workflows not stocked/verified.
- Specimens collected in sterile leakproof cups stay **Sterile cup** in draw and submission columns; CSF must be collected by a qualified procedural clinician. Transport Tube remains a transport tube only when explicitly specified.
- All specimens keep source-specific print labels (WHOLE BLOOD, CSF, SPUTUM, or NASOPHARYNGEAL SWAB), without automatic date/time label prose. Do not conflate collection tube with final transport medium.
- Sputum mycobacterial tests are supported **only** when facility/clinician infection-control protocols permit spontaneous expectoration and handling; never plan or perform sputum induction onsite without approved aerosol precautions. Both ship refrigerated in original Sterile cups.
- For Quest tests marked not offered at Nichols SJC, the app instructions require verification of the patient's performing lab and service area.
- Main Quest and published calculator repositories both load the new bundle before calculator initialization. Existing active and blocked test records remain untouched by duplicate guard.

## All 86 reviewed candidate rows

| Code | Test | Result / reason |
|---|---|---|
| `92211` | HPV mRNA E6/E7, SurePath™ Vial reflex HPV 16,18/45 | Special cytology preservative/transfer pathway not confirmed, including prohibited green-label Aptima where applicable |
| `92216` | FISH, MDM2 12q15/CEP 12 | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92285` | MITF-1, IHC with Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92286` | MITF-1, IHC without Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92287` | GATA3, IHC with Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92289` | GATA3, IHC without Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92290` | p40, IHC without Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92291` | p40, IHC with Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92292` | OCT 3/4, IHC without Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92293` | OCT 3/4, IHC with Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92294` | BRAF V600E Mutation, IHC with Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92295` | BRAF V600E Mutation, IHC without Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92299` | Amyloid Beta, IHC without Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92300` | Amyloid Beta, IHC with Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92301` | C-MYC, IHC with Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92302` | C-MYC, IHC without Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92303` | Varicella-Zoster Virus (VZV), IHC without Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92305` | Varicella-Zoster Virus (VZV), IHC with Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92392` | HPV Genotypes 16, 18/45, SurePath™ Vial | Special cytology preservative/transfer pathway not confirmed, including prohibited green-label Aptima where applicable |
| `92433` | ADmark® Alzheimer's Evaluation, CSF | Requires specified Sarstedt low-binding CSF tube, not standard CSF cup |
| `92495` | FISH, Myeloma, Chromosomes CEP 9, 11, 15 | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92687` | Cortisol, LC/MS, Saliva, 3 Samples | Needs dedicated Salivette Cortisol/Super SAL kit and timed multi-sample workflow |
| `92704` | Chromosome Analysis,Amniotic Fluid Reflex to ClariSure®,Oligo-SNP,Prenatal | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92777` | QNatal® Advanced | Requires specialized Streck cell-free DNA blood tubes and prenatal protocol |
| `92807` | HPV Genotypes 16, 18/45, Anal-Rectal | Special cytology preservative/transfer pathway not confirmed, including prohibited green-label Aptima where applicable |
| `92808` | Chromosome Analysis,Chorionic Villus with Reflex to ClariSure®,Oligo-SNP,Prenatal | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `92810` | HPV mRNA E6/E7, Rectal with Reflex to Genotypes, 16, 18/45 | Special cytology preservative/transfer pathway not confirmed, including prohibited green-label Aptima where applicable |
| `93020` | Cortisol, LC/MS, Saliva, 2 Samples | Needs dedicated Salivette Cortisol/Super SAL kit and timed multi-sample workflow |
| `93023` | ELANE Genetic Analysis | Activated, verified specimen route |
| `93029` | Chromosome Analysis and AFP with Reflex to AchE, Fetal Hgb, and Oligo-SNP | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `93101` | HPV mRNA E6/E7, Post-Hysterectomy, Vaginal | Special cytology preservative/transfer pathway not confirmed, including prohibited green-label Aptima where applicable |
| `93102` | HPV Genotypes 16, 18/45, Post-Hysterectomy, Vaginal | Special cytology preservative/transfer pathway not confirmed, including prohibited green-label Aptima where applicable |
| `93131` | Chromosome Analysis and AFP with Reflex to AchE,Fetal Hgb,and Oligo-SNP(NY) | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `93136` | HPV mRNA E6/E7, Post-Hysterectomy, Vaginal with Reflex to HPV 16, 18/45 | Special cytology preservative/transfer pathway not confirmed, including prohibited green-label Aptima where applicable |
| `93196` | Bisphenol A - Total (Conjugated/Unconjugated), Urine | Code-specific sample handling and shipping not verified for available containers |
| `93233` | Solid Tumor Expanded Panel | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `93234` | Solid Tumor Core Panel | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `93279` | PD-L1 Lung (Pembrolizumab or Cemiplimab), IHC | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `93296` | HPV DNA (16,18, Other High Risk), PCR with Reflex to ThinPrep® Automated Pap | Special cytology preservative/transfer pathway not confirmed, including prohibited green-label Aptima where applicable |
| `93305` | Donor, Hepatitis C Antibody (Anti-HCV) | Donor-only or reporting/service code; no routine clinic specimen pathway |
| `93306` | Reproductive Donor Male Panel | Donor-only or reporting/service code; no routine clinic specimen pathway |
| `93307` | Reproductive Donor Female Panel | Donor-only or reporting/service code; no routine clinic specimen pathway |
| `93308` | Donor, Tissue Donor Panel | Donor-only or reporting/service code; no routine clinic specimen pathway |
| `93309` | Donor, Stem Cells Donor Panel | Donor-only or reporting/service code; no routine clinic specimen pathway |
| `93321` | QNatal® Chr 13,18,21, SCA | Requires specialized Streck cell-free DNA blood tubes and prenatal protocol |
| `93359` | PD-L1 Lung (Nivolumab), IHC | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `93400` | DDX-Quality Comprehensive (Current-YTD) | Donor-only or reporting/service code; no routine clinic specimen pathway |
| `93407` | DDX-Risk Comprehensive (Project-CYE) | Donor-only or reporting/service code; no routine clinic specimen pathway |
| `93793` | PD-L1 Non-Lung (Nivolumab), IHC | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `93794` | Borrelia miyamotoi DNA, Real-Time PCR, Tick | Tick specimen collection/handling and routing not confirmed |
| `93802` | Obstetric Panel with Fourth Generation HIV | Serum 7 mL with separate HIV-only specimen and lavender/pink tubes; automated separation/labeling not fully modeled |
| `93974` | Drug Toxicology Methylphenidate, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93975` | Drug Toxicology Monitoring 1, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93976` | Drug Toxicology Alcohol Metabolites, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93977` | Drug Toxicology Amphetamines, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93978` | Drug Toxicology Barbiturates, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93979` | Drug Toxicology Benzodiazepines, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93980` | Drug Toxicology Cocaine, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93981` | Drug Toxicology Marijuana, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93982` | Drug Toxicology MDMA, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93983` | Drug Toxicology Meprobamate, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93984` | Drug Toxicology Methadone, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93985` | Drug Toxicology Naltrexone, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93986` | Drug Toxicology Nicotine, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93987` | Drug Toxicology Opioids, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93988` | Drug Toxicology Phencyclidine, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `93990` | Drug Toxicology Zolpidem, with Confirmation, Oral Fluid | Special oral-fluid toxicology device/workflow not verified |
| `94007` | PD-L1, IHC with Interpretation | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `94088` | Perfluorooctanoic Acid, Blood | Activated, verified specimen route |
| `94221` | Zika Virus RNA, Qualitative TMA Panel, Serum/Urine | Code-specific sample handling and shipping not verified for available containers |
| `94263` | C-Peptide, 24-Hour Urine | Code-specific sample handling and shipping not verified for available containers |
| `94480` | PD-L1 Lung (Atezolizumab), IHC | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `94484` | Expanded Drug Screen, Umbilical Cord Tissue | Umbilical cord tissue collection unsupported |
| `94488` | Comprehensive Drug Screen, Umbilical Cord Tissue | Umbilical cord tissue collection unsupported |
| `94510` | Basic Drug Screen, Umbilical Cord Tissue | Umbilical cord tissue collection unsupported |
| `94531` | Voltage-Gated Potassium Channel (VGKC) Antibody, CSF | Activated, verified specimen route |
| `94577` | Mycobacterium tuberculosis Complex and Rifampin Resistance, PCR, Sputum | Activated, verified specimen route |
| `94578` | Mycobacterium tuberculosis Complex, Rifampin Resistance, Culture/PCR,Sputum | Activated, verified specimen route |
| `94603` | Paraneoplastic Autoantibody Evaluation with Recombx®, CSF | Activated, verified specimen route |
| `94718` | Epidermal Growth Factor Receptor (EGFR) Mutation, Cobas V2, Liquid Biopsy | Liquid biopsy special draw/transport requirements not verified |
| `94719` | Epidermal Growth Factor Receptor (EGFR) Mutation, Cobas V2, Solid Tumor | Tissue, cytology, chromosome, FISH or slide-dependent route not validated for clinic |
| `94958` | Encephalitis Antibody Evaluation with Reflex to Titer and Line Blot, CSF | Activated, verified specimen route |
| `94959` | Epilepsy Antibody Evaluation with Reflex to Titer and Line Blot, CSF | Activated, verified specimen route |
| `94960` | Paraneoplastic Antibody Expanded Evaluation with Reflex to Titer and LB, CSF | Activated, verified specimen route |
| `94973` | Donor, HIV-1/2 plus O Antibody Screen with Reflex to Differentiation | Donor-only or reporting/service code; no routine clinic specimen pathway |
| `95512` | Respiratory Viral Panel, PCR | Activated, verified specimen route |

## Activated source links

- `93023` ELANE Genetic Analysis (Patient/Parental Blood Route): https://testdirectory.questdiagnostics.com/test/test-detail/93023/elane-genetic-analysis?cc=MASTER
- `94088` Perfluorooctanoic Acid (PFOA), Blood: https://testdirectory.questdiagnostics.com/test/test-detail/94088/perfluorooctanoic-acid-blood?cc=MASTER
- `94531` Voltage-Gated Potassium Channel (VGKC) Antibody, CSF: https://testdirectory.questdiagnostics.com/test/test-detail/94531/voltage-gated-potassium-channel-vgkc-antibody-csf?cc=MASTER
- `94577` Mycobacterium tuberculosis Complex and Rifampin Resistance, PCR, Sputum: https://testdirectory.questdiagnostics.com/test/test-detail/94577/mycobacterium-tuberculosis-complex-and-rifampin-resistance-pcr-sputum?cc=MASTER
- `94578` Mycobacterium tuberculosis Complex, Rifampin Resistance, Culture/PCR, Sputum: https://testdirectory.questdiagnostics.com/test/test-detail/94578/mycobacterium-tuberculosis-complex-rifampin-resistance-culturepcrsputum?cc=MASTER
- `94603` Paraneoplastic Autoantibody Evaluation with Recombx, CSF: https://testdirectory.questdiagnostics.com/test/test-detail/94603/paraneoplastic-autoantibody-evaluation-with-recombx-csf?cc=MASTER
- `94958` Encephalitis Antibody Evaluation with Reflex to Titer and Line Blot, CSF: https://testdirectory.questdiagnostics.com/test/test-detail/94958/encephalitis-antibody-evaluation-with-reflex-to-titer-and-line-blot-csf?cc=MASTER
- `94959` Epilepsy Antibody Evaluation with Reflex to Titer and Line Blot, CSF: https://testdirectory.questdiagnostics.com/test/test-detail/94959/epilepsy-antibody-evaluation-with-reflex-to-titer-and-line-blot-csf?cc=MASTER
- `94960` Paraneoplastic Antibody Expanded Evaluation with Reflex to Titer and Line Blot, CSF: https://testdirectory.questdiagnostics.com/test/test-detail/94960/paraneoplastic-antibody-expanded-evaluation-with-reflex-to-titer-and-lb-csf?cc=MASTER
- `95512` Respiratory Viral Panel, PCR: https://testdirectory.questdiagnostics.com/test/test-detail/95512/respiratory-viral-panel-pcr?cc=MASTER

## Deferred notable candidates

- **93802** obstetric panel including HIV is feasible only with an accurate print model for the 7 mL serum total and dedicated HIV-only tube, in addition to separate lavender and pink whole blood. Do not activate with generic serum pooling.
- **92433** Alzheimer's CSF cannot substitute a normal cup or tube for the explicitly required Sarstedt low-bind tube.
- **92687 / 93020** salivary cortisol needs dedicated blue-cap Salivette or approved Super SAL kit for 3 or 2 separate timed specimens.
- **92777 / 93321** QNatal requires specialized Streck cell-free DNA collection tubes.
- **93101** and other cytology-based HPV assays require a confirmed cytology and transfer workflow; no unsupported Aptima kit substitutions.
