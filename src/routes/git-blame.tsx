import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/git-blame")({
  head: () => ({
    meta: [{ title: "Git Blame | AARRKKAA" }, { name: "robots", content: "noindex" }],
  }),
  component: GitBlameEasterEgg,
});

const FAKE_COMMITS = [
  "fix: typo that broke the space-time continuum",
  "chore: I don't know why this works, DO NOT TOUCH IT",
  "feat: changed button from red to slightly darker red (took 4 hours)",
  "hotfix: production is down, crying in the bathroom",
  "refactor: removed 10,000 lines of code, hope nobody needed that",
  "fix: it works on my machine ¯\\_(ツ)_/¯",
  "style: trying to make it look less like a 90s website",
  "docs: wrote documentation that nobody will ever read",
  "test: testing in production like a real engineer",
  "chore: giving up for the day, see you on Monday",
  "fix: oops",
  "fix: oops again",
  "fix: PLEASE WORK",
  "feat: added AI to do my job for me",
];

const AUTHORS = ["srinivas_dev", "intern_04", "ceo_override", "ghost_in_the_machine", "coffee_machine"];

function GitBlameEasterEgg() {
  const [commits, setCommits] = useState<{ id: string; author: string; msg: string; time: string }[]>([]);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setCommits((prev) => {
        const newCommit = {
          id: Math.random().toString(16).slice(2, 9),
          author: AUTHORS[Math.floor(Math.random() * AUTHORS.length)],
          msg: FAKE_COMMITS[Math.floor(Math.random() * FAKE_COMMITS.length)],
          time: `${count} seconds ago`,
        };
        return [newCommit, ...prev].slice(0, 50); // Keep last 50
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono p-4 sm:p-8 flex flex-col">
      <header className="mb-8 border-b border-[#30363d] pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#58a6ff]">git blame ./src/everything.tsx</h1>
          <p className="text-sm text-[#8b949e]">Tracking historical disasters since 2024</p>
        </div>
        <div className="text-xs text-[#8b949e] animate-pulse">Live Feed...</div>
      </header>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1117] pointer-events-none z-10 top-[80%]" />
        
        <div className="space-y-2">
          {commits.length === 0 ? (
            <div className="text-[#8b949e]">Analyzing blame graph...</div>
          ) : (
            commits.map((c, i) => (
              <div 
                key={c.id + i} 
                className="flex items-start gap-4 text-sm hover:bg-[#161b22] p-2 rounded transition-colors animate-in slide-in-from-top-2 fade-in duration-300"
              >
                <div className="text-[#e3b341] shrink-0 w-16">{c.id}</div>
                <div className="text-[#7ee787] shrink-0 w-32 truncate">{c.author}</div>
                <div className="flex-1 text-[#c9d1d9] break-all">{c.msg}</div>
                <div className="text-[#8b949e] shrink-0 text-right w-32 hidden sm:block">{c.time}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
