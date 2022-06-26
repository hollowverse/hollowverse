import { test } from '@playwright/test';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { factTestFragment } from '~/e2e-tests/fact.e2e-test-fragment';
import { createGoBack } from '~/e2e-tests/helpers';
import { relatedCelebsTestFragment } from '~/e2e-tests/relatedCelebs.e2e-test-fragment';
import { testUrl } from '~/e2e-tests/testUrl';

test('Tag page E2E test', async ({ page }) => {
  const tagId = '304bc74d-33aa-4133-b7b1-9836c97557fd';

  await page.goto(`${testUrl}/kim-kardashian/tag/${tagId}`);
  await page.waitForSelector('#celeb-tag-page');

  const goBack = createGoBack(page, '#celeb-tag-page');

  await commonElementsTestFragment(page, '#celeb-tag-page');

  await page.locator('#main-name').click();
  await page.waitForSelector('#celeb-page');
  await goBack();

  await page.locator(':nth-match(#tag.unselected, 1)').click();
  await page.waitForSelector(`#celeb-tag-page-${tagId}`, { state: 'detached' });
  await goBack();

  await factTestFragment(
    page,
    '#celeb-tag-page >> :nth-match(#fact, 1)',
    '#celeb-tag-page',
  );

  await page.locator('#return-to-celeb-views-button').click();
  await page.waitForSelector('#celeb-page');
  await goBack();

  await relatedCelebsTestFragment(page, '#celeb-tag-page');
});
