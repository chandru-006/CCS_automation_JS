import { expect } from '@playwright/test';

export class PendingCarePage {
  constructor(page) {
    this.page = page;
  }

  async openPendingRequests() {
    const pendingCareLink = this.page
      .locator('div.graph-details.pending p.graph-label')
      .first();

    await expect(pendingCareLink).toBeVisible();
    await pendingCareLink.click();

    await expect(this.page).toHaveURL(/pending-care-units/);
  }

  async cancelFirstRequest() {
    const tableRows = this.page.locator('table.jtable tbody tr');
    const rowCount = await tableRows.count();

    if (rowCount === 0) {
      return;
    }

    const cancelLink = tableRows
      .first()
      .locator('a[data-bb="cancel"]');

    await expect(cancelLink).toBeVisible();
    await cancelLink.click();

    const confirmBtn = this.page.locator(
      'button[data-bb-handler="success"]'
    );

    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();

    if (await confirmBtn.isVisible().catch(() => false)) {
      await confirmBtn.click();
    }

    await this.page.locator('#no_longer_need_care').click();
    await this.page
      .locator('#other_explanation')
      .fill('Automation cancellation');

    await this.page.locator('#submit-button').click();

    await expect(this.page).toHaveURL(/pending-care-units|clients/);
  }
}
