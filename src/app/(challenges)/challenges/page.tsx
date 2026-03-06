// Tab 2 — My Approach
// Server component — no "use client"

import type { ReactNode } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { challenges, executiveSummary } from "@/data/challenges";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { AssessmentFlowViz } from "@/components/challenges/assessment-flow-viz";
import { ScoringToggleViz } from "@/components/challenges/scoring-toggle-viz";
import { AdminMetricsViz } from "@/components/challenges/admin-metrics-viz";

export const metadata = { title: "My Approach | SkillPulse Demo" };

export default function ChallengesPage() {
  // Accent word highlighting in the executive summary differentApproach sentence
  const { commonApproach, differentApproach, accentWord } = executiveSummary;
  const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));

  // Per-challenge visualization components
  const vizMap: Record<string, ReactNode> = {
    "challenge-1": <AssessmentFlowViz />,
    "challenge-2": <ScoringToggleViz />,
    "challenge-3": <AdminMetricsViz />,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 space-y-8">

        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Approach</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How I would tackle the three core technical layers in this project
          </p>
        </div>

        {/* Executive summary — dark banner */}
        <div
          className="relative overflow-hidden rounded-lg p-6 md:p-8 space-y-4"
          style={{
            background: "oklch(0.10 0.02 var(--primary-h, 170))",
            backgroundImage:
              "radial-gradient(ellipse at 25% 50%, oklch(0.55 0.15 170 / 0.08), transparent 65%)",
          }}
        >
          <p className="text-sm md:text-base leading-relaxed text-white/50">
            {commonApproach}
          </p>
          <hr className="border-white/10" />
          <p className="text-base md:text-lg leading-relaxed font-medium text-white/90">
            {parts.map((part, i) =>
              part.toLowerCase() === accentWord.toLowerCase() ? (
                <span key={i} className="text-primary font-semibold">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
          <p className="text-xs text-white/40">
            <Link
              href="/"
              className="hover:text-white/70 transition-colors underline underline-offset-2"
              style={{ transitionDuration: "120ms" }}
            >
              Back to the live demo
            </Link>
          </p>
        </div>

        {/* Challenge cards */}
        <div className="flex flex-col gap-4">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              title={`${String(index + 1).padStart(2, "0")}. ${challenge.title}`}
              description={challenge.description}
              outcome={undefined}
            >
              {vizMap[challenge.id]}

              {/* Outcome statement — rendered inside card, below visualization */}
              {challenge.outcome && (
                <div
                  className="flex items-start gap-2 rounded-md px-3 py-2"
                  style={{
                    backgroundColor:
                      "color-mix(in oklch, var(--success) 6%, transparent)",
                    borderColor:
                      "color-mix(in oklch, var(--success) 18%, transparent)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                >
                  <TrendingUp className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
                  <p className="text-xs font-medium text-[color:var(--success)]">
                    {challenge.outcome}
                  </p>
                </div>
              )}
            </ChallengeCard>
          ))}
        </div>

        {/* CTA closer */}
        <section
          className="p-6 rounded-lg border"
          style={{
            borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
            background:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 4%, transparent), transparent)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold mb-1">
                Ready to discuss the approach?
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                These aren&apos;t hypotheticals — I built working versions of all three
                layers in this demo. Happy to walk through any of it on a call.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/proposal"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                style={{ transitionDuration: "120ms" }}
              >
                See the proposal &rarr;
              </Link>
              <span
                className="text-xs font-medium px-3 py-1.5 rounded-lg border text-primary"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklch, var(--primary) 10%, transparent), color-mix(in oklch, var(--primary) 5%, transparent))",
                  borderColor:
                    "color-mix(in oklch, var(--primary) 22%, transparent)",
                }}
              >
                Reply on Upwork to start
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
