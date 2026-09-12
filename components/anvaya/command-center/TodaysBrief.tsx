"use client";
import { getProjectsByPriority } from '@/data/mockData';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function TodaysBrief() {
  const projects = getProjectsByPriority().slice(0, 5);

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center justify-between pb-6 border-b border-border/40 shrink-0">
        <h3 className="text-[13px] font-semibold text-muted-foreground tracking-tight">What Requires Attention</h3>
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-2">
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
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-semibold text-muted-foreground w-5">0{i + 1}</span>
                      <h4 className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h4>
                    </div>
                    <div className="text-xl font-semibold tracking-tight text-foreground">
                      {p.alignmentScore}%
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pl-8 text-[13px] text-muted-foreground font-medium">
                    <span className="text-foreground/80">{primaryReason}</span>
                    {gaps.length > 0 && (
                      <>
                        <span>·</span>
                        <span className="text-muted-foreground">{gaps.length} evidence gap{gaps.length > 1 ? 's' : ''}</span>
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
