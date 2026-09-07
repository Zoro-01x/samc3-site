"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion, isSmallScreen } from "@/lib/motion";
import type { Commit } from "@/lib/github";

const revealStagger = stagger(80);

export function CommitFeed({ commits }: { commits: Commit[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  // On entering the viewport, reveal each commit line with a subtle stagger.
  useEffect(() => {
    const list = listRef.current;
    const lines = list?.querySelectorAll<HTMLElement>(".commit-line");
    if (!list || !lines || !lines.length) return;

    if (prefersReducedMotion()) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || played.current) return;
          played.current = true;

          const small = isSmallScreen();
          animate(lines, {
            opacity: [0, 1],
            translateY: small ? [0, 0] : [8, 0],
            delay: small ? 0 : revealStagger,
            duration: small ? 400 : 500,
            easing: "easeOutQuad",
          });
          io.disconnect();
        });
      },
      { threshold: 0.2 }
    );

    io.observe(list);
    return () => io.disconnect();
  }, []);

  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-2">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          build.log — live from GitHub
        </div>
        <span className="font-mono text-xs text-accent">Zoro-01x/samc3-site</span>
      </div>
      <div ref={listRef} className="divide-y divide-border/60">
        {commits.length === 0 ? (
          <div className="px-5 py-3 font-mono text-xs text-muted-2">
            couldn&apos;t reach GitHub right now — retrying soon.
          </div>
        ) : (
          commits.map((c) => (
            <div
              key={c.sha}
              className="commit-line flex items-center gap-3 px-5 py-3 font-mono text-xs transition-colors hover:bg-surface-2"
            >
              <span className="rounded border border-border bg-bg px-1.5 py-0.5 text-[10px] uppercase text-muted-2">
                {c.tag}
              </span>
              <span className="flex-1 truncate text-foreground/90">
                {c.message}
              </span>
              <span className="hidden text-muted-2 sm:block" suppressHydrationWarning>
                {new Date(c.date).toLocaleDateString("en-GB", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-accent/70">{c.sha}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
