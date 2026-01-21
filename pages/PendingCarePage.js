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
    await this.page.waitForTimeout(5000);
  }

  async cancelFirstRequest() {
  const tableRows = this.page.locator('table.jtable tbody tr');
  const rowCount = await tableRows.count();

  if (rowCount === 0) {
    return;
  }

  const cancelLink = tableRows.first().locator('a[data-bb="cancel"]');
  await cancelLink.click();

  const confirmBtn = this.page.locator('button[data-bb-handler="success"]');
  await confirmBtn.waitFor({ state: 'visible' });
  await confirmBtn.click();

  await confirmBtn.waitFor({ state: 'detached' }).catch(() => {});

  const noNeedRadio = this.page.locator('#no_longer_need_care');
  await noNeedRadio.waitFor({ state: 'visible' });
  await noNeedRadio.click();

  const explanation = this.page.locator('#other_explanation');
  await explanation.waitFor({ state: 'visible' });
  await explanation.fill('Automation cancellation');

  const submitBtn = this.page.locator('#submit-button');
  await submitBtn.waitFor({ state: 'visible' });
  await submitBtn.click();

  await this.page.waitForTimeout(5000);
}
}