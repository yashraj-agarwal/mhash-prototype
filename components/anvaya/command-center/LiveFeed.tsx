"use client";
import { motion } from 'framer-motion';
import { ACTIVITY_FEED } from '@/data/mockData';
import Link from 'next/link';
import { AlertCircle, FileText, Activity, CheckCircle2 } from 'lucide-react';

export function LiveFeed() {
  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center justify-between pb-6 border-b border-border/40 shrink-0">
        <h3 className="text-[13px] font-semibold text-muted-foreground tracking-tight">Live Intelligence Feed</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-chart-2" />
          <span className="text-[11px] font-semibold text-muted-foreground tracking-tight">Live</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2 space-y-2">
        {ACTIVITY_FEED.map((ev, i) => {
          let Icon = Activity;
          let colorClass = 'text-chart-5';
          let borderClass = 'border-chart-5/20';
          let bgClass = 'bg-chart-5/5';

          if (ev.type === 'alert') {
            Icon = AlertCircle;
            colorClass = 'text-foreground';
            bgClass = 'bg-secondary/50';
          } else if (ev.type === 'warning') {
            Icon = AlertCircle;
            colorClass = 'text-muted-foreground';
            bgClass = 'bg-secondary/30';
          } else if (ev.type === 'info') {
            Icon = FileText;
            colorClass = 'text-primary';
            bgClass = 'bg-secondary/30';
          } else if (ev.type === 'success') {
            Icon = CheckCircle2;
            colorClass = 'text-muted-foreground';
            bgClass = 'bg-secondary/30';
          }

          return (
            <motion.div 
              key={ev.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.35, ease: [0.28, 0.11, 0.32, 1] }}
            >
              <Link href={`/projects/${ev.projectId}`} className="block group">
                <div className={`p-4 rounded-2xl ${bgClass} transition-all duration-200 hover:scale-[1.01] hover:bg-secondary`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${colorClass}`} />
                      <span className="text-[11px] font-semibold text-muted-foreground tracking-tight">{ev.relativeTime}</span>
                    </div>
                    {ev.dimension && (
                      <span className="text-[11px] font-semibold text-muted-foreground tracking-tight">{ev.dimension}</span>
                    )}
                  </div>
                  <p className="text-[15px] font-semibold text-foreground mb-1 leading-snug">{ev.text}</p>
                  <p className="text-[13px] font-medium text-muted-foreground group-hover:text-primary transition-colors">{ev.projectName}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
