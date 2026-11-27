import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {parseArgs} from 'node:util';
import {labs, loadCalculator} from './load-calculator-catalog.mjs';

const {values} = parseArgs({options: {
  out: {type: 'string', default: 'audits/master'},
  baseline: {type: 'string'},
  'protected-baseline': {type: 'string'},
  check: {type: 'boolean'},
  revision: {type: 'string'},
  root: {type: 'string', default: '.'}
}});
const root = resolve(values.root);
const read = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const evidencePath = 'audits/master/FIELD_EVIDENCE.json';
const evidence = existsSync(resolve(root, evidencePath)) ? read(evidencePath) : {};
const rulesPath = 'audits/master/CUSTOM_RULES_REGISTRY.json';
const rules = existsSync(resolve(root, rulesPath)) ? read(rulesPath) : [];
const shortLabcorpCodes = new Set(['120', '140', '310', '325', '336', '372', '373', '591']);
const namedLabcorpCodes = new Set(['PROM-CELIAC-PLUS', 'PROM-CELIAC-SEROLOGY']);
const countsBy = (items, key) => Object.fromEntries(Object.entries(Object.groupBy(items, key))
  .sort(([a], [b]) => a.localeCompare(b)).map(([value, group]) => [value, group.length]));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const disposition = row => row.collectionReview || (row.status === 'blocked' || row.status === 'reference' || row.status === 'pending'
  ? row.specialInstructions : '');
const measurements = ['preferredVolume', 'minimumVolume'];
const clinical = [
  'status', 'specimenType', 'drawContainer', 'alternativeContainer', 'transportContainer',
  'transportTemperature', 'transportTemperatureRaw', 'stability', ...measurements, 'spin',
  'collectionCount', 'submissionCount', 'specialInstructions', 'specialLabeling',
  'fastingStatus', 'fastingInstructions', 'additionalDrawRequirements', 'usePreferredSerumYield'
];
const output = resolve(values.out);
mkdirSync(output, {recursive: true});
const writeJson = (name, data) => writeFileSync(resolve(output, name), JSON.stringify(data, null, 2)+'\n');
function writeCsv(name, columns, rows) {
  const quote = value => '"' + String(value ?? '').replaceAll('"', '""') + '"';
  const lines = rows.map(row => columns.map(column => quote(row[column])).join(','));
  writeFileSync(resolve(output, name), [columns.join(','), ...lines].join('\n')+'\n');
}

const findings = [];
const flag = (severity, issue, lab, key, detail = '') => findings.push({severity, issue, lab, key, detail});
const snapshot = {schema: 1, ...(values.revision ? {revision: values.revision} : {}), labs: {}, rules: {}};
const inventory = [];
const routes = [];
const collectionReviews = [];
const catalogs = new Map();
const fieldChanges = [];

for (const lab of labs) {
  const {records, index, globals} = await loadCalculator(root, lab, {captureRecords: true});
  const active = new Set(index.tests.map(row => row[0]));
  const committed = read('assets/search/'+lab.lab+'-tests.json');
  // Compare identity and multiplicity before collapsing rows into a map.
  // Identical duplicates otherwise pass the per-code content check below.
  for (const [origin, published] of [['runtime', index], ['committed', committed]]) {
    if (published.lab !== lab.lab || published.schema !== index.schema) {
      flag('critical', 'search-index-identity-mismatch', lab.lab, origin,
        JSON.stringify({lab: published.lab, schema: published.schema}));
    }
    const seen = new Set();
    for (const [position, row] of published.tests.entries()) {
      const code = row?.[0];
      if (!Array.isArray(row) || typeof code !== 'string' || !code.trim() || code.trim() !== code) {
        flag('critical', 'invalid-search-index-code', lab.lab, origin+'|'+position, JSON.stringify(code));
      }
      if (seen.has(code)) {
        flag('critical', 'duplicate-search-index-code', lab.lab, origin+'|'+code);
      }
      seen.add(code);
    }
  }
  const committedByCode = new Map(committed.tests.map(row => [row[0], hash(row)]));
  const reviewCodes = new Set(records.filter(row => row.status === 'active' && row.collectionReview && active.has(row.testCode))
    .map(row => row.testCode));
  if ([...(committed.collectionReviewCodes || [])].sort().join(',') !== [...reviewCodes].sort().join(',')) {
    flag('critical', 'stale-search-review-flags', lab.lab, 'published');
  }
  const stale = index.tests.filter(row => committedByCode.get(row[0]) !== hash(row)).map(row => row[0]);
  for (const row of committed.tests) if (!active.has(row[0])) stale.push(row[0]);
  if (stale.length) flag('critical', 'stale-search-index', lab.lab, 'published', stale.join(' '));
  const recordHashes = {};
  const ids = new Set();
  for (const row of records.sort((a, b) => a.testCode.localeCompare(b.testCode) || a.id.localeCompare(b.id))) {
    const code = row.testCode;
    const recordKey = code+'|'+row.id;
    const key = lab.lab+':'+code;
    if (ids.has(row.id)) flag('critical', 'duplicate-id', lab.lab, recordKey);
    ids.add(row.id);
    const validCode = lab.lab === 'quest' ? /^\d{2,8}$/.test(code) || code === 'XXX'
      : /^\d{6}$/.test(code) || shortLabcorpCodes.has(code) || namedLabcorpCodes.has(code);
    if (!validCode) flag('critical', 'nonstandard-code', lab.lab, recordKey);
    const review = evidence[key];
    const verification = review?.status ?? 'Not yet reviewed';
    if (review?.hold && row.status === 'active' && !row.collectionReview) {
      flag('critical', 'active-clinical-hold', lab.lab, recordKey, review.note);
    }
    if (row.collectionReview && !review?.hold) {
      flag('critical', 'undocumented-collection-review', lab.lab, recordKey);
    }
    inventory.push({lab: lab.lab, code, id: row.id, name: row.testName, disposition: row.status,
      indexed: active.has(code), verification, source: row.source, reason: disposition(row)});
    if (row.status === 'active' && row.collectionReview) {
      collectionReviews.push({lab: lab.lab, code, name: row.testName, verification,
        flag: row.collectionReview, source: review?.url || row.source});
    }
    for (const [routeIndex, route] of [row, ...(row.additionalDrawRequirements || [])].entries()) {
      const draw = route.drawContainer || route.container;
      const submit = route.transportContainer;
      const specimen = route.specimenType;
      const temperature = route.transportTemperature;
      routes.push({lab: lab.lab, code, id: row.id, route: routeIndex, disposition: row.status,
        specimen, draw, submit, temperature, spin: route.spin, preferredVolume: route.preferredVolume,
        minimumVolume: route.minimumVolume});
      if (row.status !== 'active' || row.collectionReview) continue;
      const routeKey = recordKey+'|'+routeIndex;
      if (!row.testName || !specimen || !draw || /^(verify|unknown|not specified)/i.test(draw)) {
        flag('warning', 'incomplete-collection-route', lab.lab, routeKey);
      }
      if (!temperature || !/^(room temperature|refrigerated|frozen|mixed)$/i.test(temperature)) {
        flag('warning', 'temperature-needs-review', lab.lab, routeKey, temperature);
      }
      const simple = value => /^\s*(\d+(?:\.\d+)?)\s*mL\s*$/i.exec(value || '')?.[1];
      const min = simple(route.minimumVolume);
      const max = simple(route.preferredVolume);
      if (min && max && Number(min) > Number(max)) {
        flag('critical', 'minimum-exceeds-preferred', lab.lab, routeKey, min+' > '+max+' mL');
      }
    }
    recordHashes[recordKey] = {
      hash: hash(row), status: row.status, verification,
      fields: Object.fromEntries(clinical.map(field => [field, hash(row[field] ?? null)]))
    };
  }
  for (const [code, count] of Object.entries(countsBy(records.filter(row => row.status === 'active'), row => row.testCode))) {
    if (count > 1) flag('warning', 'multiple-active-records-for-code', lab.lab, code, String(count));
  }
  snapshot.labs[lab.lab] = {total: records.length, rawLoaded: globals.SEED_TESTS.length,
    indexed: index.tests.length, collectionReviewCodes: reviewCodes.size, statuses: countsBy(records, row => row.status),
    verification: countsBy(inventory.filter(row => row.lab === lab.lab), row => row.verification),
    records: recordHashes};
  catalogs.set(lab.lab, {active, globals, reviewCodes});
}

const crosswalk = [];
const relationshipKeys = new Set();
const {active: activeQuest, globals, reviewCodes: questReviewCodes} = catalogs.get('quest');
const {active: activeLabcorp, reviewCodes: labcorpReviewCodes} = catalogs.get('labcorp');
const labcorpPublished = read('assets/search/labcorp-tests.json');
globals.applyQuestLabcorpWorkbookMatches?.(labcorpPublished.tests, labcorpPublished.collectionReviewCodes);
const questRows = new Set();
for (const row of globals.QUEST_TO_LABCORP_INDEX) {
  const [questCode, , , labcorpCode, , , basis, rawScope, references = []] = row;
  const scope = rawScope || (questCode === 'XXX' ? 'uncoded' : 'active');
  if (scope === 'active' || questReviewCodes.has(questCode)) {
    if (questRows.has(questCode)) flag('critical', 'duplicate-active-crosswalk-row', 'quest', questCode);
    if (!activeQuest.has(questCode)) flag('critical', 'inactive-quest-crosswalk-row', 'quest', questCode);
    questRows.add(questCode);
  }
  for (const [code, baseClassification] of (labcorpCode ? [[labcorpCode, 'Candidate, verification pending']]
    : references.map(([code]) => [code, 'Manual review required']))) {
    if (questReviewCodes.has(questCode) || labcorpReviewCodes.has(code)) {
      flag('critical', 'crosswalk-uses-collection-review-code', 'shared', questCode+'|'+code);
    }
    if (!activeLabcorp.has(code)) flag('critical', 'crosswalk-destination-outside-active-index', 'labcorp', questCode+'|'+code);
    const classification = baseClassification === 'Manual review required' && /^Partial panel match/.test(basis || '')
      ? 'Partial panel match' : baseClassification;
    const pair = questCode+'|'+code;
    if (scope === 'active') {
      if (relationshipKeys.has(pair)) flag('critical', 'duplicate-crosswalk-relationship', 'quest', pair);
      relationshipKeys.add(pair);
    }
    crosswalk.push({questCode, labcorpCode: code, scope, classification, basis});
  }
}
for (const code of activeQuest) if (!questRows.has(code)) flag('critical', 'missing-crosswalk-row', 'quest', code);
const candidates = crosswalk.filter(row => row.scope === 'active' && row.classification.startsWith('Candidate') && activeLabcorp.has(row.labcorpCode));
snapshot.crosswalk = {
  candidatePairs: new Set(candidates.map(row => row.questCode+'|'+row.labcorpCode)).size,
  questCodesWithCandidate: new Set(candidates.map(row => row.questCode)).size,
  labcorpCodesWithCandidate: new Set(candidates.map(row => row.labcorpCode)).size,
  relationshipRows: crosswalk.length,
  activeReviewPairs: crosswalk.filter(row => row.scope === 'active' && !row.classification.startsWith('Candidate')).length,
  unmatchedQuestRows: [...activeQuest].filter(code => !crosswalk.some(row => row.questCode === code && row.scope === 'active')).length,
  representedQuestCodes: questRows.size,
  relationships: Object.fromEntries(crosswalk.map((row, i) => [
    [row.scope, row.questCode, row.labcorpCode, row.questCode === 'XXX' ? i : ''].join('|'), hash(row)
  ]))
};
for (const rule of rules) {
  if (!rule.id || snapshot.rules[rule.id]) throw Error('Invalid or duplicate custom rule identifier');
  snapshot.rules[rule.id] = hash(rule);
}
const baseline = values.baseline ? JSON.parse(readFileSync(values.baseline, 'utf8')) : null;
const changes = {};
if (baseline) {
  for (const [lab, {records}] of Object.entries(snapshot.labs)) {
    const before = baseline.labs[lab].records;
    const added = Object.keys(records).filter(key => !before[key]);
    const removed = Object.keys(before).filter(key => !records[key]);
    for (const [key, previous] of Object.entries(before)) {
      if (previous.status === 'active' && records[key]?.status !== 'active') {
        flag('critical', 'previously-active-record-lost', lab, key);
      }
    }
    const modified = Object.keys(records).filter(key => before[key] && before[key].hash !== records[key].hash);
    for (const key of [...added, ...modified]) {
      const changed = clinical.filter(field => before[key]?.fields[field] !== records[key].fields[field]);
      const code = key.split('|')[0];
      if (changed.length) fieldChanges.push({lab, code, key, fields: changed.join('; '), previousStatus: before[key]?.status,
        status: records[key].status});
      for (const field of changed) {
        const review = evidence[lab+':'+code];
        const fieldEvidence = review?.fields?.[field];
        if (records[key].status === 'active' && (!review?.url || !review.date ||
          !fieldEvidence || fieldEvidence.reviewedValueSha256 !== records[key].fields[field])) {
          flag('critical', 'missing-clinical-change-evidence', lab, key, field);
        }
      }
    }
    changes[lab] = {added, removed, modified, verificationChanged: Object.keys(records)
      .filter(key => before[key]?.verification !== records[key].verification)};
  }
  for (const [label, before, after] of [
    ['relations', baseline.crosswalk.relationships, snapshot.crosswalk.relationships],
    ['rules', baseline.rules, snapshot.rules]
  ]) {
    changes[label] = {added: Object.keys(after).filter(key => !before[key]),
      removed: Object.keys(before).filter(key => !after[key]),
      modified: Object.keys(after).filter(key => before[key] && before[key] !== after[key])};
  }
  for (const id of changes.rules.removed) {
    flag('critical', 'custom-rule-removed', 'shared', id);
  }
}
if (values['protected-baseline']) {
  const protectedBaseline = JSON.parse(readFileSync(values['protected-baseline'], 'utf8'));
  for (const [lab, {records}] of Object.entries(protectedBaseline.labs)) {
    for (const [key, previous] of Object.entries(records)) {
      if (previous.status === 'active' && snapshot.labs[lab].records[key]?.status !== 'active') {
        flag('critical', 'checkpoint-active-record-lost', lab, key);
      }
    }
  }
  for (const [id, fingerprint] of Object.entries(protectedBaseline.rules)) {
    // Explicit user approval for provisional quantities on all held test codes.
    if (id === 'active-test-collection-review' &&
        snapshot.rules[id] === '57e2a2c3aff63e750c219e43469338ece224b9844c1e8e6a9213aedc23d42aac') continue;
    if (snapshot.rules[id] !== fingerprint) {
      flag('critical', 'checkpoint-custom-rule-changed', 'shared', id);
    }
  }
}
const {relationships, ...summaryCrosswalk} = snapshot.crosswalk;
// Track clinical source coverage by field, independently of structural passes.
// A field in the existing evidence ledger is a review/intake event, not
// necessarily a match. Never treat an order-level partial status as verified.
const fieldGroups = {
  collectionContainer: ['drawContainer'],
  submissionContainer: ['transportContainer'],
  specimenType: ['specimenType'],
  preferredVolume: ['preferredVolume'],
  minimumVolume: ['minimumVolume'],
  processing: ['spin', 'processing', 'specialInstructions'],
  shipmentTemperature: ['transportTemperature', 'transportTemperatureRaw'],
  stability: ['stability'],
  fasting: ['fastingStatus', 'fastingInstructions'],
  alternativeAndAdditionalRoutes: ['alternativeContainer', 'additionalDrawRequirements', 'vendorAlternative'],
  physicalCounts: ['collectionCount', 'submissionCount'],
  regionalAcceptance: ['regionalAvailability', 'performingLaboratory'],
  turnaroundTime: ['turnaroundTime', 'testSetup']
};
const activeInventory = inventory.filter(row => row.disposition === 'active');
const fieldQueue = [];
for (const row of activeInventory) {
  const review = evidence[row.lab+':'+row.code];
  for (const [category, fields] of Object.entries(fieldGroups)) {
    const matchedFields = fields.filter(field => review?.fields?.[field]);
    const status = matchedFields.length ? 'Evidence recorded' :
      /unavailable|inaccessible/i.test(review?.status || '') ? 'Source unavailable' : 'Pending';
    fieldQueue.push({lab:row.lab,code:row.code,id:row.id,category,status,
      fields:matchedFields.join('; '),source:review?.url || '',recordStatus:review?.status || 'Not yet reviewed'});
  }
}
const fieldSummary = Object.fromEntries(['quest','labcorp','combined'].map(lab => {
  const orders = activeInventory.filter(row=>lab==='combined'||row.lab===lab).length;
  return [lab,{orders,categories:Object.fromEntries(Object.keys(fieldGroups).map(category=>{
    const rows=fieldQueue.filter(row=>row.category===category&&(lab==='combined'||row.lab===lab));
    const counts=countsBy(rows,row=>row.status);
    return [category,{...counts,evidenceCoveragePct:orders?Number(((counts['Evidence recorded']||0)*100/orders).toFixed(2)):0}];
  }))}];
}));
writeJson('CLINICAL_FIELD_COVERAGE.json',{scope:'Active normalized records, including held records. Evidence presence is not verification; groups containing multiple fields require separate exact-route adjudication.',byLab:fieldSummary});
writeCsv('CLINICAL_FIELD_REVIEW_QUEUE.csv',['lab','code','id','category','status','fields','source','recordStatus'],fieldQueue);
console.log('CLINICAL_FIELD_COVERAGE '+JSON.stringify(fieldSummary.combined));

writeJson('DATABASE_SNAPSHOT.json', snapshot);
writeJson('DATABASE_AUDIT_SUMMARY.json', {
  labs: Object.fromEntries(Object.entries(snapshot.labs).map(([lab, {records, ...summary}]) => [lab, summary])),
  crosswalk: summaryCrosswalk, changes, findings
});
writeCsv('TEST_INVENTORY.csv', ['lab', 'code', 'id', 'name', 'disposition', 'indexed', 'verification', 'source', 'reason'], inventory);
writeCsv('COLLECTION_REVIEW_FLAGS.csv', ['lab', 'code', 'name', 'verification', 'flag', 'source'], collectionReviews);
writeCsv('SPECIMEN_CONTAINER_ROUTES.csv', ['lab', 'code', 'id', 'route', 'disposition', 'specimen',
  'draw', 'submit', 'temperature', 'spin', ...measurements], routes);
writeCsv('CROSSWALK_AUDIT.csv', ['questCode', 'labcorpCode', 'scope', 'classification', 'basis'], crosswalk);
writeCsv('CLINICAL_FIELD_CHANGES.csv', ['lab', 'code', 'key', 'fields', 'previousStatus', 'status'], fieldChanges);
console.log(JSON.stringify({labs: Object.fromEntries(Object.entries(snapshot.labs)
  .map(([lab, data]) => [lab, {total: data.total, indexed: data.indexed, statuses: data.statuses}])),
  crosswalk: summaryCrosswalk, findings: countsBy(findings, row => row.severity)}, null, 2));
if (values.check && findings.some(finding => finding.severity === 'critical')) process.exitCode = 1;
