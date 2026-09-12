import { ALL_PROJECTS } from '@/data/mockData';
import { ProjectCard } from '@/components/anvaya/ProjectCard';

export default function ProjectsPage() {
  return (
    <div className="p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-light tracking-tight">Active Projects</h1>
        <p className="text-lg text-muted-foreground mt-3 font-light">Monitor all ongoing public works and their alignment scores.</p>
      </div>
      
      <div className="flex flex-col gap-4">
        {ALL_PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
