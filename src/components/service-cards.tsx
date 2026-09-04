import Link from "next/link";

export function ServiceCards() {
  return (
    <section className="border-b border-border bg-surface/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              for business owners
            </span>
            <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              What I Can Build For You
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Not another demo. Real tools that save you hours and make money.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <ServiceCard
              n="01"
              title="AI Websites That Do The Work"
              description=
                "Not just a good-looking site. A website that answers your leads, books your calls, and sells while you sleep."
              cta="I want this →"
              href="/contact"
            />
            <ServiceCard
              n="02"
              title="Business Software That Replaces Manual Work"
              description=
                "You tell me the messy work you do daily on Excel, WhatsApp, sheets. I turn it into one-click software for your team."
              cta="I want this →"
              href="/contact"
            />
            <ServiceCard
              n="03"
              title="AI That Uses Your Own Data"
              description=
                "You have data, chats, notes, but no system. I build AI tools that turn it into content, reports, or auto-replies."
              cta="I want this →"
              href="/contact"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  n,
  title,
  description,
  href,
  cta,
}: {
  n: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link href={href} className="block">
      <div
        className="flex h-full flex-col rounded-xl border bg-surface p-4 transition-all hover:border-accent/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-accent/60 group-hover:text-accent">
            {n}
          </span>
        </div>
        <h3 className="text-base font-bold tracking-tight">{title}</h3>

        <p className="mt-3 text-sm text-foreground/90 leading-snug">
          {description}
        </p>

        <div className="mt-4 flex-1" />

        <div
          className="mt-4 flex items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-semibold transition-colors bg-accent text-bg group-hover:bg-accent-dim"
        >
          {cta}
        </div>
      </div>
    </Link>
  );
}