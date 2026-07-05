// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  timeout: 40 * 1000,
  
  expect: {
    timeout: 5000,
  },

  workers: 1,
  
  reporter: 'html', 

  use: {
  
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on'

  },
  
});

