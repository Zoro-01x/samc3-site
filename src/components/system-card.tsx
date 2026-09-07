import Link from "next/link";

export type System = {
  id: string;
  tag: string;
  name: string;
  displayName?: string;
  blurb: string;
  status: "Live Demo" | "Building" | "Coming Soon";
  problem: string;
  io: [string, string];
  stack: string[];
  href?: string;
  githubUrl?: string;
  liveUrl?: string;
  proof?: string;
};

export function SystemCard({ system }: { system: System }) {
  const statusColor =
    system.status === "Live Demo"
      ? "bg-accent/10 text-accent border-accent/40"
      : system.status === "Building"
        ? "bg-amber-100 text-amber-800 border-amber-300"
        : "bg-muted/10 text-muted border-border";

  const isExternal = !!(system.githubUrl || system.liveUrl);
  const primaryHref = system.githubUrl ?? system.liveUrl ?? system.href ?? "#";

  const cardInner = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-accent/60 transition-colors group-hover:text-accent">
          {system.tag}
        </span>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] ${statusColor}`}
        >
          {system.status}
        </span>
      </div>

      <h3 className="text-lg font-bold tracking-tight">
        {system.displayName ?? system.name}
      </h3>
      {system.displayName && (
        <p className="mt-0.5 font-mono text-[11px] text-muted-2/70">
          {system.name}
        </p>
      )}
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

      {isExternal && system.githubUrl && (
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-3 text-[11px]">
          <a
            href={system.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg/60 px-2.5 py-1 text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
          {system.liveUrl && (
            <a
              href={system.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent px-2.5 py-1 text-white transition-colors hover:bg-accent-dim"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              Live
            </a>
          )}
        </div>
      )}

      {!isExternal && (
        <p className="mt-4 text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
          talk to sam →
        </p>
      )}
    </>
  );

  const cardClass =
    "group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_rgba(74,124,95,0.10)]";

  if (isExternal) {
    return (
      <div className={cardClass}>
        <div className="flex flex-1 flex-col">{cardInner}</div>
      </div>
    );
  }

  return (
    <Link href={system.href!} className={cardClass}>
      {cardInner}
    </Link>
  );
}
