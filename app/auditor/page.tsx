import Link from 'next/link';
import { ALL_PROJECTS } from '@/data/mockData';
import { auditDocket } from '@/lib/intelligence/aggregations';

function needsCorroboration() {
  const rows: {
    id: string;
    text: string;
    projectId: string;
    projectName: string;
    confidence: 'MEDIUM' | 'LOW';
  }[] = [];

  for (const project of ALL_PROJECTS) {
    for (const fact of project.facts ?? []) {
      if (fact.confidence !== 'HIGH') {
        rows.push({
          id: fact.id,
          text: fact.statement,
          projectId: project.id,
          projectName: project.name,
          confidence: fact.confidence,
        });
      }
    }

    for (const reviewCase of project.reviewCases) {
      for (const file of [...reviewCase.evidence, ...reviewCase.evidenceGaps]) {
        if (file.confidence && file.confidence !== 'HIGH') {
          rows.push({
            id: file.id,
            text: file.title,
            projectId: project.id,
            projectName: project.name,
            confidence: file.confidence,
          });
        }
      }
    }
  }

  return rows;
}

export default function AuditorLogsPage() {
  const docket = auditDocket();
  const corroboration = needsCorroboration();

  return (
    <div className="px-8 md:px-12 pt-10 pb-20 max-w-[1600px] mx-auto space-y-12 min-h-full flex flex-col bg-background">
      <div className="flex items-center justify-between pb-6 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Audit Docket</h1>
          <p className="text-sm text-muted-foreground mt-1">Review cases across all projects.</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-border/40 rounded-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Triggered rules</th>
            </tr>
          </thead>
          <tbody>
            {docket.map((row) => (
              <tr key={row.id} className="border-b border-border/30 last:border-0 align-top">
                <td className="px-6 py-4 font-medium">
                  <Link
                    href={`/projects/${row.projectId}/review-case`}
                    className="text-foreground hover:underline"
                  >
                    {row.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-foreground">{row.projectName}</td>
                <td className="px-6 py-4 text-foreground">{row.status}</td>
                <td className="px-6 py-4 text-right tabular-nums text-foreground">
                  {row.triggeredRules?.length ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Needs corroboration</h2>
        <div className="overflow-x-auto border border-border/40 rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {corroboration.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-muted-foreground" colSpan={3}>
                    None.
                  </td>
                </tr>
              ) : (
                corroboration.map((row) => (
                  <tr key={`${row.projectId}:${row.id}`} className="border-b border-border/30 last:border-0 align-top">
                    <td className="px-6 py-4 font-medium text-foreground">{row.text}</td>
                    <td className="px-6 py-4">
                      <Link href={`/projects/${row.projectId}`} className="text-foreground hover:underline">
                        {row.projectName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-foreground">{row.confidence}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
