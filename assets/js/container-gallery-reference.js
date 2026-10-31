/* Lab Central · Container Reference.
 * Entries consolidated from Lab Calculator taxonomy and the supplied reference photos.
 * Selection is informational, not a test-specific acceptance guarantee.
 */
(function(){
'use strict';
const RAW=[["gold-sst","Gold-top SST","Blood tubes","Q,L","tube","gold","SST","Serum separator tube with gel. Common 5 mL collection option; verify required fill and processing.","old:image3.png","https://www.diamedicalusa.com/ProductImages/IV080292_media_01.jpg"],["tiger-sst","Tiger-top SST","Blood tubes","Q,L","tiger","tiger","SST","Larger SST option commonly 7.5 mL. Verify tube size and how many tubes the test requires.","old:image4.png","https://www.minervamedical.ca/cdn/shop/files/becton-dickinson-bd-vacutainer-sst-plastic-tubes-minervamedical-367988-image1_68768b16-e055-4762-8189-dcffb70f19bc.png?v=1763926668"],["red-serum","Red-top serum","Blood tubes","Q,L","tube","red","SERUM","Serum without separator gel; clot, spin and transfer if required by the test.","old:image1.png",""],["lavender-edta","Lavender-top EDTA","Blood tubes","Q,L","tube","lavender","EDTA","EDTA whole blood for hematology and many molecular tests; never describe as serum.","old:image5.png",""],["pink-edta","Pink-top K₂EDTA crossmatch","Blood tubes","Q,L","tube","pink","EDTA","Pink BD Hemogard™ crossmatch tube with large patient-information label. Representative 6 mL K₂EDTA crossmatch tube. Use for approved blood-bank tests; verify exact tube, identifiers and fill requirements.","","https://cdn.medicaleshop.com/2c2290b4-7748-4bd9-bff7-82c30837a534_123bafc2-70e0-428f-9df8-07fc797b6168_image-1.jpg"],["lightblue-citrate","Light-blue sodium citrate","Blood tubes","Q,L","tube","lightblue","CITRATE","Coagulation collection tube; correct fill ratio is important.","old:image7.png",""],["green-lithium","Green-top lithium heparin","Blood tubes","Q,L","tube","green","Li-HEP","Lithium heparin for plasma or whole blood as accepted for the ordered test.","old:image8.png",""],["sodium-heparin","Green-top sodium heparin","Blood tubes","Q,L","tube","darkgreen","Na-HEP","Sodium heparin tube. Check additive carefully; it is not equivalent to lithium heparin for every test.","","https://www.diamedicalusa.com/ProductImages/MED053544_media_01.jpg"],["royalblue-edta","Royal-blue EDTA trace metal","Blood tubes","Q,L","tube","royal","EDTA","Royal-blue trace-element collection tube with EDTA additive; identify by label and additive stripe.","old:image6.png","https://digitalassets.avantorsciences.com/adaptivemedia/rendition?clid=SAPDAM&id=037cf0d38d7b230311a720244731281006338721&prid=original&vid=0e30d159bd6ee69c76636cb91e2309d9d8582973"],["royalblue-serum","Royal-blue serum trace metal","Blood tubes","Q,L","tube","royalred","SERUM","Trace-element serum tube; confirm the red additive stripe. Do not substitute royal-blue EDTA.","","https://shop.dalsup.com/images/gallery/2780/1000X1000/BD_368380_1.jpg"],["acd-yellow","Yellow-top ACD blood collection","Blood tubes","Q,L","tube","yellow","ACD","Yellow conventional rubber-stopper Vacutainer with acid citrate dextrose (ACD) solution A or B, as ordered. ACD A and B are not interchangeable. Verify the specified fill and test-specific instructions.","","https://medical-goods.com.tw/upload/product/photo_m_174166100921.jpg"],["gray-fluoride","Gray-top fluoride/oxalate blood","Blood tubes","Q,L","tube","gray","FLUORIDE","Blood collection tube for tests requiring a fluoride/oxalate additive. Not the gray urine culture tube.","","https://essentialmedical.ca/cdn/shop/files/367922_1200x1200.png?v=1747747503"],["microtainer-sst","Amber SST Microtainer","Blood tubes","Q,L","micro","gold","SST","Small-volume microcollection device. Not interchangeable with regular SST volume assumptions.","","https://cdn11.bigcommerce.com/s-3yvzqa/images/stencil/1280x1280/products/46246/342213/SKU365978__84774.1692282450.png?c=2"],["microtainer-edta","Lavender EDTA Microtainer","Blood tubes","Q,L","micro","lavender","EDTA","Small-volume EDTA microcollection device when test and laboratory accept microcollection.","","https://www.alphalabs.co.uk/media/catalog/product/3/6/365975-1.jpg"],["urine-cup","Sterile urine cup","Urine","Q,L","cup","white","STERILE","Sterile leakproof container for collection. Transfer into required preservative tube when indicated.","cedars:sterile",""],["ua-yellow","Red/yellow swirl-cap urinalysis preservative tube","Urine","Q,L","tube","yellow","UA","Representative BD 8 mL conical urinalysis preservative tube with a red-and-yellow marbled conventional stopper. Confirm the ordered test, correct preservative, and fill requirements. This differs from the plain-yellow Hemogard version.","","https://cdn.medicaleshop.com/6a1ceb4e-f46e-4068-81c1-f6c72e86bfb0_8ddca01b-080f-4c03-93e3-ea65a9ea068c_image-3.jpg"],["urine-gray","Gray-top urine culture tube","Urine","Q,L","tube","gray","CULTURE","Representative BD 4 mL, 13 × 75 mm round-bottom C&S tube. Confirm the marked minimum fill and receiving-lab requirements.","cedars:urine","https://www.mercedesscientific.com/media/catalog/product/cache/aa2ebfe10f8f35add86889ffe8b4ae3a/b/d/bd_364951_image1_2.jpg"],["urisponge","Copan UriSponge","Urine","Q,L","urisponge","yellow","UriSponge","Screw-cap tube with a cap-mounted applicator and two absorbent sponges. Dip the sponges into urine, then reclose the tube. Do not pour urine into the tube.","","https://assets.fishersci.com/TFS-Assets/CCG/product-images/UriSponge_8U033S50_2644505_1.jpg-650.jpg"],["24h-jug","24-hour urine collection jug","Urine","Q,L","jug","orange","24 HOUR","Timed urine collection container. Verify any required preservative and collection instructions.","","https://images.globalindustrial.com/images/pdp/XDF_43029-1.webp?t=1772688177756"],["acidwash-urine","Acid-washed / metal-free urine","Urine","Q,L","cup","blue","TRACE","Use the receiving lab’s trace-element-free or acid-washed container. The reference photo shows a representative trace-metal-controlled collection jug, not every required aliquot vessel.","","https://openstax.org/apps/image-cdn/v1/f%3Dwebp/apps/archive/20260209.222123/resources/d470c046e48d07d1358994c52afb35fd609ac83f"],["cobas-urine","cobas urine PCR transport","Urine","Q,L","swab","yellow","cobas","Special PCR urine transport device, not a routine urine culture vial.","cedars:cobasUrine",""],["aptima-urine","Aptima urine specimen collection kit","Urine","Q,L","aptimaurine","white","APTIMA","Hologic Aptima urine transport tube with white screw cap and yellow 2.0 mL fill-area label, supplied with transfer pipette. Transfer urine until the level is between the black fill lines. This is not the Aptima swab kit.","","https://www.dlolab.com/sites/default/files/supplies/%23A01%20APTIMA%C2%AE%20Urine%20Tube.png"],["serum-transfer","Serum / plasma transport tube","Transport","Q,L","tube","green","SERUM / PLASMA","The same green-cap transport tube is used for separated serum or plasma aliquots. It can be submitted frozen when the ordered test requires frozen transport. Clearly label the actual specimen type and plasma source additive; verify the receiving lab’s temperature, volume and transfer requirements.","old:image9.png",""],["quest-trace-vial","Quest metal-free serum transport (red label)","Transport","Q","tracevial","red","SERUM","Quest trace-element/metal-free serum transfer vial: white screw cap and red/orange label. For separated serum only. Do not use for whole blood, RBCs or plasma. Confirm processing, volume and temperature in the Quest test directory.","local:trace-serum","https://testdirectory.questdiagnostics.com/test/home"],["quest-trace-multi","Quest metal-free whole blood / RBC / plasma transport (purple label)","Transport","Q","tracevial","purple","WB / RBC / PLASMA","Quest trace-element/metal-free transfer vial: white screw cap and purple/lavender label for whole blood, red blood cells (RBCs) or plasma, as specified for the ordered assay. Do not substitute the red serum vial. Verify the required specimen, additives, volume and transport conditions.","local:trace-multi","https://testdirectory.questdiagnostics.com/test/home"],["cedars-trace-vial","Cedars trace-metal-free transport tube","Transport","C","tracevial","white","TRACE","Representative metal-free plastic screw-cap transfer tube for trace-element sendouts. Confirm the exact Cedars-supplied or approved vessel, source tube, volume and transport temperature before use; the drawing does not certify a specific product.","","https://5amlim.github.io/Lab-Calculator/cedars-container-guide.html"],["frozen-transfer","Labcorp frozen specimen transport tube","Transport","L","micro","purple","FROZEN","Labcorp frozen-specimen transport tube with a purple threaded cap, narrow clear body and purple inner sleeve. Use only when the specific Labcorp test calls for this frozen transport container; verify the material, fill, labeling and freezing instructions.","",""],["amber-protect","Amber light-protected tube","Transport","Q,L","tube","amber","LIGHT","Long amber-brown light-protective transport tube with brown screw cap and graduation marks. Use for photosensitive specimens only when specified by the receiving laboratory; confirm acceptable container and light-protection conditions.","",""],["sterile-cup","Sterile specimen cup","Transport","Q,L","cup","white","STERILE","Leakproof sterile cup for swab-free specimen types as accepted by the receiving laboratory.","cedars:sterile",""],["stool-clean","Clean stool (sterile cup)","Stool","Q,L","cup","white","CLEAN STOOL","Unpreserved clean stool may be collected in a sterile, leakproof specimen cup when the test accepts it. Use the exact receiving-lab container and handling instructions.","cedars:sterile",""],["stool-cary","Cary-Blair / Para-Pak C&S","Stool","Q,L","stool","orange","C&S","Orange-cap culture transport medium for enteric stool testing. Not a Total-Fix substitute.","","https://medicalsupplyhq.com/cdn/shop/products/xiqq1kyl9fxjxagxfedl_1080x.jpg?v=1685253722"],["totalfix","Total-Fix O&P preservative","Stool","Q,L","stool","black","TOTAL-FIX","Quest uses Total-Fix for stool parasitology. Labcorp acceptance varies by test; verify before collecting.","","https://cdn.medicaleshop.com/41240715-3486-4c6d-8ff7-3b32d3a106dd_98f676ee-dd22-46eb-a221-163fc1f83bde_image-0.jpg"],["para-formalin","10% formalin stool vial","Stool","Q,L","stool","pink","FORMALIN","Preserved stool vial used in some O&P kits. Use exact paired media per laboratory.","cedars:formalin",""],["para-pva","Zn-PVA stool preservative vial","Stool","Q,L","stool","gray","PVA","Paired stool parasitology media when required. Not interchangeable with culture medium.","","https://meridian-bioscience-web.s3.us-east-2.amazonaws.com/wp-content/uploads/2025/07/09082421/para-pak-zn-pva.png"],["e-swab","eSwab liquid Amies","Swabs & kits","Q,L","swab","white","eSwab","Swab tube with liquid Amies for accepted bacterial cultures. Confirm test/source compatibility.","cedars:eswab",""],["utm","UTM / viral transport tube","Swabs & kits","Q,L","swab","red","UTM","Viral transport medium with swab. Confirm required medium, temperature and acceptance.","cedars:utm",""],["aptima-swab","Aptima Multitest swab transport tube","Swabs & kits","Q,L","swab","orange","Aptima","Hologic Aptima Multitest Swab Transport Media (STM) tube, with a white ribbed screw cap, orange label, and 2.9 mL transport medium. The collection swab is packaged separately. Use only for the approved specimen type and assay.","local:aptima-swab","https://5amlim.github.io/Lab-Central/assets/containers/aptima-multitest-swab.webp"],["affirm","Affirm / ATTS kit","Swabs & kits","Q,L","swab","white","AFFIRM","BD Affirm ambient temperature transport system for indicated vaginitis tests.","cedars:affirm",""],["cobas-swab","cobas PCR kit","Swabs & kits","Q,L,C","swab","yellow","COBAS","cobas PCR swab collection and transport kit for the applicable Quest, Labcorp, and Cedars workflows. Confirm the test-specific kit, collection site, acceptable sample, and transport requirements with the receiving lab. Distinct from cobas urine PCR transport.","cedars:cobasSwab",""],["cedars-three","Cedars three-vial Para-Pak stool kit","Stool","C","three","mixed","3 VIALS","Illustrated as orange C&S, pink 10% formalin and white clean vials. Kit combinations and closure colors vary. Follow the current Cedars kit labels and ordered workflow.","cedars:parapak",""],["cedars-adult","Cedars adult blood culture set","Blood cultures","C","bloodpair","mixed","AER / ANA","Adult aerobic and anaerobic bottles. Confirm the approved bottle types, draw volume and order of collection.","cedars:adult",""],["cedars-peds","Cedars pediatric blood culture","Blood cultures","C","bloodbottle","pink","PEDS","Pediatric culture bottle(s). Confirm count and draw volume with Cedars protocol for the patient.","cedars:peds",""],["cedars-fungal","Cedars fungal / mycobacterial blood culture","Blood cultures","C","bloodbottle","red","MYCO","Specialized Myco/F Lytic bottle where ordered; not an adult routine culture bottle.","cedars:fungal",""],["quest-adult","Quest adult blood culture set","Blood cultures","Q","questpair","mixed","FA / FN","Quest BacT/ALERT adult aerobic (FA Plus, green) and anaerobic (FN Plus, orange) blood culture bottles. Collect and transport per current Quest guidance; this is a separate bottle system from Cedars BACTEC.","","https://info.biomerieux.com/rs/315-VKA-657/images/clin_us_page_virtuo-media-bottles.jpg"],["quest-peds","Quest pediatric blood culture","Blood cultures","Q","questpeds","yellow","PF PLUS","Quest BacT/ALERT PF Plus pediatric bottle with yellow cap. Follow the ordered test’s age/weight, draw volume, collection and transport requirements; keep at room temperature.","","https://info.biomerieux.com/rs/315-VKA-657/images/clin_us_page_virtuo-media-bottles.jpg"],["quest-fungal","Quest fungal / mycobacterial blood culture","Blood cultures","Q","questfungal","red","MYCO/F","Quest BD BACTEC Myco/F Lytic specialized bottle for ordered mycobacterial or fungal blood cultures, separate from routine BacT/ALERT bacterial blood cultures. Confirm the current test-specific protocol.","cedars:fungal","https://www.questdiagnostics.com/healthcare-professionals/test-directory/specimen-handling/specimen-collection"],["cedars-eswab","Cedars white-top eSwab","Swabs & kits","C","swab","white","eSwab","Cedars swab-based culture reference; verify specimen source and test.","cedars:eswab",""],["cedars-utm","Cedars red-top UTM","Swabs & kits","C","swab","red","UTM","Cedars viral/swab transport reference. Follow current test-specific instructions.","cedars:utm",""],["cedars-affirm","Cedars Affirm / ATTS","Swabs & kits","C","swab","white","AFFIRM","Cedars vaginitis test transport kit, according to ordered assay.","cedars:affirm",""]];
const labScope=(typeof document!=='undefined'&&document.body?.getAttribute('data-gallery-lab'))||'Q';
const labNames={Q:'Quest',L:'Labcorp',C:'Cedars'};
if(!['Q','L','C'].includes(labScope))throw new Error('Invalid calculator container gallery lab');
const commonCats=['Blood tubes','Urine','Transport','Stool','Swabs & kits','Blood cultures'];
let selectedLab=labScope,selectedCat='all',query='';
const E=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;'}[c]));
const list=RAW.filter(a=>a[3].split(',').includes(labScope)).map(a=>({id:a[0],name:a[1],category:a[2],labs:a[3].split(','),kind:a[4],color:a[5],label:a[6],desc:a[7],photo:a[8],external:a[9]}));
const specialNote=item=>item.id==='serum-transfer'
 ? '<div class="lcr-transport-note"><strong>Same green-cap tube</strong> for serum or plasma. <strong>Frozen transport is allowed when required by the ordered test.</strong></div>'
 : '';
const labText={Q:'QUEST',L:'LABCORP',C:'CEDARS'};
const COLORS={gold:'#d9ac28',tiger:'#ca513f',red:'#cf5754',lavender:'#9378b5',pink:'#d08aa8',lightblue:'#89d5e5',green:'#368e66',darkgreen:'#236b53',royal:'#264c95',royalred:'#284994',yellow:'#efca3a',gray:'#9aa4ad',orange:'#e58c36',white:'#eceff2',blue:'#487cb2',purple:'#7657a0',amber:'#9d6232',black:'#313c45',mixed:'#b0bfcc'};
const transportPhotos={frozen:'data:image/webp;base64,UklGRiwFAABXRUJQVlA4ICAFAACQIwCdASrwAMAAPtForlIoJaQnoTK5QQAaCWdu4MiWLxS67xpG3WVR9ZKUulaPneSJ/nkvBD9xlvtu4T71fNiappySMSa7UslClL4CrzL8vnQ3pKVePnF3NL1PmKYEHYPupwQIs7peQ9czMraJVu/YXgrau/ZP59I7l6OZWt4/aspT12bUNU3wmJWPKe3X0XA5tSs/+8iodsi2CitlLHS3mrKYT0jhG01v6hG4/a/rebVEQeM22Wn+Xn+lirw5SFiovCjcjjFlyjy3bHSXuVpVYEOj1g9f12+7p67eFVZxnMHtDvlT8vQ6l1v8453swiv3khUaWLikio6Xq5qXRNDmfSEzEBrGAK8OZQYHt7Enp2vaqYbNyaRAndk9YtcA21kmR7t+QAD9oKX3+pW/XRSM/9CvWX30cIAuJ2DJC1p9qbNBGWCRWrul2WdGtzso9jo5UDGhec+oUw2Cm9zBITIolEiwLMHfzqreSNQwfTAAFrFtQUHGdkdiffZ/Ez9PsUoxvax70G3AXWrMUIUzxbkO9Gkn8lZYMAj2BHtifIcs7In515o15/TFcka/4khVKq4fy7i9qmoPJXJUK9fwXkVUqpeEkKXMf3LKupgLfE5n6DcYum2wkdRevdFce2/WDmMbtyFWsXhkOAQfAUaOU0KhkVPGYoLXb2sddcaXzrM3DdkorJMgFLau7mW0KpUhcoDa2JLt/3jAkmtKz876Uhvsa3Bn+SrRJjh4HcAmMWCunBnfmlIX7H+zXcwU98Ka3I0+3fuPu1NR8iuDQyZsfIaFQy678nT2HKOhhSuprK1NS56wpnFF8Bg581QX0qKzNVu3oLBvfnuoA2DF54PGdvSVv1RbuUaDhfSQbUTgie7kIZjLGnLPwFuT9uFHlakFdrIpmQU0CSTMtbIbk+KZbE2h06dHc/QjgwoqNSUHs6SM9F/lDMlCkszV66d7Gzw9d6voxGIU7pQhzpLrJTqyE17ZIk8mAsGUaJcAwecbi9OqbBaZx9nOHYRvdlX/YGbeAENJ8WNSWmJDBXwZvLFWp2obitboDhRqk6pwZnEyYerFzstIbizUF1NJwTRHCdou0Ou/RVqehI13k9vGMZGRmOFTQu72MNhiW8yM0+EufGxJ1Vd6fElEl7qedUPY3SGjApvfAQEiZAuFDlmlLso4Fc5LoK/bg0HuCWjJW/7KjJfE3cW7xpCaslQtzU/Pu5ZHNTEdJaZc8ihnlVuAxf0ZGSTa62Vq235JdqQlAgNuxEe9S9XGHJ2JeON6xcPF5WUGtxW8AOb/0qteO77jVArFQoi6tq9Q3OS1f5Pfmu/sAGXqUPM88e+8CajD8YsYqL2n3EZUQGA1K+aMh8Vq9FQSMd4BLd7GuhL4i+LuNgqDR5g5oUcUJiOfdMrmhVYVbXrfeNbhYlOnok8WT5vqf1vrlzMOlQStzix7HTJ6DpWCrA7zqtBLZdIJBGSv/HAqyLyOBkU2hTG8Ge/t6+eWaaOuqXGUhx6vITKtt4p96+RrHavKncEV1UIW8Bzd7yekl0QzOgVae5eGmM0EQDqkO3a2Qnyd52UyK9fiEyTeG7mdmhH4YBr5mQ/5amOKRxthdehC4kN14EROOBVX5dhPH5kgktEYmWFXq9tmxzJpAzeMIBpinrHBbmhE/E5SuKPRfQStno305+7bcQi4u597ACxf1KQhr3dFLDhdINjLpvIeMvoeQOOl+lKQjoph36K2aKTeRt0aGW89a3bw2OVl6NFM3jgA',amber:'data:image/webp;base64,UklGRkIFAABXRUJQVlA4IDYFAAAQJQCdASrwAMAAPtFor1GoJiQnoxLY4QAaCWVu/HyGpN1Y0v1/0uFnd3Dc4WrpmdOzfPqURpJUEL59wXuC9qULsMejA5n2oUJdeqmmrRam/NsGNFINU1Snw662YitwxzPHSdJ4utV2uSwzMZBfiI4MikpAiotCPb8adtkPZQvfo7LbPl6sc8GXHnA0aGJna7YRYCQp9TKmlRznHDa/ietowDBl1+t6Gz3aPgQgObxkvcEC6eRNusddx15UgGjKFGUldxXlCZGtZPmcU2Yf76u+avHX8jbaBPim3DfeJ/+nWsgu7ycaH2eZPdX4iwQkmmaMgurhL3Yx9RyrsOU+TzenZwv/YDI3BXxx13RLJFXccdb8V29pTFV7QMHUwG3NjLDmxy8awkCCEt7oX2bz6fmrgAD6aP/ZylMhje//0XZnJ2NAfwcMomby/T0+UanFNGLby/OClE4RrRs0G6mghzLLSb8V+xPRaM+RgY5qhkg4FoHM7E8tXVfFmE8W0TAzkcsQhBZ4UZ+8IouVyEIrlbNE3dARo3uBiPUa/U1KyHkKP6m4cidw76j0oHXFNE0Hq9Fxh6Dsc6s7lIgbVC1FBqoZEDZ9GSCO9Spn/UzaYB7XHkkOrJlE0QP68p6MtubiwF/+svMJjvtUWnlmaQluU29ZWluYAQUBdL2qCKNNpGJoyUb3bDgDHmVwfSX4FK348eLxLo/s07gifDroky7Vvjclyp5G20OCVZAbxo2t3wwqZ8MyJ3XgVS+RiC3Z5dzXFC71kDfvXAITuRoDvJKCqMV6MFtEIPLgF32YfOj6ixXFgIqTShA277leoj1nPMUzvm/xFRJ5sxREI4qN1Wx+6fY+Pkqno1dbSeJCj3fb0nKb+6MVS/A5LauBsRp2S7eOGNqKXjTrnmiER6LAXANvs1TCU64R+K5ipU7TZmC2Jbc3ASaeIJuYXxOqMfkQQ+i9K1lL6jyE+Va6SUM2CWqyp9YWESSPD4W+x3C6skafk70d2yRpk2d3eOBl0w0MH1V5lXhvVn8Qi0Hpo23uaiQX4ZnYz8NS6h6e/Kc+Ov7QGX1d1ktuwRz2PlkYTibFtq+h1bGbnLUvxnytZSAGqI9s1mLtBc0rXxGz91b7ezR2pGiu4jmiQKUMd0HiHfOt0kV3gDMyq5JbD0kT3Ui0JAWYZWULiw8EvSx5mGnk/qGGBevw8BnsY9qkJlK+xJN3LP9U4JDM/zUrsFrwXt1fXBhMr1rVEwd805pwZIZnI0iChYIi8OwJK2KzY2K5VUjqUuPVG1vbjj45PUd22FVceBsMVpHaRUo01Al3Ria77GBPDAPSCoxU6IBAfGXa4FAKyFDqBnJeig9goyj4twElnCzneGOtuZhc7LMoH2rD7g91WEQ5Zf99xl56bGAVECphnmHy0kE0UCnX+WiDk+gZRcgePOD+ku+P4xRP1XmUiwYBSqBJcUTWM9Oy89NfcE591eOy/bCYry3u6LIw9V9LH8TJgUm63NkQpFuKos4pZVyK5s/Zai99i+miJfv+oYfRQzKhXvs0JCOg8GDMPAv1Uhkox7U7jACOmRvRe04Hio0rJZboGMMZJeunBD6OEv18n6Nsb6VZWHWVOTg0c4/pRgo7038+Mk3r3kAgGokWRehFeQXzTepc9hXiX4s6+QKcgOek5gNLbwPKiaval7XF4H/ohs+po0VXeeD5bSgAOkXU71OxdCr0Rrf9y8s9LeY+NLvQxM9dN8aHN7lDnahHtxq40Pm63QrGAMu7J10SirjKcVrbp4dHeMAAAA=='};
const photoFallback={Q:'https://testdirectory.questdiagnostics.com/test/home',L:'https://www.labcorp.com/test-menu/search',C:'https://www.cedars-sinai.org/'};
const referencePhotos={
 'aptima-swab':"https://5amlim.github.io/Lab-Central/assets/containers/aptima-multitest-swab.webp",
 'quest-trace-vial':'https://5amlim.github.io/Lab-Central/assets/containers/quest-trace-serum.webp',
 'quest-trace-multi':'https://5amlim.github.io/Lab-Central/assets/containers/quest-trace-wholeblood-rbc-plasma.webp',
 'pink-edta':'https://5amlim.github.io/Lab-Central/assets/containers/pink-edta-reference.webp',
 'quest-adult':'https://5amlim.github.io/Lab-Central/assets/containers/quest-adult-blood-culture.webp',
 'quest-peds':'https://5amlim.github.io/Lab-Central/assets/containers/quest-pediatric-blood-culture.webp',
 'acd-yellow':'https://5amlim.github.io/Lab-Central/assets/containers/yellow-acd-blood-tube.webp'
};
function photo(item){
 if(referencePhotos[item.id])return referencePhotos[item.id];
 if(item.id==='frozen-transfer')return transportPhotos.frozen;
 if(item.id==='amber-protect')return transportPhotos.amber;
 if(item.photo.startsWith('old:'))return window.LAB_TUBE_IMAGES?.[item.photo.slice(4)]||'';
 if(item.photo.startsWith('cedars:'))return window.CEDARS_CONTAINER_PHOTOS?.[item.photo.slice(7)]||'';
 // Do not put an HTML test-directory or vendor page into an <img> tag.
 // Keep these as external sources for the detail view instead.
 return /\.(?:png|jpe?g|webp|gif)(?:[?#]|$)/i.test(item.external)?item.external:'';
}
function photoSource(item){return referencePhotos[item.id] || item.external || (item.photo.startsWith('cedars:')?'https://5amlim.github.io/Lab-Calculator/cedars-container-guide.html':photoFallback[item.labs[0]]);}
function svg(item){
 // Device-specific, scale-conscious SVG reference silhouettes. These are illustrations,
 // not substitutes for the product label or the receiving lab's collection instructions.
 const id=E(item.id),c=COLORS[item.color]||'#9caeba',kind=item.kind;
 const S=(v)=>E(v), R=(x,y,w,h,fill,rx=0,stroke='none',sw=1)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
 const P=(d,fill,stroke='none',sw=1)=>'<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>';
 const L=(x,y,x2,y2,color='#8da4af',width=1)=>'<path d="M'+x+' '+y+'L'+x2+' '+y2+'" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round"/>';
 const T=(x,y,word,size=9,color='#405967',weight=700)=>'<text x="'+x+'" y="'+y+'" font-family="Arial,Helvetica,sans-serif" font-size="'+size+'" font-weight="'+weight+'" fill="'+color+'" text-anchor="middle">'+S(word)+'</text>';
 const ELL=(cx,cy,rx,ry,fill,stroke='none')=>'<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'" stroke="'+stroke+'"/>';
 const glass='url(#lcr-glass-'+id+')',amber='url(#lcr-amber-'+id+')';
 const barcode=(x,y,w=24)=>{
  let z='';let px=x;
  for(const width of [1,2,1,1,3,1,2,1,1,2,2,1,1,3,1,2]){
   if(px+width>x+w)break;
   z+=R(px,y,width,12,'#738b97',0,'none',0);px+=width+1;
  }return z;
 };
 const ribs=(x,y,w,h)=>{let z='';for(let k=x+5;k<x+w-3;k+=6)z+=L(k,y+4,k,y+h-4,'#fff',.8);return z;};
 const cap=(x,y,w,h,color,variant='solid')=>{
  let z=R(x,y,w,h,color,4,'#728b96',1.3)+R(x+2,y+2,w-4,3,'#fff',2,'none',0)+ribs(x,y,w,h);
  if(variant==='tiger'){
   z+=R(x,y,w,h,'url(#lcr-tiger-'+id+')',4,'#71838f',1.2)+ribs(x,y,w,h);
  }else if(variant==='swirl'){
   z+=P('M'+x+' '+(y+4)+'l10 -3 16 '+(h-3)+'h-9Z','#c7333e')+
      P('M'+(x+28)+' '+(y+1)+'h9l'+(w-25)+' '+(h-3)+'h-9Z','#bb2439');
  }
  return z+R(x+3,y+h-1,w-6,3,'#6e8794',1);
 };
 const uaSwirlCap=(x,y,w,h)=>{
  // Distinct irregular red/yellow swirls across the cap body and lip.
  let z=R(x,y,w,h,'#f2d356',5,'#b39c56',1.4);
  z+=R(x+3,y+2,w-6,3,'#f9e27d',2);
  z+=P('M'+(x+2)+' '+(y+17)+
    ' C'+(x+9)+' '+(y+1)+' '+(x+21)+' '+(y+1)+' '+(x+29)+' '+(y+13)+
    ' S'+(x+46)+' '+(y+26)+' '+(x+w-3)+' '+(y+8),'none','#b63d34',7);
  z+=P('M'+(x+5)+' '+(y+23)+
    ' C'+(x+16)+' '+(y+11)+' '+(x+25)+' '+(y+13)+' '+(x+34)+' '+(y+22)+
    ' S'+(x+47)+' '+(y+17)+' '+(x+w-5)+' '+(y+20),'none','#da5b40',5);
  z+=P('M'+(x+6)+' '+(y+6)+
    ' C'+(x+20)+' '+(y+2)+' '+(x+29)+' '+(y+5)+' '+(x+38)+' '+(y+10),'none','#bf4037',4);
  z+=P('M'+(x+11)+' '+(y+18)+
    ' Q'+(x+23)+' '+(y+10)+' '+(x+33)+' '+(y+20),'none','#f5d75e',3.6);
  z+=R(x+4,y+h-2,w-8,3,'#b84d3c',1,'#ac5441',.6);
  return z;
 };
 const paper=(x,y,w,h,title,sub,accent,small=false)=>{
  const sz=small?7:8.5;
  return R(x,y,w,h,'#fff',2,'#c8d7df',.9)+R(x+2,y+3,4,h-6,accent,1)+
    T(x+w/2+1,y+13,title,sz,'#415c6d')+
    (sub?T(x+w/2+1,y+25,sub,6.1,'#66808e',600):'')+
    barcode(x+w/2-13,y+h-15,26);
 };
 function vacutainer(col,title,sub,opts={}){
  const x=109,y=7,w=42,bottom=137;
  let v=P('M'+x+' 29H'+(x+w)+'V117Q'+(x+w)+' '+bottom+' '+(x+w/2)+' '+bottom+'Q'+x+' '+bottom+' '+x+' 117Z',
       glass,'#86a0ad',1.6);
  v+=R(x+3,109,w-6,10,opts.gel?'#e4ce86':'#e3edf0',2,'none',0);
  if(opts.gel)v+=ELL(x+w/2,122,w/2-5,4,'#dcc67a');
  v+=L(x+4,36,x+4,120,'#fff',2);
  v+=cap(x-4,y,w+8,25,col,opts.pattern||'solid');
  v+=paper(x+4,53,w-8,52,title,sub,opts.stripe||col,true);
  if(opts.highVolume)v+=T(130,144,'7.5 mL',7.4,'#8295a0',600);
  return v;
 }
 function urineTube(col,title,preservative=false){
  const x=103,w=54,y=9;
  let v=preservative
   ? P('M'+x+' 33H'+(x+w)+'V109L138 139Q130 145 122 139L'+x+' 109Z',glass,'#8ca4b0',1.6)
   : P('M'+x+' 33H'+(x+w)+'V121Q'+(x+w)+' 142 130 142Q'+x+' 142 '+x+' 121Z',glass,'#8ca4b0',1.6);
  v+=preservative
   ? P('M107 108H153L132 132Q130 134 128 132Z','#f2de9f')
   : ELL(130,129,22,9,'#f2e4b4');
  // The conical BD 8 mL preservative version has a red/yellow marbled
  // conventional closure, unlike the plain-yellow Hemogard variant.
  v+=preservative?uaSwirlCap(x-3,y,w+6,25):cap(x-3,y,w+6,25,col,'solid');
  v+=R(111,55,38,45,'#fff',2,'#cad9e1')+
      T(130,69,title,8.1)+T(130,80,preservative?'PRESERVED':'CULTURE',6.8,'#748793')+
      L(108,108,152,108,'#be6f56',1.7)+T(130,105,'FILL',6,'#a36f62');
  return v;
 }
 function transport(){
  // One shared green screw-cap aliquot tube for serum or plasma; no implication
  // that these are interchangeable for a particular laboratory test.
  const x=105,w=50;
  return P('M'+x+' 44H'+(x+w)+'V119Q'+(x+w)+' 138 130 138Q'+x+' 138 '+x+' 119Z',glass,'#91a9b3',1.7)+
   cap(101,18,58,28,'#368d61')+
   R(110,72,40,41,'#fff',2,'#cedce3')+
   T(130,85,'SERUM',8.5)+T(130,95,'OR PLASMA',7.4)+
   T(130,107,'ALIQUOT',6.4,'#788c99',600)+
   L(110,51,110,123,'#fff',2)+
   [0,1,2,3].map((_,i)=>L(147,116+i*5,151,116+i*5,'#8ea2ad',.9)).join('');
 }
 function labcorpFrozenTube(){
  // Upright clear Labcorp specimen tube with purple threaded cap and
  // integrated lavender inner insert, based on the supplied reference.
  const x=109,w=42;
  let z=P('M109 38H151V120Q151 138 130 138Q109 138 109 120Z',
   glass,'#8da5b5',1.55)+
   P('M116 45H144V117Q144 129 130 130Q116 129 116 117Z',
   '#c9b9e9','#9f8abc',.75)+
   P('M120 47H140V118Q140 125 130 127Q120 125 120 118Z',
   '#b49cdb','none',0)+
   R(119,65,22,40,'#b7a2dd',2,'#9c87c4',.65)+
   T(130,80,'FROZEN',6.8,'#544171')+
   T(130,89,'SPECIMEN',5.6,'#604a7c',600)+
   L(113,44,113,118,'#fff',2)+
   ELL(130,132,15,3,'#e8eff6');
  z+=R(104,14,52,26,'#754195',5,'#593273',1.5)+
   R(107,15,46,4,'#a97dc1',3);
  for(let i=0;i<10;i++)z+=L(109+i*4.5,22,109+i*4.5,36,'#b28fc6',.8);
  z+=R(109,39,42,3,'#805a97',1);
  return z;
 }
 function amberPhotoTube(){
  // Upright brown graduated light-protection tube, not a horizontal vial.
  let z=P('M108 38H152V119Q152 139 130 139Q108 139 108 119Z',
   '#985e33','#824925',1.6)+
   P('M112 41H118V121Q118 131 124 134Q114 133 112 121Z',
   '#ce9762','none',0)+
   P('M143 41H148V119Q148 129 143 133Z','#763e21','none',0)+
   L(115,46,115,112,'#f1c296',1.4)+
   R(117,54,27,13,'#edd9bf',1,'#bd956d',.65)+
   T(130,63,'LIGHT',7.5,'#69462c');
  for(let i=0;i<6;i++){
    const y=77+i*9;
    z+=L(143-(i%2===0?11:7),y,144,y,'#f3dbc2',1.3);
  }
  z+=R(103,14,54,26,'#8d532f',5,'#693b23',1.5)+
   R(106,15,48,4,'#c59765',3);
  for(let i=0;i<10;i++)z+=L(108+i*4.8,22,108+i*4.8,36,'#be8956',.85);
  z+=R(110,39,40,3,'#885a35',1);
  return z;
 }
 function cultureUrine(){
  // BD 364951: 13 × 75 mm, 4 mL, gray closure and distinctly rounded base.
  const x=112,w=36;
  return P('M'+x+' 53H'+(x+w)+'V117Q'+(x+w)+' 136 130 136Q'+x+' 136 '+x+' 117Z',
      glass,'#89a2ad',1.6)+
    cap(x-3,30,w+6,23,'#a2a7ab')+
    R(115,65,30,47,'#fff',2,'#cad8df')+
    T(130,78,'C&S',8)+T(130,88,'4 mL',7.5)+
    L(115,103,145,103,'#ae8a60',1.4)+T(130,100,'MIN',6,'#a18065')+
    L(116,57,116,124,'#fff',1.4);
 }
 function microtainer(){
  const isAmber=item.id==='microtainer-sst';
  return R(106,36,48,93,isAmber?amber:glass,6,'#8ba0a9',1.5)+
    R(100,22,60,24,c,3,'#738995',1.4)+ribs(100,22,60,24)+
    R(108,69,44,43,isAmber?'#d7b878':'#fff',2,'#c6d6dc')+
    T(130,82,'BD',7.5)+T(130,94,'MICRO',9.5)+T(130,105,item.label,8)+
    L(110,52,110,127,'#fff',1.9);
 }
 function stoolVial(x,topColor,title,subtitle,w=47){
  const center=x+w/2;
  let v=R(x,43,w,91,glass,6,'#8ca5af',1.6)+
    R(x-4,22,w+8,26,topColor,5,'#8b9aa2',1.2)+ribs(x-4,22,w+8,26)+
    R(x+4,68,w-8,51,'#fff',2,'#cbd7dc')+
    R(x+5,91,w-10,4,'#c85150',1)+
    T(center,79,'Para-Pak',7.5,'#334a57')+
    T(center,90,title,7.7,'#455e6c')+
    T(center,108,subtitle,6,'#627d89',600)+
    L(x+8,59,x+w-8,59,'#b9cad1',1.1)+
    L(x+5,124,x+w-5,124,'#c2d0d7',1);
  return v;
 }
 function bactec(x,capColor,label,bandColor='#bdd2e0',size=63){
  const center=x+size/2,bodyY=64,shoulder=61;
  let z=P('M'+(center-12)+' 39V48C'+(center-17)+' 54 '+(x+1)+' 61 '+x+' 75V122Q'+x+' 134 '+(x+12)+' 134H'+(x+size-12)+'Q'+(x+size)+' 134 '+(x+size)+' 122V75C'+(x+size-1)+' 61 '+(center+17)+' 54 '+(center+12)+' 48V39Z',glass,'#8fa4ad',1.6)+
    R(center-17,19,34,22,capColor,4,'#7e9199',1.4)+
    R(center-14,15,28,8,'#f1f4f5',4,'#82939b',1.1)+
    R(x+4,83,size-8,37,'#fff',2,'#d1dfe4')+
    R(x+5,106,size-10,13,bandColor,1)+
    T(center,95,'BD BACTEC',8.3,'#3e5868')+
    T(center,115,label,8,bandColor==='#8d315e'?'#fff':'#315466')+
    barcode(center-18,96,36)+
    ELL(center,127,size/2-7,5,'#b9a78c')+
    L(x+7,75,x+7,128,'#fff',2);
  return z;
 }
 function bactAlert(x,capColor,label,w=55){
  // Taller, round-sided BacT/ALERT shape with colored flat cap, wraparound
  // barcode label, and tan polymer bead medium (not the Cedars BACTEC art).
  const cx=x+w/2,y=24;
  let z=P('M'+(cx-13)+' 42L'+(cx-13)+' 51Q'+x+' 56 '+x+' 70V119Q'+x+' 135 '+(x+12)+' 135H'+(x+w-12)+'Q'+(x+w)+' 135 '+(x+w)+' 119V70Q'+(x+w)+' 56 '+(cx+13)+' 51V42Z',glass,'#90a5af',1.6)+
    R(cx-19,17,38,23,capColor,4,'#7b949d',1.3)+
    R(cx-17,16,34,6,'#ffffff',3,'#9caeb7',.9)+
    R(x+4,76,w-8,42,'#fff',1.5,'#d1dfe6',.8)+
    T(cx,86,'BacT/ALERT',7.2,'#344e60')+
    T(cx,98,label,8,'#344e60')+
    barcode(x+7,101,w-14)+
    R(x+5,120,w-10,10,'#d8c49b',3)+
    ELL(cx,129,w/2-7,4,'#d4ba8b')+
    L(x+5,60,x+5,130,'#fff',1.7);
  return z;
 }
 function traceVial(){
  // Real Quest specimen family: two tall, clear round-bottom vials with
  // white ribbed screw caps. The specimen-specific LABEL is colored,
  // never the closure. The Cedars entry remains a generic neutral option.
  const isRed=item.id==='quest-trace-vial';
  const isPurple=item.id==='quest-trace-multi';
  const quest=isRed||isPurple;
  const band=isRed?'#ce5b43':isPurple?'#b985c2':'#8da5ad';
  const ink=quest?'#252a2e':'#385566';
  const x=108,w=44;
  let z=P('M'+x+' 34H'+(x+w)+'V116Q'+(x+w)+' 137 130 139Q'+x+' 137 '+x+' 116Z',
   glass,'#9eb0b7',1.45);
  // White cap and long unlabelled neck, as in the supplied Quest photo.
  z+=R(104,11,52,23,'#f2f3f0',5,'#b5bfc2',1.3)+
   R(108,13,44,3,'#ffffff',2);
  for(let i=0;i<7;i++)z+=L(110+i*6,19,110+i*6,29,'#d3d9da',.65);
  z+=L(112,38,112,121,'#fff',2)+
    L(148,39,148,119,'#d2e0e7',.85)+
    ELL(130,129,18,4,'#edf1f3');
  // Red label = serum. Lavender/purple label = WB/RBC/plasma.
  z+=R(108,72,44,37,band,2,'#ffffff',.4);
  if(quest){
   z+=T(130,81,'Quest',8.8,'#202225',800)+
     T(130,89,'DIAGNOSTICS',4.9,ink,600)+
     T(130,98,isRed?'SERUM':'WHOLE BLOOD',isRed?8:6.6,ink,800)+
     T(130,105,isRed?'METAL-FREE':'RBC / PLASMA',5.9,ink,700);
  }else{
   z+=T(130,86,'TRACE',8,ink)+
     T(130,95,'METAL-FREE',7,ink)+
     T(130,104,'TRANSFER',6,ink);
  }
  return z;
 }
 function aptimaUrine(){
  // Hologic Aptima urine kit: WHITE screw cap, yellow vertical label with
  // black fill-band marks and disposable urine-transfer pipette.
  const x=85,w=48;
  let z=P('M'+x+' 39H'+(x+w)+'V123Q'+(x+w)+' 139 109 139Q'+x+' 139 '+x+' 123Z',glass,'#91a6af',1.5)+
    cap(81,14,56,27,'#f3f5f4')+
    R(91,50,36,77,'#f3dc3c',2,'#d3c342',.7)+
    T(109,65,'HOLOGIC',7.1,'#393522')+
    T(109,78,'Aptima',8.6,'#373625')+
    T(109,88,'URINE',6.8,'#4a3b29')+
    R(95,95,28,20,'#fff5bb',1,'#c7aa3d',.7)+
    L(96,99,122,99,'#4e4434',2.2)+
    L(96,110,122,110,'#4e4434',2.2)+
    T(109,107,'FILL',6.8,'#393522')+
    T(109,121,'2.0 mL',6.1,'#5a4d2d')+
    L(90,43,90,125,'#fff',1.3);
  z+=ELL(185,37,8,12,'#f2f9fb','#9bb4bf')+
    P('M180 48H190L188 93L185 133L182 93Z',glass,'#a8bfc8',1.3)+
    L(185,51,185,119,'#ffffff',1.3)+
    T(184,144,'PIPETTE',6.7,'#78909b',600);
  return z;
 }
 function aptimaSwab(){
  // Hologic Multitest Swab Transport Media (STM), 2.9 mL.
  // White vertically ribbed cap and tall orange label, without a separate
  // external swab drawing (the photographed transport tube only).
  const x=110,w=40;
  let z=P('M110 37H150V121Q150 139 130 139Q110 139 110 121Z',
    glass,'#a7bbc4',1.5);
  z+=R(114,47,32,9,'#d8aa86',1,'none',0)+
    R(114,118,32,6,'#f8f9f9',2,'none',0)+
    L(115,42,115,125,'#fff',1.6);
  z+=R(111,56,38,64,'#e67733',2,'#ce6630',.8)+
    R(114,58,3,60,'#f79b5b',1,'none',0)+
    T(131,71,'HOLOGIC',6.7,'#192e39',750)+
    T(131,84,'Aptima',10,'#152a34',800)+
    T(131,96,'MULTITEST',5.7,'#263c41',650)+
    T(131,105,'SWAB STM',6.2,'#263c41',650)+
    T(131,115,'2.9 mL',6.8,'#263c41',650);
  z+=R(105,13,50,27,'#f2f3f1',4,'#9aadb6',1.4)+
    R(108,14,44,4,'#fff',2);
  for(let i=0;i<9;i++)z+=L(110+i*5,20,110+i*5,35,'#cbd3d6',.9);
  z+=R(110,39,40,3,'#cfd7d9',1);
  return z;
 }
 function swabTransport(){
  const cobas=item.id==='cobas-swab',utm=item.id==='utm'||item.id==='cedars-utm';
  const x=91;
  let z=P('M'+x+' 38H132V123Q132 138 111.5 138Q'+x+' 138 '+x+' 123Z',glass,'#90a6b0',1.6)+
    cap(x-3,15,47,27,c)+
    R(95,71,33,44,'#fff',2,'#d4e0e5')+
    T(111.5,84,cobas?'cobas':utm?'UTM':item.id==='aptima-swab'?'APTIMA':'eSwab',7.6)+
    T(111.5,95,cobas?'PCR':utm?'VIRAL':item.id==='aptima-swab'?'NAAT':'AMIES',7)+
    L(97,52,97,126,'#fff',2);
  z+=L(170,44,170,129,utm?'#84a5bd':'#9bafb8',3)+
    ELL(170,35,6.5,13,utm?'#fbf5f0':'#fff','#a9b9be')+
    T(170,145,'SWAB',7,'#8299a8',600);
  if(cobas)z+=R(86,11,54,5,'#f1d234',2);
  return z;
 }
 function cobasUrine(){
  // cobas urine PCR kit has yellow-capped transport tube and a transfer pipette.
  const tube=P('M92 42H134V124Q134 139 113 139Q92 139 92 124Z',glass,'#90a6b0',1.6)+
    cap(88,17,50,26,'#e7cf32')+
    R(97,71,32,43,'#fff',2,'#d4e0e5')+
    T(113,84,'cobas',8)+T(113,96,'URINE PCR',6.5)+
    L(98,51,98,127,'#fff',2);
  const pipette=ELL(178,41,9,14,'#edf5f8','#a9bdc6')+
    P('M174 52H182L181 110L178 136L175 110Z','#f3f9fa','#a9bdc6',1.2)+
    L(178,55,178,124,'#fff',1.5)+T(178,145,'PIPETTE',7,'#8198a8',600);
  return tube+pipette;
 }
 function uriSponge(){
  let v=R(51,38,61,98,glass,5,'#91a9b4',1.5)+R(57,73,49,42,'#fff',2,'#cfdee3')+
    T(81,87,'Copan',9)+T(81,101,'UriSponge',7.2,'#486a87')+
    L(57,43,57,128,'#fff',2);
  // Yellow screw cap, stem and two separate cylindrical absorbent sponges.
  v+=R(165,106,49,23,'#f4cf2d',5,'#bc9e27',1.2)+ribs(165,106,49,23)+
    R(187,46,5,60,'#f0c52d',2)+
    R(178,24,10,38,'#e6d6aa',3,'#c5b88c',1)+
    R(190,24,10,38,'#e6d6aa',3,'#c5b88c',1)+
    ELL(183,24,5,3,'#f5e5c4')+ELL(195,24,5,3,'#f5e5c4')+
    T(188,144,'INTEGRATED CAP',6.7,'#8197a5',600);
  return v;
 }
 function conical(){
  return P('M108 44H152V112L134 138Q130 142 126 138L108 112Z',glass,'#829eaa',1.7)+
    cap(105,20,50,25,c)+
    R(112,67,36,34,'#fff',2,'#cbdce2')+
    T(130,81,'STERILE',7.5)+T(130,92,'50 mL',8.5)+
    [0,1,2,3,4].map((_,i)=>L(113,103+i*5,122+(i%2)*4,103+i*5,'#879eaa',1)).join('');
 }
 function cup(){
  return P('M69 52H191L179 125Q178 138 164 138H96Q82 138 81 125Z',glass,'#8fa5ae',1.6)+
    R(65,39,130,19,c,6,'#91a0a8',1.4)+
    [0,1,2,3,4,5,6,7,8,9].map((_,i)=>L(72+i*13,43,72+i*13,55,'#fff',1)).join('')+
    R(91,83,80,37,'#fff',3,'#d3e0e5')+
    T(131,100,item.label,11)+T(131,111,'SPECIMEN',7,'#6b8594');
 }
 function jug(){
  // Opaque orange jug including its body, neck, and molded handle.
  const body='#ed9635',shade='#dc7d20';
  return P('M80 48Q80 43 87 43H173Q180 43 180 50V123Q180 134 169 134H91Q80 134 80 123Z',body,'#af6a27',1.8)+
    P('M180 58H201Q209 58 209 67V96Q209 104 200 104H180V91H196V72H180Z',shade,'#aa6728',1.7)+
    R(93,26,69,24,'#dc841f',4,'#9f622b',1.4)+ribs(93,26,69,24)+
    P('M88 55L94 55V124Q94 128 99 129H88Z','#ffbe71','none',0)+
    R(97,77,67,40,'#fff8e8',3,'#ba8339')+T(130,96,'24 HOUR',12,'#7b541e')+T(130,108,'URINE',7,'#8e6536');
 }
 function affirm(){
  return R(25,58,103,54,'#e4f1f6',5,'#abc4cc',1.4)+
    R(32,67,89,36,'#fff',2,'#c8dfe8')+T(75,83,'BD AFFIRM',10)+T(75,94,'ATTS',8)+
    P('M170 37H207V125Q207 135 188.5 135Q170 135 170 125Z',glass,'#91a8b2',1.5)+
    cap(166,21,45,22,'#f5f4ef')+
    R(175,71,27,37,'#fff',2,'#cddce2')+T(188,92,'ATTS',7);
 }
 let out='';
 if(kind==='questpair')out=bactAlert(37,'#95caad','FA PLUS',51)+bactAlert(168,'#eb8b35','FN PLUS',51);
 else if(kind==='questpeds')out=bactAlert(100,'#f3d53a','PF PLUS',60);
 else if(kind==='questfungal')out=bactec(97,'#7e2a4b','MYCO/F','#8d315e',66);
 else if(kind==='bloodpair')out=bactec(42,'#8763a8','ANA','#bcabd2',61)+bactec(158,'#448ab8','AERO','#b4dbed',61);
 else if(kind==='bloodbottle')out=bactec(97,item.id==='cedars-fungal'?'#7e2a4b':c,item.id==='cedars-fungal'?'MYCO/F':item.label,item.id==='cedars-fungal'?'#8d315e':'#deb3c2',66);
 else if(kind==='three')out=stoolVial(31,'#ed9c36','C&S','CULTURE')+stoolVial(107,'#d68ea9','10%','FORMALIN')+stoolVial(183,'#e8eaec','CLEAN','NO MEDIA');
 else if(kind==='stool'){
  const isTotal=item.id==='totalfix';
  const title=isTotal?'TOTAL-FIX':item.id==='stool-cary'||item.id==='stool-pcr'?'C&S':item.id==='para-formalin'?'10%':item.id==='para-pva'?'PVA':item.label;
  const sub=isTotal?'O&P':item.id==='stool-clean'?'NO MEDIA':item.id==='para-formalin'?'FORMALIN':'TRANSPORT';
  out=stoolVial(101,c,title,sub,58);
 }else if(kind==='cup')out=cup();
 else if(kind==='jug')out=jug();
 else if(kind==='aptimaurine')out=aptimaUrine();
 else if(kind==='tracevial')out=traceVial();
 else if(kind==='urisponge')out=uriSponge();
 else if(item.id==='aptima-swab')out=aptimaSwab();
 else if(kind==='swab')out=item.id==='cobas-urine'?cobasUrine():item.id==='affirm'||item.id==='cedars-affirm'?affirm():swabTransport();
 else if(item.id==='frozen-transfer')out=labcorpFrozenTube();
 else if(kind==='micro')out=microtainer();
 else if(kind==='conical')out=conical();
 else if(item.id==='ua-yellow')out=urineTube('#f0ce38','UA',true);
 else if(item.id==='urine-gray')out=cultureUrine();
 else if(item.id==='gold-sst')out=vacutainer(c,'SST','GEL', {gel:true,stripe:'#c79d28'});
 else if(item.id==='tiger-sst')out=vacutainer('#c95840','SST','GEL', {gel:true,pattern:'tiger',highVolume:true,stripe:'#d2a62f'});
 else if(item.id==='royalblue-edta')out=vacutainer('#2850a2','TRACE','EDTA',{stripe:'#9d75b4'});
 else if(item.id==='royalblue-serum')out=vacutainer('#2850a2','TRACE','SERUM',{stripe:'#d14a58'});
 else if(item.id==='serum-transfer')out=transport();
 else if(item.id==='amber-protect')out=amberPhotoTube();
 else if(item.id==='acidwash-urine')out=cup();
 else if(item.category==='Blood tubes')out=vacutainer(c,item.label.length>9?item.label.slice(0,9):item.label,
    item.id==='gray-fluoride'?'NaF / K-OX':item.id==='lightblue-citrate'?'Na CITRATE':item.id==='green-lithium'?'LITHIUM':item.id==='sodium-heparin'?'SODIUM':item.id==='acd-yellow'?'ACD':'COLLECTION',
    {stripe:c});
 else out=conical();
 const svgTop='<svg class="lcr-svg" viewBox="0 0 260 150" role="img" aria-label="Illustration of '+E(item.name)+'" xmlns="http://www.w3.org/2000/svg">'+
  '<defs><linearGradient id="lcr-glass-'+id+'" x1="0" x2="1"><stop stop-color="#fff" stop-opacity=".94"/><stop offset=".26" stop-color="#dce8ed" stop-opacity=".71"/><stop offset=".72" stop-color="#fafdff"/><stop offset="1" stop-color="#d3e0e7" stop-opacity=".8"/></linearGradient>'+
  '<linearGradient id="lcr-amber-'+id+'" x1="0" x2="1"><stop stop-color="#eec76c"/><stop offset=".56" stop-color="#b77239"/><stop offset="1" stop-color="#e8a85b"/></linearGradient>'+
  '<pattern id="lcr-tiger-'+id+'" width="23" height="23" patternUnits="userSpaceOnUse" patternTransform="rotate(27)"><rect width="23" height="23" fill="#c85442"/><rect width="11" height="23" fill="#34373b"/></pattern></defs>';
 return svgTop+ELL(130,143,83,3,'#e4edf1')+out+T(130,148,'NOT TO SCALE',6.4,'#9baab3',600)+'</svg>';
}
function belongs(x){return x.labs.includes(labScope)&&(selectedCat==='all'||x.category===selectedCat)&&(!query||[x.name,x.label,x.category,x.desc].join(' ').toLowerCase().includes(query));}
function labsFor(x){return '<span class="lcr-lab lcr-'+labScope+'">'+labText[labScope]+'</span>';}
function card(x){
 const picture=photo(x),safe=E(x.name);
 const preview=picture?'<img src="'+E(picture)+'" alt="Representative reference photo of '+safe+'" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"><span class="lcr-no-photo" style="display:none">Photo could not be loaded. Open the reference source.</span>':
 '<span class="lcr-no-photo">Reference image is illustrative. Confirm the exact collection product with the lab.</span>';
 return '<article class="lcr-card"><div class="lcr-media"><button class="lcr-art-trigger" type="button" data-lcr-open="'+E(x.id)+'" aria-label="View reference photo for '+safe+'">'+svg(x)+'<span class="lcr-hover-hint">Hover or click to view photo ↗</span></button>'+
 '<div class="lcr-hover" aria-hidden="true"><div class="lcr-hover-photo">'+preview+'</div><strong>'+safe+'</strong><small>'+(picture?'Representative photo':'No hosted photo for this variant')+'</small></div></div>'+
 '<div class="lcr-card-body"><div class="lcr-badges">'+labsFor(x)+
 (x.id==='quest-trace-vial'?'<span class="lcr-specimen-label serum">RED LABEL · SERUM</span>':
 x.id==='quest-trace-multi'?'<span class="lcr-specimen-label plasma">PURPLE LABEL · WB / RBC / PLASMA</span>':'')+
 '</div><h3>'+safe+'</h3><p>'+E(x.desc)+'</p>'+specialNote(x)+
 '<div class="lcr-card-bottom"><span>'+E(x.category)+'</span><button type="button" data-lcr-open="'+E(x.id)+'">View photo & details ↗</button></div></div></article>';
}
function visible(){return list.filter(belongs);}
function cardsFor(items){return items.map(card).join('');}
function categories(){return commonCats.filter(c=>list.some(x=>x.category===c));}
const labLinks={
 Q:'<a href="https://testdirectory.questdiagnostics.com/test/home" target="_blank" rel="noopener noreferrer">Quest Test Directory ↗</a>',
 L:'<a href="https://www.labcorp.com/test-menu/search" target="_blank" rel="noopener noreferrer">Labcorp Test Menu ↗</a>',
 C:'<a href="https://5amlim.github.io/Lab-Calculator/cedars-container-guide.html" target="_blank" rel="noopener noreferrer">Cedars container guide ↗</a>'
};
function render(){
 const opts=categories();
 if(selectedCat!=='all'&&!opts.includes(selectedCat))selectedCat='all';
 const matches=visible();
 return '<section id="labContainerReference" class="lcr" aria-labelledby="lcrTitle">'+
 '<div class="lcr-hero"><div><span class="lcr-eyebrow">'+labText[labScope]+' / SPECIMEN REFERENCE</span><h2 id="lcrTitle">'+labNames[labScope]+' Container Gallery</h2>'+
 '<p>Containers used in '+labNames[labScope]+' workflows only. Choose a category or search for a container. Always verify the ordered test\'s specific requirements.</p></div>'+
 '<span class="lcr-summary">'+list.length+' container types</span></div>'+
 '<div class="lcr-filter-bar"><div class="lcr-search-wrap"><label class="lcr-filter-label" for="lcrSearch">FIND A CONTAINER</label><input id="lcrSearch" type="search" value="'+E(query)+'" placeholder="Search name, cap, use…" autocomplete="off"></div></div>'+
 '<div class="lcr-categories"><span class="lcr-filter-label">CATEGORY</span><div class="lcr-filter-buttons" role="group" aria-label="Filter by container type">'+
 ['all',...opts].map(c=>'<button type="button" class="'+(selectedCat===c?'active':'')+'" data-lcr-cat="'+E(c)+'" aria-pressed="'+(selectedCat===c)+'">'+(c==='all'?'All containers':E(c))+'</button>').join('')+'</div></div>'+
 '<div class="lcr-results-row"><strong id="lcrResultsCount">'+matches.length+' containers</strong><span>Drawings show recognizable features. Hover for a reference photo where available; click for details.</span></div>'+
 '<div class="lcr-grid" id="lcrGrid">'+(matches.length?cardsFor(matches):'<p class="lcr-empty">No containers match these filters. Try another category or search term.</p>')+'</div>'+
 '<div class="lcr-disclaimer"><strong>Verify each ordered test with '+labNames[labScope]+'.</strong> These drawings and photo references identify container types; they do not establish test-specific acceptance, specimen volume, storage temperature or transport requirements.</div>'+
 '<div class="lcr-links">'+labLinks[labScope]+'</div>'+ 
 '<dialog class="lcr-dialog" id="lcrDialog" aria-label="Container photo and details"><div id="lcrDialogBody"></div><button type="button" data-lcr-close aria-label="Close photo viewer" class="lcr-dialog-close">✕</button></dialog>'+
 '</section>';
}
function modal(item){
 const picture=photo(item);
 const photoBox=picture?'<img src="'+E(picture)+'" alt="Representative reference photo of '+E(item.name)+'" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"><p class="lcr-photo-error" style="display:none">The reference photo is temporarily unavailable.</p>':
 '<p class="lcr-photo-error">A verified product photo is not yet available for this variant. Use the manufacturer source or receiving-lab directory.</p>';
 return '<div class="lcr-modal-head"><div class="lcr-badges">'+labsFor(item)+'</div><h2>'+E(item.name)+'</h2></div>'+
 '<div class="lcr-modal-layout"><div class="lcr-modal-art"><span>ILLUSTRATION</span>'+svg(item)+'</div><div class="lcr-modal-photo"><span>REFERENCE PHOTO</span>'+photoBox+'</div></div>'+
 '<div class="lcr-modal-info"><p>'+E(item.desc)+'</p>'+specialNote(item)+'<a href="'+E(photoSource(item))+'" target="_blank" rel="noopener noreferrer">Open reference source ↗</a></div>';
}
if(typeof document!=='undefined')document.addEventListener('click',e=>{
 const root=e.target.closest('#labContainerReference');
 if(!root)return;
 const cat=e.target.closest('[data-lcr-cat]'),open=e.target.closest('[data-lcr-open]'),close=e.target.closest('[data-lcr-close]');
 if(close){root.querySelector('#lcrDialog')?.close();return;}
 if(open){
  const item=list.find(x=>x.id===open.getAttribute('data-lcr-open'));
  const dialog=root.querySelector('#lcrDialog');
  if(item&&dialog){dialog.querySelector('#lcrDialogBody').innerHTML=modal(item);dialog.showModal();}
  return;
 }
 if(cat){selectedCat=cat.dataset.lcrCat;root.outerHTML=render();}
});
if(typeof document!=='undefined')document.addEventListener('input',e=>{
 if(!e.target.matches('#labContainerReference #lcrSearch'))return;
 query=e.target.value.toLowerCase().trim();
 const root=e.target.closest('#labContainerReference');
 if(!root)return;
 const items=visible();
 const grid=root.querySelector('#lcrGrid'),count=root.querySelector('#lcrResultsCount');
 if(grid)grid.innerHTML=items.length?cardsFor(items):'<p class="lcr-empty">No matching containers found.</p>';
 if(count)count.textContent=items.length+' containers';
});
window.LAB_CONTAINER_REFERENCE={render,items:list,draw:svg,lab:labScope,setLab(){selectedLab=labScope;selectedCat='all';query='';}};
})();