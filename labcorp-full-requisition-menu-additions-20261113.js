/* Labcorp requisition FULL PRINTED MENU: missing catalog entries, 2026-11-13.
 * Includes every printed code missing from the existing Labcorp calculator.
 * Existing entries are never replaced. No patient-identifying information.
 * Tests whose collection instructions cannot be safely determined are pending.
 * Report-only numbers are references, not specimen collection tests.
 */
(() => {
  'use strict';
  const dir = code => 'https://www.labcorp.com/tests/' + code;
  function record(code, testName, specimenType, drawContainer, transportContainer,
    preferredVolume, minimumVolume, transportTemperature, specialInstructions, options = {}) {
    return {
      id: 'labcorp-' + code, testCode: code, testName,
      specimenType, drawContainer,
      alternativeContainer: options.alternativeContainer || '',
      transportContainer, preferredVolume, minimumVolume,
      transportTemperature, transportTemperatureRaw: transportTemperature,
      stability: options.stability || 'Confirm current stability with Labcorp',
      spin: options.spin || 'Verify', specialInstructions,
      specialLabeling: options.specialLabeling || '',
      additionalDrawRequirements: options.additionalDrawRequirements || [],
      fastingStatus: options.fastingStatus || '',
      fastingInstructions: options.fastingInstructions || '',
      status: options.status || 'active',
      source: options.source || ('Labcorp official test directory (reviewed November 2026) • ' + dir(code))
    };
  }
  const sst = 'SST / Gold';
  const rt = 'Room Temperature';
  const rf = 'Refrigerated';
  const aptima = 'Aptima Multitest or Unisex Swab Transport';
  const serum = (code, name, preferred, minimum, temperature, note, opts={}) =>
    record(code, name, 'Serum', sst, 'SST / Gold (spun)', preferred, minimum,
      temperature, note, {spin:'Yes', alternativeContainer:'Red Top serum', ...opts});
  const edta = (code,name,note) => record(code,name,'Whole Blood','Lavender EDTA',
    'Lavender EDTA (original whole blood tube)','Fill tube to capacity','0.5 mL',rt,
    'Invert EDTA tube 8-10 times immediately after collection. Do not spin or transfer whole blood. ' + note,
    {spin:'No',stability:'1 day room temperature; 3 days refrigerated'});
  const swab = (code,name,source,note,opts={}) => record(code,name,
    source,aptima,aptima,'One swab','One swab',rt,
    'Use the correct Aptima kit for the specified anatomical source. Collect specimen and promptly place swab in original Aptima transport tube. Do not use a bacterial swab or UTM. '+note,
    {spin:'No',stability:'Aptima swab: verify current assay-specific stability', ...opts});

  const additions = [
    // Specialty tests printed above the standard menu.
    serum('835040','Fatty Acid Balance','Verify Labcorp volume','Verify Labcorp minimum',rf,
      'Requisition lists Fatty Acid Balance (835040). A regional Labcorp test catalog lists SST or lavender EDTA, refrigerated; current Labcorp individual test page and volumes were not confirmed. DO NOT use for collection until the performing lab verifies current test availability, specimen volume and processing.',
      {status:'pending', alternativeContainer:'Lavender EDTA plasma',
       source:'Original Labcorp requisition; Labcorp regional CDOS listing (835040), November 2026. Performing-lab verification required'}),

    // Organ / disease panels.
    serum('144000','Acute Viral Hepatitis (HAV, HBV, HCV)','5 mL serum','2.5 mL serum',rf,
      'Centrifuge within 24 hours. If not submitted in a gel-barrier tube, transfer separated serum to a screw-cap polypropylene transport tube. Do not freeze a gel-barrier tube. Refrigerate preferred.'),
    serum('140301','Kidney Profile (Serum Creatinine + Random Urine Albumin/Creatinine)','1 mL serum','0.5 mL serum',rt,
      'REQUIRES TWO SPECIMENS: blood for creatinine/eGFR and a separate random, unpreserved urine for urine albumin:creatinine ratio. Separate blood serum or plasma from cells within 45 minutes.',
      {alternativeContainer:'Red Top; green heparin or lavender EDTA plasma',
       additionalDrawRequirements:[{container:'Sterile Cup',specimenType:'Urine, Random',
         transportContainer:'Plastic Urine Aliquot Container, No Preservative',
         preferredVolume:'10 mL urine',minimumVolume:'2 mL urine',
         transportTemperature:rt,spin:'No',count:1,submissionCount:1,
         purpose:'Random urine albumin/creatinine',
         specialInstructions:'Separate random urine specimen, no preservative. Label urine source and submit alongside the blood specimen.'}]}),
    serum('361946','Lipid Cascade With Reflex to Lipoprotein Particle Assessment by NMR (Without Graph)',
      '2 mL serum','1 mL serum',rf,
      'TWO SEPARATE SPECIMENS ARE REQUIRED even if reflex is not ultimately performed: lipid panel specimen PLUS an NMR-specific specimen. Separate routine serum within 45 minutes. Both specimens remain refrigerated; ship with frozen cool packs, DO NOT FREEZE. Fast 8-12 hours. Do not substitute ordinary SST for the NMR specimen.',
      {fastingStatus:'required',fastingInstructions:'Fast at least 8-12 hours.',
       alternativeContainer:'Green heparin or lavender EDTA plasma for lipid portion only',
       additionalDrawRequirements:[{container:'NMR LipoTube (Black/Yellow)',
         specimenType:'Serum',transportContainer:'NMR LipoTube (Black/Yellow, spun and unopened)',
         preferredVolume:'2 mL serum',minimumVolume:'1 mL serum',transportTemperature:rf,
         spin:'Yes',count:1,submissionCount:1,purpose:'Mandatory separate NMR/reflex specimen',
         specialInstructions:'Use black/yellow NMR LipoTube, not ordinary SST. Allow to clot upright 30 minutes, centrifuge 1600-1800 xg for 10-15 minutes, DO NOT OPEN. Refrigerate 2-8 C; ship with frozen cool packs. Plain red-top serum or lavender EDTA plasma without gel only if the official alternative procedure is followed.'}]}),
    serum('363676','Lipid Cascade With Reflex to Apolipoprotein B','2 mL serum','1 mL serum',rt,
      'Separate serum or plasma from cells within 45 minutes. Reflex to direct LDL if triglycerides exceed 800 mg/dL; if LDL is less than 130 mg/dL, reflex apolipoprotein B testing may apply. Fasting eight hours.',
      {alternativeContainer:'Green Heparin or Lavender EDTA plasma',fastingStatus:'required',
       fastingInstructions:'8-hour fast according to Labcorp test directory.'}),

    // Individual hematology assays.
    edta('005058','Hematocrit (Hct)','Original EDTA whole blood; no centrifugation.'),
    edta('005041','Hemoglobin (Hb)','Original EDTA whole blood; no centrifugation.'),
    edta('005249','Platelet Count','Original EDTA whole blood; avoid clots and platelet clumping.'),
    edta('005033','Red Blood Cell (RBC) Count','Original EDTA whole blood; no centrifugation.'),

    // Alphabetical / combination panel menu.
    record('090400','Diabetes Risk - Asymptomatic Adults (A1c + Fasting Plasma Glucose)',
      'Whole Blood','Lavender EDTA','Lavender EDTA (original whole blood tube)',
      '4 mL whole blood','4 mL whole blood',rt,
      'REQUIRES TWO SPECIMENS: unspun EDTA whole blood for A1c AND a separate gray-top (or green lithium-heparin) plasma glucose collection. Send the full A1c tube and mark plasma as glucose. Fast at least 8 hours for fasting glucose.',
      {spin:'No',alternativeContainer:'Green lithium heparin or gray sodium fluoride for HbA1c',
       stability:'14 days room temperature per panel directory; confirm plasma processing turnaround',
       fastingStatus:'required',fastingInstructions:'Overnight fast of at least 8 hours for fasting plasma glucose.',
       additionalDrawRequirements:[{container:'Gray Top (Sodium Fluoride)',
         specimenType:'Plasma',transportContainer:'Gray Top or Separated Plasma Transport Tube',
         preferredVolume:'Entire collection of plasma',minimumVolume:'0.5 mL plasma',
         transportTemperature:rt,spin:'Yes',count:1,submissionCount:1,
         alternativeContainer:'Green lithium heparin plasma',
         purpose:'Fasting plasma glucose',
         specialInstructions:'Separate additional plasma specimen for fasting glucose. Gray sodium-fluoride or green lithium-heparin collection is acceptable. Do not use the same whole blood aliquot as the A1c specimen.'}]}),
    serum('023400','Diabetes Comorbidity Assessment','3 mL serum','1 mL serum',rt,
      'REQUIRES SERUM OR PLASMA AND RANDOM URINE. Panel evaluates lipids and kidney profile. Separate serum or plasma from cells within 45 minutes; collect random urine WITHOUT preservative (pH 4-8). Include patient age/sex. Fasting is not generally required, although Labcorp recommends fasting 12-14 hours for certain triglyceride risk evaluations.',
      {alternativeContainer:'Red Top or green lithium heparin plasma',
       fastingStatus:'preferred',fastingInstructions:'12-14 hour fasting preferred only for some triglyceride assessments; not routinely required.',
       additionalDrawRequirements:[{container:'Sterile Cup',specimenType:'Urine, Random',
         transportContainer:'Plastic Urine Aliquot Container, No Preservative',
         preferredVolume:'10 mL urine',minimumVolume:'2 mL urine',
         transportTemperature:rt,spin:'No',count:1,submissionCount:1,
         purpose:'Random urine kidney assessment',
         specialInstructions:'Submit a separate random urine sample in a clean plastic container, no preservative. Urine pH 4-8.'}]}),
    serum('001925','HDL Cholesterol','1 mL serum','0.7 mL serum',rt,
      'Separate serum or plasma from cells within 45 minutes. Gel-barrier tube preferred; stable 3 days room temperature.',
      {alternativeContainer:'Red Top serum or green lithium heparin plasma',
       stability:'3 days room temperature; 14 days refrigerated or frozen'}),
    record('180836','Helicobacter pylori Urea Breath Test',
      'Breath','H. pylori Urea Breath Baseline Bag (Blue)',
      'Baseline Blue Breath Bag','One baseline breath sample','One baseline breath sample',rt,
      'H. pylori kit-specific procedure: collect BLUE baseline bag, then give the supplied 13C-urea solution; wait 15 minutes seated and collect GREY postdose bag. Do not substitute routine blood tubes. Fast at least one hour. Antibiotics, proton-pump inhibitors and bismuth products should be avoided for two weeks before testing as directed by Labcorp.',
      {spin:'No',fastingStatus:'required',fastingInstructions:'At least 1 hour without food prior to test. Confirm medication washout with clinician.',
       additionalDrawRequirements:[{container:'H. pylori Urea Breath Postdose Bag (Gray)',
         specimenType:'Breath',transportContainer:'Postdose Gray Breath Bag',
         preferredVolume:'One postdose breath sample',minimumVolume:'One postdose breath sample',
         transportTemperature:rt,spin:'No',count:1,submissionCount:1,
         purpose:'Mandatory postdose breath sample',
         specialInstructions:'Collect grey postdose bag exactly 15 minutes after consuming the diagnostic solution; label as postdose.'}]}),
    serum('480947','PSA, Total and Free, With Percent Free PSA','2 mL serum','Confirm minimum with Labcorp',rt,
      'Printed Labcorp requisition code 480947; a Labcorp sample report and hospital reference directory identify it as PSA Total+% Free. Confirm current Labcorp availability and minimum volume before using. Test-specific directory specimen instructions were not available for direct confirmation.',
      {status:'pending',source:'Labcorp requisition 480947; Labcorp sample report 480947; Aultman laboratory directory (2025); collection requirements pending confirmation'}),
    serum('001156','T3 Uptake (Thyroid Hormone-Binding Ratio)','1 mL serum','0.7 mL',rt,
      'This is a binding-protein assessment, NOT a direct measurement of serum T3. Should be interpreted with total T4. Red-top or green lithium-heparin plasma acceptable; if used, separate and transfer. Do not use EDTA, oxalate or citrate plasma. Ask about high-dose biotin and Labcorp 72-hour hold recommendation.',
      {alternativeContainer:'Red Top serum or green lithium heparin plasma',
       stability:'14 days room temperature, refrigerated or frozen'}),

    // Cultures and microbiology.
    record('008482','Fungus (Mycology) Culture','Variable: swab, fluid, blood, tissue or urine',
      'Verify by source','Verify Official Instructions','Source-dependent','Source-dependent',rt,
      'SOURCE-DEPENDENT: Labcorp accepts many specimen types but the transport device and temperature vary. For nonblood swabs, culture transport may be acceptable; tissue/fluids need appropriate sterile containers; blood requires dedicated collection. Confirm specimen SOURCE and current Labcorp instructions before collection. Do not automatically pool with routine bacteriology.',
      {spin:'No',status:'pending',source:'Labcorp official directory • https://www.labcorp.com/tests/008482/fungus-mycology-culture'}),
    record('008334','Genital Culture, Routine','Genital swab',
      'ESwab / Amies Bacterial Swab Transport','ESwab / Amies Bacterial Swab Transport',
      'One swab','One swab',rt,
      'Specify site (vaginal/endocervical/urethral or other applicable genital source). Use ESwab or approved bacterial swab transport with Amies medium. Maintain at room temperature; DO NOT refrigerate. Not for routine GBS antepartum screening.',
      {spin:'No',stability:'Generally collect and submit promptly; prolonged delay over 72 hours may be rejected'}),
    record('008540','Gram Stain','Swab or Material from Infected Site',
      'Clean Glass Slide (air dried)','Clean Glass Slide in Slide Holder',
      'One thin smear','One thin smear',rt,
      'Specify specimen source and label the slide and holder. Preferred: gently roll swab onto clean slide, air dry; DO NOT heat-fix. Alternatively submit clinical material in an appropriate sterile container. A Gram stain alone does not request culture.',
      {spin:'No',alternativeContainer:'Swab transport or sterile container with clinical material',
       stability:'Prompt delivery; prolonged delay may be rejected'}),
    record('188132','Group B Streptococcus Colonization Detection, NAA',
      'Vaginal and rectal swab','ESwab / Amies Bacterial Swab Transport',
      'ESwab / Amies Bacterial Swab Transport','One swab','One swab',rt,
      'For antepartum GBS screening, collect LOWER VAGINAL then RECTAL specimen using the same suitable bacterial swab. ESwab or Amies non-nutritive medium accepted. No speculum; cervical/perianal specimens are not appropriate. If delivery beyond 24 hours, refrigerate.',
      {spin:'No',stability:'24 hours at room temperature; refrigerate if >24 hours until lab receipt'}),
    record('188139','Group B Streptococcus Colonization Detection, NAA With Reflex to Susceptibilities',
      'Vaginal and rectal swab','ESwab / Amies Bacterial Swab Transport',
      'ESwab / Amies Bacterial Swab Transport','One swab','One swab',rt,
      'Antepartum GBS screen with susceptibility reflex for patients at high risk of anaphylaxis from penicillin allergy. Collect lower vaginal THEN rectal specimen with appropriate ESwab/Amies transport, not a cervical swab. Refrigerate when transport will exceed 24 hours.',
      {spin:'No',stability:'24 hours room temperature; refrigerate for longer transit; check 48 hour rejection limit'}),

    // NuSwab / molecular infectious disease.
    swab('180039','NuSwab Vaginitis (VG)','Vaginal swab',
      'Aptima vaginal swab. Detects BV-associated organisms, Candida albicans/glabrata and Trichomonas vaginalis. Store at 2-30 C; never freeze.',
      {stability:'Up to 30 days for Aptima swab transport; verify source-specific limit'}),
    swab('180089','Genital Mycoplasma Profile, NAA, Swab','Vaginal, endocervical or male urethral swab',
      'Includes M. genitalium, M. hominis and Ureaplasma species. Use source-correct Aptima kit.',
      {stability:'Aptima transport stable at room temperature or refrigerated; check assay-specific limit'}),
    swab('180076','Mycoplasma genitalium, NAA, Swab',
      'Vaginal, endocervical or male urethral swab',
      'Use Aptima swab transport, source-specific collection. No reflex macrolide resistance on this code.',
      {stability:'Aptima transport stable at room temperature or refrigerated; verify current limit'}),
    swab('180092','Mycoplasma genitalium, NAA, Swab With Reflex to Macrolide Resistance',
      'Vaginal, endocervical or male urethral swab',
      'If M. genitalium is detected, macrolide resistance testing reflexes. Aptima swab collection, 2-30 C; no separate reflex swab required.',
      {stability:'30 days room temperature or refrigerated (2-30 C) per Labcorp'}),

    // Enhanced reporting is not an analyte or a separately collectable specimen.
    record('910343','Litholink Chronic Kidney Disease (CKD) Report Request',
      'Report only','No separate specimen','No separate specimen',
      'Not applicable','Not applicable','Not Applicable',
      'This is a Litholink CKD REPORT REQUEST, not a laboratory analyte. Labcorp directs ordering sites to contact Litholink for ordering information. Do not use as a specimen collection test.',
      {spin:'No',status:'pending',source:'Labcorp official directory • https://www.labcorp.com/tests/910343/litholink-ckd-program'}),
    record('910385','Litholink Cardiovascular Risk Assessment Report Request',
      'Report only','No separate specimen','No separate specimen',
      'Not applicable','Not applicable','Not Applicable',
      'This is a cardiovascular REPORT REQUEST, not a laboratory analyte. It is associated with an underlying lipid/cardiovascular order; it does not itself require an additional tube. Verify eligibility with Labcorp / Litholink.',
      {spin:'No',status:'pending',source:'Labcorp official directory • https://www.labcorp.com/tests/910385/cardiovascular-report'})
  ];
  const catalog = Array.isArray(window.SEED_TESTS) ? window.SEED_TESTS : [];
  const known = new Set(catalog.map(t => String(t.testCode || '').trim()));
  for (const t of additions) {
    if (known.has(t.testCode)) continue;
    catalog.push(t);
    known.add(t.testCode);
  }
  window.SEED_TESTS = catalog;
})();
