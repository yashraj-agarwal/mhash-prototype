import { ALL_PROJECTS } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { ProjectIntelligenceHero } from '@/components/anvaya/ProjectIntelligenceHero';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = ALL_PROJECTS.find(p => p.id === resolvedParams.id);
  
  if (!project) notFound();

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <ProjectIntelligenceHero project={project} />
    </div>
  );
}
