import { ALL_PROJECTS } from '@/data/mockData';
import { ChangeEventCard } from '@/components/anvaya/ChangeEventCard';
import Link from 'next/link';

export default function VariationsPage() {
  const allVariations = ALL_PROJECTS.flatMap(p => 
    p.reviewCases.flatMap(rc => rc.changeEvents.map(ce => ({ ...ce, projectName: p.name })))
  );

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-light tracking-tight text-[#142b22] uppercase">Material Variations</h1>
        <p className="text-sm text-[#71766f] mt-3 font-medium">Global feed of all detected deviations from award baselines across {ALL_PROJECTS.length} monitored projects.</p>
      </div>

      <div className="space-y-6">
        {allVariations.map(event => (
          <div key={event.id} className="space-y-3">
            <Link href={`/projects/${event.projectId}`} className="text-xs font-bold uppercase tracking-widest text-[#71766f] hover:text-[#176247] transition-colors">
              Project: {event.projectName}
            </Link>
            <ChangeEventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
