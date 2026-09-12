import { useT } from "../../i18n/I18nProvider";

const TONE: Record<string, { classes: string; dot: string }> = {
  ACTIVE:     { classes: "border-ok-border bg-ok-bg text-ok-fg",             dot: "bg-ok-fg" },
  VALID:      { classes: "border-ok-border bg-ok-bg text-ok-fg",             dot: "bg-ok-fg" },
  PENDING:    { classes: "border-warn-border bg-warn-bg text-warn-fg",       dot: "bg-warn-fg" },
  SUSPENDED:  { classes: "border-warn-border bg-warn-bg text-warn-fg",       dot: "bg-warn-fg" },
  REVOKED:    { classes: "border-danger-border bg-danger-bg text-danger-fg", dot: "bg-danger-fg" },
  EXPIRED:    { classes: "border-danger-border bg-danger-bg text-danger-fg", dot: "bg-danger-fg" },
  SUPERSEDED: { classes: "border-line bg-surface-sunken text-ink-muted",     dot: "bg-ink-subtle" },
};

const DEFAULT_TONE = { classes: "border-line bg-surface-sunken text-ink-muted", dot: "bg-ink-subtle" };

/** Takes a semantic status key, renders translated label with dot indicator. Never a raw enum. */
export function StatusPill({ status }: { status: string }) {
  const { t } = useT();
  const tone = TONE[status] ?? DEFAULT_TONE;
  const isPulsing = status === "ACTIVE" || status === "VALID";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tone.classes}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${tone.dot} ${isPulsing ? "animate-pulse-dot" : ""}`}
      />
      {t(`status.${status}`)}
    </span>
  );
}
