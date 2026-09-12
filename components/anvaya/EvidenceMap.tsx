"use client";
import { Evidence } from "@/types";
import { motion } from "framer-motion";
import { FileText, Link2, XCircle, Search } from "lucide-react";
import { useState } from "react";

interface Props {
  changeEventTitle: string;
  available: Evidence[];
  missing: Evidence[];
}

export function EvidenceMap({ changeEventTitle, available, missing }: Props) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    ...available.map(e => ({ ...e, isMissing: false })),
    ...missing.map(e => ({ ...e, isMissing: true }))
  ];

  return (
    <div className="relative w-full min-h-[500px] bg-accent/10 border border-border rounded-2xl p-8 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 h-full">
        
        {/* Central Node */}
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
          className="relative flex flex-col items-center z-20"
        >
          <div className="w-24 h-24 rounded-full bg-card border-[3px] border-primary flex items-center justify-center shadow-sm z-20">
            <Search className="w-8 h-8 text-primary" />
          </div>
          <div className="absolute top-full mt-4 bg-card border border-border px-4 py-2.5 rounded-xl text-center shadow-sm w-48 z-30">
            <div className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-1">Target Event</div>
            <div className="text-[14px] font-semibold tracking-tight text-foreground leading-tight">{changeEventTitle}</div>
          </div>
        </motion.div>

        {/* Evidence Nodes */}
        <div className="flex flex-col gap-8 w-full max-w-md z-10">
          {nodes.map((node, i) => (
            <motion.div 
              key={node.id}
              initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.15 }}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
              className="relative group cursor-pointer"
            >
              {/* Connection Line */}
              <div className="absolute top-1/2 right-full w-16 h-px bg-border -translate-y-1/2">
                <div className={`absolute inset-0 ${node.isMissing ? 'bg-destructive opacity-30' : 'bg-primary opacity-30'}`} />
              </div>
              
              <div className={`relative flex items-center gap-4 p-4 rounded-2xl border bg-card transition-all ${hoveredNode === node.id ? 'scale-[1.02] shadow-md' : 'shadow-sm'} ${node.isMissing ? 'border-destructive/30' : 'border-border'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${node.isMissing ? 'bg-destructive/10 text-destructive' : 'bg-secondary text-foreground'}`}>
                  {node.isMissing ? <XCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <h4 className={`text-[14px] font-semibold tracking-tight ${node.isMissing ? 'text-destructive' : 'text-foreground'}`}>{node.title}</h4>
                  <p className="text-[11px] font-medium text-muted-foreground tracking-tight mt-1">{node.type}</p>
                </div>
                <div>
                  {node.isMissing ? (
                    <span className="px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-[11px] font-semibold tracking-tight">Gap</span>
                  ) : (
                    <Link2 className="w-5 h-5 text-muted-foreground opacity-50" />
                  )}
                </div>
              </div>
              
              {/* Tooltip on hover */}
              {hoveredNode === node.id && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-64 bg-card border border-border p-5 rounded-2xl shadow-lg z-50">
                  <div className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-3">Evidence Metadata</div>
                  <div className="space-y-3 text-[13px] font-medium">
                    <div className="flex justify-between items-center border-b border-border/50 pb-2"><span className="text-muted-foreground">Status</span> <span className={node.isMissing ? 'text-destructive font-semibold' : 'text-foreground font-semibold'}>{node.status}</span></div>
                    {!node.isMissing && <div className="flex justify-between items-center pt-1"><span className="text-muted-foreground">Submitted</span> <span className="font-semibold text-foreground">Just now</span></div>}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
