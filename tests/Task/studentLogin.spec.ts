import {test, expect} from '@playwright/test';

test('Login with invalid credentials', async({page})=>{

    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
    await page.locator("input[placeholder='student@thetestingacademy.com']").fill("dummy@gmail.com");
    await page.locator("input[placeholder='Enter your password']").fill("pass");
    await page.locator("input[name='remember']").click();
    await page.locator("button[data-testid='login-button']").click();
  expect( await page.url()).toContain('https://app.thetestingacademy.com/playwright/multiple_element_filter')




})