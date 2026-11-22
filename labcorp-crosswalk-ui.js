/* Full-index bidirectional crosswalk; reference-only. No specimen rules are imported. */
(() => {
  'use strict';
  const isQuestPage = document.body.dataset.galleryLab === 'Q';
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
  const active=new Map((isQuestPage?[]:(window.SEED_TESTS||[])).map(t=>[String(t.testCode),t]));
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
    if(lab&&filter.value==='legacy'){
      filter.value='all';
      // The portal button mirrors the native select even when the direction
      // switch resets an option that is no longer relevant.
      window.syncPortalSelects?.();
    }
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

  // Bulk test converter; output uses candidate codes only, never inferred collection rules.
  function initConverter(){
  const converterInput=document.getElementById('crosswalkQuestInput');
  const converterOutput=document.getElementById('crosswalkLabcorpOutput');
  const converterCopy=document.getElementById('crosswalkCopyCodes');
  const converterFeedback=document.getElementById('crosswalkConverterFeedback');
  const converterWarning=document.getElementById('crosswalkConverterWarning');
  if(converterInput&&converterOutput&&converterCopy&&converterFeedback&&converterWarning){
    const fromLab=isQuestPage?'LabCorp':'Quest';
    const toLab=isQuestPage?'Quest':'LabCorp';
    // A LabCorp entry may map to multiple candidate Quest test codes.
    const sourceRows=isQuestPage?(reverse||[]).map(item=>{
      const candidates=item.matches.filter(match=>match.status==='suggested'&&match.source==='active');
      const first=candidates[0];
      return [item.code,item.name,item.specimen,first?.code||'',first?.name||'',0,'','active',[],candidates.map(m=>m.code)];
    }):rows;
    const questByCode=new Map(),questByName=new Map();
    for(const row of sourceRows){
      if(sourceType(row)!=='active')continue;
      const code=String(row[0]).trim();
      if(!questByCode.has(code)||(!questByCode.get(code)[3]&&row[3]))questByCode.set(code,row);
    }
    for(const row of questByCode.values()){
      const key=normalize(row[1]);
      if(!key)continue;
      const matches=questByName.get(key)||[];
      matches.push(row);
      questByName.set(key,matches);
    }
    // Typeahead operates only on source-lab codes and names.
    // Keep the same listbox and exact-match ghost hint design as the main search.
    const suggestionPanel=document.getElementById('crosswalkQuestSuggestions');
    const suggestionItems=Array.from(questByCode.values());
    let suggestionMatches=[],suggestionActive=-1,suggestionEntry=null;
    const aliases=[
      [/^complete blood count\b|\bcbc\b/i,['cbc','blood count']],
      [/^comprehensive metabolic panel\b/i,['cmp','chem 14']],
      [/^basic metabolic panel\b/i,['bmp','chem 7']],
      [/^thyroid stimulating hormone\b|\btsh\b/i,['tsh','thyrotropin']],
      [/\b(?:hemoglobin a1c|hba1c|glycated hemoglobin)\b/i,['a1c','hba1c']],
      [/^erythrocyte sedimentation rate\b|^sedimentation rate\b/i,['esr','sed rate']],
      [/^c reactive protein\b/i,['crp']],
      [/^urinalysis\b/i,['ua','urine analysis']],
      [/^lipid panel\b|^lipid profile\b/i,['lipid','cholesterol panel']],
      [/\bhuman chorionic gonadotropin\b|\bhcg\b/i,['hcg','pregnancy']],
      [/^prothrombin time\b/i,['pt','inr']],
      [/^activated partial thromboplastin time\b|^partial thromboplastin time\b/i,['aptt','ptt']]
    ];
    const aliasCache=new Map();
    function searchAliases(row){
      const code=String(row[0]);
      if(aliasCache.has(code))return aliasCache.get(code);
      const name=String(row[1]||'');
      const list=aliases.filter(([pattern])=>pattern.test(name)).flatMap(([,words])=>words).map(normalize);
      aliasCache.set(code,list);
      return list;
    }
    function editDistanceAtMost(a,b,maxEdits){
      if(Math.abs(a.length-b.length)>maxEdits)return false;
      let prev=Array.from({length:b.length+1},(_,j)=>j);
      for(let i=1;i<=a.length;i++){
        const next=[i];let min=i;
        for(let j=1;j<=b.length;j++){
          next[j]=Math.min(prev[j]+1,next[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
          if(next[j]<min)min=next[j];
        }
        if(min>maxEdits)return false;
        prev=next;
      }
      return prev[b.length]<=maxEdits;
    }
    function scoreSuggestion(row,query){
      const code=String(row[0]),name=normalize(row[1]),terms=query.split(' ').filter(Boolean);
      if(code===query)return 3000;
      if(/^\d+$/.test(query)){
        if(code.startsWith(query))return 2500-(code.length-query.length);
        if(query.length>=3&&code.replace(/^0+/,'')===query)return 2450;
        return query.length>=3&&code.includes(query)?1900:0;
      }
      if(name===query)return 2800;
      if(name.startsWith(query))return 2400-Math.min(100,name.length-query.length);
      if(name.includes(query))return 2100-Math.min(100,name.length-query.length);
      const a=searchAliases(row);
      if(a.includes(query))return 2300;
      if(a.some(x=>x.startsWith(query)))return 1850;
      const words=name.split(' ');
      if(terms.every(term=>words.some(word=>word===term||word.startsWith(term))))return 1750+terms.length*10;
      if(terms.every(term=>words.some(word=>word.includes(term))))return 1450+terms.length*10;
      if(query.length>=4&&query.length<=25&&terms.length<=2){
        const edits=query.length>=7?2:1;
        if(words.some(word=>editDistanceAtMost(query,word,edits))||
           a.some(term=>editDistanceAtMost(query,term,edits)))return 850;
      }
      return 0;
    }
    // The caret determines which entry gets replaced, even with other lines already present.
    function activeConverterEntry(){
      const value=converterInput.value,pos=converterInput.selectionStart??value.length;
      const lineStart=value.lastIndexOf('\n',Math.max(0,pos-1))+1;
      const lineEndIndex=value.indexOf('\n',pos);
      const lineEnd=lineEndIndex<0?value.length:lineEndIndex;
      const upto=value.slice(lineStart,pos);
      const lastSeparator=Math.max(upto.lastIndexOf(','),upto.lastIndexOf(';'),upto.lastIndexOf('\t'));
      let start=lineStart+lastSeparator+1;
      // Space-separated numeric codes remain individually addressable.
      const section=value.slice(start,lineEnd);
      if(/^\s*\d+(?:\s+\d+)+\s*$/.test(section)){
        const prefix=value.slice(start,pos),numeric=prefix.match(/(?:^|\s)(\d*)$/);
        if(numeric)start=pos-numeric[1].length;
      }
      let end=lineEnd;
      for(const sep of [',',';','\t']){
        const i=value.indexOf(sep,pos);
        if(i>=0&&i<end)end=i;
      }
      if(start>end)start=end;
      return {start,end,query:value.slice(start,end).trim()};
    }
    function hideSuggestions(){
      suggestionPanel?.classList.add('hidden');
      if(suggestionPanel)suggestionPanel.innerHTML='';
      suggestionMatches=[];
      suggestionActive=-1;
      suggestionEntry=null;
      converterInput.setAttribute('aria-expanded','false');
      converterInput.removeAttribute('aria-activedescendant');
    }
    function activateSuggestion(index){
      if(!suggestionMatches.length||!suggestionPanel)return;
      suggestionActive=(index+suggestionMatches.length)%suggestionMatches.length;
      const buttons=suggestionPanel.querySelectorAll('.calc-suggestion-option');
      buttons.forEach((button,i)=>{
        const active=i===suggestionActive;
        button.classList.toggle('is-active',active);
        button.setAttribute('aria-selected',String(active));
      });
      const active=buttons[suggestionActive];
      if(active){
        converterInput.setAttribute('aria-activedescendant',active.id);
        active.scrollIntoView({block:'nearest'});
      }
    }
    function renderSuggestions(){
      if(!suggestionPanel)return;
      const entry=activeConverterEntry(),query=normalize(entry.query);
      if(!query){hideSuggestions();return;}
      const matches=suggestionItems.map(row=>({row,score:scoreSuggestion(row,query)}))
        .filter(item=>item.score>0)
        .sort((a,b)=>b.score-a.score||
          (a.row[1].length-b.row[1].length)||
          String(a.row[0]).localeCompare(String(b.row[0])))
        .slice(0,8);
      // Like the main search, a unique exact code or full test name
      // is already resolved; do not keep unrelated partial results open.
      const exactCode=/^\d+$/.test(query)&&
        matches.filter(item=>String(item.row[0])===entry.query).length===1;
      const exactName=(questByName.get(query)||[]).length===1;
      if(!matches.length||exactCode||exactName){
        hideSuggestions();return;
      }
      suggestionMatches=matches.map(item=>item.row);
      suggestionEntry=entry;
      suggestionActive=-1;
      suggestionPanel.innerHTML='<div class="calc-suggestion-heading">Matching '+fromLab+' tests for this line</div>'+
        matches.map(({row},i)=>{
          const code=escape(row[0]),name=escape(row[1]);
          const specimen=String(row[2]||'').trim(),match=String(row[3]||'').trim();
          const hint=[specimen,match?toLab+' candidate: '+match:'No '+toLab+' code mapped'].filter(Boolean).join(' · ');
          return '<button type="button" class="calc-suggestion-option" role="option" id="crosswalk-quest-option-'+i+
            '" aria-selected="false" tabindex="-1" data-index="'+i+'">'+
            '<span class="calc-suggestion-code">'+code+'</span>'+
            '<span class="calc-suggestion-copy"><strong>'+name+'</strong><small>'+escape(hint)+'</small></span>'+
            '<span class="calc-suggestion-arrow" aria-hidden="true">›</span></button>';
        }).join('')+
        '<div class="calc-suggestion-footer">Choose a '+fromLab+' test to fill its code · ↑ ↓ navigate · Enter select · Esc close</div>';
      suggestionPanel.classList.remove('hidden');
      converterInput.setAttribute('aria-expanded','true');
      converterInput.removeAttribute('aria-activedescendant');
    }
    function chooseSuggestion(index){
      const row=suggestionMatches[index];
      if(!row||!suggestionEntry)return;
      const {start,end}=suggestionEntry,code=String(row[0]);
      const oldFollowing=converterInput.value.slice(end);
      converterInput.setRangeText(code,start,end,'end');
      const after=start+code.length;
      // A native next line is reused, not duplicated; entries below remain unchanged.
      if(oldFollowing.startsWith('\n')){
        converterInput.setSelectionRange(after+1,after+1);
      }else if(!oldFollowing||/^[,;\t]/.test(oldFollowing)){
        if(!oldFollowing){
          converterInput.setRangeText('\n',after,after,'end');
        }else{
          converterInput.setSelectionRange(after,after);
        }
      }
      hideSuggestions();
      converterInput.focus({preventScroll:true});
      updateConverter();
      refreshConverterHints();
    }
    const refreshConverterHints=window.LabBatchInlineHints?.mount(converterInput,query=>{
      const row=questByCode.get(String(query).trim());
      if(row)return String(row[1]||'').trim()||null;
      const nameMatches=questByName.get(normalize(query))||[];
      return nameMatches.length===1?String(nameMatches[0][0]):null;
    })||(()=>{});
    converterInput.addEventListener('focus',renderSuggestions);
    converterInput.addEventListener('click',renderSuggestions);
    converterInput.addEventListener('keyup',event=>{
      if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key))renderSuggestions();
    });
    converterInput.addEventListener('keydown',event=>{
      if(event.isComposing||event.keyCode===229)return;
      if(event.key==='Escape'){hideSuggestions();return;}
      if(event.key==='Tab'){hideSuggestions();return;}
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){
        if(suggestionMatches.length){
          event.preventDefault();
          activateSuggestion(suggestionActive<0?(event.key==='ArrowDown'?0:suggestionMatches.length-1):
            suggestionActive+(event.key==='ArrowDown'?1:-1));
        }
        return;
      }
      if(event.key==='Enter'){
        if(suggestionMatches.length&&suggestionActive>=0&&!event.metaKey&&!event.ctrlKey){
          event.preventDefault();
          chooseSuggestion(suggestionActive);
        }else{
          hideSuggestions();
        }
      }
    });
    if(suggestionPanel){
      let tappingSuggestion=false;
      suggestionPanel.addEventListener('pointerdown',event=>{
        // On touch devices, the textarea may blur before the option's click.
        tappingSuggestion=Boolean(event.target.closest('button[data-index]'));
      });
      suggestionPanel.addEventListener('pointercancel',()=>{tappingSuggestion=false;});
      suggestionPanel.addEventListener('mousedown',event=>{
        if(event.target.closest('button[data-index]'))event.preventDefault();
      });
      suggestionPanel.addEventListener('click',event=>{
        const button=event.target.closest('button[data-index]');
        tappingSuggestion=false;
        if(button)chooseSuggestion(Number(button.dataset.index));
      });
      document.addEventListener('pointerdown',event=>{
        if(!event.target.closest('#crosswalkQuestAutocomplete'))hideSuggestions();
      });
      converterInput.addEventListener('blur',()=>{
        if(!tappingSuggestion&&!suggestionPanel.contains(document.activeElement))hideSuggestions();
      });
    }
    // Show the Quest test name as decorative ghost text beside each converted
    // code, just like the source input. The textarea remains codes-only for Copy.
    const questNames=new Map(rows.filter(row=>sourceType(row)==='active')
      .map(row=>[String(row[0]||'').trim(),String(row[1]||'').trim()]));
    const refreshOutputHints=window.LabBatchInlineHints?.mount(converterOutput,code=>
      questNames.get(String(code).trim())||null)||(()=>{});
    const cartAdd=document.getElementById('crosswalkAddToCart');
    const cartAddText=document.getElementById('crosswalkAddToCartText');
    let cartCandidateCodes=[],matchFeedback=[],actionFeedback='';

    // The right-hand textarea is the only selection area: remove lines to exclude
    // codes from both Copy and Add. New codes must come from the current crosswalk.
    function outputCodes(){
      return [...new Set(converterOutput.value.split(/[\n,;\t]+/)
        .flatMap(value=>{
          const trimmed=value.trim();
          return /^\d+(?:\s+\d+)+$/.test(trimmed)?trimmed.split(/\s+/):[trimmed];
        }).filter(Boolean))];
    }
    function inspectCart(codes){
      const detail={action:'inspect',codes,result:null};
      document.dispatchEvent(new CustomEvent((isQuestPage?'quest':'labcorp')+':crosswalk-cart',{detail}));
      return Array.isArray(detail.result)?detail.result:codes.map(code=>({code,name:'',status:'unavailable'}));
    }
    function renderCart(){
      const displayed=outputCodes();
      const candidates=new Set(cartCandidateCodes);
      const foreign=displayed.filter(code=>!candidates.has(code));
      const valid=displayed.filter(code=>candidates.has(code));
      const items=inspectCart(valid);
      const ready=items.filter(item=>item.status==='available');
      const already=items.filter(item=>item.status==='added');
      const unavailable=items.filter(item=>item.status==='unavailable');
      const blocked=foreign.length>0;
      // Reflect the current cart, not just the last click. If any test is
      // removed from the cart, the blue Add button becomes available again.
      const allInCart=!blocked&&displayed.length>0&&already.length===displayed.length;
      cartAdd.classList.toggle('is-added',allInCart);
      cartAdd.disabled=allInCart||!ready.length||blocked;
      cartAddText.textContent=allInCart
        ?(already.length===1?'In cart':'All '+already.length+' in cart')
        :(ready.length?'Add '+ready.length+' to cart':'Add to cart');
      cartAdd.setAttribute('aria-label',allInCart?
        already.length+' '+toLab+' '+(already.length===1?'test is':'tests are')+' already in cart':
        (ready.length?'Add '+ready.length+' '+toLab+' '+(ready.length===1?'test':'tests')+' to cart':'No '+toLab+' tests ready to add'));
      cartAdd.title=allInCart?'All selected '+toLab+' tests are in your cart':
        blocked?'Remove unmapped codes before adding':
        ready.length?'Add '+ready.length+' '+toLab+' '+(ready.length===1?'test':'tests')+' to your cart':'No new tests to add';
      converterCopy.disabled=!displayed.length;
      converterCopy.setAttribute('aria-label',displayed.length?
        'Copy '+displayed.length+' '+toLab+' '+(displayed.length===1?'code':'codes'):'No '+toLab+' codes to copy');

      // Compact, accessible color-coded segments. Keep the existing font size
      // and the distinction between candidate matches and verified equivalents.
      const parts=[...matchFeedback];
      if(cartCandidateCodes.length&&displayed.length!==cartCandidateCodes.length){
        parts.push({text:displayed.length+' '+toLab+' '+(displayed.length===1?'code':'codes')+' in output',tone:'codes',icon:'▤'});
      }
      if(blocked){
        parts.push({text:'Remove unmapped '+(foreign.length===1?'code':'codes')+': '+foreign.join(', '),tone:'warning',icon:'!'});
      }else if(ready.length){
        parts.push({text:ready.length+' ready to add',tone:'ready',icon:'+'});
      }
      if(already.length)parts.push({text:already.length+' already in cart',tone:'added',icon:'✓'});
      if(unavailable.length)parts.push({text:unavailable.length+' unavailable in catalog',tone:'warning',icon:'!'});
      if(!blocked&&!displayed.length&&cartCandidateCodes.length){
        parts.push({text:'No codes selected',tone:'note',icon:'i'});
      }
      if(actionFeedback)parts.push({text:actionFeedback,tone:'note',icon:'•'});
      converterFeedback.classList.add('crosswalk-status-line');
      converterFeedback.innerHTML=parts.map(part=>
        '<span class="crosswalk-status-item crosswalk-status-item--'+part.tone+'">'+
          '<span class="crosswalk-status-icon" aria-hidden="true">'+escape(part.icon)+'</span>'+
          '<span>'+escape(part.text)+'</span>'+
        '</span>').join('');
      return {codes:ready.map(item=>item.code),blocked};
    }
    converterOutput.addEventListener('input',()=>{
      actionFeedback='';
      renderCart();
    });
    cartAdd.addEventListener('click',()=>{
      actionFeedback='';
      const selection=renderCart();
      if(selection.blocked||!selection.codes.length)return;
      const detail={action:'add',codes:selection.codes,result:null};
      document.dispatchEvent(new CustomEvent((isQuestPage?'quest':'labcorp')+':crosswalk-cart',{detail}));
      if(!detail.result){
        actionFeedback='Could not reach calculator cart; nothing added';
      }else{
        const {added=[],already=[],unavailable=[]}=detail.result;
        actionFeedback=added.length+' '+(added.length===1?'test':'tests')+' added to cart'+
          (already.length?' ('+already.length+' already added)':'')+
          (unavailable.length?' ('+unavailable.length+' unavailable)':'');
      }
      renderCart();
    });
    document.addEventListener((isQuestPage?'quest':'labcorp')+':cart-updated',renderCart);

    function updateConverter(){
      // Names are allowed as a full line. Retain compatibility with pasted
      // whitespace-separated numeric codes without splitting multiword test names.
      const inputCodes=converterInput.value.split(/[\n,;\t]+/)
        .flatMap(value=>{
          const trimmed=value.trim();
          return /^\d+(?:\s+\d+)+$/.test(trimmed)?trimmed.split(/\s+/):[trimmed];
        }).filter(Boolean);
      const seenQuest=new Set(),seenLabcorp=new Set(),converted=[],unmatched=[],unknown=[];
      let duplicates=0,matched=0;
      for(const code of inputCodes){
        // Exact Quest names work; approximate names require deliberate selection.
        const byName=questByName.get(normalize(code))||[];
        const row=questByCode.get(code)||(byName.length===1?byName[0]:null);
        const uniqueCode=row?String(row[0]):code;
        if(seenQuest.has(uniqueCode)){duplicates++;continue;}
        seenQuest.add(uniqueCode);
        if(!row){unknown.push(code);continue;}
        const candidates=(isQuestPage?(row[9]||[]):[row[3]])
          .map(candidate=>String(candidate||'').trim()).filter(Boolean);
        if(!candidates.length){unmatched.push(code);continue;}
        matched++;
        for(const match of candidates){
          if(!seenLabcorp.has(match)){seenLabcorp.add(match);converted.push(match);}
        }
      }
      converterOutput.value=converted.join('\n');
      refreshOutputHints();
      if(!inputCodes.length){
        matchFeedback=[{text:'Enter '+fromLab+' test codes to see possible matches.',tone:'note',icon:'i'}];
      }else{
        matchFeedback=[
          {text:matched+' of '+seenQuest.size+' '+fromLab+' codes have candidate matches',
            tone:matched===seenQuest.size?'matched':'partial',icon:'↔'},
          {text:converted.length+' unique '+toLab+' '+(converted.length===1?'code':'codes'),
            tone:'codes',icon:'▤'}
        ];
        if(duplicates){
          matchFeedback.push({text:duplicates+' duplicate '+(duplicates===1?'entry':'entries')+' omitted',
            tone:'note',icon:'i'});
        }
      }
      const notes=[];
      if(unmatched.length)notes.push('No '+toLab+' candidate identified: '+unmatched.join(', '));
      if(unknown.length)notes.push('Not found in the active '+fromLab+' index: '+unknown.join(', '));
      converterWarning.hidden=notes.length===0;
      converterWarning.textContent=notes.join(' · ');
      cartCandidateCodes=converted;
      renderCart();
    }
    converterInput.addEventListener('input',()=>{actionFeedback='';updateConverter();renderSuggestions();});
    converterCopy.addEventListener('click',async()=>{
      const textToCopy=outputCodes().join('\n');
      if(!textToCopy)return;
      try{
        if(!navigator.clipboard?.writeText)throw Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(textToCopy);
      }catch(error){
        converterOutput.focus();
        converterOutput.select();
        if(!document.execCommand('copy')){
          actionFeedback='Copy unavailable; select and copy the codes manually';
          renderCart();
          return;
        }
      }
      const count=outputCodes().length;
      actionFeedback='Copied '+count+' '+toLab+' '+(count===1?'code':'codes');
      renderCart();
    });
    updateConverter();
  }
  }
  if(!isQuestPage)initConverter();

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
    .then(index=>{reverse=buildReverse(index);loadError=false;render();if(isQuestPage)initConverter();})
    .catch(()=>{loadError=true;render();if(isQuestPage){const feedback=document.getElementById('crosswalkConverterFeedback');if(feedback)feedback.textContent='LabCorp reference index unavailable. Refresh to retry.';}});
})();
