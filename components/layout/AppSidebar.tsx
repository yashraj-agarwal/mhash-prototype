"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderGit2, Search, Settings, Activity, FileText, AlertTriangle, Target, ChevronLeft, Users, Map, Scale, Network, Database, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSystem } from '@/components/providers/SystemProviders';

const NavItem = ({ href, icon: Icon, label, isActive, pathname, isCollapsed }: { href: string, icon: any, label: string, isActive?: boolean, pathname: string, isCollapsed: boolean }) => {
  const active = isActive ?? (pathname.startsWith(href) && (href !== '/' || pathname === '/'));
  return (
    <Link href={href} title={isCollapsed ? label : undefined} className={cn(
      "flex items-center gap-3 px-3 py-2.5 text-[14px] rounded-xl transition-all group relative overflow-hidden",
      isCollapsed ? "justify-center" : "",
      active 
        ? "font-medium text-foreground bg-accent/80" 
        : "font-normal text-muted-foreground hover:text-foreground hover:bg-accent/40"
    )}>
      <Icon className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]", active ? "text-primary" : "group-hover:text-foreground transition-colors")} />
      {!isCollapsed && <span>{label}</span>}
      {active && !isCollapsed && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full" />
      )}
    </Link>
  );
};

export function AppSidebar() {
  const pathname = usePathname();
  const { isSidebarExpanded, toggleSidebar } = useSystem();
  
  if (pathname === '/' || pathname === '/login') return null;

  return (
    <div 
      className={cn(
        "hidden md:flex border-r border-border bg-sidebar flex-col h-full shrink-0 z-10 relative transition-all duration-300 ease-in-out",
        isSidebarExpanded ? "w-[260px]" : "w-[72px]"
      )}
    >
      <div className={cn("p-6 pb-2 mt-2 flex items-center", isSidebarExpanded ? "justify-between" : "justify-center")}>
        <Link href="/" className={cn("flex items-center gap-2.5 group", !isSidebarExpanded && "hidden")}>
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
            <Target className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">ANVAYA</h1>
        </Link>
        
        {/* Only show target logo when collapsed */}
        <Link href="/" className={cn("w-8 h-8 rounded bg-primary items-center justify-center group-hover:bg-primary/90 transition-colors", isSidebarExpanded ? "hidden" : "flex")}>
          <Target className="w-4 h-4 text-primary-foreground" />
        </Link>

        <button 
          onClick={toggleSidebar}
          className={cn(
            "p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors",
            !isSidebarExpanded && "absolute -right-3 top-6 bg-border rounded-full p-1 shadow-sm border border-background hover:bg-primary hover:text-primary-foreground"
          )}
        >
          {isSidebarExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronLeft className="w-3 h-3 rotate-180" />}
        </button>
      </div>
      
      <div className="flex-1 px-4 mt-8 space-y-10 overflow-y-auto hide-scrollbar">
        <div className="space-y-1">
          <NavItem href="/command-center" icon={Activity} label="Command Center" pathname={pathname} isCollapsed={!isSidebarExpanded} />
          <NavItem href="/projects" icon={FolderGit2} label="All Projects" pathname={pathname} isCollapsed={!isSidebarExpanded} />
        </div>
        
        <div>
          {!isSidebarExpanded ? (
            <div className="flex justify-center mb-3">
              <div className="w-4 h-[1px] bg-border" />
            </div>
          ) : (
            <h3 className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center">
              Intelligence
            </h3>
          )}
          <div className="space-y-1">
            <NavItem href="/variations" icon={AlertTriangle} label="Material Variations" pathname={pathname} isCollapsed={!isSidebarExpanded} />
            <NavItem href="/evidence" icon={FileText} label="Evidence Network" pathname={pathname} isCollapsed={!isSidebarExpanded} />
            <NavItem href="/review" icon={Search} label="Review Cases" pathname={pathname} isCollapsed={!isSidebarExpanded} />
          </div>
        </div>

        <div>
          {!isSidebarExpanded ? (
            <div className="flex justify-center mb-3">
              <div className="w-4 h-[1px] bg-border" />
            </div>
          ) : (
            <h3 className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center">
              Network
            </h3>
          )}
          <div className="space-y-1">
            <NavItem href="/contractors" icon={Users} label="Contractor Registry" pathname={pathname} isCollapsed={!isSidebarExpanded} />
            <NavItem href="/graph" icon={Network} label="Knowledge Graph" pathname={pathname} isCollapsed={!isSidebarExpanded} />
          </div>
        </div>

        <div>
          {!isSidebarExpanded ? (
            <div className="flex justify-center mb-3">
              <div className="w-4 h-[1px] bg-border" />
            </div>
          ) : (
            <h3 className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center">
              Jurisdiction
            </h3>
          )}
          <div className="space-y-1">
            <NavItem href="/district-rollup" icon={Map} label="District Rollup" pathname={pathname} isCollapsed={!isSidebarExpanded} />
            <NavItem href="/city-rollup" icon={Map} label="City Rollup" pathname={pathname} isCollapsed={!isSidebarExpanded} />
            <NavItem href="/state-rollup" icon={Map} label="State Escalations" pathname={pathname} isCollapsed={!isSidebarExpanded} />
            <NavItem href="/policy" icon={Scale} label="Policy Matrix" pathname={pathname} isCollapsed={!isSidebarExpanded} />
          </div>
        </div>

        <div>
          {!isSidebarExpanded ? (
            <div className="flex justify-center mb-3">
              <div className="w-4 h-[1px] bg-border" />
            </div>
          ) : (
            <h3 className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center">
              Data Operations
            </h3>
          )}
          <div className="space-y-1">
            <NavItem href="/ingestion" icon={Database} label="Ingestion Hub" pathname={pathname} isCollapsed={!isSidebarExpanded} />
            <NavItem href="/auditor" icon={ShieldCheck} label="Auditor Logs" pathname={pathname} isCollapsed={!isSidebarExpanded} />
          </div>
        </div>
      </div>
      
      <div className="p-3 mt-auto border-t border-border/50">
        <NavItem href="#" icon={Settings} label="System Configuration" isActive={false} pathname={pathname} isCollapsed={!isSidebarExpanded} />
        
        {!isSidebarExpanded ? (
          <div className="mt-4 flex justify-center pb-2">
            <span className="w-2 h-2 rounded-full bg-chart-5 animate-pulse" />
          </div>
        ) : (
          <div className="mt-4 px-3 py-3 rounded-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-chart-5 animate-pulse" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">System Live</span>
          </div>
        )}
      </div>
    </div>
  );
}
