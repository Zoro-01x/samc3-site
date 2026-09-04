import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Sam",
  description:
    "Talk to Sam about building AI software for your business. Instagram DM or WhatsApp — whichever you prefer.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent"
      >
        <span>←</span>
        <span>back</span>
      </Link>

      <div className="mt-8">
        <span className="text-xs uppercase tracking-wider text-accent">
          contact
        </span>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Let&apos;s talk about what you need built.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          One message is enough. Tell me what your business is doing manually
          right now — Excel, WhatsApp, paper, a website that doesn&apos;t sell —
          and I&apos;ll tell you if I can turn it into software that runs
          itself.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href="https://ig.me/m/x0__sam__0x?text=Hi%20Sam%2C%20I%20found%20your%20site%20and%20I%27d%20like%20to%20talk%20about%20building%20something%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-[0_0_30px_rgba(74,124,95,0.12)]"
        >
          <span className="text-xs text-muted-2">preferred</span>
          <span className="mt-2 text-lg font-semibold">DM on Instagram</span>
          <span className="mt-1 text-sm text-accent group-hover:underline">
            @x0__sam__0x →
          </span>
          <p className="mt-3 text-sm text-muted-2">
            Opens a message straight to me — edit it and hit send. I usually
            reply within a few hours.
          </p>
        </a>

        <a
          href="https://wa.me/919999999999?text=Hi%20Sam%2C%20I%20found%20your%20site%20and%20I%27d%20like%20to%20talk%20about%20building%20something%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-[0_0_30px_rgba(74,124,95,0.12)]"
        >
          <span className="text-xs text-muted-2">for a longer brief</span>
          <span className="mt-2 text-lg font-semibold">WhatsApp me</span>
          <span className="mt-1 text-sm text-accent group-hover:underline">
            +91 99999 99999 →
          </span>
          <p className="mt-3 text-sm text-muted-2">
            Opens WhatsApp with the message pre-typed — edit and send. I usually
            reply within a few hours.
          </p>
        </a>
      </div>

      <div className="mt-12 rounded-xl border border-border bg-surface/50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-2">
          What I&apos;d love to know
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/90">
          <li>
            <span className="text-accent">1.</span> What does your
            business do today, in one line?
          </li>
          <li>
            <span className="text-accent">2.</span> What&apos;s the
            one task you wish ran itself?
          </li>
          <li>
            <span className="text-accent">3.</span> Have you tried
            software for this before? What broke?
          </li>
        </ul>
      </div>
    </main>
  );
}
