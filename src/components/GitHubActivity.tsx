import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { Activity, GitCommit } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const GitHubActivity = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="activity" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold font-mono">
                <span className="text-primary">~/</span>github-activity
              </h2>
            </div>
            <p className="text-muted-foreground font-mono ml-11 text-sm md:text-base">Real-time commit heatmap.</p>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-8 self-start border-b border-border/50 pb-4 w-full">
            <GitCommit className="w-5 h-5 text-accent" />
            <h3 className="font-mono text-lg text-foreground">@pranavtdhote Contributions</h3>
          </div>

          <div className="overflow-x-auto w-full max-w-full pb-4 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent flex justify-center">
            <div className="min-w-fit pr-4">
              <GitHubCalendar 
                username="pranavtdhote" 
                colorScheme="dark"
                theme={{
                  dark: ['hsl(215 25% 15%)', 'hsl(185 100% 15%)', 'hsl(185 100% 25%)', 'hsl(185 100% 40%)', 'hsl(185 100% 50%)']
                }}
                fontSize={14}
                blockSize={12}
                blockMargin={5}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
