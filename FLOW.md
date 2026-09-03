# FLOW.md

> **How work actually moves through this system.** State changes, handoffs, and the rules that keep the pipeline from deadlocking. Read this to know what "done" means.

## 1. The Flow, In One Line

```
Idea → Decision (DECISIONS.md) → Architecture (ARCHITECTURE.md) → One Diff → Verify → Merge → Live on GitHub
```

## 2. States

| State | Meaning | Exit condition |
|---|---|---|
| **Idea** | A want, unshaped. | Written down, given a name. |
| **Decision** | Why + when recorded. | Appears in DECISIONS.md. |
| **Architecture** | Where it lives, what talks to it. | Appears in ARCHITECTURE.md. |
| **Diff** | One change, atomic. | Passes review. No blind merges. |
| **Verify** | Build passes, page renders. | `npm run build` succeeds. |
| **Live** | On GitHub, deployable to Vercel. | Commit on `main`. |

## 3. Rules

1. **One change per request.** One feature = one scope = one diff. This is what makes no-conflict, instant-rollback possible.
2. **Read every diff. Twice.** Before anything merges, the diff is read against the decision log. Contradiction → diff is wrong, or decision is — fix both in the same change.
3. **Rollback under a minute, always.** If a branch can't revert cleanly, it wasn't designed right.
4. **Docs move first.** The `.md` is written before the code it describes. Code that arrives without a doc update is incomplete.

## 4. Handoffs

- **Human → Agent:** a request with context pinned (AGENTS.md / DECISIONS.md / ARCHITECTURE.md). No context, no start.
- **Agent → Human:** a diff + the diff's justification, keyed to a decision. The human reviews, not re-derives.

## 5. Current Pipeline (MVP)

| # | Stage | Tool | Status |
|---|---|---|---|
| 1 | Shell scaffold | Next.js 15 | ✅ done |
| 2 | Design system | Tailwind v4 | ✅ done |
| 3 | Homepage | Hero + map + log | ✅ done |
| 4 | /systems | 3 demo cards | ✅ done |
| 5 | /blueprints | method | ✅ done |
| 6 | /lab | micro-builds | ✅ done |
| 7 | /architecture | render this doc | ⏳ in progress |
| 8 | Real GitHub feed | API | ⏳ Week 2 |
| 9 | Systems A/B/C live | demos | ⏳ Week 2-3 |
