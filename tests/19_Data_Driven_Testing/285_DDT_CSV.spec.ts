import { test, expect } from '@playwright/test';
import { readCSV } from './util/csvReader.js';

import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('DDT CSV', () => {
    const loginData = readCSV(path.join(__dirname, '/test-data/login-data.csv'));
    
    for (const [index, data] of loginData.entries()) {

        test(`Login with ${index + 1}: ${data.description}`, async ({ page }) => {
            await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');

            let textboxEmailAddress = page.getByRole("textbox", { name: "Email Address" });
            let textboxPassword = page.getByRole("textbox", { name: "Password" }).or(page.locator("#password")).or(page.locator("[name=\"password\"]"));
            let buttonLoginToPracticeAccount = page.getByRole("button", { name: "Login to Practice Account" }).or(page.getByTestId("login-button")).or(page.getByText("Login to Practice Account"));
            await textboxEmailAddress.fill(data.username ?? '');
            await textboxPassword.fill(data.password ?? '');
            await buttonLoginToPracticeAccount.click();

            await expect(page).toHaveURL(data.expectedURL ?? '');

        });

    }


});