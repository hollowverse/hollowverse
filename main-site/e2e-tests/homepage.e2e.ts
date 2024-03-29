import { test } from '@playwright/test';
import escapeRegExp from 'lodash.escaperegexp';
import { doLighthouse } from '~/e2e-tests/doLighthouse';
import { factTestFragment } from '~/e2e-tests/fact.e2e-test-fragment';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { testUrl } from '~/e2e-tests/testUrl';

const url = testUrl;

test('Homepage E2E test', async ({ page }) => {
  await page.goto(url);

  await page.waitForSelector('#homepage');
  await page.locator('#homepage-search').click();

  await page.waitForSelector('#search-page');
  await page.locator('#search-back-button').click();

  await page.waitForSelector('#homepage');
  await page.locator(':nth-match(#celeb-gallery-item, 4)').click();

  await page.waitForSelector('#celeb-page');
  await page.locator('#logo').click();

  await page.waitForSelector('#homepage');
  await page.locator(':nth-match(#scroller-issue-item, 4)').click();

  await page.waitForSelector('#issue-page');
  await page.locator('#logo').click();

  await page.waitForSelector('#homepage');
  await page.locator(':nth-match(#fact-list-item-title, 5)').click();

  await page.waitForSelector('#celeb-issue-page');
  await page.locator('#logo').click();

  await page.waitForSelector('#homepage');
  await factTestFragment(page, ':nth-match(#fact-list-item, 3)');

  // Test pagination
  await page.locator('#pagination-next-page-button').click();
  await page.waitForURL(new RegExp(`.*${escapeRegExp('~p/2')}.*`));

  await factTestFragment(page, '#homepage >> :nth-match(#fact, 1)');

  await page.locator('#pagination-previous-page-button').click();
  await page.waitForURL(url);

  await factTestFragment(page, '#homepage >> :nth-match(#fact, 1)');
});

if (doLighthouse) {
  test('Homepage Lighthouse test', async () => {
    await lighthouseTest(url, 'Homepage');
  });
}
