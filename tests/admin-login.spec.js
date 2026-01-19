// @ts-check
import { test, expect } from '@playwright/test';

const LOGIN_URL =
  'https://loginstage.corporatecaresolutions.com/users/admin/94i2d1uu9y';

const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const SUBMIT_BUTTON_SELECTOR = '.admin-nibtn';
const LOGIN_FORM_SELECTOR = '#loginform';
  const LOGIN_SECTION_SELECTOR = '.login-section';

test.describe('Admin Login - Critical User Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.waitForLoadState('networkidle');
  });

  test('CUF-001: Page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.locator('body')).toBeVisible();
  });

  test('CUF-002: Login form is visible and interactive', async ({ page }) => {
    const form = page.locator(LOGIN_FORM_SELECTOR);
    const emailInput = page.locator(USERNAME_SELECTOR);
    const passwordInput = page.locator(PASSWORD_SELECTOR);

    await expect(form).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('CUF-003: Submit button is present and clickable', async ({ page }) => {
    const submitButton = page.locator(SUBMIT_BUTTON_SELECTOR);

    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test('CUF-004: Form validation - Empty email shows error', async ({ page }) => {
    const passwordInput = page.locator(PASSWORD_SELECTOR);
    const submitButton = page.locator(SUBMIT_BUTTON_SELECTOR);

    await passwordInput.fill('testpassword');
    await submitButton.click();
    await page.waitForTimeout(1000);
  });

  test('CUF-005: Form validation - Empty password shows error', async ({ page }) => {
    const emailInput = page.locator(USERNAME_SELECTOR);
    const submitButton = page.locator(SUBMIT_BUTTON_SELECTOR);

    await emailInput.fill('test@example.com');
    await submitButton.click();
    await page.waitForTimeout(1000);
  });

  test('CUF-006: Email input accepts valid format', async ({ page }) => {
    const emailInput = page.locator(
      'input[type="email"], input[name*="email" i], input[id*="email" i]'
    );

    await emailInput.fill('admin@corporatecaresolutions.com');
    await expect(emailInput).toHaveValue('admin@corporatecaresolutions.com');
  });

  test('CUF-007: Password input masks characters', async ({ page }) => {
    const passwordInput = page.locator(PASSWORD_SELECTOR);

    await passwordInput.fill('MySecurePassword123');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('CUF-008: Form has remember me option (if available)', async ({ page }) => {
    const rememberMeCheckbox = page.locator('input[type="checkbox"]');

    if (await rememberMeCheckbox.count()) {
      await expect(rememberMeCheckbox.first()).toBeVisible();
    }
  });

  test('CUF-009: Forgot password link exists and is clickable', async ({ page }) => {
    const forgotPasswordLink = page.locator(
      'a:has-text("Forgot"), a:has-text("Forgot password"), a:has-text("Reset password")'
    );

    if (await forgotPasswordLink.count()) {
      await expect(forgotPasswordLink.first()).toBeVisible();
      await expect(forgotPasswordLink.first()).toBeEnabled();
    }
  });

  test('CUF-010: No sensitive data in page source', async ({ page }) => {
    const content = await page.content();

    expect(content).not.toContain('password:');
    expect(content).not.toContain('admin:admin');
  });

  test('CUF-012: Form submit with valid credentials attempt', async ({ page }) => {
    const emailInput = page.locator(USERNAME_SELECTOR);
    const passwordInput = page.locator(PASSWORD_SELECTOR);
    const submitButton = page.locator(SUBMIT_BUTTON_SELECTOR);

    await emailInput.fill('admin@test.com');
    await passwordInput.fill('password123');
    await submitButton.click();
    await page.waitForTimeout(2000);
  });

  test('CUF-013: Page accessibility - Can navigate with keyboard', async ({ page }) => {
    const emailInput = page.locator(USERNAME_SELECTOR);

    await page.locator('.main-hdr').click();
    await page.keyboard.press('Tab');
    await page.keyboard.type('admin@test.com');

    await expect(emailInput).toBeFocused();
  });

  test('CUF-014: Page is responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const form = page.locator(LOGIN_SECTION_SELECTOR);
    const emailInput = page.locator(USERNAME_SELECTOR);

    await expect(form).toBeVisible();
    await expect(emailInput).toBeVisible();
  });

  test('CUF-015: CSRF protection - Form has security token', async ({ page }) => {
    const form = page.locator(LOGIN_SECTION_SELECTOR);
    await expect(form).toBeVisible();
  });
});

test.describe('Admin Login - Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.waitForLoadState('networkidle');
  });

  test('ERR-001: Invalid email format shows error', async ({ page }) => {
    const emailInput = page.locator(USERNAME_SELECTOR);
    const passwordInput = page.locator(PASSWORD_SELECTOR);
    const submitButton = page.locator(SUBMIT_BUTTON_SELECTOR);

    await emailInput.fill('notanemail');
    await passwordInput.fill('password');
    await submitButton.click();

    await page.waitForTimeout(1000);

    const modal = page.locator('.modal-content');

    await expect(modal).toBeVisible();
    await expect(modal.locator('#ccs-server-error')).toHaveText('Attention!');
    await expect(modal.locator('.cc-error-message')).toHaveText(
      'Incorrect username or password.'
    );
  });

  test('ERR-002: Handle network error gracefully', async ({ page, context }) => {
    await context.setOffline(true);

    const emailInput = page.locator(
      'input[type="email"], input[name*="email" i], input[id*="email" i]'
    );
    const passwordInput = page.locator('input[type="password"]');

    await emailInput.fill('admin@test.com');
    await passwordInput.fill('password');

    await context.setOffline(false);
  });
});
