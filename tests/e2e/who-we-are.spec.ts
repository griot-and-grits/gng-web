import { test, expect } from '@playwright/test';

test.describe('Who We Are page', () => {
  test('shows Storykeeping Collective volunteer cards', async ({ page }) => {
    await page.goto('/who-we-are');

    const section = page.locator('text=Meet the Storykeepers');
    await expect(section).toBeVisible();
  });

  test('volunteer card opens bio modal on click', async ({ page }) => {
    await page.goto('/who-we-are');

    await page.locator('text=Volunteer Placeholder 1').first().click();

    const modal = page.locator('text=A dedicated volunteer');
    await expect(modal).toBeVisible();
  });
});
