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
  CheckCircle2,
  Building2,
  Wallet,
  FileCheck2,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Cpu,
  Database,
  Globe2,
} from "lucide-react";
import "../styles/landing.css";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Cryptographic Tamper-Proofing",
    description: "Credentials are cryptographically hashed and anchored on an immutable blockchain ledger. Any tampering or unauthorized alteration is instantaneously invalidated.",
    badge: "Enterprise Security",
  },
  {
    icon: Lock,
    title: "Selective Disclosure & Privacy",
    description: "Citizens hold sovereign custody of their credentials in self-sovereign wallets, sharing only the exact verified claims required without revealing sensitive underlying data.",
    badge: "Zero-Knowledge",
  },
  {
    icon: Zap,
    title: "Sub-Second Cross-Border Verification",
    description: "Verifiers authenticate student transcripts, national IDs, and business licenses in milliseconds via QR or cryptographic share tokens with zero phone calls or manual paperwork.",
    badge: "Instant Verification",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Government / Issuer Onboarding",
    desc: "Authorized institutions join via consortium governance and deploy cryptographic signing keys anchored to the public ledger.",
  },
  {
    num: "02",
    title: "Verifiable Credential Issuance",
    desc: "Institutional authorities sign and issue standardized credentials directly to citizens' decentralized identifiers (DIDs).",
  },
  {
    num: "03",
    title: "Citizen Wallet Self-Custody",
    desc: "Citizens securely hold, manage, and audit their credentials using decentralized Web3 wallets with granular consent controls.",
  },
  {
    num: "04",
    title: "Zero-Trust Instant Verification",
    desc: "Verifiers scan QR presentations or inspect cryptographic share tokens directly against on-chain smart contract registries.",
  },
];

const ROLES = [
  {
    title: "Government & Issuers",
    subtitle: "Universities, licensing boards, and ministries issuing tamper-proof credentials at scale.",
    to: "/login",
    cta: "Launch Issuer Portal",
    icon: Building2,
    tag: "B2B / Gov",
  },
  {
    title: "Citizens & Holders",
    subtitle: "Store verified digital credentials in a personal Web3 vault and present them anywhere.",
    to: "/connect",
    cta: "Open Citizen Wallet",
    icon: Wallet,
    tag: "B2C / Self-Custody",
  },
  {
    title: "Employers & Verifiers",
    subtitle: "Instant cryptographic audit and verification node for HR, banks, and regulatory bodies.",
    to: "/login",
    cta: "Access Verifier Console",
    icon: FileCheck2,
    tag: "B2B Verification",
  },
];

const ARCHITECTURE_NODES = [
  {
    icon: Globe2,
    title: "React Web3 Client",
    desc: "High-performance enterprise UI with role-based routing and internationalization.",
  },
  {
    icon: Cpu,
    title: "Node.js REST & Crypto Core",
    desc: "EIP-712 credential hashing, signature verification, and secure presentation token generation.",
  },
  {
    icon: Database,
    title: "PostgreSQL Data Layer",
    desc: "Compliant off-chain encrypted credential storage and consent audit logging.",
  },
  {
    icon: Layers,
    title: "Ethereum Smart Contracts",
    desc: "CredentialRegistry, IssuerRegistry, and Multi-Sig Governance on-chain anchors.",
  },
];

export default function LandingPage() {
  const { t } = useT();

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
              B2B2C Trust Network
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
                Get Started
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
            <span>Next-Generation Digital Identity & Credential Infrastructure</span>
          </div>

          <h1 className="landing-hero__title">
            Verifiable Credentials.
            <br />
            <span className="landing-hero__title-accent">Zero Trust Issues.</span>
          </h1>

          <p className="landing-hero__subtitle">
            CiviLedger bridges institutional authorities, citizens, and verifiers with a decentralized trust ledger.
            Issue tamper-proof certificates, maintain sovereign citizen custody, and verify authentications in milliseconds.
          </p>

          <div className="landing-hero__cta-row">
            <Link to="/login">
              <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                Start Issuing Credentials
              </Button>
            </Link>
            <Link to="/connect">
              <Button variant="secondary" size="lg" icon={<Wallet size={18} />}>
                Connect Citizen Wallet
              </Button>
            </Link>
          </div>

          {/* Social Proof / Stats Strip */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Tamper-Evident Proofs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">&lt; 300ms</div>
              <div className="text-xs text-slate-400 mt-0.5">Verification Latency</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">EIP-712</div>
              <div className="text-xs text-slate-400 mt-0.5">Cryptographic Standards</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">Zero</div>
              <div className="text-xs text-slate-400 mt-0.5">Third-Party Data Leaks</div>
            </div>
          </div>
        </div>
      </section>

      {/* -------- ENTERPRISE FEATURES -------- */}
      <section className="landing-section" id="features">
        <div className="landing-section__inner">
          <p className="landing-section__eyebrow">Enterprise Grade Security</p>
          <h2 className="landing-section__heading">
            Built for National Scale & Enterprise Trust
          </h2>

          <div className="landing-features">
            {FEATURES.map((f) => {
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
          <p className="landing-section__eyebrow">The B2B2C Architecture</p>
          <h2 className="landing-section__heading">
            End-to-End Cryptographic Lifecycle
          </h2>

          <div className="landing-steps">
            {STEPS.map((s, i) => (
              <div key={s.num} className="landing-step">
                <div className="landing-step__num">{s.num}</div>
                <h3 className="landing-step__label">{s.title}</h3>
                <p className="landing-step__desc">{s.desc}</p>
                {i < STEPS.length - 1 && (
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
          <p className="landing-section__eyebrow">Tailored Experiences</p>
          <h2 className="landing-section__heading">
            Designed for Every Stakeholder
          </h2>

          <div className="landing-roles">
            {ROLES.map((r) => {
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
          <p className="landing-section__eyebrow">Consortium Technology Stack</p>
          <h2 className="landing-section__heading">
            Distributed Systems Architecture
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {ARCHITECTURE_NODES.map((node) => {
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
              Empowering national public sector trust with decentralized verifiable credentials.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 w-full">
            <span>© {new Date().getFullYear()} CiviLedger Consortium. All rights reserved.</span>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <Link to="/login" className="hover:text-slate-300 transition-colors">Staff Login</Link>
              <Link to="/connect" className="hover:text-slate-300 transition-colors">Citizen Vault</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
