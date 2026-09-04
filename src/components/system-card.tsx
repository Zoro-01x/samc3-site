import Link from "next/link";

export type System = {
  id: string;
  tag: "A" | "B" | "C";
  name: string;
  blurb: string;
  status: "Live Demo" | "Building" | "Coming Soon";
  problem: string;
  io: [string, string];
  stack: string[];
  href: string;
  proof: string;
};

export const systemList: System[] = [
  {
    id: "textile",
    tag: "A",
    name: "Surat Textile OS",
    blurb:
      "Surat SME pain, solved. Upload a catalog → get an auto website + a WhatsApp bot that sells.",
    status: "Building",
    problem:
      "Textile shops in Surat run on WhatsApp and memory. No catalog, no inventory, no web presence.",
    io: ["upload: catalog.xlsx", "out: site + WhatsApp bot"],
    stack: ["Next.js", "Supabase", "WhatsApp API", "Claude"],
    href: "/contact",
    proof: "A real shop's catalog becomes a live storefront. This is Surat SME pain turned into a product.",
  },
  {
    id: "handover",
    tag: "B",
    name: "AI Handover Kit",
    blurb:
      "Point at a GitHub repo → get DECISIONS.md + FLOW.md + BUG.md, generated. The thing from that reel, made real.",
    status: "Live Demo",
    problem:
      "Every codebase is a black box. Onboarding means reading 10k lines to find what changed and why.",
    io: ["input: github repo", "out: 3 documented markdown files"],
    stack: ["GitHub API", "Next.js", "Vercel AI SDK", "Claude"],
    href: "/contact",
    proof: "Paste a repo URL. Watch it turn into a paper trail in seconds. This is the one devs share.",
  },
  {
    id: "founders",
    tag: "C",
    name: "Founder's OS",
    blurb:
      "Drop in an idea → get ARCHITECTURE.md + CONSTRAINTS.md + a task breakdown. Architect brain, as a product.",
    status: "Coming Soon",
    problem:
      "Founders start with a sentence and a hope. No architecture, no constraints, no sequenced plan.",
    io: ["input: idea", "out: architecture + tasks"],
    stack: ["Next.js", "Supabase", "Vercel AI SDK", "Claude"],
    href: "/contact",
    proof: "A founder's idea becomes a buildable architecture in one prompt. Management + architect in a box.",
  },
];

export function SystemCard({ system }: { system: System }) {
  const statusColor =
    system.status === "Live Demo"
      ? "bg-accent/10 text-accent border-accent/40"
      : system.status === "Building"
        ? "bg-amber-100 text-amber-800 border-amber-300"
        : "bg-muted/10 text-muted border-border";

  return (
    <Link
      href={system.href}
      className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_rgba(74,124,95,0.10)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-3xl font-bold text-accent/30 transition-colors group-hover:text-accent/60">
          {system.tag}
        </span>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] ${statusColor}`}
        >
          {system.status}
        </span>
      </div>

      <h3 className="text-lg font-bold tracking-tight">{system.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {system.blurb}
      </p>

      <div className="mt-4 rounded-lg border border-border bg-bg/60 p-3 text-[11px] leading-relaxed">
        <p className="text-muted-2">
          <span className="text-accent">in:</span> {system.io[0]}
        </p>
        <p className="text-muted-2">
          <span className="text-accent">out:</span> {system.io[1]}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {system.stack.map((s) => (
          <span
            key={s}
            className="rounded border border-border bg-surface-2 px-2 py-0.5 text-[10px] text-muted"
          >
            {s}
          </span>
        ))}
      </div>

      <p className="mt-4 text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
        talk to sam →
      </p>
    </Link>
  );
}
