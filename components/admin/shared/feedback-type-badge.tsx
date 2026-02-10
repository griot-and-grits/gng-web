import { getFeedbackTypeStyle } from '@/lib/admin/status';
import { FeedbackType } from '@/lib/admin/types';

type FeedbackTypeBadgeProps = {
    type: FeedbackType;
};

export function FeedbackTypeBadge({ type }: FeedbackTypeBadgeProps) {
    const { label, className, dotClassName } = getFeedbackTypeStyle(type);

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
        >
            <span className={`h-2 w-2 rounded-full ${dotClassName}`} aria-hidden="true" />
            {label}
        </span>
    );
}
