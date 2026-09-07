import { SystemCard } from "@/components/system-card";
import { systemsList } from "@/lib/systems";

export const metadata = {
  title: "Systems — Real code, not demos",
  description:
    "Four live systems that show real work: this site, a supervisor layer, a governance kernel, and an orchestrator vision. All built in public with an open paper trail.",
};

export default function SystemsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-wider text-accent">
          /systems
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Systems — Real code, not demos
        </h1>
        <p className="mt-3 text-sm text-muted sm:text-base">
          This is{" "}
          <span className="text-foreground">
            10× stronger than "I know React."
          </span>{" "}
          Four systems that solve real problems, built and documented with AI.
          Not screenshots — running software with an open paper trail.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {systemsList.map((s) => (
          <SystemCard key={s.id} system={s} />
        ))}
      </div>
    </main>
  );
}
