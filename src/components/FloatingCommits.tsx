import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Commit {
  id: number;
  message: string;
  hash: string;
  x: number;
  delay: number;
}

const commitMessages = [
  "fix: resolved async race condition",
  "feat: added dark mode toggle",
  "refactor: optimized 3D rendering",
  "chore: update dependencies",
  "docs: updated README.md",
  "style: polished neon glows",
  "perf: reduced bundle size by 15%",
  "test: added E2E tests for timeline",
];

const generateHash = () => Math.random().toString(16).substring(2, 9);

const FloatingCommits = () => {
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    // Generate a new commit every 8-15 seconds
    const interval = setInterval(() => {
      const newCommit: Commit = {
        id: Date.now(),
        message: commitMessages[Math.floor(Math.random() * commitMessages.length)],
        hash: generateHash(),
        x: Math.random() * 80 + 10, // 10% to 90% of screen width
        delay: 0,
      };

      setCommits((prev) => [...prev, newCommit]);

      // Remove the commit after its animation finishes (approx 15 seconds)
      setTimeout(() => {
        setCommits((prev) => prev.filter((c) => c.id !== newCommit.id));
      }, 15000);
    }, 10000 + Math.random() * 8000);

    return () => clearInterval(interval);
  }, []);

  // Don't show on mobile to prevent clutter
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {commits.map((commit) => (
          <motion.div
            key={commit.id}
            initial={{ opacity: 0, y: "100vh", scale: 0.8 }}
            animate={{ opacity: [0, 1, 0.8, 0], y: "-20vh", scale: 1 }}
            transition={{
              duration: 15,
              ease: "linear",
            }}
            className="absolute flex items-center gap-2 bg-card/40 backdrop-blur-md border border-border/40 rounded-full px-3 py-1.5 shadow-sm"
            style={{ left: `${commit.x}%` }}
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-secondary font-mono text-[10px] opacity-70">
              {commit.hash}
            </span>
            <span className="text-muted-foreground font-mono text-xs">
              {commit.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingCommits;
