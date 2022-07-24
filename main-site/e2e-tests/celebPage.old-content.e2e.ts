import { test } from '@playwright/test';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { doLighthouse } from '~/e2e-tests/doLighthouse';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { testUrl } from '~/e2e-tests/testUrl';

const url = `${testUrl}/jack-white`;

test.only('Celeb page (with old content) E2E test', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector('#celeb-page');

  await commonElementsTestFragment(page);

  await page.locator('#search-icon').click();

  await page.waitForSelector('#search-page');
  await page.locator('#search-back-button').click();

  await page.waitForSelector('#celeb-page');
  await page.waitForSelector('#editorial-summary');
  await page.waitForSelector('#editorial');
  await page
    .locator('#interesting-profiles >> :nth-match(#chr-item, 1)')
    .click();
  await page.waitForSelector('#content.jack-white', {
    state: 'detached',
  });
  await page.goBack();

  await page.waitForSelector('#content.jack-white');
});

if (doLighthouse) {
  test('Celeb page (with old content) Lighthouse test', async () => {
    await lighthouseTest(url, 'Celeb page');
  });
}
