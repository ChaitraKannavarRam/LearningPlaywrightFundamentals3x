import { chromium } from "@playwright/test";

async function multiUser() {
  const browser = await chromium.launch({ headless: true });

  const viewerContext = await browser.newContext();
  const viewerPage = await viewerContext.newPage();
  await viewerPage.goto("https://app.vwo.com/login");
  console.log("Viewer logged in");

  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  await adminPage.goto("https://app.vwo.com/login");
  console.log("Admin logged in");

  await viewerPage.close();
  await adminPage.close();
  await viewerContext.close();
  await adminContext.close();
  await browser.close();
}

multiUser();