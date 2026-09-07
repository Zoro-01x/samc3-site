# Wire Build Log to Real GitHub API — Implementation Plan

**> For Hermes:** Multi-step feature. Use subagent-driven-development to implement task-by-task. **LOCAL-ONLY until Sam approves localhost:3000/.**

**Goal:** Replace the seeded fake commits in the homepage build log with Sam's real commit history pulled live from the GitHub API — making the "paper trail" claim *actually true*, not aspirational.

**Architecture:** The cleanest Next.js pattern for a static-site commit feed is **server-side fetch + pass props to a client component**. The current `CommitFeed` is already a client component (needed for anime.js reveal). We move the data fetch to the hosting page (server component), fetch from GitHub's public API (no auth needed for a public repo), and pass the commits down as props. This keeps: (a) the anime.js IntersectionObserver reveal, (b) static prerender where possible, (c) zero env vars/API keys, (d) no client-side fetch (better Lighthouse).

**Tech Stack:** Next.js 15 App Router (existing) + GitHub REST API `GET /repos/{owner}/{repo}/commits` (public, no auth for public repos). Uses `fetch` (Web standard, built into Node 18+/Next). No new dependencies.

**Audience:** Builders/devs who scroll to the build log — the "paper trail" is their validation. Real commits (not seeded) is the entire point.

**Repo confirmed:** `Zoro-01x/samc3-site` (public). Latest commits verified via `gh` just now: `510d86a`, `8c67fee`, `827fa88`, `2dab08e`, `ca0e98b` — all have SHA, message, date, author. This is exactly what the API returns.

---

## Section 1 — Files that will change

| Path | Action |
|---|---|
| `src/lib/github.ts` | **new** — fetch + shape commits from GitHub API |
| `src/app/page.tsx` | modify — server component fetches commits, passes to `<CommitFeed/>` |
| `src/components/commit-feed.tsx` | modify — accepts `commits` prop, renders them (drop the hardcoded seed), keep anime reveal |
| `DECISIONS.md` | append: "2026-09-04 — Live GitHub commit feed" rationale |
| `ARCHITECTURE.md` | append the new fetch layer to the relevant section |

`.env.local` / `.gitignore`: **no changes** — GitHub public API needs no key for a public repo. (If Sam ever makes the repo private OR hits rate limits, we add a token later; not now — YAGNI.)

---

## Section 2 — Step-by-step tasks

### Task 1: Create the GitHub fetch helper
**Objective:** A small, testable function that fetches latest commits and shapes them for display.

**Files:**
- Create: `src/lib/github.ts`

**Step 1: Write the helper** (`src/lib/github.ts`)
```ts
export type Commit = {
  sha: string;
  message: string;
  date: string;
  author: string;
  tag: "feat" | "fix" | "docs" | "chore" | "style" | "other";
};

const OWNER = "Zoro-01x";
const REPO = "samc3-site";
const PER_PAGE = 8;

function classify(prefix: string): Commit["tag"] {
  const m = prefix.toLowerCase();
  if (m.startsWith("feat")) return "feat";
  if (m.startsWith("fix")) return "fix";
  if (m.startsWith("docs")) return "docs";
  if (m.startsWith("chore")) return "chore";
  if (m.startsWith("style")) return "style";
  return "other";
}

export async function fetchCommits(): Promise<Commit[]> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=${PER_PAGE}`;
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 60 }, // ISR: re-fetch every 60s
  });
  if (!res.ok) {
    // Public repo, but be graceful if GitHub hiccups / rate-limits.
    return [];
  }
  const data = (await res.json()) as Array<{
    sha: string;
    commit: { message: string; author: { name: string; date: string } };
  }>;
  return data.map((c) => {
    const firstLine = c.commit.message.split("\n")[0];
    return {
      sha: c.sha.slice(0, 7),
      message: firstLine,
      date: c.commit.author.date,
      author: c.commit.author.name,
      tag: classify(firstLine.split(":")[0] ?? firstLine),
    };
  });
}
```

**Step 2: Verify** — run `node -e` won't work well with TS/`next` fetch here, so the real verification is via the page in Task 3. But the helper compiles clean (we'll see in `npm run build`).
**Commit:** not yet.

### Task 2: Make the homepage page fetch commits
**Objective:** The home page (server component) fetches real commits and hands them to `CommitFeed`.

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Read the current page.tsx** (it currently imports `CommitFeed` and renders `<CommitFeed/>` with no props).

**Step 2: Edit** — add the import + the fetch at the top of the component.

Current file starts:
```tsx
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { CommitFeed } from "@/components/commit-feed";
import Link from "next/link";

export default function HomePage() {
```

Change to:
```tsx
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { CommitFeed } from "@/components/commit-feed";
import { fetchCommits } from "@/lib/github";
import Link from "next/link";

export default async function HomePage() {
  const commits = await fetchCommits();
```

Then where `<CommitFeed />` is rendered, change to:
```tsx
<CommitFeed commits={commits} />
```

**Why async?** A server component can be `async` and directly `await` the fetch. The page stays a static + ISR route (`next: { revalidate: 60 }` in the helper).

**Step 3: Verify** — `npm run build` passes; the `/` route's generated HTML contains a real commit SHA (e.g. `510d86a`) instead of the old seed hashes (`a1b2c3d` etc.).
**Commit:** not yet.

### Task 3: Update CommitFeed to render the real commits prop
**Objective:** Remove the hardcoded `seedCommits`, accept a `commits` prop, keep the anime reveal + styling.

**Files:**
- Modify: `src/components/commit-feed.tsx`

**Step 1: Replace the seed array + component signature.**

Remove lines 1-18 (the `"use client"` stays; the inline `seedCommits` array + `revealStagger` move/adjust). New signature:
```tsx
"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { prefersReducedMotion, isSmallScreen } from "@/lib/motion";
import type { Commit } from "@/lib/github";

const revealStagger = stagger(80);

export function CommitFeed({ commits }: { commits: Commit[] }) {
  // ... (the existing IntersectionObserver + anime effect stays the same,
  //      it already queries ".commit-line" — leave it)
```

**Step 2: Change the render loop** — the commit row currently maps over `seedCommits`. Change to map over `commits`, using the new field names:
```tsx
{commits.map((c) => (
  <div key={c.sha} className="commit-line flex items-center gap-3 px-5 py-3 font-mono text-xs transition-colors hover:bg-surface-2">
    <span className="rounded border border-border bg-bg px-1.5 py-0.5 text-[10px] uppercase text-muted-2">
      {c.tag}
    </span>
    <span className="flex-1 truncate text-foreground/90">{c.message}</span>
    <span className="hidden text-muted-2 sm:block">
      {new Date(c.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
    </span>
    <span className="text-accent/70">{c.sha}</span>
  </div>
))}
```

**Step 3: Handle the empty case** (GitHub down / rate-limited) — if `commits.length === 0`, render a friendly line instead of an empty box:
```tsx
{commits.length === 0 ? (
  <div className="px-5 py-3 font-mono text-xs text-muted-2">
    couldn&apos;t reach GitHub right now — retrying soon.
  </div>
) : (
  commits.map(...)
)}
```

**Step 4: Update the header** — the `origin/main` badge is still correct (repo default branch is `master` though — change to `origin/master`, or just drop the branch name; the "The Paper Trail" framing doesn't need a branch label). **Decision:** change `>origin/main<` to `>live from GitHub<` for accuracy (avoids claiming a branch).

**Step 5: Remove the old seed footer line**
The bottom line currently reads: "↻ wired to GitHub API in Week 2 — this seed is the proof." That's now false — we're wired for real. Remove it entirely (replaced by the empty-state handling above).

**Step 6: Verify** — `npm run build` passes; `curl http://localhost:3000/` served HTML contains real commit data, no `a1b2c3d` seed hash, no "this seed is the proof" string.
**Commit:** not yet.

### Task 4: Verify end-to-end (local-first hold)
1. `npm run build` PASS (all routes, TypeScript, lint).
2. `curl http://localhost:3000/ | grep -oE "[a-f0-9]{7}"` → shows real SHAs (`510d86a`, `8c67fee`, ...) not the fake ones.
3. `curl http://localhost:3000/ | grep -c "this seed is the proof"` → **0** (removed).
4. `curl http://localhost:3000/ | grep -c "origin/main"` → **0** (branch badge changed).
5. Open `localhost:3000/` in preview — build log reveals on scroll (anime still works), shows real commits with real dates/hashes.
6. **Hand to Sam for visual approval. Do NOT push until "go".**

### Task 5: Docs — DECISIONS.md + ARCHITECTURE.md
- Append to `DECISIONS.md`: "2026-09-04 — Live GitHub commit feed" — decision to wire the build log to the real repo, server-side fetch with ISR, public-API no-key, with the rationale that a real commit log is the credibility the "paper trail" thesis needs.
- Append to `ARCHITECTURE.md`: add a line under External Integrations noting `GET /api.github.com/repos/Zoro-01x/samc3-site/commits` with 60s ISR.
- **Commit (with the code, only after Sam approves):** `feat(feed): wire build log to live GitHub commit history`

---

## Section 3 — Tests / validation

- `npm run build` must pass after each task (Next 15 static, TDD-appropriate per change).
- Curl smoke on `/`: real 7-char SHAs present; `a1b2c3d` absent; `this seed is the proof` absent; `origin/main` absent.
- Manual: preview pane at `localhost:3000/`, scroll to build log, confirm anime reveal + real data.
- **ISR check:** `next: { revalidate: 60 }` means the static page regenerates at most every 60s — a new commit appears within ~1 minute without a redeploy. (Acceptable for a build log.)

## Section 4 — Risks / Tradeoffs / Open Questions

- **Risk — GitHub unauthenticated rate limit (60 req/hr per IP).** The build log only fetches when the page regenerates (once per 60s max, usually far less), so 60/hr is fine unless the site gets hammered. Mitigation if ever hit: add a `GITHUB_TOKEN` env var (free, public-repo read only). Deferred — YAGNI.
- **Risk — `fetch` in a server component on Vercel has a timeout.** GitHub API is fast (<200ms), fine.
- **Tradeoff — ISR means the build log is ≤60s stale.** For a commit log that's totally fine (a developer won't notice 60s lag). A "real-time websocket" would be over-engineering — rejected (YAGNI).
- **Tradeoff — 8 commits shown.** The seed had 7; 8 is a reasonable "recent activity" window. Could add "load more" via a `?page=2` param, but that's scope creep for v1. Deferred.
- **Open question — Show ALL commits or just messages?** The plan shows 8 most-recent with message + short SHA + date + tag. The full multi-line body is dropped (only first line) — cleaner. Confirm this is right: a one-line message per commit, highlighting the most recent 8.
- **Open question — should the build log show the actual `author` name too?** Currently the render shows tag + message + date + sha (not author name). Since all commits are by "Sam", showing author is redundant. Skip. Confirm: tags (feat/fix/docs/chore/style) via the classifier are the useful bit.
- **Risk — the classifier mislabels ring messages.** `fix:` → "fix", `style(theme):` → "style", etc. GitHub conventional-commit prefixes are consistent for this repo (verified from the 5 commits I inspected). Good enough.

---

## Decision Gate

Plan saved. **No code changes yet.** One decision I need from you before I start:

Confirm the **server-side fetch + ISR approach** is acceptable (instead of a client-side `useEffect` fetch). It's cleaner, better for Lighthouse, needs no key, and keeps the anime reveal — and it's how a professional Next.js codebase would do it. The build log will refresh at most every 60 seconds.

When you say **"go"**, I'll execute Tasks 1→3, verify (Task 4), update docs (Task 5), show you on `localhost:3000/` (the build log will show your REAL commits: `510d86a`, `8c67fee`, `827fa88`, `2dab08e`, `ca0e98b`...), and **hold for your approval before any push.**