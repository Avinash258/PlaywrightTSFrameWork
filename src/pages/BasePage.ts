import { Page, expect } from '@playwright/test';
import { getEnvironment } from '../config/environment';

export class BasePage {
  readonly page: Page;
  protected readonly config = getEnvironment();

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(`${this.config.baseUrl}${path}`, {
      waitUntil: 'networkidle',
      timeout: this.config.timeout
    });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  async waitForElement(selector: string, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 5000 });
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  async getElementText(selector: string): Promise<string> {
    await this.waitForElement(selector);
    return await this.page.textContent(selector) || '';
  }

  async clickElement(selector: string) {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string) {
    await this.waitForElement(selector);
    await this.page.fill(selector, value);
  }

  async selectOption(selector: string, value: string) {
    await this.waitForElement(selector);
    await this.page.selectOption(selector, value);
  }

  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async waitForUrl(urlPattern: string | RegExp) {
    await this.page.waitForURL(urlPattern, { timeout: this.config.timeout });
  }

  async verifyUrl(urlPattern: string | RegExp) {
    await expect(this.page).toHaveURL(urlPattern);
  }
}
