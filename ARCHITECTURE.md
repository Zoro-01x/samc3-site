# ARCHITECTURE.md

> **SYSTEM TEMPLATE FOR RAPID CODEBASE COMPREHENSION.**
> This document is auto-filled for every one of my repos. It is the first thing any agent or human reads. This copy describes THIS site — `samc3-site` — and serves as the /architecture page.

## 1. Project Structure

```
samc3-site/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Homepage — hero + system map + build log
│   │   ├── layout.tsx        # Shell: nav + footer
│   │   ├── systems/page.tsx  # /systems — 3 live demos
│   │   ├── blueprints/       # /blueprints — method
│   │   ├── lab/              # /lab — 5-hr builds
│   │   └── architecture/     # /architecture — this doc, rendered live
│   ├── components/           # Nav, Footer, Hero, SystemMap, CommitFeed, SystemCard
│   └── lib/                  # Shared utilities
├── public/                   # Static assets
├── ARCHITECTURE.md           # ← you are here
├── DECISIONS.md
└── FLOW.md
```

## 2. High-Level System Diagram

```
[Visitor] ⇄ [Next.js 15 App (Vercel edge)]
              ├── Homepage  ── System Map ── Commit Feed
              ├── /systems  ── 3 demo cards
              ├── /blueprints ── method pillars
              ├── /lab       ── micro-build log
              └── /architecture ── this doc rendered
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

- **GitHub API** (Week 2) — pull `owner/gh` commits for the realtime build log.
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
