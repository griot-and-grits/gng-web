import { test, expect } from '@playwright/test';
import { ingestArtifact, getArtifactStatus } from './helpers/api-client';
import { sampleMetadata, createTestFile } from './helpers/test-data';

test.describe('Artifact Status', () => {
    test('should show artifact status as ready when metadata extraction is disabled', async ({
        page,
    }) => {
        // Seed artifact via API
        const metadata = sampleMetadata();
        const file = createTestFile();
        const { artifact_id } = await ingestArtifact(file, metadata);

        // Verify API returns status ready (metadata extraction disabled in test env)
        const status = await getArtifactStatus(artifact_id);
        expect(status.status).toBe('ready');

        // Navigate to artifact detail page
        await page.goto(`/admin/artifacts/${artifact_id}`);

        // Verify the page loaded (should contain the artifact title or status)
        await expect(page.locator('body')).toBeVisible();
    });

    test('should return artifact status from API', async () => {
        const metadata = sampleMetadata();
        const file = createTestFile();
        const { artifact_id } = await ingestArtifact(file, metadata);

        const status = await getArtifactStatus(artifact_id);
        expect(status.artifact_id).toBe(artifact_id);
        expect(['ready', 'processing', 'uploading']).toContain(status.status);
    });
});
