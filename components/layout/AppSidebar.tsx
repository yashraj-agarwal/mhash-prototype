"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderGit2, Search, Settings, Activity, FileText, AlertTriangle, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavItem = ({ href, icon: Icon, label, isActive, pathname }: { href: string, icon: any, label: string, isActive?: boolean, pathname: string }) => {
  const active = isActive ?? (pathname.startsWith(href) && (href !== '/' || pathname === '/'));
  return (
    <Link href={href} className={cn(
      "flex items-center gap-3 px-2 py-2 text-[13px] rounded-lg transition-colors group relative overflow-hidden",
      active 
        ? "font-semibold text-foreground bg-accent/30" 
        : "font-medium text-muted-foreground hover:text-foreground hover:bg-accent/20"
    )}>
      <Icon className={cn("w-[18px] h-[18px]", active ? "text-foreground" : "group-hover:text-foreground transition-colors")} />
      {label}
    </Link>
  );
};

export function AppSidebar() {
  const pathname = usePathname();
  
  // Hide sidebar entirely on the landing page (root) to let the cinematic hero shine
  if (pathname === '/') return null;

  return (
    <div className="hidden md:flex w-[260px] border-r border-border bg-sidebar flex-col h-full shrink-0 z-10 relative">
      <div className="p-6 pb-2 mt-2">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
            <Target className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">ANVAYA</h1>
        </Link>
      </div>
      
      <div className="flex-1 px-4 mt-8 space-y-8 overflow-y-auto hide-scrollbar">
        <div className="space-y-0.5">
          <NavItem href="/command-center" icon={Activity} label="Command Center" pathname={pathname} />
          <NavItem href="/projects" icon={FolderGit2} label="All Projects" pathname={pathname} />
        </div>
        
        <div>
          <h3 className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-3 flex items-center">
            Intelligence
          </h3>
          <div className="space-y-0.5">
            <NavItem href="/variations" icon={AlertTriangle} label="Material Variations" pathname={pathname} />
            <NavItem href="/evidence" icon={FileText} label="Evidence Network" pathname={pathname} />
            <NavItem href="/review" icon={Search} label="Review Cases" pathname={pathname} />
          </div>
        </div>
      </div>
      
      <div className="p-4 mt-auto">
        <NavItem href="#" icon={Settings} label="System Configuration" isActive={false} pathname={pathname} />
        
        <div className="mt-4 px-3 py-3 rounded-lg flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">System Live</span>
        </div>
      </div>
    </div>
  );
}
