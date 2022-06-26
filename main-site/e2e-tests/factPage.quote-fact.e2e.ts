import { test } from '@playwright/test';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { factTestFragment } from '~/e2e-tests/fact.e2e-test-fragment';
import { testUrl } from '~/e2e-tests/test-url';

test('Celeb page E2E test', async ({ page }) => {
  await page.goto(
    `${testUrl}/kim-kardashian/fact/3bd2c9a4-2569-4905-be3d-af0ce39be82a`,
  );
  await page.waitForSelector('#fact-page');

  await commonElementsTestFragment(page, '#fact-page');

  await page.waitForSelector('#fact-page');
  await page.locator(':nth-match(#tag, 1)').click();

  await page.waitForSelector('#celeb-tag-page');
  await page.goBack();

  await page.waitForSelector('#celeb-page');

  await factTestFragment(
    page,
    '#celeb-page >> :nth-match(#fact, 3)',
    '#celeb-page',
  );
});
