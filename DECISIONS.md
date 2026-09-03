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

**Why:** They are the proof. "You can use it" beats "you should believe me."
