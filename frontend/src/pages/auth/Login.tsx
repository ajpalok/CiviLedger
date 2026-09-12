import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Shield, ArrowRight, KeyRound, CheckCircle2, ChevronDown, ChevronUp, Lock } from "lucide-react";

const DEMO_ACCOUNTS = [
  { label: "Education Officer (Issuer)", email: "nusrat@edu.gov.test", role: "ISSUER_ADMIN" },
  { label: "NID Officer (Issuer)", email: "rahim@identity.gov.test", role: "ISSUER_ADMIN" },
  { label: "BRTA Officer (Issuer)", email: "kamal@brta.gov.test", role: "ISSUER_ADMIN" },
  { label: "Ahnaf Tahmid (Citizen)", email: "ahnaf@citizen.test", role: "CITIZEN" },
  { label: "Sumaya Zaman (Citizen)", email: "sumaya@citizen.test", role: "CITIZEN" },
  { label: "HR Manager (Verifier)", email: "abrar@employer.test", role: "VERIFIER_STAFF" },
  { label: "System Admin (Oversight)", email: "admin@civiledger.test", role: "OVERSIGHT" },
];

export default function Login() {
  const { loginWithPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await loginWithPassword(email, password);
      const roleHome: Record<string, string> = {
        ISSUER_ADMIN: "/issuer",
        VERIFIER_STAFF: "/verifier",
        OVERSIGHT: "/oversight",
        CITIZEN: "/citizen",
      };
      navigate(roleHome[user.role] || "/");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function fillDemoAccount(demoEmail: string) {
    setEmail(demoEmail);
    setPassword("password123");
    setError(null);
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-border bg-surface shadow-xl overflow-hidden animate-scale-in">
        {/* Brand/Product Banner */}
        <div className="p-8 md:p-10 bg-gradient-to-br from-sidebar via-[#1e1b4b] to-sidebar text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-transparent to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accent to-purple-500 text-white font-bold shadow-md">
                CL
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">CiviLedger</span>
            </div>

            <h2 className="text-2xl font-bold leading-tight mb-3">
              Institutional Trust Network & Credential Management
            </h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Sign in to manage verifiable credential issuance, cryptographic verification nodes, and audit logs.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Zero-knowledge privacy & selective disclosure</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Ethereum smart-contract cryptographic anchors</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Tamper-evident B2B & government-level compliance</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 flex justify-between items-center">
            <span>Citizen self-custody wallet?</span>
            <Link to="/connect" className="text-indigo-300 hover:text-white font-medium inline-flex items-center gap-1 transition-colors">
              MetaMask Login <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Login Form Panel */}
        <div className="p-8 md:p-10 flex flex-col justify-center bg-surface">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text mb-1 tracking-tight">Welcome Back</h1>
            <p className="text-xs text-text-muted">Enter your institutional credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-err-bg border border-err-border text-err-fg text-xs flex items-center gap-2 animate-fade-in">
              <Shield size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Official Email Address"
              type="email"
              placeholder="name@organization.gov.test"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="primary" loading={loading} className="w-full mt-2" size="md">
              Sign In to Workspace
            </Button>
          </form>

          {/* Collapsible Demo Accounts for Evaluations */}
          <div className="mt-6 pt-5 border-t border-border">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="flex items-center justify-between w-full text-xs font-medium text-text-muted hover:text-text py-1 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <KeyRound size={14} className="text-accent" />
                Evaluation / Demo Accounts
              </span>
              {showDemo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showDemo && (
              <div className="mt-3 p-2.5 rounded-lg bg-surface-sunken border border-border space-y-1.5 animate-fade-in">
                <p className="text-[11px] text-text-muted px-1 pb-1">Click any role to autofill test credentials:</p>
                <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto pr-1">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => fillDemoAccount(acc.email)}
                      className="text-left text-xs p-1.5 rounded hover:bg-surface border border-transparent hover:border-border transition-colors flex items-center justify-between"
                    >
                      <span className="truncate font-medium text-text">{acc.label}</span>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider ml-2">{acc.role.replace("_", " ")}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
