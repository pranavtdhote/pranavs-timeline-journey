import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { getGitHubUser, getGitHubRepos } from "@/lib/github";
import { Loader2 } from "lucide-react";

interface CounterSpec {
  label: string;
  target: number;
  suffix?: string;
  icon: string;
}

const easeOutQuad = (t: number) => t * (2 - t);

const StatsCounters = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [counters, setCounters] = useState<CounterSpec[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [user, repos] = await Promise.all([getGitHubUser(), getGitHubRepos()]);
        
        let totalStars = 0;
        const languages = new Set<string>();

        repos.forEach(repo => {
          totalStars += repo.stargazers_count;
          if (repo.language) languages.add(repo.language);
        });

        const newCounters: CounterSpec[] = [
          { label: "Total Repositories", target: user.public_repos, icon: "📦" },
          { label: "Total Stars", target: totalStars, suffix: "+", icon: "⭐" },
          { label: "Followers", target: user.followers, icon: "👥" },
          { label: "Languages Used", target: languages.size, icon: "💻" },
        ];

        setCounters(newCounters);
        setValues(Array(newCounters.length).fill(0));
      } catch (error) {
        console.error("Failed to load GitHub stats", error);
        // Fallback counters
        const fallback = [
          { label: "Years Experience", target: 2, suffix: "+", icon: "⏱️" },
          { label: "Completed Projects", target: 15, suffix: "+", icon: "📦" },
          { label: "Certifications", target: 5, suffix: "+", icon: "🏆" },
          { label: "Connections", target: 300, suffix: "+", icon: "🤝" },
        ];
        setCounters(fallback);
        setValues(Array(fallback.length).fill(0));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!inView || loading || counters.length === 0) return;
    const duration = 1500;
    const start = performance.now();
    let raf: number;

    const frame = () => {
      const now = performance.now();
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutQuad(t);
      setValues(counters.map((c) => Math.round(c.target * eased)));
      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, loading, counters]);

  return (
    <section className="py-12 px-4" id="stats">
      <div className="container mx-auto max-w-6xl">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-10">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
              <p className="text-sm text-muted-foreground font-mono">Aggregating Global Stats...</p>
            </div>
          ) : (
            counters.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="p-6 text-center glass-panel rounded-2xl hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {c.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold font-mono text-neon group-hover:text-white transition-colors">
                    {values[i]}
                    <span className="text-primary text-2xl">{c.suffix ?? ""}</span>
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground mt-2 font-mono tracking-tight group-hover:text-primary-foreground/90 transition-colors">
                    {c.label}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default StatsCounters;
