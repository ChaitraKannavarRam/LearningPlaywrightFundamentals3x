import { chromium } from 'playwright';
import dotenv from "dotenv";
import {expect} from '@playwright/test';

dotenv.config();
// Credentials live in .env (gitignored) — never hardcode them in a public repo.


const TTA__USER = process.env.TTA_USER;
const TTA_PASS = process.env.TTA_PASS;

async function saveSession() {
  
    let browser = await chromium.launch({ headless: false });
    let context = await browser.newContext();
    let page = await context.newPage();


    await page.goto('https://app.thetestingacademy.com/login');
    await page.getByPlaceholder('Enter your email address').fill(TTA__USER ?? '');
    await page.getByPlaceholder('Enter your password').fill(TTA_PASS ?? '');
    

    await page.locator('button[data-localization-key="formButtonPrimary"]').click();
    
    await page.waitForTimeout(40000);

    await expect(page).toHaveURL('https://app.thetestingacademy.com/student/my-process')
    
    await context
    .storageState({ path: "./tta-user-session.json" });
    console.log("Session saved to user-session.json ✅");

    await browser.close();

}
saveSession();