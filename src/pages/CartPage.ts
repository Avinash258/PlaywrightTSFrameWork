import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutBtn: Locator;
  constructor(page: Page) {
    super(page);
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}
