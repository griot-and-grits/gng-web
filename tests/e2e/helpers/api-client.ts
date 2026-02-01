/**
 * Lightweight API client for seeding test data via the backend REST API.
 * Used by Playwright tests to create artifacts/feedback before exercising the UI.
 */

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

async function request(path: string, options?: RequestInit) {
    const url = `${BACKEND_URL}${path}`;
    const response = await fetch(url, options);
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`API ${options?.method || 'GET'} ${path} failed (${response.status}): ${text}`);
    }
    return response.json();
}

export async function healthCheck(): Promise<{ status: string }> {
    return request('/health');
}

export async function ingestArtifact(
    fileContent: Buffer | Uint8Array,
    metadata: {
        title: string;
        description: string;
        creator: string;
        creation_date: string;
    },
    filename = 'test-file.txt',
): Promise<{ artifact_id: string; status: string }> {
    const formData = new FormData();
    const blob = new Blob([fileContent], { type: 'text/plain' });
    formData.append('file', blob, filename);
    formData.append('metadata', JSON.stringify(metadata));

    return request('/artifacts/ingest', {
        method: 'POST',
        body: formData,
    });
}

export async function getArtifactStatus(
    artifactId: string,
): Promise<{ artifact_id: string; status: string }> {
    return request(`/artifacts/${artifactId}/status`);
}

export async function getArtifact(artifactId: string): Promise<Record<string, unknown>> {
    return request(`/artifacts/${artifactId}`);
}

export async function listArtifacts(params?: {
    limit?: number;
    skip?: number;
    status?: string;
}): Promise<{ artifacts: Record<string, unknown>[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.skip) searchParams.set('skip', String(params.skip));
    if (params?.status) searchParams.set('status', params.status);
    const qs = searchParams.toString();
    return request(`/artifacts/${qs ? `?${qs}` : ''}`);
}

export async function createFeedback(body: {
    description: string;
    feedback_type: string;
    artifact_id?: string;
    artifact_title?: string;
    submitter_name?: string;
}): Promise<{ feedback_id: string; status: string }> {
    return request('/feedback/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
}

export async function listFeedback(params?: {
    limit?: number;
    skip?: number;
    status?: string;
    feedback_type?: string;
}): Promise<{ feedback: Record<string, unknown>[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.skip) searchParams.set('skip', String(params.skip));
    if (params?.status) searchParams.set('status', params.status);
    if (params?.feedback_type) searchParams.set('feedback_type', params.feedback_type);
    const qs = searchParams.toString();
    return request(`/feedback/${qs ? `?${qs}` : ''}`);
}
