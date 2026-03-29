import { useParams, useNavigate } from "react-router-dom";
import { getProjectBySlug } from "@/data/projectData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Star, GitFork, Clock, Network, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getGitHubRepos, getRepoReadme, GitHubRepo, getRelativeTime } from "@/lib/github";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Hardcoded fallback data if it exists
  const legacyProject = getProjectBySlug(slug || "");

  const [repo, setRepo] = useState<GitHubRepo | null>(null);
  const [readme, setReadme] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProjectData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        // 1. Fetch from cached repos
        const repos = await getGitHubRepos();
        const foundRepo = repos.find(r => r.name.toLowerCase() === slug.toLowerCase());
        
        if (foundRepo) {
          setRepo(foundRepo);
          // 2. Fetch README
          const readmeContent = await getRepoReadme(foundRepo.name);
          setReadme(readmeContent);
        } else if (!legacyProject) {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch project details", err);
        if (!legacyProject) setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [slug, legacyProject]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-mono animate-pulse">Cloning repository data...</p>
      </div>
    );
  }

  if (error || (!repo && !legacyProject)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center font-mono">
          <p className="text-6xl mb-4 text-destructive animate-pulse">404</p>
          <p className="text-muted-foreground mb-6">Repository not found on GitHub.</p>
          <Button onClick={() => navigate("/#projects")} variant="outline" className="font-mono">
            <ArrowLeft className="w-4 h-4 mr-2" />
            cd ../projects
          </Button>
        </div>
      </div>
    );
  }

  const displayTitle = repo?.name || legacyProject?.title || slug;
  const displayDesc = repo?.description || legacyProject?.description || "No description provided.";
  const displayUrl = repo?.html_url || legacyProject?.github || `https://github.com/pranavtdhote/${slug}`;
  const displayDemo = repo?.homepage || legacyProject?.demo;
  const displayIcon = legacyProject?.icon || <FileText />;

  // Aggregate tech stack
  const techStack = Array.from(new Set([
    ...(repo?.language ? [repo.language] : []),
    ...(repo?.topics || []),
    ...(legacyProject?.tech || [])
  ])).slice(0, 8); // Limit to 8 to avoid overflow

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Terminal-style header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            onClick={() => navigate("/#projects")}
            variant="ghost"
            size="sm"
            className="font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            cd ~/projects
          </Button>
          <span className="text-xs font-mono text-primary animate-pulse hidden md:block">
            {`~/projects/${displayTitle} █`}
          </span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Project hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 relative"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl glass-panel flex items-center justify-center text-5xl flex-shrink-0 shadow-glow">
              {displayIcon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-3 leading-tight tracking-tight">
                {displayTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-accent">
                {legacyProject?.period && <span>{legacyProject.period}</span>}
                {repo && (
                  <>
                    {legacyProject?.period && <span className="w-1 h-1 rounded-full bg-border" />}
                    <span className="flex items-center text-amber-400"><Star className="w-3.5 h-3.5 mr-1"/> {repo.stargazers_count}</span>
                    <span className="flex items-center text-blue-400"><GitFork className="w-3.5 h-3.5 mr-1"/> {repo.forks_count}</span>
                    <span className="flex items-center text-muted-foreground"><Clock className="w-3.5 h-3.5 mr-1"/> Updated: {getRelativeTime(repo.updated_at)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Links */}
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-glow font-mono transition-all hover:scale-105"
            >
              <a href={displayUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View Repository
              </a>
            </Button>
            {displayDemo && (
              <Button
                asChild
                variant="outline"
                className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent font-mono transition-all hover:scale-105"
              >
                <a href={displayDemo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Live Deployment
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Live README Markdown Viewer */}
            {readme ? (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-invert prose-pre:bg-card prose-pre:border prose-pre:border-border max-w-none glass-panel rounded-2xl p-6 md:p-8"
              >
                <div className="border-b border-border/50 pb-4 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-mono text-primary m-0">README.md</h2>
                </div>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}: any) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          {...props}
                          children={String(children).replace(/\n$/, '')}
                          style={vscDarkPlus as any}
                          language={match[1]}
                          PreTag="div"
                        />
                      ) : (
                        <code {...props} className={className}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {readme}
                </ReactMarkdown>
              </motion.section>
            ) : (
              // Fallback to Description and Features if no README is found
              <>
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-sm font-mono text-primary mb-4 flex items-center gap-2">
                    <span className="text-secondary">#</span> Overview
                  </h2>
                  <div className="glass-panel rounded-2xl p-6 md:p-8 text-lg text-muted-foreground leading-relaxed">
                    {displayDesc}
                  </div>
                </motion.section>

                {legacyProject?.features && legacyProject.features.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h2 className="text-sm font-mono text-primary mb-4 flex items-center gap-2">
                      <span className="text-accent">#</span> Core Features
                    </h2>
                    <div className="glass-panel rounded-2xl p-6 md:p-8">
                      <ul className="space-y-4">
                        {legacyProject.features.map((f, i) => (
                          <li key={i} className="flex gap-4 items-start text-muted-foreground group">
                            <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                            </div>
                            <span className="leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.section>
                )}
              </>
            )}
          </div>

          <div className="space-y-8 lg:sticky lg:top-24 h-fit">
            {/* Tech Stack Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel rounded-2xl p-6"
            >
              <h2 className="text-sm font-mono text-primary mb-6 flex items-center gap-2 border-b border-border/50 pb-4">
                <Network className="w-4 h-4" /> Tech Architecture
              </h2>
              <div className="flex flex-col gap-3 font-mono text-sm">
                {techStack.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors break-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-border flex-shrink-0" />
                    {t as string}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-border/50 flex flex-col gap-4">
                 <div className="text-xs text-muted-foreground font-mono">
                    <span className="text-accent">const</span> status = <span className="text-primary">"{repo ? 'Active' : 'Archived'}"</span>;
                 </div>
                 <div className="text-xs text-muted-foreground font-mono">
                    <span className="text-accent">const</span> lastUpdate = <span className="text-primary">"{repo ? formatDate(repo.updated_at) : 'N/A'}"</span>;
                 </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
