import { getFeedbackStatusStyle } from '@/lib/admin/status';
import { FeedbackStatus } from '@/lib/admin/types';

type FeedbackStatusBadgeProps = {
    status: FeedbackStatus;
};

export function FeedbackStatusBadge({ status }: FeedbackStatusBadgeProps) {
    const { label, className } = getFeedbackStatusStyle(status);

    return (
        <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-center text-xs font-semibold leading-5 ${className}`}
        >
            {label}
        </span>
    );
}
