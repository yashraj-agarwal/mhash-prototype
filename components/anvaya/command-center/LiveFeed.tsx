"use client";
import { motion } from 'framer-motion';
import { ACTIVITY_FEED } from '@/data/mockData';
import Link from 'next/link';
import { AlertCircle, FileText, Activity, CheckCircle2 } from 'lucide-react';

export function LiveFeed() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 py-4 border-b border-[#d8deda] shrink-0 bg-[#fbfbfa] flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-[#142b22] uppercase tracking-[0.15em]">Live Intelligence Feed</h3>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
          <span className="text-[9px] font-semibold text-[#ef4444] uppercase tracking-wider">Live</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {ACTIVITY_FEED.map((ev, i) => {
          let Icon = Activity;
          let colorClass = 'text-[#10b981]';
          let bgClass = 'bg-emerald-50';
          let borderClass = 'border-emerald-100';

          if (ev.type === 'alert') {
            Icon = AlertCircle;
            colorClass = 'text-[#ef4444]';
            bgClass = 'bg-red-50';
            borderClass = 'border-red-100';
          } else if (ev.type === 'warning') {
            Icon = AlertCircle;
            colorClass = 'text-[#f59e0b]';
            bgClass = 'bg-amber-50';
            borderClass = 'border-amber-100';
          } else if (ev.type === 'info') {
            Icon = FileText;
            colorClass = 'text-[#3b82f6]';
            bgClass = 'bg-blue-50';
            borderClass = 'border-blue-100';
          } else if (ev.type === 'success') {
            Icon = CheckCircle2;
          }

          return (
            <motion.div 
              key={ev.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/projects/${ev.projectId}`} className="block group">
                <div className={`p-4 rounded-lg border ${borderClass} ${bgClass} transition-shadow hover:shadow-md`}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${colorClass}`} />
                      <span className="text-[9px] font-bold text-[#71766f] uppercase tracking-wider">{ev.relativeTime}</span>
                    </div>
                    {ev.dimension && (
                      <span className="text-[9px] font-bold text-[#71766f] uppercase tracking-wider">{ev.dimension}</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#142b22] mb-1">{ev.text}</p>
                  <p className="text-[10px] font-medium text-[#71766f] group-hover:text-[#176247] transition-colors">{ev.projectName}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
