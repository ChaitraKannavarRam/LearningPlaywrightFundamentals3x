import {test, expect, type Locator, type Page} from '@playwright/test';
import { calculator } from '../../utils/appitoolUtil.js';
test('Applitools',async({page})=>{

    await page.goto('https://demo.applitools.com/');
    await page.getByRole('textbox',{name:'Username'}).fill('Admin');
    await page.getByRole('textbox',{name:'Password'}).fill('Password@123');
    await page.getByRole('link',{name: 'Sign in'}).click();
    // expect(await page.url()).toBe('https://demo.applitools.com/app.html');
    //Web first assertions
    await expect(page).toHaveURL('https://demo.applitools.com/app.html')

    await expect(page.locator('table tbody tr').first()).toBeVisible()

    const success : Locator =  page.locator('table tbody .text-success');
    const danger : Locator =  page.locator('table tbody .text-danger');

    

    const sum = await calculator(success, danger);
    expect(sum).toBeCloseTo(1996.22,2);
})



