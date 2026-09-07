# ARCHITECTURE.md

> **SYSTEM TEMPLATE FOR RAPID CODEBASE COMPREHENSION.**
> This document is auto-filled for every one of my repos. It is the first thing any agent or human reads. This copy describes THIS site — `samc3-site` — and serves as the /architecture page.

## 1. Project Structure

```
samc3-site/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── page.tsx               # Homepage — hero + service cards + build log + method + lab previews + CTA
│   │   ├── layout.tsx             # Shell: 5-link nav + 3-column footer
│   │   ├── work/page.tsx          # /work — what I build (3 anchor sections: #websites, #software, #data-tools)
│   │   ├── systems/page.tsx       # /systems — 4 real public repos (proof)
│   │   ├── projects/page.tsx      # /projects — 307 redirect to /systems
│   │   ├── blueprints/            # /blueprints — method pillars + diary
│   │   ├── lab/                   # /lab — micro-build cards
│   │   ├── contact/               # /contact — Instagram + WhatsApp + steps + FAQ
│   │   └── architecture/          # /architecture — this doc, rendered live
│   ├── components/                # Nav, Footer, Hero, ServiceCards, CommitFeed, SystemCard, MethodSection, LabStrip
│   └── lib/                       # github.ts (commit fetcher), systems.ts (repo data), motion.ts
├── public/                        # Static assets
├── ARCHITECTURE.md                # ← you are here
├── DECISIONS.md
└── FLOW.md
```

## 2. High-Level System Diagram

```
[Visitor] ⇄ [Next.js 15 App (Vercel edge)]
              ├── Homepage  ── Service Cards → /work#* ── Commit Feed ── Method preview → /blueprints ── Lab preview → /lab ── CTA → /contact
              ├── /work      ── 3 anchored service sections (#websites, #software, #data-tools)
              ├── /systems   ── 4 real public repos (samc3-site, opencode-supervisor, software-development-governor, Orvyn-v2)
              ├── /projects  ── 307 redirect → /systems
              ├── /blueprints ── method pillars + diary
              ├── /lab       ── micro-build log
              ├── /contact   ── Instagram + WhatsApp + 4-step flow + FAQ
              ├── /architecture ── this doc rendered
              └── [GitHub: Zoro-01x] ◄── public paper trail
```

## 3. Components

### 3.1 Frontend — Next.js 15 Web App
The interactive surface. App Router, Tailwind CSS v4, dark theme with emerald accent. Server components by default; client components only where state lives (SystemMap, CommitFeed).

**Deployment:** Vercel (edge)

### 3.2 Docs-as-Code Layer
The differentiator. Every file in `docs/` is versioned in the public GitHub repo. The site renders ARCHITECTURE.md back at you — it documents itself.

## 4. Data Stores

- **None (MVP).** The commit feed is seed data; Week 2 wires the GitHub API.

## 5. External Integrations

- **GitHub API** — `GET /repos/Zoro-01x/samc3-site/commits?per_page=8`. Public, no auth, no key. Server-side fetch from `src/lib/github.ts` with ISR `revalidate: 60`. Powers the live build log on the homepage.
- **Vercel AI SDK + Claude** (Week 2-3) — generate DECISIONS.md / FLOW.md / BUG.md for System B & C.

## 6. Deployment & Infrastructure

- **Host:** Vercel (free tier)
- **CI/CD:** GitHub → Vercel auto-deploy on `main`
- **Domain:** localhost (MVP) → custom domain later

## 7. Security

- Public repo — no secrets committed. API keys in env.
- No auth needed (read-only marketing site).

## 8. Dev & Testing

- `npm run dev` → localhost:3000
- `npm run build` → type-check + production build

## 9. Roadmap

- [ ] Wire real GitHub commit feed
- [ ] Ship System B: AI Handover Kit
- [ ] Ship System A: Surat Textile OS
- [ ] Ship System C: Founder's OS
- [ ] Custom domain + Calendly audit link

## 10. Project Identification

- **Project:** samc3-site — "The site that documents itself"
- **Repo:** github.com/Zoro-01x
- **Owner:** Sam
- **Last update:** 2026-09-03

## 11. Glossary

- **Docs-as-Code:** Documentation written, reviewed, and versioned like code.
- **Paper Trail:** The committed record of decisions + flow + architecture.
- **AFP:** Architecture First, Paper trail Always.
