import { test, expect } from '../src/fixtures/testFixtures';
import { testUsers, errorMessages } from '../src/data/testData';

test.describe('Authentication - Optimized', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto('/');
    await loginPage.verifyLoginPageLoaded();
  });

  test('should login successfully with valid credentials @smoke', async ({ loginPage }) => {
    await loginPage.loginWithUser(testUsers.standard);
    await loginPage.verifySuccessfulLogin();
  });

  test('should show error for locked user', async ({ loginPage }) => {
    await loginPage.loginWithUser(testUsers.locked);
    await loginPage.verifyErrorMessage(errorMessages.lockedUser);
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'invalid_pass');
    await loginPage.verifyErrorMessage(errorMessages.invalidCredentials);
  });

  test('should clear fields when clicking login with empty fields', async ({ loginPage }) => {
    await loginPage.login('', '');
    await expect(loginPage.errorMsg).toBeVisible();
    await loginPage.clearFields();
    await expect(loginPage.username).toHaveValue('');
    await expect(loginPage.password).toHaveValue('');
  });

  test('should maintain login button state', async ({ loginPage }) => {
    await expect(loginPage.loginBtn).toBeEnabled();
    await expect(loginPage.getLoginButtonText()).resolves.toBe('Login');
  });
});

test.describe('Authentication - Data Driven', () => {
  const testCases = [
    { user: testUsers.standard, shouldSucceed: true },
    { user: testUsers.locked, shouldSucceed: false },
    { user: testUsers.problem, shouldSucceed: true },
    { user: testUsers.performance, shouldSucceed: true }
  ];

  for (const testCase of testCases) {
    test(`login with ${testCase.user.username} should ${testCase.shouldSucceed ? 'succeed' : 'fail'}`, async ({ loginPage }) => {
      await loginPage.goto('/');
      await loginPage.loginWithUser(testCase.user);
      
      if (testCase.shouldSucceed) {
        await loginPage.verifySuccessfulLogin();
      } else {
        await expect(loginPage.errorMsg).toBeVisible();
      }
    });
  }
});
