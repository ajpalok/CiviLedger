import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { citizenApi } from "../../services/api";
import { PageHeader } from "../../components/ui/PageHeader";
import { Panel } from "../../components/ui/Panel";
import { EmptyState } from "../../components/ui/EmptyState";
import { CopyableValue } from "../../components/ui/CopyableValue";
import { Button } from "../../components/ui/Button";
import { Share2, History, CheckCircle2, XCircle, Clock, Building2 } from "lucide-react";

export default function AuditHistory() {
  const { run, data: presentations, loading, error } = useApi(citizenApi.auditHistory);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Consent & Sharing History"
        description="Immutable audit trail of every credential presentation you've shared with external verifiers."
        actions={
          <Link to="/citizen/share">
            <Button variant="primary" icon={<Share2 size={16} />}>
              New Presentation
            </Button>
          </Link>
        }
      />

      {error && (
        <div className="p-4 rounded-xl bg-err-bg border border-err-border text-err-fg text-xs">
          {error}
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 rounded-xl border border-border bg-surface animate-pulse" />
          ))}
        </div>
      )}

      {!loading && (!presentations || presentations.length === 0) && (
        <EmptyState
          icon={<History size={36} className="text-text-muted" />}
          title="No sharing history yet"
          description="Whenever you present or share a credential via QR code or link, the cryptographic consent record and audit log will appear here."
          action={
            <Link to="/citizen/share">
              <Button variant="primary" icon={<Share2 size={14} />}>
                Share Your First Credential
              </Button>
            </Link>
          }
        />
      )}

      {!loading && presentations && presentations.length > 0 && (
        <div className="space-y-4">
          {presentations.map((p: any) => {
            const isExpired = new Date(p.expires_at) <= new Date();

            return (
              <Panel key={p.id} variant="elevated" className="overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text text-sm">
                        Presentation Session: {p.credential_ids?.length || 0} Credential(s)
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          !isExpired
                            ? "bg-ok-bg text-ok-fg border-ok-border"
                            : "bg-surface-sunken text-text-muted border-border"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${!isExpired ? "bg-ok-fg" : "bg-text-muted"}`} />
                        {!isExpired ? "Active Presentation" : "Expired"}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">
                      Created: {new Date(p.created_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>

                  {p.verifierOrg && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-sunken border border-border text-xs text-text">
                      <Building2 size={13} className="text-accent" />
                      <span className="text-text-muted">Target Verifier:</span>
                      <span className="font-medium">{p.verifierOrg.name}</span>
                    </div>
                  )}
                </div>

                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-text-muted text-[11px]">Dynamic Presentation Token:</span>
                    <div>
                      <CopyableValue value={p.share_token} kind="token" />
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-text-muted flex items-center gap-1 self-start sm:self-auto">
                    <Clock size={12} />
                    <span>Expires: {new Date(p.expires_at).toLocaleString()}</span>
                  </div>
                </div>

                {/* Verification Events */}
                {p.VerificationEvents && p.VerificationEvents.length > 0 && (
                  <div className="mt-2 pt-3 border-t border-border/60 bg-surface-sunken/40 -mx-6 -mb-6 p-4">
                    <p className="text-xs font-semibold text-text mb-2 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-accent" />
                      Verification Audit Records ({p.VerificationEvents.length})
                    </p>
                    <div className="space-y-1.5">
                      {p.VerificationEvents.map((v: any) => (
                        <div
                          key={v.id}
                          className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-surface border border-border text-xs"
                        >
                          <div className="flex items-center gap-2">
                            {v.result === "VALID" ? (
                              <CheckCircle2 size={14} className="text-ok-fg" />
                            ) : (
                              <XCircle size={14} className="text-err-fg" />
                            )}
                            <span className="font-semibold text-text">{v.result}</span>
                            <span className="text-text-muted text-[11px]">
                              {new Date(v.verified_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>

                          {v.onchain_receipt_tx && (
                            <CopyableValue value={v.onchain_receipt_tx} kind="tx" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
}
