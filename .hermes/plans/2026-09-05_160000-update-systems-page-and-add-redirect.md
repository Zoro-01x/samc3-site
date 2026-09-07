# Update /systems page to showcase 4 public repos + redirect /projects → /systems

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Replace the placeholder `/systems` page with a showcase of 4 strong public repos (samc3-site, opencode-supervisor, software-development-governor, Orvyn-v2) presented as business-outcome + tech-proof cards. Add a redirect from `/projects` to `/systems` to capture both SEO and brand intent.

**Architecture:** 
- Update `src/app/systems/page.tsx` to define a new `systemsList` with 4 items matching the card structure.
- Update `src/components/system-card.tsx` to accept optional `githubUrl` and `liveUrl` props, and render them appropriately while preserving existing styling.
- Add a `src/app/projects/page.tsx` that redirects to `/systems` using Next.js `redirect()`.
- Update metadata title to "Systems — Real code, not demos".

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS (existing tokens).

---

## Tasks

### Task 1: Update system-card component to support external links

**Objective:** Make `SystemCard` flexible enough to render either an internal `href` (for legacy/demo cards) or external `githubUrl` + `liveUrl` (for the new repo cards), while preserving the same visual layout and hover effects.

**Files:**
- Modify: `src/components/system-card.tsx`

**Step 1: Extend the System type**
```typescript
export type System = {
  id: string;
  tag: "A" | "B" | "C";
  name: string;
  blurb: string;
  status: "Live Demo" | "Building" | "Coming Soon";
  problem: string;
  io: [string, string];
  stack: string[];
  // Existing for internal/demo cards
  href?: string;
  // New for external repo cards
  githubUrl?: string;
  liveUrl?: string;
  proof: string;
};
```

**Step 2: Update the SystemCard component to conditionally render links**
```typescript
export function SystemCard({ system }: { system: System }) {
  // Determine the primary link: prefer githubUrl if present, fallback to href
  const externalLink = system.githubUrl ?? system.liveUrl ?? system.href;
  const isExternal = !!system.githubUrl || !!system.liveUrl;

  // ... existing statusColor logic unchanged ...

  return (
    <>
      {isExternal ? (
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_rgba(74,124,95,0.10)]"
        >
          {/* ... rest of card content identical to original Link version ... */}
        </a>
      ) : (
        <Link
          href={system.href!}
          className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_rgba(74,124,95,0.10)]"
        >
          {/* ... original card content ... */}
        </Link>
      )}
    </>
  );
}
```

**Step 3: Ensure all existing fields (`blurb`, `problem`, `io`, `stack`, `proof`, `status`, `tag`) are used unchanged inside the card.**

**Step 4: Run lint check** (no new lint errors introduced).

**Step 5: Commit** (local-only, no push until user says "go").
```bash
git add src/components/system-card.tsx
git commit -m "feat(system-card): add githubUrl/liveUrl support for external repo cards"
```

### Task 2: Replace /systems page content with 4 repo cards

**Objective:** Replace the placeholder three-demo content with four cards representing the strong public repos. Update metadata title.

**Files:**
- Modify: `src/app/systems/page.tsx`

**Step 1: Import the System type from system-card (or redefine locally for simplicity).**
```typescript
import { System } from "@/components/system-card";
```

**Step 2: Define the new systemsList array with 4 items.**
```typescript
export const systemsList: System[] = [
  {
    id: "samc3-site",
    tag: "A",
    name: "samc3-site",
    blurb: "The site you're on — live, documented, versioned.",
    problem: "Need to show real work, not just claims.",
    io: ["Local dev", "Vercel preview"],
    stack: ["Next.js", "React", "Tailwind", "Vercel"],
    githubUrl: "https://github.com/Zoro-01x/samc3-site",
    liveUrl: "https://samc3-site.vercel.app",
    status: "Live Demo",
    tag: "Meta-proof", // Note: tag field expects "A"|"B"|"C"; we'll override display via name? Actually we need to adjust: tag is limited to A/B/C. We'll keep tag as "A"/"B"/"C" and use name for display? Wait: the card displays system.tag as a big letter. We want to show custom tags like "META-PROOF". Let's adjust: keep tag as A/B/C for color, but we need another field for display tag. Simpler: we can abuse the existing tag field to hold a string? But type is union. Let's instead add a new field `label: string` and keep tag for color? That's a bigger change. Given time, let's keep tag as A/B/C and use the name field for the repo name, and we can put the tagline in blurb? Actually the card currently shows:
    //   <span className="text-3xl font-bold text-accent/30 transition-colors group-hover:text-accent/60">
    //     {system.tag}
    //   </span>
    // So tag is a single letter shown big. We want to show words like "META-PROOF". We'll need to change the card to display a string tag. Let's do that: change tag type to string and update existing usages? That would break the three existing cards if we don't update them. But we are replacing the whole list, so we can change the type and update the card to render string tag. The existing three cards in the file will be removed, so no breakage. Let's do that.
  },
  // ... we'll redo the whole thing with tag as string ...
];
```

Given the complexity, let's restart Task 2 with a clearer approach: we'll modify the System type to have `tag: string` (display tag) and keep a separate `tagColor: "A" | "B" | "C"` for the color logic? Actually the color is derived from status, not tag. Looking at the card: the colored badge uses `statusColor` based on `status`. The big letter uses `system.tag`. So we can keep `tag` as string for display, and the existing three cards used `"A"`, `"B"`, `"C"` as strings — that's fine because they are assignable to string. So we just change the type of `tag` from `\"A\" | \"B\" | \"C\"` to `string`. That's backward compatible.

Let's do that in Step 1 of Task 2: update the System type in system-card.tsx to have `tag: string`. Then we can use any string for display.

**Revised Step 1 for Task 2: Update System type in system-card.tsx**
```typescript
export type System = {
  id: string;
  tag: string; // changed from union to string
  name: string;
  blurb: string;
  status: "Live Demo" | "Building" | "Coming Soon";
  problem: string;
  io: [string, string];
  stack: string[];
  href?: string;
  githubUrl?: string;
  liveUrl?: string;
  proof: string;
};
```
(Note: we already added href?, githubUrl?, liveUrl? in Task 1, so we just need to change tag to string.)

**Step 2: Define systemsList with 4 items, using strings for tag.**
```typescript
export const systemsList: System[] = [
  {
    id: "samc3-site",
    tag: "META-PROOF",
    name: "samc3-site",
    blurb: "The site you're on — live, documented, versioned.",
    problem: "Need to show real work, not just claims.",
    io: ["Local dev", "Vercel preview"],
    stack: ["Next.js", "React", "Tailwind", "Vercel"],
    githubUrl: "https://github.com/Zoro-01x/samc3-site",
    liveUrl: "https://samc3-site.vercel.app",
    status: "Live Demo",
    proof: "Tested on local + hosted before push",
  },
  {
    id: "opencode-supervisor",
    tag: "SUPERVISOR",
    name: "opencode-supervisor",
    blurb: "AI that doesn't go off the rails — every action goes through gate → contract → verify → review.",
    problem: "AI agents can make mistakes; need a gatekeeper.",
    io: ["Input: user prompt", "Output: verified code"],
    stack: ["TypeScript", "Next.js", "OpenCode"],
    githubUrl: "https://github.com/Zoro-01x/opencode-supervisor",
    // no liveUrl (it's a library)
    status: "Live Demo",
    proof: "Production TypeScript | Architecture diagram | Input gate pattern",
  },
  {
    id: "software-development-governor",
    tag: "ENGINEERING",
    name: "software-development-governor",
    blurb: "Systems that remember, plan, and verify — not just chat.",
    problem: "AI decisions need audit, memory, and rules.",
    io: ["Input: spec", "Output: verified system"],
    stack: ["TypeScript", "Next.js", "OpenAI", "Anthropic", "Gemini"],
    githubUrl: "https://github.com/Zoro-01x/software-development-governor",
    status: "Live Demo",
    proof: "144 module tests | 99.86% pass | 6 frozen laws | OpenAI/Anthropic/Gemini agnostic",
  },
  {
    id: "Orvyn-v2",
    tag: "ORCHESTRATOR",
    name: "Orvyn-v2",
    blurb: "The orchestrator owns reasoning, agents are just backends.",
    problem: "Need to choose the right AI model for each task.",
    io: ["Input: task", "Output: best-fit agent"],
    stack: ["TypeScript", "Next.js", "Orchestrator logic"],
    githubUrl: "https://github.com/Zoro-01x/Orvyn-v2",
    status: "Live Demo",
    proof: "AI-OS thesis | Real README | Replaceable agent architecture",
  },
];
```

**Step 3: Update the SystemsPage component to use the new list and update metadata.**
```typescript
export const metadata = {
  title: "Systems — Real code, not demos",
  description:
    "Four live systems that show real work: this site, a supervisor layer, a governance kernel, and an orchestrator vision. All built in public with an open paper trail.",
};

export default function SystemsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-wider text-accent">
          /systems
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Systems — Real code, not demos
        </h1>
        <p className="mt-3 text-sm text-muted sm:text-base">
          This is <span className="text-foreground\">10× stronger than \"I know React.\"</span>{\" \"}
          Four systems that solve real problems, built and documented with AI.
          Not screenshots — running software with an open paper trail.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {systemsList.map((s) => (
          <SystemCard key={s.id} system={s} />
        ))}
      </div>
    </main>
  );
}
```

**Step 4: Run `npm run build` locally to ensure no TypeScript or build errors.**

**Step 5: Commit** (local-only).
```bash
git add src/app/systems/page.tsx src/components/system-card.tsx
git commit -m "feat(systems): replace placeholder with 4 public repo cards"
```

### Task 3: Add redirect from /projects to /systems

**Objective:** Capture SEO for "projects" while preserving brand URL `/systems`.

**Files:**
- Create: `src/app/projects/page.tsx`

**Step 1: Create the file with a redirect.**
```typescript
import { redirect } from "next/navigation";

export default function ProjectsPage() {
  redirect("/systems");
}
```

**Step 2: (Optional) Add a metadata title for consistency, though redirect will bypass rendering.**
```typescript
export const metadata = {
  title: "Projects — redirects to Systems",
};
```

**Step 3: Run `npm run build` to ensure the new file doesn't break the build.**

**Step 4: Commit** (local-only).
```bash
git add src/app/projects/page.tsx
git commit -m "feat(routing): add /projects redirect to /systems"
```

### Task 4: Verify locally (build + preview)

**Objective:** Ensure the new `/systems` page renders correctly and the `/projects` redirect works.

**Files:** None (verification only).

**Step 1: Run `npm run dev` (if not already running) and verify:**
- `http://localhost:3000/systems` shows the 4 cards with correct business/tech lines.
- Card tags show as "META-PROOF", "SUPERVISOR", "ENGINEERING", "ORCHESTRATOR".
- Each card links to the correct GitHub URL (and live URL for samc3-site).
- The samc3-site card shows "Tested on local + hosted before push" as proof.
- `http://localhost:3000/projects` redirects to `/systems` (URL changes, content matches systems page).

**Step 2: Run `npm run build` and verify output is clean.**
```bash
npm run build
```

**Step 3: Commit verification note** (optional).
```bash
git commit --allow-empty -m "verify: local build and preview successful"
```

---

## Tests / Validation

- After Task 1: `npm run build` passes; SystemCard accepts external links without TS errors.
- After Task 2: `npm run build` passes; `/systems` page shows 4 cards with correct data.
- After Task 3: `npm run build` passes; `/projects` redirects to `/systems`.
- After Task 4: Local preview shows cards, links work, redirect works.

## Risks / Tradeoffs / Open Questions

- **Risk:** Changing the System type to `tag: string` could break if any other part of the codebase expects the union. We replaced the whole list in `/systems`, and no other files use `systemList` (we checked via search). Safe.
- **Tradeoff:** We lose the original three placeholder systems (Surat Textile OS, AI Handover Kit, Founder's OS). Per user request, that's intentional — they want `/systems` to be premium positioning.
- **Open Question:** Should we keep the original three cards archived somewhere (e.g. in a `/legacy` page)? Not requested; we can add later if needed.

---

## Execution Handoff

**Plan complete and saved. Ready to execute using subagent-driven-development — I'll dispatch a fresh subagent per task with two-stage review (spec compliance then code quality). Shall I proceed?**

(Note: Since the user invoked the plan skill earlier and we are now in planning mode for this new task, we must wait for their "go" before executing.)