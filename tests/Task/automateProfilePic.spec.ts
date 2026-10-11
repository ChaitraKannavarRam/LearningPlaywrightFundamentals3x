import {test, expect} from '@playwright/test';

const TTA__USER = process.env.TTA_USER;
const TTA_PASS = process.env.TTA_PASS;

test.use(

    {
        storageState: './tta-user-session.json',
        screenshot: 'only-on-failure',
    }
);

test('Automate profile pic update on app.thetestingacademy.com', async({page}) =>{
    
    await page.goto('https://app.thetestingacademy.com/student/my-process');
    await page.getByText('Settings').scrollIntoViewIfNeeded();
    await page.getByText('Settings').click();

    await expect(page).toHaveURL('https://app.thetestingacademy.com/student/settings');

    await page.getByText('Upload Photo').setInputFiles('./profilePic.png');

    await page.waitForTimeout(3000);


});