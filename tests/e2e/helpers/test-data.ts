/**
 * Helpers for generating unique test data.
 */

let counter = 0;

function uniqueSuffix(): string {
    counter += 1;
    return `${Date.now()}-${counter}`;
}

export function sampleMetadata() {
    const suffix = uniqueSuffix();
    return {
        title: `Test Artifact ${suffix}`,
        description: `Automated test artifact created at ${new Date().toISOString()}`,
        creator: `E2E Test Suite`,
        creation_date: '2024-06-15',
    };
}

export function createTestFile(content?: string): Buffer {
    const text = content || `Test file content generated at ${new Date().toISOString()}`;
    return Buffer.from(text, 'utf-8');
}
