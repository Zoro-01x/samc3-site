"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

export function Hero() {
  const dotRef = useRef<HTMLSpanElement>(null);

  // Gentle pulse on the AFP emerald dot, loop every 3s, 0.6 → 1.0 opacity.
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || prefersReducedMotion()) return;

    const loop = animate(dot, {
      opacity: [0.6, 1.0],
      duration: 1500,
      easing: "easeInOutQuad",
      loop: true,
    });
    return () => {
      loop.pause();
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
      {/* backdrop */}
      <div className="grid-backdrop absolute inset-0 -z-10" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.08), transparent 70%)",
        }}
      />

      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
        <span
          ref={dotRef}
          className="flex h-1.5 w-1.5 rounded-full bg-accent"
        />
        AFP — Architecture First, Paper Trail Always
      </span>

      <h1 className="max-w-4xl text-center text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        I build AI systems that{" "}
        <span className="text-accent">don&apos;t need me</span> to explain
        them.
      </h1>

      <p className="mt-6 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg">
        This site is the demo. Every page below was documented before it was
        built — architecture, decisions, and flow, all versioned and public.
        I ship software with a paper trail.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-dim"
        >
          Let&apos;s build something
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/architecture"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground"
        >
          $ cat ARCHITECTURE.md
        </Link>
      </div>
    </section>
  );
}
