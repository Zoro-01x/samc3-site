# Add Site Depth & Discoverability — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Make samc3-site feel substantial without bloating it — expand the nav, add real content depth to each page, give every CTA a distinct destination so no button leads to the same place.

**Architecture:** Surface what's already hidden (5 unused pages), deepen the homepage into a real scrollable story, give each service card its own anchor section instead of all pointing to /contact, and add a `/work` page that shows the process (build log + diary + lab builds combined).

**Tech Stack:** Next.js 15 App Router, Tailwind v4, existing `bg-bg/bg-surface/border-border/text-accent` tokens, GitHub API for build log (already wired), no new dependencies.

---

## Current State (the real problem)

**Pages that exist (7):**
- `/` — Home (hero + 3 service cards + build log + CTA)
- `/contact` — Instagram + WhatsApp
- `/systems` — 4-repo showcase
- `/projects` — redirects to /systems
- `/blueprints` — Method pillars (4) + diary (3) — **hidden in nav**
- `/architecture` — ARCHITECTURE.md as page — **hidden in nav**
- `/lab` — Micro-build cards (4) — **hidden in nav**

**Nav shows only 2:** Home + Contact. Everything else is undiscoverable.

**Homepage flow problem:** 3 service cards (AI Websites, Business Software, AI With Your Data) → all 3 CTAs go to `/contact`. Final CTA "Let's talk" → also `/contact`. Footer `Contact` link → also `/contact`. Result: every button leads to one place. Feels empty.

---

## Proposed Approach

### Layer 1 — Surface what's hidden (nav + footer)
Expand `src/components/nav.tsx` from 2 links to 5: Home, Work, Systems, Lab, Contact. Match the brand tone — the "Work" link goes to a new `/work` page (or repurposes `/blueprints`). Footer mirrors with extra Discover/About/Build columns so the bottom of every page has more destinations.

### Layer 2 — Make the homepage a real story
Repurpose `/blueprints` and `/lab` content INTO the homepage as deeper sections (after build log). This adds ~600 words of real content and turns the homepage from one hero + one log into: hero → services → build log → method → micro-builds → CTA. Each section has a "Read more →" link to its own page.

### Layer 3 — Give each service card a distinct destination
Instead of all 3 cards → `/contact`, route each to a different anchor or page:
- "AI Websites That Do The Work" → `/work#websites` (scroll to relevant section on new page)
- "Business Software That Replaces Manual Work" → `/work#software`
- "AI That Uses Your Own Data" → `/work#data-tools`

The new `/work` page has one section per card, each section a real mini-essay with examples and a specific CTA at the end (not just /contact).

### Layer 4 — Add depth to /contact
Currently 2 cards (Instagram + WhatsApp) + 3 questions list. Add:
- **What happens next** section (3 numbered steps: I reply in X hours → we hop on a 15-min WhatsApp call → I send a one-page scope within 48 hrs)
- **Working hours** (real time, e.g. "10am–9pm IST, Mon–Sat")
- **A small FAQ** (3–4 questions like "Do you take cash/UPI/bank transfer?", "What if I just need a website, not AI?")

### Layer 5 — Polish the existing /systems page
4 cards are already there. Add a small intro paragraph ("Here are 4 real things I built and shipped. Each is a public repo with a README.") so it doesn't feel like the cards appear from nowhere.

---

## Step-by-Step Plan

### Task 1: Expand the nav from 2 → 5 links
**Files:** `src/components/nav.tsx`

- Add `/work`, `/systems`, `/lab` to the links array
- Keep "Home" and "Contact" as bookends
- Order: Home, Work, Systems, Lab, Contact (story flow)
- Add active-state highlighting for non-root paths
- Test: each link navigates correctly, active state matches current path

### Task 2: Restructure footer into 3 columns
**Files:** `src/components/footer.tsx`

- Column 1: "Discover" — Home, Work, Systems
- Column 2: "Build" — Contact, GitHub link, ARCHITECTURE.md
- Column 3: "About" — short bio + copyright
- Keep "Sam — AI Systems Architect, Surat" in the brand line
- Test: footer doesn't break on mobile (stack columns), all links work

### Task 3: Create /work page (the new destination for service cards)
**Files:** `src/app/work/page.tsx` (NEW)

Sections:
- **#websites** — "AI Websites That Do The Work" — mini-essay (200 words) + 2-3 example outcomes (e.g. "Inquiry form → auto-reply on WhatsApp", "Stock availability chatbot") + CTA to /contact with prefilled message
- **#software** — "Business Software That Replaces Manual Work" — mini-essay (200 words) + 2-3 example outcomes (e.g. "Excel stock sheet → web app", "WhatsApp forward → one-click dispatch") + CTA
- **#data-tools** — "AI That Uses Your Own Data" — mini-essay (200 words) + 2-3 example outcomes (e.g. "Customer chats → auto-tagging", "PDFs → searchable knowledge base") + CTA

Test: each anchor scrolls to correct section, mobile anchor links work, dev server compiles clean

### Task 4: Update homepage service cards to use the new anchors
**Files:** `src/app/page.tsx`, `src/components/service-cards.tsx`

- Change Card 1 link from `/contact` to `/work#websites`
- Change Card 2 link from `/contact` to `/work#software`
- Change Card 3 link from `/contact` to `/work#data-tools`
- Add a small "Read more →" beneath each card that points to the same anchor
- Keep final CTA "Let's talk" → `/contact` (unchanged)
- Test: clicking each card lands on the right anchor on /work

### Task 5: Add depth to /contact page
**Files:** `src/app/contact/page.tsx`

- After the 2 main cards, add a **"What happens next"** section with 3 numbered steps (response time, call, scope)
- Add a **"Working hours"** line (10am–9pm IST, Mon–Sat)
- Add a small **FAQ** at the bottom (3 Q&A: payment, scope, geography)
- Test: page builds clean, all sections render, dev server compiles

### Task 6: Add intro paragraph to /systems page
**Files:** `src/app/systems/page.tsx`

- Add 1–2 sentences above the cards: "Four real things I built and shipped. Each is a public repo with a README, real commits, and a real architecture."
- Don't touch the card grid (already working)
- Test: page builds clean, intro doesn't push cards down weirdly

### Task 7: Promote blueprints + lab into homepage as deeper sections
**Files:** `src/app/page.tsx` (modify), `src/components/method-section.tsx` (NEW), `src/components/lab-strip.tsx` (NEW)

- After build log, render a "How I work" section that pulls 2 pillars from blueprints (pin context, read every diff)
- After that, render a "Recent micro-builds" strip that pulls 2 cards from /lab
- Each section has a "Read all on /blueprints →" / "Read all on /lab →" link
- These are visual previews, not full page content
- Test: homepage has more scrollable content, each preview has a "read more" link to the full page

### Task 8: Build verify + visual check
**Files:** all

- Run `npm run build` — should compile clean
- Restart dev server, click through every nav link, every CTA, every anchor
- Verify: no 404s, no broken anchors, no console errors
- Verify mobile: nav collapses sensibly, footer columns stack

### Task 9: Update ARCHITECTURE.md + DECISIONS.md (held until after push)
**Files:** `ARCHITECTURE.md`, `DECISIONS.md`

- ARCHITECTURE: add `/work` to the route map
- DECISIONS: add a "Decision: Add site depth without new pages" entry

Test: docs reflect new structure

---

## Files Likely To Change

**Modified:**
- `src/components/nav.tsx` (5 links instead of 2)
- `src/components/footer.tsx` (3-column layout)
- `src/app/page.tsx` (use new components, update service card links)
- `src/app/contact/page.tsx` (add "what happens next" + FAQ)
- `src/app/systems/page.tsx` (add intro paragraph)
- `src/components/service-cards.tsx` (new anchor links)
- `ARCHITECTURE.md` (route map)
- `DECISIONS.md` (rationale entry)

**New:**
- `src/app/work/page.tsx` (new destination page)
- `src/components/method-section.tsx` (homepage preview of /blueprints)
- `src/components/lab-strip.tsx` (homepage preview of /lab)

**Total:** 8 modified, 3 new = 11 files touched

---

## Tests / Validation

- `npm run build` passes with no type errors
- Dev server: every nav link navigates correctly
- Homepage: all 3 service card CTAs land on the correct anchor on /work
- /work: each anchor scrolls to correct section
- /contact: new sections render, FAQ is readable
- /systems: intro paragraph appears above cards
- Mobile (test at 375px width): nav and footer don't break, anchors work
- Lighthouse / Next.js console: zero errors, zero warnings

---

## Risks, Tradeoffs, Open Questions

**Risk 1 — Feature creep.** The user said "too simple" but might also feel "too much" after expansion. Mitigation: ship Task 1-6 first (nav + service destinations + /work + /contact depth), get user feedback before doing Task 7 (homepage previews). If they say "stop, that's enough", we stop.

**Risk 2 — Writing takes time.** Task 3 (3 mini-essays of 200 words each = 600 words) and Task 5 FAQ all require copy. I can draft in the user's brand voice (warm, plain, "I build AI systems that run your business" tone) but they may want to rewrite. Mitigation: mark all copy clearly as "draft — review before push".

**Risk 3 — /work page might overlap with /systems.** Both are "show me what you've done" pages. Mitigation: /work is *what I can build for you* (services), /systems is *what I've already built* (proof). Clear distinction in the copy and nav labels.

**Open question 1 — Should /blueprints still be a separate page, or get absorbed into /work?**
- Keep separate: /work = services, /blueprints = method, /lab = speed. Three distinct angles.
- Absorb: /work becomes the only "detail" page, simpler nav.
- **My call:** keep all 5 routes. They serve different questions a visitor has.

**Open question 2 — Should the new /work page include a pricing/starting-at section?**
- The user has avoided showing prices so far (correctly — every project is custom).
- **My call:** no prices. Instead, "Starting from a 15-min WhatsApp call" CTA. Same as now.

**Open question 3 — Should we add /about or /now pages?**
- "Now" pages are trendy (Derek Sivers style) but not relevant for a Surat-business audience.
- **My call:** skip /about and /now. The bio in the footer is enough.

---

## Out of Scope (deliberate)

- New dependencies (no new npm packages)
- New colors / theme tokens (use existing)
- Blog / changelog (would dilute focus)
- Contact form (already decided: WhatsApp + Instagram only, no email)
- Pricing page (already decided: no public prices)

---

**Plan complete. Ready to execute using subagent-driven-development — I'll dispatch a fresh subagent per task with two-stage review (spec compliance then code quality). Shall I proceed?**
