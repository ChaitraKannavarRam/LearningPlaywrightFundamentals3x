import {test, expect} from '@playwright/test';

test('Hover over Add-ons and click on Wi-Fi', async({page})=>{

await page.goto('https://app.thetestingacademy.com/playwright/widgets/hover-menu');
await page.getByTestId('nav-add-ons').hover();
await page.getByRole('menuitem',{name: 'Wi-Fi'}).click();
expect(await page.getByTestId('hover-output').innerText()).toContain('Wi-Fi');


})