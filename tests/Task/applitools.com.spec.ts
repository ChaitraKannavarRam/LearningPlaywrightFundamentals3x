import {test, expect, type Locator, type Page} from '@playwright/test';
import { calculator } from '../../utils/appitoolUtil.js';
test('Applitools',async({page})=>{

    await page.goto('https://demo.applitools.com/');
    await page.getByRole('textbox',{name:'Username'}).fill('Admin');
    await page.getByRole('textbox',{name:'Password'}).fill('Password@123');
    await page.getByRole('link',{name: 'Sign in'}).click();
    expect(await page.url()).toBe('https://demo.applitools.com/app.html');

    let success : Locator =  page.locator('.text-success');
    let danger : Locator =  page.locator('.text-danger');
    await calculator(page, success, danger);
})



