import { test } from '@playwright/test';
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
  await page.locator(':nth-match(#trending-issue-item, 4)').click();

  await page.waitForSelector('#issue-page');
  await page.locator('#logo').click();

  await page.waitForSelector('#homepage');
  await page.locator(':nth-match(#homepage-latest-fact-title, 5)').click();

  await page.waitForSelector('#homepage');
  await page.locator('#logo').click();

  await page.waitForSelector('#homepage');
  await factTestFragment(
    page,
    ':nth-match(#homepage-latest-fact, 3)',
    '#homepage',
  );
});

test('Homepage Lighthouse test', async () => {
  await lighthouseTest(url, 'Homepage');
});
