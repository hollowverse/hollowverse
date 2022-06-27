import { Page } from '@playwright/test';

export function createGoBack(page: Page, dest: string) {
  return async function goBack() {
    await page.goBack();
    await page.waitForSelector(dest);
  };
}
