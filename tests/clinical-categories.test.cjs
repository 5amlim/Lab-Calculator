const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const win={};vm.runInNewContext(read('assets/js/clinical-categories.js'),{window:win});
const c=win.LabClinicalCategories;
test('clinical category inference and aliases',()=>{
 for(const [name,category] of [
   ['Chlamydia trachomatis NAA','sti'],['CBC with Differential','hematology'],
   ['D Dimer Quantitative','coagulation'],['GI Pathogen Panel','gi'],
   ['Allergen IgE Profile','allergy'],['TSH','thyroid'],
   ['Ferritin','iron-anemia'],['HIV 1/2 Antigen Antibody','sti']]){
   assert(c.forTest({testName:name}).includes(category),name+' should belong to '+category);
 }
 for(const query of ['STI','STD','GI','hematology','coagulation','allergy'])assert(c.matchQuery(query),query);
 assert.equal(c.matchQuery('glycine'),null);
 assert.equal(c.matchQuery('igg'),null);
});
for(const [lab,html,app] of [['Quest','index.html','assets/js/app.js'],['LabCorp','labcorp.html','labcorp-app.js']]){
 test(lab+' category integration',()=>{
   const h=read(html),s=read(app);
   assert(h.includes('id="categoryFilter"'));
   assert(h.indexOf('clinical-categories.js')<h.indexOf(app+'?'));
   assert(s.includes('els.categoryFilter.value'));
   assert(s.includes('clinicalQuery && !clinicalQuery.rest'));
   assert(s.includes('LabClinicalCategories.forTest(test)'));
   assert(s.includes("els.categoryFilter.value = ''"));
 });
}
test('category option included in custom filter select',()=>assert(read('assets/js/portal-selects.js').includes("categoryFilter:'Clinical category'")));
