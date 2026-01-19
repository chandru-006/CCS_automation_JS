import { test } from '@playwright/test';
import { DirectLoginPage } from '../pages/DirectLoginPage.js';
import { EmployeeHomePage } from '../pages/EmployeeHomePage.js';

test('Employee direct login', async ({ page }) => {
  const login = new DirectLoginPage(page);
  const home = new EmployeeHomePage(page);

  await login.goto();
  await login.login('Unknown', '1234');
  await home.waitForHome();
});
