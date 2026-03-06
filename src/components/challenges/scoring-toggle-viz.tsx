"use client";

// Interactive before/after toggle — Challenge 2: Scoring engine
// Shows raw Likert responses vs. computed competency profile
// Interactive element: toggle between "Raw Responses" and "Scored Profile"

import { useState } from "react";
import { X, Check, TrendingUp, AlertCircle } from "lucide-react";

const rawResponses = [
  { q: "Q-01 (Communication)", val: 4 },
  { q: "Q-02 (Communication)", val: 3 },
  { q: "Q-03 (Communication)", val: 5 },
  { q: "Q-04 (Strategic Thinking)", val: 2 },
  { q: "Q-05 (Strategic Thinking)", val: 3 },
  { q: "Q-06 (Decision Making)", val: 4 },
  { q: "Q-07 (Decision Making)", val: 4 },
  { q: "Q-08 (Team Development)", val: 5 },
];

const scoredProfile = [
  { category: "Communication", pct: 80, classification: "strength" as const },
  { category: "Strategic Thinking", pct: 58, classification: "development_area" as const },
  { category: "Decision Making", pct: 72, classification: "on_track" as const },
  { category: "Team Development", pct: 88, classification: "strength" as const },
  { category: "Adaptability", pct: 64, classification: "development_area" as const },
  { category: "Emotional Intelligence", pct: 76, classification: "strength" as const },
];

const classificationConfig = {
  strength: {
    label: "Strength",
    barColor: "var(--success)",
    textColor: "text-[color:var(--success)]",
    icon: TrendingUp,
  },
  on_track: {
    label: "On Track",
    barColor: "var(--primary)",
    textColor: "text-primary",
    icon: Check,
  },
  development_area: {
    label: "Dev Area",
    barColor: "var(--warning)",
    textColor: "text-[color:var(--warning)]",
    icon: AlertCircle,
  },
};

export function ScoringToggleViz() {
  const [view, setView] = useState<"raw" | "scored">("raw");

  return (
    <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-3">
      {/* Toggle controls */}
      <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-card p-1 w-fit">
        <button
          onClick={() => setView("raw")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            view === "raw"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={{ transitionDuration: "120ms" }}
        >
          Raw Responses
        </button>
        <button
          onClick={() => setView("scored")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            view === "scored"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={{ transitionDuration: "120ms" }}
        >
          Scored Profile
        </button>
      </div>

      {/* Raw responses view */}
      {view === "raw" && (
        <div
          className="rounded-lg border p-3 space-y-1.5"
          style={{
            backgroundColor: "color-mix(in oklch, var(--destructive) 6%, transparent)",
            borderColor: "color-mix(in oklch, var(--destructive) 18%, transparent)",
          }}
        >
          <p className="text-xs font-medium text-[color:var(--destructive)] mb-2">
            35 individual 1–5 ratings — no interpretation possible
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {rawResponses.map((r) => (
              <div key={r.q} className="flex items-center gap-2">
                <X className="w-3 h-3 shrink-0 text-[color:var(--destructive)]" />
                <span className="text-[11px] text-muted-foreground truncate">{r.q}</span>
                <span className="text-[11px] font-mono font-medium text-[color:var(--destructive)] shrink-0">
                  {r.val}/5
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 col-span-2">
              <X className="w-3 h-3 shrink-0 text-[color:var(--destructive)]" />
              <span className="text-[11px] text-muted-foreground">
                + 27 more ratings with no context
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Scored profile view */}
      {view === "scored" && (
        <div
          className="rounded-lg border p-3 space-y-2.5"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
            borderColor: "color-mix(in oklch, var(--success) 18%, transparent)",
          }}
        >
          <p className="text-xs font-medium text-[color:var(--success)] mb-2">
            6 competency scores with classification — ready for email report
          </p>
          {scoredProfile.map((s) => {
            const cfg = classificationConfig[s.classification];
            const Icon = cfg.icon;
            return (
              <div key={s.category} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3 h-3 shrink-0 ${cfg.textColor}`} />
                    <span className="text-xs font-medium">{s.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${cfg.textColor}`}
                      style={{
                        backgroundColor: `color-mix(in oklch, ${cfg.barColor} 10%, transparent)`,
                      }}
                    >
                      {cfg.label}
                    </span>
                    <span className="text-xs font-mono font-semibold text-foreground">
                      {s.pct}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-border/40 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${s.pct}%`,
                      backgroundColor: cfg.barColor,
                      transitionDuration: "400ms",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[10px] text-muted-foreground">
        Scoring thresholds: Strength ≥ 75% · On Track 65–74% · Development Area &lt;65%
      </p>
    </div>
  );
}
