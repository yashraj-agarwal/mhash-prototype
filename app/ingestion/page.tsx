import { Database } from 'lucide-react';

export default function IngestionHubPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full space-y-4 p-8">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Database className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Data Ingestion Hub</h1>
      <p className="text-muted-foreground text-center max-w-md">
        This module is currently in development. It will show the real-time processing pipeline for documents, invoices, site photos, and public records being parsed by the intelligence engine.
      </p>
    </div>
  );
}
