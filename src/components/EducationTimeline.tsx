import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const educationData = [
  {
    institution: "AISSMS Institute of Information Technology, Pune",
    degree: "B.Tech - Information Technology",
    period: "2023 – 2027",
    grade: "CGPA: 9.02/10.0",
    icon: "🎓",
    details: "Focused on AI/ML, Web Development, and Blockchain technologies. Active in coding competitions and placement activities.",
  },
  {
    institution: "JVM Mahavidyalaya, Devgram",
    degree: "Higher Secondary Certificate (HSC), Science Stream",
    period: "2021 – 2023",
    grade: "Percentage: 72%",
    icon: "📚",
    details: "Science stream with focus on Mathematics and Computer Science.",
  },
  {
    institution: "New Orange City Convent, Warud",
    degree: "Central Board of Secondary Education (CBSE)",
    period: "2011 – 2021",
    grade: "Percentage: 94%",
    icon: "🏫",
    details: "Strong foundation in academics with excellent performance in Mathematics and Science.",
  },
];

const EducationTimeline = () => {
  return (
    <section id="education" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <GraduationCap className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold font-mono">
            <span className="text-primary">~/</span>education
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Glowing vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px">
            <div className="w-full h-full bg-gradient-to-b from-primary via-secondary to-accent opacity-40" />
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary via-secondary to-accent opacity-20 blur-sm" />
          </div>

          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative pl-16 md:pl-20 group"
              >
                {/* Timeline node */}
                <div className="absolute left-3.5 md:left-5.5 top-6 w-5 h-5 rounded-full border-2 border-primary bg-background z-10 group-hover:shadow-neon transition-shadow duration-300">
                  <div className="absolute inset-1 rounded-full bg-primary animate-pulse-glow" />
                </div>

                {/* Card */}
                <div className="glass-panel rounded-xl p-6 hover:border-primary/20 group-hover:translate-x-1">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{edu.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <h3 className="text-lg font-semibold text-foreground font-mono leading-tight">
                          {edu.institution}
                        </h3>
                        <span className="text-xs text-accent font-mono whitespace-nowrap">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{edu.degree}</p>
                      <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded-full mb-3">
                        <span className="text-primary font-semibold text-sm font-mono">
                          {edu.grade}
                        </span>
                      </div>
                      {/* Hidden details on hover */}
                      <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                        <p className="text-xs text-muted-foreground/70 mt-1 border-t border-border/30 pt-2">
                          {edu.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
