"use client";
import { getProjectsByPriority } from '@/data/mockData';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function TodaysBrief() {
  const projects = getProjectsByPriority().slice(0, 5);

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="px-6 py-5 border-b border-border/50 shrink-0">
        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">What Requires Attention</h3>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {projects.map((p, i) => {
          const variations = p.reviewCases.flatMap(rc => rc.changeEvents);
          const gaps = p.reviewCases.flatMap(rc => rc.evidenceGaps);
          const primaryReason = variations[0]?.title || 'Under monitoring';
          const isHigh = p.priorityScore > 60;

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" }}
            >
              <Link href={`/projects/${p.id}`} className="block group rounded-xl my-1 transition-all duration-200 hover:bg-secondary/50">
                <div className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground/50 w-4">0{i + 1}</span>
                      <h4 className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h4>
                    </div>
                    <div className={`text-xl font-medium tracking-tight ${p.alignmentScore >= 85 ? 'text-[#10b981]' : p.alignmentScore >= 70 ? 'text-[#f59e0b]' : 'text-destructive'}`}>
                      {p.alignmentScore}%
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pl-7 text-[11px] text-muted-foreground font-medium">
                    <span className="text-foreground/70">{primaryReason}</span>
                    {gaps.length > 0 && (
                      <>
                        <span>·</span>
                        <span className="text-[#f97316]">{gaps.length} evidence gap{gaps.length > 1 ? 's' : ''}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
