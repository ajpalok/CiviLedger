import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
}

/** Short heading, one sentence, one action. Used by every empty list and table. */
export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-sunken text-ink-subtle mb-3"
        aria-hidden="true"
      >
        {icon || <Inbox size={24} />}
      </div>
      <p className="text-base font-semibold text-ink mb-1">{title}</p>
      {description && (
        <p className="max-w-[46ch] text-pretty text-sm text-ink-muted mb-4">
          {description}
        </p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
