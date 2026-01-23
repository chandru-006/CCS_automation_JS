// tests/care-history.spec.js
import { test, expect } from '@playwright/test';
import { CareHistoryPage } from '../pages/CareHistoryPage';

test.describe.serial('CARE History – Date Filter & Table Validation', () => {
  test('Validate CARE Utilized History page', async ({ page }) => {
    await page.goto(
      'https://loginstage.corporatecaresolutions.com/clients'
    );
    await page.locator('#username').fill('unknown');
    await page.locator('#password').fill('1234');
    await page.getByRole('button', { name: 'Login TO YOUR ACCOUNT' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'Utilized' }).click();
    await page.waitForLoadState('networkidle');
    const historyPage = new CareHistoryPage(page);

    await historyPage.assertFiltersVisible();

    await historyPage.setDateRange('01-01-2026', '12-31-2026');
    await historyPage.selectCopayStatus('Select');
    await historyPage.submit();

    await historyPage.assertTableHeaders();
    await historyPage.assertNoDataOrRows();
    await historyPage.assertPrintButton();
  });
});
