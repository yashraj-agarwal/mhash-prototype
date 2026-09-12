import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/types";
import { ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const variationsCount = project.reviewCases.flatMap(rc => rc.changeEvents).length;
  const isHighPriority = project.reviewCases.some(rc => rc.priorityLevel === 'HIGH');
  const isAligned = project.alignmentScore > 85;

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className={`hover:bg-accent/40 transition-colors cursor-pointer border ${isHighPriority ? 'border-anvaya-red/30 bg-anvaya-red/5' : 'border-border bg-card'}`}>
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-medium text-foreground tracking-tight">{project.name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-anvaya-blue" />
                {project.status}
              </span>
              <span>Cost: ₹{(project.awardSnapshot.projectCost / 10000000).toFixed(1)} Cr</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end gap-1">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Alignment</div>
              <div className={`text-3xl font-light ${isAligned ? 'text-anvaya-green' : 'text-anvaya-orange'}`}>
                {project.alignmentScore}%
              </div>
            </div>
            
            <div className="w-36 flex flex-col items-end gap-1">
              {isAligned ? (
                <div className="flex items-center gap-1.5 text-anvaya-green text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Aligned
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-anvaya-orange text-sm font-medium">
                  <AlertTriangle className="w-4 h-4" />
                  {variationsCount || 2} Variations
                </div>
              )}
              {isHighPriority && (
                <div className="text-[10px] font-bold text-anvaya-red uppercase tracking-wider mt-1 px-2 py-0.5 rounded-sm bg-anvaya-red/10 border border-anvaya-red/20">
                  High Priority
                </div>
              )}
            </div>
            
            <ArrowRight className="w-5 h-5 text-muted-foreground opacity-50" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
