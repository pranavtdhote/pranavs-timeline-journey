import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BugCrawler = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: 300 });
  const [fleeing, setFleeing] = useState(false);
  const [squished, setSquished] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  
  const animRef = useRef<number>();
  const timeoutRef = useRef<number>();
  const posRef = useRef({ x: -100, y: 300 });
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const startCrawl = useCallback(() => {
    // 50% chance to start from left or right
    const startFromLeft = Math.random() > 0.5;
    const startY = 100 + Math.random() * (window.innerHeight - 200);
    const startX = startFromLeft ? -50 : window.innerWidth + 50;
    const dir = startFromLeft ? 1 : -1;

    posRef.current = { x: startX, y: startY };
    setPosition({ x: startX, y: startY });
    setDirection(dir);
    setFleeing(false);
    setSquished(false);
    setVisible(true);

    const baseSpeed = 0.5 + Math.random() * 0.5;
    
    // The main movement loop
    const wobble = () => {
      if (squished) return;

      const dx = mouseRef.current.x - posRef.current.x;
      const dy = mouseRef.current.y - posRef.current.y;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);

      // Proximity Flee detection (run away if mouse is within 150px)
      if (distToMouse < 150 && !fleeing) {
        setFleeing(true);
      }

      const currentFleeing = distToMouse < 150;
      const speed = currentFleeing ? baseSpeed * 5 : baseSpeed;
      
      // If fleeing, maybe slightly change Y to escape more erratically
      const yOffset = currentFleeing ? (Math.random() - 0.5) * 5 : Math.sin(posRef.current.x * 0.05) * 1;
      
      // Move forward
      posRef.current.x += speed * (currentFleeing ? -Math.sign(dx) : dir); 
      posRef.current.y += yOffset;
      
      setPosition({ ...posRef.current });

      // Check if off screen to despawn and schedule next
      if (
        posRef.current.x > window.innerWidth + 100 ||
        posRef.current.x < -100 ||
        posRef.current.y > window.innerHeight + 100 ||
        posRef.current.y < -100
      ) {
        setVisible(false);
        scheduleNext();
        return;
      }

      animRef.current = requestAnimationFrame(wobble);
    };

    animRef.current = requestAnimationFrame(wobble);
  }, [squished, fleeing]); // Note: fleeing state is accessed via a closure check somewhat dynamically

  const scheduleNext = useCallback(() => {
    const delay = 30000 + Math.random() * 30000; // 30-60s delay
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      startCrawl();
    }, delay);
  }, [startCrawl]);

  useEffect(() => {
    // Track mouse for proximity fleeing
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initial spawn after 10 seconds
    timeoutRef.current = window.setTimeout(() => {
      startCrawl();
    }, 10000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startCrawl]);

  const handleSquish = () => {
    if (squished) return;
    
    setSquished(true);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    
    // Hide after squish animation finishes, then schedule respawn
    setTimeout(() => {
      setVisible(false);
      scheduleNext();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: squished ? 0 : 1,
            scaleX: direction,
            scaleY: squished ? 0.2 : (fleeing ? 1.2 : 1),
            x: position.x,
            y: position.y,
            rotate: squished ? 0 : (fleeing ? Math.random() * 20 - 10 : 0) // Jitter when fleeing
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            opacity: { duration: squished ? 1 : 0.5, delay: squished ? 1 : 0 },
            default: { duration: 0.1, ease: "linear" }
          }}
          onClick={handleSquish}
          className="fixed z-[100] cursor-crosshair select-none origin-bottom"
          style={{
            fontSize: "24px",
            filter: squished ? "grayscale(1) brightness(0.5)" : "none",
            transformOrigin: "center center",
            marginLeft: "-12px", // Center offset
            marginTop: "-12px",
          }}
        >
          {squished ? "💥" : "🐞"}
          
          {/* Particle burst on squish */}
          {squished && (
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="text-secondary opacity-50 text-sm absolute -top-4 -left-4">✨</span>
              <span className="text-primary opacity-50 text-sm absolute -bottom-4 -left-2">✨</span>
              <span className="text-accent opacity-50 text-sm absolute -top-2 -right-4">✨</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BugCrawler;
