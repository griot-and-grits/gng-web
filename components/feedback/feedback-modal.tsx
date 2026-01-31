"use client"

import React, { useState } from 'react';
import { CheckCircle2, Flag, Loader2, MessageSquare, FileText, AlertTriangle, HelpCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { feedbackApi } from '@/lib/admin/apis/feedback';
import { FeedbackType } from '@/lib/admin/types';

const FEEDBACK_TYPE_OPTIONS = [
    { value: FeedbackType.GRIOT_RESPONSE, label: 'Griot Response', icon: MessageSquare },
    { value: FeedbackType.TRANSCRIPT_ACCURACY, label: 'Transcript', icon: FileText },
    { value: FeedbackType.CONTENT_ISSUE, label: 'Content Issue', icon: AlertTriangle },
    { value: FeedbackType.OTHER, label: 'Other', icon: HelpCircle },
];

interface FeedbackModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultType?: FeedbackType;
    artifactId?: string;
    artifactTitle?: string;
    chatUserMessage?: string;
    chatAssistantMessage?: string;
}

export function FeedbackModal({
    open,
    onOpenChange,
    defaultType = FeedbackType.OTHER,
    artifactId,
    artifactTitle,
    chatUserMessage,
    chatAssistantMessage,
}: FeedbackModalProps) {
    const [feedbackType, setFeedbackType] = useState<FeedbackType>(defaultType);
    const [description, setDescription] = useState('');
    const [submitterName, setSubmitterName] = useState('');
    const [submitterEmail, setSubmitterEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    React.useEffect(() => {
        if (open) {
            setFeedbackType(defaultType);
            setDescription('');
            setSubmitterName('');
            setSubmitterEmail('');
            setError(null);
            setSuccess(false);
        }
    }, [open, defaultType]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await feedbackApi.create({
                description: description.trim(),
                feedback_type: feedbackType,
                artifact_id: artifactId,
                artifact_title: artifactTitle,
                chat_user_message: chatUserMessage,
                chat_assistant_message: chatAssistantMessage,
                submitter_name: submitterName.trim() || undefined,
                submitter_email: submitterEmail.trim() || undefined,
            });
            setSuccess(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to submit feedback. Please try again.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
                {/* Header */}
                <div className="bg-muted/50 px-6 pt-6 pb-4 border-b border-border">
                    <DialogHeader className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#a94728] flex items-center justify-center flex-shrink-0">
                                <Flag className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold">Report an Issue</DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">
                                    Help us improve by reporting inaccuracies or issues.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                {success ? (
                    <div className="px-6 py-10 flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">Thank you!</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Your report has been submitted and will be reviewed by our team.
                        </p>
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
                        {/* Context preview */}
                        {chatAssistantMessage && (
                            <div className="rounded-lg border border-border bg-muted/40 p-3">
                                <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Griot Response</p>
                                <p className="text-sm text-foreground line-clamp-3 leading-relaxed">{chatAssistantMessage}</p>
                            </div>
                        )}
                        {artifactTitle && !chatAssistantMessage && (
                            <div className="rounded-lg border border-border bg-muted/40 p-3">
                                <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Content</p>
                                <p className="text-sm text-foreground leading-relaxed">{artifactTitle}</p>
                            </div>
                        )}

                        {/* Issue type - pill buttons */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Issue type
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {FEEDBACK_TYPE_OPTIONS.map((opt) => {
                                    const Icon = opt.icon;
                                    const isSelected = feedbackType === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setFeedbackType(opt.value)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                    : 'bg-card text-foreground border-border hover:bg-accent'
                                            }`}
                                        >
                                            <Icon className="w-3.5 h-3.5" />
                                            {opt.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="feedback-description"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Description <span className="text-[#a94728]">*</span>
                            </label>
                            <textarea
                                id="feedback-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the issue you noticed..."
                                rows={3}
                                required
                                maxLength={2000}
                                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                            />
                        </div>

                        {/* Name and Email side by side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="feedback-name"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    Name <span className="text-muted-foreground font-normal">(optional)</span>
                                </label>
                                <input
                                    id="feedback-name"
                                    type="text"
                                    value={submitterName}
                                    onChange={(e) => setSubmitterName(e.target.value)}
                                    placeholder="Your name"
                                    maxLength={200}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="feedback-email"
                                    className="block text-sm font-medium text-foreground mb-2"
                                >
                                    Email <span className="text-muted-foreground font-normal">(optional)</span>
                                </label>
                                <input
                                    id="feedback-email"
                                    type="email"
                                    value={submitterEmail}
                                    onChange={(e) => setSubmitterEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    maxLength={200}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                                {error}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-border">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-accent transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !description.trim()}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a94728] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#8b3a1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                Submit Report
                            </button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
