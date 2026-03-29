import { useEffect, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";

type CursorVariant = "default" | "hero" | "project" | "text" | "gallery" | "interactive";

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isClicking, setIsClicking] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const outerPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>();

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Update inner dot immediately
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`;
        innerRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Smooth follow for outer ring
    const animate = () => {
      outerPosRef.current.x += (posRef.current.x - outerPosRef.current.x) * 0.12;
      outerPosRef.current.y += (posRef.current.y - outerPosRef.current.y) * 0.12;

      if (outerRef.current) {
        outerRef.current.style.left = `${outerPosRef.current.x}px`;
        outerRef.current.style.top = `${outerPosRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const getVariant = (target: HTMLElement): CursorVariant => {
      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        return cursorTarget.getAttribute('data-cursor') as CursorVariant;
      }
      const interactiveTarget = target.closest('a, button, [role="button"], input, textarea, .tilt-card, .magnetic-hover, .glass-panel');
      if (interactiveTarget) {
        return "interactive";
      }
      return "default";
    };

    // Hover detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setVariant(getVariant(target));
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  // Define styles based on variant
  let outerSize = 36;
  let innerSize = 4;
  let outerStyle: React.CSSProperties = {
    border: "1px solid hsl(185 100% 50% / 0.25)",
    boxShadow: "0 0 10px hsl(185 100% 50% / 0.1)",
    background: "transparent",
    borderRadius: "50%"
  };
  let innerStyle: React.CSSProperties = {
    background: "hsl(185 100% 50% / 0.8)",
    boxShadow: "0 0 8px hsl(185 100% 50% / 0.5)",
    borderRadius: "50%",
    opacity: 1
  };

  if (isClicking) {
    outerSize = 28;
    innerSize = 6;
  } else {
    switch (variant) {
      case "interactive":
        outerSize = 52;
        innerSize = 3;
        outerStyle = {
          border: "1px solid hsl(185 100% 50% / 0.4)",
          boxShadow: "0 0 20px hsl(185 100% 50% / 0.2), 0 0 40px hsl(185 100% 50% / 0.08), inset 0 0 15px hsl(185 100% 50% / 0.05)",
          background: "hsl(185 100% 50% / 0.05)",
          borderRadius: "50%"
        };
        break;
      case "hero":
        outerSize = 100;
        innerSize = 0;
        outerStyle = {
          border: "none",
          boxShadow: "0 0 80px hsl(270 60% 60% / 0.3), inset 0 0 40px hsl(270 60% 60% / 0.3)",
          background: "radial-gradient(circle, hsl(270 60% 60% / 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          mixBlendMode: "screen"
        };
        innerStyle.opacity = 0;
        break;
      case "project":
        outerSize = 80;
        innerSize = 0;
        outerStyle = {
          border: "1px dashed hsl(185 100% 50% / 0.5)",
          boxShadow: "0 0 30px hsl(185 100% 50% / 0.2)",
          background: "hsl(185 100% 50% / 0.05)",
          borderRadius: "50%",
          animation: "spin 10s linear infinite"
        };
        innerStyle.opacity = 0;
        break;
      case "text":
        outerSize = 40;
        innerSize = 0;
        outerStyle = {
          border: "none",
          borderLeft: "2px solid hsl(185 100% 50% / 0.8)",
          borderRight: "2px solid hsl(185 100% 50% / 0.8)",
          borderRadius: "0%",
          height: "24px",
          width: "12px",
          background: "transparent",
          boxShadow: "none"
        };
        innerStyle.opacity = 0;
        break;
      case "gallery":
        outerSize = 60;
        innerSize = 0;
        outerStyle = {
          border: "1px solid hsl(0 0% 100% / 0.3)",
          background: "hsl(0 0% 100% / 0.1)",
          backdropFilter: "blur(4px)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        };
        innerStyle.opacity = 0;
        break;
      default:
        break;
    }
  }

  return (
    <>
      {/* Global style to force hiding native cursor when data-cursor is active */}
      <style dangerouslySetInnerHTML={{ __html: `
        [data-cursor] { cursor: none !important; }
        [data-cursor] * { cursor: none !important; }
      `}} />
      
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          width: outerSize,
          height: variant === "text" && !isClicking ? 24 : outerSize,
          opacity: isClicking ? 0.6 : 1,
          ...outerStyle
        }}
      >
        {variant === "gallery" && !isClicking && (
          <Maximize2 className="w-5 h-5 text-white opacity-80" />
        )}
      </div>
      
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed z-[10000] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          width: innerSize,
          height: innerSize,
          ...innerStyle
        }}
      />
    </>
  );
};

export default CustomCursor;
