import { defineConfig, devices } from '@playwright/test';

const shardIndex = process.env.SHARD_INDEX;
const isCI = !!process.env.CI;
const isShardRun = !!shardIndex || process.env.USE_BLOB_REPORTER === 'true';
const useBlobReporter = isCI || isShardRun;
const junitFile = shardIndex
  ? `test-results/junit-shard-${shardIndex}.xml`
  : 'test-results/junit.xml';

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  workers: process.env.WORKERS ? Number(process.env.WORKERS) : isCI ? 2 : 1,
  reporter: useBlobReporter
    ? [
        ['blob', { outputDir: 'blob-report' }],
        ['list'],
        ['junit', { outputFile: junitFile }],
      ]
    : [
        ['list'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['junit', { outputFile: junitFile }],
      ],
  use: {
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-web-security', '--disable-features=VizDisplayCompositor'],
        },
      },
    },
  ],
});
