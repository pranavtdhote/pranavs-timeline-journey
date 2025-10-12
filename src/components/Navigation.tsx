import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadResume = () => {
    window.open("/Pranav_Dhote_Resume.pdf", "_blank");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Pranav Dhote
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={handleDownloadResume}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => {
                handleDownloadResume();
                setIsOpen(false);
              }}
              size="sm"
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
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
