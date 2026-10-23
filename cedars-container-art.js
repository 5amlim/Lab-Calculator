/* Cedars container pictograms, matched to the lab owner's photos.
   Illustrations only; never use cap color alone to identify a clinical kit.
   Inline SVG means the same art prints and works offline after page load. */
(function () {
  'use strict';
  const E = (v) => String(v == null ? '' : v).replace(/[&<>"']/g,
    c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rect=(x,y,w,h,fill,rx=0,stroke='#8fa5af') =>
    '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.3"/>';
  const line=(x,y,x2,y2,c='#8fa3aa',sw=1.4)=>
    '<line x1="'+x+'" y1="'+y+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+sw+'" stroke-linecap="round"/>';
  const txt=(x,y,t,fill='#3f5866',sz=7)=>
    '<text x="'+x+'" y="'+y+'" fill="'+fill+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="'+sz+'" font-weight="700">'+E(t)+'</text>';
  const path=(d,fill,stroke='#849ba5')=>'<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.4"/>';
  // Rounded bottoms: swab media, gray-top urine cultures and stool vials.
  // Truly rounded tube base: broad U shaped arc, not a conical point.
  function roundBottomTube(x,y,w,h,cap,label,liquid='#eef3f5',labelFill='#ffffff') {
    const tip=y+h, cx=x+w/2, low=tip-13;
    const outline='M '+x+' '+(y+12)+' H '+(x+w)+' V '+low+
      ' C '+(x+w)+' '+(low+8)+' '+(x+w-6)+' '+tip+' '+cx+' '+tip+
      ' C '+(x+6)+' '+tip+' '+x+' '+(low+8)+' '+x+' '+low+' Z';
    const media='M '+(x+2)+' '+(tip-26)+' H '+(x+w-2)+' V '+(low-1)+
      ' C '+(x+w-2)+' '+(low+7)+' '+(x+w-7)+' '+(tip-2)+' '+cx+' '+(tip-2)+
      ' C '+(x+7)+' '+(tip-2)+' '+(x+2)+' '+(low+7)+' '+(x+2)+' '+(low-1)+' Z';
    return path(outline,'#f4f9fa')+path(media,liquid,'none')+
      rect(x-1,y,w+2,14,cap,4,'#728993')+
      rect(x+3,y+24,w-6,Math.min(29,h-31),labelFill,1,'#d6e0e4')+
      line(x+4,y+17,x+4,tip-14,'#fff',1.5)+
      txt(cx,y+41,label,'#476271',w<24?5.7:7);
  }
  // Conical transfer tube with a subtly rounded end, not a sharp triangle tip.
  function pointedBottomTube(x,y,w,h,cap,label,liquid='#f4e5b4') {
    const tip=y+h,cx=x+w/2;
    const cone='M '+x+' '+(y+12)+' H '+(x+w)+' V '+(tip-20)+
      ' L '+(cx+3)+' '+(tip-3)+' Q '+cx+' '+(tip+1)+' '+(cx-3)+' '+(tip-3)+
      ' L '+x+' '+(tip-20)+' Z';
    const media='M '+(x+2)+' '+(tip-31)+' H '+(x+w-2)+' V '+(tip-21)+
      ' L '+(cx+3)+' '+(tip-7)+' Q '+cx+' '+(tip-3)+' '+(cx-3)+' '+(tip-7)+
      ' L '+(x+2)+' '+(tip-21)+' Z';
    return path(cone,'#f4f9fa')+path(media,liquid,'none')+
      rect(x-1,y,w+2,14,cap,4,'#728993')+
      rect(x+3,y+24,w-6,Math.min(29,h-31),'#fff',1,'#d6e0e4')+
      line(x+4,y+17,x+4,tip-20,'#fff',1.5)+
      txt(cx,y+41,label,'#476271',w<24?5.7:7);
  }
  function tube(x,y,w,h,cap,label,liquid='#edf5f7',labelFill='#ffffff') {
    return roundBottomTube(x,y,w,h,cap,label,liquid,labelFill);
  }
  // Slender filled blood collection tube: taller colored cap, visible blood,
  // and a smaller label so the specimen is visible in every rendering size.
  function bloodTube(cap,label,blood='#a34647') {
    const x=53,y=4,w=22,h=85,capH=21,tip=y+h,cx=x+w/2,low=tip-12;
    const glass='M '+x+' '+(y+capH-2)+' H '+(x+w)+' V '+low+
      ' C '+(x+w)+' '+(low+7)+' '+(x+w-5)+' '+tip+' '+cx+' '+tip+
      ' C '+(x+5)+' '+tip+' '+x+' '+(low+7)+' '+x+' '+low+' Z';
    const fillTop=tip-43;
    const specimen='M '+(x+2)+' '+fillTop+' H '+(x+w-2)+' V '+(low-1)+
      ' C '+(x+w-2)+' '+(low+6)+' '+(x+w-6)+' '+(tip-2)+' '+cx+' '+(tip-2)+
      ' C '+(x+6)+' '+(tip-2)+' '+(x+2)+' '+(low+6)+' '+(x+2)+' '+(low-1)+' Z';
    const capRibs=[0,1,2,3].map(i=>
      line(x+4+i*4,y+3,x+4+i*4,y+capH-3,'#ffffff',0.6)).join('');
    return path(glass,'#eef6f9')+
      path(specimen,blood,'none')+
      line(x+3,fillTop,x+w-3,fillTop,'#8d3e42',0.8)+
      rect(x-2,y,w+4,capH,cap,3,'#647e89')+capRibs+
      rect(x+2,y+29,w-4,25,'#fafcfc',2,'#cfdae0')+
      txt(cx,y+44,label,'#435d69',label==='EDTA'?5.3:6.7)+
      line(x+3,y+capH+3,x+3,tip-12,'#ffffff',1.4);
  }
  function bottle(x,y,cap,band,label,wide=33,fluid='#813a31') {
    // Narrow BACTEC neck with wider shoulders, matching the bottle photos.
    const cx=x+wide/2, neck=6.2;
    return path('M '+(cx-neck)+' '+(y+17)+' V '+(y+30)+
      ' C '+(x+3)+' '+(y+38)+' '+x+' '+(y+44)+' '+x+' '+(y+56)+
      ' V '+(y+74)+' Q '+x+' '+(y+82)+' '+(x+8)+' '+(y+82)+
      ' H '+(x+wide-8)+' Q '+(x+wide)+' '+(y+82)+' '+(x+wide)+' '+(y+74)+
      ' V '+(y+56)+' C '+(x+wide)+' '+(y+44)+' '+(x+wide-3)+' '+(y+38)+
      ' '+(cx+neck)+' '+(y+30)+' V '+(y+17)+' Z','#f0f5f5')+
      path('M '+(x+3)+' '+(y+64)+' H '+(x+wide-3)+' V '+(y+74)+
      ' Q '+(x+wide-3)+' '+(y+79)+' '+(x+wide-8)+' '+(y+79)+
      ' H '+(x+8)+' Q '+(x+3)+' '+(y+79)+' '+(x+3)+' '+(y+74)+' Z',fluid,'none')+
      rect(cx-neck-2,y,neck*2+4,18,cap,3,'#72868e')+
      rect(x+3,y+52,wide-6,20,band,1,'#a4b0b4')+
      txt(cx,y+65,label,band==='#c03444'?'#fff':'#29475c',6)+
      line(x+5,y+44,x+5,y+77,'#fff',1.2);
  }
  function cup() {
    return path('M 29 30 H 99 L 94 82 Q 93 88 85 88 H 43 Q 35 88 34 82 Z','#f0f7fa')+
      path('M 36 65 H 92 L 90 82 Q 89 85 84 85 H 44 Q 39 85 38 82 Z','#e8eacb','none')+
      rect(26,21,76,13,'#e8e9e7',4,'#98a7ad')+
      rect(38,48,53,24,'#fff',2,'#dae5e8')+
      txt(64,62,'STERILE','#415d69',9)+line(41,34,43,78,'#fff',2);
  }
  function swab(cap='#f7f7f4',fluid='#eef4f8',word='eSwab') {
    const grooves=Array.from({length:5},(_,i)=>line(54+i*4,8,54+i*4,17,'#c4c9c9',.6)).join('');
    return roundBottomTube(51,6,23,83,cap,word,fluid)+grooves+
      line(86,21,86,80,'#829ca3',2.4)+
      '<ellipse cx="86" cy="17" rx="4.1" ry="7" fill="#fff" stroke="#96a5ab" stroke-width="1.4"/>';
  }
  function qft() {
    return tube(9,17,20,71,'#7b858b','NIL')+
      tube(39,17,20,71,'#39a079','TB1')+
      tube(69,17,20,71,'#e8c546','TB2')+
      tube(99,17,20,71,'#a77bb3','MIT');
  }
  function cobasKit(accessory) {
    // Same yellow-cap PCR transport kit for urine and swab.
    const packet=rect(5,25,70,39,'#fbfcfd',4,'#b7c7cf')+
      rect(5,25,70,9,'#edf3f5',3,'#aebfc8')+
      rect(11,40,58,15,'#fff',2,'#d9e3e8')+
      txt(39,49,'cobas','#405a66',10)+
      line(9,35,69,35,'#cad6da',.8);
    const tube=roundBottomTube(78,14,19,73,'#e9d130','PCR','#eaf3f7');
    if (accessory==='urine') {
      // Transfer pipette: a distinct squeezable bulb, long hollow stem and
      // narrowed tapered tip (not another swab).
      const pipette=
        '<ellipse cx="113" cy="18" rx="5.2" ry="9" fill="#f4f7f7" stroke="#9bafb8" stroke-width="1.3"/>'+
        path('M 109.6 26 L 109.6 59 L 111 77 L 113 88 L 115 77 L 116.4 59 L 116.4 26 Z',
          '#f8fbfb','#9bafb8')+
        line(113,29,113,79,'#cedcdf',.8);
      return packet+tube+pipette;
    }
    // Two cotton-tipped swabs with fine straight shafts.
    const swabs=line(108,26,108,85,'#9aabb2',1.8)+
      line(119,27,119,84,'#9aabb2',1.8)+
      '<ellipse cx="108" cy="19" rx="3.8" ry="8" fill="#fbfcfc" stroke="#a9b8bf" stroke-width="1"/>'+
      '<ellipse cx="119" cy="20" rx="3.2" ry="7" fill="#fbfcfc" stroke="#a9b8bf" stroke-width="1"/>';
    return packet+tube+swabs;
  }
  function art(key) {
    switch(key) {
      case 'adult': return bottle(25,7,'#9e71b6','#ac92ca','ANA',34,'#823a33')+bottle(70,7,'#308fcb','#badbed','AERO',34,'#823a33');
      case 'peds': return bottle(48,7,'#dea9bb','#e5a0b3','PEDS',35,'#823a33');
      case 'fungal': return bottle(46,4,'#dedfdc','#c03444','MYCO',39,'#a87843');
      case 'eswab': return swab('#f5f5f1','#eff6f7','eSwab');
      case 'utm': return swab('#c83137','#f5d8d5','UTM');
      case 'cobasUrine': return cobasKit('urine');
      case 'cobasSwab': return cobasKit('swab');
      case 'affirm': return rect(10,24,75,38,'#e4f1f7',4,'#a8c5ce')+
        rect(13,30,69,23,'#f7fbfc',3,'#adc6d3')+
        txt(46,44,'AFFIRM','#49758a',9)+tube(91,13,18,73,'#f6f7f5','ATTS');
      case 'urine': return roundBottomTube(49,6,30,83,'#a1a9a7','URINE','#f4e8b1');
      case 'ua': return pointedBottomTube(49,6,30,83,'#ffd539','UA','#f4e6af')+
        // Bold red and yellow spiral bands on the actual cap, readable at menu size.
        rect(48,5,32,18,'#ffda43',3,'#b45a32')+
        '<path d="M49 6 H56 L69 22 H61 Z" fill="#c62d39"/>'+
        '<path d="M64 6 H72 L80 16 V22 H77 Z" fill="#c62d39"/>'+
        line(49,6,79,6,'#a93039',1.6)+line(49,22,79,22,'#bb8b2e',1);
      case 'parapak': return roundBottomTube(10,20,28,68,'#efd12a','C&S','#976d47')+
        roundBottomTube(50,20,28,68,'#ca93aa','10%','#b2855a')+
        roundBottomTube(90,20,28,68,'#eef1ee','CLEAN','#906b49');
      case 'cleanStool': return roundBottomTube(47,7,34,82,'#eef1ee','CLEAN','#956b48');
      case 'formalin': return roundBottomTube(47,7,34,82,'#c987a1','10%','#b38558');
      case 'goldSst': return bloodTube('#d4a326','SST');
      case 'lavenderEdta': return bloodTube('#9980bb','EDTA');
      case 'greenHeparin': return bloodTube('#399a77','HEP');
      case 'redSerum': return bloodTube('#ca4747','SER');
      case 'sterile50': return roundBottomTube(44,5,40,84,'#edf0f0','50mL','#f1f6f7')+
        line(47,64,79,64,'#bdc8cc',1)+txt(64,74,'TUBE','#637984',6);
      case 'sterile': return cup();
      case 'qft': return qft();
      case 'aptima': return roundBottomTube(48,6,30,83,'#eac0c6','APTIMA','#f0f5f6');
      case 'fit': return tube(48,7,32,81,'#83b8ad','FIT');
      case 'surepath': return tube(46,8,36,80,'#cb87a9','PAP');
      default: return rect(35,25,58,58,'#f0f4f5',8,'#afc2c9')+
        txt(64,54,'?', '#83959b',25)+txt(64,73,'VERIFY','#748b95',7);
    }
  }
  const descriptions={
    adult:'Two adult BACTEC bottles: purple anaerobic and blue aerobic',
    peds:'Pink-cap pediatric blood culture bottle',
    fungal:'Red-label Myco/F Lytic BACTEC bottle',
    eswab:'Long white-cap eSwab tube with swab',
    utm:'Red-cap UTM tube with pink transport medium',
    cobasUrine:'Yellow-cap cobas urine PCR tube and collection kit',
    cobasSwab:'Yellow-cap cobas swab PCR kit with swabs',
    affirm:'BD Affirm ATTS swab and pale blue transport package',
    urine:'Gray-cap urine culture preservative tube',
    ua:'Red and yellow swirl-top urinalysis tube',
    parapak:'Three ParaPak stool vials with yellow, pink and white caps',
    cleanStool:'White-cap clean stool collection vial',
    formalin:'Pink-cap 10 percent Formalin stool vial',
    goldSst:'Gold-cap serum separator (SST) collection tube',
    lavenderEdta:'Lavender-cap EDTA whole-blood tube',
    greenHeparin:'Green-cap heparin blood collection tube',
    redSerum:'Red-cap serum collection tube',
    sterile50:'50 mL sterile, leak-proof specimen transport tube',
    sterile:'Clear specimen cup with white lid',
    qft:'Four QuantiFERON tubes',
    aptima:'Aptima swab transport tube, provisional illustration',
    fit:'FIT collection bottle, provisional illustration',
    surepath:'SurePath vial, provisional illustration',
    unknown:'Collection container requires identification'
  };
  function kind(value) {
    const s=String(value||'').toLowerCase();
    if (/myco\/?f|lytic|fungal blood/.test(s)) return 'fungal';
    if (/pediatric|peds/.test(s)&&/culture|bottle/.test(s))return 'peds';
    if (/adult blood culture|aerobic.*anaerobic.*bottle|blood.?pair/.test(s))return 'adult';
    if (/quanti|qft|four qft|all 4/.test(s))return 'qft';
    if (/parapak.*clean|clean stool vial|clean vial.*white/.test(s) && !/3.vial|three para/.test(s))return 'cleanStool';
    if (/para.?pak|parapak|3.vial|all three para/.test(s))return 'parapak';
    if (/10% formalin|10 percent formalin/.test(s))return 'formalin';
    if (/red.*yellow.*swirl|swirl.top|urinalysis preservative|ua preservative/.test(s))return 'ua';
    if (/gray.top|gray[- ]cap.*urine/.test(s))return 'urine';
    if (/cobas.*urine|urine.*cobas/.test(s))return 'cobasUrine';
    if (/cobas.*swab|cobas.*pcr media|pcr.*dual swab/.test(s))return 'cobasSwab';
    if (/affirm|atts/.test(s))return 'affirm';
    if (/utm|universal transport|viral transport/.test(s))return 'utm';
    if (/eswab|e.?swab/.test(s))return 'eswab';
    if (/aptima/.test(s))return 'aptima';
    if (/gold.?top|gold sst|serum separator|\bsst\b/.test(s)) return 'goldSst';
    if (/lavender|purple top|edta tube|edta whole blood/.test(s)) return 'lavenderEdta';
    if (/light green|green.?top|green heparin|heparinized/.test(s)) return 'greenHeparin';
    if (/red.?top|red serum|plain red/.test(s)) return 'redSerum';
    if (/50\s*ml.*sterile|sterile.*50\s*ml/.test(s))return 'sterile50';
    if (/sterile cup|sterile container|sterile specimen cup/.test(s))return 'sterile';
    if (/fit|fobt.chek/.test(s))return 'fit';
    if (/surepath/.test(s))return 'surepath';
    return 'unknown';
  }
  window.CEDARS_CONTAINER_ART = function (container,size) {
    const key=kind(container),label=descriptions[key]||descriptions.unknown;
    const sizeClass=['table','card','print','detail','small'].includes(size)?size:'card';
    return '<span class="cedars-container-art cedars-container-art-'+sizeClass+' cedars-container-drawing" role="img"'+
      ' aria-label="'+E('Illustration: '+label)+'" title="'+E('Drawing based on supplied container photos; verify exact kit')+'">'+
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 96" role="presentation" aria-hidden="true" focusable="false">'+
      '<ellipse cx="64" cy="91" rx="47" ry="3" fill="#e5ebee"/>'+art(key)+'</svg></span>';
  };
  window.CEDARS_CONTAINER_KIND=kind;
})();
