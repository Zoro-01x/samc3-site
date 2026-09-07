# Warm-Light "Natural Atelier" Theme — Implementation Plan

**> For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Convert samc3-site from the current black + neon-emerald "cyberpunk/terminal" look to a **warm-light, off-white + moss/forest-green** palette that reads natural, trustworthy, and atelier-crafted for Sam's primary audience (Surat textile owners, non-tech SME founders).

**Architecture:** Theme is enforced from two places and must both be updated or the change looks half-done:
1. `src/app/globals.css` — the `@theme` token block + hardcoded dark scrollbar/grid color-scheme.
2. Component classes that assume a dark theme — for example emerald buttons using `text-bg` (black text on green) and `bg-accent/40`/`accent/10` translucent tints tuned for dark backgrounds.

**Tech Stack:** Tailwind v4 theme tokens + CSS custom properties. No new dependencies. anime.js motion is untouched (colors only).

**Audience:** Confirmed via clarify — Surat textile owners & local SME founders, mobile-heavy, want warm/natural/human, not neon-cyberpunk.

**Decision locked via clarify:** OFF-WHITE background (user picked "off white kind of something", overriding the "warm light" preset) + MOSS/FOREST GREEN accent (organic, calm, growth/trust).

---

## Section 1 — Design targets (the destination palette)

| Token                | Now (dark) | → New (warm-light) | Rationale |
|----------------------|-----------|--------------------|-----------|
| `--color-bg`         | `#0a0a0a` (black) | `#faf9f6` (off-white/cream paper) | Warm, natural, "atelier/craft" not "terminal" |
| `--color-surface`    | `#111111` | `#ffffff` (cards on off-white) | Clean elevated cards |
| `--color-surface-2`  | `#161616` | `#f2f0ea` (slightly warm grey) | Hover/secondary surface |
| `--color-border`     | `#1e1e1e` | `#e4e1d8` (warm light grey) | Soft, warm hairline borders |
| `--color-border-2`   | `#2a2a2a` | `#d6d2c6` | Stronger border variant |
| `--color-foreground` | `#e5e5e5` | `#1f2933` (warm charcoal) | Text on light — must be dark & warm |
| `--color-muted`      | `#8a8f98` | `#6b7280` (grey) | Secondary text |
| `--color-muted-2`    | `#6b7280` | `#8a8f98` | Fainter text/hashes |
| `--color-accent`     | `#10b981` (neon) | `#3f7a5a` or `#4a7c5f` (moss/forest) | Calm organic green |
| `--color-accent-dim` | `#0f8a63` | `#2f5e45` (darker moss) | Hover/ghost states |
| `--color-accent-soft`| `rgba(16,185,129,0.12)` | `rgba(63,122,90,0.10)` | Soft tint |

`color-scheme` root: change from `dark` → `light`.

---

## Section 2 — Files that MUST change (the full map)

### 2.1 The Theme Locus — `src/app/globals.css` (the load-bearing file)
- Replace every token value in the `@theme` block (Section 1 table).
- `:root { color-scheme: dark }` → `light`.
- `.grid-backdrop`: currently `rgba(255,255,255,0.03)` white grid on black — must become a **subtle warm grid** `rgba(0,0,0,0.03)` on off-white (or remove entirely — likely keep, very faint, it adds "architectural blueprint on paper" which fits "natural").
- **Scrollbar:** hardcoded `#0a0a0a` track / `#2a2a2a` / `#3a3a3a` thumb → light equivalents (`#faf9f6` track, `#d6d2c6` thumb).
- `::selection`: `rgba(16,185,129,0.3)` → `rgba(63,122,90,0.25)` (moss tint on light).

### 2.2 Inverted-usage components (emerald button = black text → MUST flip to white text)
These use `bg-accent ... text-bg` (black text on green). On light theme, text must become **white `text-white`**, else dark-on-green loses readability (and it would look broken):
- `src/components/hero.tsx` line 62 — "Let's build something" CTA
- `src/app/page.tsx` line 44 — bottom CTA "Let's talk →"
- `src/components/service-cards.tsx` line 105 — "I want this →" buttons

### 2.3 Translucent tints tuned for dark (`accent/10`, `accent/40`, `bg-accent/10`) — now need re-check
On a light bg, semitransparent emerald/green tints still work (they sit on white now). Verify these read correctly; may need the `--color-accent-soft` token bumped to a slightly stronger value so they're not invisible:
- Nav active state, logo box (hero/nav), hero dot, commit-feed dot/labels, footer accents, system-card status badges.

### 2.4 Dark-scaffolding text tokens written as literal colors in `.md` prose pages
Check `architecture/page.tsx` and `blueprints/page.tsx` for any `text-foreground/90`, `text-muted`, `text-accent` — these are token-driven so they update automatically, BUT verify any `bg-surface-2` code blocks and `border-border` still read well on light.

### 2.5 The `\~/site▌` footer + `$` prompts (syn with the "cyberpunk" read you flagged)
- `src/components/footer.tsx` has `$ sam@systems: ~/site▌` terminal text.
- Optionally soften but **do NOT delete unless you say so** — keep this change color-driven, text is fine (charcoal-on-cream is neutral, no longer neon-on-black).

---

## Section 3 — Step-by-step tasks (bite-sized, TDD-informed)

Each task = one focused change, verify, commit.

### Task 1: Swap the core theme tokens
**Files:** `src/app/globals.css:3-27` (@theme block), `globals.css:19-30` (root color-scheme)
1. Replace all 12 token values per Section 1 table.
2. Change `color-scheme: dark` → `light`.
3. Run: `npm run build` → expected PASS, 9/9 static routes.
4. Commit: `style(theme): warm-light atelier palette — off-white bg, moss/forest accent`

### Task 2: Lighten scrollbar + selection + grid backdrop
**Files:** `src/app/globals.css` (scrollbar ~45-60, selection ~40-43, grid-backdrop ~32-37)
1. Swap hardcoded dark hexes to the light equivalents.
2. Rebuild, verify, commit: `style(theme): light scrollbar, selection, grid`

### Task 3: Flip CTA button text from black to white
**Files:** `hero.tsx:62`, `page.tsx:44`, `service-cards.tsx:105`
1. Change `text-bg` → `text-white` on the three `bg-accent` CTAs.
2. Rebuild, verify, commit: `fix(theme): white text on accent CTAs for light bg`

### Task 4: Verify tints + diagnostics pass on light bg
**Files:** audit of `accent/10`, `accent/40`, `border-border`, `bg-surface-2` usages across nav, commit-feed, system-card, system-map, logos.
1. Walk each on localhost — adjust `accent-soft` token / any tint that's now invisible.
2. Rebuild, verify, commit: `style(theme): tune accent tints for warm-light bg`

### Task 5: Contrast + mobile polish
1. Verify moss-green `#4a7c5f` on off-white passes WCAG AA for text accents (small labels/hashes — may need a slightly deeper `#3f6b4f` for body-scale `text-accent`).
2. Check mobile viewport (primary audience is mobile-heavy) — every surface readable.
3. Rebuild, verify, commit if tweaks: `style(theme): contrast pass for light theme`

### Task 6: Full visual + route sign-off (LOCAL ONLY — no push)
1. `npm run build` PASS, all routes 200 (curl `/`, `/contact`, `/architecture`, `/systems`, `/blueprints`, `/lab`).
2. Show Sam on `localhost:3000`: it should now feel like warm off-white paper + calm moss green — **no cyberpunk read**.
3. **STOP for Sam's visual approval before any push** (standing local-first rule).

---

## Section 4 — Tests / validation

- `npm run build` must pass after every task (Next 15 static, TDD-appropriate per change).
- Route smoke: all 6 routes 200, no new 404s.
- **Visual acceptance criteria (the real test):** site reads warm/natural/atelier, NOT cyberpunk. A Surat textile owner should feel "trustworthy craft" not "hacker terminal."
- Contrast: sample `text-accent`-on-light for AA.
- Mobile: surfaces readable at <768px.

## Section 5 — Risks / Tradeoffs / Open Questions

- **Risk — dark theme is currently the brand.** A full flip to light changes first impressions. Mitigation: lock the "natural atelier" direction (confirmed by Sam) and follow-through; don't half-flip.
- **Risk — mono/terminal styling (`$`, `▌`, `build.log`, `sam@systems`) may still feel "tech-y" even on light.** This is TEXT, not color. If Sam wants it fully "natural," we can soften these in a *later* pass (defer — YAGNI now, keep this plan color-only).
- **Tradeoff — moss green is calmer but slightly less "vivid/eyecatching" than neon emerald.** For a trust-first SME audience that's the point; differentiation now comes from the warm atelier *look* rather than neon.
- **Open question — does Sam want the grid backdrop (blueprint-on-paper) kept, or should it go entirely?** (Default: keep, very faint.)
- **Open question — the `~/site▌` footer cursor:** keep as-is on light, or remove the blinking cursor for a calmer feel? (Default: keep for now, defer.)
- **Open question — banner/hero gradient** `rgba(16,185,129,0.08)` at top: must become a moss-tinted glow `rgba(63,122,90,0.08)` (hero.tsx lines 8-14) — small but must not be missed.

---

## Execution Handoff

Plan complete and saved. Ready to execute using subagent-driven-development — I'll dispatch a fresh subagent per task with two-stage review (spec compliance then code quality). Shall I proceed?

**But remember the standing rule and your explicit instruction: this is a LOCAL-ONLY visual change. I will implement task-by-task on localhost and STOP for your approval before any push.** The "natural" look is the whole point — you should see it and love it on your screen before GitHub/Vercel ever does.
