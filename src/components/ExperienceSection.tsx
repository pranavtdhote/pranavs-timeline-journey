import { Briefcase, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Timeline from "./Timeline";

const experienceData = {
  role: "Training & Placement Secretary",
  organization: "ITSA-AISSMS IOIT",
  location: "Pune, India",
  period: "August 2025 – Present",
  responsibilities: [
    "Represent IT department in Training & Placement activities",
    "Connect students with recruiters and industry professionals",
    "Coordinate placement drives and training sessions",
    "Facilitate communication between students and companies",
  ],
  skills: [
    "Leadership",
    "Team Management",
    "Event Coordination",
    "Public Speaking",
    "Communication",
    "Analytical Thinking",
  ],
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-12 animate-fade-in">
          <Briefcase className="w-8 h-8 text-accent" />
          <h2 className="text-4xl font-bold font-heading">Professional Experience</h2>
        </div>

        <Timeline>
          <Timeline.Item side="right">
            <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-glow animate-fade-in-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-timeline flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">{experienceData.role}</h3>
                      <p className="text-muted-foreground">{experienceData.organization} • {experienceData.location}</p>
                    </div>
                    <span className="text-sm text-accent font-medium">{experienceData.period}</span>
                  </div>

                  <div className="mt-4 mb-4">
                    <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {experienceData.responsibilities.map((resp, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-accent mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-primary mb-2">Skills Developed</h4>
                    <div className="flex flex-wrap gap-2">
                      {experienceData.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-accent/10 text-accent border-accent/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Timeline.Item>
        </Timeline>
      </div>
    </section>
  );
};

export default ExperienceSection;
