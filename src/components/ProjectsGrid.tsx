import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Calendar, Loader2, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGitHubRepos, getRelativeTime, GitHubRepo } from "@/lib/github";
import { Link } from "react-router-dom";

const CATEGORIES = ["All", "Web Dev", "Machine Learning", "Blockchain", "Other"];

const ProjectsGrid = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getGitHubRepos();
        setRepos(data);
      } catch (err) {
        setError("Failed to load live projects. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Helper to categorize repos dynamically based on topics or languages
  const getCategory = (repo: GitHubRepo) => {
    const topics = repo.topics?.join(" ").toLowerCase() || "";
    const lang = repo.language?.toLowerCase() || "";
    
    if (topics.includes("machine-learning") || topics.includes("ai") || lang === "jupyter notebook") return "Machine Learning";
    if (topics.includes("blockchain") || topics.includes("web3") || lang === "solidity") return "Blockchain";
    if (topics.includes("react") || topics.includes("next") || topics.includes("web") || lang === "typescript" || lang === "javascript" || lang === "css" || lang === "html") return "Web Dev";
    return "Other";
  };

  const filteredRepos = repos.filter(repo => {
    if (activeCategory === "All") return true;
    return getCategory(repo) === activeCategory;
  });

  return (
    <section id="projects" className="py-20 px-4" data-cursor="project">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FolderGit2 className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground">
                <span className="text-primary">~/</span>live-projects
              </h2>
            </div>
            <p className="text-muted-foreground font-mono ml-11 text-sm md:text-base">Automatically synced with GitHub.</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs rounded-full transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(185_100%_50%_/_0.3)]" 
                    : "border-primary/20 hover:border-primary/50 text-foreground/70"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground font-mono animate-pulse">Fetching live repositories...</p>
          </div>
        ) : error ? (
           <div className="text-center py-20 border border-destructive/20 bg-destructive/5 rounded-xl">
             <p className="text-destructive font-mono">{error}</p>
           </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo, idx) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.5) }}
                  className="glass-panel rounded-xl p-6 flex flex-col h-full group magnetic-hover relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-mono text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {repo.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow">
                    {repo.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {repo.language && (
                      <span className="text-xs font-mono px-2 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics?.slice(0, 2).map((topic) => (
                      <span key={topic} className="text-xs font-mono px-2 py-1 rounded bg-accent/10 text-accent border border-accent/20">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                      <span className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Star className="w-4 h-4" /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 hover:text-accent transition-colors">
                        <GitFork className="w-4 h-4" /> {repo.forks_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground/60 font-mono">
                      <Calendar className="w-3 h-3" />
                      Updated {getRelativeTime(repo.updated_at)}
                    </div>
                  </div>

                  {/* View Details Link Overlay */}
                  <Link 
                    to={`/projects/${repo.name}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View details for ${repo.name}`}
                  />
                  
                  {/* Glass shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredRepos.length === 0 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 font-mono text-muted-foreground">
                No active projects found in this category.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;
