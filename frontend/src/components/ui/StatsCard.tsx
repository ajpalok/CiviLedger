import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: any;
  color?: "accent" | "ok" | "warn" | "danger" | "default";
  subtitle?: string;
  trend?: { value: string; positive?: boolean };
}

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  accent:  { bg: "bg-accent-quiet/50",  text: "text-accent",    border: "border-accent-border/50", iconBg: "bg-accent-quiet" },
  ok:      { bg: "bg-ok-bg/50",         text: "text-ok-fg",     border: "border-ok-border/50",     iconBg: "bg-ok-bg" },
  warn:    { bg: "bg-warn-bg/50",       text: "text-warn-fg",   border: "border-warn-border/50",   iconBg: "bg-warn-bg" },
  danger:  { bg: "bg-danger-bg/50",     text: "text-danger-fg", border: "border-danger-border/50", iconBg: "bg-danger-bg" },
  default: { bg: "bg-surface",          text: "text-ink",       border: "border-line",             iconBg: "bg-surface-sunken" },
};

export function StatsCard({ label, value, icon: Icon, color = "default", subtitle, trend }: StatsCardProps) {
  const c = COLOR_MAP[color] ?? COLOR_MAP.default;

  const renderIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === "function" || (typeof Icon === "object" && "render" in Icon)) {
      const IconComp = Icon;
      return <IconComp size={16} className={c.text} />;
    }
    return Icon;
  };

  return (
    <div className={`rounded-container border ${c.border} bg-surface p-4 flex flex-col gap-2 card-hover`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">{label}</span>
        {Icon && (
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.iconBg}`}>
            {renderIcon()}
          </span>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className={`text-2xl font-bold tracking-tight ${c.text}`}>{value}</span>
        {trend && (
          <span className={`text-xs font-medium mb-0.5 ${trend.positive ? "text-ok-fg" : "text-danger-fg"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      {subtitle && <span className="text-xs text-ink-subtle">{subtitle}</span>}
    </div>
  );
}
