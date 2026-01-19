import { expect } from '@playwright/test';
import { getNextFutureDate } from '../utils/date.helper.js';

export class WellChildCarePage {
  constructor(page) {
    this.page = page;

    this.startDateInput = page.locator('#start_date');
  }

  async selectWellChildCare() {
    await this.page.locator('#care_type_child_adult').click();

    await this.page.locator('#well_child_care').click();

    await this.page.locator('#in_network').click();
  }

  async fillCareDetails() {
    await this.page.getByRole('checkbox', { name: /./ }).first().check();

    await this.page
      .getByRole('textbox', { name: 'Reason for Child Care?' })
      .fill('Automation Test');

    await this.page.locator('#is_other_than_dependents_home3').check();
    await this.page.locator('#is_distance_learning_needed3').check();

    await this.page.locator('#has_pet_no').check();
    await this.page.locator('#other_service_worker_available_no_first').check();
    await this.page.getByText('Either').click();
    await this.page.locator('#is_specific_parking_no_first').check();
    await this.page.locator('#parking_available_no').check();
  }

  async selectValidDate() {
    while (true) {
      const date = getNextFutureDate();

      await this.startDateInput.fill('');
      await this.startDateInput.fill(date);
      await this.startDateInput.press('Enter');

      const duplicatePopup = this.page.locator(
        'button:has-text("NO - GO BACK AND CHANGE THE DATE/TIME")'
      );

      if (await duplicatePopup.isVisible().catch(() => false)) {
        await duplicatePopup.click();
        continue;
      }

      break;
    }
  }

  async selectTimeAndFlexibility() {
    await this.page.getByLabel('Start Hour').selectOption('10');
    await this.page.getByLabel('End Hour').selectOption('4');

    await this.page
      .locator('text=Is Your Start/End Time Flexible?')
      .locator('..')
      .getByText('Yes')
      .click();

    const flexTextbox = this.page.getByRole('textbox', {
      name: 'If yes, please provide',
    });

    await expect(flexTextbox).toBeVisible();
    await flexTextbox.fill('30 mins');
  }

  async submit() {
    await this.page.locator('#acknowledge_cc2').check();
    await this.page
      .getByRole('checkbox', { name: '*I understand (once Staffed)' })
      .check();

    await this.page
      .getByRole('button', { name: 'Submit In-Network CARE Request' })
      .click();

    const finalProceed = this.page.locator(
      'button.dup_validate_suc:has-text("Yes - submit this CARE Request as is")'
    );

    if (await finalProceed.isVisible().catch(() => false)) {
      await finalProceed.click();
    }

    await this.page.waitForTimeout(2000);
  }

  async createRequest() {
    await this.selectWellChildCare();
    await this.fillCareDetails();
    await this.selectValidDate();
    await this.selectTimeAndFlexibility();
    await this.submit();
  }
}
