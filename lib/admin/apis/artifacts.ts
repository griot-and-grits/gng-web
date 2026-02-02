import { apiClient } from '../api-client';
import type { AxiosProgressEvent } from 'axios';
import type {
    Artifact,
    ArtifactListResponse,
    ArtifactStatus,
    ArtifactStatusResponse,
    IngestionMetadata,
    IngestionResponse,
    DraftArtifactListResponse,
    BulkMetadataUpdateRequest,
    BulkMetadataUpdateResponse,
} from '../types';

type IngestOptions = {
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
    timeoutMs?: number;
    collectionId?: string;  // NEW: Optional collection to link artifact to
};

export const artifactsApi = {
    async ingest(
        file: File,
        metadata: IngestionMetadata,
        options?: IngestOptions,
    ): Promise<IngestionResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('metadata', JSON.stringify(metadata));

        // NEW: Add collection_id if provided
        if (options?.collectionId) {
            formData.append('collection_id', options.collectionId);
        }

        const response = await apiClient.post('/artifacts/ingest', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: options?.timeoutMs ?? 300_000,
            onUploadProgress: options?.onUploadProgress,
        });

        return response.data;
    },

    async getStatus(artifactId: string): Promise<ArtifactStatusResponse> {
        const response = await apiClient.get(`/artifacts/${artifactId}/status`);
        return response.data;
    },

    async getById(artifactId: string): Promise<Artifact> {
        const response = await apiClient.get(`/artifacts/${artifactId}`);
        return response.data;
    },

    async list(params?: {
        status?: ArtifactStatus;
        type?: string;
        limit?: number;
        skip?: number;
    }): Promise<ArtifactListResponse> {
        const response = await apiClient.get('/artifacts', { params });
        return response.data;
    },

    // NEW: List draft artifacts
    async listDrafts(params?: {
        collection_id?: string;
        limit?: number;
        skip?: number;
    }): Promise<DraftArtifactListResponse> {
        const response = await apiClient.get('/artifacts/drafts', { params });
        return response.data;
    },

    // NEW: Approve draft artifact
    async approve(artifactId: string, approvedBy: string): Promise<Artifact> {
        const response = await apiClient.post(`/artifacts/${artifactId}/approve`, {
            approved_by: approvedBy,
        });
        return response.data;
    },

    // NEW: Bulk update metadata
    async bulkUpdateMetadata(
        request: BulkMetadataUpdateRequest,
    ): Promise<BulkMetadataUpdateResponse> {
        const response = await apiClient.post('/artifacts/bulk-metadata', request);
        return response.data;
    },
};
