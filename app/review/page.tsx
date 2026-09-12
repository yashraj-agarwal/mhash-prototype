import { ALL_PROJECTS } from '@/data/mockData';
import Link from 'next/link';

export default function ReviewCasesPage() {
  const allCases = ALL_PROJECTS.flatMap(p => 
    p.reviewCases.map(rc => ({ ...rc, projectName: p.name }))
  ).sort((a, b) => b.priorityScore - a.priorityScore);

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-light tracking-tight text-[#142b22] uppercase">Review Cases</h1>
        <p className="text-sm text-[#71766f] mt-3 font-medium">All active intelligence briefs requiring verification or escalation.</p>
      </div>

      <div className="bg-white border border-[#d8deda] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e8ebe9] bg-[#fbfbfa]">
              <th className="px-6 py-4 text-[10px] font-bold text-[#71766f] uppercase tracking-[0.15em]">Case ID</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#71766f] uppercase tracking-[0.15em]">Project</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#71766f] uppercase tracking-[0.15em]">Priority</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#71766f] uppercase tracking-[0.15em]">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#71766f] uppercase tracking-[0.15em]">Action Required</th>
            </tr>
          </thead>
          <tbody>
            {allCases.map((rc, i) => {
              const isHigh = rc.priorityScore > 60;
              return (
                <tr key={rc.id} className="border-b border-[#e8ebe9] hover:bg-[#f0f2f1] transition-colors group">
                  <td className="px-6 py-4 text-xs font-mono font-bold text-[#71766f]">{rc.id}</td>
                  <td className="px-6 py-4">
                    <Link href={`/projects/${rc.projectId}/review-case`} className="block">
                      <div className="text-sm font-semibold text-[#142b22] group-hover:text-[#176247]">{rc.projectName}</div>
                      <div className="text-[10px] text-[#71766f] mt-1">{rc.title}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {isHigh && <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />}
                      <span className={`text-sm font-bold ${isHigh ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`}>{rc.priorityScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white border border-[#d8deda] rounded text-[9px] font-bold text-[#71766f] uppercase tracking-wider">
                      {rc.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-[#142b22]">
                    {rc.recommendedAction}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
