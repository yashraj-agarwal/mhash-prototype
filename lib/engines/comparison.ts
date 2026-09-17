import { AwardSnapshot, CurrentFact, ChangeEvent } from '@/types';

export function runComparisonEngine(projectId: string, award: AwardSnapshot, current: CurrentFact): ChangeEvent[] {
  const events: ChangeEvent[] = [];

  const costDelta = current.projectCost - award.projectCost;
  const costPercentage = (costDelta / award.projectCost) * 100;
  if (costPercentage > 15) {
    events.push({
      id: `ce-cost-${projectId}`,
      projectId,
      dimension: 'COST',
      title: 'Cost variation',
      before: `₹${(award.projectCost / 10000000).toFixed(1)} Cr`,
      after: `₹${(current.projectCost / 10000000).toFixed(1)} Cr`,
      delta: `+${costPercentage.toFixed(1)}%`,
      severity: 'HIGH',
      policyTriggered: '15% Threshold Exceeded',
      recommendedAction: 'Request Evidence',
      timestamp: new Date().toISOString(),
      missingEvidenceId: `ev-missing-vo-${projectId}`,
    });
  }

  if (current.currentSubcontractor && !award.subcontractors.includes(current.currentSubcontractor)) {
    events.push({
      id: `ce-sub-${projectId}`,
      projectId,
      dimension: 'SUBCONTRACTOR',
      title: 'Subcontractor variation',
      before: award.subcontractors.join(', ') || 'None',
      after: current.currentSubcontractor,
      delta: 'Changed',
      severity: 'MEDIUM',
      policyTriggered: 'Unapproved Subcontractor',
      recommendedAction: 'Request Evidence',
      timestamp: new Date().toISOString(),
      missingEvidenceId: `ev-missing-sub-approval-${projectId}`,
    });
  }

  const materialKeys = new Set([
    ...Object.keys(award.materials ?? {}),
    ...Object.keys(current.materials ?? {}),
  ]);
  for (const key of materialKeys) {
    const before = award.materials?.[key];
    const after = current.materials?.[key];
    if (before && after && before !== after) {
      events.push({
        id: `ce-mat-${projectId}-${key}`,
        projectId,
        dimension: 'SPECIFICATION',
        title: `${key} variation`,
        before,
        after,
        delta: 'Changed',
        severity: 'HIGH',
        policyTriggered: 'Specification Deviation',
        recommendedAction: 'Requires Review',
        timestamp: new Date().toISOString(),
        missingEvidenceId: `ev-missing-mat-test-${projectId}-${key}`,
      });
    }
  }

  const delay = current.durationForecast - award.durationMonths;
  if (delay > 3) {
    events.push({
      id: `ce-sched-${projectId}`,
      projectId,
      dimension: 'SCHEDULE',
      title: 'Schedule variation',
      before: `${award.durationMonths} Months`,
      after: `${current.durationForecast} Months`,
      delta: `+${delay} Months`,
      severity: 'MEDIUM',
      policyTriggered: 'Delay Exceeds Grace Period',
      recommendedAction: 'Requires Review',
      timestamp: new Date().toISOString(),
    });
  }

  return events;
}
