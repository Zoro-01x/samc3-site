import Link from "next/link";

const pillars = [
  {
    title: "1. Version-pin your context",
    body: "Before any agent or human touches a repo, pin what you know. ARCHITECTURE.md, DECISIONS.md, FLOW.md — committed, public, versioned.",
  },
  {
    title: "2. Read every diff. Twice.",
    body: "No blind 'ship it'. Every change is reviewed against the decision log. If a diff contradicts a written decision, the diff is wrong — or the decision is, and we update both at once.",
  },
];

export function MethodSection() {
  return (
    <section className="border-y border-border bg-surface/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-accent">
              How I work
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Method, not magic.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
              Two of the four rules I never break. Read the full set on{" "}
              <span className="text-foreground">/blueprints</span>.
            </p>
          </div>
          <Link
            href="/blueprints"
            className="text-sm text-accent transition-colors hover:text-accent-dim"
          >
            Read all 4 rules →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-bg p-6"
            >
              <h3 className="text-base font-bold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
