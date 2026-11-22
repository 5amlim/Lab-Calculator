# Quest to LabCorp converter candidate expansion, 2026-11-21

This report compares the **existing published Quest 3,313-test and LabCorp 6,015-test active search indexes**. It does not assert clinically verified or interchangeable orders.

- Previously available candidate mappings (including runtime workbook overrides): **927**.
- New Quest-to-LabCorp indexed candidate mappings: **46** (0 algorithmic exact analyte-token/specimen matches, the remainder individually selected by name/specimen).
- Updated candidate mappings: **973 / 3,313 active Quest codes**.
- Unmapped Quest codes: **2340**.
- Additional review-only references: **26**; these DO NOT output converter codes.

## Newly added candidate pairs

| Quest | Quest test | LabCorp | LabCorp test | Indexed specimen |
|---|---|---|---|---|
| 518 | Hemosiderin Stain, Urine | 829482 | Hemosiderin, Urine | Urine |
| 4451 | Creatine Kinase Isoenzymes (CK Isoenzymes) with Total CK | 002154 | Creatine Kinase (CK), Total Plus Isoenzymes | Serum |
| 4563 | Crystals, Synovial Fluid | 005355 | Crystals, Synovial/Joint Fluid | Synovial Fluid |
| 4668 | Bile Acids, Fractionated and Total | 503640 | Bile Acids, Fractionated and Total, LC/MS-MS | Serum |
| 5165 | Protein S Antigen, Total | 164518 | Protein S, Total | Platelet-poor plasma |
| 5244 | Catecholamines, Fractionated, Random Urine | 316203 | Catecholamines, Fractionated, Urinary Free, Random Urine | Urine |
| 8329 | Titanium, Blood | 792620 | Titanium, Whole Blood | Whole Blood |
| 8636 | Toxoplasma Antibodies (IgG, IgM) | 213561 | Toxoplasma Abs IgG/IgM | Serum |
| 8754 | Protein C Activity with Reflex to Protein C Antigen | 336050 | Protein C Functional With Reflex to Protein C Antigen | Platelet-poor plasma |
| 10197 | Micronutrient, Chromium, Blood | 738820 | Chromium, Blood | Whole Blood |
| 10485 | Toxoplasma gondii Antibodies (IgG, IgM), ELISA, CSF | 828478 | Toxoplasma Abs, IgG/IgM, CSF | CSF |
| 10554 | Galactose-Alpha-1,3-Galactose (Alpha-Gal) IgE | 650001 | Alpha-Gal IgE | Serum |
| 10640 | Beta-2 Transferrin, Body Fluid | 829030 | Beta-2 Transferrin | Body Fluid |
| 10663 | Factor X Activity, Chromogenic | 117904 | Factor X, Chromogenic | Plasma |
| 12198 | Drug Monitoring, Phosphatidylethanol (PEth), Blood | 791584 | Phosphatidylethanol (PEth) | Whole Blood |
| 14881 | Toxoplasma gondii Antibody (IgM), ELISA, CSF | 828739 | Toxoplasma Ab IgM, CSF | CSF |
| 15240 | Coccidioides Antibody, CF and ID, Serum | 835630 | Coccidioides Ab by CF & ID,S | Serum |
| 15319 | Copper, Random Urine | 133440 | Copper, Random Urine | Urine |
| 17656 | Methicillin Resistant Staphylococcus aureus (MRSA), PCR | 182956 | Methicillin-resistant Staphylococcus aureus (MRSA), NAA | Nasal Swab |
| 17674 | Albumin, Random Urine without Creatinine | 149997 | Albumin, Random Urine | Urine |
| 17909 | Prothrombin (Factor II) 20210G→A Mutation Analysis | 511162 | Factor II (Prothrombin) G20210A Mutation Analysis | Whole Blood |
| 18865 | Leflunomide Metabolite | 831984 | Leflunomide Metabolite S/P | Serum |
| 18883 | Everolimus, Blood | 700003 | Everolimus, Whole Blood | Whole Blood |
| 34303 | C1q Antibody (IgG) | 520147 | Anti-C1Q Ab, IgG (RDL) | Serum |
| 35139 | Echovirus Antibody Panel | 823361 | Echovirus Serum Ab Panel | Serum |
| 36555 | Plasminogen Activator Inhibitor (PAI-1) Ag | 146790 | Plasminogen Activator Inhibitor 1 (PAI-1) Antigen | Plasma |
| 36578 | PTH Antibody | 812362 | PTH Ab | Serum |
| 36676 | Carbamazepine-10,11-Epoxide, Serum/Plasma | 716803 | Carbamazepine-10,11 Epoxide | Serum |
| 37094 | Histoplasma Antibody Panel, CF and ID, Serum | 831213 | Histoplasma Ab by CF + ID | Serum |
| 37207 | Toxoplasma Antibody (IgM) | 096651 | Toxoplasma gondii Antibody, IgM | Serum |
| 37508 | Feather Mix IgE (Chicken, Duck, Goose, Turkey) | 823551 | Chicken,Duck,Goose,Turkey IgE | Serum |
| 38149 | Cortisol Response to ACTH Stimulation, Serum | 140761 | Cortisol, ACTH Stimulation | Serum |
| 39344 | Drug Monitoring, Amphetamines, Screen, Urine | 701805 | Amphetamines Screen, Urine | Urine |
| 39352 | Drug Monitoring, Benzodiazepines, Screen, Urine | 770563 | Benzodiazepines Screen,Urine | Urine |
| 90660 | Quinoa IgE | 805913 | Quinoa (Chenopodium quinoa)IgE | Serum |
| 91031 | Soluble Transferrin Receptor | 143305 | Soluble Transferrin Receptor (sTfR) | Serum |
| 91155 | ROMA™ (Risk of Ovarian Malignancy Algorithm) | 140045 | Ovarian Malignancy Risk (ROMA®) | Serum |
| 91212 | Histoplasma Galactomannan Antigen, Urine | 183560 | Histoplasma Galactomannan Antigen EIA, Urine | Urine |
| 91455 | 14-3-3 eta Protein | 504550 | 14-3-3 Eta Protein (Rheumatoid Arthritis) | Serum |
| 91717 | Cardio IQ® Cholesterol, Total | 001065 | Cholesterol, Total | Serum |
| 91719 | Cardio IQ® HDL Cholesterol | 001925 | HDL Cholesterol | Serum |
| 92157 | HLA A,B,C, Class I Typing, Intermediate Resolution | 167116 | HLA A,B,C Intermediate Resolution | Whole Blood |
| 92814 | Cardio IQ® Myeloperoxidase (MPO) | 123006 | Myeloperoxidase (MPO) | Plasma |
| 94345 | Hepatitis C Antibody with Reflex to HCV RNA, PCR with Reflex to Genotype | 144127 | Hepatitis C Virus (HCV) Antibody Cascade to Quantitative PCRand Genotyping | Serum |
| 94570 | Interleukin-5 (IL-5), Plasma | 805269 | IL-5 (plasma)* | Plasma |
| 94621 | 18-Hydroxycorticosterone | 500778 | 18-Hydroxycorticosterone, Serum (Endocrine Sciences) | Serum |

## Method-sensitive pairs held for manual review

| Quest | LabCorp | Why review-only |
|---|---|---|
| 28882 Iron, Total and Total Iron Binding Capacity (REFL) | 001321 Iron and Total Iron-binding Capacity (TIBC) | Method, reporting or panel equivalence not established |
| 15043 Actin (Smooth Muscle) Antibody (IgG) | 006643 Actin (Smooth Muscle) Antibody, ASMA | Method, reporting or panel equivalence not established |
| 14523 Urine Protein, Total, Random without Creatinine | 013664 Protein, Total, Urine | Method, reporting or panel equivalence not established |
| 37801 Fibrinogen Antigen, Nephelometry | 117052 Fibrinogen Antigen | Method, reporting or panel equivalence not established |
| 91743 Cardio IQ® Fibrinogen Antigen, Nephelometry | 117052 Fibrinogen Antigen | Method, reporting or panel equivalence not established |
| 29816 Tissue Plasminogen Activator (TPA), EIA | 146010 Tissue Plasminogen Activator (tPA) Antigen | Method, reporting or panel equivalence not established |
| 37959 Herpesvirus 8 IgG Antibody, IFA | 841155 Herpesvirus-8 IgG Antibody | Method, reporting or panel equivalence not established |
| 4990 Hepatitis D Virus (HDV) Antibody, Total | 144012 Hepatitis D Virus (HDV) Antibody, IgG and IgM | Method, reporting or panel equivalence not established |

## Safety rules

- Candidate pairs have matching indexed specimen labels, and align by analyte, panel or marker. A candidate is NOT an approved clinical equivalent.
- Never substitute a reflex direction, antibody isotype, qualitative vs quantitative method, panel component set, timed vs random urine, or analytical method solely from a similar name.
- The converter uses only candidate pairs; review-only names do not generate LabCorp codes.
- The actual LabCorp cart still independently requires an active test entry with approved specimen-collection instructions.
- Existing collecting rules, filters, temperatures, specimen pooling, and Do Not Perform lists were not changed.

Source indexes: `assets/search/quest-tests.json`, `assets/search/labcorp-tests.json`. Baseline source: `audits/quest-all-3313-crosswalk-20261121.csv`.
