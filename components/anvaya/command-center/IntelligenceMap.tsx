"use client";
import { Project } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// Simplified India SVG state outlines — approximate centroids for markers
const STATE_POSITIONS: Record<string, { x: number; y: number }> = {
  'Karnataka': { x: 185, y: 410 },
  'Maharashtra': { x: 175, y: 320 },
  'Tamil Nadu': { x: 210, y: 460 },
  'Kerala': { x: 185, y: 480 },
  'Delhi': { x: 200, y: 155 },
  'Rajasthan': { x: 145, y: 195 },
  'Gujarat': { x: 115, y: 275 },
  'Telangana': { x: 210, y: 360 },
  'Uttar Pradesh': { x: 230, y: 195 },
  'Madhya Pradesh': { x: 200, y: 270 },
};

function getStatusColor(project: Project) {
  if (project.priorityScore > 60) return { fill: 'var(--chart-3)', glow: 'var(--border)', label: 'HIGH' };
  if (project.alignmentScore < 85) return { fill: 'var(--chart-2)', glow: 'var(--border)', label: 'MEDIUM' };
  return { fill: 'var(--primary)', glow: 'transparent', label: 'ALIGNED' };
}

interface Props {
  projects: Project[];
}

export function IntelligenceMap({ projects }: Props) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const filteredProjects = filter
    ? projects.filter(p => p.sector === filter)
    : projects;

  const sectors = [...new Set(projects.map(p => p.sector))];

  return (
    <div className="w-full h-full relative bg-card overflow-hidden flex flex-col border border-border rounded-2xl">
      {/* Header */}
      <div className="absolute top-6 left-6 z-20">
        <h3 className="text-[13px] font-semibold text-muted-foreground tracking-tight">National Infrastructure Grid</h3>
        <p className="text-[11px] text-muted-foreground mt-1 font-medium">{filteredProjects.length} projects across {Object.keys(STATE_POSITIONS).length} states</p>
      </div>

      {/* Sector Filter */}
      <div className="absolute top-6 right-6 z-20 flex gap-2 flex-wrap max-w-[200px] justify-end">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-tight transition-colors border ${!filter ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:bg-secondary'}`}
        >All</button>
        {sectors.slice(0, 4).map(s => (
          <button
            key={s}
            onClick={() => setFilter(filter === s ? null : s)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-tight transition-colors border ${filter === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:bg-secondary'}`}
          >{s.split(' ')[0]}</button>
        ))}
      </div>

      {/* SVG Map */}
      <svg viewBox="0 0 400 580" className="w-full h-full" style={{ maxHeight: '100%' }}>
        {/* India outline — simplified */}
        <path
          d="M200,30 C220,28 240,35 255,50 C270,65 280,80 285,100 C290,120 295,135 300,150 C305,165 315,180 320,200 C325,220 330,240 325,260 C320,280 310,295 305,310 C300,325 295,340 290,355 C285,370 280,385 275,400 C270,415 260,425 250,435 C240,445 230,455 225,465 C220,475 218,485 215,495 C212,505 208,510 200,515 C192,520 185,515 180,505 C175,495 172,485 168,475 C165,465 158,455 150,445 C142,435 135,425 130,410 C125,395 120,380 115,365 C110,350 105,335 100,320 C95,305 88,290 82,275 C76,260 75,245 80,230 C85,215 95,200 105,185 C115,170 125,155 135,140 C145,125 155,115 160,100 C165,85 170,70 180,55 C190,40 195,32 200,30Z"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          className="opacity-80"
        />
        {/* State boundary hints */}
        <line x1="80" y1="260" x2="320" y2="260" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="90" y1="350" x2="300" y2="350" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="200" y1="30" x2="200" y2="515" stroke="var(--border)" strokeWidth="0.3" strokeDasharray="2 6" />

        {/* State labels */}
        {Object.entries(STATE_POSITIONS).map(([state, pos]) => (
          <text key={state} x={pos.x} y={pos.y - 18} textAnchor="middle" fill="var(--muted-foreground)" className="text-[7px] font-semibold tracking-tight">
            {state.length > 10 ? state.slice(0, 8) + '.' : state}
          </text>
        ))}

        {/* Project Markers */}
        {filteredProjects.map((project, i) => {
          const pos = STATE_POSITIONS[project.location.state];
          if (!pos) return null;
          const color = getStatusColor(project);
          const isHovered = hoveredProject?.id === project.id;
          // Offset markers in same state
          const sameState = filteredProjects.filter(p => p.location.state === project.location.state);
          const idx = sameState.indexOf(project);
          const offsetX = idx * 14 - (sameState.length - 1) * 7;

          return (
            <g key={project.id}>
              <Link href={`/projects/${project.id}`}>
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onHoverStart={() => setHoveredProject(project)}
                  onHoverEnd={() => setHoveredProject(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Glow */}
                  <circle cx={pos.x + offsetX} cy={pos.y} r={isHovered ? 14 : 8} fill={color.glow} className="transition-all duration-300" />
                  {/* Marker */}
                  <circle cx={pos.x + offsetX} cy={pos.y} r={isHovered ? 7 : 5} fill={color.fill} stroke="var(--background)" strokeWidth="1.5" className="transition-all duration-300" />
                  {/* Pulse for high priority */}
                  {project.priorityScore > 60 && (
                    <motion.circle
                      cx={pos.x + offsetX} cy={pos.y} r={5}
                      fill="none" stroke={color.fill} strokeWidth="1"
                      initial={{ r: 5, opacity: 0.8 }}
                      animate={{ r: 16, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.g>
              </Link>
            </g>
          );
        })}
      </svg>

      {/* Hover Tooltip */}
      {hoveredProject && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-6 right-6 bg-card border border-border rounded-2xl p-5 shadow-lg z-30"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold text-muted-foreground tracking-tight mb-1">{hoveredProject.sector} · {hoveredProject.location.state}</div>
              <div className="text-[15px] font-semibold text-foreground">{hoveredProject.name}</div>
            </div>
            <div className="text-right">
              <div className="text-[20px] font-semibold tracking-tight text-foreground">
                {hoveredProject.alignmentScore}%
              </div>
              <div className="text-[10px] font-semibold tracking-tight text-muted-foreground">Alignment</div>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-[12px] text-muted-foreground font-medium">
            <span>{hoveredProject.reviewCases.flatMap(rc => rc.changeEvents).length} variations</span>
            <span>·</span>
            <span>{hoveredProject.reviewCases.flatMap(rc => rc.evidenceGaps).length} evidence gaps</span>
            <span>·</span>
            <span className="font-semibold text-foreground">Priority {hoveredProject.priorityScore}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
