import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers build assessment tools as a simple form dump — questions on one page, a score calculated at the end, and a static PDF emailed out. That approach breaks the moment a user closes the tab mid-way through 35 questions, or when the admin wants to know which competency is weakest across 200 respondents.",
  differentApproach:
    "I architect the three layers separately: a persistent multi-step flow that survives tab closes, a scoring engine that classifies competencies into strengths and development areas, and an admin analytics layer that aggregates individual profiles into population-level insights — all working together in this demo.",
  accentWord: "three layers separately",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Multi-Step Assessment Flow with State Persistence",
    description:
      "35 questions across 6 competency categories means users will close the tab. A flat form loses their progress. The questionnaire needs per-question state that survives navigation, a clear progress indicator per category, and smooth transitions so the experience feels like a guided conversation — not a survey.",
    visualizationType: "flow",
    outcome:
      "Could reduce assessment drop-off by 30–40% through persistent state and clear per-category progress indicators — users who close mid-assessment pick up exactly where they stopped.",
  },
  {
    id: "challenge-2",
    title: "Scoring Engine and Results Visualization",
    description:
      "Converting 35 raw Likert-scale ratings into a readable leadership profile isn't just averaging. The engine needs to weight by category, handle edge cases like uniform 3-scores (no useful signal), and classify each competency as a strength (75%+), on-track (65–74%), or development area (below 65%) before generating the report.",
    visualizationType: "before-after",
    outcome:
      "Could transform 35 raw data points into a scored leadership profile in under 2 seconds, with automatic strength and development-area classification ready for the email report.",
  },
  {
    id: "challenge-3",
    title: "Admin Analytics with Population-Level Insights",
    description:
      "Individual results are only half the picture. The admin needs completion rates, score distributions across cohorts, and which competency scores lowest across all respondents — not just raw numbers. The challenge is surfacing actionable signals without overwhelming the dashboard with tables of averages.",
    visualizationType: "metrics",
    outcome:
      "Could surface the lowest-scoring leadership competency across an entire cohort in a single glance, giving the admin a targeted starting point for development programs rather than a spreadsheet to interpret.",
  },
];
