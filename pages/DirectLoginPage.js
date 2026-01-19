import { expect } from '@playwright/test';

export class DirectLoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button.cc-btn');
  }

  async goto() {
    await this.page.goto(
      'https://loginstage.corporatecaresolutions.com/users/login'
    );
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async waitForLoginSuccess() {
    await expect(this.page).not.toHaveURL(/\/users\/login/);
  }
}
