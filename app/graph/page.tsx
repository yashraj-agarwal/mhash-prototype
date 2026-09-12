import { Network } from 'lucide-react';

export default function KnowledgeGraphPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full space-y-4 p-8">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Network className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Knowledge Graph Explorer</h1>
      <p className="text-muted-foreground text-center max-w-md">
        This module is currently in development. It will provide a visual interface to explore relationships between projects, contractors, and material variations across the entire temporal knowledge graph.
      </p>
    </div>
  );
}
