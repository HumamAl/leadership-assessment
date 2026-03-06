"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  competencyAggregates,
  populationInsights,
  scoreDistribution,
  COMPETENCY_CATEGORIES,
} from "@/data/mock-data";
import type { CompetencyAggregate, InsightSummary } from "@/lib/types";
import { COMPETENCY_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart2, Layers } from "lucide-react";

// ── Dynamic chart import (SSR-safe) ──────────────────────────────────────────
const ScoreHistogram = dynamic(() => import("@/components/insights/score-histogram"), {
  ssr: false,
  loading: () => (
    <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">
      Loading chart...
    </div>
  ),
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function classificationColor(
  type: "strength" | "development_area" | "on_track"
): string {
  if (type === "strength") return "var(--success)";
  if (type === "development_area") return "var(--destructive)";
  return "var(--primary)";
}

// Top 2 strengths and top 2 development areas
const topStrengths = populationInsights
  .filter((i) => i.type === "strength")
  .slice(0, 2);
const topDevelopmentAreas = populationInsights
  .filter((i) => i.type === "development_area")
  .slice(0, 2);

// ── View toggle type ──────────────────────────────────────────────────────────
type ViewMode = "competency" | "scoreband";

// ── Page ─────────────────────────────────────────────────────────────────────

export default function InsightsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("competency");

  return (
    <div className="page-container space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Skill Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Aggregated competency analysis across all respondents
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted border border-border/60">
          <button
            onClick={() => setViewMode("competency")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              viewMode === "competency"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            By Competency
          </button>
          <button
            onClick={() => setViewMode("scoreband")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              viewMode === "scoreband"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            By Score Band
          </button>
        </div>
      </div>

      {/* Top strengths and development areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="aesthetic-card p-[var(--card-padding)] space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[color:var(--success)]" />
            <p className="text-sm font-semibold">Top Strengths</p>
            <span className="text-xs text-muted-foreground">
              — population leaders
            </span>
          </div>
          <div className="space-y-3">
            {topStrengths.map((s) => (
              <StrengthBar key={s.category} insight={s} type="strength" />
            ))}
          </div>
        </div>

        {/* Development areas */}
        <div className="aesthetic-card p-[var(--card-padding)] space-y-3">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <p className="text-sm font-semibold">Development Areas</p>
            <span className="text-xs text-muted-foreground">
              — needs focus
            </span>
          </div>
          <div className="space-y-3">
            {topDevelopmentAreas.map((s) => (
              <StrengthBar key={s.category} insight={s} type="development_area" />
            ))}
          </div>
        </div>
      </div>

      {/* Main view */}
      {viewMode === "competency" ? (
        <CompetencyView aggregates={competencyAggregates} />
      ) : (
        <ScoreBandView />
      )}
    </div>
  );
}

// ── Strength / dev bar ─────────────────────────────────────────────────────

function StrengthBar({
  insight,
  type,
}: {
  insight: InsightSummary;
  type: "strength" | "development_area";
}) {
  const color =
    type === "strength" ? "var(--success)" : "var(--destructive)";
  const bgClass =
    type === "strength"
      ? "bg-[color:var(--success)]"
      : "bg-destructive";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{insight.label}</span>
        <span
          className="text-sm font-mono font-semibold tabular-nums"
          style={{ color }}
        >
          {insight.averageScore.toFixed(1)}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-300", bgClass)}
          style={{ width: `${insight.averageScore}%` }}
        />
      </div>
    </div>
  );
}

// ── Competency view ───────────────────────────────────────────────────────────

function CompetencyView({ aggregates }: { aggregates: CompetencyAggregate[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {COMPETENCY_CATEGORIES.map((cat, idx) => {
        const agg = aggregates.find((a) => a.category === cat);
        if (!agg) return null;
        const total =
          agg.strengthCount + agg.onTrackCount + agg.developmentAreaCount;
        return (
          <CompetencyCard
            key={cat}
            agg={agg}
            label={COMPETENCY_LABELS[cat]}
            total={total}
            index={idx}
          />
        );
      })}
    </div>
  );
}

function CompetencyCard({
  agg,
  label,
  total,
  index,
}: {
  agg: CompetencyAggregate;
  label: string;
  total: number;
  index: number;
}) {
  const scoreClass =
    agg.averageScore >= 75
      ? "text-[color:var(--success)]"
      : agg.averageScore < 65
      ? "text-destructive"
      : "text-primary";

  const distributionBuckets: { key: keyof CompetencyAggregate["distribution"]; label: string }[] = [
    { key: "0-20", label: "0–20" },
    { key: "21-40", label: "21–40" },
    { key: "41-60", label: "41–60" },
    { key: "61-80", label: "61–80" },
    { key: "81-100", label: "81–100" },
  ];

  const maxBucket = Math.max(...Object.values(agg.distribution));

  return (
    <div
      className="aesthetic-card p-[var(--card-padding)] space-y-4"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold leading-tight">{label}</p>
        <span className={cn("text-xl font-bold font-mono tabular-nums", scoreClass)}>
          {agg.averageScore.toFixed(1)}%
        </span>
      </div>

      {/* Distribution mini bars */}
      <div>
        <p className="text-xs text-muted-foreground mb-1.5 font-medium">
          Score distribution
        </p>
        <div className="flex items-end gap-1 h-8">
          {distributionBuckets.map((bucket) => {
            const count = agg.distribution[bucket.key];
            const heightPct = maxBucket > 0 ? (count / maxBucket) * 100 : 0;
            return (
              <div
                key={bucket.key}
                className="flex-1 flex flex-col items-center gap-0.5"
                title={`${bucket.label}: ${count} respondent${count !== 1 ? "s" : ""}`}
              >
                <div
                  className="w-full rounded-t-sm bg-primary/30 hover:bg-primary/50 transition-colors cursor-default"
                  style={{ height: `${Math.max(heightPct, count > 0 ? 15 : 0)}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-1 mt-0.5">
          {distributionBuckets.map((bucket) => (
            <div key={bucket.key} className="flex-1 text-center">
              <span className="text-[9px] text-muted-foreground/60 leading-none">
                {bucket.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Strength / On-track / Dev area counts */}
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full bg-[color:var(--success)]"
          />
          <span className="text-muted-foreground">
            {agg.strengthCount} strength
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-primary/50" />
          <span className="text-muted-foreground">
            {agg.onTrackCount} on-track
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-destructive/70" />
          <span className="text-muted-foreground">
            {agg.developmentAreaCount} dev
          </span>
        </div>
      </div>

      {/* Classification badge */}
      <div>
        {agg.averageScore >= 75 ? (
          <Badge
            variant="outline"
            className="text-xs font-medium border-0 rounded-full text-[color:var(--success)] bg-[color:var(--success)]/10"
          >
            Population Strength
          </Badge>
        ) : agg.averageScore < 65 ? (
          <Badge
            variant="outline"
            className="text-xs font-medium border-0 rounded-full text-destructive bg-destructive/10"
          >
            Development Area
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-xs font-medium border-0 rounded-full text-primary bg-primary/10"
          >
            On Track
          </Badge>
        )}
      </div>
    </div>
  );
}

// ── Score band view ──────────────────────────────────────────────────────────

function ScoreBandView() {
  return (
    <div className="aesthetic-card p-[var(--card-padding)] space-y-4">
      <div>
        <p className="text-sm font-semibold">Score Distribution</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Number of respondents in each overall leadership score range
        </p>
      </div>
      <div className="h-64">
        <ScoreHistogram data={scoreDistribution} />
      </div>

      {/* Score band legend */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/60">
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block w-3 h-3 rounded bg-destructive/60" />
          <span className="text-muted-foreground">
            Below 65% — Development focus
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block w-3 h-3 rounded bg-primary/60" />
          <span className="text-muted-foreground">
            65–75% — On track
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block w-3 h-3 rounded bg-[color:var(--success)]/60" />
          <span className="text-muted-foreground">
            75%+ — Leadership strength
          </span>
        </div>
      </div>
    </div>
  );
}
