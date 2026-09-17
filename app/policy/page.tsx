import Link from 'next/link';
import { ALL_PROJECTS } from '@/data/mockData';
import { policyCatalog } from '@/lib/intelligence/aggregations';

function projectName(id: string): string {
  const project = ALL_PROJECTS.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown project ${id}`);
  return project.name;
}

export default function PolicyMatrixPage() {
  const rules = policyCatalog();

  return (
    <div className="px-8 md:px-12 pt-10 pb-20 max-w-[1600px] mx-auto space-y-12 min-h-full flex flex-col bg-background">
      <div className="flex items-center justify-between pb-6 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Policy Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">Rules that have fired on review cases, and the projects they hit.</p>
        </div>
      </div>

      <div className="divide-y divide-border/40 border border-border/40 rounded-2xl">
        {rules.map((rule) => (
          <div key={rule.id} className="px-6 py-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-foreground">{rule.title}</h2>
              <p className="text-sm text-muted-foreground">{rule.hitCount} hits</p>
            </div>
            <div className="flex flex-col gap-1 md:items-end">
              {rule.projectIds.map((id) => (
                <Link
                  key={id}
                  href={`/projects/${id}`}
                  className="text-sm text-foreground hover:underline"
                >
                  {projectName(id)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
