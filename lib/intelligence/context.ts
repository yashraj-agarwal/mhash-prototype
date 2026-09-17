import { ALL_PROJECTS } from '@/data/mockData';
import type { Project } from '@/types';

function rupeesCr(n: number) {
  return `₹${(n / 10000000).toFixed(2)} Cr`;
}

function compactProject(project: Project) {
  const events = project.reviewCases.flatMap((rc) => rc.changeEvents);
  const gaps = project.reviewCases.flatMap((rc) => rc.evidenceGaps);
  const cases = project.reviewCases.map((rc) => `${rc.id} (${rc.status}, priority ${rc.priorityScore})`).join('; ') || 'none';
  const deltas = events.map((e) => `${e.dimension}: ${e.before} → ${e.after} (${e.delta})`).join('; ') || 'none';
  return [
    `${project.name} [${project.id} / ${project.projectCode}]`,
    `jurisdiction: ${project.location.district}, ${project.location.state} | authority: ${project.authority}`,
    `contractor: ${project.contractor} | status: ${project.status} | review: ${project.reviewStatus}`,
    `alignment ${project.alignmentScore} | priority ${project.priorityScore}`,
    `award: ${rupeesCr(project.awardSnapshot.projectCost)}, ${project.awardSnapshot.durationMonths} mo, prime ${project.awardSnapshot.primeContractor}, subs [${project.awardSnapshot.subcontractors.join(', ') || 'none'}], materials ${JSON.stringify(project.awardSnapshot.materials)}`,
    `current: ${rupeesCr(project.currentFacts.projectCost)}, ${project.currentFacts.durationForecast} mo, sub ${project.currentFacts.currentSubcontractor || 'none'}, materials ${JSON.stringify(project.currentFacts.materials)}`,
    `change events: ${deltas}`,
    `review cases: ${cases}`,
    `evidence gaps: ${gaps.map((g) => g.title).join('; ') || 'none'}`,
    project.narrative ? `narrative: ${project.narrative}` : '',
  ].filter(Boolean).join('\n');
}

export function buildIntelligenceContext(pathname: string): string {
  const projectMatch = pathname.match(/\/projects\/([^/]+)/);
  const viewing = projectMatch
    ? ALL_PROJECTS.find((p) => p.id === projectMatch[1])
    : undefined;

  const queue = [...ALL_PROJECTS]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 8)
    .map((p) => `${p.name} (${p.id}) p${p.priorityScore} align${p.alignmentScore} ${p.reviewStatus} ${p.contractor}`)
    .join('\n');

  const contractors = new Map<string, string[]>();
  ALL_PROJECTS.forEach((p) => {
    const list = contractors.get(p.contractor) ?? [];
    list.push(p.name);
    contractors.set(p.contractor, list);
  });
  const repeats = [...contractors.entries()]
    .filter(([, projects]) => projects.length > 1)
    .map(([name, projects]) => `${name}: ${projects.join(', ')}`)
    .join('\n') || 'none';

  return [
    `UI PATH: ${pathname}`,
    viewing ? `ACTIVE PROJECT FILE:\n${compactProject(viewing)}` : 'ACTIVE PROJECT FILE: none — officer is on a rollup or queue.',
    `TOP OF QUEUE:\n${queue}`,
    `CONTRACTOR CONCENTRATION:\n${repeats}`,
  ].join('\n\n');
}
