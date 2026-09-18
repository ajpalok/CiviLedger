import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { StatsCard } from "../../components/ui/StatsCard";
import { PageHeader } from "../../components/ui/PageHeader";
import { Panel } from "../../components/ui/Panel";
import { verifierApi } from "../../services/api";
import { Html5Qrcode } from "html5-qrcode";
import { QrCode, Camera, ShieldCheck, CheckCircle2, XCircle, Search, AlertCircle, StopCircle } from "lucide-react";

interface VerifierStats {
  totalVerifications: number;
  passed: number;
  failed: number;
}

export default function ScanPresentation() {
  const [token, setToken] = useState("");
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stats, setStats] = useState<VerifierStats | null>(null);
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);

  function extractToken(text: string): string {
    const match = text.match(/\/verify\/([a-zA-Z0-9]+)/);
    if (match) return match[1];
    return text.trim();
  }

  async function startScanning() {
    setCameraError(null);
    setScanning(true);

    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          const extractedToken = extractToken(decodedText);
          setToken(extractedToken);
          // Stop and clean up before navigating to prevent React DOM manipulation errors
          scanner.stop().then(() => {
            scanner.clear();
            setScanning(false);
            navigate(`/verifier/result/${extractedToken}`);
          }).catch(() => {
            setScanning(false);
            navigate(`/verifier/result/${extractedToken}`);
          });
        },
        () => {}
      );
    } catch (err: any) {
      setCameraError(err?.message || "Camera access not allowed or unavailable. Please use the manual token input.");
      setScanning(false);
      if (scannerRef.current) {
        try { scannerRef.current.clear(); } catch (e) {}
      }
    }
  }

  function stopScanning() {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        scannerRef.current?.clear();
      }).catch(() => {});
      scannerRef.current = null;
    }
    setScanning(false);
  }

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    verifierApi.stats().then((r) => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Verify Credential Presentation"
        description="Scan a citizen's dynamic QR code or submit a cryptographic share token to inspect validity and blockchain status."
        actions={
          <Link
            to="/verifier/history"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-control border border-line bg-surface text-sm font-medium text-ink hover:bg-surface-sunken transition-colors"
          >
            View History
          </Link>
        }
      />

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <StatsCard
            label="Total Audited"
            value={stats.totalVerifications}
            color="accent"
            icon={<ShieldCheck size={20} className="text-accent" />}
          />
          <StatsCard
            label="Verified & Valid"
            value={stats.passed}
            color="ok"
            icon={<CheckCircle2 size={20} className="text-ok-fg" />}
          />
          <StatsCard
            label="Tampered / Failed"
            value={stats.failed}
            color="danger"
            icon={<XCircle size={20} className="text-err-fg" />}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Scanner Section */}
        <Panel title="Scan Live QR Code" variant="elevated">
          <p className="text-xs text-text-muted mb-4 leading-relaxed">
            Point your device camera at the citizen's presented QR code for instantaneous zero-knowledge verification.
          </p>

          {/* QR Reader Container */}
          <div
            className="w-full rounded-xl overflow-hidden mb-4 border border-border bg-black/10"
            style={{ display: scanning ? "block" : "none", minHeight: scanning ? "250px" : "0" }}
            dangerouslySetInnerHTML={{ __html: '<div id="qr-reader" style="width:100%"></div>' }}
          />

          {!scanning ? (
            <Button
              onClick={startScanning}
              variant="primary"
              className="w-full"
              icon={<Camera size={16} />}
            >
              Start Live Camera Scanner
            </Button>
          ) : (
            <Button
              onClick={stopScanning}
              variant="secondary"
              className="w-full"
              icon={<StopCircle size={16} />}
            >
              Stop Scanner
            </Button>
          )}

          {cameraError && (
            <div className="mt-3 p-3 rounded-lg bg-err-bg border border-err-border text-err-fg text-xs flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}
        </Panel>

        {/* Manual Input Section */}
        <Panel title="Manual Presentation Token" variant="elevated">
          <p className="text-xs text-text-muted mb-4 leading-relaxed">
            Alternatively, paste the presentation link or raw cryptographic share token provided by the credential holder.
          </p>

          <div className="space-y-4">
            <Input
              label="Share Token or Presentation URL"
              placeholder="e.g. pres_8f92a1... or https://.../verify/..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && token) {
                  const t = extractToken(token);
                  navigate(`/verifier/result/${t}`);
                }
              }}
              leadingIcon={<QrCode size={16} />}
            />

            <Button
              onClick={() => {
                const t = extractToken(token);
                navigate(`/verifier/result/${t}`);
              }}
              disabled={!token.trim()}
              variant="secondary"
              className="w-full"
              icon={<Search size={15} />}
            >
              Inspect Presentation
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
