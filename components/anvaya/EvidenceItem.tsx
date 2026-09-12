import { Evidence } from "@/types";
import { CheckCircle2, FileText, XCircle } from "lucide-react";

export function EvidenceItem({ evidence }: { evidence: Evidence }) {
  const isAvailable = evidence.status === 'AVAILABLE';

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border ${isAvailable ? 'border-border bg-card' : 'border-anvaya-red/30 bg-anvaya-red/5'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isAvailable ? 'bg-accent text-muted-foreground' : 'bg-anvaya-red/10 text-anvaya-red'}`}>
        <FileText className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className={`text-sm font-medium ${isAvailable ? 'text-foreground' : 'text-anvaya-red font-semibold'}`}>{evidence.title}</h4>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{evidence.type}</p>
      </div>
      <div>
        {isAvailable ? (
          <div className="flex items-center gap-2 text-anvaya-green text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" /> Available
          </div>
        ) : (
          <div className="flex items-center gap-2 text-anvaya-red text-xs font-semibold uppercase tracking-wider">
            <XCircle className="w-4 h-4" /> Missing
          </div>
        )}
      </div>
    </div>
  );
}
