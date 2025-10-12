import { Github, Linkedin, Mail, Phone, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const handleDownloadResume = () => {
    // This will be implemented to download the resume
    window.open("/Pranav_Dhote_Resume.pdf", "_blank");
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Profile Image Placeholder */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-timeline p-1 animate-scale-in">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <span className="text-4xl font-bold font-heading text-primary">PD</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            Pranav Dhote
          </h1>

          <p className="text-xl md:text-2xl text-accent font-semibold mb-4 animate-fade-in delay-100">
            AI-powered Full-Stack Developer | Building Future-ready Solutions
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
            Information Technology Student passionate about creating innovative solutions through AI, Blockchain, and Full-Stack Development. 
            Driven to solve real-world challenges with cutting-edge technology.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in delay-300">
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Pune, India</span>
            </div>
            <a href="tel:+918446432484" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors">
              <Phone className="w-4 h-4 text-accent" />
              <span>+91 8446432484</span>
            </a>
            <a href="mailto:pranavtdhote@gmail.com" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors">
              <Mail className="w-4 h-4 text-accent" />
              <span>pranavtdhote@gmail.com</span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in delay-500">
            <Button 
              onClick={handleDownloadResume}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
            <Button 
              variant="outline"
              size="lg"
              asChild
              className="border-primary/50 hover:bg-primary/10"
            >
              <a href="https://linkedin.com/in/pranav-dhote" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              asChild
              className="border-accent/50 hover:bg-accent/10"
            >
              <a href="https://github.com/pranavtdhote" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
