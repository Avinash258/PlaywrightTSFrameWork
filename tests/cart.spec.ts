import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';

test('add product to cart', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  await login.goto('/');
  await login.login('standard_user', 'secret_sauce');
  await products.addToCart('Sauce Labs Backpack');
  await expect(products.cartLink).toContainText('1');
});
