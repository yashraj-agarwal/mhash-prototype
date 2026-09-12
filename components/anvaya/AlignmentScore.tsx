"use client";
import { motion } from 'framer-motion';

export function AlignmentScore({ score }: { score: number }) {
  const isAligned = score >= 85;
  return (
    <div className="relative flex items-center justify-center p-8 min-h-[500px]">
      {/* Central Circle */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.28, 0.11, 0.32, 1] }}
        className="relative z-10 w-56 h-56 rounded-full border border-border bg-card flex flex-col items-center justify-center shadow-lg"
      >
        <div className="text-[72px] font-semibold tracking-tighter text-foreground leading-none">{score}%</div>
        <div className="text-[12px] font-semibold text-muted-foreground tracking-tight mt-2">Alignment</div>
      </motion.div>
      
      {/* Surrounding Nodes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Cost */}
        <motion.div initial={{ opacity: 0, x: -10, y: -10 }} animate={{ opacity: 1, x: -140, y: -110 }} transition={{ delay: 0.2, duration: 0.6, ease: [0.28, 0.11, 0.32, 1] }} className="absolute bg-card border border-border p-4 rounded-2xl shadow-sm text-center pointer-events-auto min-w-[120px]">
          <div className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-1">Cost</div>
          <div className="text-2xl font-semibold text-foreground">72%</div>
        </motion.div>
        
        {/* Schedule */}
        <motion.div initial={{ opacity: 0, x: 10, y: -10 }} animate={{ opacity: 1, x: 140, y: -110 }} transition={{ delay: 0.3, duration: 0.6, ease: [0.28, 0.11, 0.32, 1] }} className="absolute bg-card border border-border p-4 rounded-2xl shadow-sm text-center pointer-events-auto min-w-[120px]">
          <div className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-1">Schedule</div>
          <div className="text-2xl font-semibold text-foreground">64%</div>
        </motion.div>

        {/* Material */}
        <motion.div initial={{ opacity: 0, x: -10, y: 10 }} animate={{ opacity: 1, x: -140, y: 110 }} transition={{ delay: 0.4, duration: 0.6, ease: [0.28, 0.11, 0.32, 1] }} className="absolute bg-card border border-border p-4 rounded-2xl shadow-md text-center pointer-events-auto min-w-[120px]">
          <div className="text-[11px] font-semibold tracking-tight text-primary mb-1">Material</div>
          <div className="text-2xl font-semibold text-foreground">48%</div>
        </motion.div>

        {/* Evidence */}
        <motion.div initial={{ opacity: 0, x: 10, y: 10 }} animate={{ opacity: 1, x: 140, y: 110 }} transition={{ delay: 0.5, duration: 0.6, ease: [0.28, 0.11, 0.32, 1] }} className="absolute bg-card border border-border p-4 rounded-2xl shadow-sm text-center pointer-events-auto min-w-[120px]">
          <div className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-1">Evidence</div>
          <div className="text-2xl font-semibold text-foreground">55%</div>
        </motion.div>
        
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full -z-10 opacity-10">
          <line x1="50%" y1="50%" x2="calc(50% - 140px)" y2="calc(50% - 110px)" stroke="currentColor" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="calc(50% + 140px)" y2="calc(50% - 110px)" stroke="currentColor" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="calc(50% - 140px)" y2="calc(50% + 110px)" stroke="currentColor" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="calc(50% + 140px)" y2="calc(50% + 110px)" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
