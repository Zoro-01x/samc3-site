# Lead Capture: Contact Form + Real Inbox — Implementation Plan

**> For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task. **Local-only until Sam approves localhost:3000.** All secrets held in `.env.local` (never committed) and Vercel project env (set in dashboard).

**Goal:** Make it so Sam reliably knows when someone reaches out from his site — both as a Gmail notification (real inbox) and as an email he gets from the on-site form. Visitors who don't use a mail client can type directly into the site.

**Architecture:** Two pieces work together:
1. **A real `sam@samc3.site` inbox** via Google Workspace (15-min admin setup on Sam's end) — this becomes the destination address for all form submissions, and gives Sam native Gmail push notifications on his phone.
2. **A Next.js API route + a contact form on `/contact`** that submits to a free transactional-email service (Resend) which forwards to the `sam@samc3.site` inbox. No database. No state. ~$0/mo on the free tier (100 emails/day, way more than needed).

**Tech Stack:** Next.js 15 App Router (already running) + Resend Node SDK + React (no new UI lib, just a small form styled with the existing tokens). All secrets in `.env.local` / Vercel env vars.

**Audience:** Confirmed via clarify — Sam does NOT yet own `samc3.site` (Vercel hosts it but it's Vercel's default vercel.app subdomain underneath). The plan handles this by:
- (a) getting `samc3.site` registered as a real domain Sam owns (cheap, ~₹800/yr)
- (b) wiring Google Workspace on it
- (c) wiring the form to that inbox

**Decision locked via clarify:** BOTH the form (so non-tech visitors can type in browser) AND the real Google Workspace inbox (so Sam gets Gmail push notifications). Most complete setup. This is the only right answer for a "I want to know if someone mailed me" requirement.

---

## Section 1 — Domain & Inbox Setup (one-time, Sam-side, 30 min total)

These four steps don't touch the repo. They give the form a destination email and Sam a real inbox.

### Task 1.1: Register `samc3.site` as a domain Sam owns
- **Where:** Any registrar — Cloudflare Registrar (cheapest, no markup, recommended), Namecheap, or GoDaddy.
- **Cost:** ~₹800/yr (≈$10/yr) for `.site` TLD.
- **What happens:** Sam gets DNS access. **Without this, the rest of this plan can't work** — we need to point MX records at Google Workspace.
- **Why Cloudflare specifically:** They include free email forwarding, free DNS, and the easiest DNS UI. If you don't want to give Cloudflare your card yet, Namecheap is fine.
- **Verification:** Sam can edit DNS records at the registrar.

### Task 1.2: Set up Google Workspace on `samc3.site`
- **Where:** https://workspace.google.com (Start a free 14-day trial of Business Starter, ~$7/user/mo after).
- **What you do:**
  1. Sign up with `sam@samc3.site` (or whatever you want as the primary).
  2. Google asks you to **verify domain ownership** by adding a TXT record to your DNS — paste the value into the registrar's DNS panel.
  3. Google asks you to **add MX records** so mail to `sam@samc3.site` lands in Gmail — copy the 5 records Google gives you.
- **Time:** ~15 min including DNS propagation wait (sometimes up to 1 hour).
- **Verification:** Send an email from your personal Gmail to `sam@samc3.site`. It should arrive in the new Workspace inbox. Log into Gmail with `sam@samc3.site`. Push notifications on the Gmail app on phone = **you now have real lead notifications**.

### Task 1.3: Get Resend account + API key (for the form's email transport)
- **Where:** https://resend.com
- **What you do:** Sign up, go to API Keys, click "Create API Key", copy the key (starts with `re_`).
- **Free tier:** 100 emails/day, 3,000/month. More than enough.
- **Why Resend and not Gmail-SMTP directly:** Gmail SMTP requires app passwords + has rate limits. Resend is purpose-built for this and gives clean bounce/spam handling.

### Task 1.4: Verify `send.samc3.site` (or just `samc3.site`) with Resend
- **Where:** Resend dashboard → Domains → Add Domain → enter `samc3.site`.
- **What you do:** Resend gives you 3 DNS records (DKIM, SPF, return-path). Add them to your DNS.
- **Why:** Until verified, Resend sends FROM a default `onresend.net` address and your emails go to spam. Once verified, they send `noreply@samc3.site` cleanly.

---

## Section 2 — Repo changes (the form + the API route)

All work below is local, bite-sized, TDD. The full local-first rule applies: do NOT push to GitHub until Sam has loaded the form on localhost:3000/contact and confirmed it works end-to-end (Task 7 below).

### Task 2.1: Install Resend SDK
- **Files:** `package.json` (auto-updated)
- **Command:** `npm install resend`
- **Verification:** `node -e "console.log(require('resend').Resend)"` → prints class. `package.json` shows `"resend": "^x.y.z"`.
- **Commit:** none yet (commit at end of task 2.5 once it works)

### Task 2.2: Add env vars to `.env.local` and `.gitignore`
- **Files:** `samc3-site/.env.local` (new), `samc3-site/.gitignore` (verify `.env*` is already ignored — it is)
- **Content of `.env.local`:**
  ```
  RESEND_API_KEY=re_PASTE_KEY_HERE
  CONTACT_TO_EMAIL=sam@samc3.site
  ```
- **Verification:** `cat .gitignore | grep .env` → matches. File exists locally. **Never committed.**

### Task 2.3: Create the API route `src/app/api/contact/route.ts`
- **Files:** Create `src/app/api/contact/route.ts`
- **What it does:** Accepts POST `{ name, email, message, businessType? }`, validates, sends via Resend, returns JSON.
- **Skeleton (will be filled by subagent):**
  ```ts
  import { Resend } from "resend";
  import { NextResponse } from "next/server";

  const resend = new Resend(process.env.RESEND_API_KEY);
  const TO = process.env.CONTACT_TO_EMAIL ?? "sam@samc3.site";

  type Body = { name?: string; email?: string; message?: string; businessType?: string };
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  export async function POST(req: Request) {
    const body = (await req.json().catch(() => null)) as Body | null;
    const name = body?.name?.trim() ?? "";
    const email = body?.email?.trim() ?? "";
    const message = body?.message?.trim() ?? "";
    const businessType = body?.businessType?.trim() ?? "";
    if (!name || !emailRe.test(email) || message.length < 5) {
      return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
    }
    const subject = `[samc3-site] New lead from ${name}`;
    const html = `
      <h2>New contact from samc3.site</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      ${businessType ? `<p><b>Business type:</b> ${businessType}</p>` : ""}
      <hr/>
      <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
      <hr/>
      <p style="color:#666;font-size:12px">Reply directly to this email to respond to ${name}.</p>
    `;
    const { error } = await resend.emails.send({
      from: "samc3-site <noreply@samc3.site>",  // works after Task 1.4
      to: TO,
      replyTo: email,
      subject,
      html,
    });
    if (error) {
      return NextResponse.json({ ok: false, error: "send" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }
  ```
- **TDD:** Write a small test or use the form in Task 2.5 to verify the route works.
- **Commit:** not yet

### Task 2.4: Add the contact form UI on `/contact`
- **Files:** Modify `src/app/contact/page.tsx` (currently lines 36-67 have the two cards). Insert form below the cards.
- **Form fields:** Name, Email, Business type (optional select: Textile / Diamond / Manufacturing / Other), Message (textarea), Submit.
- **UX:** Client-side state (no lib), shows spinner on submit, success state ("Got it. I'll reply within a few hours."), error state with retry.
- **Styling:** uses existing tokens — `bg-surface`, `border-border`, `text-foreground`, `bg-accent` button. No new dependencies.
- **Accessibility:** labels for every field, `aria-invalid`, `aria-describedby` for error messages, keyboard navigable.
- **Anti-spam:** honeypot field (hidden `website` input — if filled, silently accept but skip the email send). No CAPTCHA — for a personal site that's overkill.
- **Commit:** not yet

### Task 2.5: End-to-end smoke test
- **Run:** `npm run dev`
- **Open:** `http://localhost:3000/contact`
- **Test:** fill form, submit, check `sam@samc3.site` (or your Gmail while the inbox is being set up) — email should arrive within ~10s
- **Verify in DevTools Network tab:** POST `/api/contact` returns `{ ok: true }` on success, `{ ok: false, error: "validation" }` on bad input, `{ ok: false, error: "send" }` if Resend rejects
- **Commit (now we have something working):** `feat(contact): form + api route via Resend — lead capture into Gmail`

### Task 2.6: Vercel env vars
- **Where:** Vercel dashboard → samc3-site project → Settings → Environment Variables
- **Add:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`
- **Why:** Without this, the Vercel deployment will 500 on form submit.
- **Commit:** none (Vercel config, not code)

### Task 2.7: Localhost sign-off (LOCAL-FIRST RULE)
- **Run:** `npm run build` PASS, all routes 200
- **Manual test on `localhost:3000/contact`:** form looks right (matches the warm-light atelier theme, not neon/cyberpunk), submits, email arrives
- **STOP here.** Do not push to GitHub. Hand back to Sam for visual + functional approval.

---

## Section 3 — Tests / validation

- `npm run build` must pass after every code-touching task.
- `curl` smoke: `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","message":"Hello there"}'` returns `{"ok":true}`.
- Validation: empty fields, bad email, too-short message → 400.
- Honeypot: filling `website` field silently returns 200 but doesn't actually send.
- On Vercel (post-approval, post-push): submit a real form on the live URL. Email arrives at `sam@samc3.site` (or fallback Gmail) within 10s. Push notification on phone.

---

## Section 4 — Files that will change

| Path | Action |
|---|---|
| `package.json`, `package-lock.json` | add `resend` dep |
| `src/app/api/contact/route.ts` | new (API route) |
| `src/app/contact/page.tsx` | modify (add form below cards) |
| `src/components/contact-form.tsx` | new (extracted form for clean code) |
| `.env.local` | new (never committed) |
| `DECISIONS.md` | append "2026-09-04 — Lead capture (form + real inbox)" rationale |
| `ARCHITECTURE.md` | append the new `/api/contact` route + new env vars to the relevant sections |
| Vercel dashboard (not repo) | add 2 env vars |

---

## Section 5 — Risks / Tradeoffs / Open Questions

- **Risk — Domain not yet owned by Sam.** Task 1.1 is a real external step. Without it, Resend will send from `onresend.net` and the form will work but emails may land in spam. Mitigation: explicit "Task 1.1 first" gate in the plan.
- **Risk — Resend free tier rate limits.** 100/day, 3000/month is more than enough for a personal portfolio site. If you ever go viral, upgrade is $20/mo.
- **Tradeoff — Google Workspace costs $7/mo after the 14-day trial.** Alternative: use `gmail.com` for the inbox and have the form send there. Sam gets notifications just the same. Cheaper, less professional address. The plan assumes Sam will keep Workspace (it's worth it for the `sam@samc3.site` address — that's part of the brand).
- **Tradeoff — A form on the site is *additional friction* vs. "DM me on Instagram" which is one tap.** The form is for the *secondary* path (people who want to type a longer brief). Instagram stays the primary CTA. Form is *additional*, never a replacement.
- **Open question — Should the form also save submissions to a database (Supabase free tier) so Sam has a CRM-like history even if email is missed?** My recommendation: **NO** for v1. Database is more code, more failure modes, more attack surface. The form's email-to-Sam is enough. We can add Supabase later if Sam wants a backup. **Confirm with Sam before adding.**
- **Open question — Spam protection beyond honeypot?** v1 = honeypot only. If spam shows up, add Cloudflare Turnstile (free) in a future pass.
- **Open question — Should the form support file attachments (briefs, decks)?** Resend supports attachments up to 40MB. Easy to add but YAGNI for v1 — the brief says "longer briefs" but a real form is enough for v1. Defer.

---

## Decision Gate

Plan saved. Three things I want from Sam before I touch code:

1. **Confirm: you understand Task 1.1 (register `samc3.site` for ~₹800/yr) is a prerequisite** that you do yourself on a registrar's website. I cannot do this for you.
2. **Confirm: you accept the $7/mo Google Workspace cost** (or want to fall back to a free Gmail address).
3. **Confirm: the form is in addition to Instagram DM, not a replacement** (it lives on `/contact` as a third option below the two cards).

If yes to all three, I'll execute Task 1.1 (you) → Task 1.2 (you) → Task 1.3 (you, ~5 min) → Task 1.4 (you, ~5 min) → **then** I implement the code, local-only, and show you on `localhost:3000/contact` before any push. If any of the three is a no, tell me which one and I'll adjust the plan.
