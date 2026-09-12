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
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="relative flex flex-col items-center z-20"
        >
          <div className="w-24 h-24 rounded-full bg-background border-4 border-anvaya-orange flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.15)] z-20">
            <Search className="w-8 h-8 text-anvaya-orange" />
          </div>
          <div className="absolute top-full mt-4 bg-background border border-border px-4 py-2 rounded-lg text-center shadow-lg w-48 z-30">
            <div className="text-[10px] font-bold uppercase tracking-widest text-anvaya-orange mb-1">Target Event</div>
            <div className="text-sm font-semibold">{changeEventTitle}</div>
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
                <div className={`absolute inset-0 ${node.isMissing ? 'bg-anvaya-red opacity-20' : 'bg-anvaya-green opacity-20'}`} />
              </div>
              
              <div className={`relative flex items-center gap-4 p-4 rounded-xl border bg-background transition-all ${hoveredNode === node.id ? 'scale-105 shadow-xl' : 'shadow-sm'} ${node.isMissing ? 'border-anvaya-red/30' : 'border-border'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${node.isMissing ? 'bg-anvaya-red/10 text-anvaya-red' : 'bg-anvaya-blue/10 text-anvaya-blue'}`}>
                  {node.isMissing ? <XCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${node.isMissing ? 'text-anvaya-red' : 'text-foreground'}`}>{node.title}</h4>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">{node.type}</p>
                </div>
                <div>
                  {node.isMissing ? (
                    <span className="px-2 py-1 rounded bg-anvaya-red/10 text-anvaya-red text-[10px] font-bold uppercase tracking-wider">Gap</span>
                  ) : (
                    <Link2 className="w-5 h-5 text-muted-foreground opacity-50" />
                  )}
                </div>
              </div>
              
              {/* Tooltip on hover */}
              {hoveredNode === node.id && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-64 bg-card border border-border p-4 rounded-lg shadow-xl z-50">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Evidence Metadata</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-muted-foreground">Status:</span> <span className={node.isMissing ? 'text-anvaya-red font-bold' : 'text-anvaya-green font-bold'}>{node.status}</span></div>
                    {!node.isMissing && <div className="flex justify-between"><span className="text-muted-foreground">Submitted:</span> <span>Just now</span></div>}
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
