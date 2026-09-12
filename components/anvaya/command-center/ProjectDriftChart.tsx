"use client";
import { FEATURED_PROJECTS } from '@/data/mockData';
import { motion } from 'framer-motion';

export function ProjectDriftChart() {
  // Each featured project has timelineEvents with alignment scores
  const chartHeight = 160;
  const chartWidth = 320;
  const padding = { top: 10, right: 10, bottom: 24, left: 32 };

  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;

  const colors = ['var(--foreground)', 'var(--muted-foreground)', 'var(--primary)'];

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-[13px] font-semibold text-muted-foreground tracking-tight mb-5">Project Drift Over Time</h3>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
        {/* Y-axis labels */}
        {[100, 80, 60].map(v => (
          <g key={v}>
            <text x={padding.left - 6} y={padding.top + innerH * (1 - (v - 50) / 50)} textAnchor="end" dominantBaseline="middle" className="fill-muted-foreground text-[8px] font-medium">{v}%</text>
            <line x1={padding.left} y1={padding.top + innerH * (1 - (v - 50) / 50)} x2={chartWidth - padding.right} y2={padding.top + innerH * (1 - (v - 50) / 50)} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          </g>
        ))}

        {/* Drift lines for each featured project */}
        {FEATURED_PROJECTS.map((project, pIdx) => {
          const events = project.timelineEvents || [];
          if (events.length < 2) return null;

          const points = events.map((ev, i) => ({
            x: padding.left + (i / (events.length - 1)) * innerW,
            y: padding.top + innerH * (1 - (ev.alignment - 50) / 50),
          }));

          const pathD = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');

          return (
            <g key={project.id}>
              <motion.path
                d={pathD}
                fill="none"
                stroke={colors[pIdx]}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: pIdx * 0.2 + 0.3, duration: 1.2, ease: [0.28, 0.11, 0.32, 1] }}
              />
              {/* End dot */}
              <motion.circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r={4}
                fill={colors[pIdx]}
                stroke="var(--background)"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: pIdx * 0.2 + 1.2, duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
              />
            </g>
          );
        })}

        {/* X-axis label */}
        <text x={padding.left} y={chartHeight - 4} className="fill-muted-foreground text-[8px] font-medium">Award</text>
        <text x={chartWidth - padding.right} y={chartHeight - 4} textAnchor="end" className="fill-muted-foreground text-[8px] font-medium">Today</text>
      </svg>

      {/* Legend */}
      <div className="flex gap-4 mt-4">
        {FEATURED_PROJECTS.map((p, i) => (
          <div key={p.id} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[i] }} />
            <span className="text-[11px] font-semibold text-muted-foreground tracking-tight">{p.name.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
