// Flow diagram — Challenge 1: Multi-step assessment flow
// No "use client" needed — pure render, no hooks

import type { ElementType } from "react";
import {
  LogIn,
  LayoutList,
  SlidersHorizontal,
  HardDrive,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowStep {
  label: string;
  sub: string;
  icon: ElementType;
  highlight?: boolean;
}

const steps: FlowStep[] = [
  {
    label: "Question Entry",
    sub: "Name + email",
    icon: LogIn,
  },
  {
    label: "Category Nav",
    sub: "6 competencies",
    icon: LayoutList,
    highlight: true,
  },
  {
    label: "Progress Tracking",
    sub: "Per-category %",
    icon: SlidersHorizontal,
    highlight: true,
  },
  {
    label: "Response Storage",
    sub: "localStorage persist",
    icon: HardDrive,
  },
  {
    label: "Completion",
    sub: "Score + report",
    icon: CheckCircle2,
  },
];

export function AssessmentFlowViz() {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
      <p className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground mb-3">
        Assessment flow — 35 questions across 6 categories
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors",
                step.highlight
                  ? "border-primary bg-primary/8 text-primary"
                  : "border-border/60 bg-card text-foreground"
              )}
            >
              <step.icon
                className={cn(
                  "w-3.5 h-3.5 shrink-0",
                  step.highlight ? "text-primary" : "text-muted-foreground"
                )}
              />
              <div>
                <p className="text-xs font-medium leading-tight">{step.label}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {step.sub}
                </p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 hidden sm:block" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div
          className="h-1.5 rounded-full flex-1"
          style={{
            background:
              "linear-gradient(to right, color-mix(in oklch, var(--primary) 30%, transparent), var(--primary))",
          }}
        />
        <p className="text-[10px] text-muted-foreground shrink-0">
          State persists across reloads
        </p>
      </div>
    </div>
  );
}
