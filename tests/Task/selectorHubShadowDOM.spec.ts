import {test, expect} from '@playwright/test';

test('Shadow DOM', async({page}) =>{


    await page.goto('https://selectorshub.com/xpath-practice-page/');
    await page.locator('#kils').fill('Chaitra');
    await page.locator('#pizza').fill('Cheese Pizza');
    await page.keyboard.press('Tab'); 
    await page.keyboard.type('smoke testing');
    await page.keyboard.press('Tab'); 
    await page.keyboard.type('secret');
//Playwright's locators pierce only open shadow roots, so no locator can reach it. 
// Two ways to still fill it:

// Keyboard: click the field just before it, press Tab to move focus into the password field, 
// then type: await page.keyboard.press('Tab'); await page.keyboard.type('secret'). This works because focus can enter a closed shadow root even though locators cannot.

// Ask the developers to keep shadow roots open in test builds. Closed roots are rare and 
// mostly come from third-party widgets.


})