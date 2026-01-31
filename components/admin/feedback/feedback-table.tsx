'use client';

import { Fragment, useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ChevronDown,
    ChevronRight,
    Flag,
    Loader2,
    MessageSquare,
    RefreshCw,
    User,
} from 'lucide-react';

import Link from 'next/link';

import { feedbackApi } from '@/lib/admin/apis';
import { FeedbackStatus, FeedbackType } from '@/lib/admin/types';
import type { Feedback } from '@/lib/admin/types';
import { formatDate } from '@/lib/admin/utils/formatters';
import { FeedbackStatusBadge } from '../shared/feedback-status-badge';
import { getAPIErrorMessage } from '@/lib/admin/utils/error';

const statusOptions = [
    { value: '', label: 'All statuses' },
    { value: FeedbackStatus.NEW, label: 'New' },
    { value: FeedbackStatus.REVIEWED, label: 'Reviewed' },
    { value: FeedbackStatus.RESOLVED, label: 'Resolved' },
    { value: FeedbackStatus.DISMISSED, label: 'Dismissed' },
];

const typeOptions = [
    { value: '', label: 'All types' },
    { value: FeedbackType.GRIOT_RESPONSE, label: 'Griot Response' },
    { value: FeedbackType.TRANSCRIPT_ACCURACY, label: 'Transcript' },
    { value: FeedbackType.CONTENT_ISSUE, label: 'Content Issue' },
    { value: FeedbackType.OTHER, label: 'Other' },
];

const statusUpdateOptions = [
    { value: FeedbackStatus.NEW, label: 'New' },
    { value: FeedbackStatus.REVIEWED, label: 'Reviewed' },
    { value: FeedbackStatus.RESOLVED, label: 'Resolved' },
    { value: FeedbackStatus.DISMISSED, label: 'Dismissed' },
];

const TYPE_LABELS: Record<string, string> = {
    [FeedbackType.GRIOT_RESPONSE]: 'Griot Response',
    [FeedbackType.TRANSCRIPT_ACCURACY]: 'Transcript',
    [FeedbackType.CONTENT_ISSUE]: 'Content Issue',
    [FeedbackType.OTHER]: 'Other',
};

export function FeedbackTable() {
    const [status, setStatus] = useState<string>('');
    const [feedbackType, setFeedbackType] = useState<string>('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const queryParams = useMemo(
        () => ({
            status: status ? (status as FeedbackStatus) : undefined,
            feedback_type: feedbackType ? (feedbackType as FeedbackType) : undefined,
            limit: 50,
        }),
        [status, feedbackType],
    );

    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['feedback', queryParams],
        queryFn: () => feedbackApi.list(queryParams),
    });

    const updateMutation = useMutation({
        mutationFn: ({
            feedbackId,
            newStatus,
        }: {
            feedbackId: string;
            newStatus: FeedbackStatus;
        }) =>
            feedbackApi.updateStatus(feedbackId, { status: newStatus }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedback'] });
        },
    });

    const handleStatusChange = (feedbackId: string, newStatus: FeedbackStatus) => {
        updateMutation.mutate({ feedbackId, newStatus });
    };

    const toggleExpand = (feedbackId: string) => {
        setExpandedId((prev) => (prev === feedbackId ? null : feedbackId));
    };

    const feedbackCount = data?.feedback?.length ?? 0;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Feedback</h2>
                    <p className="text-sm text-slate-600">
                        Review and manage user-submitted feedback and issue reports.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <select
                        value={feedbackType}
                        onChange={(event) => setFeedbackType(event.target.value)}
                        className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                        {typeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </button>
                </div>
            </div>

            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                    {getAPIErrorMessage(error)}
                </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="w-10 px-3 py-3" />
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Description
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Reporter
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Submitted
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Update Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {isLoading && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-4 py-12 text-center text-sm text-slate-500"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Loading feedback...
                                    </span>
                                </td>
                            </tr>
                        )}

                        {!isLoading &&
                            data?.feedback?.map((item: Feedback) => {
                                const isExpanded = expandedId === item.feedback_id;
                                const reporter = item.submitter_name || item.submitter_email || null;
                                return (
                                    <Fragment key={item.feedback_id}>
                                        <tr
                                            className={`transition-colors hover:bg-slate-50 ${isExpanded ? 'bg-slate-50' : ''}`}
                                        >
                                            <td className="px-3 py-3 align-middle">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleExpand(item.feedback_id)}
                                                    className="flex h-6 w-6 items-center justify-center rounded text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                                                >
                                                    {isExpanded ? (
                                                        <ChevronDown className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-4 py-3 align-middle">
                                                <span className="text-sm font-medium text-slate-700">
                                                    {TYPE_LABELS[item.feedback_type] ?? item.feedback_type}
                                                </span>
                                            </td>
                                            <td
                                                className="max-w-sm cursor-pointer truncate px-4 py-3 align-middle text-sm text-slate-600"
                                                onClick={() => toggleExpand(item.feedback_id)}
                                                title={item.description}
                                            >
                                                {item.description}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 align-middle text-sm text-slate-600">
                                                {reporter ?? <span className="text-slate-400">—</span>}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 align-middle">
                                                <FeedbackStatusBadge status={item.status} />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 align-middle text-sm text-slate-500">
                                                {formatDate(item.created_at)}
                                            </td>
                                            <td className="px-4 py-3 align-middle text-right">
                                                <select
                                                    value={item.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            item.feedback_id,
                                                            e.target.value as FeedbackStatus,
                                                        )
                                                    }
                                                    className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-200"
                                                >
                                                    {statusUpdateOptions.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr>
                                                <td colSpan={7} className="border-t border-slate-100 bg-slate-50 px-4 py-4">
                                                    <div className="ml-10 space-y-4">
                                                        {/* Description card (with content link above if present) */}
                                                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                                                            {item.artifact_title && (
                                                                <div className="mb-3 pb-3 border-b border-slate-100">
                                                                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                                        Related Content
                                                                    </h4>
                                                                    {item.artifact_id ? (
                                                                        <Link
                                                                            href={`/admin/artifacts/${item.artifact_id}`}
                                                                            className="text-sm font-semibold text-slate-900 hover:underline"
                                                                        >
                                                                            {item.artifact_title}
                                                                        </Link>
                                                                    ) : (
                                                                        <p className="text-sm font-medium text-slate-900">{item.artifact_title}</p>
                                                                    )}
                                                                </div>
                                                            )}
                                                            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                                Full Description
                                                            </h4>
                                                            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                                                                {item.description}
                                                            </p>
                                                        </div>

                                                        {/* Griot response */}
                                                        {item.chat_assistant_message && (
                                                            <div className="rounded-lg border border-slate-200 bg-white p-4">
                                                                <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                                    <MessageSquare className="h-3.5 w-3.5" />
                                                                    Griot Response
                                                                </h4>
                                                                {item.chat_user_message && (
                                                                    <div className="mb-3 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-600">
                                                                        <span className="font-medium text-slate-500">User asked: </span>
                                                                        {item.chat_user_message}
                                                                    </div>
                                                                )}
                                                                <p className="text-sm leading-relaxed text-slate-700 line-clamp-5 whitespace-pre-wrap">
                                                                    {item.chat_assistant_message}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Admin notes */}
                                                        {item.admin_notes && (
                                                            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                                                <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
                                                                    <Flag className="h-3.5 w-3.5" />
                                                                    Admin Notes
                                                                </h4>
                                                                <p className="text-sm leading-relaxed text-amber-900 whitespace-pre-wrap">
                                                                    {item.admin_notes}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })}

                        {!isLoading && feedbackCount === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-4 py-12 text-center"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <Flag className="h-8 w-8 text-slate-300" />
                                        <p className="text-sm font-medium text-slate-600">No feedback found</p>
                                        <p className="text-xs text-slate-400">
                                            Try adjusting your filters to see more results.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">
                    {!isLoading && feedbackCount > 0 && (
                        <span>
                            Showing {feedbackCount} {feedbackCount === 1 ? 'entry' : 'entries'}
                        </span>
                    )}
                </div>
                {isFetching && !isLoading && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Refreshing…
                    </div>
                )}
            </div>
        </div>
    );
}
