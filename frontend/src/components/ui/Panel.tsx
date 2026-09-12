import type { ReactNode } from "react";

type PanelVariant = "default" | "elevated" | "outlined";

const VARIANT_STYLES: Record<PanelVariant, string> = {
  default: "border border-line bg-surface shadow-xs",
  elevated: "border border-line bg-surface shadow-md",
  outlined: "border-2 border-accent-border bg-accent-quiet/30",
};

/** The only card in the system. Never nest a Panel inside a Panel. */
export function Panel({
  title,
  actions,
  children,
  variant = "default",
  className = "",
  noPadding = false,
}: {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  variant?: PanelVariant;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <section
      className={`rounded-container overflow-hidden animate-fade-in ${VARIANT_STYLES[variant]} ${className}`}
    >
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          {title && (
            <h2 className="text-[15px] font-semibold text-ink flex items-center gap-2">
              {title}
            </h2>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={noPadding ? "" : "p-5"}>{children}</div>
    </section>
  );
}
