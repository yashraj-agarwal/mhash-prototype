import { AwardSnapshot, CurrentFact, ChangeEvent } from '@/types';

export function runComparisonEngine(projectId: string, award: AwardSnapshot, current: CurrentFact): ChangeEvent[] {
  const events: ChangeEvent[] = [];
  
  // Cost Check (>15%)
  const costDelta = current.projectCost - award.projectCost;
  const costPercentage = (costDelta / award.projectCost) * 100;
  if (costPercentage > 15) {
    events.push({
      id: `ce-cost-${Date.now()}`,
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
      missingEvidenceId: 'ev-missing-vo'
    });
  }

  // Subcontractor Check
  if (current.currentSubcontractor && !award.subcontractors.includes(current.currentSubcontractor)) {
    events.push({
      id: `ce-sub-${Date.now()}`,
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
      missingEvidenceId: 'ev-missing-sub-approval'
    });
  }

  // Material Specification Check
  if (current.materials?.bitumen !== award.materials?.bitumen) {
    events.push({
      id: `ce-mat-${Date.now()}`,
      projectId,
      dimension: 'SPECIFICATION',
      title: 'Material variation',
      before: award.materials?.bitumen || 'None',
      after: current.materials?.bitumen || 'None',
      delta: 'Downgraded',
      severity: 'HIGH',
      policyTriggered: 'Specification Deviation',
      recommendedAction: 'Requires Review',
      timestamp: new Date().toISOString(),
      missingEvidenceId: 'ev-missing-mat-test'
    });
  }

  // Schedule Check
  const delay = current.durationForecast - award.durationMonths;
  if (delay > 3) {
    events.push({
      id: `ce-sched-${Date.now()}`,
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
