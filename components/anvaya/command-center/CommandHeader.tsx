import { getAggregateStats } from '@/data/mockData';

export function CommandHeader() {
  const stats = getAggregateStats();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 pt-4">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Command Center</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">{today}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
          {stats.projectsRequiringReview === 0 
            ? "All projects are currently aligned."
            : `${stats.projectsRequiringReview} projects require attention today.`}
        </h1>
        
        <p className="text-lg text-muted-foreground mt-4 leading-relaxed max-w-2xl font-medium">
          Cost, material and schedule variations were detected across {stats.totalProjects} monitored infrastructure projects.
        </p>
      </div>
      
      <div className="flex items-center gap-8 pb-1">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">System Status</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Operational</span>
          </div>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Last Synced</span>
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider mt-1">Just now</span>
        </div>
      </div>
    </div>
  );
}
