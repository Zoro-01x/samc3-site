import Link from "next/link";

const columns = [
  {
    title: "Discover",
    links: [
      { href: "/", label: "Home" },
      { href: "/work", label: "What I Build" },
      { href: "/systems", label: "Systems (proof)" },
      { href: "/lab", label: "Lab (speed)" },
    ],
  },
  {
    title: "Build",
    links: [
      { href: "/contact", label: "Contact" },
      {
        href: "https://github.com/Zoro-01x",
        label: "GitHub",
        external: true,
      },
      { href: "/architecture", label: "ARCHITECTURE.md" },
      { href: "/blueprints", label: "How I work" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md border border-accent/40 bg-accent/10 text-xs font-bold text-accent">
                S
              </span>
              <span className="text-sm font-semibold tracking-tight">Sam</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-2">
              AI Systems Architect. Building software for Surat businesses —
              textile, diamond, manufacturing.
            </p>
            <p className="mt-3 text-[11px] text-muted-2">
              10am – 9pm IST · Mon – Sat
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-2">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-[11px] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Sam — AI Systems Architect, Surat</span>
          <span>AFP — Architecture First, Paper Trail Always</span>
        </div>
      </div>
    </footer>
  );
}
