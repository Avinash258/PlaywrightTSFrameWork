import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { SHARD_TOTAL, shardArg } from '../src/config/sharding';

const SHARD_REPORTS_DIR = 'all-shard-reports';
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

function removeDir(dir: string): void {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyBlobReports(targetDir: string): void {
  if (!fs.existsSync('blob-report')) {
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });
  for (const file of fs.readdirSync('blob-report')) {
    fs.copyFileSync(path.join('blob-report', file), path.join(targetDir, file));
  }
}

function run(
  command: string,
  args: string[],
  env: Record<string, string> = {}
): SpawnSyncReturns<Buffer> {
  return spawnSync(command, args, {
    env: { ...process.env, ...env },
    stdio: 'inherit',
    shell: false,
  });
}

removeDir(SHARD_REPORTS_DIR);
fs.mkdirSync('test-results', { recursive: true });

let shardFailed = false;

for (let shardIndex = 1; shardIndex <= SHARD_TOTAL; shardIndex += 1) {
  removeDir('blob-report');
  const shard = shardArg(shardIndex);
  console.log(`\n=== Running shard ${shard} ===\n`);

  const result = run(npx, ['playwright', 'test', `--shard=${shard}`], {
    SHARD_INDEX: String(shardIndex),
    SHARD_TOTAL: String(SHARD_TOTAL),
    USE_BLOB_REPORTER: 'true',
  });

  if (result.status !== 0) {
    shardFailed = true;
  }

  copyBlobReports(SHARD_REPORTS_DIR);
}

console.log('\n=== Merging combined report (HTML + JUnit + JSON) ===\n');

const mergeResult = run(npx, [
  'playwright',
  'merge-reports',
  '--config=merge.config.ts',
  `./${SHARD_REPORTS_DIR}`,
]);

if (mergeResult.status !== 0) {
  process.exit(mergeResult.status ?? 1);
}

console.log('\nCombined report ready:');
console.log('  HTML : playwright-report/index.html');
console.log('  JUnit: test-results/junit.xml');
console.log('  JSON : test-results/results.json');

process.exit(shardFailed ? 1 : 0);
