"use client";
import { usePathname } from 'next/navigation';
import { Bell, Search, Command, UserCircle, Plus, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useSystem } from '@/components/providers/SystemProviders';
import Link from 'next/link';

export function TopNavigation() {
  const pathname = usePathname();
  const { setCommandPaletteOpen } = useSystem();
  
  // Hide on landing page
  if (pathname === '/') return null;

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <header className="h-16 bg-background/70 backdrop-blur-[20px] backdrop-saturate-[180%] flex items-center justify-between px-8 border-b border-border shrink-0 z-10 sticky top-0">
      
      {/* Left side: Breadcrumbs */}
      <div className="flex items-center flex-1 pr-4 gap-2">
        <Link href="/command-center" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
          Anvaya
        </Link>
        {pathSegments.map((segment, index) => {
          // simple formatting for segments
          const formatted = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
          return (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              <Link 
                href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                className={`text-[13px] font-medium transition-colors ${index === pathSegments.length - 1 ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {formatted}
              </Link>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center gap-5">
        
        {/* Global Search Trigger */}
        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-3 bg-accent/30 hover:bg-accent/50 border border-border/50 rounded-full pl-3 pr-1.5 py-1.5 transition-all text-muted-foreground hover:text-foreground w-64 group"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="text-[12px] font-medium flex-1 text-left">Search projects...</span>
          <div className="flex items-center gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
            <Command className="w-[10px] h-[10px]" />
            <span className="text-[10px] font-semibold">K</span>
          </div>
        </button>

        {/* Demo Mode Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-card text-muted-foreground text-[10px] font-bold uppercase tracking-wider cursor-help group relative shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-chart-4" />
          Demo Mode
          <div className="absolute top-full mt-2 right-0 w-64 p-3 rounded-lg border border-border bg-card shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-left">
            <p className="text-muted-foreground text-xs font-medium normal-case">
              Mock deterministic dataset loaded. System is currently analyzing NH-42 Highway Expansion.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Quick Action */}
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          
          {/* Notifications */}
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full border border-background"></span>
          </button>
          
          {/* Profile */}
          <button className="ml-2 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors">
            <UserCircle className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
}
