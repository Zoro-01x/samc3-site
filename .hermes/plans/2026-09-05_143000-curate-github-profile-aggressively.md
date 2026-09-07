# Curate Aggressively — GitHub Profile Cleanup

**> For Hermes:** Execution is one-shot batched. **LOCAL-ONLY** for any samc3-site changes. **GITHUB-SIDE actions require explicit user "go" before any push/archive/delete.** I hold the destroy key.

**Goal:** Transform `github.com/Zoro-01x` from "33 noisy experiments" to "5 finished systems." Massively higher trust signal to both Surat SME clients and tech reviewers. No code written. No project files touched except `samc3-site` (a single new profile/README redirect on the site, optional).

**Architecture:** Two-track — **local decisions** (this plan + a tiny `samc3-site` touch) and **remote execution** (GitHub API archive/delete ops the user explicitly approves). Archive is non-destructive: code stays on disk, becomes read-only, marked "Archived" in the UI. Delete is destructive. **Archive is the default.** Delete only for repos with 0 useful code, all marked in this plan.

**Tech Stack:** `gh` CLI (already authenticated as `Zoro-01x`). GitHub REST API for archive (`PUT /repos/{owner}/{repo}` with `archived: true`). No new dependencies. No environment variables.

---

## The Decision — 33 repos → 5 kept, 28 archived, 0 deleted (initially)

### KEEP (5) — Pin these on the profile, link from samc3-site

| Repo | Why keep | Status now |
|---|---|---|
| `samc3-site` | The site itself, live proof | Has commits, has README (well — has DECISIONS.md) |
| `opencode-supervisor` | Real production code, has README, has arch diagram | Has README ✓ |
| `software-development-governor` | 144 module tests, 6 frozen laws, real engineering discipline | Has README ✓ |
| `Orvyn-v2` | Current orchestrator, has architecture, has README | Has README ✓ |
| `opencode-capability-system` | Pairs with `opencode-supervisor` as the capability layer | **Missing description + README** — needs a one-paragraph addition |

**Total kept: 5** (all public, all documented except `opencode-capability-system`)

### ARCHIVE (28) — Read-only, removed from active signal, code preserved

All of these are throwaway experiments, abandoned iterations, or other people's work. They contribute negative signal to the profile. Archive is reversible (`gh repo unarchive`), code stays accessible via direct URL.

| Reason | Repos |
|---|---|
| **Forked library (not yours)** | `anime` |
| **Same idea, abandoned earlier attempts** | `Orvyn` (v1), `orvyn-v1-test`, `Raden`, `intelligence-os`, `intelligence-os-compiler`, `AI-Orchestration-Platform`, `AI-Governor`, `loop-engineer` |
| **Empty/shell with no README, no description** | `test-versions`, `system-data`, `openwiki`, `opencode-adapter`, `opencode-skills`, `opencode-config`, `mcp-servers`, `mcp-bridge`, `infrastructure-intent`, `creative-pipeline`, `adaptive-pipeline`, `creator-research` |
| **Other people's work** (not yours to show) | `simon-resume`, `sam-portfolio`, `just-sam-ai-content` |
| **Bot/throwaway** | `hayday-bot` |
| **Truly old** | `Zoro-s-Domain`, `Portfolio` |

**Note:** `TempleKitchenOS` and `TempleKitchenOS-Main` are EXCLUDED from this plan — Sam confirmed they're private client work, off-limits.

**Total archived: 28** (all public, all returned to "read-only/archived" state, code preserved)

### NOT DELETING ANYTHING IN THIS PLAN

Delete is irreversible. Archive is the right move. If a repo later proves worth bringing back, one `gh repo unarchive` and it's back. No code is destroyed. **Sam holds the final delete decision for later, repo by repo, after living with the archived profile for a month.**

---

## Tasks

### Task 1: Document the keep-tier repos (5 small READMEs)

**Objective:** The 5 repos Sam keeps MUST look like finished, intentional work. Each gets a one-paragraph `README.md` (or polish existing).

**Files:**
- `opencode-capability-system/README.md` — NEW, see below
- `opencode-supervisor/README.md` — already exists, verify it's not 2-line
- `software-development-governor/README.md` — already exists, verify it links to docs/
- `Orvyn-v2/README.md` — already exists, verify
- `samc3-site/README.md` — currently relies on DECISIONS.md, no top-level README. **Add a 4-line one.**

**Step 1: Write the missing README for `opencode-capability-system`**
```markdown
# OpenCode Capability System

A registry of capabilities (tools, prompts, skills) that compose with [opencode-supervisor](https://github.com/Zoro-01x/opencode-supervisor) and [Orvyn-v2](https://github.com/Zoro-01x/Orvyn-v2).

## Status

Experimental. See the supervisor for the production system.
```

**Step 2: Write the missing README for `samc3-site`**
```markdown
# samc3-site

My portfolio and live paper trail. Built in public, one decision at a time.

- **Live:** https://samc3-site.vercel.app
- **Architecture:** [ARCHITECTURE.md](./ARCHITECTURE.md) — 11-section template
- **Decisions:** [DECISIONS.md](./DECISIONS.md) — every choice, with rationale
- **Flow:** [FLOW.md](./FLOW.md) — how the system hangs together

The commit log on the live site is this repo's real history, fetched live from GitHub.
```

**Step 3: Verify the existing 3 READMEs** (opencode-supervisor, software-development-governor, Orvyn-v2) — if any are < 5 lines, flag for the user. The compiler-judge here: would a non-tech Surat SME client see "this person finished something" or "this person started and stopped"? If the latter, the README needs a "Status: Shipped" or "Status: Active" line.

**Step 4: Commit each README** to its own repo (one commit per repo, clear messages). No push without user "go".

### Task 2: Archive the 28 throwaway repos

**Objective:** 28 repos become "Archived" via GitHub API. Code preserved, profile no longer noisy. Reversible.

**Files:** None (this is purely a GitHub-side action, no local file changes).

**Step 1: Dry-run the archive list** — print the list, ask user to confirm before any archive call.
```
To be archived (28):
  - anime (forked library)
  - Orvyn (v1, abandoned)
  - orvyn-v1-test
  - Raden
  - intelligence-os
  - intelligence-os-compiler
  - AI-Orchestration-Platform
  - AI-Governor
  - loop-engineer
  - test-versions
  - system-data
  - openwiki
  - opencode-adapter
  - opencode-skills
  - opencode-config
  - mcp-servers
  - mcp-bridge
  - infrastructure-intent
  - creative-pipeline
  - adaptive-pipeline
  - creator-research
  - simon-resume
  - sam-portfolio
  - just-sam-ai-content
  - hayday-bot
  - Zoro-s-Domain
  - Portfolio
  - opencode-skills

Not in this list (kept): samc3-site, opencode-supervisor, software-development-governor, Orvyn-v2, opencode-capability-system.
Not in this list (private, off-limits per Sam): TempleKitchenOS, TempleKitchenOS-Main.
```

**Step 2: Archive in a single batched loop** (one terminal call, ~30 seconds):
```bash
for repo in anime Orvyn orvyn-v1-test Raden intelligence-os intelligence-os-compiler AI-Orchestration-Platform AI-Governor loop-engineer test-versions system-data openwiki opencode-adapter opencode-skills opencode-config mcp-servers mcp-bridge infrastructure-intent creative-pipeline adaptive-pipeline creator-research simon-resume sam-portfolio just-sam-ai-content hayday-bot Zoro-s-Domain Portfolio; do
  gh repo edit Zoro-01x/$repo --archive
  echo "archived: $repo"
done
```

**Step 3: Verify** with `gh repo list Zoro-01x --limit 50` — only 7 repos should NOT show "Archived" badge: the 5 kept + 2 TempleKitchenOS repos. Archived ones show as `(archived)` in the output.

**Step 4: NO DELETE in this plan.** Confirm with user. If after a month Sam wants to actually delete, that's a separate later task, repo by repo, with explicit consent each time.

### Task 3: Pin the 5 kept repos on the GitHub profile

**Objective:** When someone visits `github.com/Zoro-01x`, the 5 strongest repos show first. Currently GitHub shows repos in "pushed-at" order, so any push to an old archived repo would re-bump it to top. Pinning locks the order.

**Files:** None — this is a GitHub UI config (not API-accessible for "pinned repos" on a personal profile).

**Step 1: Manual step** — Sam opens https://github.com/Zoro-01x, clicks "Customize your pins", drags 6 repos into the pinned slot (GitHub allows 6): 
1. `samc3-site`
2. `opencode-supervisor`
3. `software-development-governor`
4. `Orvyn-v2`
5. `opencode-capability-system`
6. *(one empty slot — leave it for the next finished project)*

**Why manual:** GitHub's pinned-repos API is read-only. No CLI for it. The user has to drag in the UI. Will take 30 seconds.

### Task 4: Update samc3-site `/systems` page (optional, only if user wants it)

**Objective:** The site's `/systems` page currently lists 3 internal systems (Surat Textile OS, AI Handover Kit, Founder's OS) that don't have detail pages. After curation, Sam has 4 strong public repos to actually show. Optionally rewrite `/systems` to point to the real public work.

**Files:** 
- `src/app/systems/page.tsx` — modify
- `src/components/system-card.tsx` — small modification (link target)

**Step 1: Decide if this is in-scope.** If yes: 4 cards, one per public repo, each linking to the GitHub repo (`https://github.com/Zoro-01x/<repo>`), each with a 1-sentence "What this is" description in plain English.

**Step 2: If yes, write a 4-card layout.** The existing 3-card grid (textile / handover / founders) gets replaced with: `samc3-site`, `opencode-supervisor`, `software-development-governor`, `Orvyn-v2`. Founder's OS / stealth project dropped from `/systems` (the system-card has "Building" status — change to "Coming Soon" if kept; or drop entirely).

**Step 3: Verify** — `npm run build` passes, `/systems` shows the 4 public repos with GitHub links.

**Step 4: NO PUSH until Sam says "go".**

---

## Tests / Validation

- After Task 1: `gh api repos/Zoro-01x/opencode-capability-system/readme | jq .name` returns `README.md` (not 404)
- After Task 2: `gh repo list Zoro-01x --limit 50 --json name,isArchived --template '{{.name}}:{{.isArchived}}\n'` shows 28 archived, 7 not archived
- After Task 3: visual confirmation by Sam (manual step)
- After Task 4: `npm run build` passes; `curl /systems` contains 4 GitHub repo URLs

## Risks / Tradeoffs / Open Questions

- **Risk — what if a recruiter or friend goes to an archived repo and sees the "Archived" banner?** That's a *positive* signal: it shows you actively manage the profile, not that you abandon things. Sam can later point to "I cleaned this up, I curate" — strong differentiator for AI Systems Architect persona.
- **Risk — what if I archive a repo Sam wanted to keep?** Mitigation: the dry-run step in Task 2 prints the full list BEFORE any action. Sam says "yes go" or "remove X first." Reversible via `gh repo unarchive Zoro-01x/X`.
- **Risk — `opencode-capability-system` might also be redundant with `opencode-supervisor` and should also be archived.** Open question. The plan keeps it as a "supporting repo" with a one-paragraph README. If Sam disagrees, easy to drop.
- **Tradeoff — archiving hides the early-iteration history.** Some tech reviewers value seeing "v1 → v2 → v3" evolution. Mitigation: `samc3-site`'s DECISIONS.md already documents the thinking. The repo history is in git, accessible by URL even when archived.
- **Tradeoff — does the user want Task 4 (the `/systems` page rewrite) or is the cleanup enough on its own?** Plan includes Task 4 as **OPTIONAL**. Sam says "yes include it" or "skip it" before I start.
- **Tradeoff — does Sam want a profile-level README at github.com/Zoro-01x (a `README.md` on a special profile repo)?** Out of scope for this plan — that's a "create a NEW repo called `Zoro-01x`" action and creates a public 7th kept repo. If Sam wants it, separate later plan.

---

## Decision Gate

**This plan touches public-facing reputation. Three yes/no from Sam before I touch anything:**

1. **Approve the keep list (5)?** Sam may want to add/remove one. (e.g. "keep `mcp-servers` too" or "drop `Orvyn-v2`")
2. **Approve the archive list (28)?** Sam may want to keep one more (e.g. "I want `Raden` to stay public") or pre-emptively delete one (e.g. "delete `simon-resume`, it's not mine")
3. **Include Task 4 (`/systems` page rewrite)?** Yes or no.

**Once Sam confirms, I will:**
1. Print the dry-run list of 28 archive targets
2. Wait for Sam's "go"
3. Execute Task 1 (READMEs) → Task 2 (archive) → Task 3 (pin, manual) → optionally Task 4
4. Verify each task
5. Report back with proof (commands, output, before/after `gh repo list`)

**NO archive/delete will run without explicit "go".** The assistant holds the destroy key; Sam holds the trigger.
