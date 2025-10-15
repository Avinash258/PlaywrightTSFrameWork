import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly inventoryItem: (name: string) => Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryItem = (name: string) =>
      page.locator('.inventory_item').filter({ hasText: name });
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addToCart(name: string) {
    const item = this.inventoryItem(name);
    await item.locator('button').click();
  }
}
