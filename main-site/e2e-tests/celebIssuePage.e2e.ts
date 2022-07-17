import { test } from '@playwright/test';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { factTestFragment } from '~/e2e-tests/fact.e2e-test-fragment';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { relatedCelebsTestFragment } from '~/e2e-tests/relatedCelebs.e2e-test-fragment';
import { testUrl } from '~/e2e-tests/testUrl';

const issueId = 'dbb542ca-ea4a-4df7-9f15-a773fb9e752c';
const url = `${testUrl}/donald-trump/issue/${issueId}`;

test('Celeb Issue page E2E test', async ({ page }) => {
  await page.goto(url);

  await page.waitForSelector('#celeb-issue-page');

  await factTestFragment(page, ':nth-match(#fact, 1)');
  await commonElementsTestFragment(page);

  await page.locator('#tag');

  await page.locator(':nth-match(#scroller-issue-item, 1)').click();

  await page.waitForSelector(`#celeb-issue-page-${issueId}`, {
    state: 'detached',
  });

  await page.waitForSelector('#celeb-issue-page');
  await page.goBack();

  await relatedCelebsTestFragment(page, '#celeb-issue-page');
});

test('Celeb Issue page Lighthouse test', async () => {
  await lighthouseTest(url, 'Celeb Issue page');
});
