export type Commit = {
  sha: string;
  message: string;
  date: string;
  author: string;
  tag: "feat" | "fix" | "docs" | "chore" | "style" | "other";
};

const OWNER = "Zoro-01x";
const REPO = "samc3-site";
const PER_PAGE = 8;

function classify(prefix: string): Commit["tag"] {
  const m = prefix.toLowerCase();
  if (m.startsWith("feat")) return "feat";
  if (m.startsWith("fix")) return "fix";
  if (m.startsWith("docs")) return "docs";
  if (m.startsWith("chore")) return "chore";
  if (m.startsWith("style")) return "style";
  return "other";
}

export async function fetchCommits(): Promise<Commit[]> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=${PER_PAGE}`;
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 60 }, // ISR: re-fetch at most every 60s
  });
  if (!res.ok) {
    // Graceful: public repo, but be safe if GitHub hiccups / rate-limits.
    return [];
  }
  const data = (await res.json()) as Array<{
    sha: string;
    commit: { message: string; author: { name: string; date: string } };
  }>;
  return data.map((c) => {
    const firstLine = c.commit.message.split("\n")[0];
    return {
      sha: c.sha.slice(0, 7),
      message: firstLine,
      date: c.commit.author.date,
      author: c.commit.author.name,
      tag: classify(firstLine.split(":")[0] ?? firstLine),
    };
  });
}
