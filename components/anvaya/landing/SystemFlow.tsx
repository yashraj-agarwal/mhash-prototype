"use client";
import { motion } from 'framer-motion';

const steps = [
  { id: '01', title: 'CAPTURE', desc: 'Award Snapshot' },
  { id: '02', title: 'OBSERVE', desc: 'Post-award information' },
  { id: '03', title: 'COMPARE', desc: 'Detect meaningful variations' },
  { id: '04', title: 'CONNECT', desc: 'Link evidence' },
  { id: '05', title: 'PRIORITIZE', desc: 'Explain what needs review' },
];

export function SystemFlow() {
  return (
    <div className="py-32 px-6 max-w-6xl mx-auto overflow-hidden">
      <div className="text-center mb-32">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">How Anvaya Works</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative">
        <div className="hidden md:block absolute top-10 left-0 w-full h-px bg-border z-0" />
        
        {steps.map((step, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
            key={step.id} 
            className="relative z-10 flex flex-col items-center bg-background px-4 text-center group"
          >
            <div className="text-anvaya-blue text-xs font-mono font-bold mb-6 opacity-50 group-hover:opacity-100 transition-opacity">{step.id}</div>
            <div className="w-4 h-4 rounded-full bg-background border-[3px] border-anvaya-blue mb-8 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
            <div className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">{step.title}</div>
            <div className="text-xs text-muted-foreground max-w-[140px] font-medium leading-relaxed">{step.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
