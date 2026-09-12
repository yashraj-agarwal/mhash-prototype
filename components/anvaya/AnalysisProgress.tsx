"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Database, FileSearch, GitCompare, ShieldAlert, Network, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: '01', title: 'Reading Award Snapshot', icon: Database, duration: 1000, summary: 'Loaded 14 commitments' },
  { id: '02', title: 'Extracting Current Facts', icon: FileSearch, duration: 1200, summary: '23 facts found' },
  { id: '03', title: 'Comparing Commitments', icon: GitCompare, duration: 1500, summary: 'Calculated 17.7% cost delta' },
  { id: '04', title: 'Evaluating Policies', icon: ShieldAlert, duration: 1200, summary: '4 rules triggered' },
  { id: '05', title: 'Connecting Evidence', icon: Network, duration: 1200, summary: '3 evidence gaps' },
];

export function AnalysisProgress({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].duration);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          const isFuture = index > currentStep;
          const Icon = step.icon;

          if (isFuture) return null;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative overflow-hidden rounded-xl border p-4 ${isCurrent ? 'bg-background border-anvaya-blue shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'bg-accent/30 border-border'}`}
            >
              {isCurrent && (
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: step.duration / 1000, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-1 bg-anvaya-blue"
                />
              )}
              
              <div className="flex items-center gap-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isComplete ? 'bg-anvaya-green/10 text-anvaya-green' : 'bg-anvaya-blue/10 text-anvaya-blue'}`}>
                  {isComplete ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">{step.id}</span>
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</h3>
                  </div>
                  
                  <div className="h-4">
                    <AnimatePresence>
                      {isComplete && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs font-medium text-anvaya-green"
                        >
                          ✓ {step.summary}
                        </motion.div>
                      )}
                      {isCurrent && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-anvaya-blue animate-pulse" />
                          Processing deterministic rules...
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
