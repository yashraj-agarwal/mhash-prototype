"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type SystemContextType = {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isAiPanelOpen: boolean;
  setAiPanelOpen: (open: boolean) => void;
};

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProviders({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isAiPanelOpen, setAiPanelOpen] = useState(false);

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('anvaya-sidebar-expanded');
    if (savedState !== null) {
      setIsSidebarExpanded(savedState === 'true');
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => {
      const newState = !prev;
      localStorage.setItem('anvaya-sidebar-expanded', String(newState));
      return newState;
    });
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + K for Command Palette
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      
      // CMD/CTRL + Enter for AI Panel
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setAiPanelOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SystemContext.Provider value={{
      isSidebarExpanded,
      toggleSidebar,
      isCommandPaletteOpen,
      setCommandPaletteOpen,
      isAiPanelOpen,
      setAiPanelOpen
    }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProviders');
  }
  return context;
}
