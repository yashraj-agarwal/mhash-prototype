import { ShieldCheck } from 'lucide-react';

export default function AuditorLogsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full space-y-4 p-8">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <ShieldCheck className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Auditor Logs</h1>
      <p className="text-muted-foreground text-center max-w-md">
        This module is currently in development. It will provide a secure, immutable ledger of all system decisions, policy overrides, and manual interventions across the platform.
      </p>
    </div>
  );
}
