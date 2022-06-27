import { test } from '@playwright/test';
import { testUrl } from '~/e2e-tests/testUrl';

test.only('About page E2E test', async ({ page }) => {
  await page.goto(`${testUrl}/~about`);
  await page.waitForSelector('#about-page');

  await page.locator(`#logo`).click();
  await page.waitForSelector('#homepage');
  await page.goBack();
  await page.waitForSelector('#about-page');

  await page.locator('#search-icon').click();
  await page.waitForSelector('#search-page');
  await page.goBack();
  await page.waitForSelector('#about-page');

  await page.waitForSelector('#about-page-content');
});
