'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const apps=[['Quest','index.html','assets/js/app.js'],['Labcorp','labcorp.html','labcorp-app.js']];

async function inspectApp(source){
 const window={SEED_TESTS:[]};
 const document={
  getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},querySelector(){return null;}}),
  querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}
 };
 const src=read(source);
 assert(src.includes('  init();'),'bootstrap marker changed');
 vm.runInNewContext(src.replace('  init();',
  '  window.__audit={specimenFilterCategoriesForType,specimenFilterCategories,transportContainerFilterCategories};'),
  {window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
   setTimeout(){return 0;},clearTimeout(){},console:{warn(){},error(){}}},
  {filename:source,timeout:30000});
 await Promise.resolve();
 return window.__audit;
}
function inspectFlyout(){
 const window={matchMedia:()=>({matches:false})};
 const document={readyState:'loading',addEventListener(){}};
 const src=read('assets/js/portal-selects.js');
 const anchor="  if (document.readyState === 'loading')";
 assert(src.includes(anchor));
 vm.runInNewContext(src.replace(anchor,
  '  window.__audit={specimenGroupForValue,childOptionsFor};\n'+anchor),
  {window,document},{filename:'assets/js/portal-selects.js',timeout:12000});
 return window.__audit;
}
function options(html,id){
 const start='<select id="'+id+'"';
 const from=html.indexOf(start);
 assert(from>=0,'missing '+id);
 const openEnd=html.indexOf('>',from);
 const end=html.indexOf('</select>',openEnd);
 assert(end>openEnd);
 const source=html.slice(openEnd+1,end);
 return [...source.matchAll(/<option(?:\s[^>]*)?>([^<]*)<\/option>/g)].map(m=>m[1]);
}
function values(html,id){
 const from=html.indexOf('<select id="'+id+'"');
 const close=html.indexOf('</select>',from);
 const source=html.slice(from,close);
 return [...source.matchAll(/<option\s+value="([^"]+)"/g)].map(m=>m[1]);
}

test('Both laboratories list Affirm in collection, submission and filters, including secondary containers',()=>{
 for(const [lab,html,app] of apps){
  const source=read(html);
  for(const id of ['drawContainer','transportContainer'])
   assert(options(source,id).includes('BD Affirm VPIII ATTS swab transport kit'),lab+' '+id);
  for(const key of ['affirm','amies','fetal-fibronectin'])
   assert(values(source,'transportContainerFilter').includes(key),lab+' '+key);
  assert(read(app).includes('additionalContainerField(card, name).innerHTML = els[name].innerHTML'),
   lab+' secondary container options');
 }
});

test('Swab and Body Fluid subtypes show in flyouts while common specimens stay at main level',()=>{
 const menu=inspectFlyout();
 for(const field of ['specimenType','specimenFilter']){
  const item={select:{id:field,dataset:{}}};
  for(const type of ['Serum','Plasma','Whole Blood','Urine','Stool','Swab','Body Fluid'])
   assert.equal(menu.specimenGroupForValue(item,type),'',field+' '+type);
  for(const [type,parent] of [
    ['Vaginal Swab','Swab'],['Vaginal-Rectal Swab','Swab'],
    ['Cervicovaginal Swab','Swab'],['Throat Swab','Swab'],
    ['Nasopharyngeal Swab','Swab'],['Site-Specific Culture Swab','Swab'],
    ['CSF','Body Fluid'],['Pericardial Fluid','Body Fluid'],
    ['Peritoneal Fluid','Body Fluid'],['Pleural Fluid','Body Fluid'],
    ['Synovial Fluid','Body Fluid'],['Cervical Cytology Fluid','Body Fluid']
  ]) assert.equal(menu.specimenGroupForValue(item,type),parent,type);
 }
});

test('Specimen filter subchoices accurately match real samples and multiple required specimen routes',async()=>{
 for(const [lab,html,app] of apps){
  const source=read(html);
  const opts=values(source,'specimenFilter');
  const menu=inspectFlyout();
  const item={select:{id:'specimenFilter',dataset:{},options:opts.map(value=>({value,hidden:false,disabled:false}))}};
  assert.equal(menu.childOptionsFor(item,'Swab').length,6);
  assert.equal(menu.childOptionsFor(item,'Body Fluid').length,6);
  for(const label of ['Blood','Serum','Plasma','Whole Blood','RBCs','Urine','Stool','Swab','Body Fluid'])
   assert(opts.includes(label),lab+' '+label);
  const api=await inspectApp(app);
  for(const [specimen,required] of [
   ['Serum','Serum'],['Platelet-poor plasma','Plasma'],['Whole Blood','Whole Blood'],
   ['Vaginal Swab','Vaginal Swab'],['Vaginal-Rectal Swab','Vaginal-Rectal Swab'],
   ['Throat Swab','Throat Swab'],['CSF','Body Fluid'],
   ['Pleural Fluid','Pleural Fluid'],['Synovial Fluid','Synovial Fluid']
  ]) assert(api.specimenFilterCategoriesForType(specimen).includes(required),lab+' '+specimen);
  const both=api.specimenFilterCategories({
   specimenType:'Serum',additionalDrawRequirements:[{specimenType:'CSF',container:'Sterile cup'}]
  });
  assert(both.includes('Serum')&&both.includes('CSF'),lab+' multiple specimen routes');
 }
});

test('Dedicated container filters do not group Affirm, Amies and other kits as generic transport',async()=>{
 for(const [lab,,app] of apps){
  const api=await inspectApp(app);
  for(const [name,category] of [
   ['BD Affirm VPIII ATTS swab transport kit','affirm'],
   ['ESwab (Amies)','amies'],
   ['Fetal Fibronectin Special Collection Kit','fetal-fibronectin'],
   ['Sterile cup','sterile-cup'],
   ['Red/Yellow Swirl UA Preservative Tube','urine-ua'],
   ['Gray-Top Urine Culture Preservative Tube','urine-culture']
  ]){
   const matched=api.transportContainerFilterCategories({
    specimenType:'Vaginal Swab',drawContainer:name,transportContainer:name
   });
   assert(matched.includes(category),lab+' '+name);
  }
 }
});

test('Side menus support hover, keyboard, touch and browser-current cache versions',()=>{
 const portal=read('assets/js/portal-selects.js');
 for(const phrase of [
  "choice.addEventListener('pointerenter'",
  "e.key === 'ArrowRight'","e.key === 'ArrowLeft'",
  'openSubmenu(item,choice,option.value,root,true)',
  "item.select.dispatchEvent(new Event('change'",
  '!active.submenu?.contains(e.target)'
 ])assert(portal.includes(phrase),'missing '+phrase);
 for(const [,html] of apps){
  const source=read(html);
  assert(source.includes('portal-selects.js?v=11.90'));
  assert(source.includes('experience.css?v=12.03'));
 }
});
