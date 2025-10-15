import { test as base, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testUsers } from '../data/testData';

// Worker-scoped fixtures that persist across all tests in a worker
type WorkerFixtures = {
  sharedPage: Page;
  sharedContext: BrowserContext;
};

// Test-scoped fixtures
type TestFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: Page;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  // Worker-scoped: shared across all tests
  sharedContext: [async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  }, { scope: 'worker' }],

  sharedPage: [async ({ sharedContext }, use) => {
    const page = await sharedContext.newPage();
    await use(page);
    await page.close();
  }, { scope: 'worker' }],

  // Test-scoped fixtures using the shared page
  loginPage: async ({ sharedPage }, use) => {
    await use(new LoginPage(sharedPage));
  },
  
  productsPage: async ({ sharedPage }, use) => {
    await use(new ProductsPage(sharedPage));
  },
  
  cartPage: async ({ sharedPage }, use) => {
    await use(new CartPage(sharedPage));
  },
  
  checkoutPage: async ({ sharedPage }, use) => {
    await use(new CheckoutPage(sharedPage));
  },
  
  authenticatedPage: async ({ sharedPage, loginPage }, use) => {
    // Pre-authenticate the page
    await loginPage.goto('/');
    await loginPage.loginWithUser(testUsers.standard);
    await loginPage.verifySuccessfulLogin();
    await use(sharedPage);
  }
});

export const expect = test.expect;

// Helper function for common test setup
export async function setupAuthenticatedUser(loginPage: LoginPage) {
  await loginPage.goto('/');
  await loginPage.loginWithUser(testUsers.standard);
  await loginPage.verifySuccessfulLogin();
}
