import { ALL_PROJECTS } from '@/data/mockData';
import { EvidenceItem } from '@/components/anvaya/EvidenceItem';
import Link from 'next/link';

export default function EvidencePage() {
  const allEvidence = ALL_PROJECTS.flatMap(p => 
    p.reviewCases.flatMap(rc => [
      ...rc.evidence.map(e => ({ ...e, projectName: p.name, projectId: p.id, isGap: false })),
      ...rc.evidenceGaps.map(e => ({ ...e, projectName: p.name, projectId: p.id, isGap: true }))
    ])
  );

  const missing = allEvidence.filter(e => e.isGap);
  const available = allEvidence.filter(e => !e.isGap);

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-light tracking-tight text-[#142b22] uppercase">Evidence Intelligence</h1>
        <p className="text-sm text-[#71766f] mt-3 font-medium">Tracking supporting documentation across all variations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-[#ef4444] uppercase tracking-widest border-b border-[#d8deda] pb-2">Missing Evidence ({missing.length})</h2>
          <div className="space-y-4">
            {missing.map(e => (
              <div key={e.id} className="space-y-2">
                <Link href={`/projects/${e.projectId}/evidence`} className="text-[10px] font-bold uppercase tracking-wider text-[#71766f] hover:text-[#142b22] block">
                  {e.projectName}
                </Link>
                <EvidenceItem evidence={{ ...e, status: 'MISSING' }} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-sm font-bold text-[#10b981] uppercase tracking-widest border-b border-[#d8deda] pb-2">Available Evidence ({available.length})</h2>
          <div className="space-y-4">
            {available.map(e => (
              <div key={e.id} className="space-y-2">
                <Link href={`/projects/${e.projectId}/evidence`} className="text-[10px] font-bold uppercase tracking-wider text-[#71766f] hover:text-[#142b22] block">
                  {e.projectName}
                </Link>
                <EvidenceItem evidence={{ ...e, status: 'AVAILABLE' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
