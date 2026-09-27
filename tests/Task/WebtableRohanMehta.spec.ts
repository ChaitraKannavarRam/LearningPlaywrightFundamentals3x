import { test, expect } from "@playwright/test";

test("Webtable", async ({ page }) => {
  await page.goto("https://app.thetestingacademy.com/playwright/webtable");

  // CSS with positional indexing
  // await page.locator('#employee-body > tr:nth-child(3) > td:nth-child(1) > input[type=checkbox]').click();

  // XPath with text match + axis navigation
  //   await page.locator('//td[text()="Rohan.Mehta"]/preceding-sibling::td/input').click();

  // CSS :has() + chained locator
  //    await page.locator("tr:has(td:text('Rohan.Mehta'))")
  //    .locator('input')
  //    .first()
  //    .click();

  //getByRole with accessible name
  //  await page.getByRole('checkbox' , {'name': 'Select Rohan.Mehta'}).click();

  //Playwright's built-in way to scope a row without raw CSS :has()/text tricks,
   await page.locator("tr").filter({ hasText: "Rohan Mehta" }).locator("input[type=checkbox]")
    .click();

});
