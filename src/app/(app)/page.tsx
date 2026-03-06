"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import {
  Users,
  CheckCircle2,
  Star,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
} from "lucide-react";
import {
  dashboardStats,
  monthlyCompletionTrend,
  competencyChartData,
  assessmentResponses,
} from "@/data/mock-data";
import type { AssessmentResponse } from "@/lib/types";
import { DemoBanner } from "@/components/layout/conversion-elements";

// ── SSR-safe dynamic chart imports ────────────────────────────────────────────
const CompletionsChart = dynamic(
  () =>
    import("@/components/dashboard/completions-chart").then(
      (m) => ({ default: m.CompletionsChart })
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] bg-muted/30 rounded-lg animate-pulse" />
    ),
  }
);

const CompetencyBarChart = dynamic(
  () =>
    import("@/components/dashboard/competency-bar-chart").then(
      (m) => ({ default: m.CompetencyBarChart })
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[240px] bg-muted/30 rounded-lg animate-pulse" />
    ),
  }
);

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Stat card ─────────────────────────────────────────────────────────────────
interface StatDef {
  title: string;
  rawValue: number;
  change: number;
  format: "integer" | "percent" | "score" | "count";
  icon: React.ReactNode;
  description: string;
  changeContext: string;
}

function StatCard({ stat, index }: { stat: StatDef; index: number }) {
  const { count, ref } = useCountUp(
    stat.format === "percent" || stat.format === "score"
      ? Math.round(stat.rawValue * 10)
      : stat.rawValue,
    1000 + index * 80
  );

  const displayValue = useMemo(() => {
    if (stat.format === "percent") return `${(count / 10).toFixed(1)}%`;
    if (stat.format === "score") return `${(count / 10).toFixed(1)}`;
    return String(count);
  }, [count, stat.format]);

  const isPositiveGood = stat.title !== "Pending Reports";
  const changeIsGood =
    isPositiveGood ? stat.change >= 0 : stat.change <= 0;

  const TrendIcon =
    stat.change > 0
      ? TrendingUp
      : stat.change < 0
      ? TrendingDown
      : Minus;

  return (
    <div
      ref={ref}
      className="aesthetic-card animate-fade-up-in"
      style={{
        padding: "var(--card-padding)",
        animationDelay: `${index * 50}ms`,
        animationDuration: "200ms",
        animationFillMode: "both",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
        <div className="p-1.5 rounded-md bg-primary/8 text-primary">
          {stat.icon}
        </div>
      </div>

      <p className="text-3xl font-bold font-mono tabular-nums tracking-tight text-foreground">
        {displayValue}
      </p>

      <div className="flex items-center gap-1.5 mt-2">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 text-xs font-medium",
            changeIsGood ? "text-success" : "text-destructive"
          )}
        >
          <TrendIcon className="w-3 h-3" />
          {Math.abs(stat.change)}
          {stat.format === "percent" || stat.format === "score" ? "pp" : ""}
        </span>
        <span className="text-xs text-muted-foreground">· {stat.changeContext}</span>
      </div>

      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: AssessmentResponse["status"] }) {
  const map: Record<
    AssessmentResponse["status"],
    { label: string; className: string }
  > = {
    completed: {
      label: "Completed",
      className:
        "bg-success/10 text-success border border-success/20",
    },
    report_sent: {
      label: "Report Sent",
      className:
        "bg-primary/10 text-primary border border-primary/20",
    },
    in_progress: {
      label: "In Progress",
      className:
        "bg-warning/10 text-warning-foreground border border-warning/20",
    },
    pending_review: {
      label: "Pending Review",
      className:
        "bg-muted text-muted-foreground border border-border/60",
    },
  };

  const { label, className } = map[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        className
      )}
    >
      {label}
    </span>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AssessmentOverviewPage() {
  const [chartView, setChartView] = useState<"completions" | "both">(
    "completions"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    AssessmentResponse["status"] | "all"
  >("all");

  // Stat card definitions
  const stats: StatDef[] = [
    {
      title: "Total Assessments",
      rawValue: dashboardStats.totalAssessments,
      change: dashboardStats.assessmentsChange,
      format: "integer",
      icon: <Users className="w-4 h-4" />,
      description: `${dashboardStats.totalAssessments} respondents assessed this period`,
      changeContext: "vs. prior 30 days",
    },
    {
      title: "Completion Rate",
      rawValue: dashboardStats.completionRate,
      change: dashboardStats.completionRateChange,
      format: "percent",
      icon: <CheckCircle2 className="w-4 h-4" />,
      description: "16 of 18 started assessments fully submitted",
      changeContext: "vs. prior 30 days",
    },
    {
      title: "Avg Leadership Score",
      rawValue: dashboardStats.averageLeadershipScore,
      change: dashboardStats.averageScoreChange,
      format: "score",
      icon: <Star className="w-4 h-4" />,
      description: "Cross-competency mean · benchmark: 71.7%",
      changeContext: "vs. prior cohort",
    },
    {
      title: "Pending Reports",
      rawValue: dashboardStats.pendingReports,
      change: dashboardStats.pendingReportsChange,
      format: "count",
      icon: <Clock className="w-4 h-4" />,
      description: "Awaiting admin review before delivery",
      changeContext: "vs. prior period",
    },
  ];

  // Filter respondents table
  const filteredRespondents = useMemo(() => {
    let rows = assessmentResponses.slice(0, 10);
    if (statusFilter !== "all") {
      rows = rows.filter((r) => r.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.respondentName.toLowerCase().includes(q) ||
          r.respondentRole.toLowerCase().includes(q) ||
          (r.respondentOrg ?? "").toLowerCase().includes(q)
      );
    }
    return rows;
  }, [statusFilter, searchQuery]);

  return (
    <div className="page-container space-y-6">
      {/* ── Page header ─────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight aesthetic-heading">
          Assessment Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track respondent progress and leadership insights across your cohort
        </p>
      </div>

      {/* ── KPI Stat Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      {/* ── Monthly Completions Chart ────────────────────────── */}
      <div className="aesthetic-card" style={{ padding: "0" }}>
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ padding: "var(--card-padding)" }}
        >
          <div>
            <h2 className="text-base font-semibold">Monthly Completion Trend</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Assessments completed per month · Sep 2025 – Feb 2026
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            {(["completions", "both"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setChartView(view)}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-md border transition-colors",
                  chartView === view
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-muted-foreground hover:bg-muted/50"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                {view === "completions" ? "Completions" : "+ Avg Score"}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 pb-4">
          <CompletionsChart
            data={monthlyCompletionTrend}
            showScore={chartView === "both"}
          />
        </div>
      </div>

      {/* ── Competency Averages vs Benchmark ─────────────────── */}
      <div className="aesthetic-card" style={{ padding: "0" }}>
        <div style={{ padding: "var(--card-padding)" }}>
          <h2 className="text-base font-semibold">Competency Averages vs. Benchmark</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Population-level scores across all 6 leadership competencies · teal bars exceed benchmark
          </p>
        </div>
        <div className="px-4 pb-4">
          <CompetencyBarChart data={competencyChartData} />
        </div>
      </div>

      {/* ── Recent Respondents Table ──────────────────────────── */}
      <div className="aesthetic-card" style={{ padding: "0" }}>
        {/* Table header + filters */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60"
          style={{ padding: "var(--card-padding)" }}
        >
          <div>
            <h2 className="text-base font-semibold">Recent Respondents</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Latest {filteredRespondents.length} assessment submissions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search respondents…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-md border border-border/60 bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring w-48"
              />
            </div>
            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as AssessmentResponse["status"] | "all")
              }
              className="px-3 py-1.5 text-xs rounded-md border border-border/60 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All Statuses</option>
              <option value="report_sent">Report Sent</option>
              <option value="pending_review">Pending Review</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                  Respondent
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">
                  Role
                </th>
                <th className="px-4 py-2.5 text-center text-xs font-medium text-muted-foreground">
                  Overall Score
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">
                  Completion Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRespondents.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    No respondents match your current filters.
                  </td>
                </tr>
              ) : (
                filteredRespondents.map((respondent, i) => (
                  <tr
                    key={respondent.id}
                    className={cn(
                      "border-b border-border/40 aesthetic-hover",
                      i % 2 === 0 ? "" : "bg-muted/10"
                    )}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-sm">{respondent.respondentName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 md:hidden">
                          {respondent.respondentRole}
                        </p>
                        {respondent.respondentOrg && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {respondent.respondentOrg}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                      {respondent.respondentRole}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {respondent.overallScore !== null ? (
                        <span
                          className={cn(
                            "font-mono font-semibold text-sm",
                            respondent.overallScore >= 75
                              ? "text-success"
                              : respondent.overallScore < 65
                              ? "text-destructive"
                              : "text-foreground"
                          )}
                        >
                          {respondent.overallScore.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          {Math.round(
                            (respondent.questionsAnswered /
                              respondent.totalQuestions) *
                              100
                          )}% complete
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={respondent.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
                      {formatDate(respondent.completedAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div
          className="flex items-center justify-between border-t border-border/40 text-xs text-muted-foreground"
          style={{ padding: "0.75rem var(--card-padding)" }}
        >
          <span>
            Showing {filteredRespondents.length} of {assessmentResponses.length} respondents
          </span>
          <span>
            {assessmentResponses.filter((r) => r.status === "in_progress").length} still in progress
          </span>
        </div>
      </div>

      {/* ── Demo Banner ──────────────────────────────────────── */}
      <DemoBanner />
    </div>
  );
}
