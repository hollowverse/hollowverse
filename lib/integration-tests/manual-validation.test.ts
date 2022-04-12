import { test } from '@playwright/test';
import fs from 'fs';

const pageUrls = fs
  .readFileSync(process.env.URL_FILE!, 'utf8')
  .trim()
  .split('\n');

test('Validate that everything looks good', async ({ page }) => {
  for (const url of pageUrls) {
    // Does each page look good?
    await page.goto(url);
    await page.pause();
  }
});
