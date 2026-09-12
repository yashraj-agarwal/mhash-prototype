"use client";
import { usePathname } from 'next/navigation';
import { Bell, Search, Command, UserCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SearchDialog } from '@/components/layout/SearchDialog';

export function TopNavigation() {
  const pathname = usePathname();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Handle Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Hide on landing page
  if (pathname === '/') return null;

  return (
    <>
      <header className="h-16 bg-background flex items-center justify-between px-8 shrink-0 z-10 relative">
        <div className="flex items-center flex-1 pr-4">
          <div 
            className={`relative w-full max-w-[480px] transition-all duration-300 ${searchFocused ? 'ring-1 ring-ring rounded-md' : ''}`}
            onClick={() => setSearchOpen(true)}
          >
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-colors ${searchFocused ? 'text-foreground' : 'text-muted-foreground'}`} />
            <input 
              type="text" 
              placeholder="Search intelligence, contracts, or facts..." 
              className="w-full bg-accent/30 border-none rounded-md pl-9 pr-12 py-1.5 text-[13px] font-medium focus:outline-none focus:bg-accent/50 text-foreground placeholder:text-muted-foreground transition-colors cursor-pointer"
              readOnly
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
              <Command className="w-[10px] h-[10px]" />
              <span className="text-[9px] font-semibold">K</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-white text-muted-foreground text-[10px] font-bold uppercase tracking-wider cursor-help group relative shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            Demo Mode
            <div className="absolute top-full mt-2 right-0 w-64 p-3 rounded-lg border border-border bg-card shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-left">
              <p className="text-muted-foreground text-xs font-medium normal-case">
                Mock deterministic dataset loaded. System is currently analyzing NH-42 Highway Expansion.
              </p>
            </div>
          </div>
          
          <button className="text-muted-foreground hover:text-foreground relative transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ef4444] rounded-full border border-background"></span>
          </button>
          
          <button className="w-7 h-7 rounded-full bg-accent border border-border flex items-center justify-center hover:bg-accent/80 transition-colors">
            <UserCircle className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
