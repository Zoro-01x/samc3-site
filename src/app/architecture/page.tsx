import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Read from repo root so this page truly renders the source of truth.
const ROOT = path.join(process.cwd(), "ARCHITECTURE.md");

export const metadata = {
  title: "Architecture — Sam",
  description: "This site's ARCHITECTURE.md, rendered live. Docs-as-code in action.",
};

export default function ArchitecturePage() {
  const raw = fs.readFileSync(ROOT, "utf-8");

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-14 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            /architecture
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            This site, documented. Live.
          </h1>
          <p className="mt-2 text-sm text-muted">
            You are reading the actual ARCHITECTURE.md that lives in the repo —
            rendered back at you. That&apos;s the point.
          </p>
        </div>
        <a
          href="https://github.com/Zoro-01x/samc3-site/blob/main/ARCHITECTURE.md"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          raw on github ↗
        </a>
      </div>

      <article className="prose prose-invert prose-emerald max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: (props) => (
              <h1 className="mt-0 border-b border-border pb-3 text-2xl font-bold" {...props} />
            ),
            h2: (props) => (
              <h2 className="mt-8 border-b border-border pb-2 text-xl font-bold" {...props} />
            ),
            h3: (props) => (
              <h3 className="mt-6 text-base font-bold text-accent" {...props} />
            ),
            code: (props) => (
              <code
                className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-accent"
                {...props}
              />
            ),
            pre: (props) => (
              <pre
                className="overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-sm leading-relaxed"
                {...props}
              />
            ),
            a: (props) => (
              <a className="text-accent hover:underline" {...props} />
            ),
            p: (props) => (
              <p className="my-4 text-[15px] leading-relaxed text-foreground/90" {...props} />
            ),
            li: (props) => (
              <li className="my-1 leading-relaxed text-foreground/90" {...props} />
            ),
            ul: (props) => (
              <ul className="my-4 list-disc space-y-1 pl-5" {...props} />
            ),
            ol: (props) => (
              <ol className="my-4 list-decimal space-y-1 pl-5" {...props} />
            ),
            blockquote: (props) => (
              <blockquote
                className="my-4 border-l-2 border-accent/50 bg-accent/5 px-4 py-2 text-sm text-muted"
                {...props}
              />
            ),
            table: (props) => (
              <div className="my-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm" {...props} />
              </div>
            ),
            th: (props) => (
              <th
                className="border border-border bg-surface-2 px-3 py-2 text-left font-mono text-xs text-accent"
                {...props}
              />
            ),
            td: (props) => (
              <td className="border border-border px-3 py-2 text-foreground/90" {...props} />
            ),
            input: ({ checked, ...props }) => (
              <input
                type="checkbox"
                checked={checked}
                disabled
                readOnly
                className="mr-2 accent-emerald-500"
                {...props}
              />
            ),
          }}
        >
          {raw}
        </ReactMarkdown>
      </article>
    </main>
  );
}
