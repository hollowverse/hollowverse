import { Page, test } from '@playwright/test';

export async function factTestFragment(page: Page, factSelector: string) {
  const fact = await page.locator(`${factSelector} >> #fact-details`);
  await test.expect(await fact.nth(0)).toHaveAttribute('href', /\/fact\//);

  const tag = await page.locator(`${factSelector} >> :nth-match(#tag, 1)`);
  await test.expect(await tag.nth(0)).toHaveAttribute('href', /\/tag\//);

  await page.locator(`${factSelector} >> #fact-comments-link`);
}
