import type { Profile, PortfolioProject } from "@/lib/types";

// ---------------------------------------------------------------------------
// Hero stats — exact numbers from developer-profile.md, no inflation
// ---------------------------------------------------------------------------

export const heroStats = [
  { value: "24+", label: "Projects Shipped" },
  { value: "< 48hr", label: "Demo Turnaround" },
  { value: "15+", label: "Industries" },
];

// ---------------------------------------------------------------------------
// Profile — drives hero name/tagline and How I Work steps
// ---------------------------------------------------------------------------

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Full-stack developer who builds assessment and survey tools — form logic, scoring engines, results visualization, and admin dashboards.",
  bio: "I build MVPs and production apps that solve real operational problems — CRM systems, assessment platforms, analytics dashboards, and data pipelines. My approach is straightforward: understand the business need, build something that works, and ship it fast.",
  approach: [
    {
      title: "Review Your Concept",
      description:
        "You've already built the initial design in Claude. I'd start by understanding your vision and mapping the assessment flow — questions, scoring weights, result tiers — before writing a line of code.",
    },
    {
      title: "Build the Assessment Flow",
      description:
        "Multi-step questionnaire with progress tracking, scoring logic, and results visualization — deployed for you to click through within days, not weeks.",
    },
    {
      title: "Wire Up Backend + Email",
      description:
        "Response storage, email report delivery via SendGrid, and the admin dashboard with the completion analytics and response data you described.",
    },
    {
      title: "Ship and Iterate",
      description:
        "Deploy to production, walk you through the admin tools, and adjust based on your feedback. Short cycles — no 2-week wait for a small change.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui", "Recharts"],
    },
    {
      name: "Backend & APIs",
      skills: ["Node.js", "REST APIs", "Email delivery (SendGrid)"],
    },
    {
      name: "Data & Analytics",
      skills: ["Scoring logic", "Data aggregation", "CSV export", "Chart visualization"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Approach step timeline metadata — parallel to profile.approach array
// Used by the proposal page to show timeline estimates alongside step cards
// ---------------------------------------------------------------------------

export const approachTimelines = [
  { step: "01", timeline: "Day 1–2" },
  { step: "02", timeline: "Day 3–7" },
  { step: "03", timeline: "Day 8–14" },
  { step: "04", timeline: "Ongoing" },
];

// ---------------------------------------------------------------------------
// Portfolio projects — 3 most relevant to this job
// Outcomes are exact text from developer-profile.md — no invented metrics
// ---------------------------------------------------------------------------

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "Custom lead intake and automation system with a public intake form, CRM dashboard, lead scoring, pipeline management, and automation rules engine.",
    outcome:
      "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    relevance:
      "Multi-step form, scoring logic, admin dashboard — the same architecture your assessment tool needs.",
    // No liveUrl — omit ExternalLink icon (URL is none in developer-profile.md)
  },
  {
    id: "tinnitus-therapy",
    title: "Tinnitus Therapy SaaS",
    description:
      "Multi-clinic tinnitus therapy management platform with patient intake, treatment protocols, progress tracking, and clinic analytics.",
    outcome:
      "Multi-clinic SaaS covering the full patient journey — intake, protocol assignment, session tracking, and outcome dashboards",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
    relevance:
      "Multi-step intake flows and progress tracking with outcome reporting — same data lifecycle as a leadership assessment.",
    liveUrl: "https://tinnitus-therapy.vercel.app",
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence Platform",
    description:
      "Data analytics and intelligence dashboard with multi-source data aggregation, interactive charts, and filterable insights.",
    outcome:
      "Unified analytics dashboard pulling data from multiple sources with interactive charts and filterable insights",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
    relevance:
      "Analytics dashboard with aggregated insights and export — exactly what your admin view needs.",
    liveUrl: "https://data-intelligence-platform-sandy.vercel.app",
  },
];

// ---------------------------------------------------------------------------
// CTA content — tailored to this specific job
// ---------------------------------------------------------------------------

export const ctaContent = {
  headline: "Your assessment tool is already half-designed.",
  body: "You have the Claude concept. I have the scoring engine, email delivery, and admin dashboard ready to build around it. One conversation to scope it — reply on Upwork and we can start this week.",
  authorName: "Humam",
};
