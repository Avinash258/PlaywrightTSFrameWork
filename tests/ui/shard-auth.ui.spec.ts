import { test, expect } from '../../src/fixtures/testFixtures';
import { uiAuthCases } from '../../src/data/shardTestCases';

test.describe('Sharded UI - Authentication Scenarios', () => {
  for (const testCase of uiAuthCases) {
    test(`auth ${testCase.label} @regression`, async ({ loginPage }) => {
      await loginPage.goto('/');
      await loginPage.verifyLoginPageLoaded();
      await loginPage.login(testCase.username, testCase.password);

      if (testCase.expectSuccess) {
        await loginPage.verifySuccessfulLogin();
      } else {
        await expect(loginPage.errorMsg).toBeVisible();
      }
    });
  }
});
