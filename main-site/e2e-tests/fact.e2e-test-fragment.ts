import { Page } from '@playwright/test';

export async function factTestFragment(
  page: Page,
  factSelector: string,
  originPageSelector: string,
) {
  await page.locator(`${factSelector} >> #fact-details`).click();
  await page.waitForSelector('#fact-page');
  await page.goBack();
  await page.waitForSelector(originPageSelector);

  await page.locator(`${factSelector} >> :nth-match(#tag, 1)`).click();
  await page.waitForSelector('#celeb-tag-page');
  await page.goBack();
  await page.waitForSelector(originPageSelector);

  await page.locator(`${factSelector} >> #fact-comments-link`).click();
  await page.waitForURL(/^https:\/\/forum.hollowverse.com.*/, {
    timeout: 10000,
  });
  await page.goBack();
}
