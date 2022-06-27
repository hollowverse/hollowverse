import { test } from '@playwright/test';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { testUrl } from '~/e2e-tests/testUrl';

const url = `${testUrl}/~kg/kg%3A%2Fm%2F012hshtc`;

test('Knowledge Graph page E2E test', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector('#knowledge-graph-page');

  await commonElementsTestFragment(page, '#knowledge-graph-page');

  await page.waitForSelector('#kg-request-ack');
  await page.waitForSelector('#kg-celeb-image');
});

test('Knowledge Graph page Lighthouse test', async () => {
  await lighthouseTest(url, 'KG page');
});
