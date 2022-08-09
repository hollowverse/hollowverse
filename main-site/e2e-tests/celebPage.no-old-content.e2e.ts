import { test } from '@playwright/test';
import escapeRegExp from 'lodash.escaperegexp';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { doLighthouse } from '~/e2e-tests/doLighthouse';
import { factTestFragment } from '~/e2e-tests/fact.e2e-test-fragment';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { testUrl } from '~/e2e-tests/testUrl';

const url = `${testUrl}/kim-kardashian`;

test('Celeb page (no old content) E2E test', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector('#celeb-page');

  await commonElementsTestFragment(page);

  await page.locator('#search-link').click();

  await page.waitForSelector('#search-page');
  await page.locator('#search-back-button').click();

  await page.waitForSelector('#content.kim-kardashian');

  await factTestFragment(page, '#celeb-page >> :nth-match(#fact, 3)');

  // Test pagination
  await page.locator('#pagination-next-page-button').click();
  await page.waitForURL(new RegExp(`.*${escapeRegExp('p/2')}.*`));

  await factTestFragment(page, '#celeb-page >> :nth-match(#fact, 1)');
  await commonElementsTestFragment(page);

  await page.locator('#pagination-previous-page-button').click();
  await page.waitForURL(url);

  await factTestFragment(page, '#celeb-page >> :nth-match(#fact, 1)');
  await commonElementsTestFragment(page);
});

if (doLighthouse) {
  test('Celeb page (no old content) Lighthouse test', async () => {
    await lighthouseTest(url, 'Celeb page no old content');
  });
}
