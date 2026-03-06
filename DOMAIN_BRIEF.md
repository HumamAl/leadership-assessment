# Domain Knowledge Brief — Leadership and Career Skills Assessment Platform

## Sub-Domain Classification

Interactive self-assessment SaaS platform for individual leadership and career competency evaluation. Target user: mid-level to senior professionals (individual contributors through directors) completing a structured questionnaire, receiving a scored competency report, and accessing a development plan. Secondary user: HR administrators/L&D managers viewing aggregate analytics and individual result records.

Closest analogues: Leadership Circle Profile (self-assessment module), Culture Amp (development plan workflow), iMocha (assessment delivery + admin analytics). This is NOT a 360-degree feedback tool — it is a self-report model with optional email report delivery.

---

## Job Analyst Vocabulary — Confirmed and Extended

No Job Analyst brief was provided. Research below establishes the domain vocabulary from first principles using industry sources (Korn Ferry Leadership Architect, Leadership Circle Profile, CCL Benchmarks, Culture Amp, Hogan Assessments, and coaching practitioner literature).

### Confirmed Primary Entity Names

These are the words that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, and search placeholders.

- Primary record type: **Assessment** (not "quiz", not "test", not "survey")
- User completing an assessment: **Participant** (not "user", not "respondent" in B2B context)
- Group taking an assessment together: **Cohort** (not "batch", not "group")
- The skill being measured: **Competency** (not "skill category", not "trait", not "dimension" — though "dimension" is acceptable in chart labels)
- Set of related competencies: **Competency Cluster** or just **Cluster** (Korn Ferry uses clusters of 3-4 competencies each; CCL uses "skill categories")
- The overarching score category: **Factor** (Korn Ferry: 4 factors — Self, People, Thought, Results)
- Score for a single competency: **Competency Score** (format: 0–100 scaled, or 1–5 raw average)
- Score across all competencies: **Overall Leadership Score** or **Leadership Effectiveness Score**
- Comparison data: **Benchmark** or **Norm Group** (never "average" alone — it's always "benchmark score" or "percentile rank")
- The output delivered: **Assessment Report** or **Development Report** (never just "report")
- Plan for improvement: **Individual Development Plan** or **IDP** (HR standard acronym, universally recognized)
- Weaknesses that appear under stress: **Derailers** (Hogan-originated but industry-standard coaching term)
- Areas of strength being applied too broadly: **Overused Strengths** (not "weaknesses", not "blind spots" — though "blind spot" is used specifically for the gap between self-perception and others' perception)
- Priority development areas: **Growth Edges** (coaching vocabulary; less clinical than "development needs")
- Admin user: **Administrator** or **HR Admin** (not "superuser")

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Completion Rate | % of invited participants who submitted a completed assessment | % (e.g., 74.2%) |
| Average Overall Score | Mean leadership effectiveness score across all participants | Score out of 100 (e.g., 67.4/100) |
| Median Competency Score | Middle score for a specific competency across a cohort | 1–5 or 0–100 |
| Assessment Volume | Total assessments submitted in a time period | Integer count |
| Avg. Time to Complete | Mean elapsed time from assessment start to submission | Minutes (e.g., 18.4 min) |
| Drop-Off Rate | % of started assessments that were abandoned (not submitted) | % (e.g., 12.7%) |
| Score Distribution | % of participants in each tier (High / Developing / At Risk) | % breakdown |
| Top Competency | Highest-scoring competency cluster across the cohort | Competency name + score |
| Development Priority | Lowest-scoring competency cluster across the cohort | Competency name + score |
| Report Open Rate | % of emailed reports that were opened by participants | % |
| Active Cohorts | Number of currently running assessment programs | Integer count |
| Percentile Rank | Where a participant's score falls vs. the benchmark norm group | Percentile (e.g., 72nd) |
| IDP Adoption Rate | % of participants who created a development plan post-report | % |

### Status Label Vocabulary

Active states (assessment is in progress):
- **In Progress** — participant has started but not submitted
- **Pending** — invited but not yet started
- **Invited** — invitation sent, awaiting first action

Terminal states (assessment is completed):
- **Submitted** — completed and recorded (preferred over "completed" in this domain)
- **Report Sent** — assessment submitted and PDF/email delivered
- **Report Viewed** — report link opened by participant

Problem states:
- **Abandoned** — started but inactive for 7+ days with no submission
- **Expired** — invitation window closed before submission
- **Flagged** — score pattern indicates data quality concern (e.g., all responses identical)

IDP / Development Plan states:
- **Not Started** — report received, no development plan created
- **Draft** — development plan created but not finalized
- **Active** — development plan in use (has set action items with target dates)
- **Completed** — all development plan milestones marked done

### Workflow and Action Vocabulary

Primary actions (button labels, action menus):
- **Invite Participants** — send assessment invitation links to a cohort
- **Launch Assessment** — activate a new assessment program
- **Send Reminder** — re-send invitation to pending/in-progress participants
- **Generate Report** — trigger PDF report creation and email delivery
- **Archive Cohort** — close and archive a completed assessment group
- **Export Results** — download CSV/XLSX of cohort scores

Secondary actions:
- **Rescore** — recalculate a participant's scores (e.g., after norm group change)
- **Extend Deadline** — push expiration date for a cohort
- **Flag for Review** — mark a participant record for manual review (response pattern anomaly)
- **Assign to Cohort** — move a participant to a specific cohort
- **Download IDP** — export a participant's individual development plan

### Sidebar Navigation Candidates

These use domain vocabulary — not generic labels:

1. **Overview** — admin summary dashboard (acceptable because this mirrors Leapsome/Culture Amp's "Home Dashboard" pattern)
2. **Assessments** — all assessment programs and cohorts
3. **Participants** — individual participant records and scores
4. **Competency Scores** — aggregate scoring by competency across cohorts
5. **Development Plans** — IDP status and adoption tracking
6. **Reports** — generated report log, delivery status, open rates
7. **Cohorts** — cohort management (create, invite, monitor, archive)
8. **Benchmarks** — norm group data and percentile configuration

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

The leadership assessment and HR tech space has a recognizable visual language that practitioners associate with credibility. Tools like Culture Amp, Leapsome, and 15Five operate in a "SaaS Modern" register: spacious card layouts, clean sans-serif typography, generous white space, and data visualizations that feel humanistic (warm accent colors, rounded bar charts) rather than cold or clinical.

This is explicitly NOT the Bloomberg Terminal aesthetic. The people using these tools are HR leaders and L&D professionals — people who care about employee experience and psychological safety. Dense, dark, or data-terminal-style UIs would create immediate cognitive friction. The visual cue that signals "we understand your world" is a clean, structured interface that treats people as the primary data entities rather than transactions.

Radar/spider charts are the signature visualization of this domain. Every serious assessment tool — from the Leadership Circle Profile to Culture Amp's skill matrix — uses a radar chart to display multi-dimensional competency scores. Practitioners are conditioned to read them. A demo that shows a radar chart immediately reads as domain-appropriate. Bar charts are used secondarily for comparison and ranking views. Funnel charts (for drop-off analysis) appear in admin analytics.

The assessment-taking experience (participant-facing) tends toward single-question-per-screen flows with large readable text, clear progress indicators, and a muted color palette that reduces anxiety. Likert-scale response options are displayed as large, labeled buttons — not radio inputs. This is the Typeform influence on the assessment-delivery UX pattern.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Culture Amp** — The reference tool for HR/L&D professionals in growth-stage companies. Uses warm off-white backgrounds, teal/coral accent palette, spacious card grids, and competency radar charts. Their competency-based development plans (launched 2024) mirror exactly the workflow the client is describing. Recognizing Culture Amp's visual language immediately signals domain expertise.

2. **15Five** — Manager Effectiveness Indicator dashboard, HR Outcomes Dashboard. Uses indigo and slate tones, card-based layouts with large metric numbers at top. The MEI tile (overall score out of 100) is a paradigm for the "leadership effectiveness score" concept. HR admins who have evaluated platforms will have seen 15Five's dashboard.

3. **Leapsome** — Performance management + assessment platform. Review cycle dashboards with completion tracking, cohort views, and competency scoring. Uses a green-teal brand with structured data tables and filter panels. The "review cycle status dashboard" is a direct analogue to the admin analytics view the client needs.

4. **Leadership Circle Profile** — The premium 360-degree assessment product used by executive coaches and large organizations. Distinctive circular radar chart with inner/outer rings (reactive vs. creative leadership). The visual language sets the high-end benchmark in the leadership assessment sub-domain specifically.

### Aesthetic Validation

- **Job Analyst chose**: SaaS Modern (inferred from context — this is the appropriate default for HR tech)
- **Domain validation**: Confirmed — the leadership assessment space uses SaaS Modern conventions. Culture Amp, 15Five, and Leapsome all operate in this register. Warm, spacious, people-forward. Avoid Data-Dense or Corporate Enterprise aesthetics.
- **Color adjustment**: The domain's strongest practitioners (Culture Amp, Leapsome) use teal/indigo + warm neutrals. A primary color in the teal-to-indigo range (hue 200–250) with warm off-white backgrounds will read as "built for this space." Coral or amber makes an effective accent for highlighted scores and alerts.

### Format Validation

- **Job Analyst chose**: dashboard-app (inferred — client described an admin dashboard)
- **Domain validation**: Confirmed — the client explicitly mentions an admin dashboard for analytics. The participant-facing assessment flow would be shown as one of the feature pages (a multi-step questionnaire flow within the dashboard format). `dashboard-app` is correct.
- **Format-specific design notes**: The demo should show both the admin analytics perspective (main dashboard: cohort completion metrics, score distributions, competency heatmap) AND a participant results view (radar chart, competency breakdown, growth edges). These are the two "money views" that a domain expert will expect to see. The assessment-taking flow itself (questionnaire with Likert buttons) should appear as a feature page — it is one of the most differentiating interactive elements and should be built with real stepthrough interactivity.

### Density and Layout Expectations

Standard density — not compact, not spacious. This mirrors Culture Amp and 15Five's layouts. Enough information per screen to be functional for an HR admin reviewing cohort results, but not so dense that it creates cognitive overload.

The admin dashboard leans toward card-based views for KPI summary, table-based views for participant lists, and chart-heavy views for score analysis. The participant results view is spacious and readable (similar to how Gallup CliftonStrengths presents results — one insight at a time, with breathing room).

The competency scoring view is the one area where higher density is appropriate: a ranked list of all competency scores with horizontal bar indicators and delta-from-benchmark values is expected by practitioners.

---

## Entity Names (10+ realistic names)

### Companies / Organizations (Clients / Cohort Organizations)

These represent the organizations whose employees are taking assessments:

1. Meridian Health Partners
2. Crestline Financial Group
3. Apex Technologies Inc.
4. Northbridge Capital Advisors
5. Summit Consumer Brands
6. Vantage Operations LLC
7. Clearwater Consulting Group
8. Riverway Logistics Corp.
9. Harborview Media Group
10. Bytecraft Labs
11. Irongate Manufacturing
12. Luminary Education Partners

### People Names (Participants)

Reflect the workforce demographics of mid-to-senior professionals in corporate environments. Mix gender and ethnicity authentically:

1. Priya Chandrasekaran — Senior Product Manager, Bytecraft Labs
2. Marcus Webb — Director of Operations, Meridian Health Partners
3. Sofia Andersen — VP of Customer Success, Apex Technologies
4. Jared Okafor — Regional Sales Manager, Crestline Financial Group
5. Lin Yao — Engineering Lead, Vantage Operations
6. Rachel Goldstein — Head of L&D, Summit Consumer Brands
7. Carlos Restrepo — Senior Consultant, Clearwater Consulting Group
8. Aisha Mohammed — Program Director, Luminary Education Partners
9. Daniel Forsythe — Chief of Staff, Harborview Media Group
10. Nadia Petrov — Operations Manager, Riverway Logistics
11. Kevin Osei-Bonsu — Senior Engineer, Bytecraft Labs
12. Tomoko Hayashi — Director, Product Strategy, Apex Technologies

### Assessment Programs / Cohorts

These are named the way HR teams actually name cohort programs:

1. Q1 2026 High-Potential Cohort
2. Director-Level Leadership Readiness — March 2026
3. New Manager Foundations — Cohort 4
4. Senior IC to Manager Transition Program
5. Executive Leadership Development Series — Wave 2
6. Mid-Year Performance Calibration Cohort
7. Sales Leadership Accelerator — APAC
8. Emerging Leaders Program — Intake 7
9. Cross-Functional Leadership Track — Q2 2026
10. People Manager Effectiveness Baseline

### Competency Names (from Korn Ferry / CCL / Leadership Circle research)

The four factors and representative competencies that appear in the mock data:

**Factor 1 — Results (Drives Outcomes)**
- Ensures Accountability
- Drives Results
- Action Oriented
- Manages Complexity

**Factor 2 — People (Connects and Develops)**
- Develops Talent
- Builds Effective Teams
- Instills Trust
- Communicates Effectively
- Interpersonal Savvy

**Factor 3 — Thought (Strategic and Innovative)**
- Strategic Mindset
- Manages Ambiguity
- Decision Quality
- Business Insight

**Factor 4 — Self (Personal Effectiveness)**
- Self-Development
- Manages Stress
- Demonstrates Resilience
- Learning Agility

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Completion Rate (per cohort) | 42% | 68-74% | 91% | Mandatory org programs hit 85%+; voluntary self-selection ~55% |
| Average Overall Leadership Score | 48/100 | 63-71/100 | 84/100 | Scores skew slightly right (self-reporting tends toward mild inflation) |
| Avg. Time to Complete | 11 min | 17-22 min | 38 min | Longer = more reflective OR distracted; under 10 min = suspicious |
| Drop-Off Rate | 4% | 11-16% | 28% | If >20%, UX or question clarity issue |
| Participants per Cohort | 8 | 24-47 | 180 | Small org pilot vs. enterprise department rollout |
| Questions per Assessment | 24 | 36-52 | 72 | Depends on number of competencies × items per competency |
| Competency Score (individual) | 1.4/5 | 3.1-3.8/5 | 4.7/5 | Raw Likert average; 5-point scale most common |
| Percentile Rank | 12th | 54th-68th | 94th | Relative to norm group; top-quartile leaders score 75th+ |
| Report Open Rate (email) | 38% | 67-79% | 94% | Mandatory programs: higher; voluntary: lower |
| IDP Adoption Rate | 18% | 41-56% | 78% | Requires active follow-through post-report |
| Cohorts per Admin Account | 1 | 3-8 | 22 | Active cohorts; archived count is higher |
| Active Assessments (platform-wide per month) | 14 | 80-340 | 1,200+ | Depends on org size and licensing tier |
| Score Gap (self vs. benchmark) | -18 pts | -4 to +6 pts | +21 pts | Distance from norm group median |

---

## Industry Terminology Glossary (12+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Competency | A defined behavioral skill with observable indicators and scoring criteria | Primary unit of measurement in all assessment frameworks |
| Competency Cluster | A thematically related group of 3-5 competencies (e.g., "Building Relationships") | Used in Korn Ferry and CCL frameworks; appears in chart category grouping |
| Factor | A top-level category grouping multiple clusters (e.g., "Thought", "Results", "People", "Self") | Korn Ferry uses 4 factors; used for high-level score summary |
| Likert Scale | A response format using a 5-point or 7-point agreement or frequency scale | Assessment question format; "1 = Not at all like me" to "5 = Very much like me" |
| Norm Group | The reference population against which individual scores are benchmarked | "Your score of 3.6 is above the norm group average of 3.2" |
| Percentile Rank | Where a score falls relative to the norm group; 67th = scoring higher than 67% of norm group | Displayed on individual reports and in admin analytics |
| Derailer | A behavioral tendency that becomes a liability under stress, pressure, or new challenges | Hogan-originated; used in coaching debrief conversations; appears in report "Watch Out" sections |
| Blind Spot | A competency where self-score is significantly higher than observer-average (in 360 tools) or where score is low but participant is unaware | Used in development conversation framing |
| Overused Strength | A competency where high proficiency, when overapplied, creates negative side effects (e.g., "Results focus" → micromanagement) | Appears in report "Risk Flags" or "Development Considerations" |
| Growth Edge | A competency that is below benchmark AND identified as a high-leverage development target | Coaching vocabulary; appears in IDP and report narrative sections |
| IDP (Individual Development Plan) | A structured document with 1-3 focus competencies, learning resources, action steps, and target dates | Post-assessment output; HR tracks adoption rate |
| Learning Agility | The ability to learn from experience and apply insights in new situations; considered a meta-competency predictive of leadership potential | Used as a standalone competency in Korn Ferry and CCL frameworks |
| Ceiling Effect | When a score distribution is skewed high (many participants at 4.5-5.0) suggesting the scale didn't differentiate well | Data quality flag in admin analytics |
| Response Bias | Systematic distortion in self-report scores (e.g., social desirability bias, acquiescence bias) | Flagged when all responses cluster near one end of the scale |
| Cohort Report | An aggregate report showing score distributions, top/bottom competencies, and completion metrics across all participants in a cohort | Admin-facing output; distinct from the individual participant report |

---

## Common Workflows

### Workflow 1: Launching a New Assessment Cohort

This is the primary admin workflow. It creates the assessment program that participants will complete.

1. Admin navigates to **Assessments** → **New Cohort**
2. Selects assessment template (e.g., "Full Leadership Profile — 52 items" or "Quick Scan — 24 items")
3. Names the cohort (e.g., "Q1 2026 High-Potential Cohort")
4. Configures norm group / benchmark (industry, company size, role level)
5. Sets invitation window and expiration date
6. Uploads participant list (name, email, role, department) or selects from existing participants
7. Reviews cohort settings and clicks **Launch Assessment**
8. System generates unique assessment links and sends invitation emails
9. Admin monitors **Cohort Dashboard**: real-time completion rate, drop-off tracking, reminder schedule
10. After deadline: clicks **Generate Cohort Report** — system compiles individual PDFs and aggregate analytics
11. Admin reviews cohort summary, sends reports to participants or their managers

### Workflow 2: Participant Completing an Assessment

The end-user experience. This is what participants see when they click their invitation link.

1. Participant clicks personal invitation link in email
2. Lands on **Welcome Screen**: assessment name, time estimate (~20 min), how results are used
3. Progresses through **Competency Questionnaire**: one question per screen (or 3-4 per screen grouped by competency)
4. Each question: "Rate how much this statement describes you" → 5 Likert options labeled: "Not at all like me / Slightly like me / Somewhat like me / Mostly like me / Very much like me"
5. Progress bar shows completion % and estimated remaining time
6. Final screen: optional open-text reflection question ("What leadership challenge are you currently navigating?")
7. **Submission confirmation**: "Your assessment is submitted. Your personalized report will be delivered to {email} within 24 hours."
8. Receives email with PDF report link + invitation to create an Individual Development Plan
9. Participant views **Results Dashboard**: radar chart of competency scores, top 3 strengths, 2-3 growth edges, benchmark comparison
10. Optionally creates IDP: selects 1-2 focus competencies, adds action steps and target dates

### Workflow 3: Admin Reviewing Individual Participant Results

Drill-down workflow for HR admins or executive coaches reviewing a specific participant's data.

1. Admin navigates to **Participants** → searches by name or cohort
2. Opens participant record: shows profile (name, role, cohort), assessment status, submission date, time taken
3. Views **Score Summary**: overall score, percentile rank, factor-level scores (Results / People / Thought / Self)
4. Expands **Competency Detail**: full ranked list of all competency scores vs. benchmark
5. Reviews **Flagged Items** (if any): response pattern anomalies, incomplete sections
6. Clicks **Download Report** (PDF) or **Send Report** (email to participant/manager)
7. Views **IDP Status**: whether participant started a development plan, which competencies they selected, action items added
8. Optionally adds **Coaching Notes** (private, admin-only field)

---

## Common Edge Cases

These become specific records in mock data — every dataset needs at least 2.

1. **Abandoned Assessment** — Participant started (12 questions completed of 52), inactive for 11 days. Status: `abandoned`. Note: "Reminder sent 2x, no response." Common reason: started on mobile, found the format challenging.

2. **Flagged Response Pattern** — Participant answered "Mostly like me" (4) to all 52 questions with no variation. Overall score appears artificially high. Status: `flagged`. Note: "Uniform response pattern detected — possible satisficing behavior. Score reliability: Low."

3. **Expired Invitation** — Cohort deadline passed before participant submitted. Status: `expired`. Note: "Invitation sent March 3; deadline March 17; never accessed."

4. **Ceiling Effect Competency** — In a cohort of 40, "Ensures Accountability" scores average 4.6/5.0 across the group with 70% at 4.5 or above. Flagged in cohort analytics as "low discrimination — consider question revision."

5. **Outlier High Scorer** — One participant scores 87/100 overall with 94th percentile rank in a cohort where average is 63/100. Worth tagging as "high potential" for succession planning purposes.

6. **Outlier Low Scorer** — One participant scores 41/100 overall with 11th percentile rank. Status: `submitted`. Note: "Below 25th percentile on 4 of 5 factors — recommend coaching conversation before report delivery."

7. **Report Not Opened** — Assessment submitted 19 days ago, report emailed 18 days ago, email link never clicked. IDP status: `not_started`. Common trigger for admin reminder workflow.

8. **Cohort with Low Completion Rate** — Cohort of 38 invited, only 17 submitted (44.7% completion), deadline passed. Cohort admin notes: "Manager did not reinforce participation — follow-up with department head recommended."

9. **In-Progress Near Deadline** — 3 participants still `in_progress` with 2 days until cohort deadline. Triggers automatic reminder workflow.

10. **Zero-Item IDP** — Participant opened their IDP creation tool but added no action items before closing. IDP status: `draft` with 0 items. Different from `not_started` — they tried.

---

## What Would Impress a Domain Expert

These five details signal insider knowledge of the leadership assessment space:

1. **Norm Group specificity matters enormously.** Scoring a mid-level manager's results against a global executive norm group produces a misleading (typically lower) percentile rank. Real assessment platforms let admins choose norm groups by: role level (first-line manager, director, VP, C-suite), industry, company size, and geography. A demo that shows a "Norm Group: Director-Level, Technology Industry, North America" selector would immediately impress an HR leader who has been burned by mismatched benchmarking.

2. **The "Response Quality Score" concept.** Legitimate assessment platforms calculate an internal consistency measure (similar to Cronbach's alpha at the item level) to flag suspicious response patterns — all 5s, all 3s, rapid completion (under 7 minutes for a 50-item assessment). The admin-facing record shows this as a "Response Quality: High / Medium / Low" indicator. Showing this field in a participant table — even just as a data column — signals real platform knowledge.

3. **Competency ordering on the radar chart follows factor grouping.** A sophisticated radar chart places competencies in their factor clusters around the chart (not alphabetically, not randomly). This makes the visual interpretation meaningful: if the chart shows a "collapsed" section on one side, it corresponds to a factor weakness. Generic demos randomize the axes — experts notice this immediately.

4. **The "Derailer" framing is distinct from "weakness."** In coaching vocabulary, a derailer is not simply a low score. It's a behavior that is situationally appropriate most of the time but becomes problematic under pressure. An assessment report that shows "Manages Ambiguity: 2.4/5.0 — **Potential Derailer under high-pressure situations**" (not just "low score") reflects this distinction. The framing matters to executive coaches who use these tools.

5. **Development plans are tied to specific competencies, not generic goals.** A well-designed IDP doesn't say "improve leadership skills." It says: "Focus competency: Builds Effective Teams (current score: 2.9/5.0, 38th percentile) → Action: Facilitate 3 cross-functional project retrospectives before June 30 → Resource: CCL's Handbook of Leadership Development, Chapter 7." The specificity of the competency linkage is what separates serious platforms from generic goal-tracking tools.

---

## Common Systems and Tools Used

Systems practitioners in this space reference in forum discussions and job postings:

1. **Culture Amp** — People management and assessment platform; competency-based development plans
2. **Leapsome** — Performance reviews, competency scoring, IDP tracking
3. **15Five** — Manager Effectiveness Indicator; HR Outcomes Dashboard
4. **Lattice** — Performance management; growth plans; competency frameworks
5. **Korn Ferry Assessment Suite** — Enterprise leadership assessment; Leadership Architect competency cards; 360 tools
6. **Hogan Assessments** — HPI, HDS, MVPI; derailer identification; executive coaching context
7. **Leadership Circle Profile** — Premium 360 assessment; distinctive circular radar chart
8. **CCL Benchmarks 360** — Research-backed 360 suite from the Center for Creative Leadership
9. **Typeform** — Many smaller assessment tools use Typeform-style single-question-per-screen UX for questionnaire delivery
10. **Workday Peakon** — Enterprise employee engagement and assessment (large org context)

---

## Geographic / Cultural Considerations

No specific geographic constraints identified. The terminology and framework references (Korn Ferry, CCL, Hogan, Culture Amp) are primarily North American and UK-origin but globally adopted. Competency names should use US English spelling. Currency for pricing tiers: USD. Date format: MM/DD/YYYY for display but ISO 8601 (YYYY-MM-DD) for data.

If regional customization is relevant: Korn Ferry's benchmark database has separate norm groups for APAC, EMEA, and LATAM regions — this can be reflected in a "Region" filter on the benchmark selector.

---

## Data Architect Notes

Specific instructions for building `types.ts` and `mock-data.ts`:

**Entity names to use:**
- Primary records: `assessments` (the program/cohort), `participants` (the people taking them)
- Scores: `competencyScores` (per-participant per-competency scores), `cohortAggregates` (rolled-up analytics)
- Plans: `developmentPlans` (IDP records linked to participants)
- Activity: `assessmentActivity` (time-series for chart data)

**ID format:**
- Assessment programs: `ASM-2209`, `ASM-2198` (gaps for realism)
- Cohorts: `COH-0047`, `COH-0051`
- Participants: `PAR-1841`, `PAR-1843` (non-sequential)
- Development plans: `IDP-0094`, `IDP-0097`

**Score field conventions:**
```ts
rawScore: 3.8         // Likert average, 1 decimal (1.0–5.0)
scaledScore: 76       // 0–100 integer (rawScore × 20)
percentileRank: 68    // integer 1–99
benchmarkScore: 3.4   // norm group median for this competency (1 decimal)
delta: 0.4            // participant score minus benchmark (signed, 1 decimal)
responseQuality: "high" | "medium" | "low" | "flagged"
```

**Competency score distribution for a realistic 20-participant cohort:**
- 3-4 participants with overall scores 75-87 (above benchmark)
- 10-12 participants in 58-74 range (near benchmark)
- 3-4 participants in 45-57 range (below benchmark)
- 1-2 participants below 44 (significant development need)
- 1 flagged record (uniform response pattern)
- 1 abandoned record (never submitted)

**Status distribution for a 20-participant cohort in progress:**
- 11-12 submitted (55-60%)
- 3-4 in_progress
- 2-3 pending (invited, not started)
- 1-2 abandoned
- 1 expired
- 1 flagged (submitted but response quality issue)

**Competency score clusters to build (use these exact names):**
```ts
const competencies = [
  // Factor: Results
  { id: "COMP-01", name: "Ensures Accountability", factor: "Results", cluster: "Achieving Results" },
  { id: "COMP-02", name: "Drives Results", factor: "Results", cluster: "Achieving Results" },
  { id: "COMP-03", name: "Action Oriented", factor: "Results", cluster: "Achieving Results" },
  { id: "COMP-04", name: "Manages Complexity", factor: "Results", cluster: "Problem Solving" },
  // Factor: People
  { id: "COMP-05", name: "Develops Talent", factor: "People", cluster: "Developing People" },
  { id: "COMP-06", name: "Builds Effective Teams", factor: "People", cluster: "Developing People" },
  { id: "COMP-07", name: "Instills Trust", factor: "People", cluster: "Interpersonal Effectiveness" },
  { id: "COMP-08", name: "Communicates Effectively", factor: "People", cluster: "Interpersonal Effectiveness" },
  { id: "COMP-09", name: "Interpersonal Savvy", factor: "People", cluster: "Interpersonal Effectiveness" },
  // Factor: Thought
  { id: "COMP-10", name: "Strategic Mindset", factor: "Thought", cluster: "Strategic Thinking" },
  { id: "COMP-11", name: "Decision Quality", factor: "Thought", cluster: "Strategic Thinking" },
  { id: "COMP-12", name: "Manages Ambiguity", factor: "Thought", cluster: "Agility" },
  { id: "COMP-13", name: "Business Insight", factor: "Thought", cluster: "Agility" },
  // Factor: Self
  { id: "COMP-14", name: "Learning Agility", factor: "Self", cluster: "Personal Effectiveness" },
  { id: "COMP-15", name: "Self-Development", factor: "Self", cluster: "Personal Effectiveness" },
  { id: "COMP-16", name: "Demonstrates Resilience", factor: "Self", cluster: "Personal Effectiveness" },
];
```

**Chart time-series for admin dashboard (assessments submitted per month):**
Assessment platforms show higher activity in January (post-performance review cycle), March-April (Q1 close), and September-October (mid-year review + Q4 planning). Summer is slower.
```ts
// Monthly assessment submission volume — realistic seasonality
[
  { month: "Apr", submitted: 847, invited: 1103, completionRate: 76.8 },
  { month: "May", submitted: 712, invited: 940, completionRate: 75.7 },
  { month: "Jun", submitted: 634, invited: 871, completionRate: 72.8 },
  { month: "Jul", submitted: 421, invited: 613, completionRate: 68.7 }, // summer dip
  { month: "Aug", submitted: 389, invited: 581, completionRate: 66.9 }, // summer dip
  { month: "Sep", submitted: 891, invited: 1214, completionRate: 73.4 }, // mid-year spike
  { month: "Oct", submitted: 1043, invited: 1387, completionRate: 75.2 },
  { month: "Nov", submitted: 978, invited: 1301, completionRate: 75.2 },
  { month: "Dec", submitted: 647, invited: 912, completionRate: 71.0 }, // holiday slowdown
  { month: "Jan", submitted: 1247, invited: 1618, completionRate: 77.1 }, // post-review spike
  { month: "Feb", submitted: 1089, invited: 1413, completionRate: 77.1 },
  { month: "Mar", submitted: 1184, invited: 1529, completionRate: 77.4 }, // Q1 close
]
```

**Avoid these data mistakes:**
- Do NOT name competencies generically ("Communication", "Leadership", "Teamwork") — use the exact Korn Ferry names listed above
- Do NOT use round scores (3.0, 4.0, 75%) — use: 3.4, 3.7, 74.2%
- Do NOT show uniform score distributions — spread them per the distribution guidance above
- Do NOT forget the flagged and abandoned edge cases — they are essential for the admin UI to be believable
- The IDP dataset should include some plans with action items and some empty (showing adoption gap)

**Relational structure:**
- `cohorts` → `participants` (one cohort has many participants)
- `participants` → `competencyScores` (one participant has one score per competency)
- `participants` → `developmentPlans` (one participant has zero or one IDP)
- `competencies` → `competencyScores` (reference list)
- `cohorts` → `cohortAggregates` (summary analytics per cohort)

---

## Layout Builder Notes

- **Recommended density**: Standard (not compact). Culture Amp and Leapsome use standard density. Generous card padding (1.5rem). The data is people-centric, not transaction-centric — space matters.
- **Sidebar width**: 16rem (standard). Nav labels are moderate length. The label "Competency Scores" (17 chars) is the longest — fits at 16rem comfortably.
- **Domain-specific visual patterns**: Radar/spider chart on the main dashboard overview is a genre expectation. A horizontal competency ranking list (all competencies sorted by score, with benchmark delta indicators) is the second expected pattern. Progress indicators for cohort completion are expected in the cohort view — circular progress rings or simple % bars both work.
- **Color nuance**: Primary color in teal-to-indigo range (oklch hue 200–240). Status colors: success green for submitted/above-benchmark, warning amber for in-progress/near-deadline, destructive red for abandoned/flagged. Avoid clinical blues — warm the teal slightly toward green-blue rather than pure cyan.
- **Badge patterns**: Status badges are heavily used in this domain. Every participant record shows a status badge. Competency scores should have conditional color: green (above benchmark), neutral (at benchmark ±0.3), amber (below benchmark), red (significantly below). These badges are the "glanceability" layer practitioners expect.

---

## Demo Screen Builder Notes

- **Hero metric (largest stat card)**: Overall Completion Rate for the current active cohort — format as a large percentage with trend arrow vs. previous cohort. This is the first number an HR admin looks at.
- **Second stat**: Average Overall Leadership Score (e.g., 67.4/100) with benchmark indicator (e.g., "+ 3.2 vs. industry benchmark")
- **Third stat**: Active Participants count with "X submitted, Y in progress, Z pending" breakdown
- **Fourth stat**: IDP Adoption Rate — shows post-assessment engagement

- **Primary chart**: Radar/spider chart showing cohort-average competency scores across the 4 factors (16 competencies plotted, grouped by factor). This is the domain's signature visualization. It should be the largest visual element on the main dashboard. Color the benchmark polygon a neutral gray; color the cohort scores in the primary brand color.

- **Secondary chart**: Bar chart showing month-over-month assessment volume (submitted vs. invited) — for the trend view. Shows seasonal patterns.

- **Domain-specific panel that would impress a practitioner**: A "Competency Ranking" table listing all 16 competencies sorted by cohort average score (highest to lowest), with three columns: Competency Name, Average Score (bar indicator), Delta vs. Benchmark (colored +/- value). This is the "what does the cohort need to work on" view that HR admins use for L&D planning. No competitor demo would show this without deep domain knowledge.

- **For the assessment-taking feature page**: Single-question-per-screen Likert interface. Large question text, 5 labeled buttons horizontally arranged ("Not at all like me" → "Very much like me"), progress bar at top showing "Question 14 of 52", competency cluster label above the question ("Interpersonal Effectiveness"). This is the Typeform-influenced pattern used by all modern assessment tools.

- **For the participant results feature page**: Full-width radar chart (top), then a 3-column card grid: "Top Strengths" (2-3 competencies with high scores and descriptions), "Growth Edges" (2-3 competencies with below-benchmark scores), "Derailer Alerts" (1-2 competencies with notes about overuse risk). Below: full competency ranking table. Bottom: CTA to create IDP.

Sources used in this research:
- [Korn Ferry Leadership Architect](https://www.kornferry.com/capabilities/talent-suite/korn-ferry-assess/leadership-architect)
- [Korn Ferry 38 Competencies (Medium)](https://medium.com/@patrick-oh-sglion65/the-korn-ferry-38-competencies-are-a-set-of-behaviors-that-are-seen-as-critical-for-success-in-e237778cac94)
- [Leadership Circle Profile — 360 Assessment](https://leadershipcircle.com/leadership-assessment-tools/leadership-circle-profile/)
- [CCL Benchmarks 360 Assessment](https://www.ccl.org/leadership-solutions/leadership-development-tools/leadership-assessments/benchmarks-360-assessments/)
- [Culture Amp — Competency-Based Development Plans](https://www.cultureamp.com/blog/competency-based-development-plan)
- [15Five Manager Effectiveness Indicator](https://success.15five.com/hc/en-us/articles/15817970159771-Manager-Effectiveness-Indicator-MEI-Reporting-in-the-HR-Outcomes-Dashboard)
- [Leapsome Review Cycle Dashboard](https://help.leapsome.com/hc/en-us/articles/360017968418-Review-cycle-dashboard-Status-of-an-active-review-cycle)
- [Hogan Assessments — Derailers](https://improvedge.com/understanding-your-derailers-how-the-hogan-assessment-helps-leaders-anticipate-responses/)
- [Leadership Blind Spots](https://hrprofilingsolutions.com.au/blogs/aus-webinars/identify-leadership-blind-spots-overused-styles/)
- [iMocha Leadership Assessment](https://www.imocha.io/tests/leadership-assessment-test)
- [AIHR — 360 Degree Feedback Guide](https://www.aihr.com/blog/360-degree-feedback/)
- [SurveyMonkey — Likert Scale](https://www.surveymonkey.com/mp/likert-scale/)
