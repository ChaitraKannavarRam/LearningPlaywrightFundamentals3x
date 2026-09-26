import { test, expect } from '@playwright/test';

test('Verify the TestCase', async ({ page }) => {
   await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");

   const name = 'Luca Greco';
   let row = page.locator('#employees-tbody tr').filter({ hasText: name });

   while (true) {
      if (await row.count()) {
         break;
      }

      const next = page.locator('[data-testid="next-page"]')
      if (await next.isDisabled()) {
         throw new Error('Row not found!');
      }

      await next.click();
      row = page.locator('#employees-tbody tr').filter({ hasText: name });
   }

   const email = await row.locator('td[data-col="email"]').innerText();
   const country = await row.locator('td[data-col="country"]').innerText();

   console.log(email, country);
});