import { test } from '@playwright/test';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { testUrl } from '~/e2e-tests/testUrl';

const url = `${testUrl}/~about`;

test('About page E2E test', async ({ page }) => {
  await page.goto(url);
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

test('About page Lighthouse test', async () => {
  await lighthouseTest(url, 'About page');
});
