"use client";
import { getAggregateStats } from '@/data/mockData';
import { motion } from 'framer-motion';

const DIMENSION_LABELS: Record<string, string> = {
  COST: 'Cost', SCHEDULE: 'Schedule', SPECIFICATION: 'Material',
  SUBCONTRACTOR: 'Contractor', SCOPE: 'Scope', MATERIAL: 'Material',
};

export function VariationsByType() {
  const stats = getAggregateStats();
  const entries = Object.entries(stats.variationsByType)
    .map(([key, count]) => ({ key, label: DIMENSION_LABELS[key] || key, count }))
    .sort((a, b) => b.count - a.count);

  const max = Math.max(...entries.map(e => e.count), 1);

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-[13px] font-semibold text-muted-foreground tracking-tight mb-5">Variations by Type</h3>
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <span className="text-[11px] font-semibold text-muted-foreground w-16 text-right tracking-tight">{entry.label}</span>
            <div className="flex-1 h-6 bg-secondary/50 rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(entry.count / max) * 100}%` }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: [0.28, 0.11, 0.32, 1] }}
                className="h-full bg-primary rounded group-hover:bg-primary/80 transition-colors"
              />
            </div>
            <span className="text-[14px] font-semibold text-foreground w-6 text-right">{entry.count}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
