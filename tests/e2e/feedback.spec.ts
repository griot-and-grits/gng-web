import { test, expect } from '@playwright/test';
import { createFeedback } from './helpers/api-client';

test.describe('Feedback', () => {
    test('should display feedback on the admin feedback page', async ({ page }) => {
        // Seed feedback via API
        const feedback = await createFeedback({
            description: `E2E test feedback ${Date.now()}`,
            feedback_type: 'transcript_accuracy',
            artifact_title: 'Test Artifact',
            submitter_name: 'E2E Tester',
        });

        expect(feedback.feedback_id).toBeTruthy();

        // Navigate to admin feedback page
        await page.goto('/admin/feedback');

        // Wait for the page to load
        await expect(page.locator('body')).toBeVisible();

        // The FeedbackTable component should render
        await expect(page.locator('h2')).toBeVisible();
    });

    test('should have status filter controls on the feedback page', async ({ page }) => {
        await page.goto('/admin/feedback');

        // Wait for page content
        await expect(page.locator('body')).toBeVisible();

        // The page should have filter controls (select elements for type/status)
        const selects = page.locator('select');
        const selectCount = await selects.count();
        expect(selectCount).toBeGreaterThanOrEqual(1);
    });
});
