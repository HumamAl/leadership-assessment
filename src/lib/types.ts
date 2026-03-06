import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Layout / Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ---------------------------------------------------------------------------
// Challenge visualization types (Tab 2)
// ---------------------------------------------------------------------------

export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// ---------------------------------------------------------------------------
// Proposal types (Tab 3)
// ---------------------------------------------------------------------------

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ---------------------------------------------------------------------------
// Screen definition for frame-based demo formats
// ---------------------------------------------------------------------------

export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

// ---------------------------------------------------------------------------
// Conversion element variant types
// ---------------------------------------------------------------------------

export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ===========================================================================
// LEADERSHIP ASSESSMENT — Domain Types
// ===========================================================================

// ---------------------------------------------------------------------------
// Competency Categories
// ---------------------------------------------------------------------------

export type CompetencyCategory =
  | "communication"
  | "strategic_thinking"
  | "decision_making"
  | "team_development"
  | "adaptability"
  | "emotional_intelligence";

// Human-readable labels for display
export const COMPETENCY_LABELS: Record<CompetencyCategory, string> = {
  communication: "Communication",
  strategic_thinking: "Strategic Thinking",
  decision_making: "Decision Making",
  team_development: "Team Development",
  adaptability: "Adaptability",
  emotional_intelligence: "Emotional Intelligence",
};

// ---------------------------------------------------------------------------
// Assessment Questions — Likert scale (1–5)
// ---------------------------------------------------------------------------

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export const LIKERT_LABELS: Record<LikertValue, string> = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree",
};

export interface AssessmentQuestion {
  id: string;                       // "Q-001"
  category: CompetencyCategory;
  /** The statement the respondent scores from 1 (Strongly Disagree) to 5 (Strongly Agree) */
  text: string;
  /** 1-based display order within its category */
  orderInCategory: number;
}

// ---------------------------------------------------------------------------
// Individual Response (one question answered)
// ---------------------------------------------------------------------------

export interface QuestionResponse {
  questionId: string;               // references AssessmentQuestion.id
  value: LikertValue;
}

// ---------------------------------------------------------------------------
// Competency Score — computed per respondent per category
// ---------------------------------------------------------------------------

export interface CompetencyScore {
  category: CompetencyCategory;
  /** Raw average of Likert responses (1.0–5.0) */
  rawScore: number;
  /** Expressed as percentage 0–100. Below 65 = development area. */
  percentageScore: number;
  /** "strength" when >= 75%, "development_area" when < 65%, "on_track" otherwise */
  classification: "strength" | "on_track" | "development_area";
}

// ---------------------------------------------------------------------------
// Assessment Status
// ---------------------------------------------------------------------------

export type AssessmentStatus =
  | "in_progress"     // started but not submitted
  | "completed"       // submitted, scores computed
  | "pending_review"  // awaiting admin review before report delivery
  | "report_sent";    // email report successfully delivered

// ---------------------------------------------------------------------------
// Email Report Delivery Record
// ---------------------------------------------------------------------------

export type EmailDeliveryStatus = "sent" | "pending" | "failed";

export interface EmailDelivery {
  id: string;                       // "DEL-0041"
  assessmentId: string;             // references AssessmentResponse.id
  recipientEmail: string;
  recipientName: string;
  status: EmailDeliveryStatus;
  /** ISO datetime of delivery attempt */
  attemptedAt: string;
  /** ISO datetime of confirmed delivery; null if pending or failed */
  deliveredAt: string | null;
  /** SMTP or provider error code; only present when status === "failed" */
  failureReason?: string;
}

// ---------------------------------------------------------------------------
// Full Assessment Response (one individual's completed assessment)
// ---------------------------------------------------------------------------

export interface AssessmentResponse {
  id: string;                       // "ASR-4821"
  /** Individual's full name */
  respondentName: string;
  /** Individual's email address */
  respondentEmail: string;
  /** Job title or role (self-reported) */
  respondentRole: string;
  /** Organization or company (optional, self-reported) */
  respondentOrg?: string;
  status: AssessmentStatus;
  /** ISO datetime when the assessment was started */
  startedAt: string;
  /** ISO datetime when submitted; null if still in progress */
  completedAt: string | null;
  /** Time taken in minutes; null if still in progress */
  minutesToComplete: number | null;
  /** Number of questions answered out of total */
  questionsAnswered: number;
  totalQuestions: number;
  /** Individual responses (present only when status !== "in_progress") */
  responses: QuestionResponse[];
  /** Per-competency scores (computed after submission) */
  competencyScores: CompetencyScore[];
  /** Overall leadership score as percentage (0–100); average of all competency percentages */
  overallScore: number | null;
  /** Top 2 competency categories by score */
  topStrengths: CompetencyCategory[];
  /** Bottom 2 competency categories by score */
  developmentAreas: CompetencyCategory[];
}

// ---------------------------------------------------------------------------
// Aggregate Competency Stats — population-level
// ---------------------------------------------------------------------------

export interface CompetencyAggregate {
  category: CompetencyCategory;
  /** Population mean percentage score */
  averageScore: number;
  /** Standard deviation across all respondents */
  stdDeviation: number;
  /** Count of respondents who scored this as a strength (>= 75%) */
  strengthCount: number;
  /** Count of respondents who scored this as a development area (< 65%) */
  developmentAreaCount: number;
  /** Count of respondents in the on_track band */
  onTrackCount: number;
  /** Distribution: how many respondents scored in each quintile bucket */
  distribution: {
    "0-20": number;
    "21-40": number;
    "41-60": number;
    "61-80": number;
    "81-100": number;
  };
}

// ---------------------------------------------------------------------------
// Dashboard Statistics
// ---------------------------------------------------------------------------

export interface DashboardStats {
  /** Total assessments submitted (completed + report_sent + pending_review) */
  totalAssessments: number;
  /** % change vs. prior 30-day period */
  assessmentsChange: number;
  /** Percentage of started assessments that were completed (completion rate) */
  completionRate: number;
  /** Percentage point change vs. prior 30-day period */
  completionRateChange: number;
  /** Population mean overall leadership score */
  averageLeadershipScore: number;
  /** Change in average score vs. prior 30-day period */
  averageScoreChange: number;
  /** Number of email reports pending delivery */
  pendingReports: number;
  /** Change in pending count (negative = improvement) */
  pendingReportsChange: number;
}

// ---------------------------------------------------------------------------
// Chart Data Shapes
// ---------------------------------------------------------------------------

/** Monthly completion trend — for the time-series chart */
export interface MonthlyCompletionData {
  month: string;                    // e.g. "Sep"
  completions: number;
  averageScore: number;             // population avg that month (0–100)
}

/** Competency average — for the radar / bar chart */
export interface CompetencyChartData {
  category: string;                 // human-readable label
  averageScore: number;             // 0–100
  benchmark: number;                // industry benchmark for reference line
}

/** Score distribution bucket for histogram */
export interface ScoreDistributionData {
  range: string;                    // "60–65", "65–70", etc.
  count: number;
}

/** Top strengths / development areas aggregated across population */
export interface InsightSummary {
  category: CompetencyCategory;
  label: string;
  averageScore: number;
  type: "strength" | "development_area";
}
