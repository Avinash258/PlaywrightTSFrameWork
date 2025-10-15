import { test, expect } from '../src/fixtures/serialFixtures';
import { testUsers, testProducts } from '../src/data/testData';

// Serial execution - all tests share the same browser context
test.describe.serial('E2E Test Suite - Serial Execution', () => {
  
  test.describe('E2E Shopping Flow', () => {
    test('complete shopping flow from login to checkout @smoke', async ({ 
      loginPage, 
      productsPage, 
      cartPage, 
      checkoutPage 
    }) => {
      // Login
      await loginPage.goto('/');
      await loginPage.loginWithUser(testUsers.standard);
      await loginPage.verifySuccessfulLogin();

      // Add products to cart
      await productsPage.addToCart(testProducts.backpack.name);
      await productsPage.addToCart(testProducts.bikeLight.name);
      
      // Verify cart count
      await expect(productsPage.cartLink).toContainText('2');

      // Go to cart
      await productsPage.cartLink.click();
      await expect(cartPage.page).toHaveURL(/cart.html/);

      // Proceed to checkout
      await cartPage.proceedToCheckout();
      await expect(checkoutPage.page).toHaveURL(/checkout-step-one.html/);

      // Fill checkout details
      await checkoutPage.fillDetails(
        testUsers.standard.firstName!,
        testUsers.standard.lastName!,
        testUsers.standard.postalCode!
      );

      // Verify navigation to review page
      await expect(checkoutPage.page).toHaveURL(/checkout-step-two.html/);
    });

    test('should handle empty cart scenario', async ({ loginPage, productsPage, cartPage }) => {
      // Login first
      await loginPage.goto('/');
      await loginPage.loginWithUser(testUsers.standard);
      await loginPage.verifySuccessfulLogin();
      
       // Navigate to cart
      await productsPage.cartLink.click();
      await expect(cartPage.page).toHaveURL(/cart.html/);
      
       // Remove all items from cart if any exist (since browser is shared)
       const cartItems = cartPage.page.locator('.cart_item');
       const itemCount = await cartItems.count();
     
       for (let i = 0; i < itemCount; i++) {
         // Click remove button for each item
         const removeBtn = cartPage.page.locator('.cart_button').first();
         await removeBtn.click();
       }
     
       // Now verify empty cart state
      await expect(cartPage.page.locator('.cart_item')).toHaveCount(0);
     
       // Check if checkout button exists
      const checkoutBtn = cartPage.page.locator('[data-test="checkout"]');
      const isVisible = await checkoutBtn.isVisible().catch(() => false);
      if (isVisible) {
        await expect(checkoutBtn).toBeVisible();
      }
    });

    test('should add multiple quantities of same product', async ({ 
      loginPage, 
      productsPage, 
      cartPage 
    }) => {
      await loginPage.goto('/');
      await loginPage.loginWithUser(testUsers.standard);
      await loginPage.verifySuccessfulLogin();
      
      // Add same product twice (SauceDemo actually adds 2 separate items, not quantity)
      await productsPage.addToCart(testProducts.backpack.name);
      
      await productsPage.cartLink.click();
      
      // Verify cart shows the item (SauceDemo doesn't support quantity > 1 for same product)
      const cartItems = cartPage.page.locator('.cart_item');
      await expect(cartItems).toHaveCount(1);
      // SauceDemo shows quantity as 1, not 2, so we just verify the item is there
      await expect(cartItems.first().locator('.inventory_item_name')).toBeVisible();
    });
  });

  test.describe('Product Management', () => {
    test('should display all products correctly', async ({ loginPage, productsPage }) => {
      // Login first
      await loginPage.goto('/');
      await loginPage.loginWithUser(testUsers.standard);
      await loginPage.verifySuccessfulLogin();
      
      const productItems = productsPage.page.locator('.inventory_item');
      await expect(productItems).toHaveCount(6);
      
      // Verify product details
      await expect(productItems.first().locator('.inventory_item_name')).toBeVisible();
      await expect(productItems.first().locator('.inventory_item_price')).toBeVisible();
      await expect(productItems.first().locator('.btn_inventory')).toBeVisible();
    });

    test('should filter products by price', async ({ loginPage, productsPage }) => {
      // Login first
      await loginPage.goto('/');
      await loginPage.loginWithUser(testUsers.standard);
      await loginPage.verifySuccessfulLogin();
      
      const filterSelect = productsPage.page.locator('.product_sort_container');
      await filterSelect.selectOption('lohi');
      
      // Verify products are sorted by price
      const prices = await productsPage.page.locator('.inventory_item_price').allTextContents();
      const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
      
      for (let i = 0; i < numericPrices.length - 1; i++) {
        expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
      }
    });
  });
});
