import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import Timeline from "./Timeline";

const educationData = [
  {
    institution: "AISSMS Institute of Information Technology, Pune",
    degree: "B.Tech - Information Technology",
    period: "2023 – 2027",
    grade: "CGPA: 9.02/10.0",
    icon: "🎓",
  },
  {
    institution: "JVM Mahavidyalaya, Devgram",
    degree: "Higher Secondary Certificate (HSC), Science Stream",
    period: "2021 – 2023",
    grade: "Percentage: 72%",
    icon: "📚",
  },
  {
    institution: "New Orange City Convent, Warud",
    degree: "Central Board of Secondary Education (CBSE)",
    period: "2011 – 2021",
    grade: "Percentage: 94%",
    icon: "🏫",
  },
];

const EducationTimeline = () => {
  return (
    <section id="education" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-12 animate-fade-in">
          <GraduationCap className="w-8 h-8 text-accent" />
          <h2 className="text-4xl font-bold font-heading">Education</h2>
        </div>

        <Timeline>
          {educationData.map((edu, index) => (
            <Timeline.Item key={index} side={index % 2 === 0 ? "right" : "left"}>
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-glow animate-fade-in-left">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{edu.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <h3 className="text-xl font-semibold text-foreground">{edu.institution}</h3>
                      <span className="text-sm text-accent font-medium">{edu.period}</span>
                    </div>
                    <p className="text-muted-foreground mb-2">{edu.degree}</p>
                    <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
                      <span className="text-primary font-semibold">{edu.grade}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </section>
  );
};

export default EducationTimeline;
