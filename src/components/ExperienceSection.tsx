import { Briefcase, Users, TrendingUp, FileText, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ExperienceData {
  role: string;
  organization: string;
  location: string;
  period: string;
  responsibilities: string[];
  skills: string[];
  offerLetterUrl?: string;
  galleryImages?: { url: string; caption: string }[];
}

const experienceData: ExperienceData = {
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
  // Set these to real paths when you have the files:
  offerLetterUrl: "/PranavITSA.pdf",
  galleryImages: [
    // Add your real images here. Example:
    // { url: "/experience/team-photo.jpg", caption: "Team Meeting" },
    // { url: "/experience/event.jpg", caption: "Placement Drive 2025" },
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      caption: "Team Collaboration",
    },
    {
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
      caption: "Placement Drive Event",
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
      caption: "Workshop Session",
    },
    {
      url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
      caption: "Networking Event",
    },
  ],
};

const ExperienceSection = () => {
  const [showOfferLetter, setShowOfferLetter] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = experienceData.galleryImages || [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Briefcase className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold font-mono">
            <span className="text-primary">~/</span>experience
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="glass-panel rounded-xl p-6 md:p-8 hover:border-primary/20 transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground font-mono">
                      {experienceData.role}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      {experienceData.organization} • {experienceData.location}
                    </p>
                  </div>
                  <span className="text-xs text-accent font-mono whitespace-nowrap">
                    {experienceData.period}
                  </span>
                </div>

                <div className="mt-4 mb-4">
                  <h4 className="text-xs font-mono text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    // key responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {experienceData.responsibilities.map((resp, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-accent font-mono mt-0.5">▸</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-mono text-primary mb-2 uppercase tracking-wider">
                    // skills developed
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {experienceData.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-accent/10 text-accent border-accent/20 font-mono text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Offer Letter Button */}
                {experienceData.offerLetterUrl && (
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="border-secondary/30 hover:bg-secondary/10 hover:border-secondary/60 font-mono text-sm gap-2"
                      onClick={() => setShowOfferLetter(true)}
                    >
                      <FileText className="w-4 h-4" /> View Offer Letter
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Slider */}
            {images.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border/30">
                <h4 className="text-xs font-mono text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
                  📸 // gallery
                </h4>
                <div className="relative overflow-hidden rounded-xl group">
                  {/* Slide */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full aspect-video rounded-xl overflow-hidden"
                    >
                      <img
                        src={images[currentSlide].url}
                        alt={images[currentSlide].caption}
                        className="w-full h-full object-cover"
                      />
                      {/* Caption overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white text-sm font-mono">
                          {images[currentSlide].caption}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Dot Indicators */}
                  {images.length > 1 && (
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentSlide(i)}
                          className={`w-2 h-2 rounded-full transition-all ${i === currentSlide
                            ? "bg-white w-5"
                            : "bg-white/40 hover:bg-white/60"
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Offer Letter Modal */}
      <AnimatePresence>
        {showOfferLetter && experienceData.offerLetterUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/70 backdrop-blur-xl"
            onClick={() => setShowOfferLetter(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-4xl h-[85vh] flex flex-col glass-panel rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-border/50 flex justify-between items-center bg-card/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-secondary" />
                  <h3 className="font-mono text-foreground text-sm font-semibold">
                    Offer Letter
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => setShowOfferLetter(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1">
                <iframe
                  src={experienceData.offerLetterUrl}
                  className="w-full h-full border-0"
                  title="Offer Letter"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;
