import { useState, useEffect } from "react";
import { Menu, X, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Research", href: "#research" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy — matches page section order
  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "skills", "experience", "education", "research", "certifications", "contact"];
    const sections = sectionIds
      .map((id) => document.querySelector<HTMLElement>(`#${id}`))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const handleDownloadResume = () => {
    window.open("/Pranav_Dhote_Resume.pdf", "_blank");
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/60 backdrop-blur-2xl shadow-[0_4px_30px_hsl(0_0%_0%/0.3)] border-b border-border/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-sm font-bold font-mono text-neon hover:opacity-80 transition-opacity"
          >
            {"<"}PD{"/>"}
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xs font-mono transition-colors relative ${
                  active === item.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === item.href.replace("#", "") && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary shadow-[0_0_6px_hsl(185,100%,50%)]" />
                )}
                {item.label}
              </a>
            ))}

            {/* Command Palette Trigger */}
            <button
              onClick={openCommandPalette}
              className="flex items-center gap-2 text-xs font-mono text-muted-foreground/50 hover:text-muted-foreground bg-background/30 border border-border/30 rounded-md px-2.5 py-1 transition-all hover:border-primary/30"
            >
              <Search className="w-3 h-3" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="text-[9px] bg-background/50 px-1 py-0.5 rounded border border-border/40 leading-none">⌘K</kbd>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 rounded-md border border-border/50 hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <Button
              onClick={handleDownloadResume}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-neon font-mono text-xs h-7 px-3 magnetic-hover"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Resume
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Ctrl+K button */}
            <button
              onClick={openCommandPalette}
              className="p-1.5 rounded-md border border-border/50 hover:bg-muted transition-colors text-muted-foreground"
            >
              <Search className="w-4 h-4" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block py-2 text-sm font-mono transition-colors ${
                  active === item.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="p-2 rounded-md border border-border/50 hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
            <Button
              onClick={() => {
                handleDownloadResume();
                setIsOpen(false);
              }}
              size="sm"
              className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
