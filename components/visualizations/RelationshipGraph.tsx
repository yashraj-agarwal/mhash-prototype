"use client";

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from '@/lib/utils';
import type { AnvayaEdge, AnvayaNode, AnvayaNodeData, GraphKind } from '@/lib/graph/buildGraph';

const kindClass: Record<GraphKind, string> = {
  jurisdiction: 'bg-card border-border text-muted-foreground',
  project: 'bg-card border-primary/40 text-foreground font-semibold',
  award: 'bg-secondary border-border text-foreground',
  party: 'bg-card border-border text-foreground',
  obligation: 'bg-secondary/60 border-border text-foreground',
  fact: 'bg-card border-border text-foreground',
  change: 'bg-card border-foreground/40 text-foreground font-semibold',
  evidence: 'bg-card border-border text-foreground',
  gap: 'bg-secondary border-dashed border-foreground/30 text-foreground',
  case: 'bg-primary text-primary-foreground border-primary font-semibold',
  policy: 'bg-card border-border text-muted-foreground',
};

const kindColor: Record<GraphKind, string> = {
  jurisdiction: '#86868b',
  project: '#0071e3',
  award: '#1d1d1f',
  party: '#0071e3',
  obligation: '#86868b',
  fact: '#86868b',
  change: '#1d1d1f',
  evidence: '#10b981',
  gap: '#ef4444',
  case: '#0071e3',
  policy: '#86868b',
};

function withKindClass(nodes: AnvayaNode[]): AnvayaNode[] {
  return nodes.map((node) => ({
    ...node,
    className: cn(
      'px-3 py-2 rounded-lg border text-[12px] shadow-sm max-w-[220px]',
      kindClass[node.data.kind],
    ),
  }));
}

export function RelationshipGraph({
  nodes,
  edges,
  className,
}: {
  nodes: AnvayaNode[];
  edges: AnvayaEdge[];
  className?: string;
}) {
  const router = useRouter();
  const [focusedNode, setFocusedNode] = useState<string | null>(null);
  const styledNodes = useMemo(() => withKindClass(nodes), [nodes]);

  const onNodeClick = useCallback((_: unknown, node: Node<AnvayaNodeData>) => {
    setFocusedNode((prev) => (prev === node.id ? null : node.id));
  }, []);

  const onPaneClick = useCallback(() => setFocusedNode(null), []);

  const connectedNodes = new Set<string>();
  const connectedEdges = new Set<string>();
  if (focusedNode) {
    connectedNodes.add(focusedNode);
    edges.forEach((edge) => {
      if (edge.source === focusedNode || edge.target === focusedNode) {
        connectedNodes.add(edge.source);
        connectedNodes.add(edge.target);
        connectedEdges.add(edge.id);
      }
    });
  }

  const selected = styledNodes.find((n) => n.id === focusedNode);

  const dynamicNodes = styledNodes.map((n) => ({
    ...n,
    style: {
      ...n.style,
      opacity: focusedNode ? (connectedNodes.has(n.id) ? 1 : 0.18) : 1,
      transition: 'opacity 0.25s ease',
    },
  }));

  const dynamicEdges = edges.map((e) => ({
    ...e,
    style: {
      ...e.style,
      opacity: focusedNode ? (connectedEdges.has(e.id) ? 1 : 0.08) : 1,
      transition: 'opacity 0.25s ease',
    },
  }));

  return (
    <div className={cn('w-full h-[70vh] min-h-[520px] border border-border rounded-xl bg-accent/10 overflow-hidden shadow-inner relative', className)}>
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-medium border border-border">
        Click a node to isolate its edges
      </div>
      {selected && (
        <div className="absolute top-4 right-4 z-10 w-64 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{selected.data.kind}</div>
          <div className="text-[14px] font-semibold mt-1 leading-snug">{selected.data.label}</div>
          {selected.data.subtitle && (
            <div className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{selected.data.subtitle}</div>
          )}
          {selected.data.meta && (
            <div className="text-[11px] text-muted-foreground mt-2">{selected.data.meta}</div>
          )}
          {selected.data.href && (
            <button
              type="button"
              onClick={() => router.push(selected.data.href!)}
              className="mt-3 text-[12px] font-semibold text-primary hover:underline"
            >
              Open record
            </button>
          )}
        </div>
      )}
      <ReactFlow
        nodes={dynamicNodes}
        edges={dynamicEdges}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodesConnectable={false}
        elementsSelectable
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Controls className="bg-background border-border fill-foreground" />
        <MiniMap
          nodeColor={(node) => kindColor[(node.data as AnvayaNodeData).kind] ?? '#3b82f6'}
          maskColor="rgba(0,0,0,0.12)"
          className="bg-card border border-border"
        />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#555" />
      </ReactFlow>
    </div>
  );
}
