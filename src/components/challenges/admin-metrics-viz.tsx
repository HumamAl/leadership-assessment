"use client";

// Animated metric bars — Challenge 3: Admin analytics
// Bars animate from 0 to target value on mount via CSS transition

import { useEffect, useState } from "react";

interface AdminMetric {
  label: string;
  target: number;
  unit: string;
  targetLabel: string;
  status: "success" | "warning" | "primary";
  note: string;
}

const metrics: AdminMetric[] = [
  {
    label: "Assessment Completion Rate",
    target: 87,
    unit: "%",
    targetLabel: "Target: 85%+",
    status: "success",
    note: "Sessions that reached submission",
  },
  {
    label: "Score Classification Accuracy",
    target: 98,
    unit: "%",
    targetLabel: "Target: ±2% error",
    status: "success",
    note: "Correct strength / dev-area classification",
  },
  {
    label: "Email Report Delivery Rate",
    target: 96,
    unit: "%",
    targetLabel: "Target: 95%+",
    status: "success",
    note: "Reports delivered within 5 min of completion",
  },
  {
    label: "Avg. Time to Complete",
    target: 72,
    unit: "%",
    targetLabel: "Target: <15 min",
    status: "primary",
    note: "72% of respondents finish in under 12 min",
  },
];

const statusColors: Record<AdminMetric["status"], string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  primary: "var(--primary)",
};

export function AdminMetricsViz() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after first paint so CSS transition fires
    const timer = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-4">
      <p className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground">
        Admin dashboard — population-level KPIs
      </p>
      <div className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium">{metric.label}</p>
                <p className="text-[10px] text-muted-foreground">{metric.note}</p>
              </div>
              <div className="text-right shrink-0">
                <p
                  className="text-sm font-semibold font-mono"
                  style={{ color: statusColors[metric.status] }}
                >
                  {metric.target}
                  {metric.unit}
                </p>
                <p className="text-[10px] text-muted-foreground">{metric.targetLabel}</p>
              </div>
            </div>
            <div className="h-2 rounded-full bg-border/50 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: animated ? `${metric.target}%` : "0%",
                  backgroundColor: statusColors[metric.status],
                  transition: "width 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex items-start gap-2 rounded-md px-3 py-2"
        style={{
          backgroundColor: "color-mix(in oklch, var(--primary) 6%, transparent)",
          borderColor: "color-mix(in oklch, var(--primary) 18%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-[11px] text-primary font-medium">
          Lowest competency surfaced automatically — admin sees "Strategic Thinking 58% avg" without opening a single individual report.
        </p>
      </div>
    </div>
  );
}
