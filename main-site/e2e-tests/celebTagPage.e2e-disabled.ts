import { test } from '@playwright/test';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { doLighthouse } from '~/e2e-tests/doLighthouse';
import { factTestFragment } from '~/e2e-tests/fact.e2e-test-fragment';
import { createGoBack } from '~/e2e-tests/helpers';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { relatedCelebsTestFragment } from '~/e2e-tests/relatedCelebs.e2e-test-fragment';
import { testUrl } from '~/e2e-tests/testUrl';

const tagId = '304bc74d-33aa-4133-b7b1-9836c97557fd';
const url = `${testUrl}/kim-kardashian/tag/${tagId}`;

test('Celeb Tag page E2E test', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector('#celeb-tag-page');

  const goBack = createGoBack(page, '#celeb-tag-page');

  await commonElementsTestFragment(page);

  await page.locator(':nth-match(#tag.unselected, 1)').click();
  await page.waitForSelector(`#celeb-tag-page-${tagId}`, { state: 'detached' });
  await goBack();

  await factTestFragment(page, '#celeb-tag-page >> :nth-match(#fact, 1)');

  await relatedCelebsTestFragment(page, '#celeb-tag-page');
});

if (doLighthouse) {
  test('Celeb Tag page Lighthouse test', async () => {
    await lighthouseTest(url, 'Celeb Tag page');
  });
}
