import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { readCsvSync } from '../src/utils/csvReader';

test.describe('Authentication', () => {
  test('valid login should land on products page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto('/');
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('invalid login shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto('/');
    await login.login('bad', 'bad');
    await expect(login.errorMsg).toBeVisible();
  });
});

test.describe('Authentication (CSV data-driven)', () => {
  const rows = readCsvSync('tests/data/loginUsers.csv');
  const [, ...data] = rows;
  for (const [username, password, expected] of data) {
    test(`login as ${username} (${expected})`, async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto('/');
      await login.login(username, password);
      if (expected === 'success') {
        await expect(page).toHaveURL(/inventory.html/);
      } else {
        await expect(login.errorMsg).toBeVisible();
      }
    });
  }
});
