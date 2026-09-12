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

  const colors = ['#ef4444', '#f59e0b', '#176247'];

  return (
    <div className="bg-white border border-[#d8deda] rounded-lg p-5">
      <h3 className="text-[10px] font-bold text-[#142b22] uppercase tracking-[0.15em] mb-4">Project Drift Over Time</h3>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
        {/* Y-axis labels */}
        {[100, 80, 60].map(v => (
          <g key={v}>
            <text x={padding.left - 4} y={padding.top + innerH * (1 - (v - 50) / 50)} textAnchor="end" dominantBaseline="middle" className="fill-[#b5b9b3] text-[7px]">{v}%</text>
            <line x1={padding.left} y1={padding.top + innerH * (1 - (v - 50) / 50)} x2={chartWidth - padding.right} y2={padding.top + innerH * (1 - (v - 50) / 50)} stroke="#e8ebe9" strokeWidth="0.5" strokeDasharray="3 3" />
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
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: pIdx * 0.3 + 0.5, duration: 1 }}
              />
              {/* End dot */}
              <motion.circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r={3}
                fill={colors[pIdx]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: pIdx * 0.3 + 1.5 }}
              />
            </g>
          );
        })}

        {/* X-axis label */}
        <text x={padding.left} y={chartHeight - 4} className="fill-[#b5b9b3] text-[7px]">Award</text>
        <text x={chartWidth - padding.right} y={chartHeight - 4} textAnchor="end" className="fill-[#b5b9b3] text-[7px]">Today</text>
      </svg>

      {/* Legend */}
      <div className="flex gap-4 mt-3">
        {FEATURED_PROJECTS.map((p, i) => (
          <div key={p.id} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i] }} />
            <span className="text-[9px] font-semibold text-[#71766f] uppercase tracking-wider">{p.name.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
