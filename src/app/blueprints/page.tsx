const pillars = [
  {
    title: "1. Version-pin your context",
    body: "Before any agent or human touches a repo, pin what you know. ARCHITECTURE.md, DECISIONS.md, FLOW.md — committed, public, versioned. Context cost is the hidden tax on every codebase; we pay it once, in writing.",
    code: "AGENTS.md\n+ ARCHITECTURE.md\n+ DECISIONS.md\n= context, pinned",
  },
  {
    title: "2. Read every diff. Twice.",
    body: "No blind 'ship it'. Every change is a diff that gets reviewed against the decision log. If a diff contradicts a written decision, the diff is wrong — or the decision is, and we update both at once.",
    code: "git diff origin/main..HEAD\n# read it. then read it again.",
  },
  {
    title: "3. One change per request.",
    body: "Small, atomic, reviewable changes. One feature request = one scope = one routing. This is what makes 'no merge conflicts' and 'instant rollbacks' possible. It's boring. It ships.",
    code: "request → plan → one diff → verify → merge",
  },
  {
    title: "4. A rollback plan, always.",
    body: "Every branch has an exit. If a change can't be reverted in under a minute, it wasn't designed correctly. Software that can't roll back is software that can't be trusted.",
    code: "git revert HEAD --no-edit\n# done. under a minute.",
  },
];

const diary = [
  {
    date: "Day 1 — 04:12",
    entry:
      "Pinned the architecture of this site before writing a line. ARCHITECTURE.md first, then the hero.",
    tag: "pin",
  },
  {
    date: "Day 1 — 06:30",
    entry:
      "Wrote DECISIONS.md. Next.js 15, App Router, Tailwind v4, emerald accent. Decided before building, so I can justify it later.",
    tag: "decide",
  },
  {
    date: "Day 1 — 09:15",
    entry:
      "One diff per page. Homepage first. If it breaks, revert one commit, not a rewrite.",
    tag: "diff",
  },
];

export const metadata = {
  title: "Blueprints — Sam",
  description:
    "Open-source method: version-pinned context, read-every-diff, one change per request, rollback plans.",
};

export default function BlueprintsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">
          /blueprints
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          How I work. Open-sourced.
        </h1>
        <p className="mt-3 text-sm text-muted sm:text-base">
          This is what people ask for when they say <span className="text-foreground">"work"</span>.
          Not the output — the method. The discipline that makes AI + human
          collaboration actually ship.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid gap-6 md:grid-cols-2">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="flex flex-col rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {p.body}
            </p>
            <div className="mt-5 rounded-lg border border-border bg-bg/80 p-3 font-mono text-xs text-accent">
              {p.code}
            </div>
          </div>
        ))}
      </div>

      {/* Work diary */}
      <div className="mt-14">
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight">
            The diary — proof it&apos;s real
          </h2>
          <span className="font-mono text-xs text-accent">● live</span>
        </div>
        <div className="space-y-4">
          {diary.map((d) => (
            <div
              key={d.date}
              className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-start sm:gap-4"
            >
              <span className="shrink-0 font-mono text-xs text-muted-2 sm:w-40">
                {d.date}
              </span>
              <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                {d.entry}
              </p>
              <span className="ml-auto shrink-0 rounded border border-border bg-bg px-2 py-0.5 font-mono text-[10px] uppercase text-muted-2">
                {d.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
