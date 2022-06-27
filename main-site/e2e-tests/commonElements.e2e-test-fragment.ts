import { Page } from '@playwright/test';

export async function commonElementsTestFragment(
  page: Page,
  originPageSelector: string,
) {
  await page.locator(`#logo`).click();
  await page.waitForSelector('#homepage');
  await page.goBack();
  await page.waitForSelector(originPageSelector);

  await page.locator('#search-icon').click();
  await page.waitForSelector('#search-page');
  await page.goBack();
  await page.waitForSelector(originPageSelector);

  await page.locator('#about-link').click();
  await page.waitForSelector('#about-page');
  await page.goBack();
  await page.waitForSelector(originPageSelector);
}
