import { CommandHeader } from '@/components/anvaya/command-center/CommandHeader';
import { IntelligenceMap } from '@/components/anvaya/command-center/IntelligenceMap';
import { PriorityQueue } from '@/components/anvaya/command-center/PriorityQueue';
import { DynamicMetrics } from '@/components/anvaya/command-center/DynamicMetrics';
import { LiveFeed } from '@/components/anvaya/command-center/LiveFeed';
import { TodaysBrief } from '@/components/anvaya/command-center/TodaysBrief';
import { VariationsByType } from '@/components/anvaya/command-center/VariationsByType';
import { ProjectDriftChart } from '@/components/anvaya/command-center/ProjectDriftChart';
import { ALL_PROJECTS } from '@/data/mockData';

export default function CommandCenter() {
  return (
    <div className="px-8 md:px-12 pt-10 pb-20 max-w-[1600px] mx-auto space-y-12 min-h-full flex flex-col bg-background selection:bg-primary/20">
      <CommandHeader />
      
      <div className="py-4">
        <DynamicMetrics />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16">
        {/* LEFT COLUMN: Map & Charts */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Live Intelligence Network</h3>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium"><span className="w-1 h-1 rounded-full bg-chart-5 animate-pulse" /> Syncing</span>
            </div>
            <div className="h-[460px] bg-secondary/30 rounded-2xl overflow-hidden relative border border-border/30">
              <IntelligenceMap projects={ALL_PROJECTS} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
            <VariationsByType />
            <ProjectDriftChart />
          </div>

        </div>
        
        {/* RIGHT COLUMN: Todays Brief & Live Feed */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          
          <div className="flex-1 flex flex-col gap-4">
            <TodaysBrief />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <LiveFeed />
          </div>

        </div>
      </div>

      <div className="w-full h-px bg-border/40 my-8" />

      {/* FULL WIDTH: Priority Queue */}
      <div className="flex flex-col gap-4 h-[600px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Global Priority Queue</h3>
        </div>
        <div className="flex-1 bg-secondary/30 rounded-2xl overflow-hidden border border-border/30">
          <PriorityQueue />
        </div>
      </div>
      
    </div>
  );
}
