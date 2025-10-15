import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testUsers } from '../data/testData';

export const test = base.extend<{
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: Page;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  authenticatedPage: async ({ page, loginPage }, use) => {
    // Pre-authenticate the page
    await loginPage.goto('/');
    await loginPage.loginWithUser(testUsers.standard);
    await loginPage.verifySuccessfulLogin();
    await use(page);
  }
});

export const expect = test.expect;

// Helper function for common test setup
export async function setupAuthenticatedUser(loginPage: LoginPage) {
  await loginPage.goto('/');
  await loginPage.loginWithUser(testUsers.standard);
  await loginPage.verifySuccessfulLogin();
}
