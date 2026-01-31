import { ArtifactStatus, FeedbackStatus, FeedbackType } from './types';

const STATUS_STYLES: Record<
    ArtifactStatus,
    { label: string; className: string; dotClassName: string }
> = {
    [ArtifactStatus.UPLOADING]: {
        label: 'Uploading',
        className: 'bg-blue-100 text-blue-800',
        dotClassName: 'bg-blue-500',
    },
    [ArtifactStatus.PROCESSING]: {
        label: 'Processing',
        className: 'bg-yellow-100 text-yellow-800',
        dotClassName: 'bg-yellow-500',
    },
    [ArtifactStatus.READY]: {
        label: 'Ready',
        className: 'bg-green-100 text-green-800',
        dotClassName: 'bg-green-500',
    },
    [ArtifactStatus.FAILED]: {
        label: 'Failed',
        className: 'bg-red-100 text-red-800',
        dotClassName: 'bg-red-500',
    },
    [ArtifactStatus.ARCHIVED]: {
        label: 'Archived',
        className: 'bg-purple-100 text-purple-800',
        dotClassName: 'bg-purple-500',
    },
};

export const getArtifactStatusStyle = (
    status: ArtifactStatus,
): { label: string; className: string; dotClassName: string } =>
    STATUS_STYLES[status] ??
    STATUS_STYLES[ArtifactStatus.PROCESSING];

const FEEDBACK_STATUS_STYLES: Record<
    FeedbackStatus,
    { label: string; className: string; dotClassName: string }
> = {
    [FeedbackStatus.NEW]: {
        label: 'New',
        className: 'bg-blue-100 text-blue-800',
        dotClassName: 'bg-blue-500',
    },
    [FeedbackStatus.REVIEWED]: {
        label: 'Reviewed',
        className: 'bg-yellow-100 text-yellow-800',
        dotClassName: 'bg-yellow-500',
    },
    [FeedbackStatus.RESOLVED]: {
        label: 'Resolved',
        className: 'bg-green-100 text-green-800',
        dotClassName: 'bg-green-500',
    },
    [FeedbackStatus.DISMISSED]: {
        label: 'Dismissed',
        className: 'bg-slate-100 text-slate-800',
        dotClassName: 'bg-slate-500',
    },
};

export const getFeedbackStatusStyle = (
    status: FeedbackStatus,
): { label: string; className: string; dotClassName: string } =>
    FEEDBACK_STATUS_STYLES[status] ??
    FEEDBACK_STATUS_STYLES[FeedbackStatus.NEW];

const FEEDBACK_TYPE_STYLES: Record<
    FeedbackType,
    { label: string; className: string; dotClassName: string }
> = {
    [FeedbackType.TRANSCRIPT_ACCURACY]: {
        label: 'Transcript',
        className: 'bg-purple-100 text-purple-800',
        dotClassName: 'bg-purple-500',
    },
    [FeedbackType.GRIOT_RESPONSE]: {
        label: 'Griot Response',
        className: 'bg-amber-100 text-amber-800',
        dotClassName: 'bg-amber-500',
    },
    [FeedbackType.CONTENT_ISSUE]: {
        label: 'Content Issue',
        className: 'bg-red-100 text-red-800',
        dotClassName: 'bg-red-500',
    },
    [FeedbackType.OTHER]: {
        label: 'Other',
        className: 'bg-slate-100 text-slate-800',
        dotClassName: 'bg-slate-500',
    },
};

export const getFeedbackTypeStyle = (
    type: FeedbackType,
): { label: string; className: string; dotClassName: string } =>
    FEEDBACK_TYPE_STYLES[type] ??
    FEEDBACK_TYPE_STYLES[FeedbackType.OTHER];
