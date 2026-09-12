import { ALL_PROJECTS } from '@/data/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { RelationshipGraph } from '@/components/visualizations/RelationshipGraph';

export default async function GraphPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = ALL_PROJECTS.find(p => p.id === resolvedParams.id);
  
  if (!project) notFound();

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      <Link href={`/projects/${project.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project
      </Link>
      
      <div>
        <h1 className="text-4xl font-light tracking-tight">Knowledge Graph</h1>
        <p className="text-muted-foreground mt-2 font-light">
          Visualizing the relationships between entities, facts, and evidence.
        </p>
      </div>

      <RelationshipGraph />
    </div>
  );
}
