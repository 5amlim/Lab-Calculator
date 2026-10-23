/* Lab clinical search categories. Derived from assay names, never collection instructions. */
(() => {
 'use strict';
 const data = [
 ['allergy','Allergy','allergies|allergen|ige testing',/\b(?:allergy|allergen|allergens|allergic|ige|immunoglobulin e|tryptase|histamine)\b/],
 ['autoimmune','Autoimmune & Rheumatology','rheumatology|rheumatoid|lupus',/\b(?:ana|antinuclear|anti nuclear|dsdna|anti ds dna|anti ccp|rheumatoid factor|lupus|sjogren|scleroderma|anca|myositis|anti rnp|anti ro|anti la|hla b27)\b/],
 ['blood-bank','Blood Bank','immunohematology|blood typing',/\b(?:abo|rh typing|abo rh|blood type|blood group|antibody screen|antibody identification|crossmatch|coombs|direct antiglobulin)\b/],
 ['cardiac','Cardiac','heart|cardiology',/\b(?:troponin|bnp|nt pro bnp|natriuretic peptide|ck mb|myoglobin|heart failure|cardiac risk|hs crp|high sensitivity crp|lipoprotein a)\b/],
 ['coagulation','Coagulation','coag|clotting|hemostasis|thrombosis',/\b(?:pt inr|prothrombin time|partial thromboplastin|aptt|ptt|d dimer|fibrinogen|fibrin degradation|von willebrand|thrombophilia|lupus anticoagulant|antithrombin|protein c activity|protein s activity|factor v leiden|coagulation|platelet function|factor (?:ii|v|vii|viii|ix|x|xi|xii|xiii|\d+))\b/],
 ['diabetes','Diabetes & Metabolic','metabolic|blood sugar|glucose testing',/\b(?:glucose|a1c|glycated hemoglobin|hemoglobin a1c|insulin|c peptide|fructosamine|diabetes|metabolic panel|ketones|beta hydroxybutyrate|lactic acid|lactate)\b/],
 ['endocrinology','Endocrinology & Hormones','endocrine|hormones|hormone',/\b(?:cortisol|acth|adrenocorticotropic|aldosterone|renin|testosterone|estradiol|estrone|estriol|estrogen|progesterone|prolactin|dhea|androstenedione|amh|anti mullerian|follicle stimulating|luteinizing|growth hormone|igf 1|parathyroid|pth|insulin|c peptide|thyroid|tsh|thyroxine|triiodothyronine|free t4|free t3|shbg|fsh|lh)\b/],
 ['heavy-metals','Environmental & Heavy Metals','environmental|heavy metals|heavy metal|trace metals',/\b(?:lead|mercury|arsenic|cadmium|cobalt|chromium|selenium|aluminum|aluminium|nickel|manganese|toxic metals|heavy metals)\b/],
 ['gi','Gastrointestinal (GI)','gastrointestinal|gastro|digestive|stool testing',/\b(?:gastrointestinal|gi pathogen|stool|fecal|faecal|calprotectin|lactoferrin|pancreatic elastase|h pylori|helicobacter|c difficile|clostridioides|enteric|occult blood|ova and parasites|fecal fat|bile acids|malabsorption)\b/],
 ['genetics','Genetics & Molecular','genetic|molecular genetics|dna testing',/\b(?:gene panel|gene mutation|gene sequencing|mutation analysis|genotype|genotyping|chromosome|karyotype|microarray|carrier screening|hereditary|brca|fragile x|cystic fibrosis mutation|pharmacogenetic|pharmacogenomic|snp)\b/],
 ['hematology','Hematology','blood count|blood counts',/\b(?:cbc|complete blood count|red blood cell|white blood cell|rbc count|wbc count|platelet count|reticulocyte|hematocrit|haematocrit|hemoglobin|haemoglobin|hemoglobinopathy|anemia|anaemia|thalassemia|sickle cell|peripheral smear|sedimentation rate|esr)\b/],
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
 ['renal','Renal & Electrolytes','kidney|electrolytes|electrolyte',/\b(?:renal|kidney|creatinine|bun|urea nitrogen|egfr|cystatin c|sodium|potassium|chloride|bicarbonate|carbon dioxide|magnesium|phosphorus|phosphate|protein creatinine|albumin creatinine|uric acid|metabolic panel)\b/],
 ['reproductive','Reproductive & Fertility','fertility|reproductive hormones',/\b(?:fertility|ovarian|ovulation|semen|sperm|anti mullerian|amh|follicle stimulating|luteinizing|fsh|lh|progesterone|estradiol|testosterone|shbg|sex hormone binding)\b/],
 ['respiratory','Respiratory','pulmonary|resp',/\b(?:respiratory|influenza|flu a|flu b|rsv|respiratory syncytial|covid|sars cov|pertussis|pneumonia|legionella|mycoplasma pneumoniae|upper respiratory|nasopharyngeal)\b/],
 ['sti','STI / STD','std|sexually transmitted|sexual health|sti testing|std testing',/\b(?:hiv|syphilis|treponema|rpr|vdrl|chlamydia|gonorrhea|gonorrhoeae|gonococcus|trichomonas|mycoplasma genitalium|herpes simplex|hsv|genital herpes|sexually transmitted)\b/],
 ['thyroid','Thyroid','thyroid function|thyroid panel',/\b(?:thyroid|tsh|thyroxine|triiodothyronine|thyroglobulin|thyroperoxidase|tpo antibody|t3 reverse|free t3|free t4|t3 total|t4 total|t3 uptake|t4 uptake|thyroid stimulating)\b/],
 ['toxicology','Toxicology & Drug Screening','drug screen|drugs of abuse|tox screen',/\b(?:drug screen|drug testing|drugs of abuse|toxassure|toxicology|amphetamine|benzodiazepine|barbiturate|cocaine|cannabinoid|opiate|opioid|fentanyl|ethanol|methadone|buprenorphine|phencyclidine)\b/],
 ['tdm','Therapeutic Drug Monitoring','tdm|medication level|drug level',/\b(?:vancomycin|digoxin|lithium|tacrolimus|cyclosporine|carbamazepine|valproic acid|valproate|phenytoin|phenobarbital|theophylline|gentamicin|tobramycin|levetiracetam|lamotrigine|therapeutic drug|medication level)\b/],
 ['urinary','Urinalysis & Urinary','urinalysis|urinary|urine testing|ua',/\b(?:urinalysis|urine|urinary|microalbumin|protein creatinine ratio|albumin creatinine ratio|urine microscopy|urine sediment)\b/],
 ['vitamins','Vitamins & Nutrition','vitamins|vitamin|nutrition|nutritional',/\b(?:vitamin|folate|folic acid|b12|methylmalonic acid|homocysteine|zinc|copper|selenium|nutritional|prealbumin|riboflavin|thiamine|biotin)\b/],
 ['transplant','Transplant & Immunosuppression','immunosuppression|transplant monitoring',/\b(?:transplant|tacrolimus|cyclosporine|sirolimus|everolimus|mycophenolic acid|hla antibody|donor specific antibody)\b/]
 ];
 const normalize = x => String(x||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,' ').trim();
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