import { defineConfig } from '@playwright/test';

/** Used by `playwright merge-reports` to produce one combined report from all shards. */
export default defineConfig({
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],
});
