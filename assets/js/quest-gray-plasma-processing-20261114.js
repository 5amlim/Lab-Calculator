/* 2026-11-14: verified Quest gray-top plasma processing. The chosen route is
 * the official additive-free plastic screw-cap vial alternative, NOT a second
 * gray-top anticoagulant blood collection tube. Separate every timed specimen. */
(()=>{'use strict';
if(!Array.isArray(window.SEED_TESTS))return;
const profiles=[
  {
    "code": "8477",
    "name": "Glucose, Gestational Screen (50g), 135 Cutoff",
    "dose": 50,
    "times": [
      "1-hour"
    ],
    "fast": false
  },
  {
    "code": "19833",
    "name": "Glucose, Gestational Screen (50g), 140 Cutoff",
    "dose": 50,
    "times": [
      "1-hour"
    ],
    "fast": false
  },
  {
    "code": "484",
    "name": "Glucose, Plasma",
    "dose": 0,
    "times": [
      "Fasting"
    ],
    "fast": true
  },
  {
    "code": "1430",
    "name": "Glucose, Fasting and Gestational, 135 Cutoff",
    "dose": 50,
    "times": [
      "Fasting",
      "1-hour"
    ],
    "fast": true
  },
  {
    "code": "19834",
    "name": "Glucose, Fasting and Gestational, 140 Cutoff",
    "dose": 50,
    "times": [
      "Fasting",
      "1-hour"
    ],
    "fast": true
  },
  {
    "code": "16292",
    "name": "Glucose Tolerance Test, Gestational, 4 Specimens (100g) with NDDG",
    "dose": 100,
    "times": [
      "Fasting",
      "1-hour",
      "2-hour",
      "3-hour"
    ],
    "fast": true
  },
  {
    "code": "35181",
    "name": "Glucose Tolerance Test, 2 Specimens (75g)",
    "dose": 75,
    "times": [
      "Fasting",
      "2-hour"
    ],
    "fast": true
  },
  {
    "code": "23475",
    "name": "Glucose Tolerance Test, 3 Specimens (75g)",
    "dose": 75,
    "times": [
      "Fasting",
      "1-hour",
      "2-hour"
    ],
    "fast": true
  },
  {
    "code": "18927",
    "name": "Glucose Tolerance Test, Gestational, 3 Specimens (75g)",
    "dose": 75,
    "times": [
      "Fasting",
      "1-hour",
      "2-hour"
    ],
    "fast": true
  },
  {
    "code": "6745",
    "name": "Glucose Tolerance Test, Gestational, 4 Specimens (100g)",
    "dose": 100,
    "times": [
      "Fasting",
      "1-hour",
      "2-hour",
      "3-hour"
    ],
    "fast": true
  }
];
const process="DRAW: collect blood in a dedicated gray-top sodium-fluoride/potassium-oxalate tube and gently invert 8-10 times. PROCESS: promptly centrifuge according to the receiving laboratory's validated conditions and fully separate plasma from cells. Pipette separated plasma without red cells into a NEW, clean, additive-free plastic screw-cap transport vial; label FLUORIDE/OXALATE PLASMA and exact collection time. Do NOT transfer separated plasma into another additive-containing gray-top Vacutainer, which is not the Quest-listed alternative. SUBMIT: the labeled plastic plasma vial at room temperature. Do not pool timed draws or share their vials. Confirm the receiving Quest lab accepts this listed alternative. Source: Quest official test directory, alternate plasma container and general specimen separation guidance.";
const stability="Separated sodium-fluoride/oxalate plasma: room temperature 7 days; refrigerated 7 days; frozen 28 days. Blood in original gray fluoride/oxalate collection tube: room temperature 24 hours; refrigerated 72 hours; DO NOT FREEZE whole blood.";
const urls={
  "8477":"https://testdirectory.questdiagnostics.com/test/test-detail/8477/?cc=MASTER",
  "19833":"https://testdirectory.questdiagnostics.com/test/test-detail/19833/?cc=MASTER",
  "484":"https://testdirectory.questdiagnostics.com/test/test-detail/484/?cc=MASTER",
  "1430":"https://testdirectory.questdiagnostics.com/test/test-detail/1430/?cc=MASTER",
  "19834":"https://testdirectory.questdiagnostics.com/test/test-detail/19834/?cc=MASTER",
  "16292":"https://testdirectory.questdiagnostics.com/test/test-detail/16292/?cc=MASTER",
  "35181":"https://testdirectory.questdiagnostics.com/test/test-detail/35181/?cc=MASTER",
  "23475":"https://testdirectory.questdiagnostics.com/test/test-detail/23475/?cc=MASTER",
  "18927":"https://testdirectory.questdiagnostics.com/test/test-detail/18927/?cc=MASTER",
  "6745":"https://testdirectory.questdiagnostics.com/test/test-detail/6745/?cc=MASTER"
};
for(const profile of profiles){
  const {code,name,dose,times,fast}=profile;
  const existingIndex=window.SEED_TESTS.findIndex(item=>String(item.testCode||'').trim()===code);
  const existing=existingIndex>=0?window.SEED_TESTS[existingIndex]:null;
  if(existing && existing.status==='blocked')continue;
  const codeSpecificCaution=code==="16292"
    ? " IMPORTANT: the code-16292 test-specific Quest page specifies gray-top plasma but does not separately list the plastic-vial alternative. The transfer route follows Quest general nongel-plasma handling guidance and must be confirmed with the receiving laboratory before submitting this panel."
    : "";
  const timeInfo=times.length===1
    ?(dose ? `Single 1-hour draw after the ${dose} g oral glucose load. NO fasting needed. Screening is usually performed at gestational weeks 24-28.` : "Fasting specimen only.")
    :`Separate timed specimens: ${times.join(', ')}. Draw fasting specimen BEFORE the ${dose} g oral glucose load; label each specimen with actual clock time and timepoint.`;
  const additionalDrawRequirements=times.slice(1).map(time=>({
    container:"Gray Top (Sodium Fluoride/Potassium Oxalate)",
    count:1,
    specimenType:"Plasma",
    preferredVolume:"1 mL fluoride/oxalate plasma",
    minimumVolume:"0.5 mL plasma",
    purpose:`${time} timed glucose sample, separate from every other draw`,
    transportContainer:"Plastic Screw-Cap Plasma Vial (No Additive; Fluoride/Oxalate Plasma)",
    transportTemperature:"Room Temperature",
    transportTemperatureRaw:"Separated sodium fluoride/oxalate plasma",
    stability,
    spin:"Yes",
    specialLabeling:`${time} - record collection time`,
    specialInstructions:`${time} TIMEPOINT: draw a separate gray fluoride/oxalate blood tube. ${process}`
  }));
  const update={
    testCode:code,
    testName:name,
    specimenType:"Plasma",
    drawContainer:"Gray Top (Sodium Fluoride/Potassium Oxalate)",
    alternativeContainer:"Quest-preferred gray-top submission after appropriate separation; alternate plasma from gray tube in additive-free plastic screw-cap vial (selected workflow). Other alternative specimen types require their own verified collection pathway.",
    transportContainer:code==="8477" ? "Transport Tube" : "Plastic Screw-Cap Plasma Vial (No Additive; Fluoride/Oxalate Plasma)",
    preferredVolume:"1 mL fluoride/oxalate plasma per timepoint",
    minimumVolume:"0.5 mL fluoride/oxalate plasma per timepoint",
    transportTemperature:"Room Temperature",
    transportTemperatureRaw:"Separated sodium fluoride/oxalate plasma",
    stability,
    spin:"Yes",
    collectionCount:1,
    submissionCount:1,
    specialLabeling:`${times[0]} - record collection time`,
    specialInstructions:`${timeInfo} ${times[0]} TIMEPOINT: ${process}${codeSpecificCaution}`,
    additionalDrawRequirements,
    fastingStatus:fast?"required":"",
    fastingInstructions:fast?"At least 8-hour fast; water only. Collect fasting timepoint before glucose challenge.":"Fasting is not required for this 50 g gestational screen.",
    status:"active",
    source:`Quest Diagnostics test directory, verified 2026-11-14 • ${urls[code]}`
  };
  if(existingIndex>=0){
    window.SEED_TESTS[existingIndex]={...existing,...update};
  }else{
    window.SEED_TESTS.push({id:`quest-gray-plasma-${code}-20261114`,...update});
  }
}
window.QUEST_GRAY_PLASMA_CODES=profiles.map(profile=>profile.code);
})();
