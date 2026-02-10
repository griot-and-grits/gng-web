import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import os from 'os';

test.describe('Artifact Upload', () => {
    test('should upload an artifact via the form and redirect to detail page', async ({ page }) => {
        // Create a temporary test file
        const tmpFile = path.join(os.tmpdir(), `e2e-upload-${Date.now()}.txt`);
        fs.writeFileSync(tmpFile, 'E2E test file content for upload');

        await page.goto('/admin/upload');

        // Attach file via the hidden file input
        const fileInput = page.locator('#fileUpload');
        await fileInput.setInputFiles(tmpFile);

        // Fill required title field
        await page.locator('#title').fill(`E2E Upload Test ${Date.now()}`);

        // Fill optional fields
        await page.locator('#description').fill('Automated E2E test upload');
        await page.locator('#creator').fill('Playwright Test Suite');
        await page.locator('#creation_date').fill('2024-06-15');

        // Submit the form
        await page.locator('button[type="submit"]').click();

        // Wait for navigation to the artifact detail page
        await page.waitForURL(/\/admin\/artifacts\//, { timeout: 30000 });

        // Verify we landed on an artifact detail page
        expect(page.url()).toMatch(/\/admin\/artifacts\/.+/);

        // Cleanup temp file
        fs.unlinkSync(tmpFile);
    });

    test('should show validation error when title is empty', async ({ page }) => {
        await page.goto('/admin/upload');

        // Try to submit without filling anything
        await page.locator('button[type="submit"]').click();

        // Should stay on the same page (validation prevents submission)
        await expect(page).toHaveURL(/\/admin\/upload/);
    });
});
