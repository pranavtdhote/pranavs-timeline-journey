import { Code2, ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Timeline from "./Timeline";
import { useState } from "react";

const projectsData = [
  {
    title: "Blockchain-Based Charity Donation Platform (CharityConnect)",
    period: "March – April 2025",
    tech: ["Solidity", "Hardhat", "Ethers.js", "React.js", "Tailwind CSS"],
    achievements: [
      "Built DApp for milestone-based fund release ensuring transparency in donations",
      "Developed smart contracts with real-time fund tracking and decentralized storage",
      "Implemented secure, trustless donation system with automated milestone-based releases",
    ],
    icon: "⛓️",
  },
  {
    title: "Java Online Quiz Application",
    period: "March 2025",
    tech: ["Java", "JSP", "Servlets", "MySQL", "Firebase"],
    achievements: [
      "Engineered quiz management system with session handling and result calculation",
      "Integrated Firebase + MySQL to store responses, leaderboard, and admin reports",
      "Implemented real-time leaderboard with comprehensive analytics dashboard",
    ],
    icon: "📝",
  },
  {
    title: "Garage Bill Generator & Management System",
    period: "March 2025",
    tech: ["React.js", "Vite", "Tailwind CSS", "MongoDB"],
    achievements: [
      "Developed bill generator with PDF export and invoice templates",
      "Implemented Customer & Service Management with CRUD operations",
      "Integrated local storage for offline functionality",
    ],
    icon: "🚗",
  },
  {
    title: "Railway Reservation System",
    period: "October 2024",
    tech: ["MySQL", "PL/SQL", "Lucidchart"],
    achievements: [
      "Designed comprehensive ER diagram and relational schema for railway ticket booking",
      "Implemented SQL queries, triggers, and PL/SQL procedures for reservation and cancellation",
      "Created automated reporting system for booking analytics",
    ],
    icon: "🚆",
  },
  {
    title: "Ticketing System",
    period: "October 2024",
    tech: ["C++", "Priority Queue", "Linked List"],
    achievements: [
      "Developed priority-based ticket booking system using data structures",
      "Implemented logic to prioritize elderly, differently-abled, and emergency cases",
      "Optimized queue operations for efficient ticket allocation",
    ],
    icon: "🎫",
  },
];

const ProjectsTimeline = () => {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  const toggleProject = (index: number) => {
    setExpandedProjects(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="projects" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-12 animate-fade-in">
          <Code2 className="w-8 h-8 text-accent" />
          <h2 className="text-4xl font-bold font-heading">Projects</h2>
        </div>

        <Timeline>
          {projectsData.map((project, index) => (
            <Timeline.Item key={index} side={index % 2 === 0 ? "right" : "left"}>
              <Card className="p-6 bg-card border-border hover:border-accent/50 transition-all hover:shadow-glow animate-fade-in-left">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{project.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                      <h3 className="text-xl font-semibold text-foreground pr-4">{project.title}</h3>
                      <span className="text-sm text-accent font-medium">{project.period}</span>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div className={`space-y-2 ${expandedProjects.includes(index) ? '' : 'max-h-20 overflow-hidden'}`}>
                      {project.achievements.map((achievement, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-accent mt-1">•</span>
                          <p className="text-sm text-muted-foreground">{achievement}</p>
                        </div>
                      ))}
                    </div>

                    {/* Expand/Collapse Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleProject(index)}
                      className="mt-3 text-primary hover:text-accent"
                    >
                      {expandedProjects.includes(index) ? "Show Less" : "Show More"}
                    </Button>
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

export default ProjectsTimeline;
