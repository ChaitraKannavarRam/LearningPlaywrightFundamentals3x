import {test,expect} from '@playwright/test';

test('QA profile form practice ', async({page})=>{
    await page.goto('https://app.thetestingacademy.com/playwright/tables/practice#page');

    await page.getByRole('textbox', { name: 'First name' }).fill('Chaitra');
    await page.getByRole('textbox', { name: 'Last name' }).fill('K R');
    await page.getByTestId('gender-female').check();
    await page.getByRole('combobox',{ name: 'Years of experience'}).selectOption('5');
    await page.getByRole('textbox',{ name: 'Date'}).fill('1999-01-29');
    await page.getByRole('radio',{ name: ' Automation Tester'}).check();
    await page.getByRole('checkbox',{ name:' Selenium Webdriver'}).check();
    await page.getByRole('checkbox',{ name:' Asia'}).check();
    await page.getByRole('tab',{name: 'Navigation Commands'}).click();
    await page.getByRole('button',{name: 'Upload Image'}).setInputFiles('img.png');
    await page.getByRole('link',{name: 'Download file'}).click();
    await page.getByRole('button',{name: 'Save profile'}).click();
    let output: string = await page.locator('#submission-output').innerText();
    expect(output).toContain('"profession": "Automation Tester"');
    console.log(output);

})
