import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What I Build — Sam",
  description:
    "Three things I do for Surat businesses: AI websites that answer leads, business software that replaces manual work, AI tools that use your own data. Plain English examples. WhatsApp me when ready.",
};

type Example = {
  title: string;
  body: string;
};

type Section = {
  id: string;
  number: string;
  title: string;
  pitch: string;
  examples: Example[];
  cta: string;
};

const sections: Section[] = [
  {
    id: "websites",
    number: "01",
    title: "AI Websites That Do The Work",
    pitch:
      "Not just a good-looking site. A website that answers your leads, books your calls, and sells while you sleep. Built for Surat businesses that get inquiries on WhatsApp and Instagram, not email.",
    examples: [
      {
        title: "Inquiry form → auto-reply on WhatsApp",
        body: "Someone fills the contact form at 11pm. They get an instant WhatsApp from your business number saying 'we'll call you tomorrow at 10am' — with a prefilled link to book a slot. You wake up to a booked calendar, not a dead inbox.",
      },
      {
        title: "Stock availability chatbot",
        body: "Textile shop owner gets 40 messages a day asking 'is this design available in blue, 100 meters?' A chatbot on the site answers the 35 that are yes/no from a live sheet, and forwards the 5 that need a real human.",
      },
      {
        title: "Multi-language product pages",
        body: "Diamond trader needs the same product to show in English, Hindi, and Gujarati. One backend, three URLs. Google indexes all three. International buyers find you without you paying for ads.",
      },
    ],
    cta: "I want this — let's talk",
  },
  {
    id: "software",
    number: "02",
    title: "Business Software That Replaces Manual Work",
    pitch:
      "You tell me the messy work your team does daily on Excel, WhatsApp, paper, or a software that doesn't fit. I turn it into one-click software for your team. No training needed.",
    examples: [
      {
        title: "Excel stock sheet → web app",
        body: "Your manager spends 2 hours every morning copying yesterday's sales from 3 Excel files into a master sheet. I build a one-page web app where each shop enters their numbers — and the master sheet updates itself.",
      },
      {
        title: "WhatsApp forward → one-click dispatch",
        body: "Your dispatch team reads 80 forwarded messages a day, copies addresses into a notebook, then types them into a courier portal. I build a WhatsApp bot: forward the message, get a courier label back in 30 seconds.",
      },
      {
        title: "Order tracking dashboard",
        body: "Customers keep asking 'mera order kab aayega?' Your team keeps forwarding the same screenshot. I build a customer-facing link: they enter their order number, see live status, no WhatsApp needed.",
      },
    ],
    cta: "I have manual work — show me how",
  },
  {
    id: "data-tools",
    number: "03",
    title: "AI That Uses Your Own Data",
    pitch:
      "You have data, chats, notes, but no system. I build AI tools that turn it into content, reports, or auto-replies — without ever sending your data to a third party you don't control.",
    examples: [
      {
        title: "Customer chats → auto-tagging",
        body: "You have 6 months of WhatsApp chats with customers. Hidden inside: which designs sell, which complaints repeat, which lead sources convert. I build a tool that reads the chats and gives you a one-page report every Friday.",
      },
      {
        title: "PDFs and price lists → searchable knowledge base",
        body: "Your sales team wastes 20 minutes per call searching through old PDFs for 'the latest rate card for export quality.' I build a search box where they type a question in plain English and get the answer from your own files.",
      },
      {
        title: "Photo catalogue → auto-written descriptions",
        body: "You shoot 50 new fabric designs a week. Writing descriptions for each takes a day. I build a tool that looks at the photo and your existing catalog, then drafts a description in your style. You review and publish.",
      },
    ],
    cta: "I have data — let's put it to use",
  },
];

export default function WorkPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <span className="text-xs uppercase tracking-wider text-accent">
          /work
        </span>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          What I build for Surat businesses.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          Three kinds of software. Each one is a real thing I&apos;ve built
          for someone, not a slide-deck idea. Tap any section to see what it
          looks like in practice, then message me on WhatsApp when you see
          yours.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-20">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-20 border-b border-border pb-20 last:border-b-0"
          >
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-sm text-accent">
                {section.number}
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {section.title}
              </h2>
            </div>

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {section.pitch}
            </p>

            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              {section.examples.map((ex) => (
                <div
                  key={ex.title}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="text-sm font-semibold leading-snug text-foreground">
                    {ex.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {ex.body}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dim"
            >
              {section.cta} <span aria-hidden="true">→</span>
            </Link>
          </section>
        ))}
      </div>

      {/* Closing CTA */}
      <div className="mt-20 rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Not sure which one fits?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
          Tell me what your business is doing manually today. I&apos;ll tell
          you which of these three is the right starting point — or if none
          of them are.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dim"
        >
          Start the conversation <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
