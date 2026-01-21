import { expect } from '@playwright/test';
import { getRandomFutureDateWithin30Days } from '../utils/date.helper.js';

export class WellChildCarePage {
  constructor(page) {
    this.page = page;
    this.startDateInput = page.locator('#start_date');
  }

  async selectWellChildCare() {
    await this.page.waitForTimeout(2000);
    await this.page.locator('#care_type_child_adult').click();
    await expect(this.page.locator('#well_child_care')).toBeVisible();
    await this.page.locator('#well_child_care').click();
  }

  async fillCareDetails() {
    await this.page.getByRole('checkbox', { name: /./ }).first().check();

    await this.page
      .getByRole('textbox', { name: 'Reason for Child Care?' })
      .fill('Automation Test');

    await this.page.locator('#is_other_than_dependents_home3').check();
    await this.page.locator('#is_distance_learning_needed3').check();
    await this.page.locator('#locations_439').check();
    await this.page.locator('#has_pet_no').check();
    await this.page.locator('#other_service_worker_available_no_first').check();
    await this.page.getByText('Either').click();
    await this.page.locator('#is_specific_parking_no_first').check();
    await this.page.locator('#parking_available_no').check();
  }

  async selectValidDate() {
    const date = getRandomFutureDateWithin30Days();

    await this.startDateInput.fill('');
    await this.startDateInput.fill(date);
    await this.startDateInput.press('Enter');
  }

  async selectTimeAndFlexibility() {
    await this.page.getByLabel('Start Hour').selectOption('10');
    await this.page.getByLabel('End Hour').selectOption('4');
    await this.page.locator('#is_start_end_time_flexible3').check();
  }

  async submit() {
    await this.page.locator('#acknowledge_cc2').check();
    await this.page.locator('#acknowledge_cr').click();
    await this.page.getByRole('button', { name: 'Submit In-Network CARE Request' }).click();
    await this.page.waitForTimeout(7000);
    const proceedBtn = this.page.locator(
      'button[data-bb-handler="success"]:has-text("Yes")'
    );

    if (await proceedBtn.isVisible().catch(() => false)) {
      await proceedBtn.click();
    }
  }

  async createRequest() {
    await this.selectWellChildCare();
    await this.fillCareDetails();
    await this.selectValidDate();
    await this.selectTimeAndFlexibility();
    await this.submit();
  }
}
