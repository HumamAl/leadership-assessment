import type {
  AssessmentQuestion,
  AssessmentResponse,
  CompetencyAggregate,
  CompetencyChartData,
  CompetencyScore,
  DashboardStats,
  EmailDelivery,
  InsightSummary,
  MonthlyCompletionData,
  QuestionResponse,
  ScoreDistributionData,
} from "@/lib/types";

// ===========================================================================
// DATASET 1 — ASSESSMENT QUESTIONS (35 total, 5–7 per category)
// ===========================================================================

export const assessmentQuestions: AssessmentQuestion[] = [
  // --- Communication (6 questions) ---
  {
    id: "Q-001",
    category: "communication",
    text: "I clearly articulate ideas and expectations to my team.",
    orderInCategory: 1,
  },
  {
    id: "Q-002",
    category: "communication",
    text: "I practice active listening before responding to others.",
    orderInCategory: 2,
  },
  {
    id: "Q-003",
    category: "communication",
    text: "I give timely and constructive feedback to team members.",
    orderInCategory: 3,
  },
  {
    id: "Q-004",
    category: "communication",
    text: "I adapt my communication style for different audiences.",
    orderInCategory: 4,
  },
  {
    id: "Q-005",
    category: "communication",
    text: "I facilitate productive discussions and meetings.",
    orderInCategory: 5,
  },
  {
    id: "Q-006",
    category: "communication",
    text: "I communicate organizational changes transparently and promptly.",
    orderInCategory: 6,
  },

  // --- Strategic Thinking (6 questions) ---
  {
    id: "Q-007",
    category: "strategic_thinking",
    text: "I identify emerging trends relevant to my team's work.",
    orderInCategory: 1,
  },
  {
    id: "Q-008",
    category: "strategic_thinking",
    text: "I align my team's goals with the broader organizational vision.",
    orderInCategory: 2,
  },
  {
    id: "Q-009",
    category: "strategic_thinking",
    text: "I anticipate obstacles before they become critical problems.",
    orderInCategory: 3,
  },
  {
    id: "Q-010",
    category: "strategic_thinking",
    text: "I think beyond immediate tasks to long-term outcomes.",
    orderInCategory: 4,
  },
  {
    id: "Q-011",
    category: "strategic_thinking",
    text: "I use data and evidence to shape team direction.",
    orderInCategory: 5,
  },
  {
    id: "Q-012",
    category: "strategic_thinking",
    text: "I translate complex organizational priorities into actionable plans.",
    orderInCategory: 6,
  },

  // --- Decision Making (6 questions) ---
  {
    id: "Q-013",
    category: "decision_making",
    text: "I make timely decisions even when information is incomplete.",
    orderInCategory: 1,
  },
  {
    id: "Q-014",
    category: "decision_making",
    text: "I evaluate risks effectively before committing to a course of action.",
    orderInCategory: 2,
  },
  {
    id: "Q-015",
    category: "decision_making",
    text: "I take accountability for decisions, including when outcomes fall short.",
    orderInCategory: 3,
  },
  {
    id: "Q-016",
    category: "decision_making",
    text: "I involve the right people in decisions without over-consulting.",
    orderInCategory: 4,
  },
  {
    id: "Q-017",
    category: "decision_making",
    text: "I revisit and adjust decisions when new evidence warrants it.",
    orderInCategory: 5,
  },
  {
    id: "Q-018",
    category: "decision_making",
    text: "I distinguish between reversible and irreversible decisions with appropriate urgency.",
    orderInCategory: 6,
  },

  // --- Team Development (6 questions) ---
  {
    id: "Q-019",
    category: "team_development",
    text: "I actively mentor team members to grow in their roles.",
    orderInCategory: 1,
  },
  {
    id: "Q-020",
    category: "team_development",
    text: "I delegate effectively, matching tasks to individual strengths.",
    orderInCategory: 2,
  },
  {
    id: "Q-021",
    category: "team_development",
    text: "I recognize and celebrate individual and team contributions.",
    orderInCategory: 3,
  },
  {
    id: "Q-022",
    category: "team_development",
    text: "I create opportunities for team members to build new skills.",
    orderInCategory: 4,
  },
  {
    id: "Q-023",
    category: "team_development",
    text: "I provide clear career development guidance to direct reports.",
    orderInCategory: 5,
  },
  {
    id: "Q-024",
    category: "team_development",
    text: "I address underperformance constructively and promptly.",
    orderInCategory: 6,
  },

  // --- Adaptability (5 questions) ---
  {
    id: "Q-025",
    category: "adaptability",
    text: "I embrace change and help my team navigate it positively.",
    orderInCategory: 1,
  },
  {
    id: "Q-026",
    category: "adaptability",
    text: "I adjust my approach when current methods are not working.",
    orderInCategory: 2,
  },
  {
    id: "Q-027",
    category: "adaptability",
    text: "I stay calm and productive under pressure.",
    orderInCategory: 3,
  },
  {
    id: "Q-028",
    category: "adaptability",
    text: "I experiment with new approaches even when outcomes are uncertain.",
    orderInCategory: 4,
  },
  {
    id: "Q-029",
    category: "adaptability",
    text: "I recover quickly from setbacks and maintain team momentum.",
    orderInCategory: 5,
  },

  // --- Emotional Intelligence (6 questions) ---
  {
    id: "Q-030",
    category: "emotional_intelligence",
    text: "I have a clear understanding of my own emotional triggers and biases.",
    orderInCategory: 1,
  },
  {
    id: "Q-031",
    category: "emotional_intelligence",
    text: "I demonstrate empathy in my interactions with team members.",
    orderInCategory: 2,
  },
  {
    id: "Q-032",
    category: "emotional_intelligence",
    text: "I manage conflict constructively and work toward resolution.",
    orderInCategory: 3,
  },
  {
    id: "Q-033",
    category: "emotional_intelligence",
    text: "I regulate my emotional responses during high-stakes conversations.",
    orderInCategory: 4,
  },
  {
    id: "Q-034",
    category: "emotional_intelligence",
    text: "I read team morale accurately and respond proactively.",
    orderInCategory: 5,
  },
  {
    id: "Q-035",
    category: "emotional_intelligence",
    text: "I build trust through consistent, authentic behavior.",
    orderInCategory: 6,
  },
];

// ===========================================================================
// DATASET 2 — ASSESSMENT RESPONSES (18 respondents)
// Distribution: 14 completed / report_sent, 2 pending_review, 2 in_progress
// ===========================================================================

// Helper to build competency score objects
function mkScore(
  category: AssessmentResponse["competencyScores"][number]["category"],
  pct: number
): CompetencyScore {
  const raw = parseFloat(((pct / 100) * 4 + 1).toFixed(2)); // map 0-100 → 1-5
  return {
    category,
    rawScore: raw,
    percentageScore: pct,
    classification: pct >= 75 ? "strength" : pct < 65 ? "development_area" : "on_track",
  };
}

// Helper to build a full set of question responses biased around a mean
function mkResponses(
  meanByCategory: Record<string, number>
): QuestionResponse[] {
  return assessmentQuestions.map((q) => {
    const base = meanByCategory[q.category] ?? 3;
    const jitter = Math.floor((Math.random() * 1.2 - 0.6) * 10) / 10;
    const raw = Math.min(5, Math.max(1, Math.round(base + jitter)));
    return { questionId: q.id, value: raw as 1 | 2 | 3 | 4 | 5 };
  });
}

export const assessmentResponses: AssessmentResponse[] = [
  // ── 1. Strong all-around leader ──────────────────────────────────────────
  {
    id: "ASR-4821",
    respondentName: "Marcus Webb",
    respondentEmail: "marcus.webb@bridgepointcap.com",
    respondentRole: "VP of Operations",
    respondentOrg: "Bridgepoint Capital Partners",
    status: "report_sent",
    startedAt: "2026-01-08T09:14:22Z",
    completedAt: "2026-01-08T09:41:07Z",
    minutesToComplete: 27,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 4.8,
      strategic_thinking: 4.6,
      decision_making: 4.7,
      team_development: 4.9,
      adaptability: 4.5,
      emotional_intelligence: 4.8,
    }),
    competencyScores: [
      mkScore("communication", 92),
      mkScore("strategic_thinking", 88),
      mkScore("decision_making", 90),
      mkScore("team_development", 94),
      mkScore("adaptability", 86),
      mkScore("emotional_intelligence", 92),
    ],
    overallScore: 90.3,
    topStrengths: ["team_development", "communication"],
    developmentAreas: [],
  },

  // ── 2. Communication gap ─────────────────────────────────────────────────
  {
    id: "ASR-4834",
    respondentName: "Priya Chandrasekaran",
    respondentEmail: "priya.c@nexora-systems.com",
    respondentRole: "Senior Product Manager",
    respondentOrg: "Nexora Systems",
    status: "report_sent",
    startedAt: "2026-01-11T14:22:09Z",
    completedAt: "2026-01-11T14:53:41Z",
    minutesToComplete: 32,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 2.8,
      strategic_thinking: 4.2,
      decision_making: 3.9,
      team_development: 3.7,
      adaptability: 4.0,
      emotional_intelligence: 3.5,
    }),
    competencyScores: [
      mkScore("communication", 58),
      mkScore("strategic_thinking", 81),
      mkScore("decision_making", 74),
      mkScore("team_development", 70),
      mkScore("adaptability", 76),
      mkScore("emotional_intelligence", 66),
    ],
    overallScore: 70.8,
    topStrengths: ["strategic_thinking", "adaptability"],
    developmentAreas: ["communication"],
  },

  // ── 3. Decision making and adaptability gaps ─────────────────────────────
  {
    id: "ASR-4847",
    respondentName: "James Okafor",
    respondentEmail: "j.okafor@clearfund.io",
    respondentRole: "Director of Finance",
    respondentOrg: "Clearfund Advisors",
    status: "report_sent",
    startedAt: "2026-01-14T10:05:33Z",
    completedAt: "2026-01-14T10:29:18Z",
    minutesToComplete: 24,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 3.6,
      strategic_thinking: 3.8,
      decision_making: 2.9,
      team_development: 3.5,
      adaptability: 2.7,
      emotional_intelligence: 3.9,
    }),
    competencyScores: [
      mkScore("communication", 67),
      mkScore("strategic_thinking", 72),
      mkScore("decision_making", 56),
      mkScore("team_development", 66),
      mkScore("adaptability", 54),
      mkScore("emotional_intelligence", 74),
    ],
    overallScore: 64.8,
    topStrengths: ["emotional_intelligence", "strategic_thinking"],
    developmentAreas: ["decision_making", "adaptability"],
  },

  // ── 4. Emotional intelligence outlier (lowest scorer in EI) ─────────────
  {
    id: "ASR-4859",
    respondentName: "Sofia Andersen",
    respondentEmail: "sofia@vantagecp.com",
    respondentRole: "Managing Director",
    respondentOrg: "Vantage Capital Partners",
    status: "report_sent",
    startedAt: "2026-01-17T08:47:00Z",
    completedAt: "2026-01-17T09:21:14Z",
    minutesToComplete: 34,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 4.1,
      strategic_thinking: 4.4,
      decision_making: 4.3,
      team_development: 3.8,
      adaptability: 4.0,
      emotional_intelligence: 2.5,
    }),
    competencyScores: [
      mkScore("communication", 79),
      mkScore("strategic_thinking", 84),
      mkScore("decision_making", 82),
      mkScore("team_development", 72),
      mkScore("adaptability", 76),
      mkScore("emotional_intelligence", 48),
    ],
    overallScore: 73.5,
    topStrengths: ["strategic_thinking", "decision_making"],
    developmentAreas: ["emotional_intelligence"],
  },

  // ── 5. Mid-level leader, balanced profile ───────────────────────────────
  {
    id: "ASR-4862",
    respondentName: "Rachel Goldstein",
    respondentEmail: "r.goldstein@sterlingwg.com",
    respondentRole: "Team Lead, Client Success",
    respondentOrg: "Sterling Wealth Group",
    status: "report_sent",
    startedAt: "2026-01-19T13:30:55Z",
    completedAt: "2026-01-19T13:58:39Z",
    minutesToComplete: 28,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 3.9,
      strategic_thinking: 3.6,
      decision_making: 3.8,
      team_development: 4.1,
      adaptability: 4.2,
      emotional_intelligence: 4.0,
    }),
    competencyScores: [
      mkScore("communication", 74),
      mkScore("strategic_thinking", 68),
      mkScore("decision_making", 72),
      mkScore("team_development", 78),
      mkScore("adaptability", 80),
      mkScore("emotional_intelligence", 76),
    ],
    overallScore: 74.7,
    topStrengths: ["adaptability", "team_development"],
    developmentAreas: [],
  },

  // ── 6. Team development gap ──────────────────────────────────────────────
  {
    id: "ASR-4875",
    respondentName: "Omar Farouk",
    respondentEmail: "omar.farouk@harmonstcap.com",
    respondentRole: "Engineering Manager",
    respondentOrg: "Harmon Street Capital",
    status: "report_sent",
    startedAt: "2026-01-22T11:04:17Z",
    completedAt: "2026-01-22T11:37:50Z",
    minutesToComplete: 34,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 4.0,
      strategic_thinking: 4.2,
      decision_making: 3.9,
      team_development: 2.6,
      adaptability: 3.8,
      emotional_intelligence: 3.7,
    }),
    competencyScores: [
      mkScore("communication", 76),
      mkScore("strategic_thinking", 80),
      mkScore("decision_making", 74),
      mkScore("team_development", 52),
      mkScore("adaptability", 72),
      mkScore("emotional_intelligence", 70),
    ],
    overallScore: 70.7,
    topStrengths: ["strategic_thinking", "communication"],
    developmentAreas: ["team_development"],
  },

  // ── 7. Uniformly low scorer (edge case) ─────────────────────────────────
  {
    id: "ASR-4891",
    respondentName: "Tyler Breckenridge",
    respondentEmail: "t.breckenridge@meridianrisk.com",
    respondentRole: "Operations Supervisor",
    respondentOrg: "Meridian Risk Solutions",
    status: "pending_review",
    startedAt: "2026-01-25T09:11:40Z",
    completedAt: "2026-01-25T09:49:22Z",
    minutesToComplete: 38,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 2.3,
      strategic_thinking: 2.1,
      decision_making: 2.4,
      team_development: 2.2,
      adaptability: 2.5,
      emotional_intelligence: 2.1,
    }),
    competencyScores: [
      mkScore("communication", 43),
      mkScore("strategic_thinking", 40),
      mkScore("decision_making", 45),
      mkScore("team_development", 42),
      mkScore("adaptability", 47),
      mkScore("emotional_intelligence", 40),
    ],
    overallScore: 42.8,
    topStrengths: [],
    developmentAreas: [
      "communication",
      "strategic_thinking",
      "decision_making",
      "team_development",
      "adaptability",
      "emotional_intelligence",
    ],
  },

  // ── 8. Strong EI, weak strategic thinking ────────────────────────────────
  {
    id: "ASR-4903",
    respondentName: "Aisha Mohammed",
    respondentEmail: "aisha.m@apexmerchantsvc.com",
    respondentRole: "HR Business Partner",
    respondentOrg: "Apex Merchant Services",
    status: "report_sent",
    startedAt: "2026-01-28T15:20:04Z",
    completedAt: "2026-01-28T15:47:33Z",
    minutesToComplete: 27,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 4.3,
      strategic_thinking: 2.9,
      decision_making: 3.5,
      team_development: 4.4,
      adaptability: 4.1,
      emotional_intelligence: 4.7,
    }),
    competencyScores: [
      mkScore("communication", 82),
      mkScore("strategic_thinking", 58),
      mkScore("decision_making", 66),
      mkScore("team_development", 84),
      mkScore("adaptability", 78),
      mkScore("emotional_intelligence", 90),
    ],
    overallScore: 76.3,
    topStrengths: ["emotional_intelligence", "team_development"],
    developmentAreas: ["strategic_thinking"],
  },

  // ── 9. New manager, first assessment ─────────────────────────────────────
  {
    id: "ASR-4917",
    respondentName: "Carlos Restrepo",
    respondentEmail: "carlos.r@coretek.io",
    respondentRole: "Team Lead, Software Engineering",
    respondentOrg: "Coretek Software",
    status: "report_sent",
    startedAt: "2026-02-01T10:45:11Z",
    completedAt: "2026-02-01T11:22:48Z",
    minutesToComplete: 38,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 3.4,
      strategic_thinking: 3.2,
      decision_making: 3.1,
      team_development: 3.6,
      adaptability: 3.8,
      emotional_intelligence: 3.5,
    }),
    competencyScores: [
      mkScore("communication", 65),
      mkScore("strategic_thinking", 61),
      mkScore("decision_making", 59),
      mkScore("team_development", 68),
      mkScore("adaptability", 72),
      mkScore("emotional_intelligence", 66),
    ],
    overallScore: 65.2,
    topStrengths: ["adaptability", "team_development"],
    developmentAreas: ["decision_making"],
  },

  // ── 10. Decision making specialist ───────────────────────────────────────
  {
    id: "ASR-4928",
    respondentName: "Elena Vasquez",
    respondentEmail: "evasquez@prismdata.co",
    respondentRole: "Chief Operating Officer",
    respondentOrg: "Prism Data",
    status: "report_sent",
    startedAt: "2026-02-04T08:30:00Z",
    completedAt: "2026-02-04T09:04:17Z",
    minutesToComplete: 34,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 3.9,
      strategic_thinking: 4.3,
      decision_making: 4.8,
      team_development: 3.7,
      adaptability: 4.2,
      emotional_intelligence: 3.8,
    }),
    competencyScores: [
      mkScore("communication", 74),
      mkScore("strategic_thinking", 82),
      mkScore("decision_making", 92),
      mkScore("team_development", 70),
      mkScore("adaptability", 80),
      mkScore("emotional_intelligence", 72),
    ],
    overallScore: 78.3,
    topStrengths: ["decision_making", "strategic_thinking"],
    developmentAreas: [],
  },

  // ── 11. Completed, awaiting report ───────────────────────────────────────
  {
    id: "ASR-4939",
    respondentName: "David Nakamura",
    respondentEmail: "dnakamura@luminarycloud.ai",
    respondentRole: "Head of Data Science",
    respondentOrg: "Luminary Cloud",
    status: "pending_review",
    startedAt: "2026-02-06T13:15:28Z",
    completedAt: "2026-02-06T13:44:09Z",
    minutesToComplete: 29,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 3.7,
      strategic_thinking: 4.5,
      decision_making: 4.1,
      team_development: 3.4,
      adaptability: 4.3,
      emotional_intelligence: 3.6,
    }),
    competencyScores: [
      mkScore("communication", 70),
      mkScore("strategic_thinking", 86),
      mkScore("decision_making", 78),
      mkScore("team_development", 64),
      mkScore("adaptability", 82),
      mkScore("emotional_intelligence", 68),
    ],
    overallScore: 74.7,
    topStrengths: ["strategic_thinking", "adaptability"],
    developmentAreas: ["team_development"],
  },

  // ── 12. Mid-senior manager, communication strength ───────────────────────
  {
    id: "ASR-4952",
    respondentName: "Lily Chen",
    respondentEmail: "lily.chen@bytecraftlabs.io",
    respondentRole: "Director of Talent",
    respondentOrg: "Bytecraft Labs",
    status: "report_sent",
    startedAt: "2026-02-09T09:50:44Z",
    completedAt: "2026-02-09T10:19:31Z",
    minutesToComplete: 29,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 4.6,
      strategic_thinking: 4.0,
      decision_making: 3.8,
      team_development: 4.5,
      adaptability: 3.9,
      emotional_intelligence: 4.4,
    }),
    competencyScores: [
      mkScore("communication", 88),
      mkScore("strategic_thinking", 76),
      mkScore("decision_making", 72),
      mkScore("team_development", 86),
      mkScore("adaptability", 74),
      mkScore("emotional_intelligence", 84),
    ],
    overallScore: 80.0,
    topStrengths: ["communication", "team_development"],
    developmentAreas: [],
  },

  // ── 13. Fast completer (18 min) ───────────────────────────────────────────
  {
    id: "ASR-4964",
    respondentName: "Nathan Reeves",
    respondentEmail: "n.reeves@helixanalytics.com",
    respondentRole: "Product Lead",
    respondentOrg: "Helix Analytics",
    status: "report_sent",
    startedAt: "2026-02-12T14:05:19Z",
    completedAt: "2026-02-12T14:23:47Z",
    minutesToComplete: 18,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 3.5,
      strategic_thinking: 3.9,
      decision_making: 4.0,
      team_development: 3.3,
      adaptability: 3.7,
      emotional_intelligence: 3.4,
    }),
    competencyScores: [
      mkScore("communication", 66),
      mkScore("strategic_thinking", 74),
      mkScore("decision_making", 76),
      mkScore("team_development", 62),
      mkScore("adaptability", 70),
      mkScore("emotional_intelligence", 64),
    ],
    overallScore: 68.7,
    topStrengths: ["decision_making", "strategic_thinking"],
    developmentAreas: ["team_development"],
  },

  // ── 14. Uniformly high scorer (edge case) ────────────────────────────────
  {
    id: "ASR-4977",
    respondentName: "Kenji Fujimoto",
    respondentEmail: "kenji.f@quantraai.co",
    respondentRole: "Chief of Staff",
    respondentOrg: "Quantra AI",
    status: "report_sent",
    startedAt: "2026-02-15T10:22:55Z",
    completedAt: "2026-02-15T10:54:10Z",
    minutesToComplete: 31,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 4.9,
      strategic_thinking: 4.8,
      decision_making: 4.7,
      team_development: 4.9,
      adaptability: 4.8,
      emotional_intelligence: 4.9,
    }),
    competencyScores: [
      mkScore("communication", 94),
      mkScore("strategic_thinking", 92),
      mkScore("decision_making", 90),
      mkScore("team_development", 94),
      mkScore("adaptability", 92),
      mkScore("emotional_intelligence", 94),
    ],
    overallScore: 92.7,
    topStrengths: ["communication", "emotional_intelligence"],
    developmentAreas: [],
  },

  // ── 15. Strategic thinking + communication gap ───────────────────────────
  {
    id: "ASR-4989",
    respondentName: "Brendan O'Sullivan",
    respondentEmail: "bosullivan@vaulted.io",
    respondentRole: "Regional Manager",
    respondentOrg: "Vaulted.io",
    status: "report_sent",
    startedAt: "2026-02-18T11:33:00Z",
    completedAt: "2026-02-18T12:08:21Z",
    minutesToComplete: 35,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 2.7,
      strategic_thinking: 2.8,
      decision_making: 3.6,
      team_development: 4.0,
      adaptability: 4.1,
      emotional_intelligence: 4.2,
    }),
    competencyScores: [
      mkScore("communication", 54),
      mkScore("strategic_thinking", 56),
      mkScore("decision_making", 68),
      mkScore("team_development", 76),
      mkScore("adaptability", 78),
      mkScore("emotional_intelligence", 80),
    ],
    overallScore: 68.7,
    topStrengths: ["emotional_intelligence", "adaptability"],
    developmentAreas: ["communication", "strategic_thinking"],
  },

  // ── 16. IN PROGRESS — partial (edge case) ────────────────────────────────
  {
    id: "ASR-5001",
    respondentName: "Luis Figueroa",
    respondentEmail: "lfigueroa@fenwickcreative.co",
    respondentRole: "Senior Manager, Operations",
    respondentOrg: "Fenwick Creative Co.",
    status: "in_progress",
    startedAt: "2026-02-22T09:07:41Z",
    completedAt: null,
    minutesToComplete: null,
    questionsAnswered: 18,
    totalQuestions: 35,
    responses: [],
    competencyScores: [],
    overallScore: null,
    topStrengths: [],
    developmentAreas: [],
  },

  // ── 17. IN PROGRESS — barely started (edge case) ─────────────────────────
  {
    id: "ASR-5008",
    respondentName: "Fatima Al-Rashid",
    respondentEmail: "falrashid@nexorasystems.com",
    respondentRole: "Program Director",
    respondentOrg: "Nexora Systems",
    status: "in_progress",
    startedAt: "2026-02-24T16:44:03Z",
    completedAt: null,
    minutesToComplete: null,
    questionsAnswered: 6,
    totalQuestions: 35,
    responses: [],
    competencyScores: [],
    overallScore: null,
    topStrengths: [],
    developmentAreas: [],
  },

  // ── 18. Slow completer (52 min) ───────────────────────────────────────────
  {
    id: "ASR-5014",
    respondentName: "Michael Torres",
    respondentEmail: "m.torres@axiomgroup.com",
    respondentRole: "VP of People & Culture",
    respondentOrg: "Axiom Supply Co.",
    status: "report_sent",
    startedAt: "2026-02-26T08:18:05Z",
    completedAt: "2026-02-26T09:10:33Z",
    minutesToComplete: 52,
    questionsAnswered: 35,
    totalQuestions: 35,
    responses: mkResponses({
      communication: 4.2,
      strategic_thinking: 3.8,
      decision_making: 3.9,
      team_development: 4.3,
      adaptability: 3.7,
      emotional_intelligence: 4.4,
    }),
    competencyScores: [
      mkScore("communication", 80),
      mkScore("strategic_thinking", 72),
      mkScore("decision_making", 74),
      mkScore("team_development", 82),
      mkScore("adaptability", 70),
      mkScore("emotional_intelligence", 84),
    ],
    overallScore: 77.0,
    topStrengths: ["emotional_intelligence", "team_development"],
    developmentAreas: [],
  },
];

// ===========================================================================
// DATASET 3 — EMAIL DELIVERY RECORDS (one per completed assessment)
// ===========================================================================

export const emailDeliveries: EmailDelivery[] = [
  {
    id: "DEL-0041",
    assessmentId: "ASR-4821",
    recipientEmail: "marcus.webb@bridgepointcap.com",
    recipientName: "Marcus Webb",
    status: "sent",
    attemptedAt: "2026-01-08T09:43:00Z",
    deliveredAt: "2026-01-08T09:43:18Z",
  },
  {
    id: "DEL-0042",
    assessmentId: "ASR-4834",
    recipientEmail: "priya.c@nexora-systems.com",
    recipientName: "Priya Chandrasekaran",
    status: "sent",
    attemptedAt: "2026-01-11T14:55:00Z",
    deliveredAt: "2026-01-11T14:55:22Z",
  },
  {
    id: "DEL-0043",
    assessmentId: "ASR-4847",
    recipientEmail: "j.okafor@clearfund.io",
    recipientName: "James Okafor",
    status: "sent",
    attemptedAt: "2026-01-14T10:31:00Z",
    deliveredAt: "2026-01-14T10:31:09Z",
  },
  {
    id: "DEL-0044",
    assessmentId: "ASR-4859",
    recipientEmail: "sofia@vantagecp.com",
    recipientName: "Sofia Andersen",
    status: "sent",
    attemptedAt: "2026-01-17T09:23:00Z",
    deliveredAt: "2026-01-17T09:23:14Z",
  },
  {
    id: "DEL-0045",
    assessmentId: "ASR-4862",
    recipientEmail: "r.goldstein@sterlingwg.com",
    recipientName: "Rachel Goldstein",
    status: "sent",
    attemptedAt: "2026-01-19T14:00:00Z",
    deliveredAt: "2026-01-19T14:00:31Z",
  },
  {
    id: "DEL-0046",
    assessmentId: "ASR-4875",
    recipientEmail: "omar.farouk@harmonstcap.com",
    recipientName: "Omar Farouk",
    // Edge case: email bounced — invalid domain
    status: "failed",
    attemptedAt: "2026-01-22T11:39:00Z",
    deliveredAt: null,
    failureReason: "550 5.1.1 The email account that you tried to reach does not exist — verify recipient address",
  },
  {
    id: "DEL-0047",
    assessmentId: "ASR-4903",
    recipientEmail: "aisha.m@apexmerchantsvc.com",
    recipientName: "Aisha Mohammed",
    status: "sent",
    attemptedAt: "2026-01-28T15:49:00Z",
    deliveredAt: "2026-01-28T15:49:20Z",
  },
  {
    id: "DEL-0048",
    assessmentId: "ASR-4917",
    recipientEmail: "carlos.r@coretek.io",
    recipientName: "Carlos Restrepo",
    status: "sent",
    attemptedAt: "2026-02-01T11:24:00Z",
    deliveredAt: "2026-02-01T11:24:17Z",
  },
  {
    id: "DEL-0049",
    assessmentId: "ASR-4928",
    recipientEmail: "evasquez@prismdata.co",
    recipientName: "Elena Vasquez",
    status: "sent",
    attemptedAt: "2026-02-04T09:06:00Z",
    deliveredAt: "2026-02-04T09:06:08Z",
  },
  {
    id: "DEL-0050",
    assessmentId: "ASR-4952",
    recipientEmail: "lily.chen@bytecraftlabs.io",
    recipientName: "Lily Chen",
    status: "sent",
    attemptedAt: "2026-02-09T10:21:00Z",
    deliveredAt: "2026-02-09T10:21:25Z",
  },
  {
    id: "DEL-0051",
    assessmentId: "ASR-4964",
    recipientEmail: "n.reeves@helixanalytics.com",
    recipientName: "Nathan Reeves",
    status: "sent",
    attemptedAt: "2026-02-12T14:25:00Z",
    deliveredAt: "2026-02-12T14:25:11Z",
  },
  {
    id: "DEL-0052",
    assessmentId: "ASR-4977",
    recipientEmail: "kenji.f@quantraai.co",
    recipientName: "Kenji Fujimoto",
    status: "sent",
    attemptedAt: "2026-02-15T10:56:00Z",
    deliveredAt: "2026-02-15T10:56:19Z",
  },
  {
    id: "DEL-0053",
    assessmentId: "ASR-4989",
    recipientEmail: "bosullivan@vaulted.io",
    recipientName: "Brendan O'Sullivan",
    status: "sent",
    attemptedAt: "2026-02-18T12:10:00Z",
    deliveredAt: "2026-02-18T12:10:07Z",
  },
  {
    id: "DEL-0054",
    assessmentId: "ASR-5014",
    recipientEmail: "m.torres@axiomgroup.com",
    recipientName: "Michael Torres",
    status: "sent",
    attemptedAt: "2026-02-26T09:12:00Z",
    deliveredAt: "2026-02-26T09:12:13Z",
  },
  // Pending delivery for the two assessments in pending_review
  {
    id: "DEL-0055",
    assessmentId: "ASR-4891",
    recipientEmail: "t.breckenridge@meridianrisk.com",
    recipientName: "Tyler Breckenridge",
    status: "pending",
    attemptedAt: "2026-01-25T09:51:00Z",
    deliveredAt: null,
  },
  {
    id: "DEL-0056",
    assessmentId: "ASR-4939",
    recipientEmail: "dnakamura@luminarycloud.ai",
    recipientName: "David Nakamura",
    status: "pending",
    attemptedAt: "2026-02-06T13:46:00Z",
    deliveredAt: null,
  },
];

// ===========================================================================
// DATASET 4 — COMPETENCY AGGREGATES (population-level, 16 completed)
// ===========================================================================

export const competencyAggregates: CompetencyAggregate[] = [
  {
    category: "communication",
    averageScore: 72.6,
    stdDeviation: 14.8,
    strengthCount: 6,
    developmentAreaCount: 3,
    onTrackCount: 7,
    distribution: { "0-20": 0, "21-40": 0, "41-60": 3, "61-80": 8, "81-100": 5 },
  },
  {
    category: "strategic_thinking",
    averageScore: 73.7,
    stdDeviation: 15.2,
    strengthCount: 7,
    developmentAreaCount: 3,
    onTrackCount: 6,
    distribution: { "0-20": 0, "21-40": 1, "41-60": 2, "61-80": 7, "81-100": 6 },
  },
  {
    category: "decision_making",
    averageScore: 74.3,
    stdDeviation: 14.1,
    strengthCount: 6,
    developmentAreaCount: 2,
    onTrackCount: 8,
    distribution: { "0-20": 0, "21-40": 0, "41-60": 2, "61-80": 9, "81-100": 5 },
  },
  {
    category: "team_development",
    averageScore: 72.0,
    stdDeviation: 16.3,
    strengthCount: 6,
    developmentAreaCount: 4,
    onTrackCount: 6,
    distribution: { "0-20": 0, "21-40": 1, "41-60": 3, "61-80": 6, "81-100": 6 },
  },
  {
    category: "adaptability",
    averageScore: 75.4,
    stdDeviation: 13.7,
    strengthCount: 8,
    developmentAreaCount: 2,
    onTrackCount: 6,
    distribution: { "0-20": 0, "21-40": 0, "41-60": 2, "61-80": 7, "81-100": 7 },
  },
  {
    category: "emotional_intelligence",
    averageScore: 73.9,
    stdDeviation: 17.4,
    strengthCount: 7,
    developmentAreaCount: 3,
    onTrackCount: 6,
    distribution: { "0-20": 0, "21-40": 1, "41-60": 2, "61-80": 6, "81-100": 7 },
  },
];

// ===========================================================================
// DASHBOARD STATISTICS
// ===========================================================================

export const dashboardStats: DashboardStats = {
  totalAssessments: 16,
  assessmentsChange: 33.3,         // vs. prior 30-day period (12 → 16)
  completionRate: 88.9,            // 16 completed of 18 started
  completionRateChange: 4.2,
  averageLeadershipScore: 73.9,
  averageScoreChange: 2.1,
  pendingReports: 2,
  pendingReportsChange: -3,        // negative = improvement
};

// ===========================================================================
// CHART DATA 1 — Monthly Completion Trend (6 months)
// Education/HR enrollment picks up in Q1 (New Year development goals) and
// September (new fiscal year / performance review cycles). Summer is slower.
// ===========================================================================

export const monthlyCompletionTrend: MonthlyCompletionData[] = [
  { month: "Sep", completions: 4, averageScore: 69.8 },   // post-summer re-engagement
  { month: "Oct", completions: 6, averageScore: 71.3 },   // performance review season
  { month: "Nov", completions: 9, averageScore: 72.6 },   // year-end L&D push
  { month: "Dec", completions: 5, averageScore: 70.4 },   // holiday slowdown
  { month: "Jan", completions: 12, averageScore: 74.1 },  // New Year development goals
  { month: "Feb", completions: 16, averageScore: 73.9 },  // ongoing ramp
];

// ===========================================================================
// CHART DATA 2 — Competency Average Scores vs. Benchmark (radar / bar)
// ===========================================================================

export const competencyChartData: CompetencyChartData[] = [
  {
    category: "Communication",
    averageScore: 72.6,
    benchmark: 74.0,
  },
  {
    category: "Strategic Thinking",
    averageScore: 73.7,
    benchmark: 70.0,
  },
  {
    category: "Decision Making",
    averageScore: 74.3,
    benchmark: 72.0,
  },
  {
    category: "Team Development",
    averageScore: 72.0,
    benchmark: 73.0,
  },
  {
    category: "Adaptability",
    averageScore: 75.4,
    benchmark: 71.0,
  },
  {
    category: "Emotional Intelligence",
    averageScore: 73.9,
    benchmark: 72.0,
  },
];

// ===========================================================================
// CHART DATA 3 — Overall Score Distribution (histogram buckets)
// ===========================================================================

export const scoreDistribution: ScoreDistributionData[] = [
  { range: "40–50", count: 1 },
  { range: "50–60", count: 0 },
  { range: "60–65", count: 2 },
  { range: "65–70", count: 3 },
  { range: "70–75", count: 4 },
  { range: "75–80", count: 3 },
  { range: "80–85", count: 1 },
  { range: "85–95", count: 2 },
];

// ===========================================================================
// INSIGHT SUMMARIES — Top strengths and development areas across population
// ===========================================================================

export const populationInsights: InsightSummary[] = [
  {
    category: "adaptability",
    label: "Adaptability",
    averageScore: 75.4,
    type: "strength",
  },
  {
    category: "decision_making",
    label: "Decision Making",
    averageScore: 74.3,
    type: "strength",
  },
  {
    category: "emotional_intelligence",
    label: "Emotional Intelligence",
    averageScore: 73.9,
    type: "strength",
  },
  {
    category: "team_development",
    label: "Team Development",
    averageScore: 72.0,
    type: "development_area",
  },
  {
    category: "communication",
    label: "Communication",
    averageScore: 72.6,
    type: "development_area",
  },
];

// ===========================================================================
// LOOKUP HELPERS
// ===========================================================================

export const getAssessmentById = (id: string) =>
  assessmentResponses.find((r) => r.id === id);

export const getDeliveryByAssessmentId = (assessmentId: string) =>
  emailDeliveries.find((d) => d.assessmentId === assessmentId);

export const getCompletedAssessments = () =>
  assessmentResponses.filter((r) => r.status !== "in_progress");

export const getInProgressAssessments = () =>
  assessmentResponses.filter((r) => r.status === "in_progress");

export const getAssessmentsByStatus = (status: AssessmentResponse["status"]) =>
  assessmentResponses.filter((r) => r.status === status);

export const getQuestionsByCategory = (category: AssessmentQuestion["category"]) =>
  assessmentQuestions.filter((q) => q.category === category);

export const getAggregateByCategory = (category: CompetencyAggregate["category"]) =>
  competencyAggregates.find((a) => a.category === category);

// ===========================================================================
// CONSTANTS — useful for filter menus and display
// ===========================================================================

export const ASSESSMENT_STATUSES: AssessmentResponse["status"][] = [
  "in_progress",
  "completed",
  "pending_review",
  "report_sent",
];

export const COMPETENCY_CATEGORIES: AssessmentQuestion["category"][] = [
  "communication",
  "strategic_thinking",
  "decision_making",
  "team_development",
  "adaptability",
  "emotional_intelligence",
];

/** Score threshold below which a competency is flagged as a development area */
export const DEVELOPMENT_AREA_THRESHOLD = 65;

/** Score threshold above which a competency is classified as a strength */
export const STRENGTH_THRESHOLD = 75;
