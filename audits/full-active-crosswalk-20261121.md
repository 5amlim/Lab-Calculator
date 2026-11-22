# Full active Quest and LabCorp crosswalk, November 21, 2026
## Scope
Two current published calculator search indexes were compared by exact code inventory, specimen type, analyte identity, method/antibody class, and conservative candidate selection. Index coverage is complete, not a claim that these are every test available nationally in either official external directory.
- **Quest:** 3313 active indexed codes, all represented.
- **LabCorp:** 6015 active indexed codes, all represented in reverse comparison.
- **Quest legacy:** 8 older records not in current active Quest index, preserved separately and not assigned fresh order codes.
- **Quest uncoded reference:** 1 older placeholder `XXX`, not counted as an active code.
- **Uncoded workbook references:** 15 supplemental entries, separate from the active catalogs.
- **New selected candidate pairs:** 74 (38 exact normalized analyte+specimen, 36 targeted analyte/specimen checks).
- **Active Quest possible cross-references:** 927 of 3313; **active Quest unmapped:** 2386.
- **LabCorp codes with at least one possible Quest reference:** 908 of 6015; **without confirmed cross-reference:** 5107 (some have related-name review candidates).
- **Unmapped Quest entries with related-name review queue:** 86; **LabCorp review-only entries:** 76.
- **Legacy Quest possible matches retained:** 2; **uncoded workbook mapped suggestions retained:** 9.
- **Total possible mapped comparison rows including historical/workbook:** 938.
## Interpretation
*Possible match* means a catalog candidate needing clinical verification, not an interchangeable order or approved collecting protocol. *Review* means a similar name only, not a cross-lab match. *Unmapped* means no supportable candidate was assigned. Multiple analytes, panels/reflexes, immunoglobulin classes, specimen matrices, random versus 24-hour urine, special culture sites, and analytical methods must be checked against official directories before use.
Quest official Test Directory: https://testdirectory.questdiagnostics.com/
LabCorp official search: https://www.labcorp.com/test-menu/search
The numbers here describe **current repository active indexes**, not all publicly marketed tests across labs or markets. No active catalog, Do Not Perform policy, tube calculation, temperature, transfer, or collection instruction was altered. Stale Quest codes remain identified as legacy rather than silently dropped.
## Full row-level audits
- `audits/quest-all-3313-crosswalk-20261121.csv`: every active Quest code, the legacy references, uncoded source row and workbook references.
- `audits/labcorp-all-6015-crosswalk-20261121.csv`: every LabCorp active code and possible/related Quest references.
## Added candidates
- Quest 229 (Aldosterone, 24-Hour Urine) -> LabCorp 004291 (Aldosterone, 24-Hour Urine), exact indexed candidate
- Quest 264 (Antimony, Urine) -> LabCorp 833930 (Antimony, Urine), exact indexed candidate
- Quest 381 (Creatinine, 24-Hour Urine) -> LabCorp 003012 (Creatinine, 24-Hour Urine), exact indexed candidate
- Quest 494 (Gold, Urine) -> LabCorp 804955 (Gold, Urine), exact indexed candidate
- Quest 497 (Gram Stain) -> LabCorp 008540 (Gram Stain), exact indexed candidate
- Quest 585 (Lactic Acid, Plasma) -> LabCorp 004770 (Lactic Acid, Plasma), exact indexed candidate
- Quest 592 (Creatine, 24-Hour Urine) -> LabCorp 003475 (Creatine, 24-Hour Urine), exact indexed candidate
- Quest 601 (Lead, Urine) -> LabCorp 070181 (Lead, Urine), exact indexed candidate
- Quest 672 (Cadmium, Random Urine) -> LabCorp 072717 (Cadmium, Random Urine), exact indexed candidate
- Quest 1659 (Lactic Acid, CSF) -> LabCorp 122408 (Lactic Acid, CSF), exact indexed candidate
- Quest 3356 (Boron, Blood) -> LabCorp 082728 (Boron, Blood), exact indexed candidate
- Quest 4446 (Culture, Aerobic and Anaerobic) -> LabCorp 008003 (Anaerobic and Aerobic Culture), exact indexed candidate
- Quest 6054 (Barium, Urine) -> LabCorp 811570 (Barium, Urine), exact indexed candidate
- Quest 6057 (Beryllium, Urine) -> LabCorp 808540 (Beryllium, Urine), exact indexed candidate
- Quest 6325 (Tin Total, Urine) -> LabCorp 825380 (Tin-Total, Urine), exact indexed candidate
- Quest 6346 (Homovanillic Acid (HVA), Random Urine) -> LabCorp 120246 (Homovanillic Acid (HVA), Random Urine), exact indexed candidate
- Quest 7943 (Creatinine Clearance) -> LabCorp 003004 (Creatinine Clearance), exact indexed candidate
- Quest 8280 (Albumin, Timed Urine) -> LabCorp 140053 (Albumin, Timed Urine), exact indexed candidate
- Quest 8321 (Molybdenum, RBC) -> LabCorp 247404 (Molybdenum, RBC), exact indexed candidate
- Quest 8330 (Titanium, Urine) -> LabCorp 825646 (Titanium, Urine), exact indexed candidate
- Quest 8835 (Thallium, Urine) -> LabCorp 706580 (Thallium, Urine), exact indexed candidate
- Quest 10153 (Candida auris Surveillance, Qualitative PCR, Axilla/Groin) -> LabCorp 140092 (Candida auris, Surveillance, Qualitative PCR, Axilla/Groin), exact indexed candidate
- Quest 11010 (Bird and Mold Precipitin Panel II) -> LabCorp 823472 (Bird/Mold Precipitin Panel II), exact indexed candidate
- Quest 11262 (Factor H (B1H) Level) -> LabCorp 851600 (Factor H (B1H) Level), exact indexed candidate
- Quest 14534 (Cortisol, Free, 24-Hour Urine) -> LabCorp 500410 (Free Cortisol, 24-Hour Urine), exact indexed candidate
- Quest 14590 (Chromosome Analysis, Amniotic Fluid) -> LabCorp 052040 (Chromosome Analysis, Amniotic Fluid), exact indexed candidate
- Quest 15060 (Adiponectin) -> LabCorp 004650 (Adiponectin), exact indexed candidate
- Quest 16602 (Iodine, 24-Hour Urine) -> LabCorp 070222 (Iodine, 24-Hour Urine), exact indexed candidate
- Quest 17515 (Iron, 24-Hour Urine) -> LabCorp 087238 (Iron, 24-Hour Urine), exact indexed candidate
- Quest 17698 (Adenosine Deaminase, CSF) -> LabCorp 830899 (Adenosine Deaminase CSF), exact indexed candidate
- Quest 30290 (Silver, Urine) -> LabCorp 802266 (Silver, Urine), exact indexed candidate
- Quest 34500 (GALOP™ Autoantibody Test) -> LabCorp 817740 (Galop Autoantibody Test), exact indexed candidate
- Quest 34698 (Uranium, Urine) -> LabCorp 808567 (Uranium, Urine), exact indexed candidate
- Quest 35694 (Mineral Profile, RBCs) -> LabCorp 819845 (Mineral Profile, RBCs), exact indexed candidate
- Quest 38155 (Opiate, Confirmation, Meconium) -> LabCorp 809175 (Opiate Confirmation, Meconium), exact indexed candidate
- Quest 59183 (BasoFunction™ HRT Tartrazine) -> LabCorp 826007 (Tartrazine - BasoFunction HRT), exact indexed candidate
- Quest 94263 (C-Peptide, 24-Hour Urine) -> LabCorp 003236 (C-Peptide, 24-Hour Urine), exact indexed candidate
- Quest 94675 (Lactate Dehydrogenase (LD), Body Fluid) -> LabCorp 100156 (Lactate Dehydrogenase (LD), Body Fluid), exact indexed candidate
- Quest 208 (Prostatic Acid Phosphatase (PAP)) -> LabCorp 004747 (Prostatic Acid Phosphatase (PAP), Serum), selected indexed candidate
- Quest 278 (Beryllium, Blood) -> LabCorp 811752 (Beryllium, Whole Blood), selected indexed candidate
- Quest 461 (Fibrinogen Activity, Clauss) -> LabCorp 001610 (Fibrinogen Activity), selected indexed candidate
- Quest 480 (Neisseria gonorrhoeae (GC) Culture) -> LabCorp 008128 (GC (Neisseria gonorrhoeae) Culture Only), selected indexed candidate
- Quest 577 (Isoniazid, Level) -> LabCorp 808376 (Isoniazid, Serum or Plasma), selected indexed candidate
- Quest 726 (Porphobilinogen, Quantitative, 24-Hour Urine) -> LabCorp 003103 (Porphobilinogen (PBG), Quantitative, 24-Hour Urine), selected indexed candidate
- Quest 750 (Protein Electrophoresis, 24-Hour Urine (UPEP)) -> LabCorp 003368 (Protein Electrophoresis, 24-Hour Urine), selected indexed candidate
- Quest 934 (VMA (Vanillylmandelic Acid), 24-Hour Urine without Creatinine) -> LabCorp 004143 (Vanillylmandelic Acid (VMA), 24-Hour Urine), selected indexed candidate
- Quest 3333 (Hydroxychloroquine, Blood) -> LabCorp 504814 (Hydroxychloroquine, Whole Blood), selected indexed candidate
- Quest 3500 (Nickel, Blood) -> LabCorp 790396 (Nickel, Whole Blood), selected indexed candidate
- Quest 5215 (Nickel, Random Urine) -> LabCorp 071563 (Nickel, Urine), selected indexed candidate
- Quest 5617 (Streptococcus Group B Culture) -> LabCorp 188130 (Group B Streptococcus Colonization Detection Culture), selected indexed candidate
- Quest 6736 (Cortisol, 4 Specimens) -> LabCorp 026948 (Cortisol, Four Specimens), selected indexed candidate
- Quest 10287 (C3 Nephritic Factor, Serum) -> LabCorp 224441 (C3 Nephritic Factor), selected indexed candidate
- Quest 10666 (Toxoplasma gondii (IgG), ELISA, CSF) -> LabCorp 833737 (Toxoplasma Gondii CSF IgG), selected indexed candidate
- Quest 11233 (Kappa/Lambda Light Chains, Free with Ratio, Random Urine) -> LabCorp 121228 (Free Kappa and Lambda Light Chains Plus Ratio, Quantitative, Urine), selected indexed candidate
- Quest 12734 (FIB-4 Index Panel with Reflex to Enhanced Liver Fibrosis (ELF) Score) -> LabCorp 402175 (FIB-4 With Reflex to Enhanced Liver Fibrosis (ELF)), selected indexed candidate
- Quest 16186 (HIV-1 RNA, Quantitative, Real-Time PCR, CSF) -> LabCorp 550410 (HIV-1 RNA, Quantitative PCR, CSF), selected indexed candidate
- Quest 17198 (Porphyrins, Fractionated, Quantitative and Porphobilinogen, 24-Hour Urine) -> LabCorp 370504 (Porphobilinogen and Quantitative Porphyrins, 24-Hour Urine), selected indexed candidate
- Quest 17696 (Adenosine Deaminase, Pleural Fluid) -> LabCorp 830893 (Adenosine Deaminase, Pl Fluid), selected indexed candidate
- Quest 17697 (Adenosine Deaminase, Peritoneal Fluid) -> LabCorp 830896 (Adenosine Deaminase,Peritoneal), selected indexed candidate
- Quest 18090 (Post-Transplant, Epstein-Barr Virus DNA, Quantitative Real-Time PCR, Blood) -> LabCorp 139490 (Epstein-Barr Virus (EBV), Quantitative DNA PCR, Whole Blood), selected indexed candidate
- Quest 18844 (Measles (Rubeola) IgG Antibodies, IFA, CSF) -> LabCorp 828689 (Measles (Rubeola) Ab IgG, CSF), selected indexed candidate
- Quest 19548 (Metanephrines, Fractionated, Free, LC/MS/MS, Plasma) -> LabCorp 121806 (Metanephrines, Fractionated, Plasma Free), selected indexed candidate
- Quest 22345 (Glutathione, Total, Blood) -> LabCorp 007700 (Glutathione, Total (Whole Blood)), selected indexed candidate
- Quest 34164 (Cysticercus Antibody (IgG), ELISA, CSF) -> LabCorp 832400 (Cysticercus IgG ELISA, CSF), selected indexed candidate
- Quest 34692 (Angiotensin Converting Enzyme (ACE), CSF) -> LabCorp 123231 (Angiotensin Converting Enzyme (ACE), Cerebrospinal Fluid), selected indexed candidate
- Quest 35378 (Copper, Blood) -> LabCorp 081041 (Copper, Whole Blood), selected indexed candidate
- Quest 36597 (West Nile Virus Antibodies (IgG, IgM), CSF) -> LabCorp 138966 (West Nile Virus (WNV) Antibody, IgG and IgM, CSF), selected indexed candidate
- Quest 37314 (Babesia microti DNA, Real-Time PCR) -> LabCorp 138318 (Babesia sp., DNA PCR (B. microti)), selected indexed candidate
- Quest 37476 (Echovirus Antibodies, CSF) -> LabCorp 804686 (Echovirus CSF Antibody Panel), selected indexed candidate
- Quest 38583 (Molybdenum, Blood) -> LabCorp 247800 (Molybdenum, Whole Blood), selected indexed candidate
- Quest 39527 (Homovanillic Acid (HVA), 24-Hour Urine with Creatinine) -> LabCorp 340337 (Creatinine and Homovanillic Acid (HVA), 24-Hour Urine), selected indexed candidate
- Quest 90417 (Methicillin Resistant Staphylococcus aureus (MRSA) Culture Screen) -> LabCorp 183467 (Methicillin-resistant Staphylococcus aureus (MRSA)Colonization Screening Culture), selected indexed candidate
- Quest 90861 (Coccidioides Serology Panel, CSF) -> LabCorp 823988 (Coccidioides Abs Panel, CSF), selected indexed candidate
- Quest 94088 (Perfluorooctanoic Acid (PFOA), Blood) -> LabCorp 802180 (Perfluorooctanoic Acid, Blood), selected indexed candidate
