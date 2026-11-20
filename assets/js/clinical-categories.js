/* Lab clinical search categories. Derived from assay names, never collection instructions. */
(() => {
 'use strict';
 const data = [
 ['allergy','Allergy','allergies|allergen|ige testing',/\b(?:allergy|allergen|allergens|allergic|ige|immunoglobulin e|tryptase|histamine)\b/],
 ['autoimmune','Autoimmune & Rheumatology','rheumatology|rheumatoid|lupus',/\b(?:ana|antinuclear|anti nuclear|dsdna|anti ds dna|anti ccp|rheumatoid factor|lupus|sjogren|scleroderma|anca|myositis|anti rnp|anti ro|anti la|hla b27|autoimmune|autoantibody|autoantibodies|rheumatologic)\b/],
 ['blood-bank','Blood Bank','immunohematology|blood typing',/\b(?:abo|rh typing|abo rh|blood type|blood group|antibody screen|antibody identification|crossmatch|coombs|direct antiglobulin)\b/],
 ['body-fluids','Body Fluid Testing','body fluid|body fluids|fluid analysis|csf studies',/\b(?:body fluid|peritoneal fluid|pericardial fluid|pleural fluid|synovial fluid|cerebrospinal fluid|csf|ascites|ascitic fluid)\b/],
 ['cardiac','Cardiac','heart|cardiology',/\b(?:troponin|bnp|nt pro bnp|natriuretic peptide|ck mb|myoglobin|heart failure|cardiac risk|hs crp|high sensitivity crp|lipoprotein a)\b/],
 ['chemistry','General Chemistry','chemistry|clinical chemistry|enzyme levels',/\b(?:calcium|oxalate|oxalic acid|lactate dehydrogenase|ldh|total protein|protein total|albumin|electrolyte|creatine kinase|uric acid|alkaline phosphatase)\b/],
 ['coagulation','Coagulation','coag|clotting|hemostasis|thrombosis',/\b(?:pt inr|prothrombin time|partial thromboplastin|aptt|ptt|d dimer|fibrinogen|fibrin degradation|von willebrand|thrombophilia|lupus anticoagulant|antithrombin|protein c activity|protein s activity|factor v leiden|coagulation|platelet function|(?<!growth )factor (?:ii|v|vii|viii|ix|x|xi|xii|xiii|\d+))\b/],
 ['diabetes','Diabetes & Metabolic','metabolic|blood sugar|glucose testing',/\b(?:glucose|a1c|glycated hemoglobin|hemoglobin a1c|insulin(?! like)|c peptide|fructosamine|diabetes|metabolic panel|ketones|beta hydroxybutyrate|lactic acid|lactate(?! dehydrogenase))\b/],
 ['endocrinology','Endocrinology & Hormones','endocrine|hormones|hormone',/\b(?:cortisol|acth|adrenocorticotropic|aldosterone|renin|testosterone|estradiol|estrone|estriol|estrogen|progesterone|prolactin|dhea|androstenedione|amh|anti mullerian|follicle stimulating|luteinizing|growth hormone|igf 1|parathyroid|pth|insulin|c peptide|thyroid|tsh|thyroxine|triiodothyronine|free t4|free t3|shbg|fsh|lh)\b/],
 ['heavy-metals','Environmental & Heavy Metals','environmental|heavy metals|heavy metal|trace metals',/\b(?:lead|mercury|arsenic|cadmium|cobalt|chromium|selenium|aluminum|aluminium|nickel|manganese|toxic metals|heavy metals)\b/],
 ['gi','Gastrointestinal (GI)','gastrointestinal|gastro|digestive|stool testing',/\b(?:gastrointestinal|gi pathogen|stool|fecal|faecal|calprotectin|lactoferrin|pancreatic elastase|h pylori|helicobacter|c difficile|clostridioides|enteric|occult blood|ova and parasites|fecal fat|bile acids|malabsorption)\b/],
 ['genetics','Genetics & Molecular','genetic|molecular genetics|dna testing',/\b(?:genetic analysis|genetics|gene panel|gene mutation|gene sequencing|mutation analysis|genotype|genotyping|chromosome|karyotype|microarray|carrier screening|hereditary|brca|fragile x|cystic fibrosis mutation|pharmacogenetic|pharmacogenomic|snp)\b/],
 ['hematology','Hematology','blood count|blood counts',/\b(?:cbc|complete blood count|red blood cell|white blood cell|rbc count|wbc count|platelet count|cell count|cell count and differential|differential cell count|reticulocyte|sed rate|haptoglobin|eosinophil count|hematocrit|haematocrit|hemoglobin|haemoglobin|hemoglobinopathy|anemia|anaemia|thalassemia|sickle cell|peripheral smear|sedimentation rate|esr)\b/],
 ['hepatic','Hepatic & Pancreatic','liver|pancreatic|pancreas',/\b(?:hepatic|liver|alt|ast|alanine aminotransferase|aspartate aminotransferase|bilirubin|alkaline phosphatase|ggt|gamma glutamyl|amylase|lipase|pancreatic|pancreatitis)\b/],
 ['immunology','Immunology','immune function|immunodeficiency',/\b(?:immunoglobulin|igm|igg|iga|ige|complement|cd4|cd8|lymphocyte subset|lymphocyte enumeration|immune deficiency|immunodeficiency|vaccine antibody|tetanus antitoxoid|diphtheria antitoxoid)\b/],
 ['infectious','Infectious Disease','infectious|infection|id testing',/\b(?:hiv|hepatitis|syphilis|treponema|chlamydia|gonorrhea|gonorrhoeae|trichomonas|hsv|herpes simplex|ebv|epstein barr|cmv|cytomegalovirus|lyme|borrelia|bartonella|babesia|rickettsia|tuberculosis|quantiferon|t spot|influenza|rsv|sars cov|covid|measles|mumps|rubella|varicella|pertussis|streptococcus|strep|legionella|cryptococcus|histoplasma|blastomyces|coccidioides|giardia|cryptosporidium|salmonella|shigella|campylobacter|c difficile|clostridioides|bacterial|fungal|viral|microbial|pathogen)\b/],
 ['iron-anemia','Iron & Anemia','iron studies|anemia|anaemia|ferritin',/\b(?:iron|ferritin|transferrin|tibc|binding capacity|soluble transferrin receptor|anemia|anaemia|reticulocyte|vitamin b12|cobalamin|folate|folic acid|methylmalonic acid)\b/],
 ['lipids','Lipids & Cardiovascular Risk','lipid|cholesterol|cardiovascular risk|cv risk',/\b(?:lipid|cholesterol|triglycerides|apolipoprotein|apob|apo a|lipoprotein|nmr lipoprofile|ldl|hdl|cardio iq|hs crp|high sensitivity crp)\b/],
 ['microbiology','Microbiology & Cultures','culture|cultures|bacteriology|mycology',/\b(?:culture|microbiology|bacterial identification|bacterial susceptibility|gram stain|fungal stain|mycobacterial|acid fast bacilli|afb|mrsa|vre)\b/],
 ['neurology','Neurology','neurological|neuro',/\b(?:neurologic|neurological|encephalitis|myasthenia|acetylcholine receptor|musk antibody|neurofilament|oligoclonal bands|csf|cerebrospinal fluid|paraneoplastic neurologic|alzheimer|amyloid beta|tau protein)\b/],
 ['oncology','Oncology & Tumor Markers','tumor markers|cancer|tumour markers',/\b(?:psa|prostate specific antigen|cea|carcinoembryonic|ca 125|ca 19 9|ca 15 3|alpha fetoprotein|afp|tumor marker|tumour marker|cancer antigen|beta 2 microglobulin|her2|bcr abl)\b/],
 ['parasitology','Parasitology','parasites|parasite|ova and parasites',/\b(?:parasite|parasitic|ova and parasites|giardia|cryptosporidium|cyclospora|strongyloides|schistosoma|toxoplasma|entamoeba|malaria|plasmodium)\b/],
 ['pregnancy','Pregnancy & Prenatal','prenatal|maternal|obstetric',/\b(?:pregnancy|prenatal|maternal|hcg|chorionic gonadotropin|quad screen|first trimester|second trimester|neural tube defect|nipt|cell free fetal|group b strep)\b/],
 ['renal','Renal & Electrolytes','kidney|electrolytes|electrolyte',/\b(?:renal|kidney|creatinine|bun|urea nitrogen|egfr|cystatin c|sodium|potassium|chloride|bicarbonate|carbon dioxide|magnesium|phosphorus|phosphate|calcium|oxalate|oxalic acid|hyperoxaluria|protein creatinine|albumin creatinine|uric acid|metabolic panel)\b/],
 ['reproductive','Reproductive & Fertility','fertility|reproductive hormones',/\b(?:fertility|ovarian|ovulation|semen|sperm|anti mullerian|amh|follicle stimulating|luteinizing|fsh|lh|progesterone|estradiol|testosterone|shbg|sex hormone binding)\b/],
 ['respiratory','Respiratory','pulmonary|resp',/\b(?:respiratory|influenza|flu a|flu b|rsv|respiratory syncytial|covid|sars cov|pertussis|pneumonia|legionella|mycoplasma pneumoniae|upper respiratory|nasopharyngeal)\b/],
 ['sti','STI / STD','std|sexually transmitted|sexual health|sti testing|std testing',/\b(?:hiv|syphilis|treponema|rpr|vdrl|chlamydia|gonorrhea|gonorrhoeae|gonococcus|trichomonas|mycoplasma genitalium|herpes simplex|hsv|genital herpes|sexually transmitted)\b/],
 ['thyroid','Thyroid','thyroid function|thyroid panel',/\b(?:thyroid|tsh|thyroxine|triiodothyronine|thyroglobulin|thyroperoxidase|tpo antibody|t3 reverse|free t3|free t4|t3 total|t4 total|t3 uptake|t4 uptake|thyroid stimulating)\b/],
 ['toxicology','Toxicology & Drug Screening','drug screen|drugs of abuse|tox screen',/\b(?:drug screen|drug testing|drugs of abuse|toxassure|toxicology|amphetamine|benzodiazepine|barbiturate|cocaine|cannabinoid|opiate|opioid|fentanyl|ethanol|methadone|buprenorphine|phencyclidine)\b/],
 ['tdm','Therapeutic Drug Monitoring','tdm|medication level|drug level',/\b(?:vancomycin|digoxin|lithium|tacrolimus|cyclosporine|carbamazepine|valproic acid|valproate|phenytoin|phenobarbital|theophylline|gentamicin|tobramycin|levetiracetam|lamotrigine|therapeutic drug|medication level)\b/],
 ['urinary','Urinalysis & Urinary','urinalysis|urinary|urine testing|ua',/\b(?:urinalysis|urine|urinary|microalbumin|protein creatinine ratio|albumin creatinine ratio|urine microscopy|urine sediment)\b/],
 ['vitamins','Vitamins & Nutrition','vitamins|vitamin|nutrition|nutritional',/\b(?:vitamin|folate|folic acid|b12|methylmalonic acid|homocysteine|zinc|copper|selenium|nutritional|prealbumin|riboflavin|thiamine|biotin)\b/],
 ['transplant','Transplant & Immunosuppression','immunosuppression|transplant monitoring',/\b(?:transplant|tacrolimus|cyclosporine|sirolimus|everolimus|mycophenolic acid|hla antibody|donor specific antibody)\b/],
 ['specialty-other','Specialty & Other','specialized testing|other specialty|uncategorized',/(?!)/]
 ];

 // Additional assay-title patterns cover recent specialty menus and abbreviations.
 // Only test names determine these clinical groupings, never handling notes.
 const supplemental=[
  ['autoimmune', /\b(?:anti hmgcr|antiphospholipid|connective tissue disease|ctd|vasculitis|anti fodrin|rheumatoid arthritis|mitochondrial (?:m2 )?antibod(?:y|ies)|smooth muscle antibod(?:y|ies)|parietal cell antibod(?:y|ies)|anti centromere|anti jo 1|anti smith|anti u1 rnp|antimyeloperoxidase|antiproteinase 3|striated muscle antibody|striational antibodies|autoimmune|autoantibody|anti ds dna|synovial joint fluid)\b/],
  ['renal', /\b(?:glomerulonephritis|gnp|uremic syndrome|hemolytic uremic)\b/],
  ['cardiac', /\b(?:heart disease|stroke risk|arrhythmia|cardiomyopathy|nt probnp|galectin 3|thromboxane|aspirinworks)\b/],
  ['coagulation', /\b(?:bleeding|thrombosis|thrombotic|thrombocytopenia|antiphospholipid|adamts13|emicizumab|apixaban|rivaroxaban|fibrinolysis|thrombin|prothrombin|protime|reptilase|plasminogen|antiplasmin|prekallikrein|kininogen|euglobulin|clot lysis|contact factor|hexagonal phase|hpp|ddavp|desmopressin|aspirinworks|thromboxane|factor evaluation|platelet antibody|heparin dependent|serotonin release assay|activated protein c resist(?:ance)?|heparin anti xa|protein [cs] (?:functional|deficiency))\b/],
  ['diabetes', /\b(?:metabolic syndrome|islet cells|antipancreatic islet|proinsulin|glycomark|anhydroglucitol|adiponectin)\b/],
  ['endocrinology', /\b(?:deoxycortisol|hydroxypregnenolone|hydroxycorticosterone|corticosterone|deoxycorticosterone|androsterone|androstanediol|pregnenolone|hydroxyandrostenedione|ketotestosterone|hydroxytestosterone|adrenal|androgen|cortisone|dexamethasone|corticosteroid|estrogens|gonadotropin|hirsutism|menopausal|menopause|mineralocorticoid|adrenarche|testicular function|hydroxyprogesterone|congenital adrenal hyperplasia|cah|leptin|growth assessment|growth receptor|alpha reductase|desmolase|hydroxylase|igf binding|subunit free endocrine sciences|dihydrotestosterone|calcitonin|catecholamines|metanephrines)\b/],
  ['genetics', /\b(?:invitae|geneseq|vistaseq|repeat expansion|single gene|genetic risk|genetic analysis|gene rearrangements|fish|fluorescence in situ hybridization|mendelian disorder|huntington disease|sma|spinocerebellar ataxia|spinal muscular atrophy|myotonic dystrophy)\b/],
  ['hematology', /\b(?:leukemia|lymphoma|leukaemia|flow cytometry|phenotyping|cytopenia|myeloproliferative|myelodysplastic|multiple myeloma|cll|aml|mps|mpn|cml|b all)\b/],
  ['oncology', /\b(?:oncology|leukemia|lymphoma|myeloma|myelodysplastic|myeloproliferative|neoplasms|tumor|tumour|cancer|fish profile|bcr abl|her 2|her2|5 hiaa|alk gene rearrangements)\b/],
  ['gi', /\b(?:inflammatory bowel disease|ibd|feces|gastrin)\b/],
  ['immunology', /\b(?:inborn errors of immunity|immune function|immune assessment|immunophenotyping|pneumococcal antibody|c1 esterase inhibitor|ig[dmga][1-4]|immunofixation|protein electrophoresis|kappa and lambda light chains)\b/],
  ['reproductive', /\b(?:menorrhagia|testicular function|menopausal|menopause|hirsutism|estrogens)\b/],
  ['tdm', /\b(?:amiodarone|cordarone|apixaban|rivaroxaban)\b/],
  ['transplant', /\b(?:engraftment|chimerism)\b/],
  ['pregnancy', /\b(?:maternit|integrated 2|maternal screening|pregnancy screen)\b/],
  ['neurology', /\b(?:ataxia|neuromuscular|neuropathies|dystonia|epilepsy|neurodevelopment|retinal disorders|frontotemporal dementia|schwannomatosis|stiff person|lrp4 antibod(?:y|ies)|amyotrophic lateral sclerosis|charcot marie tooth|rett|angelman|paralysis|muscular dystrophy)\b/],
  ['chemistry', /\b(?:metabolic panel|electrolyte panel|aldolase|ammonia|osmolality|cholinesterase|ceruloplasmin)\b/],
  ['blood-bank', /\b(?:rh type|rh phenotype|rbc antigen typing)\b/],
  ['hepatic', /\b(?:fibrosure|alpha 1 antitrypsin|mitochondrial (?:m2 )?antibod(?:y|ies))\b/],
  ['infectious', /\b(?:pneumococcal|mononucleosis|mono screen|antistreptolysin|streptolysin|dnase b|tickborne disease|mpox|orthopoxvirus|vaginitis|procalcitonin|candida|brucella)\b/],
  ['thyroid', /\b(?:reverse t3|t4 free|t3 free|ft4|ft3|thyrotropin|trab|thyrocalcitonin|calcitonin)\b/],
  ['toxicology', /\b(?:acetaminophen|salicylate|cyanide|carboxyhemoglobin|ethylene glycol|alcohol (?:methyl|ethyl|isopropyl))\b/],
  ['genetics', /\b(?:dna analysis|notch3|cadasil)\b/],
  ['vitamins', /\b(?:hydroxyvitamin|homocyst e ine|coenzyme q10|carotene)\b/],
  ['allergy', /\b(?:allergens|basofunction|regional allergy|allergen components|penicilloyl)\b/],
  ['autoimmune', /\b(?:myomarker|seroneg radx\d*|radx\d+ profile|sjo gren|antihistone|antichromatin|antiparietal cell|intrinsic factor blocking|anti (?:histone|synthetase|mitochondrial|scl 70|rna polymerase iii|dense fine speckled|ro52|mcv|carbamylated protein|glomerular basement membrane)|(?:beta )?2 glycoprotein 1 antibodies)\b|^anti (?:u[23] rnp|mda 5|ku|mi 2|pm scl|pl (?:7|12)|ej|oj|srp|tif 1gamma|nxp 2|cn 1a|th to)\b/],
  ['chemistry', /\b(?:amino acid (?:analysis|profile)|c reactive protein|crp|macroamylase|creatinine clearance|cmp\d*|bmp\d*|trimethylamine n oxide)\b/],
  ['coagulation', /\b(?:ristocetin|protein [cs] (?:antigen|free|total)|(?:beta )?2 glycoprotein 1 antibodies)\b/],
  ['endocrinology', /\b(?:glucagon|inhibin [ab]|amenorrhea|pregnenolone|21 hydroxylase|17 oh progesterone|oxo androgens|deoxycortisol|c telopeptide|osteocalcin)\b/],
  ['genetics', /\b(?:qherit|lynch syndrome|lynch panel|cystic fibrosis carrier|hla (?:typing|genotyping)|accutype)\b/],
  ['gi', /\b(?:celiac|coeliac|tissue transglutaminase|deamidated gliadin|endomysial antibodies)\b/],
  ['heavy-metals', /^(?:silver|tin|tungsten|tellurium|bismuth|barium|vanadium|antimony|molybdenum|platinum|thorium|beryllium|zirconium|boron)\b/],
  ['hematology', /\b(?:hemogram|erythropoietin|cbc(?:d|dp))\b/],
  ['hepatic', /\b(?:5 nucleotidase|primary biliary cholangitis|macroamylase)\b/],
  ['immunology', /\b(?:igd|interleukin|il (?:1|2|4|5|6|8|10|12|13|17|18|23|31|33)|hla|tetanus and diphtheria antibody)\b/],
  ['infectious', /\b(?:hcv|hbv|hav|hev|fta abs|adenovirus|enterovirus|coxsackie|dengue|ehrlichia|aspergillus|herpesvirus|clostridium difficile|rabies vaccine)\b/],
  ['oncology', /\b(?:chromogranin a|prostatic acid phosphatase)\b/],
  ['parasitology', /\b(?:echinococcus|trichinella|taenia|fasciola)\b/],
  ['pregnancy', /\b(?:human placental lactogen|maternal serum screen|fetomaternal|fetal hemoglobin screen)\b/],
  ['renal', /\b(?:litholink|cmp\d*|bmp\d*|anti glomerular basement membrane)\b/],
  ['sti', /\bfta abs\b/],
  ['tdm', /\b(?:amikacin|nortriptyline|amitriptyline|imipramine|desipramine|doxepin|ethosuximide|topiramate|zonisamide|gabapentin|oxcarbazepine|clozapine|primidone|venlafaxine|lacosamide|pregabalin|felbamate|brivaracetam|clobazam|tiagabine|vigabatrin|methotrexate|lidocaine|quinidine|procainamide|disopyramide|mexiletine|flecainide|propafenone|carisoprodol|ustekinumab|vedolizumab|adalimumab|infliximab|antidepressant drug profile|antipsychotic drug profile)\b/],
  ['toxicology', /\b(?:meconium|toxassure|tetrahydrocannabinol|benzodiazepines|amphetamines|opiates|acetylmorphine|organochlorine pesticides|tapentadol|morphine|tramadol|oxycodone|drug abuse)\b/],
  ['body-fluids', /\b(?:synovial joint fluid|joint fluid)\b/]
 ];

 const normalize = x => String(x||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
 const definitions=data.map(([id,label,extra,pattern])=>({id,label,terms:[label,...extra.split('|'),id],pattern}));
 const aliases=new Map();
 for(const d of definitions) for(const term of d.terms){
   const key=normalize(term);
   if(aliases.has(key)&&aliases.get(key)!==d.id) throw Error('Duplicate category alias: '+key);
   aliases.set(key,d.id);
 }
 const terms=[...aliases.keys()].sort((a,b)=>b.length-a.length);
 const cache=new WeakMap();
 function forTest(test){
   if(!test || typeof test!=='object') return [];
   if(cache.has(test)) return cache.get(test);
   const name=normalize(test.testName);
   const explicit=Array.isArray(test.clinicalCategories)?test.clinicalCategories:[];
   const ids=definitions.filter(d=>d.pattern.test(name)||explicit.some(x=>normalize(x)===d.id||aliases.get(normalize(x))===d.id)).map(d=>d.id);
   // The specimen filter and clinical filter serve different purposes. Give
   // every test at least one clinical category without guessing a diagnosis.
   // Urine-only tests can also be found under urinary tests even if the
   // catalog title omits the word "urine".
   const specimen=normalize(test.specimenType);
   if(/(?:^| )urine(?:$| )/.test(specimen) && !ids.includes('urinary')) ids.push('urinary');
   for(const [category,pattern] of supplemental) {
     if(pattern.test(name) && !ids.includes(category)) ids.push(category);
   }
   if(!ids.length) ids.push('specialty-other');
   cache.set(test,ids);return ids;
 }
 function matchQuery(query){
   const q=normalize(query);
   if(!q)return null;
   for(const term of terms) if(q===term||q.startsWith(term+' ')){
     const rest=q.slice(term.length).trim();
     if(rest&&rest.length<2) continue;
     return {id:aliases.get(term),rest};
   }
   return null;
 }
 window.LabClinicalCategories=Object.freeze({options:definitions.map(({id,label})=>({id,label})),forTest,matchQuery});
})();