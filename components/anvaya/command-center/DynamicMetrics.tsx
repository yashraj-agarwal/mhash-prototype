"use client";
import { motion } from 'framer-motion';
import { getAggregateStats } from '@/data/mockData';

export function DynamicMetrics() {
  const stats = getAggregateStats();

  const metrics = [
    { label: 'Require Review', value: stats.projectsRequiringReview, color: 'text-destructive' },
    { label: 'Variations Detected', value: stats.totalVariations, color: 'text-[#f59e0b]' },
    { label: 'Evidence Gaps', value: stats.totalEvidenceGaps, color: 'text-[#f97316]' },
    { label: 'Cost Under Review', value: `₹${(stats.totalCostUnderReview / 10000000).toFixed(0)} Cr`, color: 'text-foreground' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-2"
        >
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">{m.label}</div>
          <div className={`text-4xl md:text-5xl font-semibold tracking-tight ${m.color}`}>{m.value}</div>
        </motion.div>
      ))}
    </div>
  );
}
