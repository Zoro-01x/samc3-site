import { Hero } from "@/components/hero";
import { SystemMap } from "@/components/system-map";
import { CommitFeed } from "@/components/commit-feed";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* System map section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            § 01 — The map
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            This site is wired like this.
          </h2>
          <p className="max-w-2xl text-sm text-muted sm:text-base">
            Click any node. Every layer here was designed on paper before a
            line of code — and it&apos;s all versioned in the docs.
          </p>
        </div>
        <SystemMap />
      </section>

      {/* Build log section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            § 02 — The build log
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Watching me work.
          </h2>
          <p className="max-w-2xl text-sm text-muted sm:text-base">
            Every commit is public. This is not a portfolio — it&apos;s a
            paper trail you can read in real time.
          </p>
        </div>
        <CommitFeed />
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            The proof is in the <span className="text-accent">paper trail</span>.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
            Three live systems built and documented with AI in seven days. Not
            screenshots — running software with an open build log.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-dim"
            >
              Open the demos →
            </Link>
            <Link
              href="/blueprints"
              className="font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              /blueprints — how I work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
