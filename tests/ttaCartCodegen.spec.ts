import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
  await page.getByText('TTACart Login Accepted').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('tta_secret');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-tta-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="open-menu"]').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await expect(page.locator('#login-form')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeEmpty();
});

