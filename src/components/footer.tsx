import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="text-xs text-muted-2">
          <span className="font-semibold text-foreground">
            Sam
          </span>{" "}
          — AI Systems Architect, Surat
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-2">
          <a
            href="https://github.com/Zoro-01x"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <Link
            href="/architecture"
            className="transition-colors hover:text-foreground"
          >
            ARCHITECTURE.md
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
