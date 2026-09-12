"use client";
import { Project } from "@/types";
import { motion } from "framer-motion";

interface Props {
  project: Project;
}

export function AwardCurrentComparison({ project }: Props) {
  const award = project.awardSnapshot;
  const current = project.currentFacts;

  const costAward = `₹${(award.projectCost / 10000000).toFixed(1)} Cr`;
  const costCurrent = `₹${(current.projectCost / 10000000).toFixed(1)} Cr`;
  
  const Row = ({ label, a, c, isDiff, diffLabel }: { label: string, a: string, c: string, isDiff: boolean, diffLabel?: string }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.28, 0.11, 0.32, 1] }} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-8 py-7 border-b border-border last:border-0 group">
      
      {/* LEFT: AWARD */}
      <div className="text-right">
        <div className="text-[11px] font-semibold text-muted-foreground tracking-tight mb-2 opacity-50 group-hover:opacity-100 transition-opacity">{label}</div>
        <div className="text-xl md:text-[28px] font-semibold tracking-tighter text-muted-foreground">{a}</div>
      </div>

      {/* CENTER: VECTOR */}
      <div className="flex flex-col items-center justify-center w-32 relative h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-full bg-border" />
        </div>
        {isDiff && diffLabel && (
          <div className="relative z-10 bg-secondary border border-border text-foreground px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-tight shadow-sm whitespace-nowrap">
            {diffLabel}
          </div>
        )}
        {!isDiff && (
          <div className="relative z-10 bg-card border border-border px-4 py-1.5 rounded-full text-[11px] text-muted-foreground font-semibold tracking-tight">
            Aligned
          </div>
        )}
      </div>

      {/* RIGHT: CURRENT */}
      <div className="text-left">
        <div className="text-[11px] font-semibold text-muted-foreground tracking-tight mb-2 opacity-50 group-hover:opacity-100 transition-opacity">{label}</div>
        <div className={`text-xl md:text-[28px] font-semibold tracking-tighter ${isDiff ? 'text-foreground' : 'text-muted-foreground'}`}>{c}</div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-8 mb-6 items-center text-center px-10">
        <div className="text-[12px] font-semibold text-muted-foreground tracking-tight text-right">What was approved</div>
        <div className="w-32 text-[12px] font-semibold text-border tracking-tight">Change Vector</div>
        <div className="text-[12px] font-semibold text-muted-foreground tracking-tight text-left">What is current</div>
      </div>
      
      <div className="bg-card border border-border rounded-3xl p-8 px-10 shadow-sm">
        <Row label="Project Cost" a={costAward} c={costCurrent} isDiff={award.projectCost !== current.projectCost} diffLabel="+17.7%" />
        <Row label="Duration" a={`${award.durationMonths} Months`} c={`${current.durationForecast} Months`} isDiff={award.durationMonths !== current.durationForecast} diffLabel="+5 Mo Delay" />
        <Row label="Subcontractor" a={award.subcontractors.join(', ') || 'None'} c={current.currentSubcontractor || 'None'} isDiff={current.currentSubcontractor !== '' && !award.subcontractors.includes(current.currentSubcontractor)} diffLabel="Changed" />
        <Row label="Material Spec" a={award.materials?.bitumen || 'None'} c={current.materials?.bitumen || 'None'} isDiff={award.materials?.bitumen !== current.materials?.bitumen} diffLabel="Spec Downgraded" />
      </div>
    </div>
  );
}
