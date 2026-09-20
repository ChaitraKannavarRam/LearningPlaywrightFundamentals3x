import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
  await page.getByText('TTACart Login Accepted').click();
  await page.getByTestId('username').click();
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('tta_secret');
  await page.getByTestId('login-button').click();
  await page.getByTestId('add-to-cart-tta-bike-light').click();
  await page.getByTestId('shopping-cart-link').click();
  await page.getByTestId('checkout').click();
  await page.getByTestId('cancel').click();
  await page.getByTestId('open-menu').click();
  await page.getByTestId('logout-sidebar-link').click();
  await expect(page.locator('#login-form')).toBeVisible();
  await expect(page.getByTestId('password')).toBeEmpty();
});

