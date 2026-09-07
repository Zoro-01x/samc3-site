import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { CommitFeed } from "@/components/commit-feed";
import { MethodSection } from "@/components/method-section";
import { LabStrip } from "@/components/lab-strip";
import { fetchCommits } from "@/lib/github";
import Link from "next/link";

export default async function HomePage() {
  const commits = await fetchCommits();
  return (
    <>
      <Hero />

      <ServiceCards />

      {/* How I Work — paper trail */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wider text-accent">
            How I Work
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            The Paper Trail
          </h2>
          <p className="max-w-2xl text-sm text-muted sm:text-base">
            I document every project before I code. Here&apos;s me building this
            site live, day by day. No screenshots — real commits.
          </p>
        </div>
        <CommitFeed commits={commits} />
      </section>

      {/* Method preview */}
      <MethodSection />

      {/* Lab preview */}
      <LabStrip />

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Got something manual that should be{" "}
            <span className="text-accent">software</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
            Tell me the Excel, the WhatsApp forwards, the repeated task. I&apos;ll
            tell you if I can automate it.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dim"
            >
              Let&apos;s talk →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
