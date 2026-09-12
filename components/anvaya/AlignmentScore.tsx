"use client";
import { motion } from 'framer-motion';

export function AlignmentScore({ score }: { score: number }) {
  const isAligned = score >= 85;
  const color = isAligned ? 'text-[#10b981]' : 'text-[#f59e0b]';
  const borderColor = isAligned ? 'border-[#10b981]' : 'border-[#f59e0b]';
  
  return (
    <div className="relative flex items-center justify-center p-8 min-h-[500px]">
      {/* Central Circle */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className={`relative z-10 w-56 h-56 rounded-full border-4 ${borderColor} bg-background flex flex-col items-center justify-center shadow-sm`}
      >
        <div className={`text-7xl font-semibold tracking-tighter ${color}`}>{score}%</div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mt-3">Alignment</div>
      </motion.div>
      
      {/* Surrounding Nodes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Cost */}
        <motion.div initial={{ opacity: 0, x: -20, y: -20 }} animate={{ opacity: 1, x: -140, y: -110 }} transition={{ delay: 0.2, type: "spring" }} className="absolute bg-card border border-border/50 p-4 rounded-xl shadow-sm text-center pointer-events-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Cost</div>
          <div className="text-2xl font-medium text-[#f59e0b]">72%</div>
        </motion.div>
        
        {/* Schedule */}
        <motion.div initial={{ opacity: 0, x: 20, y: -20 }} animate={{ opacity: 1, x: 140, y: -110 }} transition={{ delay: 0.3, type: "spring" }} className="absolute bg-card border border-border/50 p-4 rounded-xl shadow-sm text-center pointer-events-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Schedule</div>
          <div className="text-2xl font-medium text-[#f59e0b]">64%</div>
        </motion.div>

        {/* Material */}
        <motion.div initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: -140, y: 110 }} transition={{ delay: 0.4, type: "spring" }} className="absolute bg-card border border-border/50 p-4 rounded-xl shadow-sm text-center pointer-events-auto border-b-2 border-b-destructive">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Material</div>
          <div className="text-2xl font-medium text-destructive">48%</div>
        </motion.div>

        {/* Evidence */}
        <motion.div initial={{ opacity: 0, x: 20, y: 20 }} animate={{ opacity: 1, x: 140, y: 110 }} transition={{ delay: 0.5, type: "spring" }} className="absolute bg-card border border-border/50 p-4 rounded-xl shadow-sm text-center pointer-events-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Evidence</div>
          <div className="text-2xl font-medium text-[#f59e0b]">55%</div>
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
