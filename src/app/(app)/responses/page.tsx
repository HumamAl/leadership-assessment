"use client";

import React, { useState, useMemo } from "react";
import {
  assessmentResponses,
  ASSESSMENT_STATUSES,
} from "@/data/mock-data";
import type { AssessmentResponse, AssessmentStatus } from "@/lib/types";
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
  ChevronUp,
  ChevronDown,
  Download,
  Clock,
  CheckCircle2,
} from "lucide-react";

// ── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AssessmentStatus }) {
  const config: Record<
    AssessmentStatus,
    { label: string; colorClass: string }
  > = {
    in_progress: {
      label: "In Progress",
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0",
    },
    completed: {
      label: "Completed",
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0",
    },
    pending_review: {
      label: "Pending Review",
      colorClass:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0",
    },
    report_sent: {
      label: "Report Sent",
      colorClass:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0",
    },
  };

  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-full", c.colorClass)}
    >
      {c.label}
    </Badge>
  );
}

// ── Sort helpers ──────────────────────────────────────────────────────────────

type SortKey =
  | "respondentName"
  | "respondentOrg"
  | "overallScore"
  | "status"
  | "startedAt"
  | "completedAt"
  | "minutesToComplete";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// ── Page ─────────────────────────────────────────────────────────────────────

const STATUS_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "pending_review", label: "Pending Review" },
  { value: "report_sent", label: "Report Sent" },
];

export default function ResponsesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("startedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayed = useMemo(() => {
    const q = search.toLowerCase();
    return assessmentResponses
      .filter((r) => {
        const matchesStatus =
          statusFilter === "all" || r.status === statusFilter;
        const matchesSearch =
          q === "" ||
          r.respondentName.toLowerCase().includes(q) ||
          r.respondentEmail.toLowerCase().includes(q) ||
          (r.respondentOrg ?? "").toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        let av: string | number | null;
        let bv: string | number | null;

        if (sortKey === "overallScore") {
          av = a.overallScore ?? -1;
          bv = b.overallScore ?? -1;
        } else if (sortKey === "minutesToComplete") {
          av = a.minutesToComplete ?? -1;
          bv = b.minutesToComplete ?? -1;
        } else {
          av = (a[sortKey] as string | null) ?? "";
          bv = (b[sortKey] as string | null) ?? "";
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

  function SortIndicator({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 inline ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-1" />
    );
  }

  const columns: { key: SortKey; label: string; sortable: boolean }[] = [
    { key: "respondentName", label: "Respondent", sortable: true },
    { key: "respondentOrg", label: "Organization", sortable: true },
    { key: "overallScore", label: "Overall Score", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "startedAt", label: "Started", sortable: true },
    { key: "completedAt", label: "Completed", sortable: true },
    { key: "minutesToComplete", label: "Time", sortable: true },
  ];

  return (
    <div className="page-container space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assessment Responses</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Individual respondent profiles and completion status
          </p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          <Download className="w-4 h-4 mr-1.5" />
          Export
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search respondents by name, email or org..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTER_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length}{" "}
          {displayed.length === 1 ? "respondent" : "respondents"}
        </span>
      </div>

      {/* Table */}
      <div className="aesthetic-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    onClick={
                      col.sortable ? () => handleSort(col.key) : undefined
                    }
                    className={cn(
                      "bg-muted/50 text-xs font-medium text-muted-foreground whitespace-nowrap",
                      col.sortable &&
                        "cursor-pointer select-none hover:text-foreground transition-colors"
                    )}
                  >
                    {col.label}
                    {col.sortable && <SortIndicator col={col.key} />}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No respondents match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((r) => (
                  <React.Fragment key={r.id}>
                    <TableRow
                      className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors"
                      onClick={() =>
                        setExpandedId(expandedId === r.id ? null : r.id)
                      }
                    >
                      {/* Respondent */}
                      <TableCell>
                        <div className="min-w-[160px]">
                          <p className="text-sm font-medium leading-tight">
                            {r.respondentName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {r.respondentEmail}
                          </p>
                        </div>
                      </TableCell>

                      {/* Organization */}
                      <TableCell>
                        <div className="min-w-[140px]">
                          <p className="text-sm text-muted-foreground">
                            {r.respondentOrg ?? "—"}
                          </p>
                          <p className="text-xs text-muted-foreground/70">
                            {r.respondentRole}
                          </p>
                        </div>
                      </TableCell>

                      {/* Overall score */}
                      <TableCell>
                        {r.overallScore !== null ? (
                          <div className="flex items-center gap-2 min-w-[90px]">
                            <span className="font-mono text-sm font-semibold tabular-nums">
                              {r.overallScore.toFixed(1)}%
                            </span>
                            <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${r.overallScore}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="min-w-[90px]">
                            <span className="text-xs text-muted-foreground font-mono">
                              {r.questionsAnswered}/{r.totalQuestions} answered
                            </span>
                          </div>
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <StatusBadge status={r.status} />
                      </TableCell>

                      {/* Started */}
                      <TableCell>
                        <span className="text-sm text-muted-foreground whitespace-nowrap font-mono">
                          {formatDateTime(r.startedAt)}
                        </span>
                      </TableCell>

                      {/* Completed */}
                      <TableCell>
                        <span className="text-sm text-muted-foreground whitespace-nowrap font-mono">
                          {formatDateTime(r.completedAt)}
                        </span>
                      </TableCell>

                      {/* Time */}
                      <TableCell>
                        {r.minutesToComplete !== null ? (
                          <span className="text-sm font-mono tabular-nums text-muted-foreground whitespace-nowrap">
                            {r.minutesToComplete} min
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>

                    {/* Expanded detail row */}
                    {expandedId === r.id && (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="bg-muted/30 px-6 py-4"
                        >
                          <ExpandedDetail response={r} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// ── Expanded detail panel ──────────────────────────────────────────────────

function ExpandedDetail({ response: r }: { response: AssessmentResponse }) {
  const COMPETENCY_LABELS: Record<string, string> = {
    communication: "Communication",
    strategic_thinking: "Strategic Thinking",
    decision_making: "Decision Making",
    team_development: "Team Development",
    adaptability: "Adaptability",
    emotional_intelligence: "Emotional Intelligence",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Respondent details */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Respondent Details
        </p>
        <div className="space-y-1.5 text-sm">
          <div className="flex gap-2">
            <span className="text-muted-foreground w-20 shrink-0">ID</span>
            <span className="font-mono text-xs">{r.id}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground w-20 shrink-0">Role</span>
            <span>{r.respondentRole}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground w-20 shrink-0">Email</span>
            <span className="truncate text-xs">{r.respondentEmail}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground w-20 shrink-0">Started</span>
            <span className="font-mono text-xs">{formatDate(r.startedAt)}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Completion
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Questions answered</span>
            <span className="font-mono font-semibold">
              {r.questionsAnswered} / {r.totalQuestions}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${(r.questionsAnswered / r.totalQuestions) * 100}%`,
              }}
            />
          </div>
          {r.minutesToComplete !== null && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>Completed in {r.minutesToComplete} minutes</span>
            </div>
          )}
          {r.overallScore !== null && (
            <div className="flex items-center gap-1.5 text-xs text-[color:var(--success)]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Overall score: {r.overallScore.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Competency scores */}
      {r.competencyScores.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Competency Scores
          </p>
          <div className="space-y-1.5">
            {r.competencyScores.map((cs) => (
              <div key={cs.category} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-32 shrink-0 truncate">
                  {COMPETENCY_LABELS[cs.category]}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      cs.classification === "strength"
                        ? "bg-[color:var(--success)]"
                        : cs.classification === "development_area"
                        ? "bg-destructive"
                        : "bg-primary"
                    )}
                    style={{ width: `${cs.percentageScore}%` }}
                  />
                </div>
                <span className="text-xs font-mono tabular-nums w-10 text-right">
                  {cs.percentageScore}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
