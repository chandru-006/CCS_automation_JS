import { expect } from '@playwright/test';

export class CareProviderHomePage {
  constructor(page) {
    this.page = page;

    this.pendingCard = page.locator('.profile-completed.cc-steps-item');
    this.pendingCount = this.pendingCard.locator('.cc-step-value h2');
  }

  async waitForHome() {
    await expect(this.pendingCount).toBeVisible();
  }

  async openPendingIfAny() {
    const countText = await this.pendingCount.textContent();
    const count = Number(countText?.trim() || 0);

    if (count === 0) return;

    await this.pendingCard.click();
    await this.page.waitForTimeout(2000);

    const acceptBtn = this.page
      .locator('table.jtable tbody tr.jtable-data-row')
      .first()
      .locator('a:has-text("Accept")');

    await expect(acceptBtn).toBeVisible();
    await acceptBtn.click();

    const confirmBtn = this.page
      .locator('.modal-footer, .modal-content')
      .locator('button[data-bb-handler="success"]');

    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();
  }
}
