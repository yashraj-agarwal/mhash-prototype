import Link from 'next/link';
import { ingestLedger } from '@/lib/intelligence/aggregations';

export default function IngestionHubPage() {
  const rows = ingestLedger();

  return (
    <div className="px-8 md:px-12 pt-10 pb-20 max-w-[1600px] mx-auto space-y-12 min-h-full flex flex-col bg-background">
      <div className="flex items-center justify-between pb-6 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Evidence Ingestion</h1>
          <p className="text-sm text-muted-foreground mt-1">Files on review cases, with ingest status from the ledger.</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-border/40 rounded-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              <th className="px-6 py-4">Filename</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.projectId}:${row.id}`} className="border-b border-border/30 last:border-0 align-top">
                <td className="px-6 py-4 font-medium text-foreground">{row.title}</td>
                <td className="px-6 py-4 text-foreground">{row.type}</td>
                <td className="px-6 py-4 tabular-nums text-foreground">{row.date}</td>
                <td className="px-6 py-4">
                  <Link href={`/projects/${row.projectId}`} className="text-foreground hover:underline">
                    {row.projectName}
                  </Link>
                </td>
                <td className="px-6 py-4 text-foreground">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
