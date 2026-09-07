import Link from "next/link";

const builds = [
  {
    name: "System Map — interactive tree",
    desc: "Clickable architecture inspector for this site. Docs-as-code, rendered live.",
    time: "1h 40m",
  },
  {
    name: "Commit Feed — build log",
    desc: "Real-time build log wired to the GitHub API. No seeded fake data.",
    time: "45m",
  },
  {
    name: "System Card grid",
    desc: "The four-repo proof section. Status badges, in/out I/O, stack tags.",
    time: "1h 10m",
  },
];

export function LabStrip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-accent">
            Recent micro-builds
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Speed is a feature.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            Each thing on this site was built and documented in under 5 hours.
            The full lab log lives on{" "}
            <span className="text-foreground">/lab</span>.
          </p>
        </div>
        <Link
          href="/lab"
          className="text-sm text-accent transition-colors hover:text-accent-dim"
        >
          See all micro-builds →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {builds.map((b) => (
          <div
            key={b.name}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold leading-snug">{b.name}</h3>
              <span className="shrink-0 rounded border border-accent/40 bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
                {b.time}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
