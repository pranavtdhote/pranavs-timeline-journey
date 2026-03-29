import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  text: string;
  color: string;
}

interface WireframeShape {
  cx: number;
  cy: number;
  radius: number;
  rotationSpeed: number;
  angle: number;
  sides: number;
  color: string;
  opacity: number;
}

const codeSymbols = ['<', '>', '{', '}', ';', '=', '(', ')', '/', '*', '0', '1', '=>', '::'];
const colors = ['hsl(185, 100%, 50%)', 'hsl(270, 60%, 65%)', 'hsl(142, 72%, 45%)'];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const wireframesRef = useRef<WireframeShape[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => {
      const z = Math.random() * 1.5 + 0.3;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 2,
        z,
        vx: (Math.random() - 0.5) * 0.2 * z,
        vy: (Math.random() - 0.5) * 0.2 * z,
        size: (Math.random() * 6 + 5) * z,
        opacity: (Math.random() * 0.12 + 0.03) * z,
        text: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const createWireframes = (): WireframeShape[] => {
      if (isMobile) return [];
      const shapes: WireframeShape[] = [];
      const count = 3;
      for (let i = 0; i < count; i++) {
        shapes.push({
          cx: Math.random() * canvas.width,
          cy: Math.random() * canvas.height,
          radius: Math.random() * 80 + 40,
          rotationSpeed: (Math.random() - 0.5) * 0.003,
          angle: Math.random() * Math.PI * 2,
          sides: Math.floor(Math.random() * 3) + 4, // 4-6 sided
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.04 + Math.random() * 0.04,
        });
      }
      return shapes;
    };

    const initParticles = () => {
      const count = isMobile ? 15 : 40;
      particlesRef.current = Array.from({ length: count }, () => createParticle());
      wireframesRef.current = createWireframes();
    };

    const drawWireframe = (shape: WireframeShape, t: number) => {
      ctx.save();
      ctx.translate(shape.cx, shape.cy - scrollRef.current * 0.1);
      ctx.rotate(shape.angle + t * shape.rotationSpeed);
      ctx.globalAlpha = shape.opacity;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i <= shape.sides; i++) {
        const a = (i / shape.sides) * Math.PI * 2;
        const x = Math.cos(a) * shape.radius;
        const y = Math.sin(a) * shape.radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const updateAndDraw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Subtle Grid (desktop only) ---
      if (!isMobile) {
        ctx.save();
        ctx.strokeStyle = 'hsl(185, 100%, 50%)';
        ctx.globalAlpha = 0.015;
        ctx.lineWidth = 0.5;
        const gridSize = 120;
        const scrollOffset = (scrollRef.current * 0.3) % gridSize;

        for (let x = 0; x <= canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = -gridSize; y <= canvas.height + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y - scrollOffset);
          ctx.lineTo(canvas.width, y - scrollOffset);
          ctx.stroke();
        }
        ctx.restore();
      }

      // --- Wireframe Shapes (desktop only) ---
      wireframesRef.current.forEach(shape => drawWireframe(shape, time));

      // --- Particle Connections ---
      if (!isMobile) {
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const a = particlesRef.current[i];
            const b = particlesRef.current[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180) {
              ctx.save();
              ctx.globalAlpha = (1 - dist / 180) * 0.06;
              ctx.strokeStyle = a.color;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y - scrollRef.current * a.z * 0.15);
              ctx.lineTo(b.x, b.y - scrollRef.current * b.z * 0.15);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      // --- Update & Draw Particles ---
      ctx.globalAlpha = 1;
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        let pX = particle.x;
        let pY = particle.y - scrollRef.current * particle.z * 0.15;

        // Gentle mouse repulsion (desktop only)
        if (!isMobile) {
          const dx = particle.x - mouseRef.current.x;
          const dy = pY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 250) {
            const force = (250 - dist) / 250;
            pX += (dx / dist) * force * 12 * particle.z;
            pY += (dy / dist) * force * 12 * particle.z;
          }
        }

        // Screen wrap
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -canvas.height) particle.y = canvas.height * 2;
        if (particle.y > canvas.height * 2) particle.y = -canvas.height;

        // Draw with depth-based blur simulation (smaller = further)
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.font = `${particle.size}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.text, pX, pY);
        ctx.restore();
      });

      // --- Fog overlay (bottom) ---
      const fogGradient = ctx.createLinearGradient(0, canvas.height - 150, 0, canvas.height);
      fogGradient.addColorStop(0, 'transparent');
      fogGradient.addColorStop(1, 'hsl(216, 35%, 5%)');
      ctx.fillStyle = fogGradient;
      ctx.fillRect(0, canvas.height - 150, canvas.width, 150);

      animationRef.current = requestAnimationFrame(updateAndDraw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    resizeCanvas();
    initParticles();
    animationRef.current = requestAnimationFrame(updateAndDraw);

    window.addEventListener('resize', resizeCanvas);
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
    />
  );
};

export default ParticleBackground;
