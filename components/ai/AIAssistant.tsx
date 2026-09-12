"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/components/providers/SystemProviders';
import { Sparkles, X, Send, Command, Loader2, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ALL_PROJECTS } from '@/data/mockData';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function AIAssistant() {
  const { isAiPanelOpen, setAiPanelOpen } = useSystem();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'I am ANVAYA Intelligence. How can I assist you with project analysis today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Determine Context based on pathname
  const getContext = () => {
    if (pathname.includes('/projects/')) {
      const id = pathname.split('/').pop();
      const project = ALL_PROJECTS.find(p => p.id === id);
      if (project) {
        return `User is viewing Project: ${project.name} (${project.projectCode}). Status: ${project.status}. Priority Score: ${project.priorityScore}.`;
      }
    }
    return `User is viewing: ${pathname}`;
  };

  useEffect(() => {
    if (messagesEndRef.current && isAiPanelOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiPanelOpen]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('anvaya-ai-chat');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('anvaya-ai-chat', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isAiPanelOpen) setAiPanelOpen(true);

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context: getContext()
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';
      let buffer = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep the last incomplete line in buffer
          
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ') && trimmed !== 'data: [DONE]') {
              try {
                const data = JSON.parse(trimmed.slice(6));
                if (data.choices[0].delta.content) {
                  assistantMsg += data.choices[0].delta.content;
                  setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].content = assistantMsg;
                    return newMsgs;
                  });
                }
              } catch (e) {
                // Ignore parse errors on chunks
              }
            }
          }
        }
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `SYSTEM ERROR: ${error.message || 'Unable to connect to Intelligence Engine.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (pathname === '/') return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out px-4 pointer-events-none",
      isAiPanelOpen ? "pb-0 md:pl-[260px]" : "pb-4 md:pl-[260px]" // Account for sidebar
    )}>
      
      {/* Container switches between a thin bar and an expanded chat window */}
      <motion.div 
        layout
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
        className={cn(
          "bg-card border border-border shadow-2xl overflow-hidden pointer-events-auto flex flex-col",
          isAiPanelOpen 
            ? (isExpanded ? "w-full md:w-[800px] h-[85vh] rounded-t-3xl rounded-b-none" : "w-full md:w-[600px] h-[500px] rounded-t-3xl rounded-b-none") 
            : "w-full md:w-[500px] h-14 rounded-full"
        )}
      >
        
        {/* Closed State Bar */}
        {!isAiPanelOpen && (
          <div 
            className="flex items-center h-full px-4 cursor-text group"
            onClick={() => setAiPanelOpen(true)}
          >
            <Sparkles className="w-4 h-4 text-primary mr-3 shrink-0" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ANVAYA to analyse this project..."
              className="flex-1 bg-transparent border-none text-[13px] outline-none placeholder:text-muted-foreground/60 cursor-text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground ml-3 shrink-0">
              <Command className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold">Enter</span>
            </div>
          </div>
        )}

        {/* Open State Chat Interface */}
        <AnimatePresence>
          {isAiPanelOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full w-full"
            >
              {/* Header */}
              <div className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0 bg-background/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-[14px] font-semibold tracking-tight">ANVAYA Intelligence</span>
                  <span className="flex items-center gap-1.5 ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-chart-2" />
                    <span className="text-[10px] text-muted-foreground font-semibold tracking-tight uppercase">Live</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors hidden md:block"
                  >
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => {
                      setAiPanelOpen(false);
                      setIsExpanded(false);
                    }}
                    className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Log */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-secondary/30">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <span className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-2 px-1">
                      {msg.role === 'user' ? 'You' : 'Intelligence'}
                    </span>
                    <div 
                      className={cn(
                        "px-5 py-3.5 rounded-[20px] text-[14px] leading-relaxed shadow-sm",
                        msg.role === 'user' 
                          ? "bg-primary text-primary-foreground rounded-br-sm" 
                          : "bg-card border border-border text-foreground rounded-bl-sm prose prose-sm prose-p:leading-relaxed max-w-none"
                      )}
                    >
                      {msg.content.split('\n').map((line, idx) => (
                        <p key={idx} className={idx !== 0 ? "mt-2" : ""}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex flex-col mr-auto items-start max-w-[85%]">
                    <span className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-2 px-1">
                      Intelligence
                    </span>
                    <div className="px-5 py-3.5 rounded-[20px] bg-card border border-border rounded-bl-sm flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      <span className="text-[14px] text-muted-foreground">Analyzing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 border-t border-border bg-card">
                <div className="mb-4 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                  <button onClick={() => { setInput("Summarize risks on NH-42"); handleSubmit(); }} className="shrink-0 text-[12px] px-4 py-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-border">Summarize risks on NH-42</button>
                  <button onClick={() => { setInput("Are there missing VOs?"); handleSubmit(); }} className="shrink-0 text-[12px] px-4 py-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-border">Are there missing VOs?</button>
                  <button onClick={() => { setInput("List all active projects"); handleSubmit(); }} className="shrink-0 text-[12px] px-4 py-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-border">List all active projects</button>
                </div>
                
                <form 
                  onSubmit={handleSubmit}
                  className="relative flex items-center bg-background border border-border rounded-2xl overflow-hidden focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 transition-all"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about variances, risks, or evidence..."
                    className="flex-1 bg-transparent border-none px-5 py-4 text-[14px] outline-none placeholder:text-muted-foreground/60"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2 mr-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
