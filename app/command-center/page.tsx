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
    <div className="p-8 md:p-10 max-w-[1600px] mx-auto space-y-8 min-h-full flex flex-col bg-background">
      <CommandHeader />
      
      <DynamicMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Map & Charts */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="h-[500px] bg-card border border-border/50 rounded-2xl overflow-hidden relative shadow-sm">
            <IntelligenceMap projects={ALL_PROJECTS} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
            <VariationsByType />
            <ProjectDriftChart />
          </div>
        </div>
        
        {/* RIGHT COLUMN: Todays Brief & Live Feed */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-[832px]">
          <div className="flex-1 bg-card border border-border/50 rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <TodaysBrief />
          </div>
          <div className="flex-1 bg-card border border-border/50 rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <LiveFeed />
          </div>
        </div>
      </div>

      {/* FULL WIDTH: Priority Queue */}
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm h-[500px]">
        <PriorityQueue />
      </div>
      
      <div className="h-12" /> {/* Bottom padding */}
    </div>
  );
}
