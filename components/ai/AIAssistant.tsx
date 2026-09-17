"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/components/providers/SystemProviders';
import { useAuth } from '@/components/providers/AuthProvider';
import { Sparkles, Send, Command, Loader2, ChevronDown, Plus, History, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ALL_PROJECTS } from '@/data/mockData';
import {
  loadActiveId,
  loadMemory,
  loadThreads,
  newThread,
  noteFromTurn,
  rememberNote,
  saveActiveId,
  saveThreads,
  titleFromPrompt,
  type ChatMemory,
  type ChatMessage,
  type ChatThread,
} from '@/lib/chat/storage';

function greetingFor(name: string) {
  return `Anvaya copilot. ${name}, ask whether a project is still the one that was awarded. I read the graph on this screen.`;
}

export function AIAssistant() {
  const { isAiPanelOpen, setAiPanelOpen, isSidebarExpanded } = useSystem();
  const { user } = useAuth();
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [memory, setMemory] = useState<ChatMemory>({ notes: [], updatedAt: new Date().toISOString() });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const publicChrome = pathname === '/' || pathname === '/login';

  useEffect(() => {
    const stored = loadThreads();
    const initial = stored.length > 0 ? stored : [newThread()];
    const storedActive = loadActiveId();
    setThreads(initial);
    setActiveId(storedActive && initial.some((t) => t.id === storedActive) ? storedActive : initial[0].id);
    setMemory(loadMemory());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || isLoading) return;
    saveThreads(threads);
    if (activeId) saveActiveId(activeId);
  }, [threads, activeId, hydrated, isLoading]);

  const active = threads.find((t) => t.id === activeId) ?? threads[0];
  const messages = active?.messages ?? [];

  useEffect(() => {
    if (messagesEndRef.current && isAiPanelOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiPanelOpen, isLoading]);

  const viewingProject = (() => {
    const id = pathname.split('/').filter(Boolean);
    const idx = id.indexOf('projects');
    if (idx >= 0 && id[idx + 1]) return ALL_PROJECTS.find((p) => p.id === id[idx + 1]);
    return undefined;
  })();

  const prompts = viewingProject
    ? [
        `Is ${viewingProject.name} still the project we awarded?`,
        'What evidence is missing?',
        'What does the highest-priority change imply?',
      ]
    : [
        'Which projects need intervention today?',
        'Which contractor repeats across districts?',
        'Summarize material cost variations',
      ];

  const persistThreads = (updater: (current: ChatThread[]) => ChatThread[]) => {
    setThreads((current) => updater(current));
  };

  const startThread = () => {
    const thread = newThread();
    persistThreads((current) => [thread, ...current]);
    setActiveId(thread.id);
    setAiPanelOpen(true);
  };

  const handleSubmit = async (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || isLoading || !active) return;

    if (!isAiPanelOpen) setAiPanelOpen(true);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    };

    const note = noteFromTurn(text, viewingProject ? `ACTIVE PROJECT FILE:\n${viewingProject.name}` : '');
    const nextMemory = note ? rememberNote(note, memory) : memory;
    if (note) setMemory(nextMemory);

    persistThreads((current) =>
      current.map((thread) => {
        if (thread.id !== active.id) return thread;
        const titled = thread.messages.length === 0 ? titleFromPrompt(text) : thread.title;
        return {
          ...thread,
          title: titled,
          messages: [...thread.messages, userMsg],
          updatedAt: new Date().toISOString(),
        };
      }),
    );
    setInput('');
    setIsLoading(true);

    const historyForApi = [...messages, userMsg].map(({ role, content }) => ({ role, content }));

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyForApi,
          pathname,
          memory: nextMemory.notes,
          officer: user ? `${user.name}, ${user.title}, ${user.jurisdiction}` : 'unknown officer',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const assistantId = `a-${Date.now()}`;
      persistThreads((current) =>
        current.map((thread) =>
          thread.id === active.id
            ? {
                ...thread,
                messages: [
                  ...thread.messages,
                  { id: assistantId, role: 'assistant', content: '', createdAt: new Date().toISOString() },
                ],
                updatedAt: new Date().toISOString(),
              }
            : thread,
        ),
      );

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ') && trimmed !== 'data: [DONE]') {
              try {
                const data = JSON.parse(trimmed.slice(6));
                const token = data.choices?.[0]?.delta?.content;
                if (token) {
                  assistantMsg += token;
                  persistThreads((current) =>
                    current.map((thread) => {
                      if (thread.id !== active.id) return thread;
                      const nextMessages = [...thread.messages];
                      const last = nextMessages[nextMessages.length - 1];
                      if (last?.role === 'assistant') {
                        nextMessages[nextMessages.length - 1] = { ...last, content: assistantMsg };
                      }
                      return { ...thread, messages: nextMessages };
                    }),
                  );
                }
              } catch {
                // incomplete SSE chunk
              }
            }
          }
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to connect to Intelligence Engine.';
      persistThreads((current) =>
        current.map((thread) =>
          thread.id === active.id
            ? {
                ...thread,
                messages: [
                  ...thread.messages.filter((m) => m.role !== 'assistant' || m.content),
                  {
                    id: `err-${Date.now()}`,
                    role: 'assistant',
                    content: `SYSTEM ERROR: ${message}`,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : thread,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (publicChrome || !user) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none',
        isSidebarExpanded ? 'md:pl-[260px]' : 'md:pl-[72px]',
      )}
    >
      <div className="w-full max-w-[640px] pointer-events-auto flex flex-col items-stretch gap-3">
        <AnimatePresence>
          {isAiPanelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.28, 0.11, 0.32, 1] }}
              className="bg-card/95 backdrop-blur-xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.18)] rounded-3xl overflow-hidden flex h-[min(62vh,560px)]"
            >
              {historyOpen && (
                <div className="w-52 shrink-0 border-r border-border bg-secondary/40 flex flex-col">
                  <div className="px-3 py-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">History</span>
                    <button type="button" onClick={() => setHistoryOpen(false)} className="p-1 rounded-md hover:bg-accent text-muted-foreground">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={startThread}
                    className="mx-2 mb-2 inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-medium hover:bg-accent"
                  >
                    <Plus className="w-3.5 h-3.5" /> New chat
                  </button>
                  <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-1">
                    {threads.map((thread) => (
                      <button
                        key={thread.id}
                        type="button"
                        onClick={() => setActiveId(thread.id)}
                        className={cn(
                          'w-full text-left rounded-lg px-2.5 py-2 text-[12px] leading-snug',
                          thread.id === active?.id ? 'bg-accent font-medium' : 'hover:bg-accent/60 text-muted-foreground',
                        )}
                      >
                        {thread.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1 flex flex-col min-w-0">
                <div className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={() => setHistoryOpen((v) => !v)}
                      className="p-1.5 rounded-md hover:bg-accent text-muted-foreground"
                      title="Chat history"
                    >
                      <History className="w-4 h-4" />
                    </button>
                    <Sparkles className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[13px] font-semibold truncate">Anvaya</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAiPanelOpen(false)}
                    className="p-1.5 rounded-md hover:bg-accent text-muted-foreground"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-secondary/20">
                  {memory.notes.length > 0 && (
                    <div className="rounded-xl border border-border bg-background/70 px-3 py-2">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Memory</div>
                      <p className="text-[12px] text-muted-foreground leading-relaxed">
                        {memory.notes.slice(0, 3).join(' · ')}
                      </p>
                    </div>
                  )}

                  {messages.length === 0 && (
                    <div className="text-[14px] text-muted-foreground leading-relaxed">
                      {greetingFor(user.name.split(' ')[0])}
                    </div>
                  )}

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex flex-col max-w-[88%]',
                        msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start',
                      )}
                    >
                      <span className="text-[11px] font-semibold tracking-tight text-muted-foreground mb-1.5 px-1">
                        {msg.role === 'user' ? 'You' : 'Anvaya'}
                      </span>
                      <div
                        className={cn(
                          'px-4 py-3 rounded-[20px] text-[14px] leading-relaxed shadow-sm',
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-card border border-border text-foreground rounded-bl-sm',
                        )}
                      >
                        {msg.content.split('\n').map((line, idx) => (
                          <p key={idx} className={idx !== 0 ? 'mt-2' : ''}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}

                  {isLoading && (!messages.length || messages[messages.length - 1]?.role !== 'assistant' || !messages[messages.length - 1]?.content) && (
                    <div className="flex items-center gap-2 text-muted-foreground text-[13px]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Reading the graph…
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto hide-scrollbar">
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSubmit(prompt)}
                      className="shrink-0 text-[12px] px-3 py-1.5 rounded-full bg-secondary/70 text-muted-foreground hover:text-foreground border border-border"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          layout
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="h-14 rounded-full bg-card/95 backdrop-blur-xl border border-border shadow-[0_12px_40px_rgba(0,0,0,0.14)] flex items-center px-4 gap-3"
        >
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setAiPanelOpen(true)}
            placeholder={viewingProject ? `Ask about ${viewingProject.name}…` : 'Ask Anvaya whether this is still the awarded project…'}
            className="flex-1 bg-transparent border-none text-[13px] outline-none placeholder:text-muted-foreground/70"
          />
          {isAiPanelOpen ? (
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-1 text-muted-foreground/50 shrink-0">
              <Command className="w-3 h-3" />
              <span className="text-[10px] font-semibold">Enter</span>
            </div>
          )}
        </motion.form>
      </div>
    </div>
  );
}
