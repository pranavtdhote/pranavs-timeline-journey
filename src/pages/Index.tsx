import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TerminalSection from "@/components/TerminalSection";
import EducationTimeline from "@/components/EducationTimeline";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProjectsGrid from "@/components/ProjectsGrid";
import CertificationsSection from "@/components/CertificationsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import FloatingResumeButton from "@/components/FloatingResumeButton";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import StatsCounters from "@/components/StatsCounters";
import CustomCursor from "@/components/CustomCursor";
import ThreeBackground from "@/components/ThreeBackground";
import BugCrawler from "@/components/BugCrawler";
import FloatingCommits from "@/components/FloatingCommits";
// GallerySection removed
import LoadingScreen from "@/components/LoadingScreen";
import ScrollAnimator from "@/components/ScrollAnimator";
import ResearchSection from "@/components/ResearchSection";
import CodingProfilesSection from "@/components/CodingProfilesSection";
import GitHubActivity from "@/components/GitHubActivity";
import CommandPalette from "@/components/CommandPalette";
import { useState } from "react";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen relative">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {/* Background effects */}
      <ThreeBackground />
      <FloatingCommits />
      <CustomCursor />
      <BugCrawler />

      {/* UI layer */}
      <ScrollProgress />
      <Navigation />
      <CommandPalette />

      <main id="home" className="relative z-10 flex flex-col gap-20 overflow-hidden pb-20 w-full max-w-[100vw]">
        <ScrollAnimator isHero={true}>
          <Hero />
        </ScrollAnimator>
        
        <ScrollAnimator>
          <TerminalSection />
        </ScrollAnimator>

        <ScrollAnimator>
          <FeaturedProjects />
        </ScrollAnimator>

        <ScrollAnimator>
          <SkillsSection />
        </ScrollAnimator>

        <ScrollAnimator>
          <ExperienceSection />
        </ScrollAnimator>
        
        <div id="projects-wrapper">
          <ScrollAnimator>
            <ProjectsGrid />
          </ScrollAnimator>
        </div>
        
        <ScrollAnimator>
          <EducationTimeline />
        </ScrollAnimator>

        <ScrollAnimator>
          <ResearchSection />
        </ScrollAnimator>
        
        <ScrollAnimator>
          <CertificationsSection />
        </ScrollAnimator>

        <ScrollAnimator>
          <CodingProfilesSection />
        </ScrollAnimator>



        <ScrollAnimator>
          <StatsCounters />
        </ScrollAnimator>
        
        <ScrollAnimator>
          <GitHubActivity />
        </ScrollAnimator>
        
        <ScrollAnimator>
          <ContactSection />
        </ScrollAnimator>
      </main>

      <FloatingResumeButton />
      <BackToTop />

      <footer className="py-8 border-t border-border/30 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-xs font-mono">
            © 2025 Pranav Dhote. Built with React, TypeScript & Tailwind CSS.
          </p>
          <p className="text-muted-foreground/50 text-xs font-mono mt-1">
            {"<"}/{">"} with ❤️ from Pune, India
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
