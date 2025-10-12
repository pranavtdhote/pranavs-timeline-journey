import { Code, Database, Wrench, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillsData = {
  languages: {
    title: "Programming Languages",
    icon: Code,
    skills: ["Java", "Python", "C", "C++", "JavaScript", "HTML5", "CSS3", "SQL"],
  },
  frameworks: {
    title: "Frameworks & Libraries",
    icon: Globe,
    skills: ["Node.js", "Express.js", "React.js", "Bootstrap", "Tailwind CSS", "Java Swing", "OpenCV"],
  },
  databases: {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL", "Firebase"],
  },
  tools: {
    title: "Tools & Technologies",
    icon: Wrench,
    skills: ["Git", "GitHub", "JDBC", "RESTful APIs", "IoT (ESP32)", "Machine Learning", "NetBeans", "Vite", "Hardhat", "Solidity"],
  },
};

const softSkills = [
  "Communication",
  "Collaboration",
  "Time Management",
  "Adaptability",
  "Leadership",
  "Event Coordination",
  "Public Speaking",
  "Critical Thinking",
  "Problem Solving",
  "Data Analysis",
];

const languages = [
  { name: "English", level: "Native/Fluent" },
  { name: "Marathi", level: "Native" },
  { name: "Hindi", level: "Fluent" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold font-heading mb-12 animate-fade-in">
          Skills & Technologies
        </h2>

        {/* Technical Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {Object.entries(skillsData).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <Card key={key} className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-glow animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="bg-primary/5 border-primary/30 text-foreground hover:bg-primary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Soft Skills & Languages */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Soft Skills */}
          <Card className="p-6 bg-card border-border hover:border-accent/50 transition-all animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-accent">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="bg-accent/10 text-accent border-accent/30">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Languages */}
          <Card className="p-6 bg-card border-border hover:border-accent/50 transition-all animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-accent">Languages</h3>
            <div className="space-y-3">
              {languages.map((lang, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-foreground font-medium">{lang.name}</span>
                  <Badge variant="outline" className="bg-accent/5 border-accent/30 text-accent">
                    {lang.level}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
