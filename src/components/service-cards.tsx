"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion, isSmallScreen } from "@/lib/motion";

export function ServiceCards() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Stagger fade-in of the 3 cards on load (1% motion, calm).
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (prefersReducedMotion()) return;

    const cards = grid.querySelectorAll<HTMLElement>(".service-card");
    if (!cards.length) return;

    // Mobile: just fade-in, no y-shift. Desktop: gentle rise + stagger.
    const small = isSmallScreen();
    animate(cards, {
      opacity: [0, 1],
      translateY: small ? [0, 0] : [20, 0],
      delay: stagger(100),
      duration: small ? 450 : 600,
      easing: "easeOutQuad",
    });
  }, []);

  return (
    <section className="border-b border-border bg-surface/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="text-xs uppercase tracking-wider text-accent">
              for business owners
            </span>
            <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              What I Can Build For You
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Not another demo. Real tools that save you hours and make money.
            </p>
          </div>

          <div ref={gridRef} className="grid gap-4 sm:grid-cols-3">
            <ServiceCard
              n="01"
              title="AI Websites That Do The Work"
              description="Not just a good-looking site. A website that answers your leads, books your calls, and sells while you sleep."
              cta="I want this →"
              href="/work#websites"
            />
            <ServiceCard
              n="02"
              title="Business Software That Replaces Manual Work"
              description="You tell me the messy work you do daily on Excel, WhatsApp, sheets. I turn it into one-click software for your team."
              cta="I want this →"
              href="/work#software"
            />
            <ServiceCard
              n="03"
              title="AI That Uses Your Own Data"
              description="You have data, chats, notes, but no system. I build AI tools that turn it into content, reports, or auto-replies."
              cta="I want this →"
              href="/work#data-tools"
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
      <div className="service-card group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(74,124,95,0.18)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold text-accent/60 group-hover:text-accent">
            {n}
          </span>
        </div>
        <h3 className="text-base font-bold tracking-tight">{title}</h3>

        <p className="mt-3 text-sm text-foreground/90 leading-snug">
          {description}
        </p>

        <div className="mt-4 flex-1" />

        <div className="mt-4 flex items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-semibold bg-accent text-white group-hover:bg-accent-dim">
          {cta}
        </div>
      </div>
    </Link>
  );
}
