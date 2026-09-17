"use client";

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DEMO_PASSWORD, PERSONAS, safeNextPath } from '@/lib/auth/personas';
import { useAuth } from '@/components/providers/AuthProvider';

const demoPersona = PERSONAS[0];

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await login(email, password);
      router.push(safeNextPath(searchParams.get('next')));
    } catch {
      setError('Could not verify those credentials.');
      setPending(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background relative">
      <header className="absolute left-[clamp(24px,5cqw,64px)] right-[clamp(24px,5cqw,64px)] top-[clamp(24px,4.5cqw,48px)] flex items-center justify-between gap-5">
        <span className="text-[24px] font-bold tracking-tight">ANVAYA</span>
        <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#86868b]">
          POST-AWARD INTELLIGENCE
        </span>
      </header>

      <div className="flex min-h-[100dvh] w-full items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            WORKBENCH ACCESS
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            Enter the workbench.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground font-medium leading-relaxed">
            Sign in with your issued credentials to open the intelligence workbench.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="user-id" className="text-[13px] font-semibold">
                User ID
              </label>
              <input
                id="user-id"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={pending}
                className="mt-2 w-full h-11 rounded-md bg-card border border-input px-4 text-[15px]"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-[13px] font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={pending}
                className="mt-2 w-full h-11 rounded-md bg-card border border-input px-4 text-[15px]"
              />
            </div>
            {error && <p className="text-[13px]">{error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="w-full min-h-[46px] rounded-full bg-primary text-primary-foreground text-[15px] font-semibold shadow-[0_4px_14px_rgba(0,113,227,0.3)] hover:bg-[#0077ed]"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 rounded-xl border border-border/30 bg-secondary/30 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              DEMO ACCESS
            </p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-[13px]">
              <dt className="font-semibold">User ID</dt>
              <dd>{demoPersona.email}</dd>
              <dt className="font-semibold">Password</dt>
              <dd>{DEMO_PASSWORD}</dd>
              <dt className="font-semibold">Opens</dt>
              <dd>
                {demoPersona.title} · {demoPersona.jurisdiction}
              </dd>
            </dl>
          </div>

          <p className="mt-8 text-[13px]">
            <Link href="/" className="font-semibold hover:text-primary">
              Return to Anvaya
            </Link>
          </p>
        </div>
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
