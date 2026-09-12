import { ALL_PROJECTS } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { PriorityScore } from '@/components/anvaya/PriorityScore';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CaseBrief } from '@/components/anvaya/CaseBrief';

export default async function ReviewCasePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = ALL_PROJECTS.find(p => p.id === resolvedParams.id);
  
  if (!project || project.reviewCases.length === 0) notFound();

  const reviewCase = project.reviewCases[0];

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      <Link href={`/projects/${project.id}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project
      </Link>
      
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">CASE #{reviewCase.id}</div>
          <h1 className="text-4xl font-light tracking-tight">{reviewCase.title}</h1>
        </div>
        <div className="px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider bg-anvaya-red/10 border border-anvaya-red/20 text-anvaya-red">
          {reviewCase.priorityLevel} PRIORITY
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-1 space-y-6">
          <PriorityScore score={reviewCase.priorityScore} />
          
          <div className="bg-card border border-border p-6 rounded-xl space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Why this case?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm font-medium text-foreground">
                <span className="text-anvaya-red font-bold text-lg leading-none mt-0.5">+</span> Cost threshold exceeded
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-foreground">
                <span className="text-anvaya-red font-bold text-lg leading-none mt-0.5">+</span> No Variation Order
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-foreground">
                <span className="text-anvaya-orange font-bold text-lg leading-none mt-0.5">+</span> Material specification changed
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-foreground">
                <span className="text-anvaya-orange font-bold text-lg leading-none mt-0.5">+</span> Subcontractor changed
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-foreground">
                <span className="text-anvaya-orange font-bold text-lg leading-none mt-0.5">+</span> Timeline delayed
              </li>
            </ul>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recommended Action</h3>
            <div className="text-sm font-bold text-foreground">{reviewCase.recommendedAction}</div>
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <CaseBrief reviewCase={reviewCase} />
          
          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" className="h-12 px-6">Mark Explained</Button>
            <Button variant="default" className="h-12 px-6 bg-anvaya-red text-white hover:bg-anvaya-red/90 border-0">Request Evidence</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
