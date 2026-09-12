import { ALL_PROJECTS } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { ChangeEventCard } from '@/components/anvaya/ChangeEventCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function AlignmentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = ALL_PROJECTS.find(p => p.id === resolvedParams.id);
  
  if (!project) notFound();

  const changeEvents = project.reviewCases.flatMap(rc => rc.changeEvents);

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-10">
      <Link href={`/projects/${project.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project
      </Link>
      
      <div>
        <h1 className="text-4xl font-light tracking-tight">Alignment Details</h1>
        <p className="text-muted-foreground mt-2">
          Detailed breakdown of material variations from the award snapshot.
        </p>
      </div>

      <div className="space-y-6">
        {changeEvents.map(event => (
          <ChangeEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
