import { useNavigate, Link } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Wallet, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ConnectWallet() {
  const { address, connect, connecting, error: walletError } = useWallet();
  const { loginWithWallet } = useAuth();
  const navigate = useNavigate();

  async function handleConnect() {
    const addr = await connect();
    if (addr) {
      await loginWithWallet(addr);
      navigate("/citizen");
    }
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
              <span className="text-lg font-semibold tracking-tight text-white">CiviLedger Citizen</span>
            </div>

            <h2 className="text-2xl font-bold leading-tight mb-3">
              Your Personal Decentralized Credential Vault
            </h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Connect your Web3 self-custody wallet to view, manage, and present your tamper-proof credentials.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Non-custodial: only you hold cryptographic control</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Instant selective disclosure via QR presentations</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Cryptographically verifiable by any authorized verifier</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 flex justify-between items-center">
            <span>Institutional or Government Staff?</span>
            <Link to="/login" className="text-indigo-300 hover:text-white font-medium inline-flex items-center gap-1 transition-colors">
              Staff Portal <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Connect Action Panel */}
        <div className="p-8 md:p-10 flex flex-col justify-center items-center text-center bg-surface">
          <div className="h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5 text-accent shadow-sm">
            <Wallet size={32} />
          </div>

          <h1 className="text-2xl font-bold text-text mb-2 tracking-tight">Connect Web3 Wallet</h1>
          <p className="text-xs text-text-muted max-w-sm mb-6 leading-relaxed">
            Link your MetaMask or browser Ethereum wallet to authenticate against your decentralized identity.
          </p>

          {walletError && (
            <div className="w-full mb-5 p-3 rounded-lg bg-err-bg border border-err-border text-err-fg text-xs flex items-center gap-2 text-left animate-fade-in">
              <AlertCircle size={16} className="shrink-0" />
              <span>{walletError}</span>
            </div>
          )}

          <Button
            onClick={handleConnect}
            disabled={connecting}
            loading={connecting}
            variant="primary"
            size="lg"
            className="w-full max-w-xs shadow-md hover:shadow-lg"
          >
            {address ? (
              <span className="truncate max-w-[200px]">{address}</span>
            ) : (
              "Connect MetaMask"
            )}
          </Button>

          <p className="text-[11px] text-text-muted mt-6 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            No gas fees are charged for logging in or viewing credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
