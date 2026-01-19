import { test } from '@playwright/test';
import { DirectLoginPage } from '../pages/DirectLoginPage.js';
import { EmployeeHomePage } from '../pages/EmployeeHomePage.js';
import { WellChildCarePage } from '../pages/WellChildCarePage.js';
import { PendingCarePage } from '../pages/PendingCarePage.js';

test.describe.serial('Employee – Well Child Care Flow', () => {

  test('TC-WCC-001 | Employee creates Well Child Care request', async ({ page }) => {
    const login = new DirectLoginPage(page);
    const home = new EmployeeHomePage(page);
    const wellChildCare = new WellChildCarePage(page);

    await login.goto();
    await login.login('Unknown', '1234');

    await home.waitForHome();
    await wellChildCare.createRequest();
  });

  test('TC-WCC-002 | Employee cancels Well Child Care request', async ({ page }) => {
    const login = new DirectLoginPage(page);
    const home = new EmployeeHomePage(page);
    const pendingCare = new PendingCarePage(page);

    await login.goto();
    await login.login('Unknown', '1234');

    await home.waitForHome();
    await pendingCare.openPendingRequests();
    await pendingCare.cancelFirstRequest();
  });

});
