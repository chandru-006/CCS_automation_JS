import { test, expect } from '@playwright/test';
import { getRandomFutureDateWithin30Days } from '../../utils/date.helper.js';

test.describe('Date Helper Validation', () => {

  test('Generated date should be within next 30 days', async () => {
    const generatedDate = getRandomFutureDateWithin30Days();

    console.log('Generated Date:', generatedDate);

    const [mm, dd, yyyy] = generatedDate.split('/').map(Number);
    const generated = new Date(yyyy, mm - 1, dd);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    expect(generated >= today).toBeTruthy();
    expect(generated <= maxDate).toBeTruthy();
  });

});
