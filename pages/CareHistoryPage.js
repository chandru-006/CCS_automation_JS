import { expect } from '@playwright/test';

export class CareHistoryPage {
  constructor(page) {
    this.page = page;

    // Filters
    this.startDate = page.locator('#start_date');
    this.endDate = page.locator('#end_date');
    this.copayStatus = page.locator('#payment_status');
    this.enterBtn = page.locator('a.cr-btn');
    this.resetBtn = page.locator('a.cr-cancel-btn');

    // Table
    this.table = page.locator('table.jtable');
    this.headers = page.locator('table.jtable thead th');
    this.noDataRow = page.locator('.jtable-no-data-row');
    this.rows = page.locator('table.jtable tbody tr:not(.jtable-no-data-row)');

    // Actions
    this.printBtn = page.getByRole('link', { name: /print\/view report/i });
  }

  async assertFiltersVisible() {
    await expect(this.startDate).toBeVisible();
    await expect(this.endDate).toBeVisible();
    await expect(this.copayStatus).toBeVisible();
  }

  async setDateRange(from, to) {
    await this.startDate.fill(from);
    await this.endDate.fill(to);
  }

  async selectCopayStatus(label) {
    await this.copayStatus.selectOption({ label });
  }

  async submit() {
    await this.enterBtn.click();
    await expect(this.table).toBeVisible();
  }

async assertTableHeaders() {
  const expectedHeaders = [
    'CARE Request #',
    'Date',
    'Service Type',
    'Total Hours',
    'CARE Unit(s)',
    'Copay',
    'Caregiver',
    'CARE Provider',
    'Status',
    'Copay Status',
    'Copay Received',
    'CARE Request Details'
  ];

  const actualHeaders = await this.headers.allTextContents();

const normalize = text =>
  text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();


  expect(actualHeaders.map(normalize))
    .toEqual(expectedHeaders);
}


  async assertNoDataOrRows() {
    if (await this.noDataRow.isVisible()) {
      await expect(this.noDataRow).toContainText(
        'There are no CARE Requests for the date range selected.'
      );
    } else {
      await expect(this.rows.first()).toBeVisible();
      await expect(this.rows.first().locator('td')).toHaveCount(12);
    }
  }

  async assertPrintButton() {
    await expect(this.printBtn).toBeVisible();
    await expect(this.printBtn).toBeEnabled();
  }
}
