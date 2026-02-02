'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Loader2, RefreshCw, CheckCircle, Edit } from 'lucide-react';

import { artifactsApi, collectionsApi } from '@/lib/admin/apis';
import { formatDate, formatFileSize } from '@/lib/admin/utils/formatters';
import { ArtifactStatusBadge } from '../shared/artifact-status-badge';
import { getAPIErrorMessage } from '@/lib/admin/utils/error';
import { BulkMetadataModal } from './bulk-metadata-modal';

export function PendingArtifactsTable() {
    const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([]);
    const [collectionFilter, setCollectionFilter] = useState('');
    const [showBulkModal, setShowBulkModal] = useState(false);

    const queryClient = useQueryClient();

    // Fetch draft artifacts
    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['artifacts', 'drafts', collectionFilter],
        queryFn: () =>
            artifactsApi.listDrafts({
                collection_id: collectionFilter || undefined,
                limit: 50,
            }),
    });

    // Fetch collections for filter dropdown
    const { data: collectionsData } = useQuery({
        queryKey: ['collections'],
        queryFn: () => collectionsApi.list({ limit: 100 }),
    });

    // Approve mutation
    const approveMutation = useMutation({
        mutationFn: (artifactId: string) => artifactsApi.approve(artifactId, 'admin'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['artifacts', 'drafts'] });
            queryClient.invalidateQueries({ queryKey: ['collections'] });
            // Remove from selected if it was selected
            setSelectedArtifacts((prev) => prev.filter((id) => id !== approveMutation.variables));
        },
    });

    const handleSelectAll = () => {
        if (selectedArtifacts.length === data?.artifacts.length) {
            setSelectedArtifacts([]);
        } else {
            setSelectedArtifacts(data?.artifacts.map((a) => a.artifact_id) || []);
        }
    };

    const handleSelectArtifact = (artifactId: string) => {
        setSelectedArtifacts((prev) =>
            prev.includes(artifactId)
                ? prev.filter((id) => id !== artifactId)
                : [...prev, artifactId]
        );
    };

    const handleBulkMetadataSuccess = () => {
        setShowBulkModal(false);
        setSelectedArtifacts([]);
        refetch();
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Pending Artifacts</h2>
                    <p className="text-sm text-slate-600">
                        Review and approve artifacts uploaded via Globus bulk upload.
                        {data?.pending_count ? (
                            <span className="ml-1 font-semibold text-amber-600">
                                ({data.pending_count} pending)
                            </span>
                        ) : null}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={collectionFilter}
                        onChange={(e) => setCollectionFilter(e.target.value)}
                        className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                        <option value="">All collections</option>
                        {collectionsData?.collections?.map((c) => (
                            <option key={c.collection_id} value={c.collection_id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                        <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>

            {selectedArtifacts.length > 0 && (
                <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
                    <p className="text-sm font-medium text-blue-900">
                        {selectedArtifacts.length} artifact{selectedArtifacts.length !== 1 ? 's' : ''}{' '}
                        selected
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowBulkModal(true)}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Apply Bulk Metadata
                    </button>
                </div>
            )}

            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                    {getAPIErrorMessage(error)}
                </div>
            )}

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                </div>
            ) : data?.artifacts.length === 0 ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-12 text-center">
                    <p className="text-sm text-slate-600">
                        {collectionFilter
                            ? 'No pending artifacts in this collection.'
                            : 'No pending artifacts. All artifacts have been approved!'}
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={
                                            data?.artifacts.length > 0 &&
                                            selectedArtifacts.length === data?.artifacts.length
                                        }
                                        onChange={handleSelectAll}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Title
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Collection
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Type
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Size
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {data?.artifacts.map((artifact) => {
                                const collection = collectionsData?.collections?.find(
                                    (c) => c.collection_id === artifact.collection_id
                                );

                                return (
                                    <tr key={artifact.artifact_id} className="hover:bg-slate-50">
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedArtifacts.includes(
                                                    artifact.artifact_id
                                                )}
                                                onChange={() =>
                                                    handleSelectArtifact(artifact.artifact_id)
                                                }
                                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link
                                                href={`/admin/artifacts/${artifact.artifact_id}`}
                                                className="text-sm font-medium text-blue-600 hover:underline"
                                            >
                                                {artifact.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            {collection ? (
                                                <Link
                                                    href={`/admin/collections/${collection.collection_id}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {collection.title}
                                                </Link>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            {artifact.type || '—'}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-600">
                                            {artifact.size_bytes
                                                ? formatFileSize(artifact.size_bytes)
                                                : '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <ArtifactStatusBadge status={artifact.status} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/artifacts/${artifact.artifact_id}`}
                                                    className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    <Edit className="h-3 w-3" />
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        approveMutation.mutate(artifact.artifact_id)
                                                    }
                                                    disabled={approveMutation.isPending}
                                                    className="inline-flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
                                                >
                                                    {approveMutation.isPending &&
                                                    approveMutation.variables ===
                                                        artifact.artifact_id ? (
                                                        <Loader2 className="h-3 w-3 animate-spin" />
                                                    ) : (
                                                        <CheckCircle className="h-3 w-3" />
                                                    )}
                                                    Approve
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {showBulkModal && (
                <BulkMetadataModal
                    artifactIds={selectedArtifacts}
                    onClose={() => setShowBulkModal(false)}
                    onSuccess={handleBulkMetadataSuccess}
                />
            )}
        </div>
    );
}
