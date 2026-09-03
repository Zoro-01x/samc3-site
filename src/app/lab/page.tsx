const builds = [
  {
    name: "System Map — interactive tree",
    desc: "Clickable architecture inspector for this site. Docs-as-code, rendered live.",
    time: "1h 40m",
    cost: "₹0",
    stack: "Next.js, React state",
    slug: `the-map`,
  },
  {
    name: "Commit Feed — build log",
    desc: "Realtime-looking build log. Seed data now, GitHub API in Week 2.",
    time: "45m",
    cost: "₹0",
    stack: "Next.js, seed data",
  },
  {
    name: "System Card grid",
    desc: "The three-demo proof section. Status badges, in/out I/O, stack tags.",
    time: "1h 10m",
    cost: "₹0",
    stack: "Next.js, Tailwind",
  },
  {
    name: "Blueprint method section",
    desc: "Version-pinned context, read-every-diff, one-change-per-request, rollback plans.",
    time: "50m",
    cost: "₹0",
    stack: "Next.js, copywriting",
  },
];

export const metadata = {
  title: "Lab — Sam",
  description:
    "5-hour builds. Micro-projects with time and cost logged. Proof of speed.",
};

export default function LabPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">
          /lab
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Micro-builds. <span className="text-accent">&lt; 5 hrs each.</span>
        </h1>
        <p className="mt-3 text-sm text-muted sm:text-base">
          Speed is a feature. Each of these was built and documented in under
          five hours — with the time and the cost logged. No inflated effort,
          no hidden scope.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {builds.map((b) => (
          <div
            key={b.name}
            className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/40"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <h3 className="text-base font-bold tracking-tight">{b.name}</h3>
              <span className="shrink-0 rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                {b.time}
              </span>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-muted">{b.desc}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="font-mono text-xs text-muted-2">{b.stack}</span>
              <span className="font-mono text-xs text-accent">{b.cost}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-dashed border-border bg-surface/50 p-6 text-center">
        <p className="font-mono text-sm text-muted">
          <span className="text-accent">more</span> →
          {" "}
          <span className="text-muted-2">Surat Textile OS · AI Handover Kit · Founder's OS — shipping in the /systems section.</span>
        </p>
      </div>
    </main>
  );
}
