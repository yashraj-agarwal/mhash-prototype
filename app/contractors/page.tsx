import Link from 'next/link';
import { MetricCard } from '@/components/anvaya/MetricCard';
import { ALL_PROJECTS } from '@/data/mockData';
import { contractorRollup } from '@/lib/intelligence/aggregations';

function rupeesCr(n: number) {
  return `₹${(n / 10000000).toFixed(1)} Cr`;
}

function projectName(id: string): string {
  const project = ALL_PROJECTS.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown project ${id}`);
  return project.name;
}

export default function ContractorsPage() {
  const rows = contractorRollup();
  const totalCurrent = rows.reduce((sum, row) => sum + row.current, 0);
  const firmsWithHighPriority = rows.filter((row) => row.critical > 0).length;

  return (
    <div className="px-8 md:px-12 pt-10 pb-20 max-w-[1600px] mx-auto space-y-12 min-h-full flex flex-col bg-background">
      <div className="flex items-center justify-between pb-6 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Contractor Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">Performance and variation pressure by awarded firm.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Firms" value={rows.length} />
        <MetricCard label="Total current spend" value={rupeesCr(totalCurrent)} />
        <MetricCard label="Firms with high-priority cases" value={firmsWithHighPriority} />
      </div>

      <div className="overflow-x-auto border border-border/40 rounded-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              <th className="px-6 py-4">Firm</th>
              <th className="px-6 py-4">Projects</th>
              <th className="px-6 py-4 text-right">Awarded</th>
              <th className="px-6 py-4 text-right">Current</th>
              <th className="px-6 py-4 text-right">Drift</th>
              <th className="px-6 py-4 text-right">Open cases</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-border/30 last:border-0 align-top">
                <td className="px-6 py-4 font-medium text-foreground">{row.key}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {row.projectIds.map((id) => (
                      <Link
                        key={id}
                        href={`/projects/${id}`}
                        className="text-foreground hover:underline"
                      >
                        {projectName(id)}
                      </Link>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right tabular-nums text-foreground">{rupeesCr(row.awarded)}</td>
                <td className="px-6 py-4 text-right tabular-nums text-foreground">{rupeesCr(row.current)}</td>
                <td className="px-6 py-4 text-right tabular-nums text-foreground">{row.driftPct.toFixed(1)}%</td>
                <td className="px-6 py-4 text-right tabular-nums text-foreground">{row.openCases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
