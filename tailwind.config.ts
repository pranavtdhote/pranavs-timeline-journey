import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        timeline: {
          primary: "hsl(var(--timeline-primary))",
          accent: "hsl(var(--timeline-accent))",
          muted: "hsl(var(--timeline-muted))",
        },
        "neon-cyan": "#00F0FF",
        "dev-purple": "#A855F7",
        "terminal-green": "#22C55E",
        "dev-bg": "#0B0F14",
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-timeline': 'var(--gradient-timeline)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
        'neon': '0 0 20px hsl(185 100% 50% / 0.3), 0 0 60px hsl(185 100% 50% / 0.1)',
        'neon-purple': '0 0 20px hsl(270 60% 65% / 0.3), 0 0 60px hsl(270 60% 65% / 0.1)',
        'neon-green': '0 0 20px hsl(142 72% 45% / 0.3), 0 0 60px hsl(142 72% 45% / 0.1)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(185 100% 50% / 0.2)" },
          "50%": { boxShadow: "0 0 40px hsl(185 100% 50% / 0.5)" },
        },
        "timeline-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
        "matrix-fall": {
          "0%": { transform: "translateY(-100%)", opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        "glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-left": "fade-in-left 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "timeline-draw": "timeline-draw 2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 3s infinite",
        "matrix-fall": "matrix-fall 4s linear infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "blink": "blink 1s step-end infinite",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
