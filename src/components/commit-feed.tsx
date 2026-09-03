"use client";

const seedCommits = [
  { msg: "docs: create ARCHITECTURE.md — the site documents itself", hash: "a1b2c3d", when: "Skeleton: init", tag: "docs" },
  { msg: "feat: homepage hero + system map", hash: "b4c5d6e", when: "Shell", tag: "feat" },
  { msg: "feat: /systems — 3 live demos listing", hash: "e7f8a9b", when: "Shell", tag: "feat" },
  { msg: "docs: DECISIONS.md — why Next.js, why emerald", hash: "c0d1e2f", when: "Shell", tag: "docs" },
  { msg: "feat: /blueprints — version-pinned method", hash: "f3a4b5c", when: "Shell", tag: "feat" },
  { msg: "feat: /lab — 5-hr build log", hash: "2b3c4d5", when: "Shell", tag: "feat" },
  { msg: "chore: wire GitHub commit feed", hash: "6e7f8a9", when: "Next", tag: "chore" },
];

export function CommitFeed() {
  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-2">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          build.log — realtime
        </div>
        <span className="font-mono text-xs text-accent">origin/main</span>
      </div>
      <div className="divide-y divide-border/60">
        {seedCommits.map((c) => (
          <div
            key={c.hash}
            className="flex items-center gap-3 px-5 py-3 font-mono text-xs transition-colors hover:bg-surface-2"
          >
            <span className="rounded border border-border bg-bg px-1.5 py-0.5 text-[10px] uppercase text-muted-2">
              {c.tag}
            </span>
            <span className="flex-1 truncate text-foreground/90">{c.msg}</span>
            <span className="hidden text-muted-2 sm:block">{c.when}</span>
            <span className="text-accent/70">{c.hash.slice(0, 6)}</span>
          </div>
        ))}
        <div className="px-5 py-3 font-mono text-xs text-muted-2">
          <span className="text-accent">↻</span> wired to GitHub API in Week 2 —
          this seed is the proof.
        </div>
      </div>
    </div>
  );
}
