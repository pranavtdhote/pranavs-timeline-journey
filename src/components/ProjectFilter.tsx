import { useEffect, useMemo, useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectFilterProps {
  projects: Array<{
    title: string;
    tech: string[];
    period: string;
  }>;
  onFilterChange: (filteredProjects: any[]) => void;
}

const ProjectFilter = ({ projects, onFilterChange }: ProjectFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTech = selectedTech.length === 0 || 
                         selectedTech.some(tech => project.tech.includes(tech));
      
      return matchesSearch && matchesTech;
    });
  }, [projects, searchTerm, selectedTech]);

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTech([]);
  };

  useEffect(() => {
    onFilterChange(filteredProjects);
  }, [filteredProjects, onFilterChange]);

  return (
    <div className="space-y-3 mb-8">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="grep -i 'project name or tech'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card border-border/50 font-mono text-sm"
          aria-label="Search projects"
        />
      </div>

      {/* Tech Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground">filter --tech:</span>
          {selectedTech.length > 0 && (
            <Button onClick={clearFilters} size="sm" variant="ghost" className="h-6 px-2 text-xs font-mono">
              <X className="w-3 h-3 mr-1" />
              clear
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {allTech.map(tech => (
            <Badge
              key={tech}
              variant={selectedTech.includes(tech) ? "default" : "outline"}
              className={`cursor-pointer transition-all font-mono text-xs ${
                selectedTech.includes(tech)
                  ? "bg-primary text-primary-foreground shadow-neon"
                  : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
              }`}
              onClick={() => toggleTech(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-muted-foreground font-mono">
        {filteredProjects.length}/{projects.length} projects
      </div>
    </div>
  );
};

export default ProjectFilter;
