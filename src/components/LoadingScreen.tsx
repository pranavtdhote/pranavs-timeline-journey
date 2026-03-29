import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingTexts = [
  "Initializing Portfolio",
  "Loading Modules",
  "Preparing Experience",
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const totalDuration = 2800;
    const startTime = Date.now();

    // Progress bar animation
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, (elapsed / totalDuration) * 100);
      setProgress(p);

      // Switch text at 33% and 66%
      if (p > 66) setTextIndex(2);
      else if (p > 33) setTextIndex(1);

      if (p >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(onComplete, 800);
        }, 200);
      }
    }, 16);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-[#0B0F14] flex flex-col items-center justify-center"
      animate={isFading ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-neon text-3xl font-bold font-mono tracking-tight">{"<PD/>"}</span>
        </motion.div>

        {/* Animated text */}
        <div className="h-8 mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-mono text-muted-foreground/70 tracking-wider"
            >
              {loadingTexts[textIndex]}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                ...
              </motion.span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Thin progress bar — Apple style */}
        <div className="w-full max-w-[200px] h-[2px] bg-muted/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, hsl(185 100% 50%), hsl(270 60% 65%))",
              boxShadow: "0 0 12px hsl(185 100% 50% / 0.4)",
            }}
            transition={{ duration: 0.05 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
