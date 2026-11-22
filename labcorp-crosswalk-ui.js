/* Full-index bidirectional crosswalk; reference-only. No specimen rules are imported. */
(() => {
  'use strict';
  const table=document.getElementById('labcorpCrosswalkBody');
  if(!table||!Array.isArray(window.QUEST_TO_LABCORP_INDEX))return;
  const rows=window.QUEST_TO_LABCORP_INDEX.slice().sort((a,b)=>a[1].localeCompare(b[1])||a[0].localeCompare(b[0]));
  const meta=window.QUEST_TO_LABCORP_METADATA||{};
  const search=document.getElementById('labcorpCrosswalkSearch');
  const filter=document.getElementById('labcorpCrosswalkFilter');
  const direction=document.getElementById('labcorpCrosswalkDirection');
  const status=document.getElementById('labcorpCrosswalkStatus');
  const summary=document.getElementById('labcorpCrosswalkCount');
  const more=document.getElementById('labcorpCrosswalkMore');
  const exportCsv=document.getElementById('labcorpCrosswalkExport');
  const heads=['crosswalkHeadCode','crosswalkHeadTest','crosswalkHeadMatch','crosswalkHeadAction'].map(id=>document.getElementById(id));
  const active=new Map((window.SEED_TESTS||[]).map(t=>[String(t.testCode),t]));
  const escape=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=s=>String(s??'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const labUrl=(name,code)=>'https://www.labcorp.com/test-menu/search?query='+encodeURIComponent(code||name);
  const questUrl='https://testdirectory.questdiagnostics.com/';
  let visible=24,reverse=null,loadError=false;
  function sourceType(row){return row[7]||(row[0]==='XXX'?'uncoded':'active');}
  function statusQuest(row){
    if(row[3])return 'suggested';
    if(Array.isArray(row[8])&&row[8].length)return 'review';
    return 'pending';
  }
  function buildReverse(index){
    if(index?.schema!==1||index.lab!=='labcorp'||!Array.isArray(index.tests))throw Error('Invalid LabCorp index');
    const byCode=new Map();
    for(const r of rows){
      const labCode=String(r[3]||'');
      if(labCode){
        if(!byCode.has(labCode))byCode.set(labCode,[]);
        byCode.get(labCode).push({code:r[0],name:r[1],source:sourceType(r),status:'suggested'});
      } else if(Array.isArray(r[8])){
        for(const review of r[8]){
          const code=String(review[0]);
          if(!byCode.has(code))byCode.set(code,[]);
          byCode.get(code).push({code:r[0],name:r[1],source:sourceType(r),status:'review'});
        }
      }
    }
    return index.tests.map(l=>{
      const matches=byCode.get(String(l[0]))||[];
      return {code:String(l[0]),name:String(l[1]),specimen:String(l[2]||''),matches,
        status:matches.some(x=>x.status==='suggested')?'suggested':matches.length?'review':'pending'};
    }).sort((a,b)=>a.name.localeCompare(b.name)||a.code.localeCompare(b.code));
  }
  function getRows(){
    const isQuest=direction.value!=='labcorp';
    const source=isQuest?rows:(reverse||[]);
    const terms=normalize(search.value).split(' ').filter(Boolean);
    return source.filter(r=>{
      const kind=isQuest?statusQuest(r):r.status;
      const legacy=isQuest&&sourceType(r)!=='active';
      if(filter.value==='suggested'&&kind!=='suggested')return false;
      if(filter.value==='review'&&kind!=='review')return false;
      if(filter.value==='pending'&&kind!=='pending')return false;
      if(filter.value==='legacy'&&!legacy)return false;
      const parts=isQuest?[r[0],r[1],r[2],r[3],r[4],r[6],...(r[8]||[]).flatMap(a=>a.slice(0,2))]
        :[r.code,r.name,r.specimen,...r.matches.flatMap(m=>[m.code,m.name])];
      const content=normalize(parts.join(' '));
      return terms.every(t=>content.includes(t));
    });
  }
  function renderQuest(r){
    const [qc,qn,qs,lc,ln,blocked,basis]=r;
    const type=sourceType(r);
    const marker=type==='legacy'?'Legacy, outside active Quest index':type==='uncoded'?'No Quest code supplied':'Active Quest index';
    let candidate='<span class="crosswalk-pending">No LabCorp code established</span>';
    if(lc)candidate='<strong>'+escape(ln)+'</strong><small>LabCorp candidate '+escape(lc)+' · Verify analyte, method and specimen</small>';
    else if(Array.isArray(r[8])&&r[8].length)
      candidate='<span class="crosswalk-review">Related directory entries, not matched:</span><small>'+
        r[8].map(x=>escape(x[0])+' '+escape(x[1])).join(' · ')+'</small>';
    const action=lc&&active.has(String(lc))
      ?'<button type="button" class="crosswalk-open" data-labcorp-code="'+escape(lc)+'">View LabCorp test</button>'
      :'<a href="'+escape(labUrl(qn,lc))+'" target="_blank" rel="noopener noreferrer">Search LabCorp directory</a>';
    return '<tr><td><strong>'+escape(qc)+'</strong><small class="'+(type==='legacy'?'crosswalk-legacy':'')+'">'+escape(marker)+'</small></td>'+
      '<td><strong>'+escape(qn)+'</strong><small>Quest specimen: '+escape(qs||'Unknown')+
      (blocked?' · Original do-not-perform reference':'')+'</small></td>'+
      '<td>'+candidate+(basis?'<small>'+escape(basis)+'</small>':'')+'</td><td>'+action+'</td></tr>';
  }
  function renderLabcorp(r){
    const matches=r.matches.filter(x=>x.status==='suggested'),reviews=r.matches.filter(x=>x.status==='review');
    let content='<span class="crosswalk-pending">No Quest cross-reference identified</span>';
    if(matches.length){
      content=matches.slice(0,5).map(x=>'<strong>'+escape(x.code)+' · '+escape(x.name)+'</strong><small>'+
        escape(x.source==='active'?'Possible Quest match, verify equivalence':'Legacy or uncoded reference, verify validity')+'</small>').join('');
      if(matches.length>5)content+='<small>+'+(matches.length-5)+' additional Quest references in CSV</small>';
    }else if(reviews.length){
      content='<span class="crosswalk-review">Related Quest names, not mapped:</span><small>'+
        reviews.slice(0,4).map(x=>escape(x.code)+' '+escape(x.name)).join(' · ')+
        (reviews.length>4?' · +'+(reviews.length-4)+' more':'')+'</small>';
    }
    return '<tr><td><strong>'+escape(r.code)+'</strong><small>Active LabCorp index</small></td>'+
      '<td><strong>'+escape(r.name)+'</strong><small>LabCorp specimen: '+escape(r.specimen)+'</small></td>'+
      '<td class="crosswalk-code-list">'+content+'</td>'+
      '<td><a href="'+escape(labUrl(r.name,r.code))+'" target="_blank" rel="noopener noreferrer">Official LabCorp lookup</a>'+
      '<small>Quest: <a href="'+questUrl+'" target="_blank" rel="noopener noreferrer">Test Directory</a></small></td></tr>';
  }
  function render(){
    const lab=direction.value==='labcorp';
    heads[0].textContent=lab?'LabCorp code':'Quest code';
    heads[1].textContent=lab?'LabCorp test':'Quest test';
    heads[2].textContent=lab?'Possible Quest cross-reference':'Possible LabCorp cross-reference';
    heads[3].textContent='Next step';
    filter.querySelector('option[value="legacy"]').hidden=lab;
    if(lab&&filter.value==='legacy')filter.value='all';
    const matched=getRows();
    const pending=lab&&!reverse;
    table.innerHTML=pending?'<tr><td colspan="4" class="crosswalk-empty">'+(loadError?'LabCorp index could not be loaded. Please refresh.':'Loading the complete LabCorp active directory…')+'</td></tr>':
      matched.slice(0,visible).map(lab?renderLabcorp:renderQuest).join('')||
      '<tr><td colspan="4" class="crosswalk-empty">No entries found for this search and filter.</td></tr>';
    more.hidden=pending||matched.length<=visible;
    const questActive=rows.filter(r=>sourceType(r)==='active');
    const activeMatches=questActive.filter(r=>Boolean(r[3])).length;
    const labMatches=reverse?reverse.filter(r=>r.status==='suggested').length:null;
    summary.textContent=(meta.questActiveCount||questActive.length).toLocaleString()+' Quest active · '+
      (meta.labcorpActiveCount||6015).toLocaleString()+' LabCorp active · '+
      activeMatches.toLocaleString()+' Quest candidate codes';
    status.textContent=pending?(loadError?'LabCorp directory unavailable':'Loading LabCorp index…'):
      'Showing '+Math.min(visible,matched.length).toLocaleString()+' of '+matched.length.toLocaleString()+
      (lab?' LabCorp':' Quest')+' comparison entries'+(labMatches!==null?' · '+labMatches.toLocaleString()+' LabCorp codes have candidate links':'')+
      ' · Similar names are not clinically verified equivalents';
  }

  // Bulk Quest -> LabCorp converter. Only explicit active-index candidates are copied.
  const converterInput=document.getElementById('crosswalkQuestInput');
  const converterOutput=document.getElementById('crosswalkLabcorpOutput');
  const converterCopy=document.getElementById('crosswalkCopyCodes');
  const converterFeedback=document.getElementById('crosswalkConverterFeedback');
  const converterWarning=document.getElementById('crosswalkConverterWarning');
  if(converterInput&&converterOutput&&converterCopy&&converterFeedback&&converterWarning){
    const questByCode=new Map();
    for(const row of rows){
      if(sourceType(row)!=='active')continue;
      const code=String(row[0]).trim();
      if(!questByCode.has(code)||(!questByCode.get(code)[3]&&row[3]))questByCode.set(code,row);
    }
    const cartList=document.getElementById('crosswalkCartList');
    const cartCount=document.getElementById('crosswalkCartCount');
    const cartStatus=document.getElementById('crosswalkCartStatus');
    const cartAdd=document.getElementById('crosswalkAddToCart');
    const cartAddText=document.getElementById('crosswalkAddToCartText');
    const cartSelectAll=document.getElementById('crosswalkSelectAll');
    let cartCandidateCodes=[],cartItems=[],cartSelected=new Set();

    function inspectCart(codes){
      const detail={action:'inspect',codes,result:null};
      document.dispatchEvent(new CustomEvent('labcorp:crosswalk-cart',{detail}));
      return Array.isArray(detail.result)?detail.result:codes.map(code=>({code,name:'',status:'unavailable'}));
    }
    function updateCartActions(){
      const available=cartItems.filter(item=>item.status==='available');
      const chosen=available.filter(item=>cartSelected.has(item.code));
      cartCount.textContent=chosen.length+' selected';
      cartAdd.disabled=chosen.length===0;
      cartAddText.textContent=chosen.length?'Add '+chosen.length+' to cart':'Add to cart';
      cartSelectAll.disabled=!available.length||chosen.length===available.length;
    }
    function renderCart(resetSelection=false){
      if(resetSelection)cartSelected.clear();
      cartItems=inspectCart(cartCandidateCodes);
      const available=cartItems.filter(item=>item.status==='available');
      if(resetSelection)available.forEach(item=>cartSelected.add(item.code));
      const availableCodes=new Set(available.map(item=>item.code));
      for(const code of cartSelected)if(!availableCodes.has(code))cartSelected.delete(code);
      if(!cartItems.length){
        cartList.innerHTML='<p class="crosswalk-cart-empty">Enter Quest codes above to see tests you can add.</p>';
        cartStatus.textContent='Only active LabCorp tests can be added to the cart.';
      }else{
        cartList.innerHTML=cartItems.map(item=>{
          const allowed=item.status==='available',selected=allowed&&cartSelected.has(item.code);
          const label=item.status==='added'?'Already in cart':allowed?'Ready to add':'Not available in active catalog';
          return '<label class="crosswalk-cart-item'+(allowed?'':' is-unavailable')+'">'+
            '<input type="checkbox" data-cart-code="'+escape(item.code)+'" '+(selected?'checked ':'')+(allowed?'':'disabled ')+' aria-label="Select LabCorp '+escape(item.code)+'">'+
            '<span class="crosswalk-cart-test"><strong>'+escape(item.code)+'</strong>'+
            '<small>'+escape(item.name||'LabCorp candidate')+'</small></span>'+
            '<span class="crosswalk-cart-item-status'+(item.status==='added'?' is-added':'')+'">'+escape(label)+'</span></label>';
        }).join('');
        const already=cartItems.filter(item=>item.status==='added').length;
        const unavailable=cartItems.filter(item=>item.status==='unavailable').length;
        cartStatus.textContent=available.length+' available'+(already?' · '+already+' already in cart':'')+
          (unavailable?' · '+unavailable+' not active or unavailable':'')+'. Verify candidate equivalence before ordering.';
      }
      updateCartActions();
    }
    cartList.addEventListener('change',event=>{
      const input=event.target.closest('input[data-cart-code]');
      if(!input)return;
      if(input.checked)cartSelected.add(input.dataset.cartCode);
      else cartSelected.delete(input.dataset.cartCode);
      updateCartActions();
    });
    cartSelectAll.addEventListener('click',()=>{
      cartItems.filter(item=>item.status==='available').forEach(item=>cartSelected.add(item.code));
      renderCart();
    });
    cartAdd.addEventListener('click',()=>{
      const codes=cartItems.filter(item=>item.status==='available'&&cartSelected.has(item.code)).map(item=>item.code);
      if(!codes.length)return;
      const detail={action:'add',codes,result:null};
      document.dispatchEvent(new CustomEvent('labcorp:crosswalk-cart',{detail}));
      const result=detail.result;
      renderCart();
      if(!result){
        cartStatus.textContent='Could not reach the calculator cart. No changes were made.';
        return;
      }
      cartStatus.textContent=result.added.length+' '+(result.added.length===1?'test':'tests')+' added to cart'+
        (result.already.length?' · '+result.already.length+' already added':'')+
        (result.unavailable.length?' · '+result.unavailable.length+' unavailable':'')+'.';
    });
    document.addEventListener('labcorp:cart-updated',()=>renderCart());

    function updateConverter(){
      const inputCodes=converterInput.value.trim().split(/[\s,;]+/).filter(Boolean);
      const seenQuest=new Set(),seenLabcorp=new Set(),converted=[],unmatched=[],unknown=[];
      let duplicates=0,matched=0;
      for(const code of inputCodes){
        if(seenQuest.has(code)){duplicates++;continue;}
        seenQuest.add(code);
        const row=questByCode.get(code);
        if(!row){unknown.push(code);continue;}
        const match=String(row[3]||'').trim();
        if(!match){unmatched.push(code);continue;}
        matched++;
        if(!seenLabcorp.has(match)){seenLabcorp.add(match);converted.push(match);}
      }
      converterOutput.value=converted.join('\n');
      converterCopy.disabled=converted.length===0;
      converterCopy.setAttribute('aria-label',converted.length?'Copy '+converted.length+' LabCorp candidate codes':'No LabCorp codes to copy');
      if(!inputCodes.length){
        converterFeedback.textContent='Enter Quest test codes to see possible matches.';
      }else{
        converterFeedback.textContent=matched+' of '+seenQuest.size+' Quest codes have candidate matches · '+
          converted.length+' unique LabCorp '+(converted.length===1?'code':'codes')+
          (duplicates?' · '+duplicates+' duplicate '+(duplicates===1?'entry':'entries')+' omitted':'');
      }
      const notes=[];
      if(unmatched.length)notes.push('No LabCorp candidate identified: '+unmatched.join(', '));
      if(unknown.length)notes.push('Not found in the active Quest index: '+unknown.join(', '));
      converterWarning.hidden=notes.length===0;
      converterWarning.textContent=notes.join(' · ');
      cartCandidateCodes=converted;
      renderCart(true);
    }
    converterInput.addEventListener('input',updateConverter);
    converterCopy.addEventListener('click',async()=>{
      if(!converterOutput.value)return;
      try{
        if(!navigator.clipboard?.writeText)throw Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(converterOutput.value);
      }catch(error){
        converterOutput.focus();
        converterOutput.select();
        if(!document.execCommand('copy')){
          converterFeedback.textContent='Copy unavailable. Select the LabCorp codes and copy manually.';
          return;
        }
      }
      converterFeedback.textContent='Copied '+converterOutput.value.split('\n').length+' LabCorp candidate '+(converterOutput.value.includes('\n')?'codes':'code')+'. Verify each test before ordering.';
    });
    updateConverter();
  }

  function download(){
    if(direction.value==='labcorp'&&!reverse){return;}
    const lab=direction.value==='labcorp',lines=[];
    if(lab){
      lines.push(['LabCorp code','LabCorp test','LabCorp specimen','Status','Quest reference codes','Quest reference names','Related but unverified Quest codes']);
      for(const r of reverse){
        const m=r.matches.filter(x=>x.status==='suggested'),review=r.matches.filter(x=>x.status==='review');
        lines.push([r.code,r.name,r.specimen,r.status,m.map(x=>x.code).join('; '),m.map(x=>x.name).join('; '),review.map(x=>x.code).join('; ')]);
      }
    }else{
      lines.push(['Quest code','Quest test','Quest specimen','Source status','Original blocked flag','Match status','Possible LabCorp code','Possible LabCorp name','Related unverified LabCorp codes','Review note']);
      for(const r of rows)lines.push([r[0],r[1],r[2],sourceType(r),r[5]?'Yes':'No',statusQuest(r),r[3],r[4],
        (r[8]||[]).map(x=>x[0]).join('; '),r[6]||'']);
    }
    const q=x=>'"'+String(x??'').replace(/"/g,'""')+'"';
    const csv='\uFEFF'+lines.map(r=>r.map(q).join(',')).join('\r\n');
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=lab?'labcorp-to-quest-all-6015.csv':'quest-to-labcorp-all-3313.csv';
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  for(const input of [search,filter,direction])input.addEventListener(input===search?'input':'change',()=>{visible=24;render();});
  more.addEventListener('click',()=>{visible+=40;render();});
  exportCsv.addEventListener('click',download);
  table.addEventListener('click',event=>{
    const btn=event.target.closest('button[data-labcorp-code]');
    if(!btn)return;
    const input=document.getElementById('libraryFilter');
    if(!input)return;
    input.value=btn.dataset.labcorpCode;
    input.dispatchEvent(new Event('input',{bubbles:true}));
    input.focus({preventScroll:true});
    input.scrollIntoView({behavior:'smooth',block:'center'});
  });
  render();
  fetch('assets/search/labcorp-tests.json?v=20261121-full-crosswalk',{cache:'no-store'})
    .then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json();})
    .then(index=>{reverse=buildReverse(index);loadError=false;render();})
    .catch(()=>{loadError=true;render();});
})();
