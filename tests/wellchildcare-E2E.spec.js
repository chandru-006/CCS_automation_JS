import { test } from '@playwright/test';
import { DirectLoginPage } from '../pages/DirectLoginPage.js';
import { EmployeeHomePage } from '../pages/EmployeeHomePage.js';
import { WellChildCarePage } from '../pages/WellChildCarePage.js';
import { PendingCarePage } from '../pages/PendingCarePage.js';
import { CareProviderHomePage } from '../pages/CareProviderHomePage.js';

const EMPLOYEE_USERNAME = 'Unknown';
const EMPLOYEE_PASSWORD = '1234';

const PROVIDER_USERNAME = 'EPCareProvider';
const PROVIDER_PASSWORD = 'corp@care';

test.describe.serial('Well Child Care – End to End Sequential Flow', () => {

  test('TC-WCC-001 | Employee creates Well Child Care request', async ({ page }) => {
    const login = new DirectLoginPage(page);
    const home = new EmployeeHomePage(page);
    const wellChildCare = new WellChildCarePage(page);

    await login.goto();
    await login.login(EMPLOYEE_USERNAME, EMPLOYEE_PASSWORD);

    await home.waitForHome();
    await wellChildCare.createRequest();
  });

  test('TC-WCC-002 | Employee cancels Well Child Care request', async ({ page }) => {
    const login = new DirectLoginPage(page);
    const home = new EmployeeHomePage(page);
    const pendingCare = new PendingCarePage(page);

    await login.goto();
    await login.login(EMPLOYEE_USERNAME, EMPLOYEE_PASSWORD);

    await home.waitForHome();
    await pendingCare.openPendingRequests();
    await pendingCare.cancelFirstRequest();
  });

  test('TC-WCC-003 | Create Well Child Care Request', async ({ page }) => {
    const login = new DirectLoginPage(page);
    const employeeHome = new EmployeeHomePage(page);
    const wellChildCare = new WellChildCarePage(page);

    await login.goto();
    await login.login(EMPLOYEE_USERNAME, EMPLOYEE_PASSWORD);

    await employeeHome.waitForHome();
    await wellChildCare.createRequest();
  });

  test('TC-WCC-CP-001 | Care Provider Approval', async ({ page }) => {
    const login = new DirectLoginPage(page);
    const providerHome = new CareProviderHomePage(page);

    await login.goto();
    await login.login(PROVIDER_USERNAME, PROVIDER_PASSWORD);

    await providerHome.waitForHome();
    await providerHome.openPendingIfAny();
  });

  test('TC-WCC-CP-002 | Care Provider Accepted State', async ({ page }) => {
    const login = new DirectLoginPage(page);
    const providerHome = new CareProviderHomePage(page);

    await login.goto();
    await login.login(PROVIDER_USERNAME, PROVIDER_PASSWORD);

    await providerHome.waitForHome();
  });

});
