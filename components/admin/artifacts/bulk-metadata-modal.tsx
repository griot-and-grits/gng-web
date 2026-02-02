'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { X, Loader2, AlertCircle } from 'lucide-react';

import { artifactsApi } from '@/lib/admin/apis';
import type { BulkMetadataUpdateRequest } from '@/lib/admin/types';
import { getAPIErrorMessage } from '@/lib/admin/utils/error';

const bulkMetadataSchema = z.object({
    creator: z.string().optional(),
    rights: z.string().optional(),
    subject: z.string().optional(), // Will be split by commas
    creation_date: z.string().optional(),
    language: z.string().optional(), // Will be split by commas
    type: z.string().optional(),
});

type BulkMetadataFormValues = z.infer<typeof bulkMetadataSchema>;

interface BulkMetadataModalProps {
    artifactIds: string[];
    onClose: () => void;
    onSuccess: () => void;
}

export function BulkMetadataModal({ artifactIds, onClose, onSuccess }: BulkMetadataModalProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useForm<BulkMetadataFormValues>({
        resolver: zodResolver(bulkMetadataSchema),
        defaultValues: {
            creator: '',
            rights: '',
            subject: '',
            creation_date: '',
            language: '',
            type: '',
        },
    });

    const bulkUpdateMutation = useMutation({
        mutationFn: (request: BulkMetadataUpdateRequest) =>
            artifactsApi.bulkUpdateMetadata(request),
        onSuccess: () => {
            onSuccess();
        },
    });

    const onSubmit = (values: BulkMetadataFormValues) => {
        // Convert comma-separated strings to arrays and filter empty values
        const metadata_updates: Record<string, string | string[]> = {};

        if (values.creator?.trim()) metadata_updates.creator = values.creator.trim();
        if (values.rights?.trim()) metadata_updates.rights = values.rights.trim();
        if (values.creation_date?.trim())
            metadata_updates.creation_date = values.creation_date.trim();
        if (values.type?.trim()) metadata_updates.type = values.type.trim();

        if (values.subject?.trim()) {
            metadata_updates.subject = values.subject
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
        }

        if (values.language?.trim()) {
            metadata_updates.language = values.language
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
        }

        // Only proceed if at least one field has a value
        if (Object.keys(metadata_updates).length === 0) {
            form.setError('root', {
                type: 'manual',
                message: 'Please fill in at least one metadata field.',
            });
            return;
        }

        bulkUpdateMutation.mutate({
            artifact_ids: artifactIds,
            metadata_updates,
        });
    };

    const handleConfirm = () => {
        setShowConfirm(false);
        form.handleSubmit(onSubmit)();
    };

    const selectedCount = artifactIds.length;
    const formValues = form.watch();
    const hasChanges = Object.values(formValues).some((v) => v && v.trim().length > 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Apply Bulk Metadata
                        </h2>
                        <p className="text-sm text-slate-600">
                            Update shared metadata for {selectedCount} artifact
                            {selectedCount !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6 px-6 py-4">
                    <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
                        <div className="flex gap-2">
                            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
                            <div className="text-sm text-amber-800">
                                <p className="font-medium">Safe bulk update</p>
                                <p className="mt-1">
                                    Only shared metadata fields can be updated in bulk. Each
                                    artifact&apos;s unique fields (like title and description) must be
                                    updated individually.
                                </p>
                            </div>
                        </div>
                    </div>

                    {form.formState.errors.root && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                            {form.formState.errors.root.message}
                        </div>
                    )}

                    {bulkUpdateMutation.error && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                            {getAPIErrorMessage(bulkUpdateMutation.error)}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="creator"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Creator
                            </label>
                            <input
                                {...form.register('creator')}
                                type="text"
                                id="creator"
                                placeholder="e.g., John Doe, Archive Project"
                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                Person or organization who created the artifacts
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="rights"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Rights/License
                            </label>
                            <input
                                {...form.register('rights')}
                                type="text"
                                id="rights"
                                placeholder="e.g., CC BY-NC 4.0, Public Domain"
                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                License or rights information
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Subject/Tags
                            </label>
                            <input
                                {...form.register('subject')}
                                type="text"
                                id="subject"
                                placeholder="e.g., oral history, civil rights, 1960s"
                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                Comma-separated keywords or subjects
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="creation_date"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Creation Date
                            </label>
                            <input
                                {...form.register('creation_date')}
                                type="date"
                                id="creation_date"
                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                Date when the content was originally created
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="language"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Language
                            </label>
                            <input
                                {...form.register('language')}
                                type="text"
                                id="language"
                                placeholder="e.g., English, Spanish"
                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                Comma-separated languages
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Type
                            </label>
                            <select
                                {...form.register('type')}
                                id="type"
                                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                            >
                                <option value="">-- Select type --</option>
                                <option value="video">Video</option>
                                <option value="audio">Audio</option>
                                <option value="image">Image</option>
                                <option value="document">Document</option>
                                <option value="other">Other</option>
                            </select>
                            <p className="mt-1 text-xs text-slate-500">
                                Content type classification
                            </p>
                        </div>
                    </div>

                    {showConfirm && (
                        <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3">
                            <p className="text-sm font-medium text-blue-900">Confirm Update</p>
                            <p className="mt-1 text-sm text-blue-800">
                                You are about to update {selectedCount} artifact
                                {selectedCount !== 1 ? 's' : ''} with the metadata you entered. This
                                action cannot be undone.
                            </p>
                            <div className="mt-3 flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleConfirm}
                                    disabled={bulkUpdateMutation.isPending}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {bulkUpdateMutation.isPending ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Updating...
                                        </span>
                                    ) : (
                                        'Confirm Update'
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(false)}
                                    className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowConfirm(true)}
                        disabled={!hasChanges || bulkUpdateMutation.isPending}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        Apply Metadata
                    </button>
                </div>
            </div>
        </div>
    );
}
