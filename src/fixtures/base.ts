import { test as base, Browser, Page, chromium } from '@playwright/test';

// Custom fixtures
type Fixtures = {
  browser: Browser;
  page: Page;
  gotoUrl: (url: string) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  browser: async ({}, use) => {
    const browser = await chromium.launch();
    await use(browser);
    await browser.close(); // Kill the browser after the test
  },
  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    await use(page);
    await page.close();
  },
  gotoUrl: async ({ page }, use) => {
    await use(async (url: string) => {
      await page.goto(url);
    });
  },
});

export { expect } from '@playwright/test';
