import { expect } from '@playwright/test';

export class EmployeeHomePage {
  constructor(page) {
    this.page = page;

    this.careTypeSection = page.locator('#care_type_child_adult');
  }

  async waitForHome() {
    await expect(this.careTypeSection).toBeVisible();
  }

  async expandCareRequest() {
    await this.careTypeSection.click();
  }
}
