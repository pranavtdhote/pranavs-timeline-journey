import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Download, X, Award } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Paper {
  id: string;
  title: string;
  abstract: string;
  tech: string[];
  status: string;
  pdfUrl?: string;
  certificateUrl?: string;
}

const researchPapers: Paper[] = [
  {
    id: "blockchain-charity",
    title: "Beyond Trust: Blockchain Enabled Transparent Charity System",
    abstract: "This paper proposes a blockchain-based charity donation system that enhances transparency, security, and trust in philanthropic activities. Using Ethereum smart contracts, the system eliminates intermediaries and enables direct donations with immutable transaction records. It introduces milestone-based fund release mechanisms to ensure accountability and proper fund utilization. The platform integrates React.js for the frontend and Ethers.js for blockchain interaction, providing a seamless and transparent donation experience.",
    tech: ["Blockchain", "Ethereum", "Solidity", "React.js", "Ethers.js", "Web3", "Hardhat"],
    status: "Published",
    pdfUrl: "/Paper24814 (1).pdf",
    certificateUrl: "/814-2.pdf",
  },
  {
    id: "genai-financial-analysis",
    title: "GenAI-Driven Intelligent System for Automated Financial Report Analysis and Insight Generation Using Large Language Models and Knowledge Graphs",
    abstract: "This paper presents a GenAI-powered intelligent system for automated financial report analysis using Large Language Models (LLMs), Natural Language Processing (NLP), and Knowledge Graphs. The system transforms unstructured PDF financial reports into structured data, performs multi-year financial analysis, generates investor-friendly insights, and ensures reliability through a hallucination guard mechanism. It integrates FastAPI and Next.js for a full-stack architecture and enables explainable AI through dynamic knowledge graphs, improving accuracy, transparency, and efficiency in financial decision-making.",
    tech: ["Python", "FastAPI", "Next.js", "NLP", "LLMs", "Knowledge Graphs", "spaCy", "OCR", "Groq API"],
    status: "Under-Review",
    pdfUrl: "",
    certificateUrl: "",
  }
];

type ModalView = "paper" | "certificate";

const ResearchSection = () => {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [modalView, setModalView] = useState<ModalView>("paper");

  // Stop body scroll when modal open
  if (selectedPaper) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const activeUrl = selectedPaper
    ? modalView === "paper"
      ? selectedPaper.pdfUrl
      : selectedPaper.certificateUrl
    : "";

  return (
    <section id="research" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <BookOpen className="w-8 h-8 text-secondary" />
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground">
            <span className="text-secondary">~/</span>research-papers
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {researchPapers.map((paper, idx) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl cursor-pointer hover:-translate-y-2 transition-transform duration-500 overflow-hidden group relative"
              onClick={() => {
                setSelectedPaper(paper);
                setModalView("paper");
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-glow">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  {paper.certificateUrl && (
                    <span className="text-xs font-mono px-2 py-1 rounded-full border bg-accent/10 text-accent border-accent/20 flex items-center gap-1">
                      <Award className="w-3 h-3" /> Certified
                    </span>
                  )}
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${paper.status === "Published" ? "bg-primary/10 text-primary border-primary/20" : "bg-accent/10 text-accent border-accent/20"}`}>
                    {paper.status}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                {paper.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                {paper.abstract}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {paper.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-muted-foreground bg-background/50 px-2 py-1 rounded-md border border-border/50">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen PDF / Certificate Modal Viewer */}
        <AnimatePresence>
          {selectedPaper && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-10 bg-background/60"
              onClick={() => setSelectedPaper(null)}
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
                    <h3 className="font-mono text-foreground text-sm font-semibold truncate max-w-[200px] md:max-w-md">
                      {modalView === "paper" ? `${selectedPaper.id}.pdf` : `${selectedPaper.id}-certificate.pdf`}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Toggle buttons */}
                    {selectedPaper.pdfUrl && (
                      <Button
                        variant={modalView === "paper" ? "default" : "ghost"}
                        size="sm"
                        className="h-8 font-mono text-xs"
                        onClick={() => setModalView("paper")}
                      >
                        <FileText className="w-3.5 h-3.5 mr-1" /> Paper
                      </Button>
                    )}
                    {selectedPaper.certificateUrl && (
                      <Button
                        variant={modalView === "certificate" ? "default" : "ghost"}
                        size="sm"
                        className="h-8 font-mono text-xs"
                        onClick={() => setModalView("certificate")}
                      >
                        <Award className="w-3.5 h-3.5 mr-1" /> Certificate
                      </Button>
                    )}
                    {activeUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 hover:bg-secondary/20 hover:text-secondary font-mono"
                        asChild
                      >
                        <a href={activeUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-1" /> Download
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
                      onClick={() => setSelectedPaper(null)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto relative bg-zinc-900/50">
                  {activeUrl ? (
                    <iframe
                      src={activeUrl}
                      className="w-full h-full border-0"
                      title={modalView === "paper" ? "Research Paper" : "Certificate"}
                    />
                  ) : (
                    /* Fallback: show abstract when no PDF is attached */
                    <div className="p-6 md:p-12 max-w-2xl mx-auto space-y-6 text-foreground/90 font-serif text-lg leading-relaxed">
                      <h1 className="text-3xl font-bold font-sans text-center mb-8 border-b border-border/50 pb-6 text-foreground">
                        {selectedPaper.title}
                      </h1>

                      <div className="text-center text-sm text-muted-foreground font-mono mb-6 p-4 rounded-lg bg-secondary/5 border border-secondary/10">
                        📄 PDF not attached yet. Add the PDF path to the{" "}
                        <code className="text-primary">{modalView === "paper" ? "pdfUrl" : "certificateUrl"}</code>
                        {" "}field in <code className="text-primary">ResearchSection.tsx</code>
                      </div>

                      <h2 className="text-xl font-bold font-sans text-primary">Abstract</h2>
                      <p className="text-justify">{selectedPaper.abstract}</p>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                        {selectedPaper.tech.map((t, i) => (
                          <span key={i} className="text-xs font-mono text-muted-foreground bg-background/50 px-2 py-1 rounded-md border border-border/50">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ResearchSection;
