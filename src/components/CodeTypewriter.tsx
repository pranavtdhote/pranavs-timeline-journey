import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CodeTypewriterProps {
  lines: string[];
  typingSpeedMs?: number; // per character
  deletingSpeedMs?: number; // per character
  holdTimeMs?: number; // after a line is fully typed
  loop?: boolean;
  className?: string;
}

const DEFAULT_TYPING_MS = 28;
const DEFAULT_DELETING_MS = 16;
const DEFAULT_HOLD_MS = 1100;

// Accessible, reduced-motion-friendly typewriter that cycles through lines
const CodeTypewriter = ({
  lines,
  typingSpeedMs = DEFAULT_TYPING_MS,
  deletingSpeedMs = DEFAULT_DELETING_MS,
  holdTimeMs = DEFAULT_HOLD_MS,
  loop = true,
  className,
}: CodeTypewriterProps) => {
  const prefersReducedMotion = useReducedMotion();
  const safeLines = useMemo(() => (lines.length ? lines : [""]), [lines]);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return; // Respect reduced motion

    const full = safeLines[lineIndex] ?? "";

    if (phase === "typing") {
      if (displayed.length < full.length) {
        timerRef.current = window.setTimeout(() => {
          setDisplayed(full.slice(0, displayed.length + 1));
        }, typingSpeedMs);
      } else {
        setPhase("holding");
      }
    } else if (phase === "holding") {
      timerRef.current = window.setTimeout(() => {
        if (loop || lineIndex < safeLines.length - 1) {
          setPhase("deleting");
        }
      }, holdTimeMs);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timerRef.current = window.setTimeout(() => {
          setDisplayed(displayed.slice(0, displayed.length - 1));
        }, deletingSpeedMs);
      } else {
        const next = (lineIndex + 1) % safeLines.length;
        setLineIndex(next);
        setPhase("typing");
      }
    }
  }, [displayed, phase, lineIndex, safeLines, typingSpeedMs, deletingSpeedMs, holdTimeMs, prefersReducedMotion]);

  // When reduced motion is preferred, just show the current line without animation
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(safeLines[0] ?? "");
      setPhase("holding");
    }
  }, [prefersReducedMotion, safeLines]);

  return (
    <div className={className}>
      <div className="relative font-mono text-left">
        <span aria-live="polite" aria-atomic="true">{displayed}</span>
        {/* Caret */}
        <motion.span
          aria-hidden="true"
          className="inline-block w-px align-baseline ml-0.5 bg-accent"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
        />
      </div>

      {/* No pause control, as requested */}
    </div>
  );
};

export default CodeTypewriter;


