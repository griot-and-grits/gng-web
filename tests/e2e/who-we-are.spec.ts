import { test, expect } from '@playwright/test';

test.describe('Who We Are page', () => {
  test('shows Storykeeping Collective volunteer cards', async ({ page }) => {
    await page.goto('/who-we-are');

    const section = page.locator('text=Meet the Storykeepers');
    await expect(section).toBeVisible();
  });

  test('volunteer card opens bio modal on click', async ({ page }) => {
    await page.goto('/who-we-are');

    // Scroll to bottom to bring Storykeeping Collective into view and trigger framer-motion
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const card = page.locator('.cursor-pointer').filter({ hasText: 'Demethria Ramseur' }).first();
    await expect(card).toBeVisible({ timeout: 5000 });
    await card.click();

    const modal = page.locator('text=Agile practitioner');
    await expect(modal).toBeVisible();
  });
});
