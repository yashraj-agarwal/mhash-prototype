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
    <div className="bg-white border border-[#d8deda] rounded-lg p-5">
      <h3 className="text-[10px] font-bold text-[#142b22] uppercase tracking-[0.15em] mb-5">Variations by Type</h3>
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[#71766f] w-16 text-right uppercase tracking-wider">{entry.label}</span>
            <div className="flex-1 h-5 bg-[#f0f2f1] rounded-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(entry.count / max) * 100}%` }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                className="h-full bg-[#142b22] rounded-sm group-hover:bg-[#176247] transition-colors"
              />
            </div>
            <span className="text-sm font-semibold text-[#142b22] w-6 text-right">{entry.count}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
