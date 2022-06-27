import { test } from '@playwright/test';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { testUrl } from '~/e2e-tests/testUrl';

test('Knowledge Graph page E2E test', async ({ page }) => {
  await page.goto(`${testUrl}/~kg/kg%3A%2Fm%2F012hshtc`);
  await page.waitForSelector('#knowledge-graph-page');

  await commonElementsTestFragment(page, '#knowledge-graph-page');

  await page.waitForSelector('#kg-request-ack');
  await page.waitForSelector('#kg-celeb-image');
});
