import { motion } from "framer-motion";
import { FolderGit2, Calendar, LayoutGrid, Github, ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projectData";

const FeaturedProjects = () => {
  return (
    <section id="featured-projects" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FolderGit2 className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold font-mono">
                <span className="text-primary">~/</span>featured-projects
              </h2>
            </div>
            <p className="text-muted-foreground font-mono ml-11 text-sm md:text-base">Flagship applications and academic highlights.</p>
          </div>
        </motion.div>

        <div className="relative border-l border-primary/20 ml-4 md:ml-8 space-y-12 pb-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Node */}
              <div className="absolute top-1 -left-[17px] w-8 h-8 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
              </div>

              {/* Connecting Line Glow on Hover */}
              <div className="absolute top-8 left-[-1px] w-[2px] h-[calc(100%+2rem)] bg-gradient-to-b from-primary/0 via-primary/0 to-primary/0 group-hover:via-primary/30 transition-all duration-500" />

              <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-500 hover:border-primary/40 group-hover:-translate-y-1">
                {/* Background ambient glow */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
                
                <div className="relative z-10 flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                        <Calendar className="w-3 h-3" /> {project.period}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold font-mono text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground/90 font-mono text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-secondary/30 text-secondary-foreground border border-secondary/20">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="w-4 h-4" /> Source
                        </a>
                      )}
                      
                      <a 
                        href={`/projects/${project.slug}`} 
                        className="flex items-center gap-1.5 text-sm font-mono text-primary hover:text-white transition-colors ml-auto group/btn"
                      >
                        Details <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Icon/Visual block */}
                  <div className="hidden lg:flex w-48 h-48 shrink-0 bg-background/50 rounded-2xl border border-border/50 items-center justify-center text-6xl shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                      {project.icon}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
