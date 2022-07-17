import { Page } from '@playwright/test';

export async function relatedCelebsTestFragment(
  page: Page,
  originPageSelector: string,
) {
  await page.locator('#related-celebs-tag >> :nth-match(#chr-item, 1)').click();
  await page.waitForSelector('#celeb-page, #celeb-issue-page');
  await page.goBack();
  await page.waitForSelector(originPageSelector);

  await page
    .locator('#related-celebs-issue >> :nth-match(#chr-item, 1)')
    .click();
  await page.waitForSelector('#celeb-page, #celeb-issue-page');
  await page.goBack();
  await page.waitForSelector(originPageSelector);
}
