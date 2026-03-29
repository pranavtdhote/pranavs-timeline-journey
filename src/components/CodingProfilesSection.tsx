import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodingProfile {
  platform: string;
  username: string;
  description: string;
  color: string;
  icon: string;
  url: string;
}

const PROFILES: CodingProfile[] = [
  {
    platform: "LeetCode",
    username: "pranavtdhote",
    description:
      "Practicing Data Structures & Algorithms daily. Focused on arrays, trees, graphs, and dynamic programming to strengthen problem-solving fundamentals and prepare for technical interviews.",
    color: "hsl(35, 100%, 55%)",
    icon: "🧩",
    url: "https://leetcode.com/pranavtdhote",
  },
  {
    platform: "CodeChef",
    username: "pranavtdhote",
    description:
      "Competing in monthly long challenges and cook-offs. Building consistency in competitive programming and improving speed with timed problem sets across various difficulty levels.",
    color: "hsl(11, 80%, 45%)",
    icon: "👨‍🍳",
    url: "https://www.codechef.com/users/pranavtdhote",
  },
  {
    platform: "GitHub",
    username: "pranavtdhote",
    description:
      "Open-source contributions and personal projects. Building full-stack applications, experimenting with new frameworks, and maintaining a clean commit history across repositories.",
    color: "hsl(210, 20%, 98%)",
    icon: "🐙",
    url: "https://github.com/pranavtdhote",
  },
];

const CodingProfilesSection = () => {
  const [selectedProfile, setSelectedProfile] = useState<CodingProfile | null>(null);

  if (selectedProfile) {
    window.onkeydown = (e) => {
      if (e.key === "Escape") setSelectedProfile(null);
    };
  }

  return (
    <section id="coding-profiles" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground">
              <span className="text-primary">~/</span>coding-profiles
            </h2>
          </div>
          <p className="text-muted-foreground font-mono ml-11 text-sm md:text-base">
            Competitive programming and open-source contributions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROFILES.map((profile, idx) => (
            <motion.div
              key={profile.platform}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-500"
              onClick={() => setSelectedProfile(profile)}
            >
              {/* Dynamic Glow Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${profile.color}, transparent 70%)`,
                }}
              />

              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {profile.icon}
                </div>

                <h3
                  className="font-bold text-2xl font-mono mb-2 transition-colors duration-300"
                  style={{ color: profile.color }}
                >
                  {profile.platform}
                </h3>

                <p className="text-sm text-muted-foreground font-mono">
                  @{profile.username}
                </p>

                <div className="mt-4 text-xs text-primary/80 font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  view details <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/70 backdrop-blur-xl"
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-md glass-panel rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-40 opacity-15 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center top, ${selectedProfile.color}, transparent 70%)`,
                }}
              />

              <div className="relative z-10 p-8 flex flex-col items-center text-center">
                {/* Close btn */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => setSelectedProfile(null)}
                >
                  <X className="w-5 h-5" />
                </Button>

                <div className="text-7xl mb-6 relative">
                  {selectedProfile.icon}
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse" />
                </div>

                <h2
                  className="text-3xl font-bold font-mono mb-1"
                  style={{ color: selectedProfile.color }}
                >
                  {selectedProfile.platform}
                </h2>

                <p className="text-sm text-muted-foreground font-mono mb-6">
                  @{selectedProfile.username}
                </p>

                <p className="text-foreground/80 text-sm leading-relaxed mb-8 max-w-sm">
                  {selectedProfile.description}
                </p>

                <Button
                  className="w-full rounded-full font-mono text-sm gap-2"
                  style={{
                    background: selectedProfile.color,
                    color: "#0B0F14",
                  }}
                  asChild
                >
                  <a
                    href={selectedProfile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" /> Visit Profile
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CodingProfilesSection;
