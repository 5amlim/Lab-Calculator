'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const openCalculator=require('./helpers/calculator-vm.cjs');

for(const [lab,app] of [['Quest','assets/js/app.js'],['Labcorp','labcorp-app.js']]){
  const api=openCalculator(app,[
    'normalizeRecord','explicitCollectionCount','explicitSubmissionCount',
    'expandedCollectionTests','buildTransportBagPlan','buildCollectionPlan',
    'buildSubmissionContents','isOriginalContainerSubmission'
  ]);
  const specimen=(code,type,draw,submit,note='',preferredVolume='1 mL')=>
    api.normalizeRecord({id:'counter-'+code,testCode:code,testName:'Regression specimen '+code,
      specimenType:type,drawContainer:draw,transportContainer:submit,
      transportTemperature:'Room Temperature',preferredVolume,
      minimumVolume:'0.5 mL',spin:'No',specialInstructions:note,status:'active'});
  const plan=(row)=>{
    const expanded=api.expandedCollectionTests([row]);
    const bags=api.buildTransportBagPlan(expanded);
    const source=api.buildCollectionPlan(expanded,bags);
    const sent=bags.flatMap(bag=>api.buildSubmissionContents(bag));
    return {source:source.reduce((sum,x)=>sum+x.count,0),
      sent:sent.reduce((sum,x)=>sum+x.count,0),bags,submitted:sent};
  };
  test(lab+': no specimen quantity may be inferred from time, volume or reagent concentration',()=>{
    const scenarios=[
      ['urine-hours','24-hour Urine','24 Hour Urine Container','Sterile cup',
        'Submit 10 mL aliquot into a sterile screw-cap cup.',1,1],
      ['urine-acid','Urine','Sterile cup','6N HCl Preserved Urine Transport Tube',
        'Use 6N HCl-preserved urine tube; submit 10 mL aliquot.',1,1],
      ['stool-quantity','Stool','Sterile cup','Cary-Blair Transport Tube',
        'Use 10 mL stool transport container, then transfer stool.',1,1],
      ['csf-capacity','CSF','Sterile cup','Sterile cup',
        'Use 4 mL sterile CSF container for collection.',1,1],
      ['serum-capacity','Serum','Red Top','10 mL Transport Vial',
        'Submit 2 mL of processed serum.',1,1],
      ['plasma-capacity','Plasma','Lavender EDTA','5 mL Plasma Transport Vial',
        'Submit 3 mL plasma into labeled vial.',1,1],
      ['blood-multiple','Whole Blood','3 Lavender EDTA Tubes','Lavender EDTA',
        'Draw three separate EDTA tubes.',3,1],
      ['aliquots-multiple','Serum','Red Top','Frozen Transport Tube',
        'Submit 2 separate frozen transport tubes.',1,2]
    ];
    for(const [code,type,draw,submit,note,sourceCount,destCount] of scenarios){
      const row=specimen(code,type,draw,submit,note);
      assert.equal(api.explicitCollectionCount(row),sourceCount,lab+' source '+code);
      assert.equal(api.explicitSubmissionCount(row),destCount,lab+' transfer '+code);
    }
  });
  test(lab+': source and destination are physically distinct for core specimen types',()=>{
    const cases=[
      ['serum','Serum','Red Top','Transport Tube','Spin and transfer separated serum.','transfer'],
      ['plasma','Plasma','Lavender EDTA','Frozen Transport Tube','Separate and freeze EDTA plasma.','transfer'],
      ['stool','Stool','Sterile cup','Total-Fix Transport Vial','Collect stool in clean cup, then place aliquot in Total-Fix.','transfer'],
      ['urine','24-hour Urine','24 Hour Urine Container','Sterile cup','Collect 24-hour urine unpreserved; submit 10 mL aliquot.','transfer'],
      ['csf','CSF','Sterile cup','Sterile cup','Submit original CSF cup; do not transfer.','original'],
      ['blood','Whole Blood','Lavender EDTA','Lavender EDTA','Submit original EDTA tube, do not spin.','original']
    ];
    for(const [code,type,draw,submit,note,kind] of cases){
      const row=specimen('path-'+code,type,draw,submit,note,'1 mL');
      assert.equal(api.isOriginalContainerSubmission(row),kind==='original',lab+' '+code+' source route');
      const p=plan(row);
      assert(p.source>=1&&p.sent>=1,lab+' '+code+' missing physical container');
      assert.equal(p.submitted.some(item=>item.originalTube),kind==='original',lab+' '+code+' bag path');
    }
  });
}
