"use client";
import { getProjectsByPriority } from '@/data/mockData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export function PriorityQueue() {
  const projects = getProjectsByPriority();

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="hidden px-8 py-6 border-b border-border/50 shrink-0 flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Global Priority Queue</h3>
        <span className="text-[9px] font-semibold text-foreground bg-accent px-2 py-0.5 rounded uppercase tracking-wider">{projects.length} Monitored</span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground tracking-tight">Rank</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground tracking-tight">Project</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground tracking-tight">Alignment</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground tracking-tight">Primary Drift</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-muted-foreground tracking-tight">Evidence Status</th>
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
                  <td className="px-6 py-5 pointer-events-none align-top">
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-semibold text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 pointer-events-none align-top">
                    <div className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{p.name}</div>
                    <div className="text-[13px] font-medium text-muted-foreground tracking-tight">{p.sector} · {p.location.state}</div>
                  </td>
                  <td className="px-6 py-5 pointer-events-none align-top">
                    <div className="text-xl font-semibold tracking-tight text-foreground">
                      {p.alignmentScore}%
                    </div>
                  </td>
                  <td className="px-6 py-5 pointer-events-none align-top">
                    <div className="text-[14px] font-semibold text-foreground capitalize">{primaryReason.toLowerCase()}</div>
                    {variations.length > 0 && <div className="text-[12px] font-medium text-muted-foreground mt-1">{variations.length} variations total</div>}
                  </td>
                  <td className="px-6 py-5 pointer-events-none align-top">
                    {gaps.length > 0 ? (
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
                        <AlertTriangle className="w-4 h-4 text-primary" />
                        {gaps.length} Gaps
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4" />
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
