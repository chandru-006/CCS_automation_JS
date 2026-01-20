import { expect } from '@playwright/test';

export async function handleDuplicateDatePopup(page) {
  const modal = page.locator('.modal-content:has-text("Whoa!")');
  const goBackBtn = page.locator(
    'button:has-text("No - Go back and change the date/time")'
  );

  if (await modal.isVisible().catch(() => false)) {
    await expect(goBackBtn).toBeVisible();
    await goBackBtn.click();
    return true; // popup handled
  }

  return false; // popup not present
}
