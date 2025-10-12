import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import EducationTimeline from "@/components/EducationTimeline";
import ProjectsTimeline from "@/components/ProjectsTimeline";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import FloatingResumeButton from "@/components/FloatingResumeButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="home">
        <Hero />
        <EducationTimeline />
        <ProjectsTimeline />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <FloatingResumeButton />
      
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Pranav Dhote. Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
