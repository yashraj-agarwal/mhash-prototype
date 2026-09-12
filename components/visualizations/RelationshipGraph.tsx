"use client";
import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  { id: '1', position: { x: 400, y: 50 }, data: { label: 'Project NH-42' }, className: 'bg-card border-border text-foreground font-semibold px-4 py-2 rounded-md shadow-sm' },
  { id: '2', position: { x: 200, y: 150 }, data: { label: 'Award Snapshot' }, className: 'bg-anvaya-blue/10 border-anvaya-blue/30 text-anvaya-blue px-4 py-2 rounded-md border text-sm font-medium' },
  { id: '3', position: { x: 600, y: 150 }, data: { label: 'Current Facts' }, className: 'bg-accent border-border text-foreground px-4 py-2 rounded-md border text-sm font-medium' },
  { id: '4', position: { x: 100, y: 300 }, data: { label: 'Award Contract' }, className: 'bg-anvaya-green/10 border-anvaya-green/30 text-anvaya-green px-4 py-2 rounded-md border text-sm' },
  { id: '5', position: { x: 300, y: 300 }, data: { label: 'RA Bill #3' }, className: 'bg-anvaya-green/10 border-anvaya-green/30 text-anvaya-green px-4 py-2 rounded-md border text-sm' },
  { id: '6', position: { x: 800, y: 300 }, data: { label: 'Variation Order (Missing)' }, className: 'bg-anvaya-red/10 border-anvaya-red/30 text-anvaya-red px-4 py-2 rounded-md border text-sm font-bold' },
  { id: '7', position: { x: 550, y: 300 }, data: { label: 'Cost Variation (Event)' }, className: 'bg-anvaya-orange/10 border-anvaya-orange/30 text-anvaya-orange px-4 py-2 rounded-md border text-sm font-bold shadow-[0_0_15px_rgba(249,115,22,0.2)]' },
  { id: '8', position: { x: 400, y: 450 }, data: { label: 'Review Case ANV-482' }, className: 'bg-anvaya-red text-white border-anvaya-red px-6 py-3 rounded-md font-bold shadow-lg shadow-anvaya-red/20' },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: false },
  { id: 'e1-3', source: '1', target: '3', animated: false },
  { id: 'e2-4', source: '2', target: '4', animated: false },
  { id: 'e3-5', source: '3', target: '5', animated: false },
  { id: 'e3-7', source: '3', target: '7', animated: true },
  { id: 'e7-6', source: '7', target: '6', animated: true, style: { stroke: '#ef4444', strokeDasharray: '5,5', strokeWidth: 2 } },
  { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
];

export function RelationshipGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [focusedNode, setFocusedNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_: any, node: Node) => {
    setFocusedNode(prev => prev === node.id ? null : node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setFocusedNode(null);
  }, []);

  // Compute connected nodes
  const connectedNodes = new Set<string>();
  const connectedEdges = new Set<string>();

  if (focusedNode) {
    connectedNodes.add(focusedNode);
    edges.forEach(edge => {
      if (edge.source === focusedNode || edge.target === focusedNode) {
        connectedNodes.add(edge.source);
        connectedNodes.add(edge.target);
        connectedEdges.add(edge.id);
      }
    });
  }

  const dynamicNodes = nodes.map(n => ({
    ...n,
    style: {
      ...n.style,
      opacity: focusedNode ? (connectedNodes.has(n.id) ? 1 : 0.2) : 1,
      transition: 'opacity 0.3s ease'
    }
  }));

  const dynamicEdges = edges.map(e => ({
    ...e,
    style: {
      ...e.style,
      opacity: focusedNode ? (connectedEdges.has(e.id) ? 1 : 0.1) : 1,
      transition: 'opacity 0.3s ease'
    }
  }));

  return (
    <div className="w-full h-[600px] border border-border rounded-xl bg-accent/10 overflow-hidden shadow-inner relative">
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-medium border border-border">
        Click nodes to focus relationships
      </div>
      <ReactFlow
        nodes={dynamicNodes}
        edges={dynamicEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        <Controls className="bg-background border-border fill-foreground" />
        <MiniMap 
          nodeColor={(node) => {
            if (node.className?.includes('red')) return '#ef4444';
            if (node.className?.includes('orange')) return '#f97316';
            if (node.className?.includes('green')) return '#10b981';
            return '#3b82f6';
          }}
          maskColor="rgba(0,0,0,0.2)"
          className="bg-card border border-border"
        />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#555" />
      </ReactFlow>
    </div>
  );
}
