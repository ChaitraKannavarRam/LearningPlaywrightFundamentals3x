import { chromium } from "@playwright/test";
import type { Browser, BrowserContext, Page } from "@playwright/test";

async function run() {
  const browser: Browser = await chromium.launch({ headless: true });
  console.log("Browser launched", browser);

  const context1: BrowserContext = await browser.newContext();
  console.log("Context created", context1);

  const page: Page = await context1.newPage();
  console.log("Page opened");

  await page.goto("https://example.com");
  console.log("Title:", await page.title());

  await page.close();
  await context1.close();
  await browser.close();
}

run();