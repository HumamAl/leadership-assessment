"use client";

import { useState, useMemo } from "react";
import { emailDeliveries } from "@/data/mock-data";
import type { EmailDelivery, EmailDeliveryStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Mail,
  Clock,
  AlertCircle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ── Status badge ──────────────────────────────────────────────────────────────

function DeliveryStatusBadge({ status }: { status: EmailDeliveryStatus }) {
  const config: Record<
    EmailDeliveryStatus,
    { label: string; colorClass: string; icon: React.ReactNode }
  > = {
    sent: {
      label: "Sent",
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    pending: {
      label: "Pending",
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0",
      icon: <Clock className="w-3 h-3" />,
    },
    failed: {
      label: "Failed",
      colorClass: "text-destructive bg-destructive/10 border-0",
      icon: <AlertCircle className="w-3 h-3" />,
    },
  };

  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium rounded-full inline-flex items-center gap-1",
        c.colorClass
      )}
    >
      {c.icon}
      {c.label}
    </Badge>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Export notification ───────────────────────────────────────────────────────

interface ExportNotification {
  id: string;
  filename: string;
  timestamp: string;
}

// ── Sort type ─────────────────────────────────────────────────────────────────

type SortKey = "recipientName" | "status" | "attemptedAt" | "deliveredAt";

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("attemptedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [exportLog, setExportLog] = useState<ExportNotification[]>([]);
  const [exporting, setExporting] = useState<string | null>(null);

  // Counts
  const sentCount = emailDeliveries.filter((d) => d.status === "sent").length;
  const pendingCount = emailDeliveries.filter((d) => d.status === "pending").length;
  const failedCount = emailDeliveries.filter((d) => d.status === "failed").length;

  const displayed = useMemo(() => {
    const q = search.toLowerCase();
    return emailDeliveries
      .filter((d) => {
        const matchesStatus =
          statusFilter === "all" || d.status === statusFilter;
        const matchesSearch =
          q === "" ||
          d.recipientName.toLowerCase().includes(q) ||
          d.recipientEmail.toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        let av: string = "";
        let bv: string = "";
        if (sortKey === "recipientName") {
          av = a.recipientName;
          bv = b.recipientName;
        } else if (sortKey === "status") {
          av = a.status;
          bv = b.status;
        } else if (sortKey === "attemptedAt") {
          av = a.attemptedAt;
          bv = b.attemptedAt;
        } else if (sortKey === "deliveredAt") {
          av = a.deliveredAt ?? "";
          bv = b.deliveredAt ?? "";
        }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 inline ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-1" />
    );
  }

  async function handleExport(type: "responses" | "insights") {
    const key = type;
    setExporting(key);

    // Simulate a brief export delay
    await new Promise((resolve) => setTimeout(resolve, 900));

    const filename =
      type === "responses"
        ? `assessment-responses-${new Date().toISOString().slice(0, 10)}.csv`
        : `competency-insights-${new Date().toISOString().slice(0, 10)}.csv`;

    const notification: ExportNotification = {
      id: crypto.randomUUID(),
      filename,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setExportLog((prev) => [notification, ...prev.slice(0, 2)]);
    setExporting(null);
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: "recipientName", label: "Recipient" },
    { key: "status", label: "Status" },
    { key: "attemptedAt", label: "Attempted At" },
    { key: "deliveredAt", label: "Delivered At" },
  ];

  return (
    <div className="page-container space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Report Center</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage personalized report delivery and data exports
        </p>
      </div>

      {/* Delivery summary stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Reports Sent"
          count={sentCount}
          icon={<Mail className="w-4 h-4" />}
          colorClass="text-[color:var(--success)] bg-[color:var(--success)]/10"
        />
        <StatCard
          label="Pending Delivery"
          count={pendingCount}
          icon={<Clock className="w-4 h-4" />}
          colorClass="text-[color:var(--warning)] bg-[color:var(--warning)]/10"
        />
        <StatCard
          label="Failed Delivery"
          count={failedCount}
          icon={<AlertCircle className="w-4 h-4" />}
          colorClass="text-destructive bg-destructive/10"
        />
      </div>

      {/* Export section */}
      <div className="aesthetic-card p-[var(--card-padding)]">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold">Export Results</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Download assessment data for offline analysis or compliance reporting
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              disabled={exporting === "responses"}
              onClick={() => handleExport("responses")}
              className="gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4" />
              {exporting === "responses" ? "Exporting..." : "Export All Responses (CSV)"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={exporting === "insights"}
              onClick={() => handleExport("insights")}
              className="gap-1.5"
            >
              <FileText className="w-4 h-4" />
              {exporting === "insights" ? "Exporting..." : "Export Aggregated Insights (CSV)"}
            </Button>
          </div>
        </div>

        {/* Export log */}
        {exportLog.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-border/60 pt-4">
            <p className="text-xs font-medium text-muted-foreground">
              Recent exports
            </p>
            {exportLog.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)] shrink-0" />
                <span className="font-mono">{entry.filename}</span>
                <span className="text-muted-foreground/60">— {entry.timestamp}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Email delivery table */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search delivery records by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground shrink-0">
            {displayed.length}{" "}
            {displayed.length === 1 ? "delivery" : "deliveries"}
          </span>
        </div>

        <div className="aesthetic-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      {col.label}
                      <SortIcon col={col.key} />
                    </TableHead>
                  ))}
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Failure Reason
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayed.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-muted-foreground"
                    >
                      No delivery records match this filter.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayed.map((d) => (
                    <DeliveryRow key={d.id} delivery={d} />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────

function StatCard({
  label,
  count,
  icon,
  colorClass,
}: {
  label: string;
  count: number;
  icon: React.ReactNode;
  colorClass: string;
}) {
  return (
    <div className="aesthetic-card p-[var(--card-padding)] flex items-center gap-4">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", colorClass)}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold font-mono tabular-nums">{count}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

// ── Delivery row ──────────────────────────────────────────────────────────────

function DeliveryRow({ delivery: d }: { delivery: EmailDelivery }) {
  return (
    <TableRow className="hover:bg-[color:var(--surface-hover)] transition-colors">
      {/* Recipient */}
      <TableCell>
        <div className="min-w-[160px]">
          <p className="text-sm font-medium leading-tight">{d.recipientName}</p>
          <p className="text-xs text-muted-foreground">{d.recipientEmail}</p>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <DeliveryStatusBadge status={d.status} />
      </TableCell>

      {/* Attempted at */}
      <TableCell>
        <span className="text-sm text-muted-foreground font-mono text-xs whitespace-nowrap">
          {formatDateTime(d.attemptedAt)}
        </span>
      </TableCell>

      {/* Delivered at */}
      <TableCell>
        <span className="text-sm text-muted-foreground font-mono text-xs whitespace-nowrap">
          {formatDateTime(d.deliveredAt)}
        </span>
      </TableCell>

      {/* Failure reason */}
      <TableCell>
        {d.failureReason ? (
          <span
            className="text-xs text-destructive font-mono leading-tight line-clamp-2 max-w-[240px]"
            title={d.failureReason}
          >
            {d.failureReason}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground/60">—</span>
        )}
      </TableCell>
    </TableRow>
  );
}
