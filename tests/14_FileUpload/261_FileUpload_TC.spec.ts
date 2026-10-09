import { test } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL = 'https://app.thetestingacademy.com/playwright/widgets/upload-download'; // replace with target page

test.describe('FileUpload handling', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto(URL, { waitUntil: 'domcontentloaded' });
   });

   test('locate FileUpload and upload', async ({ page }) => {
      // File upload
      // Path of the file. - You should. A

      const filePath = path.join( __dirname, 'testdata.txt');
      console.log(filePath);
      // __dirname - Current working directory full path 
      await page.locator("#single-upload").setInputFiles([filePath]);
      await page.pause();

   });
});