import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Sam",
  description:
    "Talk to Sam about building AI software for your business. Instagram DM or WhatsApp — whichever you prefer.",
};

const steps = [
  {
    n: "1",
    title: "You message me",
    body: "Send a quick note on Instagram or WhatsApp. One sentence about your business is enough.",
    time: "2 min for you",
  },
  {
    n: "2",
    title: "I reply within a few hours",
    body: "Usually under 6 hours during working hours. I ask 2–3 short questions to understand what you're doing manually today.",
    time: "6 hrs max",
  },
  {
    n: "3",
    title: "We hop on a 15-min WhatsApp call",
    body: "If it makes sense to talk, I propose a time. No slide deck, no pitch — just listening to what you need.",
    time: "15 min",
  },
  {
    n: "4",
    title: "I send a one-page scope",
    body: "Within 48 hours of the call, you get a single page: what I'd build, rough cost, rough timeline. No commitment yet.",
    time: "48 hrs",
  },
];

const faqs = [
  {
    q: "Do you take payment in INR?",
    a: "Yes. UPI, bank transfer (NEFT/RTGS), or cash. For larger projects I can split into 3 milestones: 30% upfront, 40% at the demo, 30% on go-live.",
  },
  {
    q: "What if I just need a website, not AI?",
    a: "That's fine. About a third of my work is plain business websites with no AI. The same 15-min WhatsApp call works — I'll tell you honestly if you need AI or not.",
  },
  {
    q: "Do you only work with Surat businesses?",
    a: "Most of my clients are in Surat or South Gujarat because that's where I am. I work with anyone in India on WhatsApp — and I have a few international clients I meet over Google Meet.",
  },
  {
    q: "What if my business is too small?",
    a: "If you're a one-person textile shop, the first conversation is still free. I'll either give you one thing you can do this week, or tell you I can't help and point you to someone who can.",
  },
];

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
          right now — Excel, WhatsApp, paper, a website that doesn&apos;t sell — and
          I&apos;ll tell you if I can turn it into software that runs itself.
        </p>
      </div>

      {/* Two main channels */}
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
          href="https://wa.me/918141429433?text=Hi%20Sam%2C%20I%20found%20your%20site%20and%20I%27d%20like%20to%20talk%20about%20building%20something%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-[0_0_30px_rgba(74,124,95,0.12)]"
        >
          <span className="text-xs text-muted-2">for a longer brief</span>
          <span className="mt-2 text-lg font-semibold">WhatsApp me</span>
          <span className="mt-1 text-sm text-accent group-hover:underline">
            +91 81414 29433 →
          </span>
          <p className="mt-3 text-sm text-muted-2">
            Opens WhatsApp with the message pre-typed — edit and send. I
            usually reply within a few hours.
          </p>
        </a>
      </div>

      {/* What happens next */}
      <div className="mt-16">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          What happens after you message me
        </h2>
        <p className="mt-2 text-sm text-muted">
          No mystery. No salesperson. Just four clear steps.
        </p>

        <ol className="mt-6 space-y-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex gap-4 rounded-xl border border-border bg-surface/50 p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent">
                {s.n}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold">{s.title}</h3>
                  <span className="text-[11px] text-muted-2">{s.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Working hours */}
      <div className="mt-12 rounded-xl border border-border bg-surface/50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold">Working hours</span>
          <span className="text-xs text-muted-2">
            10am – 9pm IST · Monday – Saturday
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-2">
          I usually reply within 6 hours during working hours. Anything that
          comes in overnight gets a reply by noon the next day.
        </p>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          Common questions
        </h2>

        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border bg-surface/50 open:bg-surface"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-semibold marker:hidden">
                <span>{f.q}</span>
                <span className="text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Original "what I'd love to know" — kept for context */}
      <div className="mt-12 rounded-xl border border-border bg-surface/50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-2">
          What I&apos;d love to know
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/90">
          <li>
            <span className="text-accent">1.</span> What does your business do
            today, in one line?
          </li>
          <li>
            <span className="text-accent">2.</span> What&apos;s the one task you
            wish ran itself?
          </li>
          <li>
            <span className="text-accent">3.</span> Have you tried software for
            this before? What broke?
          </li>
        </ul>
      </div>
    </main>
  );
}
