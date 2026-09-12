"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderGit2, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { ALL_PROJECTS } from '@/data/mockData';
import Link from 'next/link';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');

  // Handle Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  const searchResults = query.length > 1 ? ALL_PROJECTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.id.toLowerCase().includes(query.toLowerCase()) ||
    p.authority.toLowerCase().includes(query.toLowerCase()) ||
    p.sector.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed left-1/2 top-[15vh] -translate-x-1/2 w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl z-[101] overflow-hidden flex flex-col max-h-[70vh]"
          >
            <div className="flex items-center px-4 py-4 border-b border-border gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input 
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search intelligence by project, ID, sector, or authority..." 
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm font-medium"
              />
              <div className="text-[9px] font-bold text-muted-foreground bg-secondary px-2 py-1 rounded shadow-sm uppercase tracking-widest border border-border/50">
                ESC
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {query.length <= 1 ? (
                <div className="px-4 py-12 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Type to search across intelligence databanks...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  <h3 className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Projects</h3>
                  {searchResults.map(p => (
                    <Link 
                      key={p.id} 
                      href={`/projects/${p.id}`}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-secondary group transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-border shadow-sm group-hover:scale-105 transition-transform">
                          <FolderGit2 className="w-4 h-4 text-[#142b22]" />
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-foreground">{p.name}</div>
                          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.1em] mt-0.5">{p.id} · {p.sector}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-12 text-center">
                  <p className="text-sm font-medium text-muted-foreground">No matches found for &quot;{query}&quot;</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
