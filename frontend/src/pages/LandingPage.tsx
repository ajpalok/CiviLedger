import { Link } from "react-router-dom";
import { useT } from "../i18n/I18nProvider";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { Button } from "../components/ui/Button";
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Building2,
  Wallet,
  FileCheck2,
  Layers,
  Sparkles,
  ChevronRight,
  Cpu,
  Database,
  Globe2,
} from "lucide-react";
import "../styles/landing.css";

export default function LandingPage() {
  const { t } = useT();

  const features = [
    {
      icon: ShieldCheck,
      title: t("landing.feat1Title"),
      description: t("landing.feat1Desc"),
      badge: t("landing.feat1Badge"),
    },
    {
      icon: Lock,
      title: t("landing.feat2Title"),
      description: t("landing.feat2Desc"),
      badge: t("landing.feat2Badge"),
    },
    {
      icon: Zap,
      title: t("landing.feat3Title"),
      description: t("landing.feat3Desc"),
      badge: t("landing.feat3Badge"),
    },
  ];

  const steps = [
    {
      num: "01",
      title: t("landing.step1Title"),
      desc: t("landing.step1Desc"),
    },
    {
      num: "02",
      title: t("landing.step2Title"),
      desc: t("landing.step2Desc"),
    },
    {
      num: "03",
      title: t("landing.step3Title"),
      desc: t("landing.step3Desc"),
    },
    {
      num: "04",
      title: t("landing.step4Title"),
      desc: t("landing.step4Desc"),
    },
  ];

  const roles = [
    {
      title: t("landing.role1Title"),
      subtitle: t("landing.role1Subtitle"),
      to: "/login",
      cta: t("landing.role1Cta"),
      icon: Building2,
      tag: t("landing.role1Tag"),
    },
    {
      title: t("landing.role2Title"),
      subtitle: t("landing.role2Subtitle"),
      to: "/connect",
      cta: t("landing.role2Cta"),
      icon: Wallet,
      tag: t("landing.role2Tag"),
    },
    {
      title: t("landing.role3Title"),
      subtitle: t("landing.role3Subtitle"),
      to: "/login",
      cta: t("landing.role3Cta"),
      icon: FileCheck2,
      tag: t("landing.role3Tag"),
    },
  ];

  const architectureNodes = [
    {
      icon: Globe2,
      title: t("landing.archNode1Title"),
      desc: t("landing.archNode1Desc"),
    },
    {
      icon: Cpu,
      title: t("landing.archNode2Title"),
      desc: t("landing.archNode2Desc"),
    },
    {
      icon: Database,
      title: t("landing.archNode3Title"),
      desc: t("landing.archNode3Desc"),
    },
    {
      icon: Layers,
      title: t("landing.archNode4Title"),
      desc: t("landing.archNode4Desc"),
    },
  ];

  return (
    <div className="landing-page selection:bg-accent selection:text-white">
      {/* -------- STICKY NAVBAR -------- */}
      <nav className="landing-nav">
        <div className="landing-nav__inner">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-accent to-purple-500 text-white font-bold text-sm shadow-md">
              CL
            </div>
            <span className="text-base font-bold tracking-tight text-ink">CiviLedger</span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent-quiet text-accent border border-accent-border ml-1">
              {t("landing.tagline")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm">
                {t("nav.logIn")}
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="primary" size="sm" icon={<ArrowRight size={14} />}>
                {t("landing.getStarted")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* -------- HERO SECTION -------- */}
      <section className="landing-hero" id="landing-hero">
        <div className="landing-hero__bg" aria-hidden="true">
          <div className="landing-hero__orb landing-hero__orb--1" />
          <div className="landing-hero__orb landing-hero__orb--2" />
          <div className="landing-hero__orb landing-hero__orb--3" />
        </div>

        <div className="landing-hero__content">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs text-indigo-200 font-medium mb-6 shadow-sm backdrop-blur-md">
            <Sparkles size={14} className="text-accent" />
            <span>{t("landing.heroBadge")}</span>
          </div>

          <h1 className="landing-hero__title">
            {t("landing.heroTitle1")}
            <br />
            <span className="landing-hero__title-accent">{t("landing.heroTitle2")}</span>
          </h1>

          <p className="landing-hero__subtitle">
            {t("landing.heroSubtitle")}
          </p>

          <div className="landing-hero__cta-row">
            <Link to="/login">
              <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                {t("landing.startIssuing")}
              </Button>
            </Link>
            <Link to="/connect">
              <Button variant="secondary" size="lg" icon={<Wallet size={18} />}>
                {t("landing.connectWallet")}
              </Button>
            </Link>
          </div>

          {/* Social Proof / Stats Strip */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">{t("landing.stat1Val")}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("landing.stat1Label")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">{t("landing.stat2Val")}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("landing.stat2Label")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">{t("landing.stat3Val")}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("landing.stat3Label")}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">{t("landing.stat4Val")}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("landing.stat4Label")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* -------- ENTERPRISE FEATURES -------- */}
      <section className="landing-section" id="features">
        <div className="landing-section__inner">
          <p className="landing-section__eyebrow">{t("landing.featuresEyebrow")}</p>
          <h2 className="landing-section__heading">
            {t("landing.featuresHeading")}
          </h2>

          <div className="landing-features">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="landing-feature">
                  <div className="flex items-center justify-between mb-4">
                    <div className="landing-feature__icon-wrap">
                      <Icon className="landing-feature__icon text-accent" />
                    </div>
                    <span className="text-[11px] font-semibold text-accent px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="landing-feature__title">{f.title}</h3>
                  <p className="landing-feature__desc">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------- HOW IT WORKS STEPPER -------- */}
      <section className="landing-section landing-section--alt" id="how-it-works">
        <div className="landing-section__inner">
          <p className="landing-section__eyebrow">{t("landing.flowEyebrow")}</p>
          <h2 className="landing-section__heading">
            {t("landing.flowHeading")}
          </h2>

          <div className="landing-steps">
            {steps.map((s, i) => (
              <div key={s.num} className="landing-step">
                <div className="landing-step__num">{s.num}</div>
                <h3 className="landing-step__label">{s.title}</h3>
                <p className="landing-step__desc">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="landing-step__connector" aria-hidden="true">
                    <ChevronRight className="landing-step__connector-icon" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------- ROLE SELECTION CARDS -------- */}
      <section className="landing-section" id="get-started">
        <div className="landing-section__inner">
          <p className="landing-section__eyebrow">{t("landing.rolesEyebrow")}</p>
          <h2 className="landing-section__heading">
            {t("landing.rolesHeading")}
          </h2>

          <div className="landing-roles">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <Link key={r.title} to={r.to} className="landing-role group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {r.tag}
                    </span>
                  </div>
                  <h3 className="landing-role__title group-hover:text-indigo-300 transition-colors">{r.title}</h3>
                  <p className="landing-role__subtitle">{r.subtitle}</p>
                  <span className="landing-role__cta">
                    {r.cta}
                    <ArrowRight size={14} className="landing-role__cta-icon" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------- UNDER THE HOOD / ARCHITECTURE -------- */}
      <section className="landing-section landing-section--alt" id="architecture">
        <div className="landing-section__inner">
          <p className="landing-section__eyebrow">{t("landing.archEyebrow")}</p>
          <h2 className="landing-section__heading">
            {t("landing.archHeading")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {architectureNodes.map((node) => {
              const Icon = node.icon;
              return (
                <div key={node.title} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{node.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{node.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------- FOOTER -------- */}
      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-accent text-white font-bold text-xs">
                CL
              </div>
              <span className="text-sm font-semibold text-white">CiviLedger Trust Platform</span>
            </div>
            <p className="text-xs text-slate-400 text-center sm:text-right">
              {t("landing.footerDesc")}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 w-full">
            <span>{t("landing.footerRights", { year: new Date().getFullYear() })}</span>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <Link to="/login" className="hover:text-slate-300 transition-colors">{t("landing.footerStaff")}</Link>
              <Link to="/connect" className="hover:text-slate-300 transition-colors">{t("landing.footerVault")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
