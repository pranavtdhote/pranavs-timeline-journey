import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface ScrollAnimatorProps {
  children: ReactNode;
  isHero?: boolean;
}

const ScrollAnimator = ({ children, isHero = false }: ScrollAnimatorProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "-40px 0px",
  });

  if (isHero) {
    // Hero wrapper: cinematic push-back on scroll
    return (
      <motion.div
        initial={{ opacity: 1, y: 0, scale: 1 }}
        style={{ transformOrigin: "top center" }}
        whileInView={{
          opacity: [1, 0.3],
          scale: [1, 0.92],
          y: [0, 60],
        }}
        viewport={{ amount: 0, margin: "0px 0px -100% 0px" }}
        transition={{ duration: 1, ease: "linear" }}
        className="w-full relative z-10 min-w-0"
      >
        {children}
      </motion.div>
    );
  }

  // Cinematic section entrance: scale from depth + fade + translate
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.92 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 80, scale: 0.92 }
      }
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1], // Apple spring-like ease
      }}
      className="w-full relative z-10 py-4 min-w-0"
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimator;
