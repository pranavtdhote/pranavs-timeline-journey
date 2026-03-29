import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Home, User, Code, Briefcase, GraduationCap, BookOpen, Award,
  Terminal, Github, Linkedin, Mail, Download, Sun, Moon, ExternalLink,
  BarChart3, Activity, X, Command
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface CommandItem {
  id: string;
  label: string;
  section: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const commands: CommandItem[] = useMemo(() => [
    // Navigation
    { id: "home", label: "Go to Home", section: "Navigation", icon: <Home className="w-4 h-4" />, action: () => scrollTo("home"), keywords: ["hero", "top"] },
    { id: "about", label: "Go to About Me", section: "Navigation", icon: <User className="w-4 h-4" />, action: () => scrollTo("about"), keywords: ["terminal", "bio", "whoami"] },
    { id: "skills", label: "Go to Skills", section: "Navigation", icon: <Code className="w-4 h-4" />, action: () => scrollTo("skills"), keywords: ["tech", "stack", "languages"] },
    { id: "experience", label: "Go to Experience", section: "Navigation", icon: <Briefcase className="w-4 h-4" />, action: () => scrollTo("experience"), keywords: ["work", "job", "career"] },
    { id: "projects", label: "Go to Projects", section: "Navigation", icon: <Terminal className="w-4 h-4" />, action: () => scrollTo("projects"), keywords: ["repos", "portfolio"] },
    { id: "education", label: "Go to Education", section: "Navigation", icon: <GraduationCap className="w-4 h-4" />, action: () => scrollTo("education"), keywords: ["college", "university", "degree"] },
    { id: "research", label: "Go to Research", section: "Navigation", icon: <BookOpen className="w-4 h-4" />, action: () => scrollTo("research"), keywords: ["papers", "publications"] },
    { id: "certifications", label: "Go to Certifications", section: "Navigation", icon: <Award className="w-4 h-4" />, action: () => scrollTo("certifications"), keywords: ["certificates", "badges"] },
    { id: "coding-profiles", label: "Go to Coding Profiles", section: "Navigation", icon: <BarChart3 className="w-4 h-4" />, action: () => scrollTo("coding-profiles"), keywords: ["leetcode", "codechef", "competitive"] },
    { id: "github-activity", label: "Go to GitHub Activity", section: "Navigation", icon: <Activity className="w-4 h-4" />, action: () => scrollTo("github-activity"), keywords: ["commits", "contributions"] },
    { id: "contact", label: "Go to Contact", section: "Navigation", icon: <Mail className="w-4 h-4" />, action: () => scrollTo("contact"), keywords: ["email", "message", "reach"] },

    // Actions
    { id: "resume", label: "Download Resume", section: "Actions", icon: <Download className="w-4 h-4" />, action: () => { setIsOpen(false); window.open("/Pranav_Dhote_Resume.pdf", "_blank"); }, keywords: ["cv", "pdf"] },
    { id: "toggle-theme", label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`, section: "Actions", icon: theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />, action: () => { toggleTheme(); setIsOpen(false); }, keywords: ["theme", "dark", "light", "mode"] },

    // External Links
    { id: "github-ext", label: "Open GitHub Profile", section: "Links", icon: <Github className="w-4 h-4" />, action: () => { setIsOpen(false); window.open("https://github.com/pranavtdhote", "_blank"); }, keywords: ["github", "repos"] },
    { id: "linkedin-ext", label: "Open LinkedIn Profile", section: "Links", icon: <Linkedin className="w-4 h-4" />, action: () => { setIsOpen(false); window.open("https://linkedin.com/in/pranav-dhote-1412b4241", "_blank"); }, keywords: ["linkedin", "connect"] },
    { id: "email-ext", label: "Send Email", section: "Links", icon: <Mail className="w-4 h-4" />, action: () => { setIsOpen(false); window.location.href = "mailto:pranavtdhote@gmail.com"; }, keywords: ["email", "mail"] },
  ], [theme]);

  // Filter commands based on query
  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(cmd =>
      cmd.label.toLowerCase().includes(q) ||
      cmd.section.toLowerCase().includes(q) ||
      cmd.keywords?.some(k => k.includes(q))
    );
  }, [query, commands]);

  // Group filtered commands by section
  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filtered.forEach(cmd => {
      if (!groups[cmd.section]) groups[cmd.section] = [];
      groups[cmd.section].push(cmd);
    });
    return groups;
  }, [filtered]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selected) selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg bg-[#0d1117] border border-border/50 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 font-mono outline-none"
              />
              <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50 bg-background/50 px-1.5 py-0.5 rounded border border-border/30">
                ESC
              </kbd>
            </div>

            {/* Command List */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground/50 font-mono">
                  No results for "{query}"
                </div>
              )}

              {Object.entries(grouped).map(([section, items]) => (
                <div key={section} className="mb-2">
                  <div className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-wider px-3 py-1.5">
                    {section}
                  </div>
                  {items.map(item => {
                    flatIndex++;
                    const idx = flatIndex;
                    return (
                      <button
                        key={item.id}
                        data-index={idx}
                        onClick={() => item.action()}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-colors ${
                          idx === selectedIndex
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                        }`}
                      >
                        <span className={idx === selectedIndex ? "text-primary" : "text-muted-foreground"}>
                          {item.icon}
                        </span>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.section === "Links" && (
                          <ExternalLink className="w-3 h-3 text-muted-foreground/40" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border/30 text-[10px] font-mono text-muted-foreground/40">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="bg-background/50 px-1 py-0.5 rounded border border-border/30">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-background/50 px-1 py-0.5 rounded border border-border/30">↵</kbd>
                  select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="bg-background/50 px-1 py-0.5 rounded border border-border/30">esc</kbd>
                close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
