import { useEffect, useRef } from "react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const chars = "01アイウエオカキクケコ{}[]<>/=;:.".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Throttle to ~20fps for performance
    let lastTime = 0;
    const frameInterval = 50;

    const draw = (time: number) => {
      if (time - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;

      ctx.fillStyle = "rgba(11, 15, 20, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "hsl(185, 100%, 50%)";
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.globalAlpha = 0.04;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

export default MatrixRain;
