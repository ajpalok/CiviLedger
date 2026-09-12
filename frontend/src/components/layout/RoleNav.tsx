import { NavLink } from "react-router-dom";
import { useT } from "../../i18n/I18nProvider";
import type { Role } from "../../context/AuthProvider";
import {
  Wallet,
  Clock,
  FilePlus,
  List,
  Search,
  Building2,
  ScrollText,
  Share2,
  Shield,
  FileCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  to: string;
  labelKey: string;
  Icon: LucideIcon;
  end?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const NAV: Record<Role, NavSection[]> = {
  CITIZEN: [
    {
      title: "Dashboard",
      items: [
        { to: "/citizen", labelKey: "nav.myWallet", Icon: Wallet, end: true },
      ],
    },
    {
      title: "Actions",
      items: [
        { to: "/citizen/share", labelKey: "nav.shareCredential", Icon: Share2 },
        { to: "/citizen/audit", labelKey: "nav.sharingHistory", Icon: Clock },
      ],
    },
  ],
  ISSUER_ADMIN: [
    {
      title: "Dashboard",
      items: [
        { to: "/issuer", labelKey: "nav.issuedCredentials", Icon: FileCheck, end: true },
      ],
    },
    {
      title: "Management",
      items: [
        { to: "/issuer/new", labelKey: "nav.issueNew", Icon: FilePlus },
      ],
    },
  ],
  VERIFIER_STAFF: [
    {
      title: "Dashboard",
      items: [
        { to: "/verifier", labelKey: "nav.verify", Icon: Search, end: true },
      ],
    },
  ],
  OVERSIGHT: [
    {
      title: "Dashboard",
      items: [
        { to: "/oversight", labelKey: "nav.organizations", Icon: Building2, end: true },
      ],
    },
    {
      title: "Monitoring",
      items: [
        { to: "/oversight/audit", labelKey: "nav.auditLog", Icon: ScrollText },
      ],
    },
  ],
};

export function RoleNav({
  role,
  onNavigate,
}: {
  role: Role;
  onNavigate?: () => void;
}) {
  const { t } = useT();
  const sections = NAV[role] ?? [];

  return (
    <nav aria-label={t("shell.primaryNav")}>
      <div className="flex flex-col gap-5">
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && (
              <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-text/50">
                {section.title}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-sidebar-active text-white shadow-sm"
                          : "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active indicator bar */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-accent-muted" />
                        )}
                        <item.Icon
                          size={18}
                          className={`shrink-0 ${
                            isActive ? "text-accent-muted" : "text-sidebar-text group-hover:text-sidebar-text-active"
                          }`}
                        />
                        <span>{t(item.labelKey)}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
