from playwright.sync_api import sync_playwright
from pathlib import Path
import re,json
base=Path('/mnt/data/work1176')
html=(base/'index.html').read_text()
html=re.sub(r'<link rel="stylesheet" href="[^"]+">','',html)
html=re.sub(r'<script src="(?:data|app)\.js[^\"]*"></script>','',html)
html=html.replace('</head>','<style>'+ (base/'styles.css').read_text()+'\n'+(base/'experience.css').read_text()+'</style></head>')

def load(page, state=None):
 page.set_content(html, wait_until='domcontentloaded')
 page.evaluate('''(pre) => { const data = new Map(Object.entries(pre)); Object.defineProperty(window,'localStorage', {configurable:true,value:{getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k),clear:()=>data.clear()}}); }''',state or {})
 page.add_script_tag(content=(base/'data.js').read_text())
 page.add_script_tag(content=(base/'app.js').read_text())
 page.wait_for_timeout(300)

with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width in [1280,390]:
  ctx=browser.new_context(viewport={'width':width,'height':850}); page=ctx.new_page(); errors=[]
  page.on('pageerror', lambda e:errors.append(str(e)))
  load(page)
  print('width',width,'initial',page.locator('#libraryStatus').inner_text(),'errors',errors[:1],flush=True)
  assert not errors,errors
  assert not page.locator('#clearBrowserTestsButton').is_enabled()
  page.locator('#catalogFilterButton').click()
  assert page.locator('#catalogFilterPanel').is_visible()
  print('filter panel',page.locator('#catalogFilterPanel').bounding_box(),flush=True)
  page.select_option('#specimenFilter','Urine'); a=page.locator('#libraryStatus').inner_text()
  page.select_option('#temperatureFilter','Frozen'); b=page.locator('#libraryStatus').inner_text()
  page.select_option('#temperatureFilter','');page.select_option('#specimenFilter','')
  page.locator('#pediatricFilter').check();c=page.locator('#libraryStatus').inner_text()
  page.locator('#pediatricFilter').uncheck();page.select_option('#fastingFilter','preferred');d=page.locator('#libraryStatus').inner_text()
  page.select_option('#fastingFilter','');page.locator('#spinFilter').check();e=page.locator('#libraryStatus').inner_text()
  print('filters',a,b,c,d,e,flush=True)
  page.locator('#catalogFilterReset').click()
  assert page.locator('#catalogFilterButtonText').inner_text()=='Filters'
  page.screenshot(path=str(base/f'filters_{width}.png'),full_page=False)
  page.locator('#catalogFilterDone').click(); assert not page.locator('#catalogFilterPanel').is_visible()
  assert not errors,errors
  page.close()
  page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  record={'id':'custom-smoke-one','testCode':'999991','testName':'Browser Test Only','specimenType':'Serum','drawContainer':'Red Top','transportContainer':'Transport tube','transportTemperature':'Refrigerated','status':'active','source':'Custom entry','spin':'Yes'}
  # built-in entry known from bundled data; update overrides are preserved
  d=(base/'data.js').read_text()
  seed=json.loads(re.search(r'window.SEED_TESTS\s*=\s*(\[[\s\S]*?\]);',d).group(1));orig=next(t for t in seed if t['testCode']=='223');override={**orig,'testName':'Albumin Smoke Override'}
  state={'labCollectionCalculator.userData.v1':json.dumps({'customTests':[record],'overrides':[override]}),'labCollectionCalculator.selected.v1':json.dumps([record['id'],orig['id']]),'labCollectionCalculator.statSelected.v1':json.dumps([record['id']])}
  load(page,state)
  assert page.locator('#clearBrowserTestsButton').is_enabled()
  assert '(1)' in page.locator('#browserCustomCount').inner_text()
  page.once('dialog',lambda d:d.dismiss());page.locator('#clearBrowserTestsButton').click();assert page.locator('#clearBrowserTestsButton').is_enabled()
  page.once('dialog',lambda d:d.accept());page.locator('#clearBrowserTestsButton').click();assert not page.locator('#clearBrowserTestsButton').is_enabled()
  saved=page.evaluate("JSON.parse(localStorage.getItem('labCollectionCalculator.userData.v1'))")
  selected=page.evaluate("JSON.parse(localStorage.getItem('labCollectionCalculator.selected.v1'))")
  assert saved['customTests']==[] and len(saved['overrides'])==1 and saved['overrides'][0]['testName']=='Albumin Smoke Override',saved
  assert selected==[orig['id']],selected
  assert not errors,errors
  print('clear success',width,'overrides',len(saved['overrides']),'selected',selected,'errors',errors,flush=True)
  ctx.close()
 browser.close()
