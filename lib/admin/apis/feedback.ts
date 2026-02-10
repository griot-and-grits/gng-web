import { apiClient } from '../api-client';
import type {
    Feedback,
    FeedbackCreateRequest,
    FeedbackListResponse,
    FeedbackStatus,
    FeedbackStatusUpdateRequest,
    FeedbackType,
} from '../types';

export const feedbackApi = {
    async create(data: FeedbackCreateRequest): Promise<Feedback> {
        const response = await apiClient.post('/feedback/', data);
        return response.data;
    },

    async getById(feedbackId: string): Promise<Feedback> {
        const response = await apiClient.get(`/feedback/${feedbackId}`);
        return response.data;
    },

    async updateStatus(
        feedbackId: string,
        data: FeedbackStatusUpdateRequest,
    ): Promise<Feedback> {
        const response = await apiClient.patch(
            `/feedback/${feedbackId}/status`,
            data,
        );
        return response.data;
    },

    async list(params?: {
        status?: FeedbackStatus;
        feedback_type?: FeedbackType;
        limit?: number;
        skip?: number;
    }): Promise<FeedbackListResponse> {
        const response = await apiClient.get('/feedback/', { params });
        return response.data;
    },
};
