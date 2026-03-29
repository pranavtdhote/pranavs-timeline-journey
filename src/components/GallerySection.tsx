import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Maximize2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: "Event" | "Project" | "Certificate";
  height: string; // Tailored for masonry
}

const galleryData: GalleryImage[] = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    caption: "Hackathon Winning Moment 2024",
    category: "Event",
    height: "h-64",
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    caption: "Coding Late Night",
    category: "Project",
    height: "h-96",
  },
  {
    id: "img3",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
    caption: "Tech Conference Speaker",
    category: "Event",
    height: "h-72",
  },
  {
    id: "img4",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    caption: "Machine Learning Workshop",
    category: "Event",
    height: "h-80",
  },
  {
    id: "img5",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    caption: "Data Analytics Setup",
    category: "Project",
    height: "h-64",
  },
  {
    id: "img6",
    url: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=800&auto=format&fit=crop",
    caption: "AWS Architecture Setup",
    category: "Certificate",
    height: "h-96",
  },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Stop background scrolling
  if (selectedImage) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <section id="gallery" className="py-20 px-4" data-cursor="gallery">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <ImageIcon className="w-8 h-8 text-secondary" />
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground">
            <span className="text-secondary">~/</span>gallery
          </h2>
        </motion.div>

        {/* Masonry CSS Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryData.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in group glass-panel ${img.height}`}
              onClick={() => setSelectedImage(img)}
            >
              {/* Image */}
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out mix-blend-luminosity hover:mix-blend-normal opacity-70 hover:opacity-100"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-mono text-secondary bg-secondary/10 border border-secondary/20 px-2 py-1 rounded inline-block mb-2">
                    {img.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground font-mono leading-tight">
                    {img.caption}
                  </h3>
                </div>
                <Maximize2 className="absolute top-4 right-4 w-5 h-5 text-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm cursor-zoom-out"
              onClick={() => setSelectedImage(null)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 z-50 text-white hover:bg-white/20 hover:text-white rounded-full bg-black/50"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X className="w-6 h-6" />
              </Button>

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-w-5xl max-h-full rounded-lg overflow-hidden flex flex-col items-center justify-center pointer-events-none"
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-white font-mono text-sm">{selectedImage.caption}</span>
                  <span className="text-white/50 text-xs ml-2">[{selectedImage.category}]</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
