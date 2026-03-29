import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const FloatingResumeButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleDownload = () => {
    window.open("/Pranav_Dhote_Resume.pdf", "_blank");
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={handleDownload}
          className="fixed bottom-24 right-8 z-40 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow animate-glow-pulse rounded-full w-14 h-14 p-0"
          aria-label="Download Resume"
        >
          <Download className="w-6 h-6" />
        </Button>
      )}
    </>
  );
};

export default FloatingResumeButton;
