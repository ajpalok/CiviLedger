import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover active:bg-accent-active shadow-sm hover:shadow-md",
  secondary:
    "bg-surface text-ink border border-line-strong hover:bg-surface-sunken hover:border-ink-subtle active:bg-surface-sunken",
  ghost:
    "bg-transparent text-ink-muted hover:bg-surface-sunken hover:text-ink",
  danger:
    "bg-danger-fg text-white hover:opacity-90 active:opacity-80 shadow-sm",
};

const SIZE: Record<Size, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: any;
  iconRight?: any;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon: IconLeft,
  iconRight: IconRight,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  const renderIcon = (iconItem: any) => {
    if (!iconItem) return null;
    if (typeof iconItem === "function" || (typeof iconItem === "object" && "render" in iconItem)) {
      const IconComponent = iconItem;
      return <IconComponent size={iconSize} className="shrink-0" />;
    }
    return iconItem;
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-control font-medium transition-all duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : (
        renderIcon(IconLeft)
      )}
      <span>{children}</span>
      {!loading && renderIcon(IconRight)}
    </button>
  );
}
