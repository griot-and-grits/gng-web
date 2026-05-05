import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Griot and Grits/i);
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();

    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('shows sponsors and partners section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Thank You to Our Sponsors & Partners')).toBeVisible();
  });

  test('shows become a sponsor CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Interested in sponsoring?')).toBeVisible();
  });
});
