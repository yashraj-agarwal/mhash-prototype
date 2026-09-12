"use client";
import { motion } from 'framer-motion';

export function HeroNodes() {
  return (
    <div className="relative w-full max-w-3xl mx-auto h-[500px] flex items-center justify-center -mt-10">
      {/* Background connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.2))' }}>
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          d="M 384 100 L 250 250 L 384 400 L 250 500" 
          stroke="currentColor" 
          strokeWidth="1" 
          fill="none" 
          className="text-border" 
        />
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
          d="M 384 100 L 518 250 L 384 400 L 518 500" 
          stroke="currentColor" 
          strokeWidth="1" 
          fill="none" 
          className="text-border" 
        />
      </svg>

      {/* Nodes */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="absolute top-[100px] left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2.5 bg-background border border-border rounded-full shadow-lg z-10 flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-foreground" />
        <span className="text-sm font-bold tracking-widest uppercase">Project</span>
      </motion.div>

      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
        className="absolute top-[250px] left-[calc(50%-134px)] -translate-x-1/2 -translate-y-1/2 px-5 py-2 bg-anvaya-blue/10 border border-anvaya-blue/30 rounded-full shadow-lg z-10 flex items-center gap-2"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-anvaya-blue" />
        <span className="text-xs font-semibold tracking-wider text-anvaya-blue uppercase">Award Snapshot</span>
      </motion.div>

      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 1.0 }}
        className="absolute top-[250px] left-[calc(50%+134px)] -translate-x-1/2 -translate-y-1/2 px-5 py-2 bg-accent/50 border border-border rounded-full shadow-lg z-10 flex items-center gap-2"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
        <span className="text-xs font-semibold tracking-wider text-foreground uppercase">Current State</span>
      </motion.div>

      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 1.5 }}
        className="absolute top-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2 bg-anvaya-orange/10 border border-anvaya-orange/30 rounded-full shadow-lg shadow-anvaya-orange/5 z-10 flex items-center gap-2"
      >
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="w-1.5 h-1.5 rounded-full bg-anvaya-orange" 
        />
        <span className="text-xs font-bold tracking-wider text-anvaya-orange uppercase">Change Event</span>
      </motion.div>

      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 2.0 }}
        className="absolute top-[500px] left-[calc(50%-134px)] -translate-x-1/2 -translate-y-1/2 px-5 py-2 bg-anvaya-green/10 border border-anvaya-green/30 rounded-full shadow-lg z-10 flex items-center gap-2"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-anvaya-green" />
        <span className="text-xs font-semibold tracking-wider text-anvaya-green uppercase">Evidence</span>
      </motion.div>

      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 2.3 }}
        className="absolute top-[500px] left-[calc(50%+134px)] -translate-x-1/2 -translate-y-1/2 px-5 py-2 bg-anvaya-red/10 border border-anvaya-red/30 rounded-full shadow-lg z-10 flex items-center gap-2"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-anvaya-red" />
        <span className="text-xs font-bold tracking-wider text-anvaya-red uppercase">Review Case</span>
      </motion.div>
    </div>
  );
}
