import { expect } from '@playwright/test';

export async function handleDuplicateDatePopup(page) {
  const modal = page.locator('.modal-content:has-text("Whoa!")');
  const goBackBtn = page.locator(
    'button:has-text("Go back and change the date/time")'
  );

  if (await modal.isVisible().catch(() => false)) {
    await expect(goBackBtn).toBeVisible();
    await goBackBtn.click();
    return true;
  }

  return false;
}
