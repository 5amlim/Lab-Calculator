'use strict';
const assert = require('node:assert/strict');
const {test} = require('node:test');
const {spawnSync} = require('node:child_process');
const {mkdtempSync, mkdirSync, readdirSync, readFileSync, writeFileSync, symlinkSync, rmSync} = require('node:fs');
const {tmpdir} = require('node:os');
const {join, resolve} = require('node:path');

const root = resolve(__dirname, '..');

test('database audit fails on identical duplicate index rows and incorrect index identity', () => {
  const scratch = mkdtempSync(join(tmpdir(), 'calculator-index-audit-'));
  try {
    // Mirror the checkout without editing any source file or committed catalog.
    const fixture = join(scratch, 'fixture');
    mkdirSync(fixture);
    const mirror = (source, destination, except) => {
      for (const entry of readdirSync(source, {withFileTypes: true})) {
        if (except.includes(entry.name)) continue;
        symlinkSync(join(source, entry.name), join(destination, entry.name),
          entry.isDirectory() ? 'junction' : 'file');
      }
    };
    mirror(root, fixture, ['.git', 'assets']);
    mkdirSync(join(fixture, 'assets'));
    mirror(join(root, 'assets'), join(fixture, 'assets'), ['search']);
    mkdirSync(join(fixture, 'assets', 'search'));
    mirror(join(root, 'assets', 'search'), join(fixture, 'assets', 'search'), ['quest-tests.json']);
    const index = JSON.parse(readFileSync(join(root, 'assets', 'search', 'quest-tests.json'), 'utf8'));
    const code = index.tests[0][0];
    index.tests.push(index.tests[0]);
    index.lab = 'labcorp';
    writeFileSync(join(fixture, 'assets', 'search', 'quest-tests.json'), JSON.stringify(index));

    const output = join(scratch, 'output');
    const run = spawnSync(process.execPath, [
      join(root, 'scripts', 'audit-calculator-database.mjs'),
      '--root', fixture, '--out', output, '--check'
    ], {encoding: 'utf8', timeout: 120000});
    assert.ifError(run.error);
    assert.equal(run.status, 1, run.stderr || run.stdout);
    const {findings} = JSON.parse(readFileSync(join(output, 'DATABASE_AUDIT_SUMMARY.json'), 'utf8'));
    assert(findings.some(finding => finding.severity === 'critical' &&
      finding.issue === 'duplicate-search-index-code' && finding.lab === 'quest' &&
      finding.key === 'committed|' + code));
    assert(findings.some(finding => finding.severity === 'critical' &&
      finding.issue === 'search-index-identity-mismatch' && finding.lab === 'quest' &&
      finding.key === 'committed'));
  } finally {
    rmSync(scratch, {recursive: true, force: true});
  }
});
