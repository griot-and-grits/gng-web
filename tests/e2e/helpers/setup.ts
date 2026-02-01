/**
 * Global setup — verifies backend and frontend are reachable before tests run.
 */

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

async function waitForService(url: string, label: string, retries = 30, intervalMs = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                console.log(`  [setup] ${label} is ready at ${url}`);
                return;
            }
        } catch {
            // service not ready yet
        }
        if (i < retries - 1) {
            await new Promise((r) => setTimeout(r, intervalMs));
        }
    }
    throw new Error(`${label} at ${url} did not become ready after ${retries} attempts`);
}

export default async function globalSetup() {
    console.log('[setup] Waiting for services...');
    await waitForService(`${BACKEND_URL}/health`, 'Backend');
    await waitForService(FRONTEND_URL, 'Frontend');
    console.log('[setup] All services ready.');
}
