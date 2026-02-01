'use client';

import { useEffect, useMemo, useState } from 'react';
import {
    useQuery,
    useQueries,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import {
    ExternalLink,
    Eye,
    Flag,
    Loader2,
    MessageSquare,
    RefreshCw,
    Search,
    X,
} from 'lucide-react';
import Link from 'next/link';

import { feedbackApi } from '@/lib/admin/apis';
import { FeedbackStatus, FeedbackType } from '@/lib/admin/types';
import type { Feedback } from '@/lib/admin/types';
import { formatDate } from '@/lib/admin/utils/formatters';
import { FeedbackStatusBadge } from '../shared/feedback-status-badge';
import { getAPIErrorMessage } from '@/lib/admin/utils/error';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PAGE_SIZE = 25;

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

const STAT_CARDS: {
    status: FeedbackStatus;
    label: string;
    borderColor: string;
    ringColor: string;
    bgColor: string;
}[] = [
    {
        status: FeedbackStatus.NEW,
        label: 'New',
        borderColor: 'border-l-blue-500',
        ringColor: 'ring-blue-300',
        bgColor: 'bg-blue-50',
    },
    {
        status: FeedbackStatus.REVIEWED,
        label: 'Reviewed',
        borderColor: 'border-l-yellow-500',
        ringColor: 'ring-yellow-300',
        bgColor: 'bg-yellow-50',
    },
    {
        status: FeedbackStatus.RESOLVED,
        label: 'Resolved',
        borderColor: 'border-l-green-500',
        ringColor: 'ring-green-300',
        bgColor: 'bg-green-50',
    },
    {
        status: FeedbackStatus.DISMISSED,
        label: 'Dismissed',
        borderColor: 'border-l-slate-400',
        ringColor: 'ring-slate-300',
        bgColor: 'bg-slate-50',
    },
];

// ---------------------------------------------------------------------------
// useDebounce
// ---------------------------------------------------------------------------

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

// ---------------------------------------------------------------------------
// StatCard
// ---------------------------------------------------------------------------

function StatCard({
    label,
    count,
    isLoading,
    isActive,
    borderColor,
    ringColor,
    bgColor,
    onClick,
}: {
    label: string;
    count: number;
    isLoading: boolean;
    isActive: boolean;
    borderColor: string;
    ringColor: string;
    bgColor: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 rounded-lg border border-l-4 ${borderColor} border-slate-200 bg-white px-4 py-3 text-left transition hover:shadow-sm ${
                isActive ? `ring-2 ${ringColor} ${bgColor}` : ''
            }`}
        >
            <div className="text-2xl font-bold text-slate-900">
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                ) : (
                    count
                )}
            </div>
            <div className="text-xs font-medium text-slate-500">{label}</div>
        </button>
    );
}

// ---------------------------------------------------------------------------
// FeedbackDetailDialog
// ---------------------------------------------------------------------------

function FeedbackDetailDialog({
    feedback,
    open,
    onOpenChange,
}: {
    feedback: Feedback | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const queryClient = useQueryClient();
    const [editingStatus, setEditingStatus] = useState<FeedbackStatus>(
        FeedbackStatus.NEW,
    );
    const [editingNotes, setEditingNotes] = useState('');

    useEffect(() => {
        if (feedback) {
            setEditingStatus(feedback.status);
            setEditingNotes(feedback.admin_notes ?? '');
        }
    }, [feedback]);

    const updateMutation = useMutation({
        mutationFn: () =>
            feedbackApi.updateStatus(feedback!.feedback_id, {
                status: editingStatus,
                admin_notes: editingNotes,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedback'] });
            queryClient.invalidateQueries({ queryKey: ['feedback-count'] });
            onOpenChange(false);
        },
    });

    if (!feedback) return null;

    const reporter =
        feedback.submitter_name || feedback.submitter_email || null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <span>
                            {TYPE_LABELS[feedback.feedback_type] ??
                                feedback.feedback_type}
                        </span>
                        <FeedbackStatusBadge status={feedback.status} />
                    </DialogTitle>
                    <DialogDescription>
                        Submitted {formatDate(feedback.created_at)}
                        {reporter && ` by ${reporter}`}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    {/* Reporter info */}
                    {(feedback.submitter_name || feedback.submitter_email) && (
                        <div>
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Reporter
                            </h4>
                            <p className="text-sm text-slate-700">
                                {feedback.submitter_name && (
                                    <span className="font-medium">
                                        {feedback.submitter_name}
                                    </span>
                                )}
                                {feedback.submitter_name &&
                                    feedback.submitter_email &&
                                    ' — '}
                                {feedback.submitter_email && (
                                    <span className="text-slate-500">
                                        {feedback.submitter_email}
                                    </span>
                                )}
                            </p>
                        </div>
                    )}

                    {/* Related content */}
                    {feedback.artifact_title && (
                        <div>
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Related Content
                            </h4>
                            {feedback.artifact_id ? (
                                <Link
                                    href={`/admin/artifacts/${feedback.artifact_id}`}
                                    className="text-sm font-semibold text-slate-900 hover:underline"
                                >
                                    {feedback.artifact_title}
                                </Link>
                            ) : (
                                <p className="text-sm font-medium text-slate-900">
                                    {feedback.artifact_title}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Full description */}
                    <div>
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Description
                        </h4>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                            {feedback.description}
                        </p>
                    </div>

                    {/* Griot response */}
                    {feedback.chat_assistant_message && (
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                <MessageSquare className="h-3.5 w-3.5" />
                                Griot Response
                            </h4>
                            {feedback.chat_user_message && (
                                <div className="mb-3 rounded-md bg-white px-3 py-2 text-sm text-slate-600">
                                    <span className="font-medium text-slate-500">
                                        User asked:{' '}
                                    </span>
                                    {feedback.chat_user_message}
                                </div>
                            )}
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                                {feedback.chat_assistant_message}
                            </p>
                        </div>
                    )}

                    {/* Admin notes */}
                    <div>
                        <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <Flag className="h-3.5 w-3.5" />
                            Admin Notes
                        </h4>
                        <textarea
                            value={editingNotes}
                            onChange={(e) => setEditingNotes(e.target.value)}
                            placeholder="Add internal notes about this feedback..."
                            rows={3}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        />
                    </div>
                </div>

                <DialogFooter className="flex items-center gap-3 sm:justify-between">
                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="dialog-status"
                            className="text-sm font-medium text-slate-700"
                        >
                            Status
                        </label>
                        <select
                            id="dialog-status"
                            value={editingStatus}
                            onChange={(e) =>
                                setEditingStatus(
                                    e.target.value as FeedbackStatus,
                                )
                            }
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-200"
                        >
                            {statusUpdateOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={() => updateMutation.mutate()}
                        disabled={updateMutation.isPending}
                        className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                    >
                        {updateMutation.isPending && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        Save Changes
                    </button>
                </DialogFooter>

                {updateMutation.isError && (
                    <p className="text-sm text-red-600">
                        {getAPIErrorMessage(updateMutation.error)}
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}

// ---------------------------------------------------------------------------
// FeedbackTable (main export)
// ---------------------------------------------------------------------------

export function FeedbackTable() {
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
        null,
    );

    const debouncedSearch = useDebounce(searchQuery, 300);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [statusFilter, typeFilter, debouncedSearch]);

    // --- Stat count queries (4 parallel) ---
    const statResults = useQueries({
        queries: STAT_CARDS.map((card) => ({
            queryKey: ['feedback-count', card.status],
            queryFn: () => feedbackApi.list({ status: card.status, limit: 1 }),
            staleTime: 30000,
        })),
    });

    // --- Main list query ---
    const queryParams = useMemo(
        () => ({
            status: statusFilter
                ? (statusFilter as FeedbackStatus)
                : undefined,
            feedback_type: typeFilter
                ? (typeFilter as FeedbackType)
                : undefined,
            limit: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
        }),
        [statusFilter, typeFilter, page],
    );

    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['feedback', queryParams],
        queryFn: () => feedbackApi.list(queryParams),
    });

    // --- Client-side search filter ---
    const filteredFeedback = useMemo(() => {
        const items = data?.feedback ?? [];
        if (!debouncedSearch) return items;
        const q = debouncedSearch.toLowerCase();
        return items.filter(
            (item) =>
                item.description?.toLowerCase().includes(q) ||
                item.submitter_name?.toLowerCase().includes(q) ||
                item.submitter_email?.toLowerCase().includes(q) ||
                item.artifact_title?.toLowerCase().includes(q),
        );
    }, [data?.feedback, debouncedSearch]);

    const total = data?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const showingFrom = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
    const showingTo = Math.min(page * PAGE_SIZE, total);
    const hasActiveFilters = statusFilter || typeFilter || searchQuery;

    const clearFilters = () => {
        setStatusFilter('');
        setTypeFilter('');
        setSearchQuery('');
    };

    const handleStatCardClick = (status: string) => {
        setStatusFilter((prev) => (prev === status ? '' : status));
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-slate-900">
                    Feedback
                </h2>
                <p className="text-sm text-slate-600">
                    Review and manage user-submitted feedback and issue reports.
                </p>
            </div>

            {/* A. Summary Stats Bar */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {STAT_CARDS.map((card, i) => (
                    <StatCard
                        key={card.status}
                        label={card.label}
                        count={statResults[i].data?.total ?? 0}
                        isLoading={statResults[i].isLoading}
                        isActive={statusFilter === card.status}
                        borderColor={card.borderColor}
                        ringColor={card.ringColor}
                        bgColor={card.bgColor}
                        onClick={() => handleStatCardClick(card.status)}
                    />
                ))}
            </div>

            {/* B. Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search feedback..."
                            className="rounded-md border border-slate-200 py-2 pl-8 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        />
                    </div>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                        {typeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                        >
                            <X className="h-3.5 w-3.5" />
                            Clear filters
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        <RefreshCw
                            className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`}
                        />
                        Refresh
                    </button>
                    {!isLoading && total > 0 && (
                        <span className="text-xs text-slate-500">
                            Showing {showingFrom}&ndash;{showingTo} of {total}
                        </span>
                    )}
                </div>
            </div>

            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                    {getAPIErrorMessage(error)}
                </div>
            )}

            {/* C. Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
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
                                Date
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {isLoading && (
                            <tr>
                                <td
                                    colSpan={6}
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
                            filteredFeedback.map((item: Feedback) => {
                                const reporter =
                                    item.submitter_name ||
                                    item.submitter_email ||
                                    null;
                                return (
                                    <tr
                                        key={item.feedback_id}
                                        className="transition-colors hover:bg-slate-50"
                                    >
                                        <td className="px-4 py-3 align-middle">
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                                                {item.status ===
                                                    FeedbackStatus.NEW && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                                                )}
                                                {TYPE_LABELS[
                                                    item.feedback_type
                                                ] ?? item.feedback_type}
                                            </span>
                                        </td>
                                        <td
                                            className="max-w-xs truncate px-4 py-3 align-middle text-sm text-slate-600"
                                            title={item.description}
                                        >
                                            <div className="flex items-center gap-2">
                                                {item.artifact_id && (
                                                    <Link
                                                        href={`/admin/artifacts/${item.artifact_id}`}
                                                        title={item.artifact_title ?? 'View artifact'}
                                                        className="flex-shrink-0 text-slate-400 transition hover:text-slate-700"
                                                    >
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                    </Link>
                                                )}
                                                <span className="truncate">
                                                    {item.description}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 align-middle text-sm text-slate-600">
                                            {reporter ?? (
                                                <span className="text-slate-400">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 align-middle">
                                            <FeedbackStatusBadge
                                                status={item.status}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 align-middle text-sm text-slate-500">
                                            {formatDate(item.created_at)}
                                        </td>
                                        <td className="px-4 py-3 align-middle text-right">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedFeedback(
                                                        item,
                                                    )
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}

                        {!isLoading && filteredFeedback.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-12 text-center"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <Flag className="h-8 w-8 text-slate-300" />
                                        <p className="text-sm font-medium text-slate-600">
                                            No feedback found
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Try adjusting your filters to see
                                            more results.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* E. Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-slate-600">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        type="button"
                        onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page >= totalPages}
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Refreshing indicator */}
            {isFetching && !isLoading && (
                <div className="flex items-center justify-end gap-2 text-xs text-slate-500">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Refreshing…
                </div>
            )}

            {/* D. Detail Dialog */}
            <FeedbackDetailDialog
                feedback={selectedFeedback}
                open={selectedFeedback !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedFeedback(null);
                }}
            />
        </div>
    );
}
