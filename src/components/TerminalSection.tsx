import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "command" | "output";
  text: string;
  scrollTarget?: string;
}

const terminalScript: TerminalLine[] = [
  { type: "command", text: "$ whoami" },
  { type: "output", text: "Pranav Dhote — Full Stack Developer & ML Enthusiast" },
  { type: "command", text: "$ cat about.txt" },
  { type: "output", text: "I'm an Information Technology student at AISSMS IOIT, Pune." },
  { type: "output", text: "Passionate about building real-world solutions with AI," },
  { type: "output", text: "Blockchain, and modern web technologies." },
  { type: "command", text: "$ echo $INTERESTS" },
  { type: "output", text: "Open Source • Competitive Programming • System Design" },
  { type: "command", text: "$ cat goals.txt" },
  { type: "output", text: "Building scalable products that solve meaningful problems." },
  { type: "output", text: "Contributing to open-source and learning every day." },
  { type: "command", text: "$ echo $LOCATION" },
  { type: "output", text: "Pune, Maharashtra, India 🇮🇳" },
  { type: "command", text: "$ uptime" },
  { type: "output", text: "Coding since 2021 — 4+ years and counting..." },
  { type: "command", text: "$ ls highlights/" },
  { type: "output", text: "Training-Placement-Secretary/", scrollTarget: "experience" },
  { type: "output", text: "Full-Stack-Projects/", scrollTarget: "projects" },
  { type: "output", text: "Research-Papers/", scrollTarget: "research" },
];

const TerminalSection = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);

  // Start animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Type out lines one by one
  useEffect(() => {
    if (!started) return;
    if (visibleLines >= terminalScript.length) return;

    const line = terminalScript[visibleLines];
    const text = line.text;

    if (line.type === "command") {
      setIsTyping(true);
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        setCurrentText(text.slice(0, idx));
        if (idx >= text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsTyping(false);
            setCurrentText("");
            setVisibleLines((v) => v + 1);
          }, 400);
        }
      }, 40);
      return () => clearInterval(interval);
    } else {
      // Output appears instantly after a short delay
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, started]);

  // Auto-scroll terminal body
  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [visibleLines, currentText]);

  const handleClick = (scrollTarget?: string) => {
    if (!scrollTarget) return;
    const el = document.getElementById(scrollTarget);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-20 px-4" ref={containerRef}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">👤</span>
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground">
              <span className="text-primary">~/</span>about-me
            </h2>
          </div>

          {/* Terminal window */}
          <div className="rounded-xl overflow-hidden border border-border/50 shadow-neon bg-[#0d1117]">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-border/30">
              <div className="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                pranav@dev ~ zsh
              </span>
              <div className="w-12"></div>
            </div>

            {/* Terminal body */}
            <div
              ref={termBodyRef}
              className="p-4 md:p-5 font-mono text-xs sm:text-sm md:text-base min-h-[300px] max-h-[420px] overflow-y-auto space-y-1"
            >
              {terminalScript.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line.type === "command" ? (
                    <div className="text-accent">{line.text}</div>
                  ) : (
                    <div
                      className={`text-foreground/80 pl-2 ${
                        line.scrollTarget
                          ? "cursor-pointer hover:text-primary transition-colors"
                          : ""
                      }`}
                      onClick={() => handleClick(line.scrollTarget)}
                    >
                      {line.scrollTarget && (
                        <span className="text-primary mr-2">→</span>
                      )}
                      {line.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Currently typing line */}
              {isTyping && (
                <div className="text-accent">
                  {currentText}
                  <span className="inline-block w-2 h-4 bg-accent animate-blink ml-0.5 align-middle"></span>
                </div>
              )}

              {/* Idle cursor */}
              {!isTyping && visibleLines >= terminalScript.length && (
                <div className="text-accent">
                  ${" "}
                  <span className="inline-block w-2 h-4 bg-accent animate-blink ml-0.5 align-middle"></span>
                </div>
              )}
            </div>
          </div>

          {/* Hint */}
          <p className="text-xs text-muted-foreground text-center mt-3 font-mono">
            click on items to navigate →
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
