import { chromium } from "@playwright/test";
import type { Browser, BrowserContext, Page } from "@playwright/test";

async function run() {
  const browser: Browser = await chromium.launch({ headless: false });
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto("https://example.com");
  console.log("Title:", await page.title());

  await page.close();
  await context.close();
  await browser.close();
}

run();

// Browser launched
// Context created
// Page opened
// Title: Example Domain