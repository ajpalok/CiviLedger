import { Outlet, Link } from "react-router-dom";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageToggle } from "../ui/LanguageToggle";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-200 flex flex-col justify-between">
      {/* Top Header */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-line bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-accent to-purple-500 text-white font-bold text-sm shadow-sm">
            CL
          </div>
          <span className="font-bold text-base tracking-tight text-ink">CiviLedger</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full animate-fade-in-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
