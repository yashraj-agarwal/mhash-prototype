import { ALL_PROJECTS } from '@/data/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TimeMachine } from '@/components/anvaya/TimeMachine';

export default async function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = ALL_PROJECTS.find(p => p.id === resolvedParams.id);
  
  if (!project) notFound();

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-16">
      <Link href={`/projects/${project.id}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors bg-accent/50 px-4 py-2 rounded-full">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project Intelligence
      </Link>
      
      <div>
        <h1 className="text-4xl font-light tracking-tight uppercase">Project Time Machine</h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Interactive chronological sequence demonstrating project drift over time.
        </p>
      </div>

      <TimeMachine />
    </div>
  );
}
