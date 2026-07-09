import { test, expect } from '../../src/fixtures/testFixtures';
import { testUsers } from '../../src/data/testData';
import { uiProductCases } from '../../src/data/shardTestCases';

test.describe('Sharded UI - Product Catalog', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto('/');
    await loginPage.loginWithUser(testUsers.standard);
    await loginPage.verifySuccessfulLogin();
  });

  for (const testCase of uiProductCases) {
    test(`product ${testCase.label} @regression`, async ({ productsPage }) => {
      if (testCase.sortOption) {
        await productsPage.page.locator('.product_sort_container').selectOption(testCase.sortOption);
      }

      const productItem = productsPage.inventoryItem(testCase.productName);
      await expect(productItem).toBeVisible();
      await expect(productItem.locator('.inventory_item_name')).toContainText(testCase.productName);
      await expect(productItem.locator('.inventory_item_price')).toBeVisible();
    });
  }
});
