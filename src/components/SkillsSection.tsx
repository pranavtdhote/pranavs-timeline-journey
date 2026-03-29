import { Code, Database, Wrench, Globe, Brain, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface SkillCluster {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  skills: { name: string; desc: string }[];
}

const clusters: SkillCluster[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: <Globe className="w-5 h-5" />,
    color: "hsl(185, 100%, 50%)",
    glowColor: "shadow-neon",
    skills: [
      { name: "React.js", desc: "Component-based UI development" },
      { name: "JavaScript", desc: "ES6+, async/await, DOM manipulation" },
      { name: "HTML5/CSS3", desc: "Semantic markup, Flexbox, Grid" },
      { name: "Tailwind CSS", desc: "Utility-first responsive design" },
      { name: "Bootstrap", desc: "Rapid prototyping framework" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: <Terminal className="w-5 h-5" />,
    color: "hsl(270, 60%, 65%)",
    glowColor: "shadow-neon-purple",
    skills: [
      { name: "Node.js", desc: "Server-side JavaScript runtime" },
      { name: "Express.js", desc: "RESTful API development" },
      { name: "Java", desc: "Enterprise applications, OOP" },
      { name: "Python", desc: "Scripting, automation, ML" },
      { name: "C/C++", desc: "Systems programming, DSA" },
    ],
  },
  {
    id: "aiml",
    title: "AI / ML",
    icon: <Brain className="w-5 h-5" />,
    color: "hsl(142, 72%, 45%)",
    glowColor: "shadow-neon-green",
    skills: [
      { name: "Machine Learning", desc: "Supervised & unsupervised learning" },
      { name: "OpenCV", desc: "Computer vision & image processing" },
      { name: "Data Analysis", desc: "Pandas, NumPy, visualization" },
      { name: "Solidity", desc: "Smart contract development" },
      { name: "Hardhat", desc: "Ethereum development framework" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Extras",
    icon: <Wrench className="w-5 h-5" />,
    color: "hsl(45, 90%, 55%)",
    glowColor: "shadow-glow",
    skills: [
      { name: "Git/GitHub", desc: "Version control, collaboration" },
      { name: "MongoDB", desc: "NoSQL document database" },
      { name: "MySQL", desc: "Relational database design" },
      { name: "Firebase", desc: "BaaS, auth, realtime DB" },
      { name: "Vite", desc: "Next-gen frontend tooling" },
    ],
  },
];

const SkillsSection = () => {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-3">
            <Code className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold font-mono">
              <span className="text-primary">~/</span>skills
            </h2>
          </div>
        </motion.div>

        {/* Cluster grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clusters.map((cluster, idx) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveCluster(cluster.id)}
              onMouseLeave={() => {
                setActiveCluster(null);
                setHoveredSkill(null);
              }}
              className="group h-full"
            >
              <div
                className={`h-full glass-panel rounded-xl p-5 transition-all duration-500 flex flex-col ${
                  activeCluster === cluster.id ? cluster.glowColor : ""
                }`}
                style={{
                  borderColor:
                    activeCluster === cluster.id ? cluster.color : undefined,
                }}
              >
                {/* Cluster header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0"
                    style={{
                      backgroundColor: cluster.color + "20",
                      color: cluster.color,
                      boxShadow:
                        activeCluster === cluster.id
                          ? `0 0 15px ${cluster.color}40`
                          : "none",
                    }}
                  >
                    {cluster.icon}
                  </div>
                  <h3
                    className="text-lg font-bold font-mono transition-colors duration-300"
                    style={{
                      color:
                        activeCluster === cluster.id
                          ? cluster.color
                          : undefined,
                    }}
                  >
                    {cluster.title}
                  </h3>
                </div>

                {/* Skill nodes */}
                <div className="space-y-2 flex-grow">
                  {cluster.skills.map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="relative"
                    >
                      <div
                        className="flex items-center gap-2 py-1.5 px-2.5 rounded-md transition-all duration-200 cursor-default"
                        style={{
                          backgroundColor:
                            hoveredSkill === skill.name
                              ? cluster.color + "15"
                              : "transparent",
                        }}
                      >
                        {/* Connection dot */}
                        <div
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300 flex-shrink-0"
                          style={{
                            backgroundColor: cluster.color,
                            boxShadow:
                              hoveredSkill === skill.name
                                ? `0 0 8px ${cluster.color}`
                                : "none",
                          }}
                        />
                        <span className="text-sm font-mono text-foreground/80">
                          {skill.name}
                        </span>
                      </div>

                      {/* Tooltip */}
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute left-0 -top-8 z-20 px-2.5 py-1 rounded text-xs font-mono text-foreground bg-popover border border-border shadow-lg whitespace-nowrap"
                        >
                          {skill.desc}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
