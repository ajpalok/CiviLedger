import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { issuerApi } from "../../services/api";
import { StatusPill } from "../../components/ui/StatusPill";
import { Button } from "../../components/ui/Button";
import { StatsCard } from "../../components/ui/StatsCard";
import { PageHeader } from "../../components/ui/PageHeader";
import { DataTable, type Column } from "../../components/ui/DataTable";
import type { Credential } from "../../types";
import { Plus, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, ExternalLink, Settings2 } from "lucide-react";

interface IssuerStats {
  total: number;
  active: number;
  suspended: number;
  revoked: number;
}

export default function IssueDashboard() {
  const { run, data: credentials, loading } = useApi<Credential[]>(issuerApi.listIssued);
  const [stats, setStats] = useState<IssuerStats | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    run();
    issuerApi.stats().then((r) => setStats(r.data)).catch(() => {});
  }, [run]);

  const columns: Column<Credential>[] = [
    {
      key: "id",
      header: "Credential",
      render: (c: Credential) => (
        <div>
          <div className="font-semibold text-text">
            {c.CredentialType?.display_name || c.credential_type_id}
          </div>
          <div className="font-mono text-[11px] text-text-muted">{c.id.slice(0, 10)}...{c.id.slice(-6)}</div>
        </div>
      ),
    },
    {
      key: "citizen",
      header: "Citizen User ID",
      render: (c: Credential) => (
        <div>
          <span className="font-mono text-xs text-text font-medium">
            {c.citizen_user_id ? `${c.citizen_user_id.slice(0, 12)}...` : "—"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (c: Credential) => <StatusPill status={c.status_cache} />,
    },
    {
      key: "issued_at",
      header: "Issued Date",
      render: (c: Credential) => (
        <span className="text-xs text-text-muted">
          {new Date(c.issued_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (c: Credential) => (
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <Link to={`/issuer/credential/${c.id}`}>
            <Button variant="ghost" size="sm" icon={<ExternalLink size={13} />}>
              Details
            </Button>
          </Link>
          <Link to={`/issuer/manage/${c.id}`}>
            <Button variant="secondary" size="sm" icon={<Settings2 size={13} />}>
              Manage
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Issued Credentials"
        description="Monitor, inspect, and manage verifiable credentials issued by your institution"
        actions={
          <Link to="/issuer/new">
            <Button variant="primary" icon={<Plus size={16} />}>
              Issue New Credential
            </Button>
          </Link>
        }
      />

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatsCard
            label="Total Issued"
            value={stats.total}
            color="accent"
            icon={<ShieldCheck size={20} className="text-accent" />}
          />
          <StatsCard
            label="Active"
            value={stats.active}
            color="ok"
            icon={<CheckCircle2 size={20} className="text-ok-fg" />}
          />
          <StatsCard
            label="Suspended"
            value={stats.suspended}
            color="warn"
            icon={<AlertTriangle size={20} className="text-warn-fg" />}
          />
          <StatsCard
            label="Revoked"
            value={stats.revoked}
            color="danger"
            icon={<XCircle size={20} className="text-err-fg" />}
          />
        </div>
      )}

      {/* Modern Data Table */}
      <DataTable
        columns={columns}
        data={credentials || []}
        loading={loading}
        onRowClick={(c) => navigate(`/issuer/credential/${c.id}`)}
        emptyState={{
          title: "No credentials issued yet",
          description: "Your institution hasn't issued any verifiable credentials to citizens yet. Create your first issuance to begin.",
          action: (
            <Link to="/issuer/new">
              <Button variant="primary" icon={<Plus size={15} />}>
                Issue Credential
              </Button>
            </Link>
          ),
        }}
      />
    </div>
  );
}
