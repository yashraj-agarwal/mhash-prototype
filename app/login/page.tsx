"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PERSONAS, safeNextPath } from '@/lib/auth/personas';
import { useAuth } from '@/components/providers/AuthProvider';
import { Target, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (userId: string) => {
    setPendingId(userId);
    setError(null);
    try {
      await login(userId);
      router.push(safeNextPath(searchParams.get('next')));
    } catch {
      setError('Could not open the workbench. Try another persona.');
      setPendingId(null);
    }
  };

  return (
    <div className="min-h-full w-full bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Target className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <div className="text-[15px] font-semibold tracking-tight">ANVAYA</div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Post-award intelligence
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
          Enter the workbench.
        </h1>
        <p className="mt-4 text-[16px] text-muted-foreground max-w-xl leading-relaxed">
          Prototype SSO. Pick a jurisdiction role — the graph, queue, and copilot open in that layer.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
          {PERSONAS.map((persona) => {
            const busy = pendingId === persona.id;
            return (
              <button
                key={persona.id}
                type="button"
                disabled={pendingId !== null}
                onClick={() => handleSelect(persona.id)}
                className="text-left bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all disabled:opacity-60 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {persona.layer}
                    </div>
                    <div className="mt-2 text-[17px] font-semibold tracking-tight">{persona.name}</div>
                    <div className="text-[13px] text-muted-foreground mt-0.5">{persona.title}</div>
                    <div className="text-[12px] text-muted-foreground mt-3">{persona.jurisdiction}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 mt-1 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                {busy && (
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    Opening session…
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {error && <p className="mt-6 text-[13px] text-muted-foreground">{error}</p>}

        <p className="mt-10 text-[12px] text-muted-foreground">
          Demo gate only. No password. Session is a cookie on this browser.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-full grid place-items-center text-muted-foreground text-sm">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
