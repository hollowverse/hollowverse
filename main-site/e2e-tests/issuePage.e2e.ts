import { test } from '@playwright/test';
import escapeRegExp from 'lodash.escaperegexp';
import { commonElementsTestFragment } from '~/e2e-tests/commonElements.e2e-test-fragment';
import { factTestFragment } from '~/e2e-tests/fact.e2e-test-fragment';
import { lighthouseTest } from '~/e2e-tests/lighthouseTest';
import { testUrl } from '~/e2e-tests/testUrl';

const url = `${testUrl}/${'~issue/1de3976b-14c2-4044-9b5c-2cabc42743f2-m'}`;

test('Issue page E2E test', async ({ page }) => {
  await page.goto(url);

  await page.waitForSelector('#issue-page');

  await factTestFragment(page, ':nth-match(#fact-list-item, 3)');
  await commonElementsTestFragment(page);

  await page.locator('#issue-page-tags >> :nth-match(#tag, 1)').click();
  await page.waitForURL(new RegExp(`.*${escapeRegExp('tag')}.*`));

  await factTestFragment(page, ':nth-match(#fact-list-item, 2)');
  await commonElementsTestFragment(page);

  await page.locator('#issue-page-title').click();
  await page.waitForURL(new RegExp(`.*${escapeRegExp(url)}$`));

  await factTestFragment(page, ':nth-match(#fact-list-item, 4)');
  await commonElementsTestFragment(page);

  await page.locator('#pagination-next-page-button').click();
  await page.waitForURL(new RegExp(`.*${escapeRegExp('p/2')}.*`));

  await factTestFragment(page, ':nth-match(#fact-list-item, 1)');
  await commonElementsTestFragment(page);

  await page.locator('#pagination-previous-page-button').click();
  await page.waitForURL(new RegExp(`.*${escapeRegExp('p/1')}.*`));

  await factTestFragment(page, ':nth-match(#fact-list-item, 1)');
  await commonElementsTestFragment(page);
});

test('Issue page Lighthouse test', async () => {
  await lighthouseTest(url, 'Issue page');
});
