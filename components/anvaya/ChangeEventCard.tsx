"use client";
import { useState } from "react";
import { ChangeEvent } from "@/types";
import { ArrowRight, AlertTriangle, FileText, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  event: ChangeEvent;
}

export function ChangeEventCard({ event }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isHigh = event.severity === 'HIGH';

  return (
    <div 
      className={`border rounded-xl transition-colors cursor-pointer overflow-hidden ${isHigh ? 'border-anvaya-red/20 bg-anvaya-red/5 hover:bg-anvaya-red/10' : 'border-border bg-card hover:bg-accent/30'}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isHigh ? 'bg-anvaya-red/10 text-anvaya-red' : 'bg-anvaya-orange/10 text-anvaya-orange'}`}>
              {event.severity} SEVERITY
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{event.dimension}</div>
          </div>
          <h3 className="text-lg font-medium text-foreground">{event.title}</h3>
        </div>
        
        <div className="flex items-center gap-4 text-right">
          <div className="hidden md:block text-right">
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Delta</div>
            <div className={`text-base font-medium ${isHigh ? 'text-anvaya-red' : 'text-anvaya-orange'}`}>{event.delta}</div>
          </div>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border/50"
          >
            <div className="p-6 space-y-6">
              {/* Split Comparison */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 p-5 rounded-lg bg-background border border-border">
                <div className="flex-1">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-bold">Award Commitment</div>
                  <div className="text-lg font-light text-foreground">{event.before}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-30 hidden md:block" />
                <div className="flex-1">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-bold">Current Reality</div>
                  <div className={`text-lg font-medium ${isHigh ? 'text-anvaya-red' : 'text-anvaya-orange'}`}>{event.after}</div>
                </div>
              </div>

              {/* Intelligence Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Why detected</div>
                  <div className="text-sm text-foreground flex items-start gap-3 bg-accent/30 p-3 rounded-lg border border-border/50">
                    <AlertTriangle className="w-4 h-4 text-anvaya-orange shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{event.policyTriggered}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Evidence Analysis</div>
                  <div className="text-sm font-medium text-foreground flex flex-col gap-2 p-3 rounded-lg border border-border/50 bg-accent/30">
                    {event.evidenceId && (
                      <span className="flex items-center gap-2 text-anvaya-green">
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Supporting Evidence Available
                      </span>
                    )}
                    {event.missingEvidenceId && (
                      <span className="flex items-center gap-2 text-anvaya-red font-semibold">
                        <FileText className="w-4 h-4 shrink-0" /> Missing {event.missingEvidenceId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
