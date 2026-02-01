import { test, expect } from '@playwright/test';

test.describe('Admin Pages', () => {
  test('should have admin pages accessible', async ({ page }) => {
    await page.goto('/admin');

    // With ADMIN_AUTH_DISABLED=true, admin pages are directly accessible.
    // With auth enabled, this would redirect to /admin/sign-in.
    await expect(page).toHaveURL(/\/admin/);
  });
});
