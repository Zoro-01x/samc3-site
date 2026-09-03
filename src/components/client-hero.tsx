import Link from "next/link";

export function ClientHero() {
  return (
    <section className="border-b border-border bg-surface/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              for founders &amp; business owners
            </span>
            <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              I turn messy manual work into software that runs itself.
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              3 things I&apos;ve shipped this week — you can use them right now.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <ClientCard
              n="01"
              title="Surat Textile OS"
              before="Manual catalog, no website, WhatsApp-only sales"
              after="Website + WhatsApp bot, in 2 minutes"
              href="/systems/textile"
              cta="Try it Live"
            />
            <ClientCard
              n="02"
              title="AI Handover Kit"
              before="New devs spend 2 weeks reading your codebase"
              after="Paper trail of how it was built, in seconds"
              href="/systems/handover"
              cta="Try it Live"
            />
            <ClientCard
              n="03"
              title="Founder's OS"
              before="Idea in your head, no plan, no next step"
              after="Architecture, constraints, and a task list"
              href="/systems/founders"
              cta="Coming soon"
              disabled
            />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 border-t border-border pt-6 font-mono text-xs text-muted-2">
          <span className="text-accent">§</span>
          <span>For builders — want to see how I built this?</span>
          <span className="hidden sm:inline">Open the paper trail below ↓</span>
        </div>
      </div>
    </section>
  );
}

function ClientCard({
  n,
  title,
  before,
  after,
  href,
  cta,
  disabled,
}: {
  n: string;
  title: string;
  before: string;
  after: string;
  href: string;
  cta: string;
  disabled?: boolean;
}) {
  const Wrapper = disabled ? "div" : Link;
  const wrapperProps = disabled
    ? { className: "block" }
    : { href, className: "block" };

  return (
    <Wrapper {...(wrapperProps as { href: string; className: string })}>
      <div
        className={`group flex h-full flex-col rounded-xl border bg-surface p-4 transition-all ${
          disabled
            ? "cursor-not-allowed border-border opacity-70"
            : "border-border hover:border-accent/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]"
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-accent/60 group-hover:text-accent">
            {n}
          </span>
          {disabled && (
            <span className="rounded-full border border-border bg-bg px-2 py-0.5 font-mono text-[10px] uppercase text-muted-2">
              coming soon
            </span>
          )}
        </div>
        <h3 className="text-base font-bold tracking-tight">{title}</h3>

        <div className="mt-3 space-y-1.5 text-[13px] leading-snug">
          <p className="text-muted-2">
            <span className="text-muted-2/70 line-through decoration-muted-2/40">
              {before}
            </span>
          </p>
          <p className="text-foreground/95">
            <span className="font-semibold text-accent">→</span> {after}
          </p>
        </div>

        <div className="mt-4 flex-1" />

        <div
          className={`mt-4 flex items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-semibold transition-colors ${
            disabled
              ? "border border-border bg-bg text-muted-2"
              : "bg-accent text-bg group-hover:bg-accent-dim"
          }`}
        >
          {cta}
        </div>
      </div>
    </Wrapper>
  );
}
