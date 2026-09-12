"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ProblemStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0.4, 0.8], [50, 0]);

  return (
    <div ref={ref} className="py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
          Approval is only <span className="font-semibold">the beginning.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-16 items-center">
        {/* LEFT: APPROVED */}
        <div className="space-y-6 text-right">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">What was approved</div>
          <div className="space-y-4">
            <div className="text-2xl font-light text-foreground">₹12.4 Cr</div>
            <div className="text-lg font-light text-muted-foreground">14 Months</div>
            <div className="text-lg font-light text-muted-foreground">XYZ Engineering</div>
            <div className="text-lg font-light text-muted-foreground">VG-40 Grade Bitumen</div>
          </div>
        </div>

        {/* CENTER: ANIMATED DIVIDER */}
        <div className="hidden md:flex flex-col items-center justify-center h-full relative">
          <div className="w-px h-full bg-border absolute left-1/2 -translate-x-1/2" />
          <motion.div style={{ opacity, y }} className="space-y-12 z-10 py-12">
            <div className="bg-anvaya-orange/10 border border-anvaya-orange/30 text-anvaya-orange text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm whitespace-nowrap shadow-sm">+17.7% Cost</div>
            <div className="bg-anvaya-orange/10 border border-anvaya-orange/30 text-anvaya-orange text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm whitespace-nowrap shadow-sm">+5 Mo Delay</div>
            <div className="bg-anvaya-orange/10 border border-anvaya-orange/30 text-anvaya-orange text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm whitespace-nowrap shadow-sm">Subcontractor Changed</div>
            <div className="bg-anvaya-red/10 border border-anvaya-red/30 text-anvaya-red text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm whitespace-nowrap shadow-sm">Spec Downgraded</div>
          </motion.div>
        </div>

        {/* RIGHT: CURRENT */}
        <div className="space-y-6 text-left">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">What is happening now</div>
          <motion.div style={{ opacity }} className="space-y-4">
            <div className="text-2xl font-semibold text-anvaya-orange">₹14.6 Cr</div>
            <div className="text-lg font-medium text-anvaya-orange">19 Months</div>
            <div className="text-lg font-medium text-anvaya-orange">PQR Infrastructure</div>
            <div className="text-lg font-medium text-anvaya-red">VG-30 Grade Bitumen</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
