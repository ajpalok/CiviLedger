import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, leadingIcon, id, className = "", ...rest }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-ink-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leadingIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle pointer-events-none">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            className={`w-full rounded-control border bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle transition-all duration-150 ${
              leadingIcon ? "pl-10" : ""
            } ${
              error
                ? "border-danger-fg/50 focus:border-danger-fg focus:ring-2 focus:ring-danger-bg"
                : "border-line-strong hover:border-ink-subtle focus:border-accent focus:ring-2 focus:ring-accent-quiet"
            } focus:outline-none ${className}`}
            {...rest}
          />
        </div>
        {hint && !error && (
          <p id={hintId} className="text-xs text-ink-subtle">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-danger-fg font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* ---- Select variant ---- */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, hint, error, options, id, className = "", ...rest }: SelectProps) {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-ink-secondary">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-control border border-line-strong bg-surface px-3 py-2.5 text-sm text-ink hover:border-ink-subtle focus:border-accent focus:ring-2 focus:ring-accent-quiet focus:outline-none transition-all duration-150 ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error && <p className="text-xs text-ink-subtle">{hint}</p>}
      {error && <p className="text-xs text-danger-fg font-medium" role="alert">{error}</p>}
    </div>
  );
}
