import { ALL_PROJECTS } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { EvidenceMap } from '@/components/anvaya/EvidenceMap';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function EvidencePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = ALL_PROJECTS.find(p => p.id === resolvedParams.id);
  
  if (!project) notFound();

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      <Link href={`/projects/${project.id}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors bg-accent/50 px-4 py-2 rounded-full">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project Intelligence
      </Link>
      
      <div>
        <h1 className="text-4xl font-light tracking-tight uppercase">Evidence Intelligence</h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Deterministic mapping of required evidence against submitted documentation.
        </p>
      </div>

      <div className="space-y-12">
        {project.reviewCases.flatMap(rc => rc.changeEvents).map(event => {
          const available = project.reviewCases.flatMap(rc => rc.evidence).filter(e => e.id === event.evidenceId);
          const missing = project.reviewCases.flatMap(rc => rc.evidenceGaps).filter(e => e.id === event.missingEvidenceId);
          
          if (available.length === 0 && missing.length === 0) return null;
          
          return (
            <section key={event.id} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px bg-border flex-1" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Map: {event.title}</h2>
                <div className="h-px bg-border flex-1" />
              </div>
              <EvidenceMap 
                changeEventTitle={event.title} 
                available={available} 
                missing={missing} 
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
