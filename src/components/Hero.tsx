import { Github, Linkedin, Mail, Phone, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const typingLines = [
  "building scalable systems...",
  "creating AI driven solutions...",
  "designing immersive web apps...",
];

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const currentLine = typingLines[lineIndex];

    if (!isDeleting && charIndex < currentLine.length) {
      timerRef.current = window.setTimeout(() => {
        setDisplayedText(currentLine.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
    } else if (!isDeleting && charIndex === currentLine.length) {
      timerRef.current = window.setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timerRef.current = window.setTimeout(() => {
        setDisplayedText(currentLine.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 25);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setLineIndex((lineIndex + 1) % typingLines.length);
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [charIndex, isDeleting, lineIndex]);

  // Mouse parallax tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
    containerRef.current.style.setProperty('--mx', `${(mouseRef.current.x - 0.5) * 30}px`);
    containerRef.current.style.setProperty('--my', `${(mouseRef.current.y - 0.5) * 30}px`);
    containerRef.current.style.setProperty('--flare-x', `${mouseRef.current.x * 100}%`);
    containerRef.current.style.setProperty('--flare-y', `${mouseRef.current.y * 100}%`);
  }, []);

  const handleDownloadResume = () => {
    window.open("/Pranav_Dhote_Resume.pdf", "_blank");
  };

  return (
    <section
      id="hero-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      data-cursor="hero"
    >
      {/* Animated background focus gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50 z-0 pointer-events-none"></div>

      {/* Mouse-tracking lens flare effect */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-30 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at var(--flare-x, 50%) var(--flare-y, 50%), hsl(185 100% 50% / 0.08), transparent 60%)`,
        }}
      />

      {/* Ambient glow orbs with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 md:left-20 w-48 md:w-72 h-48 md:h-72 bg-primary/8 rounded-full blur-[80px] md:blur-[120px]"
          style={{ transform: 'translate(var(--mx, 0), var(--my, 0))' }}
        />
        <div
          className="absolute bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-secondary/8 rounded-full blur-[80px] md:blur-[120px]"
          style={{ transform: 'translate(calc(var(--mx, 0) * -0.5), calc(var(--my, 0) * -0.5))' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/4 rounded-full blur-[100px] md:blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Terminal prompt intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5"
            >
              <span className="font-mono text-xs sm:text-sm text-accent/80 tracking-wider">
                ~/portfolio{" "}
                <span className="text-muted-foreground">$</span>{" "}
                <span className="text-primary">cat intro.txt</span>
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-heading-xl font-bold tracking-tight mb-3"
            >
              <span className="text-foreground font-light">Hi, I'm </span>
              <span className="text-neon font-bold">Pranav Dhote</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5"
            >
              <p className="text-body-lg text-muted-foreground font-mono font-light">
                <span className="text-secondary">Full Stack Developer</span>
                <span className="hidden sm:inline text-muted-foreground/40 mx-3">|</span>
                <span className="block sm:inline mt-2 sm:mt-0 text-accent">Machine Learning Enthusiast</span>
              </p>
            </motion.div>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6 h-8"
            >
              <div className="font-mono text-sm sm:text-base text-primary/70 flex items-center justify-center lg:justify-start gap-1">
                <span className="text-accent/60">{">"}</span>
                <span>{displayedText}</span>
                <span className="inline-block w-[2px] h-5 bg-primary/80 animate-blink"></span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-muted-foreground/80 mb-8 max-w-xl leading-relaxed"
            >
              Information Technology Student passionate about creating innovative
              solutions through AI, Blockchain, and Full-Stack Development.
            </motion.p>

            {/* Contact info pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/60 font-mono glass px-3 py-1.5 rounded-full">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
                <span>Pune, India</span>
              </div>
              <a
                href="tel:+918446432484"
                className="flex items-center gap-2 text-xs sm:text-sm text-foreground/60 font-mono glass px-3 py-1.5 rounded-full hover:border-primary/30 transition-all duration-500"
              >
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                <span>+91 8446432484</span>
              </a>
              <a
                href="mailto:pranavtdhote@gmail.com"
                className="flex items-center gap-2 text-xs sm:text-sm text-foreground/60 font-mono glass px-3 py-1.5 rounded-full hover:border-primary/30 transition-all duration-500"
              >
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                <span className="hidden sm:inline">pranavtdhote@gmail.com</span>
                <span className="sm:hidden">Email</span>
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <Button
                onClick={handleDownloadResume}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(185_100%_50%_/_0.2)] magnetic-hover font-mono"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-secondary/30 hover:bg-secondary/10 hover:border-secondary/60 magnetic-hover font-mono backdrop-blur-sm"
              >
                <a
                  href="https://linkedin.com/in/pranav-dhote-1412b4241"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-accent/30 hover:bg-accent/10 hover:border-accent/60 magnetic-hover font-mono backdrop-blur-sm"
              >
                <a
                  href="https://github.com/pranavtdhote"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 hover:border-primary/60 magnetic-hover font-mono backdrop-blur-sm"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </motion.div>
          </div>

          {/* Right: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 relative"
          >
            {/* Outer glow rings */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 blur-2xl opacity-60 animate-pulse" />
            <div
              className="absolute -inset-2 rounded-full border border-primary/10"
              style={{ animation: 'spin 20s linear infinite' }}
            />
            <div
              className="absolute -inset-6 rounded-full border border-secondary/10"
              style={{ animation: 'spin 30s linear infinite reverse' }}
            />

            {/* Photo container */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-primary/20 shadow-[0_0_40px_hsl(185_100%_50%_/_0.15)]">
              <img
                src="/profile.jpg"
                alt="Pranav Dhote"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating status badge */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass px-4 py-1.5 rounded-full border border-primary/20 flex items-center gap-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-foreground/70">Available for hire</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">scroll</span>
          <div className="w-5 h-8 border border-primary/20 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-primary/50 rounded-full mt-1.5"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
