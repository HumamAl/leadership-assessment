import { ExternalLink, TrendingUp } from "lucide-react";
import { profile, portfolioProjects, heroStats, approachTimelines, ctaContent } from "@/data/proposal";
import { SkillsGrid } from "@/components/proposal/skills-grid";

export const metadata = { title: "Work With Me" };

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

        {/* ── Section 1: Hero — dark panel ── */}
        <section
          className="relative rounded-lg overflow-hidden"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 170))" }}
        >
          {/* Subtle radial highlight — teal tint at top-left */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 15% 25%, oklch(0.55 0.15 170 / 0.14), transparent 60%)",
            }}
          />

          <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 space-y-5">
            {/* Effort badge — mandatory */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="font-mono text-xs tracking-wider text-white/70">
                Built this demo for your project
              </span>
            </div>

            {/* Role prefix */}
            <p className="font-mono text-xs tracking-widest uppercase text-white/40">
              Full-Stack Developer
            </p>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl leading-none tracking-tight">
              <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
              <span className="font-bold text-white">{profile.name}</span>
            </h1>

            {/* Tailored value prop */}
            <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
              {profile.tagline}
            </p>
          </div>

          {/* Stats shelf */}
          <div className="relative z-10 border-t border-white/10 bg-white/5 px-8 py-5 md:px-12">
            <div className="grid grid-cols-3 gap-6">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Proof of Work ── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Proof of Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Built for real clients, shipped to production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className="linear-card p-5 space-y-3"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold leading-snug">{project.title}</h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                      style={{ transitionDuration: "var(--dur-fast)" }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Outcome statement — always present */}
                {project.outcome && (
                  <div
                    className="flex items-start gap-2 rounded-md px-3 py-2"
                    style={{
                      backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
                      border: "1px solid color-mix(in oklch, var(--success) 15%, transparent)",
                    }}
                  >
                    <TrendingUp className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
                    <p className="text-xs font-medium text-[color:var(--success)]">
                      {project.outcome}
                    </p>
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Relevance note */}
                {project.relevance && (
                  <p className="text-xs text-primary/80 italic leading-relaxed">
                    {project.relevance}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: How I Work ── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Process
            </p>
            <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
            <p className="text-sm text-muted-foreground mt-1">
              No surprises. Visible progress. Short feedback loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.approach.map((step, index) => {
              const meta = approachTimelines[index];
              return (
                <div
                  key={step.title}
                  className="linear-card p-5 flex gap-4"
                >
                  <div className="shrink-0 pt-0.5">
                    <span
                      className="font-mono text-2xl font-bold tabular-nums"
                      style={{
                        background: "linear-gradient(to bottom, var(--primary), color-mix(in oklch, var(--primary) 40%, transparent))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {meta?.step ?? String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold">{step.title}</h3>
                      {meta?.timeline && (
                        <span className="font-mono text-xs text-muted-foreground shrink-0">
                          {meta.timeline}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section 4: Skills Grid ── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Tech Stack
            </p>
            <h2 className="text-2xl font-bold tracking-tight">What I Build With</h2>
          </div>
          <SkillsGrid categories={profile.skillCategories} />
        </section>

        {/* ── Section 5: CTA — dark panel ── */}
        <section
          className="relative rounded-lg overflow-hidden text-center"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 170))" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 100%, oklch(0.55 0.15 170 / 0.10), transparent 60%)",
            }}
          />

          <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 space-y-4">
            {/* Pulsing availability indicator */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
              </span>
              <span
                className="text-sm"
                style={{ color: "color-mix(in oklch, var(--success) 85%, white)" }}
              >
                Currently available for new projects
              </span>
            </div>

            {/* Headline — specific to this job */}
            <h2 className="text-2xl font-bold text-white">
              {ctaContent.headline}
            </h2>

            {/* Body copy — not templated */}
            <p className="text-white/70 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
              {ctaContent.body}
            </p>

            {/* Primary action — text, not a dead-end button */}
            <p className="text-base font-semibold text-white pt-2">
              Reply on Upwork to start
            </p>

            {/* Secondary: back to the demo */}
            <a
              href="/"
              className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/70 transition-colors"
              style={{ transitionDuration: "var(--dur-fast)" }}
            >
              ← Back to the demo
            </a>

            {/* Signature */}
            <p className="pt-4 text-sm text-white/40 border-t border-white/10 mt-4">
              — {ctaContent.authorName}
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
