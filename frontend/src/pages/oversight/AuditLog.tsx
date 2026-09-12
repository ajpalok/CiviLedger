import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { governanceApi } from "../../services/api";
import { PageHeader } from "../../components/ui/PageHeader";
import { DataTable } from "../../components/ui/DataTable";
import { Button } from "../../components/ui/Button";
import { CopyableValue } from "../../components/ui/CopyableValue";
import { ArrowLeft, History, Activity } from "lucide-react";

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? "—"
    : d.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

export default function AuditLog() {
  const { run, data, loading } = useApi(governanceApi.auditLog);

  useEffect(() => {
    run();
  }, [run]);

  const governanceColumns = [
    {
      key: "event_type",
      header: "Action / Event",
      render: (e: any) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            e.event_type.includes("APPROVED")
              ? "bg-ok-bg text-ok-fg border-ok-border"
              : e.event_type.includes("PROPOSED")
              ? "bg-accent/10 text-accent border-accent/20"
              : "bg-warn-bg text-warn-fg border-warn-border"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              e.event_type.includes("APPROVED")
                ? "bg-ok-fg"
                : e.event_type.includes("PROPOSED")
                ? "bg-accent"
                : "bg-warn-fg"
            }`}
          />
          {e.event_type}
        </span>
      ),
    },
    {
      key: "details",
      header: "Entity Details",
      render: (e: any) => (
        <span className="text-xs font-medium text-text">
          {e.details?.name || (e.details?.onchain_address ? `${e.details.onchain_address.slice(0, 12)}...` : "—")}
        </span>
      ),
    },
    {
      key: "tx_hash",
      header: "Blockchain Anchor (TX)",
      render: (e: any) =>
        e.onchain_tx_hash ? (
          <CopyableValue value={e.onchain_tx_hash} kind="tx" />
        ) : (
          <span className="text-xs text-text-muted">—</span>
        ),
    },
    {
      key: "time",
      header: "Timestamp",
      render: (e: any) => <span className="text-xs text-text-muted">{formatDate(e.createdAt || e.created_at)}</span>,
    },
  ];

  const statusColumns = [
    {
      key: "transition",
      header: "Status Transition",
      render: (e: any) => (
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-surface-sunken border border-border text-text-muted font-medium">
            {e.previous_status}
          </span>
          <span className="text-text-muted">→</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
              e.new_status === "REVOKED"
                ? "bg-err-bg text-err-fg border-err-border"
                : e.new_status === "SUSPENDED"
                ? "bg-warn-bg text-warn-fg border-warn-border"
                : "bg-ok-bg text-ok-fg border-ok-border"
            }`}
          >
            {e.new_status}
          </span>
        </div>
      ),
    },
    {
      key: "reason",
      header: "Audit Note / Reason",
      render: (e: any) => <span className="text-xs text-text-muted">{e.reason || "Standard lifecycle update"}</span>,
    },
    {
      key: "tx_hash",
      header: "On-Chain TX",
      render: (e: any) =>
        e.onchain_tx_hash ? (
          <CopyableValue value={e.onchain_tx_hash} kind="tx" />
        ) : (
          <span className="text-xs text-text-muted">—</span>
        ),
    },
    {
      key: "time",
      header: "Timestamp",
      render: (e: any) => <span className="text-xs text-text-muted">{formatDate(e.createdAt || e.created_at)}</span>,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Consortium Audit Trail"
        description="Immutable cryptographic records of all organizational governance actions and credential lifecycle events."
        actions={
          <Link to="/oversight">
            <Button variant="secondary" icon={<ArrowLeft size={16} />}>
              Back to Governance
            </Button>
          </Link>
        }
      />

      {/* Governance Events Table */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-accent" />
          <h2 className="text-sm font-semibold text-text">Organizational Governance Events</h2>
        </div>
        <DataTable
          columns={governanceColumns}
          data={data?.governanceEvents || []}
          loading={loading}
          emptyState={{
            title: "No governance events recorded",
            description: "No proposals or node approvals have been submitted yet.",
          }}
        />
      </div>

      {/* Credential Lifecycle Status Events Table */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center gap-2">
          <History size={18} className="text-accent" />
          <h2 className="text-sm font-semibold text-text">Credential Lifecycle State Transitions</h2>
        </div>
        <DataTable
          columns={statusColumns}
          data={data?.statusEvents || []}
          loading={loading}
          emptyState={{
            title: "No status transitions found",
            description: "No credentials have been revoked, suspended, or reactivated yet.",
          }}
        />
      </div>
    </div>
  );
}
