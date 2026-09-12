import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useT } from "../../i18n/I18nProvider";
import { Button } from "../ui/Button";
import { LanguageToggle } from "../ui/LanguageToggle";
import { ThemeToggle } from "../ui/ThemeToggle";
import { RoleNav } from "./RoleNav";
import { ROLE_HOME } from "./RequireAuth";
import {
  Menu,
  X,
  Bell,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

export function AppShell() {
  const { user, logout } = useAuth();
  const { t } = useT();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const home = user ? ROLE_HOME[user.role] : "/";

  // Build breadcrumb from path
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumb = pathSegments.map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1));

  return (
    <div className="min-h-screen bg-bg">
      {/* ---- Mobile sidebar overlay ---- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ---- Sidebar ---- */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[260px] flex flex-col bg-sidebar transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[60px] items-center justify-between px-5 border-b border-white/[0.06]">
          <Link
            to={home}
            className="flex items-center gap-2.5 no-underline"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-sm">
              CL
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">
              CiviLedger
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sidebar-text hover:text-white hover:bg-sidebar-hover lg:hidden transition-colors"
            aria-label={t("shell.closeMenu")}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-3 px-3">
          {user && (
            <RoleNav role={user.role} onNavigate={() => setSidebarOpen(false)} />
          )}
        </div>

        {/* User section */}
        {user && (
          <div className="border-t border-white/[0.06] p-3">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-500/80 text-white text-xs font-semibold">
                {user.full_name
                  ? user.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                  : "U"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-sidebar-text-active truncate">
                  {user.full_name || "User"}
                </p>
                <p className="text-xs text-sidebar-text truncate">
                  {t(`role.${user.role}`)}
                </p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-text hover:text-red-400 hover:bg-sidebar-hover transition-colors"
                title={t("nav.logOut")}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ---- Main content area ---- */}
      <div className="lg:pl-[260px] min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[60px] items-center gap-3 border-b border-line bg-surface/80 backdrop-blur-md px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label={t("shell.menu")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken hover:text-ink lg:hidden transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <nav className="hidden sm:flex items-center gap-1.5 text-sm text-ink-muted" aria-label="Breadcrumb">
            <Link to={home} className="hover:text-ink transition-colors no-underline text-ink-muted">
              {t("app.name")}
            </Link>
            {breadcrumb.map((seg, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={14} className="text-ink-subtle" />
                <span className={i === breadcrumb.length - 1 ? "text-ink font-medium" : ""}>
                  {seg}
                </span>
              </span>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken hover:text-ink transition-colors"
              title="Notifications"
            >
              <Bell size={18} />
            </button>
            {user && (
              <div className="hidden sm:flex items-center gap-2 pl-2 ml-1 border-l border-line">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-quiet text-accent text-xs font-semibold">
                  {user.full_name
                    ? user.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                    : <User size={14} />}
                </div>
                <span className="text-sm font-medium text-ink">
                  {user.full_name || "User"}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="mx-auto max-w-content animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
