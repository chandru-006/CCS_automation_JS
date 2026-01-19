// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['list'],
    ['allure-playwright'],   // ✅ collects PASSED + FAILED
    ['html']
  ],

  use: {
    screenshot: 'only-on-failure', // screenshots only for failed
    video: 'retain-on-failure',    // videos only for failed
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
