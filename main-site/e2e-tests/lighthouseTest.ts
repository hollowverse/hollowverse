import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync } from 'fs';
import lighthouse from 'lighthouse';
import { join } from 'path';

export async function lighthouseTest(testUrl: string, testName: string) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'error',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(testUrl, options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;

  writeFileSync(
    join(__dirname, 'lighthouse-reports', `${testName}.html`),
    reportHtml,
    { encoding: 'utf-8' },
  );

  await chrome.kill();
}
