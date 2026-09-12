import { useTheme } from "../../context/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isNavy = theme === "navy";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-control border border-line-strong bg-surface text-ink-muted hover:bg-surface-sunken hover:text-ink transition-colors duration-150 shadow-xs ${className}`}
      aria-label={isNavy ? "Switch to light mode" : "Switch to dark navy blue mode"}
      title={isNavy ? "Switch to Light Mode" : "Switch to Dark Navy Mode"}
    >
      {isNavy ? (
        <Sun size={17} className="text-amber-400 animate-fade-in" />
      ) : (
        <Moon size={17} className="text-indigo-600 animate-fade-in" />
      )}
    </button>
  );
}
