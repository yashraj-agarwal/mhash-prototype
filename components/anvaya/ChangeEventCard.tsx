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
      className={`border rounded-2xl transition-colors cursor-pointer overflow-hidden ${isHigh ? 'border-destructive/20 bg-destructive/5 hover:bg-destructive/10' : 'border-border bg-card hover:bg-secondary/30'}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-tight ${isHigh ? 'bg-destructive/10 text-destructive' : 'bg-secondary text-foreground'}`}>
              {event.severity} SEVERITY
            </div>
            <div className="text-[11px] font-semibold tracking-tight text-muted-foreground uppercase">{event.dimension}</div>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{event.title}</h3>
        </div>
        
        <div className="flex items-center gap-4 text-right">
          <div className="hidden md:block text-right">
            <div className="text-[11px] text-muted-foreground font-semibold tracking-tight mb-2">Delta</div>
            <div className={`text-lg font-semibold tracking-tight ${isHigh ? 'text-destructive' : 'text-foreground'}`}>{event.delta}</div>
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
              <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-card border border-border shadow-sm">
                <div className="flex-1">
                  <div className="text-[11px] text-muted-foreground tracking-tight mb-2 font-semibold">Award Commitment</div>
                  <div className="text-xl font-medium tracking-tight text-foreground">{event.before}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-30 hidden md:block" />
                <div className="flex-1">
                  <div className="text-[11px] text-muted-foreground tracking-tight mb-2 font-semibold">Current Reality</div>
                  <div className={`text-xl font-semibold tracking-tight ${isHigh ? 'text-destructive' : 'text-foreground'}`}>{event.after}</div>
                </div>
              </div>

              {/* Intelligence Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-[11px] font-semibold tracking-tight text-muted-foreground">Why detected</div>
                  <div className="text-[13px] text-foreground flex items-start gap-3 bg-secondary/50 p-4 rounded-xl border border-border">
                    <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{event.policyTriggered}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-[11px] font-semibold tracking-tight text-muted-foreground">Evidence Analysis</div>
                  <div className="text-[13px] font-medium text-foreground flex flex-col gap-2 p-4 rounded-xl border border-border bg-secondary/50">
                    {event.evidenceId && (
                      <span className="flex items-center gap-2 text-foreground">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-muted-foreground" /> Supporting Evidence Available
                      </span>
                    )}
                    {event.missingEvidenceId && (
                      <span className="flex items-center gap-2 text-destructive font-semibold">
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
