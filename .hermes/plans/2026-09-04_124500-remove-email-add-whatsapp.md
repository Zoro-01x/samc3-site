# Remove Email, Add WhatsApp on /contact — Implementation Plan

**> For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task. **LOCAL-ONLY until Sam approves localhost:3000/contact.**

**Goal:** Replace the email card on `/contact` with a WhatsApp card. The contact page becomes a clean two-card layout (Instagram DM + WhatsApp), every mail reference removed, WhatsApp uses a prefilled editable message like the Instagram card already does.

**Architecture:** Single-page edit to `src/app/contact/page.tsx`. No new dependencies. No new files (the form, API route, and Resend plan from `.hermes/plans/2026-09-04_123000-lead-capture-form-and-inbox.md` is **explicitly NOT part of this plan** — that was a separate optional lead-capture flow. This plan is the simpler, lower-risk swap: drop email, add WhatsApp.).

**Tech Stack:** No new dependencies. Reuses the existing Instagram card's `ig.me/m/.../?text=...` pattern, applied to `wa.me/<phone>?text=...`. The phone is a **placeholder** until Sam replaces it before push.

**Audience:** Confirmed via clarify — primary audience is Surat textile/diamond/manufacturing SME owners, who live on WhatsApp + Instagram. Email was a ghost door. Two cards, both real channels, both land the visitor in a chat app with a pre-typed message.

**Decisions locked via clarify:**
1. WhatsApp uses `wa.me/<phone>?text=<encoded message>` deep-link (prefilled editable message) — same pattern as Instagram
2. Phone placeholder = `919999999999` — Sam replaces the real number before any push
3. Email is **deleted everywhere**, not just the card — no fallback line, no mentions in metadata

---

## Section 1 — Files that will change

| Path | Action |
|---|---|
| `src/app/contact/page.tsx` | modify: replace the email card with a WhatsApp card; update metadata description; update the "What I'd love to know" block if needed for the new context |
| `DECISIONS.md` | append: "2026-09-04 — /contact: removed email, added WhatsApp" (one paragraph, the why) |

**No other files change.** No new components, no new env vars, no new dependencies, no homepage edits, no footer edits. The footer already links only to GitHub + ARCHITECTURE.md + Contact (no email). The homepage CTAs all point to `/contact`, not to email. Verified via search — every `mailto:` / `sam@samc3` / `Email me` reference lives in this one file.

---

## Section 2 — Step-by-step tasks (bite-sized, TDD-appropriate)

### Task 1: Update the page metadata description
**File:** `src/app/contact/page.tsx:3-7`
**Change:** replace
```
description: "Talk to Sam about building AI software for your business. Instagram DM or email — whichever you prefer."
```
with
```
description: "Talk to Sam about building AI software for your business. Instagram DM or WhatsApp — whichever you prefer."
```
**Verify:** `npm run build` passes; meta tag in served HTML reads "Instagram DM or WhatsApp".
**Commit:** not yet (commit at end of Task 3 once the page is fully done)

### Task 2: Replace the email card with a WhatsApp card
**File:** `src/app/contact/page.tsx:54-66`
**Current:** the second card is an `<a href="mailto:sam@samc3.site">` block (lines 54-66 in the file as it stands now).
**New:** an `<a href="https://wa.me/919999999999?text=...&type=phone_number&app_absent=0">` block. Use the same message text as the Instagram card (URL-encoded):
```
Hi Sam, I found your site and I'd like to talk about building something for my business.
```
URL-encoded form for the `?text=` parameter:
```
Hi%20Sam%2C%20I%20found%20your%20site%20and%20I%27d%20like%20to%20talk%20about%20building%20something%20for%20my%20business.
```

**Skeleton for the new card (style matches the Instagram card exactly so the two cards feel like a pair):**
```tsx
<a
  href="https://wa.me/919999999999?text=Hi%20Sam%2C%20I%20found%20your%20site%20and%20I%27d%20like%20to%20talk%20about%20building%20something%20for%20my%20business."
  target="_blank"
  rel="noopener noreferrer"
  className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-[0_0_30px_rgba(74,124,95,0.12)]"
>
  <span className="text-xs text-muted-2">for a longer brief</span>
  <span className="mt-2 text-lg font-semibold">WhatsApp me</span>
  <span className="mt-1 text-sm text-accent group-hover:underline">
    +91 99999 99999 →
  </span>
  <p className="mt-3 text-sm text-muted-2">
    Opens WhatsApp with the message pre-typed — edit and send. I usually reply
    within a few hours.
  </p>
</a>
```

**Sub-text changes** (subtle but matter for tone parity with the Instagram card):
- Instagram card has `for longer briefs` → keep that label on the WhatsApp card (it now has the stronger rationale — WhatsApp is where longer messages actually happen)
- Actually per the user's locked decision, the new label is `for a longer brief` and the description matches the IG card's pattern ("Opens [X] with the message pre-typed — edit and send")

**Verify:**
- `npm run build` passes
- `curl http://localhost:3000/contact | grep -c "mailto:"` returns **0** (no mailto: left)
- `curl http://localhost:3000/contact | grep -c "wa.me/919999999999"` returns **1** (the new WhatsApp link)
- `curl http://localhost:3000/contact | grep -c "sam@samc3.site"` returns **0** (no email address anywhere)
- The new card visually matches the Instagram card (same paddings, same hover behavior — same `group`, same shadow, same border styling)
- **On desktop, clicking opens `https://wa.me/...` in a new tab** (verifies the URL)
- **On mobile (real test in WhatsApp-installed browser), clicking opens the WhatsApp app with the message pre-typed** (verifies the `?text=` deep-link works)
- **Sam manually replaces `919999999999` with his real number before any push** — this is the explicit gate

**Commit:** not yet

### Task 3: Update the "What I'd love to know" block (only if needed)
**File:** `src/app/contact/page.tsx:69-87`
**Read current block first** — the existing 3 numbered questions (1. What does your business do / 2. One task you wish ran itself / 3. Have you tried software before, what broke) were written for *any* contact channel. They are channel-agnostic and **do not need to change**. Skip this task unless Sam says otherwise. **Default: do nothing in this task.**

### Task 4: Commit + verify on localhost
1. `npm run build` PASS, all 6 routes 200
2. `curl http://localhost:3000/contact | grep -c "mailto:"` = 0
3. `curl http://localhost:3000/contact | grep -c "wa.me/919999999999"` = 1
4. `curl http://localhost:3000/contact | grep -c "Email me"` = 0
5. `curl http://localhost:3000/contact | grep -c "sam@samc3.site"` = 0
6. Open the preview pane at `localhost:3000/contact` — two cards (IG + WhatsApp), no third card, no email text anywhere
7. **Commit:** `feat(contact): drop email card, add WhatsApp with prefilled message`

### Task 5: (SAM ACTION, before push) — replace placeholder phone number
1. In `src/app/contact/page.tsx`, replace both `919999999999` and `+91 99999 99999` with Sam's real number
2. Format: `wa.me/91XXXXXXXXXX` (no `+`, no spaces) for the URL; `+91 XXXXX XXXXX` for the display
3. Verify the new link works in a real WhatsApp-equipped browser (or hand-test the URL)
4. **This task is a hard gate — no push happens until the placeholder is replaced with a real number.**

### Task 6: Localhost sign-off (LOCAL-FIRST RULE)
1. `npm run build` PASS
2. Visual + functional check on `localhost:3000/contact` (preview pane)
3. **STOP. Do not push to GitHub. Hand to Sam for visual approval.**
4. On Sam's "go": commit + push to `master` (Vercel auto-deploys)

---

## Section 3 — Tests / validation

- `npm run build` must pass after every code-touching task
- Smoke tests via curl (see Task 4)
- Manual click-through on `localhost:3000/contact`:
  - IG card opens IG DM with prefilled message (already verified working)
  - WhatsApp card opens WhatsApp with prefilled message (new — must be tested)
- Mobile-equivalent click test (if Sam has a phone with WhatsApp installed; otherwise trust the `wa.me` deep-link spec, which is well-documented)

---

## Section 4 — Risks / Tradeoffs / Open Questions

- **Risk — Sam forgets to replace the placeholder phone number before push.** Mitigation: explicit Task 5 hard-gate; the placeholder `+91 99999 99999` will be obvious on Sam's review of the page.
- **Risk — `wa.me` link without a phone number that's actually on WhatsApp fails silently for the visitor.** Same as above — Task 5 is the gate.
- **Tradeoff — A `wa.me` link is a hard share of Sam's phone number.** Anyone can scrape it and spam via WhatsApp. Mitigation: Sam should expect this and use a WhatsApp Business number (which has its own spam controls) rather than his personal number. **Open question for Sam: which number will he use? Personal or Business?**
- **Tradeoff — Without email or a form, there's no record of "leads" outside of the WhatsApp chat history.** The chat itself becomes the CRM. This is fine for a small-volume personal site; if Sam ever wants a record, the form + Resend plan (`.hermes/plans/2026-09-04_123000-lead-capture-form-and-inbox.md`) is the upgrade path. **Confirm: Sam is OK with WhatsApp as the only record?**
- **Open question — Should the homepage CTA strip ("Let's talk →") get a copy tweak too?** Currently both the homepage CTA and `/contact` page say "Let's talk →" / "Let's build something". With email gone, these are still accurate (they go to /contact which is the IG+WhatsApp hub). Default: no change. If Sam wants something more specific, mention.
- **Open question — Does Sam want the nav to drop the Contact link too?** Currently nav = Home + Contact. Contact is the page we're working on, so nav link is correct. **Default: nav unchanged.**

---

## Decision Gate

Plan saved. **No code changes yet.** Three things I want from Sam before I start:

1. **Confirm the placeholder `919999999999` is fine for now** and you'll swap to your real number before push (Task 5 is the hard gate).
2. **Confirm you're OK with no lead record outside WhatsApp chat history** (no form, no email).
3. **Tell me which number you'll use** — personal or WhatsApp Business? (Business is recommended for spam controls; cost is the same.)

When you say "go" (and answer the three), I'll execute Tasks 1→4, show you on `localhost:3000/contact`, and **stop for your visual approval** before any push. After you replace the placeholder (Task 5) and approve (Task 6), one commit + push, Vercel deploys.
