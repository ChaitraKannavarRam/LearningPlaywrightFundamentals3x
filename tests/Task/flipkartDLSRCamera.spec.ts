import { test, expect, type Page, type Locator} from '@playwright/test';


async function printNameAndPrice(page:  Page): Promise<void> {
    while (true) {
        const productCards = page.locator("//div[@data-id]");
        // .count() never waits for anything — it's a synchronous snapshot of
        // the DOM right now. Flipkart is a client-side SPA: pressing Enter (or
        // clicking "Next") updates the URL instantly via the History API, but
        // the product grid takes longer to actually render. Without waiting
        // for the first card to appear, count() runs before any cards exist
        // and returns 0. This wait is what count() itself won't do for you.
        await productCards.first().waitFor({ state: 'visible' });

        const totalCards = await productCards.count();
        console.log(`Total products on this page: ${totalCards}`);

        for (let i = 0; i < totalCards; i++) {
            const card = productCards.nth(i);
            const cameraNameLocator = card.locator("//div[contains(@class,'RG5Slk')]").first();
            const cameraPriceLocator = card.locator("//div[contains(@class,'hZ3P6w')]").first();

            const nameCount = await cameraNameLocator.count();
            const priceCount = await cameraPriceLocator.count();
            if (nameCount > 0 && priceCount > 0) {
                const cameraName = await cameraNameLocator.textContent();
                const cameraPrice = await cameraPriceLocator.textContent();
                console.log(`Camera Name: ${cameraName?.trim()} | ` + `Camera Price: ${cameraPrice?.trim()}`);
            }
        }

        const nextButton = page.locator("//a[normalize-space()='Next']").last();

        if (await nextButton.count() === 0) {
            break; // last page reached — pagination finished normally
        }

        if (!(await nextButton.isVisible())) {
            break; // last page reached — pagination finished normally
        }

        // Click and wait for the URL to actually change together: clicking
        // alone races ahead of the SPA's re-render, so the next loop
        // iteration can end up querying/clicking elements while the page is
        // still mid-transition — which is what Playwright's "element is not
        // stable" means (its position is genuinely still changing).
        const currentUrl = page.url();
        try {
            await Promise.all([
                page.waitForURL(newUrl => newUrl.toString() !== currentUrl, { timeout: 10000 }),
                nextButton.click(),
            ]);
        } catch {
            // On the real last page, Flipkart's own "Next" link sometimes
            // lags one render cycle behind and still shows as present/visible
            // even though clicking it does nothing (its disabled state hasn't
            // caught up yet). A click that never changes the URL means we've
            // genuinely reached the end, not a flaky click.
            break;
        }
        // The URL changing only means navigation *started* — the SPA swaps
        // in the new page's content asynchronously after that. Without this,
        // the top of the next loop iteration can still see the old page's
        // (stale) cards, which is why the same page was printed twice.
        await page.waitForLoadState('networkidle');
    }
}

test('AutomateFlipkart', async ({ page }) => {
    // test.setTimeout(90000);
    await page.goto('https://www.flipkart.com/');

    const closePopup = page.locator("span.b3wTlE");
    if (await closePopup.count() > 0 && await closePopup.isVisible()) {
        await closePopup.click();
    }

    const searchBox = page.locator("//input[@name='q' and not(@readonly)]").first();

    if (await searchBox.count() > 0) {
        await expect(searchBox).toBeVisible();
        await expect(searchBox).toBeEditable();
        await searchBox.fill('DSLR Camera');
        await searchBox.press('Enter');
    }

    await printNameAndPrice(page);

    //await page.pause();
});