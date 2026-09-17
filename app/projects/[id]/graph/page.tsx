import { ALL_PROJECTS } from '@/data/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { RelationshipGraph } from '@/components/visualizations/RelationshipGraph';
import { buildProjectGraph } from '@/lib/graph/buildGraph';

export default async function GraphPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = ALL_PROJECTS.find((p) => p.id === resolvedParams.id);

  if (!project) notFound();

  const { nodes, edges } = buildProjectGraph(project);

  return (
    <div className="p-10 max-w-[1400px] mx-auto space-y-8 pb-28">
      <Link href={`/projects/${project.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project
      </Link>

      <div>
        <h1 className="text-4xl font-light tracking-tight">{project.name}</h1>
        <p className="text-muted-foreground mt-2 font-light">
          Award snapshot, parties, obligations, facts, change events, evidence, and the review case on one graph.
        </p>
      </div>

      <RelationshipGraph nodes={nodes} edges={edges} />
    </div>
  );
}
