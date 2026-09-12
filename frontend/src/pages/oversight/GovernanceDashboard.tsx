import { useState, useEffect } from "react";
import { governanceApi } from "../../services/api";
import { useApi } from "../../hooks/useApi";
import { Button } from "../../components/ui/Button";
import { Input, Select } from "../../components/ui/Input";
import { StatsCard } from "../../components/ui/StatsCard";
import { PageHeader } from "../../components/ui/PageHeader";
import { Panel } from "../../components/ui/Panel";
import { DataTable } from "../../components/ui/DataTable";
import { Link } from "react-router-dom";
import type { Organization } from "../../types";
import { Building2, CheckCircle2, Clock, Activity, FileText, UserPlus, ShieldAlert, Check } from "lucide-react";

interface GovernanceStats {
  totalOrgs: number;
  activeOrgs: number;
  pendingOrgs: number;
  totalGovernanceEvents: number;
  totalStatusEvents: number;
}

export default function GovernanceDashboard() {
  const [name, setName] = useState("");
  const [onchainAddress, setOnchainAddress] = useState("");
  const [orgType, setOrgType] = useState<"ISSUER" | "VERIFIER" | "BOTH">("ISSUER");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<GovernanceStats | null>(null);

  const { run: fetchPending, data: pendingOrgs } = useApi<Organization[]>(governanceApi.listPendingMembers);
  const { run: fetchOrgs, data: allOrgs, loading } = useApi<Organization[]>(governanceApi.listOrganizations);

  useEffect(() => {
    fetchPending();
    fetchOrgs();
    governanceApi.stats().then((r) => setStats(r.data)).catch(() => {});
  }, [fetchPending, fetchOrgs]);

  async function handlePropose(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      await governanceApi.proposeMember({
        name,
        onchain_address: onchainAddress,
        type: orgType,
        credential_types_authorized: [],
      });
      setMessage(`Proposed "${name}" successfully.`);
      setName("");
      setOnchainAddress("");
      fetchPending();
      fetchOrgs();
      governanceApi.stats().then((r) => setStats(r.data)).catch(() => {});
    } catch (err: any) {
      setMessage(err?.response?.data?.error || "Failed to propose member");
    } finally {
      setBusy(false);
    }
  }

  async function handleApprove(orgId: string) {
    try {
      await governanceApi.approveMember(orgId);
      setMessage("Member approved successfully.");
      fetchPending();
      fetchOrgs();
      governanceApi.stats().then((r) => setStats(r.data)).catch(() => {});
    } catch (err: any) {
      setMessage(err?.response?.data?.error || "Approval failed");
    }
  }

  const columns = [
    {
      key: "name",
      header: "Organization Name",
      render: (org: Organization) => (
        <div>
          <span className="font-semibold text-text">{org.name}</span>
          <p className="font-mono text-[11px] text-text-muted">{org.id.slice(0, 10)}...</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Role / Type",
      render: (org: Organization) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-sunken border border-border text-text">
          {org.type}
        </span>
      ),
    },
    {
      key: "status",
      header: "Membership Status",
      render: (org: Organization) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            org.status === "ACTIVE"
              ? "bg-ok-bg text-ok-fg border-ok-border"
              : org.status === "PENDING"
              ? "bg-warn-bg text-warn-fg border-warn-border"
              : "bg-err-bg text-err-fg border-err-border"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              org.status === "ACTIVE" ? "bg-ok-fg" : org.status === "PENDING" ? "bg-warn-fg" : "bg-err-fg"
            }`}
          />
          {org.status}
        </span>
      ),
    },
    {
      key: "address",
      header: "Blockchain Address",
      render: (org: Organization) => (
        <span className="font-mono text-xs text-text-muted">
          {org.onchain_address ? `${org.onchain_address.slice(0, 10)}...${org.onchain_address.slice(-6)}` : "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Network Governance & Oversight"
        description="Regulate participating institutions, approve decentralized identities, and inspect consortium audit trails."
        actions={
          <Link to="/oversight/audit">
            <Button variant="secondary" icon={<FileText size={16} />}>
              Consortium Audit Log
            </Button>
          </Link>
        }
      />

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatsCard
            label="Total Institutions"
            value={stats.totalOrgs}
            color="accent"
            icon={<Building2 size={20} className="text-accent" />}
          />
          <StatsCard
            label="Active Consortium Nodes"
            value={stats.activeOrgs}
            color="ok"
            icon={<CheckCircle2 size={20} className="text-ok-fg" />}
          />
          <StatsCard
            label="Pending Approvals"
            value={stats.pendingOrgs}
            color="warn"
            icon={<Clock size={20} className="text-warn-fg" />}
          />
          <StatsCard
            label="Total Ledger Events"
            value={stats.totalGovernanceEvents}
            color="default"
            icon={<Activity size={20} className="text-text-muted" />}
          />
        </div>
      )}

      {/* Pending Approvals Panel */}
      {pendingOrgs && pendingOrgs.length > 0 && (
        <Panel title={`Pending Consortium Approvals (${pendingOrgs.length})`} variant="elevated">
          <div className="space-y-3">
            {pendingOrgs.map((org) => (
              <div
                key={org.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-warn-border bg-warn-bg/20"
              >
                <div>
                  <p className="text-sm font-semibold text-text">{org.name}</p>
                  <p className="text-xs font-mono text-text-muted mt-0.5">{org.onchain_address}</p>
                  <span className="inline-block mt-1 text-[11px] font-medium text-warn-fg uppercase tracking-wider">
                    Requested Type: {org.type}
                  </span>
                </div>
                <Button
                  onClick={() => handleApprove(org.id)}
                  variant="primary"
                  size="sm"
                  icon={<Check size={14} />}
                >
                  Approve Node
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* Propose New Member Form */}
      <Panel title="Propose New Institutional Node" variant="default">
        <form onSubmit={handlePropose} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Organization Legal Name"
              placeholder="e.g. Dhaka University Registry"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Ethereum On-Chain Address"
              placeholder="0x..."
              value={onchainAddress}
              onChange={(e) => setOnchainAddress(e.target.value)}
              required
            />
            <Select
              label="Authorized Consortium Role"
              value={orgType}
              onChange={(e) => setOrgType(e.target.value as any)}
              options={[
                { value: "ISSUER", label: "Issuer (Issues credentials)" },
                { value: "VERIFIER", label: "Verifier (Audits presentations)" },
                { value: "BOTH", label: "Both (Issuance & Verification)" },
              ]}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              {message && (
                <p
                  className={`text-xs font-medium ${
                    message.includes("success") || message.includes("approved") ? "text-ok-fg" : "text-err-fg"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant="primary"
              loading={busy}
              disabled={busy || !name.trim() || !onchainAddress.trim()}
              icon={<UserPlus size={15} />}
            >
              Submit Governance Proposal
            </Button>
          </div>
        </form>
      </Panel>

      {/* All Organizations Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text">Participating Consortium Organizations</h3>
        <DataTable columns={columns} data={allOrgs || []} loading={loading} />
      </div>
    </div>
  );
}
