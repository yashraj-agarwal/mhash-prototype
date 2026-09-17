import { ALL_PROJECTS } from '@/data/mockData';
import { buildGlobalGraph } from '@/lib/graph/buildGraph';
import { RelationshipGraph } from '@/components/visualizations/RelationshipGraph';

export default function KnowledgeGraphPage() {
  const { nodes, edges } = buildGlobalGraph(ALL_PROJECTS);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 pb-28">
      <div>
        <h1 className="text-4xl font-light tracking-tight">Knowledge Graph</h1>
        <p className="text-muted-foreground mt-2 font-light max-w-2xl">
          One graph, jurisdiction-scoped views. Projects, contractors, and open review cases from the current mock store.
        </p>
      </div>
      <RelationshipGraph nodes={nodes} edges={edges} className="h-[calc(100dvh-220px)]" />
    </div>
  );
}
