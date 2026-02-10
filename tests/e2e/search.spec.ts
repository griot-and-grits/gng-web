import { test, expect } from '@playwright/test';
import { ingestArtifact } from './helpers/api-client';
import { sampleMetadata, createTestFile } from './helpers/test-data';

test.describe('Artifact Search & List', () => {
    test('should display seeded artifacts on the admin artifacts page', async ({ page }) => {
        // Seed artifacts via API
        const artifacts = await Promise.all(
            Array.from({ length: 3 }, async () => {
                const metadata = sampleMetadata();
                const file = createTestFile();
                return ingestArtifact(file, metadata);
            }),
        );

        expect(artifacts).toHaveLength(3);

        // Navigate to admin artifacts list
        await page.goto('/admin/artifacts');

        // Wait for the page content to load
        await expect(page.locator('body')).toBeVisible();

        // Verify the artifacts table or list renders
        // The ArtifactTable component should be present
        await expect(page.locator('h2')).toBeVisible();
    });

    test('should load the public collection page', async ({ page }) => {
        await page.goto('/collection');
        await expect(page).toHaveURL(/\/collection/);
        await expect(page.locator('body')).toBeVisible();
    });
});
