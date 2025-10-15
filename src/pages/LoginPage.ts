import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { User } from '../data/testData';

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly loginContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.errorMsg = page.locator('[data-test="error"]');
    this.loginContainer = page.locator('.login_container');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async loginWithUser(user: User) {
    await this.login(user.username, user.password);
  }

  async verifyLoginPageLoaded() {
    await expect(this.loginContainer).toBeVisible();
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginBtn).toBeVisible();
  }

  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.errorMsg).toBeVisible();
    await expect(this.errorMsg).toContainText(expectedMessage);
  }

  async verifySuccessfulLogin() {
    await this.waitForUrl(/inventory.html/);
    await this.verifyUrl(/inventory.html/);
  }

  async clearFields() {
    await this.username.clear();
    await this.password.clear();
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginBtn.isEnabled();
  }

  async getLoginButtonText(): Promise<string> {
    // Login button uses 'value' attribute, not textContent
    return await this.loginBtn.getAttribute('value') || '';
  }
}
