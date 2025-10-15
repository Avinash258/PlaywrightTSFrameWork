import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';

test('checkout flow', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto('/');
  await login.login('standard_user', 'secret_sauce');
  await products.addToCart('Sauce Labs Bike Light');
  await products.cartLink.click();
  await cart.proceedToCheckout();
  await checkout.fillDetails('John', 'Doe', '12345');
  await expect(page).toHaveURL(/checkout-step-two.html/);
});
