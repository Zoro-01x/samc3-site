import { SystemCard, systemList } from "@/components/system-card";

export const metadata = {
  title: "Systems — Sam",
  description:
    "Three live demos: Surat Textile OS, AI Handover Kit, Founder's OS. Built and documented with AI in seven days.",
};

export default function SystemsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-wider text-accent">
          /systems
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Three live demos. The proof.
        </h1>
        <p className="mt-3 text-sm text-muted sm:text-base">
          This is <span className="text-foreground">10× stronger than "I know React."</span>{" "}
          Three systems that solve real problems, built and documented with AI
          in seven days. Not screenshots — running software with an open paper
          trail.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {systemList.map((s) => (
          <SystemCard key={s.id} system={s} />
        ))}
      </div>
    </main>
  );
}
