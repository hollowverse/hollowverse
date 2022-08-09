import { Page, test } from '@playwright/test';

export async function commonElementsTestFragment(page: Page) {
  const logo = await page.locator(`#logo`);
  await test.expect(await logo.nth(0)).toHaveAttribute('href', '/');

  const searchIcon = await page.locator(`#search-link`);
  await test
    .expect(await searchIcon.nth(0))
    .toHaveAttribute('href', /.*\/~search.*/);

  const aboutLink = await page.locator(`#about-link`);
  await test.expect(await aboutLink.nth(0)).toHaveAttribute('href', '/~about');
}
