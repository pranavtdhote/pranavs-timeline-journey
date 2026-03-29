import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "home", label: "Home" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const FloatingTOC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = sections.map(s => s.id);
    const sectionElements = sectionIds
      .map(id => document.querySelector<HTMLElement>(`#${id}`))
      .filter(Boolean) as HTMLElement[];

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="sm"
          variant="outline"
          className="rounded-full p-3 bg-background/80 backdrop-blur-md border-border hover:bg-secondary"
          aria-label="Open table of contents"
        >
          <List className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* TOC Panel */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="fixed left-6 top-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-4 shadow-lg max-w-xs"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Table of Contents</h3>
              <Button
                onClick={() => setIsOpen(false)}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FloatingTOC;
