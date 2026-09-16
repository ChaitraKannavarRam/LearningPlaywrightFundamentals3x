import { test, expect } from "@playwright/test";

test("Cure Health", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/", {
    waitUntil: "load",
  });
  await page.locator("#btn-make-appointment").click();
  await page.locator("#txt-username").fill("John Doe");
  await page.locator("#txt-password").fill("ThisIsNotAPassword");
  await page.locator("#btn-login").click();
  await expect(page.locator(".col-sm-12.text-center")).toHaveText(
    "Make Appointment",
  );
});
