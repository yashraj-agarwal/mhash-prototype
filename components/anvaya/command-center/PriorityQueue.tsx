"use client";
import { getProjectsByPriority } from '@/data/mockData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export function PriorityQueue() {
  const projects = getProjectsByPriority();

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="px-8 py-6 border-b border-border/50 shrink-0 flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Global Priority Queue</h3>
        <span className="text-[9px] font-semibold text-foreground bg-accent px-2 py-0.5 rounded uppercase tracking-wider">{projects.length} Monitored</span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-4 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Rank</th>
              <th className="px-4 py-4 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Project</th>
              <th className="px-4 py-4 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Alignment</th>
              <th className="px-4 py-4 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Primary Drift</th>
              <th className="px-4 py-4 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Evidence Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => {
              const variations = p.reviewCases.flatMap(rc => rc.changeEvents);
              const gaps = p.reviewCases.flatMap(rc => rc.evidenceGaps);
              const primaryReason = variations[0]?.dimension || 'Monitoring';
              const isHigh = p.priorityScore > 60;
              const isAligned = p.alignmentScore >= 85;

              return (
                <tr key={p.id} className="group relative">
                  <td colSpan={5} className="p-0">
                    <Link href={`/projects/${p.id}`} className="block">
                      <div className="absolute inset-x-0 inset-y-1 bg-transparent group-hover:bg-secondary/50 rounded-xl -z-10 transition-colors duration-200" />
                    </Link>
                  </td>
                  <td className="px-4 py-4 pointer-events-none align-top">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground/50">{String(i + 1).padStart(2, '0')}</span>
                      {isHigh && <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />}
                    </div>
                  </td>
                  <td className="px-4 py-4 pointer-events-none align-top">
                    <div className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5">{p.name}</div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.1em]">{p.sector} · {p.location.state}</div>
                  </td>
                  <td className="px-4 py-4 pointer-events-none align-top">
                    <div className={`text-xl font-medium tracking-tight ${isAligned ? 'text-[#10b981]' : p.alignmentScore >= 70 ? 'text-[#f59e0b]' : 'text-destructive'}`}>
                      {p.alignmentScore}%
                    </div>
                  </td>
                  <td className="px-4 py-4 pointer-events-none align-top">
                    <div className="text-[13px] font-medium text-foreground capitalize">{primaryReason.toLowerCase()}</div>
                    {variations.length > 0 && <div className="text-[11px] text-muted-foreground mt-0.5">{variations.length} variations total</div>}
                  </td>
                  <td className="px-4 py-4 pointer-events-none align-top">
                    {gaps.length > 0 ? (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f97316]">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {gaps.length} Gaps
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#10b981]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
