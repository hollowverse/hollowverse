import { test } from '@playwright/test';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { doLighthouse } from '~/e2e-tests/doLighthouse';
import { createGoBack } from '~/e2e-tests/helpers';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { relatedCelebsTestFragment } from '~/e2e-tests/relatedCelebs.e2e-test-fragment';
import { testUrl } from '~/e2e-tests/testUrl';

const url = `${testUrl}/kim-kardashian/fact/3bd2c9a4-2569-4905-be3d-af0ce39be82a`;

test('Fact page E2E test', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector('#fact-page');

  const goBack = createGoBack(page, '#fact-page');

  await commonElementsTestFragment(page);

  await page.locator('#fact-page-header').click();
  await page.waitForSelector('#celeb-issue-page');
  await goBack();

  await page.waitForSelector('#fact-quote');
  await page.waitForSelector('#fact-context');

  await page.waitForSelector('#fact-page-comments');

  await relatedCelebsTestFragment(page, '#fact-page');
});

if (doLighthouse) {
  test('Fact page Lighthouse test', async () => {
    await lighthouseTest(url, 'Fact page');
  });
}
