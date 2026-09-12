"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { id: 'jan', date: 'January 2025', title: 'Award Snapshot', details: '₹12.4 Cr | XYZ Engineering | VG-40', color: 'bg-primary', align: 100 },
  { id: 'mar', date: 'March 2025', title: 'RA Bill #3', details: 'Cost increased to ₹12.7 Cr', color: 'bg-muted-foreground', align: 92 },
  { id: 'may', date: 'May 2025', title: 'Subcontractor Change', details: 'XYZ → PQR Infrastructure', color: 'bg-muted-foreground', align: 84 },
  { id: 'jun', date: 'June 2025', title: 'Specification Change', details: 'Material downgraded from VG-40 to VG-30', color: 'bg-muted-foreground', align: 76 },
  { id: 'today', date: 'Today', title: 'Current State', details: '₹14.6 Cr | PQR Infrastructure | VG-30', color: 'bg-muted-foreground', align: 61 },
];

export function TimeMachine() {
  const [activeIndex, setActiveIndex] = useState(timelineEvents.length - 1);
  const activeEvent = timelineEvents[activeIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* HUD Viewer */}
      <div className="mb-24 border border-border bg-card rounded-3xl p-10 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="text-[11px] font-semibold tracking-tight text-muted-foreground">Time Machine Viewer</div>
            </div>
            <motion.h2 
              key={activeEvent.title}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
              className="text-4xl font-semibold text-foreground tracking-tighter mb-2"
            >
              {activeEvent.title}
            </motion.h2>
            <motion.div 
              key={activeEvent.date}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
              className="text-[15px] font-semibold text-muted-foreground tracking-tight"
            >
              {activeEvent.date}
            </motion.div>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-right">
              <div className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-2">System State</div>
              <motion.div 
                key={activeEvent.details}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
                className="text-[15px] font-semibold text-foreground max-w-[200px]"
              >
                {activeEvent.details}
              </motion.div>
            </div>
            
            <div className="w-px h-20 bg-border" />
            
            <div className="flex flex-col items-center">
              <div className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-2">Alignment</div>
              <motion.div 
                key={activeEvent.align}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
                className="text-5xl font-semibold tracking-tighter text-foreground"
              >
                {activeEvent.align}%
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrubber */}
      <div className="relative pt-4 pb-20 px-8">
        <div className="absolute top-6 left-8 right-8 h-px bg-border" />
        <div 
          className="absolute top-6 left-8 h-px bg-primary transition-all duration-300"
          style={{ width: `calc(${(activeIndex / (timelineEvents.length - 1)) * 100}% - 2rem)` }}
        />

        <div className="relative flex justify-between w-full">
          {timelineEvents.map((event, i) => (
            <div 
              key={event.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setActiveIndex(i)}
            >
              <div className="relative -mt-1.5 mb-4">
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${i <= activeIndex ? 'bg-primary scale-125' : 'bg-secondary scale-100 group-hover:scale-125'}`} />
              </div>
              <div className={`text-[11px] font-semibold tracking-tight transition-colors text-center ${i === activeIndex ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                {event.date.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
