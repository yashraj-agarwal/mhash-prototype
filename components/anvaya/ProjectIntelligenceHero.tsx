"use client";
import { useState } from 'react';
import { Project } from '@/types';
import { AlignmentScore } from '@/components/anvaya/AlignmentScore';
import { AwardCurrentComparison } from '@/components/anvaya/AwardCurrentComparison';
import { AnalysisProgress } from '@/components/anvaya/AnalysisProgress';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, GitMerge, Search, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export function ProjectIntelligenceHero({ project }: { project: Project }) {
  const [analyzing, setAnalyzing] = useState(false);
  
  const variations = project.reviewCases.flatMap(rc => rc.changeEvents);
  const gaps = project.reviewCases.flatMap(rc => rc.evidenceGaps);
  const isHighPriority = project.priorityScore > 60;
  
  const handleAnalyzeClick = () => {
    setAnalyzing(true);
  };

  const onAnalysisComplete = () => {
    setAnalyzing(false);
  };

  if (analyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-4xl mx-auto">
        <h2 className="text-2xl font-medium tracking-tight mb-12 text-foreground">Running Intelligence Analysis Engine</h2>
        <AnalysisProgress onComplete={onAnalysisComplete} />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            {isHighPriority && (
              <span className="px-2 py-1 rounded bg-destructive/10 text-destructive text-[10px] font-bold uppercase tracking-wider">High Priority</span>
            )}
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">{project.authority} / {project.location.state}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">{project.name}</h1>
          <p className="text-sm text-muted-foreground mt-6 flex items-center gap-2 font-medium">
            <span className={`w-2 h-2 rounded-full ${isHighPriority ? 'bg-destructive animate-pulse' : 'bg-[#f59e0b]'}`} />
            Last updated {project.lastEvent}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 pb-1">
          <Button variant="outline" size="lg" onClick={handleAnalyzeClick} className="h-10 px-4 text-xs font-semibold shadow-sm border-border hover:bg-secondary text-foreground">
            <Activity className="w-4 h-4 mr-2" />
            Re-run Analysis
          </Button>
          <Link href={`/projects/${project.id}/timeline`} className={buttonVariants({ variant: "outline", className: "h-10 px-4 text-xs font-semibold shadow-sm border-border hover:bg-secondary text-foreground" })}>
            <GitMerge className="w-4 h-4 mr-2" />
            View Timeline
          </Link>
          {project.reviewCases.length > 0 && (
            <Link href={`/projects/${project.id}/review-case`} className={buttonVariants({ className: "h-10 px-6 text-xs font-bold tracking-wide shadow-md bg-primary hover:bg-primary/90 text-primary-foreground" })}>
              <Search className="w-4 h-4 mr-2" />
              Open Review Case
            </Link>
          )}
        </div>
      </div>

      {/* Intelligence Summary Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4">Intelligence Narrative</div>
          <p className="text-[15px] font-medium leading-relaxed text-foreground">{project.narrative || 'No variations detected. Project aligns with award snapshot.'}</p>
        </div>
        
        <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4">Detected Variations</div>
          <div className="flex items-center gap-6">
            <div className={`text-6xl font-semibold tracking-tight ${variations.length > 0 ? (isHighPriority ? 'text-destructive' : 'text-[#f59e0b]') : 'text-[#10b981]'}`}>
              {variations.length}
            </div>
            <div className="flex flex-col gap-1.5">
              {variations.slice(0, 3).map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />
                  {v.dimension}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4">Evidence State</div>
          {gaps.length > 0 ? (
            <div>
              <div className="text-5xl font-semibold tracking-tight text-destructive mb-3">{gaps.length} <span className="text-2xl">Gaps</span></div>
              <div className="text-xs font-medium text-muted-foreground">Requires {gaps[0].type}</div>
              <Link href={`/projects/${project.id}/evidence`} className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-foreground hover:text-primary uppercase tracking-wider transition-colors">
                <FileText className="w-3.5 h-3.5" /> View Network
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-3xl font-semibold text-[#10b981] mb-2">
                <CheckCircle2 className="w-7 h-7" /> Verified
              </div>
              <div className="text-xs font-medium text-muted-foreground mt-4">All submitted facts are supported by available evidence.</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 pt-8 pb-16">
        {/* Left: Alignment Visualization */}
        <div className="xl:col-span-5 flex flex-col gap-8">
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm h-[600px]">
            <AlignmentScore score={project.alignmentScore} />
          </div>
        </div>
        
        {/* Right: Flowing Comparison */}
        <div className="xl:col-span-7">
          <AwardCurrentComparison project={project} />
        </div>
      </div>
    </motion.div>
  );
}
