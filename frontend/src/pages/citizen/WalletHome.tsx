import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { citizenApi } from "../../services/api";
import { CredentialCard } from "../../components/credentials/CredentialCard";
import { StatsCard } from "../../components/ui/StatsCard";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { Button } from "../../components/ui/Button";
import type { Credential } from "../../types";
import { Share2, Award, CheckCircle2, Clock, Eye } from "lucide-react";

interface CitizenStats {
  totalCredentials: number;
  activeCredentials: number;
  expiredCredentials: number;
  totalShared: number;
}

export default function WalletHome() {
  const { run, data: credentials, loading } = useApi<Credential[]>(citizenApi.listMyCredentials);
  const [stats, setStats] = useState<CitizenStats | null>(null);

  useEffect(() => {
    run();
    citizenApi.stats().then((r) => setStats(r.data)).catch(() => {});
  }, [run]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="My Credential Vault"
        description="View, manage, and present your cryptographically verified decentralized credentials"
        actions={
          <Link to="/citizen/share">
            <Button variant="primary" icon={<Share2 size={16} />}>
              Share Credential
            </Button>
          </Link>
        }
      />

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatsCard
            label="Total Credentials"
            value={stats.totalCredentials}
            color="accent"
            icon={<Award size={20} className="text-accent" />}
          />
          <StatsCard
            label="Active / Valid"
            value={stats.activeCredentials}
            color="ok"
            icon={<CheckCircle2 size={20} className="text-ok-fg" />}
          />
          <StatsCard
            label="Expired / Inactive"
            value={stats.expiredCredentials}
            color="warn"
            icon={<Clock size={20} className="text-warn-fg" />}
          />
          <StatsCard
            label="Times Presented"
            value={stats.totalShared}
            color="default"
            icon={<Eye size={20} className="text-text-muted" />}
          />
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-40 rounded-xl border border-border bg-surface animate-pulse p-5" />
          ))}
        </div>
      )}

      {/* Credentials Grid */}
      {!loading && credentials && credentials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {credentials.map((c) => (
            <CredentialCard key={c.id} credential={c}>
              <div className="pt-2 border-t border-border/60 flex items-center justify-between mt-auto">
                <Link
                  to={`/citizen/credential/${c.id}`}
                  className="text-xs font-medium text-text-muted hover:text-text transition-colors"
                >
                  View Details & Audit
                </Link>
                <Link to="/citizen/share" state={{ preselect: c.id }}>
                  <Button variant="secondary" size="sm" icon={<Share2 size={13} />}>
                    Share QR
                  </Button>
                </Link>
              </div>
            </CredentialCard>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && (!credentials || credentials.length === 0) && (
        <EmptyState
          icon={<Award size={36} className="text-text-muted" />}
          title="No credentials found in your vault"
          description="You haven't received any verifiable credentials yet. Once an authorized institution issues a credential to your DID, it will appear here."
        />
      )}
    </div>
  );
}
