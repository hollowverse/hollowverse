import { test } from '@playwright/test';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { factTestFragment } from '~/e2e-tests/fact.e2e-test-fragment';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { testUrl } from '~/e2e-tests/testUrl';

const url = `${testUrl}/kim-kardashian`;

test('Celeb page E2E test', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector('#celeb-page');

  await commonElementsTestFragment(page);

  await page.locator('#search-icon').click();

  await page.waitForSelector('#search-page');
  await page.locator('#search-back-button').click();

  await page.waitForSelector('#celeb-page');
  await page.locator(':nth-match(#tag, 1)').click();

  await page.waitForSelector('#celeb-tag-page');
  await page.goBack();

  await page.waitForSelector('#celeb-page');
  await page.waitForSelector('#editorial-summary');
  await page.waitForSelector('#editorial');
  await page
    .locator('#interesting-profiles >> :nth-match(#chr-item, 1)')
    .click();
  await page.waitForSelector('#celeb-page-kim-kardashian', {
    state: 'detached',
  });
  await page.goBack();

  await page.waitForSelector('#celeb-page-kim-kardashian');

  await factTestFragment(page, '#celeb-page >> :nth-match(#fact, 3)');
});

test('Celeb page Lighthouse test', async () => {
  await lighthouseTest(url, 'Celeb page');
});
