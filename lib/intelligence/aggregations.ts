import { ALL_PROJECTS } from '@/data/mockData';
import type { Project, ReviewCase } from '@/types';

export type LocationGrain = 'district' | 'city' | 'state';

export interface RollupRow {
  key: string;
  projectCount: number;
  awarded: number;
  current: number;
  driftPct: number;
  openCases: number;
  critical: number;
  projectIds: string[];
}

export interface PolicyRow {
  id: string;
  title: string;
  hitCount: number;
  projectIds: string[];
}

export interface IngestLedgerRow {
  id: string;
  title: string;
  type: string;
  date?: string;
  projectId: string;
  projectName: string;
  status: string;
}

export interface AuditDocketRow extends ReviewCase {
  projectName: string;
}

function slug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function isOpenCase(reviewCase: ReviewCase): boolean {
  return reviewCase.status !== 'RESOLVED' && reviewCase.status !== 'EXPLAINED';
}

function isCriticalCase(reviewCase: ReviewCase): boolean {
  return (
    reviewCase.changeEvents.some((event) => event.severity === 'CRITICAL') ||
    reviewCase.priorityLevel === 'HIGH'
  );
}

function locationKey(project: Project, grain: LocationGrain): string {
  const { district, state } = project.location;
  if (grain === 'district') return `${district}, ${state}`;
  if (grain === 'city') return district;
  return state;
}

function rollup(projects: Project[], keyOf: (project: Project) => string): RollupRow[] {
  const buckets = new Map<string, Project[]>();
  for (const project of projects) {
    const key = keyOf(project);
    const group = buckets.get(key);
    if (group) group.push(project);
    else buckets.set(key, [project]);
  }

  return [...buckets.entries()]
    .map(([key, group]) => {
      const awarded = group.reduce((sum, project) => sum + project.awardSnapshot.projectCost, 0);
      const current = group.reduce((sum, project) => sum + project.currentFacts.projectCost, 0);
      const cases = group.flatMap((project) => project.reviewCases);
      return {
        key,
        projectCount: group.length,
        awarded,
        current,
        driftPct: awarded ? ((current - awarded) / awarded) * 100 : 0,
        openCases: cases.filter(isOpenCase).length,
        critical: cases.filter(isCriticalCase).length,
        projectIds: group.map((project) => project.id),
      };
    })
    .sort((a, b) => b.current - a.current);
}

export function contractorRollup(): RollupRow[] {
  return rollup(ALL_PROJECTS, (project) => project.contractor);
}

export function locationRollup(grain: LocationGrain): RollupRow[] {
  return rollup(ALL_PROJECTS, (project) => locationKey(project, grain));
}

export function policyCatalog(): PolicyRow[] {
  const rules = new Map<string, { title: string; hitCount: number; projectIds: Set<string> }>();

  for (const project of ALL_PROJECTS) {
    for (const reviewCase of project.reviewCases) {
      for (const title of reviewCase.triggeredRules ?? []) {
        const id = slug(title);
        const existing = rules.get(id);
        if (existing) {
          existing.hitCount += 1;
          existing.projectIds.add(project.id);
        } else {
          rules.set(id, { title, hitCount: 1, projectIds: new Set([project.id]) });
        }
      }
    }
  }

  return [...rules.entries()]
    .map(([id, rule]) => ({
      id,
      title: rule.title,
      hitCount: rule.hitCount,
      projectIds: [...rule.projectIds],
    }))
    .sort((a, b) => b.hitCount - a.hitCount);
}

export function ingestLedger(): IngestLedgerRow[] {
  const rows: IngestLedgerRow[] = [];

  for (const project of ALL_PROJECTS) {
    for (const reviewCase of project.reviewCases) {
      const files = [...reviewCase.evidence, ...reviewCase.evidenceGaps];
      for (const file of files) {
        rows.push({
          id: file.id,
          title: file.title,
          type: file.type,
          date: file.date,
          projectId: project.id,
          projectName: project.name,
          status: file.status === 'AVAILABLE' ? 'Indexed' : file.status,
        });
      }
    }
  }

  return rows.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
}

export function auditDocket(): AuditDocketRow[] {
  return ALL_PROJECTS.flatMap((project) =>
    project.reviewCases.map((reviewCase) => ({
      ...reviewCase,
      projectName: project.name,
    })),
  ).sort((a, b) => {
    const criticalDelta = Number(isCriticalCase(b)) - Number(isCriticalCase(a));
    if (criticalDelta !== 0) return criticalDelta;
    return b.priorityScore - a.priorityScore;
  });
}
