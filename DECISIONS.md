# DECISIONS.md

> **Every decision, recorded. When it was made, why, and what it cost.** No silent rework. If a future diff contradicts a decision below, either the diff is wrong or this file is — and both get updated at once.

## 2026-09-03 — Site Concept

**Decision: The site is not a portfolio. It is the demo of my system thinking.**
A portfolio shows screenshots of finished things. This site shows *how* a thing gets built — architecture before code, decisions recorded, flow documented. It is both the resume and the proof.

**Why:** "I know React" is a claim. "Here is my site, and here is the ARCHITECTURE.md that documents how I built it, in my own repo, with a public commit log" is verifiable evidence.

## 2026-09-03 — Framework

**Decision: Next.js 15, App Router, TypeScript, Tailwind CSS v4.**
App Router for file-based routes; server components by default, client only where state lives.

**Why:** Fast, modern, edge-deployable. Shows production-grade tooling rather than a toy.

## 2026-09-03 — Design System

**Decision: Dark theme, emerald accent (`#10b981`), JetBrains Mono accents.**
Deep `#0a0a0a` background, `#111111` surfaces, emerald for "systems alive" states.

**Why:** Developer-first, technical, precise. Emerald reads as "running / healthy / live" — the exact feeling for connected systems. No marketing-slick, no gradient slop.

## 2026-09-03 — Typeface

**Decision: Geist Sans for body, JetBrains Mono for code/nav accents.**
**Why:** Geist is Vercel's open, geometric sans — modern and technical. Mono accents reinforce the terminal / engineering identity.

## 2026-09-03 — System Map

**Decision: The homepage's centerpiece is an interactive architecture tree — built from THIS site's real structure.**
Clickable nodes, live inspector, no fake diagrams.

**Why:** It is the thesis made UI. The visitor doesn't read "I do systems thinking" — they click it.

## 2026-09-03 — Build Log

**Decision: A commit feed on the homepage, styled as `build.log`.**
Seed data for the MVP; real GitHub commit stream in Week 2.

**Why:** "Real-time build log pulled from GitHub" makes the paper trail visible as it happens. Seed proves the pattern now; the API replaces the seed, not the design.

## 2026-09-03 — The Three Systems

**Decision: Ship A, B, C as working demos, not mockups.**
- **A — Surat Textile OS:** catalog → website + WhatsApp bot. Surat SME pain.
- **B — AI Handover Kit:** repo → DECISIONS.md + FLOW.md + BUG.md. The viral meta one.
- **C — Founder's OS:** idea → ARCHITECTURE.md + CONSTRAINTS.md + task breakdown.

## 2026-09-03 — Two-Layer Homepage (non-tech + tech)

**Decision: Split the homepage into two clearly separated layers. Top is for clients; below is for builders.**

**Why:** A non-tech founder visiting the site needs the value proposition in 5 seconds, not a paper-trail pitch. The technical layer (system map, build log, ARCHITECTURE.md) wins developers but loses clients before they read a word. We need both audiences — non-tech clients buy the work, tech people validate the work. Same site, two entry points.

**The two layers:**

**Layer 1 — For non-tech clients (top of homepage, above the fold):**
- A plain-English hero under the existing line: "I turn messy manual work into software that runs itself. 3 things I've shipped this week — you can use them right now."
- Three client-readable cards with **Before → After** framing:
  - **Surat Textile OS** — "Upload your catalog → get a website + WhatsApp bot in 2 mins"
  - **AI Handover Kit** — "Drop in a GitHub repo → get a paper trail of how it was built in seconds"
  - **Founder's OS** — "Type your idea → get the architecture, constraints, and a task list"
- Big green `Try it Live` button on each card.

**Layer 2 — For builders (below, clearly labeled):**
- The existing system map, build log, and ARCHITECTURE.md stay — labeled:
  > "§ For builders — Want to see how I built this? Open paper trail ↓"
- Non-tech visitor stops at Layer 1. Tech visitor scrolls deeper.

**Card C (Founder's OS) treatment:** Showpiece only. Stays as "Coming soon" card with no live action and no signup. It's a private project for an organization; no public data, no email capture, no waitlist. The card exists to prove Sam is working on real things for real orgs, not to capture leads.

## 2026-09-04 — Warm-Light "Natural Atelier" Theme

**Decision: Replace the black + neon-emerald cyberpunk look with an off-white + moss-green warm atelier theme. The build log keeps JetBrains Mono as the single architectural signature.**

**Why:** First impressions read as "hacker terminal," not "trusted business partner." For Sam's primary audience (non-tech Surat textile/diamond/manufacturing SME owners), dark + neon + monospace + blinking cursor all trigger "scary tech guy" rather than "calm expert." The brand needs to feel *natural, warm, trustworthy* — like a well-run textile workshop — not "developer screencast." At the same time, the "paper trail" identity (AFP — Architecture First, Paper Trail Always) must survive, so the build log keeps its monospace as the one signature of technical depth.

**The token map (every other component auto-updates because the codebase is token-driven):**
- Background: black `#0a0a0a` → off-white paper `#faf9f6`
- Cards: dark grey `#111111` → warm card `#f2efe9`
- Text: light grey `#e5e5e5` → warm charcoal `#1f2933`
- Accent: neon emerald `#10b981` → moss/forest `#4a7c5f` (calm, organic, still growth/trust)
- Hover: `#0f8a63` → `#3d6650` (deeper moss)
- Border: dark grey → warm light grey `#e5e0d8`
- Grid backdrop: white-on-black → moss-tinted `rgba(74,124,95,0.06)` on paper (blueprint, not terminal)
- `color-scheme: dark` → `light`
- `prose-invert` on architecture page removed (would have rendered white-on-white)
- All `text-bg` (black-on-green CTAs) flipped to `text-white` (white-on-moss)
- 9 files stripped of `font-mono` except `commit-feed.tsx` (build log) which keeps mono as the architect's signature
- Hero copy updated from "I build AI systems that don't need me to explain them" to **"I build AI systems that run your business"** with sub "Surat, Gujarat — for businesses that make real things" — localizes, removes the "abstract dev" tone
- Footer: removed `~/site▌` terminal prompt; now reads "Sam — AI Systems Architect, Surat" in clean sans
- `§ 01` and `● live` glyphs removed from non-build-log sections

**No push yet** — per the local-first rule, this is held on the dev server for Sam's visual approval. Once he signs off, the commit gets made and Vercel deploys the verified product.

## 2026-09-03 — Homepage rebuild for non-tech clients

**Decision: Rebuild the homepage to lead with services, not proof. Drop the system map from the homepage, simplify nav to Home + Contact, add a /contact page, point all CTAs to /contact.**

**Why:** The site is the showcase for Sam, an AI Systems Architect, but his actual clients are non-tech business owners (Surat SME owners, founders with a manual Excel/WhatsApp workflow). The current homepage leads with a system-map tree and a build log — which win developers but lose business owners in the first 5 seconds. Real-estate on the homepage is precious, so above-the-fold must answer: "What can you build for me and how do I talk to you?"

**The new homepage order:**
1. AFP tag + hero line (kept)
2. **3 service cards** (NEW) — "What I Can Build For You":
   - AI Websites That Do The Work (answer leads, book calls, sell while sleeping)
   - Business Software That Replaces Manual Work (Excel/WhatsApp/sheets → 1-click software)
   - AI That Uses Your Own Data (chats, notes, data → content, reports, auto-replies)
   - All buttons → `/contact`
3. Build log section, **renamed** "How I Work — The Paper Trail", with new subtext explaining it's a live day-by-day commit feed, not screenshots. No links to non-existent pages from the feed.
4. Footer (kept)

**The system map** is removed from the homepage. The component file stays in the repo for now (it doesn't 404 just by existing), but is not rendered. Builders/devs who care can still see `ARCHITECTURE.md` directly on GitHub.

**Nav is simplified to just Home + Contact.** `/systems`, `/blueprints`, `/lab` still exist as routes for those who find them via direct link, but they're not in the nav — non-tech clients don't need them cluttering the chrome.

**/contact page:** Created. Single page with Instagram (`@x0__sam__0x`) + email. Simple, mobile-friendly, no forms (forms are friction; one DM is faster).

**Real route audit before push (zero 404s required):**
- `/` ✓
- `/contact` ✓ (new)
- `/systems`, `/blueprints`, `/lab`, `/architecture` ✓ (kept, not in nav)
- All `<Link>` hrefs on homepage now resolve

## 2026-09-03 — Hero copy (client-readable)

**Why:** They are the proof. "You can use it" beats "you should believe me."
