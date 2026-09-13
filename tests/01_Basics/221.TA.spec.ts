import { test } from "@playwright/test";

test("Navigating to the tta website", async ({ page }) => {
  await page.goto("https://app.thetestingacademy.com/playwright/");
});

test("BCP - in app.vwo.com two roles", async ({ browser }) => {
  const adminContext = await browser.newContext();
  const userContext = await browser.newContext();
  const guestContext = await browser.newContext();

  const adminPage = await adminContext.newPage();
  await adminPage.goto("https://app.thetestingacademy.com/playwright/");

  const userPage = await userContext.newPage();
  await userPage.goto("https://sdet.live");

  const guestPage = await guestContext.newPage();
  await guestPage.goto("https://scrolltest.com");

  await adminPage.close();
  await userPage.close();
  await guestPage.close();
  await adminContext.close();
  await userContext.close();
  await guestContext.close();
});