export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

export type ChatThread = {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
};

export type ChatMemory = {
  notes: string[];
  updatedAt: string;
};

const THREADS_KEY = 'anvaya-chat-threads';
const ACTIVE_KEY = 'anvaya-chat-active';
const MEMORY_KEY = 'anvaya-chat-memory';

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function newThread(): ChatThread {
  return {
    id: uid(),
    title: 'New brief',
    messages: [],
    updatedAt: new Date().toISOString(),
  };
}

export function loadThreads(): ChatThread[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(THREADS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as ChatThread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveThreads(threads: ChatThread[]) {
  localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
}

export function loadActiveId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_KEY);
}

export function saveActiveId(id: string) {
  localStorage.setItem(ACTIVE_KEY, id);
}

export function loadMemory(): ChatMemory {
  if (typeof window === 'undefined') return { notes: [], updatedAt: new Date().toISOString() };
  const raw = localStorage.getItem(MEMORY_KEY);
  if (!raw) return { notes: [], updatedAt: new Date().toISOString() };
  try {
    const parsed = JSON.parse(raw) as ChatMemory;
    return parsed.notes ? parsed : { notes: [], updatedAt: new Date().toISOString() };
  } catch {
    return { notes: [], updatedAt: new Date().toISOString() };
  }
}

export function saveMemory(memory: ChatMemory) {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

export function rememberNote(note: string, existing: ChatMemory): ChatMemory {
  const cleaned = note.trim();
  if (!cleaned) return existing;
  const notes = [cleaned, ...existing.notes.filter((n) => n !== cleaned)].slice(0, 12);
  const next = { notes, updatedAt: new Date().toISOString() };
  saveMemory(next);
  return next;
}

export function titleFromPrompt(text: string) {
  const trimmed = text.trim().replace(/\s+/g, ' ');
  return trimmed.length > 42 ? `${trimmed.slice(0, 42)}…` : trimmed;
}

export function noteFromTurn(userText: string, pageContext: string): string | null {
  const text = userText.trim();
  if (text.length < 8) return null;
  const projectHint = pageContext.match(/ACTIVE PROJECT FILE:\n([^\n[]+)/);
  const project = projectHint?.[1]?.trim();
  if (project) return `Asked on ${project}: ${titleFromPrompt(text)}`;
  return `Asked: ${titleFromPrompt(text)}`;
}
