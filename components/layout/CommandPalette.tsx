"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/components/providers/SystemProviders';
import { Search, FolderGit2, AlertTriangle, ArrowRight, X, Network } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ALL_PROJECTS } from '@/data/mockData';

export function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useSystem();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  if (pathname === '/' || pathname === '/login' || !isCommandPaletteOpen) return null;

  const filteredProjects = ALL_PROJECTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.sector.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setCommandPaletteOpen(false)}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center px-4 py-4 border-b border-border/50">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <input 
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, variations, or evidence..."
              className="flex-1 bg-transparent border-none text-base outline-none placeholder:text-muted-foreground/70"
            />
            <button 
              onClick={() => setCommandPaletteOpen(false)}
              className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!query ? (
              <div className="py-6 px-4">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-2">Suggestions</div>
                <div className="space-y-1">
                  <Link href="/projects" onClick={() => setCommandPaletteOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-accent group transition-colors">
                    <div className="flex items-center gap-3">
                      <FolderGit2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                      <span className="font-medium">Browse All Projects</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/graph" onClick={() => setCommandPaletteOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-accent group transition-colors">
                    <div className="flex items-center gap-3">
                      <Network className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                      <span className="font-medium">Knowledge Graph</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <Link href="/variations" onClick={() => setCommandPaletteOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-accent group transition-colors">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                      <span className="font-medium">Recent Variations</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="py-2">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-4">Projects</div>
                {filteredProjects.map(p => (
                  <Link 
                    key={p.id} 
                    href={`/projects/${p.id}`}
                    onClick={() => setCommandPaletteOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-accent group transition-colors rounded-lg mx-2"
                  >
                    <div>
                      <div className="font-medium text-[14px]">{p.name}</div>
                      <div className="text-[12px] text-muted-foreground mt-0.5">{p.projectCode} · {p.sector}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <p>No results found for &quot;{query}&quot;</p>
              </div>
            )}
          </div>
          
          <div className="bg-accent/30 border-t border-border/50 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-background rounded border border-border shadow-sm">esc</kbd> to close</span>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-background rounded border border-border shadow-sm">↵</kbd> to select</span>
            </div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Anvaya OS
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
