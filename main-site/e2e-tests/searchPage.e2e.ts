import { test } from '@playwright/test';
import { doLighthouse } from '~/e2e-tests/doLighthouse';
import { createGoBack } from '~/e2e-tests/helpers';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { testUrl } from '~/e2e-tests/testUrl';

const url = `${testUrl}/~search`;

test('Search page E2E test', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector('#search-page');

  const goBack = createGoBack(page, '#search-page');

  await page.locator('#search-back-button').click();
  await page.waitForSelector('#homepage');
  await goBack();

  await page.fill('#search-field', 'elon musk');
  await page.keyboard.press('Enter');
  await page.locator(':nth-match(#chr-item,1)').click();
  await page.waitForSelector(`#content.elon-musk`);
  await goBack();

  await page.fill('#search-field', 'sdfjasldfkjasldfjasdlfk');
  await page.keyboard.press('Enter');
  await page.waitForSelector('#no-results');
  await page.locator('#clear-search').click();

  await page.fill('#search-field', 'testo');
  await page.keyboard.press('Enter');
  await page.locator(':nth-match(#chr-item,1)').click();
  await page.waitForSelector(`#knowledge-graph-page`);
  await goBack();
});

if (doLighthouse) {
  test('Search page Lighthouse test', async () => {
    await lighthouseTest(url, 'Search page');
  });
}
