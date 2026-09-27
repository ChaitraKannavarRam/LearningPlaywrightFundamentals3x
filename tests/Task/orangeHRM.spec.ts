import { test, expect } from '@playwright/test';

test('delete a record', async ({ page }) => {
  test.setTimeout(60000);
  // Unique ID per run avoids "Employee Id already exists" validation
  
  const employeeId = Date.now().toString().slice(-6);
  const firstName = 'Chaitra';
  const middleName = 'K';
  const lastName = 'R';
  const fullName = `${firstName} ${middleName}`;

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
  await page.getByRole('textbox', { name: 'Middle Name' }).fill(middleName);
  await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
  await page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input').fill(employeeId);
  await page.getByRole('button', { name: ' Save ' }).click();
  await page.waitForURL(/\/pim\/viewPersonalDetails\//, { timeout: 15000 });

  await page.getByRole('link', { name: 'PIM' }).click();
  await page.waitForLoadState('networkidle');

 
  let row = page.locator('.oxd-table-card').filter({ hasText: employeeId });

  // Walk forward through pages until the row is found, or "Next" is disabled.
  const next = page.locator('.oxd-pagination-page-item.oxd-pagination-page-item--previous-next').last();
  let pagesChecked = 0;
  const maxPages = 100;
  while ((await row.count()) === 0) {
    if (await next.isDisabled()) {
      throw new Error(`Employee "${fullName}" (ID ${employeeId}) not found in any page of the list.`);
    }
    await next.click({ timeout: 10000 });
    await page.waitForLoadState('networkidle');
    row = page.locator('.oxd-table-card').filter({ hasText: employeeId });

    pagesChecked++;
    if (pagesChecked > maxPages) {
      throw new Error(`Employee "${fullName}" (ID ${employeeId}) not found after checking ${maxPages} pages.`);
    }
  }
  await expect(row).toHaveCount(1);

  // Each row has 2 action buttons (edit-pencil, then delete-trash) —
  // target the trash icon's button specifically, not the ambiguous pair.
  await row.locator('.oxd-table-cell-actions button', { has: page.locator('.bi-trash') }).click();
  await page.getByRole('button', { name: ' Yes, Delete ' }).click();

  await expect(page.locator('.oxd-table-card').filter({ hasText: employeeId })).toHaveCount(0);
});