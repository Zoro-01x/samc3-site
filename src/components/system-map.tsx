"use client";

import { useState } from "react";

type Node = {
  name: string;
  type: string;
  desc: string;
  children?: Node[];
};

const tree: Node = {
  name: "samc3-site",
  type: "root",
  desc: "This site. Docs-as-code. Every layer documented in ARCHITECTURE.md.",
  children: [
    {
      name: "app/",
      type: "nextjs",
      desc: "App Router pages. Each route is a real, documented system.",
      children: [
        {
          name: "page.tsx",
          type: "page",
          desc: "Homepage — hero + interactive system map + live build log.",
        },
        {
          name: "systems/",
          type: "route",
          desc: "/systems — 3 live demos: Textile OS, Handover Kit, Founder's OS.",
        },
        {
          name: "blueprints/",
          type: "route",
          desc: "/blueprints — how I work. Version pinning, diff reading, rollbacks.",
        },
        {
          name: "lab/",
          type: "route",
          desc: "/lab — 5-hr builds with time and cost logged. Ship speed proof.",
        },
        {
          name: "architecture/",
          type: "route",
          desc: "/architecture — renders this very ARCHITECTURE.md, live.",
        },
      ],
    },
    {
      name: "components/",
      type: "ui",
      desc: "UI pieces. Hero, system map, cards, markdown viewer.",
      children: [
        { name: "nav", type: "ui", desc: "Sticky top nav, active-state aware." },
        { name: "system-map", type: "ui", desc: "This tree. Click nodes to inspect." },
        { name: "commit-feed", type: "ui", desc: "Build log. Streams GitHub commits." },
      ],
    },
    {
      name: "docs/",
      type: "markdown",
      desc: "Docs-as-code. The proof layer.",
      children: [
        {
          name: "ARCHITECTURE.md",
          type: "md",
          desc: "System template for rapid codebase comprehension.",
        },
        {
          name: "DECISIONS.md",
          type: "md",
          desc: "Every decision, when and why. No silent rework.",
        },
        {
          name: "FLOW.md",
          type: "md",
          desc: "How work actually moves through the system.",
        },
      ],
    },
    {
      name: "infra/",
      type: "deploy",
      desc: "Deployment & plumbing.",
      children: [
        {
          name: "vercel",
          type: "deploy",
          desc: "Edge deploy. Push to main, live in ~30s.",
        },
        {
          name: "github",
          type: "deploy",
          desc: "Public repo. Zoro-01x. Paper trail is the product.",
        },
      ],
    },
  ],
};

export function SystemMap() {
  const [selected, setSelected] = useState<Node>(tree);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      {/* Tree */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <span className="font-mono text-xs text-muted-2">~/systems/map</span>
          <span className="font-mono text-xs text-accent">● interactive</span>
        </div>
        <TreeNodes nodes={tree.children ?? []} onSelect={setSelected} depth={0} />
      </div>

      {/* Inspector */}
      <div className="flex flex-col rounded-xl border border-border bg-surface p-5">
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <span className="font-mono text-xs text-muted-2">inspector</span>
          <span className="font-mono text-xs text-accent">● live</span>
        </div>
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
              {selected.type}
            </span>
            <span className="break-all font-mono text-sm font-semibold">
              {selected.name}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted">{selected.desc}</p>
        </div>

        <div className="mt-6 border-t border-border pt-4 font-mono text-xs text-muted-2">
          <p className="mb-1">
            <span className="text-accent">$</span> cat ARCHITECTURE.md
          </p>
          <p className="mb-1">→ rendered on /architecture</p>
          <p className="mb-1">
            <span className="text-accent">$</span> git log --oneline
          </p>
          <p>→ build log below, streaming from GitHub</p>
        </div>
      </div>
    </div>
  );
}

function TreeNodes({
  nodes,
  onSelect,
  depth,
}: {
  nodes: Node[];
  onSelect: (n: Node) => void;
  depth: number;
}) {
  return (
    <div className={`space-y-1 ${depth > 0 ? "ml-4 border-l border-border pl-3" : ""}`}>
      {nodes.map((node) => (
        <div key={node.name}>
          <button
            onClick={() => onSelect(node)}
            className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-surface-2"
          >
            <TypeIcon type={node.type} />
            <span className="font-mono text-sm text-foreground/90 transition-colors group-hover:text-accent">
              {node.name}
            </span>
            {node.children && (
              <span className="ml-auto font-mono text-xs text-muted-2 opacity-0 transition-opacity group-hover:opacity-100">
                {node.children.length} ↓
              </span>
            )}
          </button>
          {node.children && (
            <TreeNodes nodes={node.children} onSelect={onSelect} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

function TypeIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    nextjs: "text-accent",
    page: "text-accent",
    route: "text-cyan-400",
    ui: "text-emerald-300",
    markdown: "text-slate-400",
    md: "text-slate-400",
    deploy: "text-amber-400",
    root: "text-accent",
  };
  const color = colors[type] ?? "text-muted-2";
  return (
    <span className={`font-mono text-xs ${color}`}>
      {type === "md" || type === "markdown" ? "M↓" : type === "root" ? "Σ" : "⟨/⟩"}
    </span>
  );
}
