import { test, expect } from '@playwright/test';
import { DirectLoginPage } from '../pages/DirectLoginPage.js';
import { EmployeeHomePage } from '../pages/EmployeeHomePage.js';
import { before } from 'node:test';

const EMPLOYEE_USERNAME = 'Unknown';
const EMPLOYEE_PASSWORD = '1234';
test.beforeEach(async ({ page }) => {
  const login = new DirectLoginPage(page);
  const home = new EmployeeHomePage(page);

  await login.goto();
  await login.login(EMPLOYEE_USERNAME, EMPLOYEE_PASSWORD); 
  await home.waitForHome();
});

test('TC-001 | Expand Child / Adult Care Request', async ({ page }) => {
  await page.locator('#care_type_child_adult').click();

  await expect(page.locator('#service_type_well_child')).toBeAttached();
  await expect(page.locator('#service_type_sick_child')).toBeAttached();
  await expect(page.locator('#service_type_adult')).toBeAttached();
});



test('TC-002 | Validate Employee Dashboard is visible', async ({ page }) => {
  await expect(page.locator('#care_type_child_adult')).toBeVisible();
});

test('TC-003 | Navigate using Take Me Home', async ({ page }) => {
  await page.getByRole('link', { name: 'Take Me Home' }).click();
  await expect(page).toHaveURL(/\/clients/);
});

test('TC-004 | Verify My Support hover menu', async ({ page }) => {
  await page.getByRole('link', { name: 'My Support' }).hover();
  await expect(
    page.locator('.corporate-care-submenu-section')
  ).toBeVisible();
});

test('TC-005 | Logout from Employee Portal', async ({ page }) => {
  await page.locator('li.logoout-link a').click();
  await expect(
    page.locator('.modal-content .success-message')
  ).toHaveText('You have logged out successfully.');
});
