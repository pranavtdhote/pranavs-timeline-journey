import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificationsData, Certification } from "@/data/certData";
import { ExternalLink, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Close modal on escape key
  if (selectedCert) {
    window.onkeydown = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
  }

  return (
    <section id="certifications" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-2xl">📜</span>
          <h2 className="text-2xl md:text-3xl font-bold font-mono">
            <span className="text-secondary">~/</span>certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer tilt-card h-full"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="glow-border h-full glass-panel rounded-xl p-6 flex flex-col items-center text-center transition-all duration-500 relative overflow-hidden">
                {/* Background ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {cert.icon}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors relative z-10 leading-tight">
                  {cert.title}
                </h3>

                <p className="text-sm text-muted-foreground font-mono mb-1 relative z-10">
                  {cert.organization}
                </p>
                <p className="text-xs text-accent font-mono mb-4 relative z-10">
                  {cert.date}
                </p>

                <div className="mt-auto pt-4 w-full relative z-10">
                  <div className="text-xs text-primary/80 font-mono flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    view credential <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Viewer */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/70 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-5xl h-[85vh] flex flex-col md:flex-row glass-panel rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Sidebar Info */}
              <div className="md:w-1/3 border-r border-border/50 bg-card/30 flex flex-col items-center text-center p-8 overflow-y-auto">
                <div className="w-full flex justify-end md:hidden mb-4">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCert(null)} className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive">
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="text-8xl mb-6 relative">
                  {selectedCert.icon}
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse" />
                </div>

                <h2 className="text-2xl font-bold font-mono mb-2">
                  {selectedCert.title}
                </h2>

                <p className="text-sm text-muted-foreground mb-1">
                  Issued by <span className="text-foreground font-semibold">{selectedCert.organization}</span>
                </p>

                <p className="text-xs text-accent font-mono mb-8 border border-accent/20 bg-accent/10 px-3 py-1 rounded-full inline-block mt-2">
                  Earned: {selectedCert.date}
                </p>

                {selectedCert.credentialId && (
                  <div className="w-full text-left bg-background/50 p-3 rounded-lg border border-border/50 mb-8">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Credential ID</p>
                    <p className="text-sm text-foreground font-mono truncate">{selectedCert.credentialId}</p>
                  </div>
                )}

                <div className="w-full flex-wrap flex justify-center gap-2 mt-auto">
                  {selectedCert.skills.map(skill => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right PDF Viewer Area */}
              <div className="md:w-2/3 flex flex-col bg-zinc-900/50">
                {/* Header Toolbar */}
                <div className="p-3 border-b border-border/50 flex justify-between items-center bg-card/50">
                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground truncate px-2">
                    <span className="text-primary truncate">{selectedCert.id}.pdf</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {selectedCert.pdfUrl && (
                      <Button variant="ghost" size="sm" className="h-8 hover:bg-secondary/20 hover:text-secondary font-mono" asChild>
                        <a href={selectedCert.pdfUrl} target="_blank" rel="noopener noreferrer" download>
                          <Download className="w-4 h-4 mr-2" /> Download
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive hidden md:flex"
                      onClick={() => setSelectedCert(null)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Real PDF Canvas */}
                <div className="flex-1 w-full h-full bg-black/40 relative">
                  {selectedCert.pdfUrl ? (
                    <iframe
                      src={`${selectedCert.pdfUrl}#view=FitH`}
                      className="w-full h-full border-0 absolute inset-0"
                      title={`${selectedCert.title} Certificate`}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-8">
                      <div className="text-6xl mb-4 opacity-30 grayscale">{selectedCert.icon}</div>
                      <p className="font-mono text-sm">PDF document not attached.</p>
                      <p className="font-mono text-xs opacity-50 mt-2">Add `pdfUrl: "/path/to/cert.pdf"` in certData.ts</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;
