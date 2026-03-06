# Analysis Brief — Leadership Skills Self-Assessment Tool

**Job Title**: Building a Self-Assessment for Leadership Skills (Front End, Reporting, Back End, Database)
**Analyzed**: 2026-03-05
**Analyst**: Job Analyst (Agent 2)

---

```json
{
  "domain": "education",
  "clientName": null,
  "clientVocabulary": {
    "primaryEntities": [
      "assessment",
      "self-assessment",
      "questionnaire",
      "user",
      "individual",
      "career skills",
      "skill insights",
      "strengths",
      "development areas",
      "report",
      "personalized report",
      "responses",
      "results"
    ],
    "kpiLabels": [
      "number of users",
      "response data",
      "aggregated insights",
      "data trends",
      "completion rate"
    ],
    "statusLabels": [
      "In Progress",
      "Completed",
      "Report Sent",
      "Pending Review"
    ],
    "workflowVerbs": [
      "complete",
      "score",
      "generate",
      "email",
      "export",
      "identify",
      "highlight"
    ],
    "sidebarNavCandidates": [
      "Assessment Overview",
      "User Responses",
      "Skill Insights",
      "Report Center",
      "Aggregated Trends",
      "Export Results"
    ],
    "industryTerms": [
      "self-assessment",
      "career development",
      "leadership skills",
      "skill gaps",
      "development areas",
      "progress indicators",
      "scoring logic",
      "structured report"
    ]
  },
  "clientResearchHints": {
    "clientWebsite": null,
    "companyName": null,
    "productName": null,
    "mentionedCompetitors": [],
    "mentionedTools": ["Claude"],
    "existingAppUrls": [],
    "designFileUrls": [],
    "industryKeywords": [
      "career skills assessment",
      "leadership development",
      "self-assessment tool",
      "skills gap analysis",
      "360 feedback",
      "professional development",
      "learning and development"
    ],
    "targetAudience": "Individuals completing an online career skills self-assessment; client operates as admin viewing aggregate results and individual responses",
    "additionalNotes": "Client has already built an initial design and concept using Claude — they have a mental model of the product and want a developer to execute it. This signals a semi-technical or product-oriented client who can articulate requirements clearly. The 'leadership skills' framing in the title alongside 'career skills' in the description suggests this may target professionals in corporate L&D or executive coaching contexts. Comparable products to research: Gallup CliftonStrengths, Hogan Assessments, 16Personalities, TypeForm-based skills surveys, TalentLMS assessment modules, Culture Amp. The admin dashboard with CSV export and aggregated insights suggests this could be a B2B tool sold to organizations, not just a consumer app."
  },
  "features": [
    "multi-step assessment questionnaire with progress indicators",
    "scoring engine and skill insights generation",
    "results page showing strengths and development areas",
    "personalized report generation and email delivery",
    "email capture flow before results",
    "admin dashboard with user count, response data, and aggregated insights",
    "CSV export of results"
  ],
  "challenges": [
    {
      "title": "Multi-step questionnaire state management and scoring logic",
      "vizType": "flow-diagram",
      "outcome": "Could reduce drop-off by persisting answers across steps — users who leave and return pick up where they left off without losing responses"
    },
    {
      "title": "Personalized report generation from scored responses",
      "vizType": "before-after",
      "outcome": "Could transform raw response data into a readable, shareable PDF or email report — eliminating any manual interpretation step between completion and delivery"
    },
    {
      "title": "Admin dashboard aggregation across all responses",
      "vizType": "metric-bars",
      "outcome": "Could surface skill trend patterns across all users — showing which leadership competencies score lowest across the cohort, giving the admin actionable population-level insights"
    },
    {
      "title": "Email report delivery reliability and capture flow",
      "vizType": "architecture-sketch",
      "outcome": "Could ensure 95%+ report delivery with retry logic — preventing completed assessments from going unreported due to transient email failures"
    }
  ],
  "portfolioProjects": [
    "Lead Intake CRM",
    "AI Store Builder",
    "Tinnitus Therapy SaaS",
    "Data Intelligence Platform"
  ],
  "coverLetterHooks": [
    "already created an initial design and concept using Claude",
    "career skills self-assessment tool that individuals can complete online",
    "automatically generate and email the user a personalized report after completion",
    "admin dashboard or reporting interface to view aggregated insights",
    "export results (CSV or similar)"
  ],
  "screeningQuestion": null,
  "screeningAnswer": null,
  "aestheticDirection": {
    "suggestedAesthetic": "saas-modern",
    "suggestedFormat": "dashboard-app",
    "reasoning": "Client wrote in a clear, organized, structured way — numbered sections, feature lists, professional tone with no casual register. They describe a dual-surface product: a consumer-facing assessment UX and an admin reporting interface. SaaS Modern fits the education/career development domain well — approachable enough for the end-user assessment flow, structured enough for the admin dashboard. The admin side (response data, aggregated insights, CSV export) is the most complex deliverable to demo, so a dashboard-app format with the admin view as the primary demo surface makes the most sense. The assessment questionnaire itself becomes a feature page with a multi-step walkthrough interaction. The Creative Director should research comparable tools like Gallup CliftonStrengths, Culture Amp, and TypeForm results pages to calibrate the visual language — this domain tends toward clean whites, thoughtful typography, and a hint of warmth (not clinical cold)."
  },
  "designSignals": "The client works in the career development or L&D space, where the UX bar is set by products like Gallup CliftonStrengths, 16Personalities, and Culture Amp — all of which combine clean, spacious layouts with meaningful data visualization and clear typographic hierarchy. The admin-facing reporting side of this tool would be evaluated against tools like Google Analytics, Airtable, or similar lightweight reporting dashboards that non-technical admins use. Premium means 'feels considered and professional' in this domain — not dark and dense, and not consumer-bubbly. Warm, trustworthy, and data-legible is the target register.",
  "signals": [
    "DETAILED_SPEC",
    "NEW_CLIENT"
  ],
  "coverLetterVariant": "C",
  "domainResearcherFocus": "Focus on career development and L&D (learning and development) terminology: leadership competencies, skill gaps, development areas, self-efficacy, 360-degree feedback, behavioral anchors, Likert scale, competency frameworks. Entity names should be realistic professional development contexts — realistic question stems like 'I communicate decisions clearly to my team' rated 1-5. Realistic leadership skill categories: Communication, Strategic Thinking, Decision Making, Team Development, Adaptability, Emotional Intelligence. Score ranges: individual competency scores 1-5 (Likert), aggregate scores as percentages (60-90% range is realistic), with anything below 65% flagged as a development area. Real tools in this domain: Culture Amp, Lattice, 15Five, Gallup CliftonStrengths, Hogan Assessments, TypeForm, SurveyMonkey. Edge cases: partially completed assessments, ties between strength areas, users who scored uniformly low or uniformly high across all competencies."
}
```

---

## Rationale Notes (for downstream agents)

### Why `education` and not `hr`

The job explicitly frames this as a "career skills self-assessment tool that individuals can complete online" — the primary user action is self-directed learning and reflection, not HR workflow management. The admin dashboard is secondary to the assessment experience itself. `education` is the closest domain fit. The `hr` domain applies better to employee management, onboarding, and compliance workflows that organizations manage on behalf of employees — this is a self-directed individual tool.

### Why `dashboard-app` and not `multi-screen-walkthrough`

The client's most complex deliverable is the admin reporting interface ("view number of users, response data, aggregated insights, export CSV"). This is the hardest part to describe in a cover letter and the most valuable part to visualize in a demo. Making the admin dashboard the primary Tab 1 surface — with the questionnaire flow as a navigable feature page — gives the demo more density and more to explore. A `multi-screen-walkthrough` centered on the questionnaire UX would underweight the admin/reporting functionality the client described in equal detail.

### Why `Lead Intake CRM` as the primary portfolio match

Lead Intake CRM (#3) matches this job most closely on structure: public-facing form with multi-step flow, backend data storage, admin dashboard with real-time stats, and configurable rules. The assessment tool replaces "lead pipeline" with "assessment responses" but the full-stack architecture is nearly identical — public intake form, scored data, admin view, export. The client should recognize the parallel immediately.

### Why cover letter variant C ("Similar Build")

The client has already built a concept — they know what they want. What they need is confidence that the developer has built the structural equivalent before and can execute without hand-holding. Leading with the Lead Intake CRM parallel ("multi-step form, scoring, admin dashboard, email delivery") and bridging to their assessment use case is the highest-value opening. They're not looking to be impressed by a clever observation — they're looking for evidence of execution.

### Screening question note

No screening questions were present in this job post. The cover letter should carry all the hook work.

### Budget note

Budget was not listed. The scope described (front-end assessment UX + scoring logic + email delivery + backend + admin dashboard + reporting + CSV export) is a $2,000-$6,000 project at standard rates. The demo should convey this scope without underselling it — the admin dashboard being fully functional in the demo is the strongest signal of scope awareness.

### Timing note

Job was posted 1 hour ago. This is a high-priority submission window. Target build and submission within 60-90 minutes for maximum positioning advantage.
```
