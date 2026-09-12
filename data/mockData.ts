import { Project, ActivityEvent, ChangeEvent, Evidence, ReviewCase, TimelineEvent, Fact, AlignmentDimension } from '@/types';

// ═══════════════════════════════════════════════════════════════
// FEATURED PROJECT 1: NH-42 Highway Expansion
// ═══════════════════════════════════════════════════════════════

const nh42: Project = {
  id: 'proj-nh42',
  name: 'NH-42 Highway Expansion',
  projectCode: 'NHAI/KA/2024/042',
  sector: 'Highways',
  location: { state: 'Karnataka', district: 'Dharwad' },
  authority: 'National Highways Authority of India',
  status: 'ACTIVE',
  alignmentScore: 61,
  priorityScore: 87,
  evidenceConfidence: 58,
  reviewStatus: 'OPEN',
  awardDate: '2024-11-15',
  startDate: '2025-01-10',
  originalCompletionDate: '2026-03-10',
  currentExpectedCompletionDate: '2026-08-10',
  contractor: 'ABC Infrastructure Ltd.',
  awardSnapshot: {
    projectCost: 124000000,
    durationMonths: 14,
    primeContractor: 'ABC Infrastructure Ltd.',
    subcontractors: ['XYZ Engineering'],
    materials: { bitumen: 'VG-40', aggregate: 'Grade-I' },
    scope: '42 km four-lane highway expansion with 3 flyovers',
  },
  currentFacts: {
    projectCost: 146000000,
    durationForecast: 19,
    primeContractor: 'ABC Infrastructure Ltd.',
    currentSubcontractor: 'PQR Infrastructure',
    materials: { bitumen: 'VG-30', aggregate: 'Grade-I' },
    scope: '42 km four-lane highway expansion with 3 flyovers and service roads',
  },
  narrative: 'Since award, NH-42 has accumulated four material changes. The most significant deviations relate to cost (+17.7%), material specification (VG-40 → VG-30), and project duration (+5 months). Two changes currently lack complete supporting documentation. The subcontractor was changed from XYZ Engineering to PQR Infrastructure without documented approval.',
  lastEvent: '2 minutes ago',
  alignmentDimensions: [
    { name: 'Cost', score: 72, status: 'drifting' },
    { name: 'Schedule', score: 64, status: 'misaligned' },
    { name: 'Material', score: 48, status: 'misaligned' },
    { name: 'Evidence', score: 55, status: 'misaligned' },
    { name: 'Scope', score: 82, status: 'drifting' },
  ],
  timelineEvents: [
    { id: 'te-1', date: 'January 2025', title: 'AWARD SNAPSHOT', details: '₹12.4 Cr | XYZ Engineering | VG-40 | 42 km', alignment: 100, type: 'award' },
    { id: 'te-2', date: 'March 2025', title: 'RA BILL #3 SUBMITTED', details: 'Cost reached ₹12.7 Cr — within threshold', alignment: 92, type: 'milestone' },
    { id: 'te-3', date: 'May 2025', title: 'SUBCONTRACTOR CHANGE', details: 'XYZ Engineering replaced by PQR Infrastructure', alignment: 84, type: 'variation' },
    { id: 'te-4', date: 'June 2025', title: 'MATERIAL SPECIFICATION CHANGE', details: 'Bitumen downgraded from VG-40 to VG-30', alignment: 76, type: 'variation' },
    { id: 'te-5', date: 'August 2025', title: 'COST THRESHOLD EXCEEDED', details: 'Project cost reached ₹14.6 Cr (+17.7%)', alignment: 67, type: 'variation' },
    { id: 'te-6', date: 'September 2025', title: 'CURRENT STATE', details: '₹14.6 Cr | PQR Infrastructure | VG-30 | 42 km + service roads', alignment: 61, type: 'review' },
  ],
  facts: [
    { id: 'f-1', projectId: 'proj-nh42', statement: 'Material used: VG-30 bitumen', source: 'Inspection Report #17', date: '2025-08-04', confidence: 'HIGH', linkedChangeEvent: 'ce-mat-1' },
    { id: 'f-2', projectId: 'proj-nh42', statement: 'Current project cost: ₹14.6 Cr', source: 'RA Bill #3', date: '2025-07-15', confidence: 'HIGH', linkedChangeEvent: 'ce-cost-1' },
    { id: 'f-3', projectId: 'proj-nh42', statement: 'PQR Infrastructure is performing sub-contract work', source: 'Invoice INV-2025-0847', date: '2025-06-22', confidence: 'HIGH', linkedChangeEvent: 'ce-sub-1' },
    { id: 'f-4', projectId: 'proj-nh42', statement: 'Expected completion pushed to August 2026', source: 'Progress Report Q2', date: '2025-07-30', confidence: 'MEDIUM', linkedChangeEvent: 'ce-sched-1' },
    { id: 'f-5', projectId: 'proj-nh42', statement: 'Scope expanded to include service roads', source: 'Site Report #12', date: '2025-08-10', confidence: 'MEDIUM' },
  ],
  reviewCases: [
    {
      id: 'ANV-482',
      projectId: 'proj-nh42',
      title: 'Material Variations Detected in NH-42',
      priorityScore: 87,
      priorityLevel: 'HIGH',
      status: 'OPEN',
      recommendedAction: 'REQUEST EVIDENCE AND REVIEW',
      assignedReviewer: 'Dept. of Public Works — Karnataka',
      impact: 'Cost overrun of ₹2.2 Cr, material downgrade, unapproved subcontractor',
      createdDate: '2025-09-01',
      triggeredRules: [
        'Cost variation exceeds 15% threshold',
        'Material specification differs from award',
        'Subcontractor not listed in award contract',
        'Schedule delay exceeds 3-month grace period',
      ],
      changeEvents: [
        {
          id: 'ce-cost-1', projectId: 'proj-nh42', dimension: 'COST', title: 'Cost variation',
          before: '₹12.4 Cr', after: '₹14.6 Cr', delta: '+17.7%', severity: 'HIGH',
          policyTriggered: '15% Threshold Exceeded', evidenceId: 'ev-ra-bill-3',
          missingEvidenceId: 'ev-missing-vo', recommendedAction: 'Request Variation Order',
          timestamp: '2025-08-15T10:30:00Z',
        },
        {
          id: 'ce-sub-1', projectId: 'proj-nh42', dimension: 'SUBCONTRACTOR', title: 'Subcontractor variation',
          before: 'XYZ Engineering', after: 'PQR Infrastructure', delta: 'Changed', severity: 'MEDIUM',
          policyTriggered: 'Unapproved Subcontractor', missingEvidenceId: 'ev-missing-sub-approval',
          recommendedAction: 'Request Subcontractor Approval', timestamp: '2025-05-20T14:00:00Z',
        },
        {
          id: 'ce-mat-1', projectId: 'proj-nh42', dimension: 'SPECIFICATION', title: 'Material variation',
          before: 'VG-40', after: 'VG-30', delta: 'Downgraded', severity: 'HIGH',
          policyTriggered: 'Specification Deviation', evidenceId: 'ev-inspection',
          missingEvidenceId: 'ev-missing-mat-test', recommendedAction: 'Request Quality Certificate',
          timestamp: '2025-06-10T09:00:00Z',
        },
        {
          id: 'ce-sched-1', projectId: 'proj-nh42', dimension: 'SCHEDULE', title: 'Schedule variation',
          before: '14 Months', after: '19 Months', delta: '+5 Months', severity: 'MEDIUM',
          policyTriggered: 'Delay Exceeds Grace Period', recommendedAction: 'Verify Extension Approval',
          timestamp: '2025-07-30T16:00:00Z',
        },
      ],
      evidence: [
        { id: 'ev-award', type: 'Award Contract', title: 'Original Award Contract', status: 'AVAILABLE', date: '2024-11-15', uploadedBy: 'NHAI Karnataka', confidence: 'HIGH', summary: 'Complete award document with scope, cost, timeline, and contractor details.' },
        { id: 'ev-boq', type: 'BoQ', title: 'Bill of Quantities', status: 'AVAILABLE', date: '2024-11-15', uploadedBy: 'NHAI Karnataka', confidence: 'HIGH', summary: 'Detailed bill of quantities for all work items.' },
        { id: 'ev-ra-bill-3', type: 'RA Bill', title: 'RA Bill #3', status: 'AVAILABLE', date: '2025-07-15', uploadedBy: 'ABC Infrastructure Ltd.', confidence: 'HIGH', summary: 'Running account bill showing cumulative expenditure of ₹14.6 Cr.', linkedChangeEvent: 'ce-cost-1' },
        { id: 'ev-delivery', type: 'Delivery Challan', title: 'Material Delivery Challan', status: 'AVAILABLE', date: '2025-06-05', uploadedBy: 'PQR Infrastructure', confidence: 'MEDIUM', summary: 'Delivery record showing VG-30 bitumen received on site.' },
        { id: 'ev-inspection', type: 'Site Report', title: 'Site Inspection Report #17', status: 'AVAILABLE', date: '2025-08-04', uploadedBy: 'Site Engineer', confidence: 'HIGH', summary: 'Confirms VG-30 material in use. Quality tests not attached.', linkedChangeEvent: 'ce-mat-1' },
      ],
      evidenceGaps: [
        { id: 'ev-missing-vo', type: 'Variation Order', title: 'Approved Variation Order', status: 'MISSING', summary: 'Required to justify cost increase beyond 15% threshold.', linkedChangeEvent: 'ce-cost-1' },
        { id: 'ev-missing-sub-approval', type: 'Approval Letter', title: 'Subcontractor Approval Documentation', status: 'MISSING', summary: 'Required to approve replacement of XYZ Engineering with PQR Infrastructure.', linkedChangeEvent: 'ce-sub-1' },
        { id: 'ev-missing-mat-test', type: 'Quality Certificate', title: 'Material Quality Test Report', status: 'MISSING', summary: 'Required to verify VG-30 meets project requirements despite specification change.', linkedChangeEvent: 'ce-mat-1' },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FEATURED PROJECT 2: Smart Water Pipeline
// ═══════════════════════════════════════════════════════════════

const smartWater: Project = {
  id: 'proj-smart-water',
  name: 'Smart Water Pipeline Network',
  projectCode: 'MWRD/MH/2024/118',
  sector: 'Water Infrastructure',
  location: { state: 'Maharashtra', district: 'Pune' },
  authority: 'Maharashtra Water Resources Department',
  status: 'ACTIVE',
  alignmentScore: 84,
  priorityScore: 52,
  evidenceConfidence: 72,
  reviewStatus: 'UNDER_REVIEW',
  awardDate: '2024-09-20',
  startDate: '2024-11-01',
  originalCompletionDate: '2025-11-01',
  currentExpectedCompletionDate: '2026-02-01',
  contractor: 'AquaBuild Inc.',
  awardSnapshot: {
    projectCost: 85000000,
    durationMonths: 12,
    primeContractor: 'AquaBuild Inc.',
    subcontractors: [],
    materials: { pipe: 'DI K9 Class', sensors: 'IoT Grade-A' },
    scope: '28 km smart pipeline with 120 IoT sensor nodes',
  },
  currentFacts: {
    projectCost: 91200000,
    durationForecast: 15,
    primeContractor: 'AquaBuild Inc.',
    currentSubcontractor: 'TechPipe Solutions',
    materials: { pipe: 'DI K9 Class', sensors: 'IoT Grade-B' },
    scope: '28 km smart pipeline with 95 IoT sensor nodes',
  },
  narrative: 'The Smart Water Pipeline project shows moderate drift primarily in cost (+7.3%) and an unapproved subcontractor addition. The IoT sensor specification was downgraded from Grade-A to Grade-B, and the sensor count reduced from 120 to 95 nodes. Schedule has extended by 3 months. Evidence is partially available but subcontractor approval is pending.',
  lastEvent: '18 minutes ago',
  alignmentDimensions: [
    { name: 'Cost', score: 88, status: 'aligned' },
    { name: 'Schedule', score: 78, status: 'drifting' },
    { name: 'Material', score: 72, status: 'drifting' },
    { name: 'Evidence', score: 80, status: 'drifting' },
    { name: 'Scope', score: 82, status: 'drifting' },
  ],
  timelineEvents: [
    { id: 'tw-1', date: 'November 2024', title: 'AWARD SNAPSHOT', details: '₹8.5 Cr | AquaBuild Inc. | DI K9 | 120 sensors', alignment: 100, type: 'award' },
    { id: 'tw-2', date: 'February 2025', title: 'PROGRESS REPORT Q1', details: '23% physical progress — on schedule', alignment: 97, type: 'milestone' },
    { id: 'tw-3', date: 'May 2025', title: 'SUBCONTRACTOR ADDED', details: 'TechPipe Solutions engaged for sensor installation', alignment: 91, type: 'variation' },
    { id: 'tw-4', date: 'July 2025', title: 'SENSOR SPECIFICATION CHANGE', details: 'IoT sensors downgraded from Grade-A to Grade-B', alignment: 87, type: 'variation' },
    { id: 'tw-5', date: 'September 2025', title: 'CURRENT STATE', details: '₹9.12 Cr | 95 sensors | +3 month delay', alignment: 84, type: 'review' },
  ],
  facts: [
    { id: 'fw-1', projectId: 'proj-smart-water', statement: 'IoT sensors installed are Grade-B specification', source: 'Delivery Challan DC-445', date: '2025-07-12', confidence: 'HIGH', linkedChangeEvent: 'ce-w-mat-1' },
    { id: 'fw-2', projectId: 'proj-smart-water', statement: 'TechPipe Solutions performing sensor installation', source: 'Site Report #8', date: '2025-06-15', confidence: 'HIGH', linkedChangeEvent: 'ce-w-sub-1' },
    { id: 'fw-3', projectId: 'proj-smart-water', statement: 'Project cost has reached ₹9.12 Cr', source: 'RA Bill #2', date: '2025-08-20', confidence: 'HIGH' },
  ],
  reviewCases: [
    {
      id: 'ANV-519',
      projectId: 'proj-smart-water',
      title: 'Specification and Subcontractor Variations in Water Pipeline',
      priorityScore: 52,
      priorityLevel: 'MEDIUM',
      status: 'UNDER_REVIEW',
      recommendedAction: 'VERIFY SUBCONTRACTOR CREDENTIALS AND SENSOR SPECS',
      assignedReviewer: 'MWRD Pune Division',
      impact: 'IoT sensor downgrade may affect water leakage detection accuracy',
      createdDate: '2025-08-25',
      triggeredRules: [
        'Subcontractor not listed in award contract',
        'Material specification differs from award',
      ],
      changeEvents: [
        {
          id: 'ce-w-sub-1', projectId: 'proj-smart-water', dimension: 'SUBCONTRACTOR', title: 'Subcontractor addition',
          before: 'None', after: 'TechPipe Solutions', delta: 'New Entity', severity: 'MEDIUM',
          policyTriggered: 'Unapproved Subcontractor', missingEvidenceId: 'ev-w-missing-sub',
          recommendedAction: 'Request Subcontractor Approval', timestamp: '2025-05-15T11:00:00Z',
        },
        {
          id: 'ce-w-mat-1', projectId: 'proj-smart-water', dimension: 'SPECIFICATION', title: 'Sensor specification change',
          before: 'IoT Grade-A', after: 'IoT Grade-B', delta: 'Downgraded', severity: 'MEDIUM',
          policyTriggered: 'Specification Deviation', evidenceId: 'ev-w-challan',
          missingEvidenceId: 'ev-w-missing-cert', recommendedAction: 'Request Quality Certificate',
          timestamp: '2025-07-10T14:30:00Z',
        },
      ],
      evidence: [
        { id: 'ev-w-award', type: 'Award Contract', title: 'Original Award Contract', status: 'AVAILABLE', date: '2024-09-20', confidence: 'HIGH' },
        { id: 'ev-w-challan', type: 'Delivery Challan', title: 'Sensor Delivery Challan DC-445', status: 'AVAILABLE', date: '2025-07-12', confidence: 'HIGH', linkedChangeEvent: 'ce-w-mat-1' },
        { id: 'ev-w-site', type: 'Site Report', title: 'Site Report #8', status: 'AVAILABLE', date: '2025-06-15', confidence: 'MEDIUM' },
      ],
      evidenceGaps: [
        { id: 'ev-w-missing-sub', type: 'Approval Letter', title: 'Subcontractor Approval Letter', status: 'MISSING', linkedChangeEvent: 'ce-w-sub-1' },
        { id: 'ev-w-missing-cert', type: 'Quality Certificate', title: 'IoT Sensor Quality Certificate', status: 'MISSING', linkedChangeEvent: 'ce-w-mat-1' },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// FEATURED PROJECT 3: District Hospital Upgrade
// ═══════════════════════════════════════════════════════════════

const hospital: Project = {
  id: 'proj-hospital',
  name: 'District Hospital Upgrade',
  projectCode: 'TNHD/TN/2024/067',
  sector: 'Hospitals',
  location: { state: 'Tamil Nadu', district: 'Coimbatore' },
  authority: 'Tamil Nadu Health Department',
  status: 'ACTIVE',
  alignmentScore: 72,
  priorityScore: 68,
  evidenceConfidence: 65,
  reviewStatus: 'AWAITING_EVIDENCE',
  awardDate: '2024-06-10',
  startDate: '2024-08-01',
  originalCompletionDate: '2026-08-01',
  currentExpectedCompletionDate: '2027-01-01',
  contractor: 'MedInfra Ltd.',
  awardSnapshot: {
    projectCost: 210000000,
    durationMonths: 24,
    primeContractor: 'MedInfra Ltd.',
    subcontractors: ['CareBuilders'],
    materials: { concrete: 'M30', steel: 'Fe-500D', electrical: 'ISI Certified' },
    scope: '200-bed hospital with ICU, OT, radiology, and pharmacy',
  },
  currentFacts: {
    projectCost: 238000000,
    durationForecast: 29,
    primeContractor: 'MedInfra Ltd.',
    currentSubcontractor: 'CareBuilders',
    materials: { concrete: 'M25', steel: 'Fe-500D', electrical: 'ISI Certified' },
    scope: '200-bed hospital with ICU, OT, radiology, pharmacy, and telemedicine wing',
  },
  narrative: 'The District Hospital Upgrade has experienced a cost increase of 13.3% (₹2.8 Cr) and a 5-month schedule extension. Concrete grade has been downgraded from M30 to M25. Scope has expanded to include a telemedicine wing not in the original contract. An extension approval is missing for the schedule delay.',
  lastEvent: '45 minutes ago',
  alignmentDimensions: [
    { name: 'Cost', score: 78, status: 'drifting' },
    { name: 'Schedule', score: 68, status: 'misaligned' },
    { name: 'Material', score: 62, status: 'misaligned' },
    { name: 'Evidence', score: 70, status: 'drifting' },
    { name: 'Scope', score: 75, status: 'drifting' },
  ],
  timelineEvents: [
    { id: 'th-1', date: 'August 2024', title: 'AWARD SNAPSHOT', details: '₹21 Cr | MedInfra Ltd. | M30 | 200-bed', alignment: 100, type: 'award' },
    { id: 'th-2', date: 'January 2025', title: 'PROGRESS ON SCHEDULE', details: '18% physical progress — foundations complete', alignment: 96, type: 'milestone' },
    { id: 'th-3', date: 'April 2025', title: 'SCOPE EXPANSION', details: 'Telemedicine wing added to scope', alignment: 88, type: 'variation' },
    { id: 'th-4', date: 'June 2025', title: 'CONCRETE GRADE CHANGE', details: 'M30 → M25 in non-structural areas', alignment: 79, type: 'variation' },
    { id: 'th-5', date: 'September 2025', title: 'CURRENT STATE', details: '₹23.8 Cr | +5 months | M25 concrete', alignment: 72, type: 'review' },
  ],
  facts: [
    { id: 'fh-1', projectId: 'proj-hospital', statement: 'Concrete grade M25 used in non-structural areas', source: 'Quality Test Report #9', date: '2025-06-20', confidence: 'HIGH', linkedChangeEvent: 'ce-h-mat-1' },
    { id: 'fh-2', projectId: 'proj-hospital', statement: 'Telemedicine wing added without variation order', source: 'Revised Drawing Set', date: '2025-04-15', confidence: 'MEDIUM', linkedChangeEvent: 'ce-h-scope-1' },
    { id: 'fh-3', projectId: 'proj-hospital', statement: 'Project cost has reached ₹23.8 Cr', source: 'RA Bill #4', date: '2025-08-30', confidence: 'HIGH' },
  ],
  reviewCases: [
    {
      id: 'ANV-536',
      projectId: 'proj-hospital',
      title: 'Scope and Material Variations in Hospital Upgrade',
      priorityScore: 68,
      priorityLevel: 'MEDIUM',
      status: 'AWAITING_EVIDENCE',
      recommendedAction: 'REQUEST EXTENSION APPROVAL AND QUALITY REPORTS',
      assignedReviewer: 'TNHD Coimbatore Office',
      impact: 'Concrete downgrade in hospital may affect structural longevity',
      createdDate: '2025-09-05',
      triggeredRules: [
        'Material specification differs from award',
        'Scope expanded beyond original contract',
        'Schedule delay exceeds 3-month grace period',
      ],
      changeEvents: [
        {
          id: 'ce-h-mat-1', projectId: 'proj-hospital', dimension: 'SPECIFICATION', title: 'Concrete grade change',
          before: 'M30', after: 'M25', delta: 'Downgraded', severity: 'HIGH',
          policyTriggered: 'Specification Deviation', evidenceId: 'ev-h-qtr',
          missingEvidenceId: 'ev-h-missing-approval', recommendedAction: 'Request Material Approval',
          timestamp: '2025-06-18T10:00:00Z',
        },
        {
          id: 'ce-h-scope-1', projectId: 'proj-hospital', dimension: 'SCOPE', title: 'Scope expansion',
          before: '200-bed hospital', after: '200-bed hospital + telemedicine wing', delta: 'Expanded', severity: 'MEDIUM',
          policyTriggered: 'Scope Change Without Approval', missingEvidenceId: 'ev-h-missing-vo',
          recommendedAction: 'Request Variation Order', timestamp: '2025-04-12T14:00:00Z',
        },
        {
          id: 'ce-h-sched-1', projectId: 'proj-hospital', dimension: 'SCHEDULE', title: 'Schedule delay',
          before: '24 Months', after: '29 Months', delta: '+5 Months', severity: 'MEDIUM',
          policyTriggered: 'Delay Exceeds Grace Period', recommendedAction: 'Verify Extension Approval',
          timestamp: '2025-08-01T09:00:00Z',
        },
      ],
      evidence: [
        { id: 'ev-h-award', type: 'Award Contract', title: 'Original Award Contract', status: 'AVAILABLE', date: '2024-06-10', confidence: 'HIGH' },
        { id: 'ev-h-qtr', type: 'Quality Certificate', title: 'Quality Test Report #9', status: 'AVAILABLE', date: '2025-06-20', confidence: 'HIGH', linkedChangeEvent: 'ce-h-mat-1' },
        { id: 'ev-h-progress', type: 'Progress Report', title: 'Progress Report Q2 2025', status: 'AVAILABLE', date: '2025-07-15', confidence: 'MEDIUM' },
      ],
      evidenceGaps: [
        { id: 'ev-h-missing-approval', type: 'Approval Letter', title: 'Material Change Approval', status: 'MISSING', linkedChangeEvent: 'ce-h-mat-1' },
        { id: 'ev-h-missing-vo', type: 'Variation Order', title: 'Scope Expansion Variation Order', status: 'MISSING', linkedChangeEvent: 'ce-h-scope-1' },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// REMAINING 17 PROJECTS (lighter data, realistic metadata)
// ═══════════════════════════════════════════════════════════════

function makeProject(
  id: string, name: string, code: string, sector: Project['sector'],
  state: string, district: string, authority: string, contractor: string,
  awardCost: number, currentCost: number, durationMonths: number, currentDuration: number,
  alignment: number, priority: number, evidenceConf: number,
  reviewStatus: Project['reviewStatus'], variationCount: number, gapCount: number,
  awardDate: string, lastEvent: string,
): Project {
  const costDelta = ((currentCost - awardCost) / awardCost * 100);
  const hasVariations = variationCount > 0;
  return {
    id, name, projectCode: code, sector,
    location: { state, district }, authority, contractor,
    status: 'ACTIVE', alignmentScore: alignment, priorityScore: priority,
    evidenceConfidence: evidenceConf, reviewStatus,
    awardDate, startDate: awardDate,
    originalCompletionDate: '2026-06-01', currentExpectedCompletionDate: '2026-09-01',
    lastEvent,
    awardSnapshot: {
      projectCost: awardCost, durationMonths, primeContractor: contractor,
      subcontractors: [], materials: {},
    },
    currentFacts: {
      projectCost: currentCost, durationForecast: currentDuration, primeContractor: contractor,
      currentSubcontractor: '', materials: {},
    },
    reviewCases: hasVariations ? [{
      id: `ANV-${500 + Math.floor(Math.random() * 400)}`,
      projectId: id, title: `Variations Detected in ${name}`,
      priorityScore: priority, priorityLevel: priority > 70 ? 'HIGH' : priority > 40 ? 'MEDIUM' : 'LOW',
      status: reviewStatus,
      recommendedAction: gapCount > 0 ? 'REQUEST EVIDENCE' : 'REVIEW VARIATIONS',
      changeEvents: Array.from({ length: variationCount }, (_, i) => ({
        id: `ce-${id}-${i}`, projectId: id,
        dimension: (['COST', 'SCHEDULE', 'SPECIFICATION', 'SUBCONTRACTOR', 'SCOPE'] as const)[i % 5],
        title: ['Cost variation', 'Schedule delay', 'Material change', 'Contractor change', 'Scope change'][i % 5],
        before: '-', after: '-', delta: costDelta > 10 ? `+${costDelta.toFixed(1)}%` : 'Changed',
        severity: (priority > 60 ? 'HIGH' : 'MEDIUM') as 'HIGH' | 'MEDIUM',
        policyTriggered: 'Threshold exceeded', recommendedAction: 'Review required',
        timestamp: new Date().toISOString(),
      })),
      evidence: [{ id: `ev-${id}-award`, type: 'Award Contract', title: 'Award Contract', status: 'AVAILABLE' as const }],
      evidenceGaps: Array.from({ length: gapCount }, (_, i) => ({
        id: `ev-${id}-gap-${i}`, type: 'Variation Order', title: `Missing Document ${i + 1}`, status: 'MISSING' as const,
      })),
    }] : [],
  };
}

const otherProjects: Project[] = [
  makeProject('proj-metro-del', 'Delhi Metro Phase IV Extension', 'DMRC/DL/2024/089', 'Rail', 'Delhi', 'New Delhi', 'Delhi Metro Rail Corporation', 'L&T Construction', 4500000000, 4800000000, 36, 38, 91, 28, 85, 'RESOLVED', 1, 0, '2024-03-15', '1 hour ago'),
  makeProject('proj-bridge-raj', 'Chambal River Bridge Reconstruction', 'PWD/RJ/2024/034', 'Bridges', 'Rajasthan', 'Kota', 'Rajasthan PWD', 'BridgeTech Engineers', 320000000, 365000000, 18, 22, 76, 61, 68, 'UNDER_REVIEW', 3, 2, '2024-07-01', '30 minutes ago'),
  makeProject('proj-school-up', 'Model School Complex Varanasi', 'UPBS/UP/2024/112', 'Schools', 'Uttar Pradesh', 'Varanasi', 'UP Basic Shiksha Parishad', 'EduBuild Infra', 45000000, 47500000, 12, 14, 89, 32, 78, 'EXPLAINED', 1, 0, '2024-08-20', '2 hours ago'),
  makeProject('proj-power-guj', 'Solar Power Substation Kutch', 'GUVNL/GJ/2024/076', 'Power Infrastructure', 'Gujarat', 'Kutch', 'Gujarat Urja Vikas Nigam', 'PowerGrid Solutions', 180000000, 182000000, 10, 10, 97, 12, 92, 'RESOLVED', 0, 0, '2024-10-01', '3 hours ago'),
  makeProject('proj-waste-ker', 'Integrated Waste Processing Plant', 'KSWD/KL/2024/045', 'Waste Management', 'Kerala', 'Ernakulam', 'Kerala Solid Waste Dept.', 'GreenProcess Ltd.', 95000000, 108000000, 14, 18, 78, 55, 62, 'AWAITING_EVIDENCE', 2, 2, '2024-05-15', '15 minutes ago'),
  makeProject('proj-urban-tel', 'Hyderabad Smart City Roads', 'GHMC/TS/2024/098', 'Urban Development', 'Telangana', 'Hyderabad', 'Greater Hyderabad Municipal Corp.', 'UrbanWorks India', 260000000, 275000000, 16, 18, 87, 38, 75, 'UNDER_REVIEW', 2, 1, '2024-04-10', '1 hour ago'),
  makeProject('proj-highway-mh', 'Mumbai-Nagpur Expressway Section 7', 'MSRDC/MH/2024/023', 'Highways', 'Maharashtra', 'Nagpur', 'Maharashtra State Road Dev. Corp.', 'Reliance Infra', 820000000, 890000000, 24, 28, 82, 48, 70, 'UNDER_REVIEW', 3, 1, '2024-02-28', '25 minutes ago'),
  makeProject('proj-hospital-ker', 'Thiruvananthapuram Medical College Wing', 'KHD/KL/2024/057', 'Hospitals', 'Kerala', 'Thiruvananthapuram', 'Kerala Health Dept.', 'MedBuild Kerala', 150000000, 158000000, 18, 20, 88, 35, 80, 'EXPLAINED', 1, 0, '2024-06-01', '4 hours ago'),
  makeProject('proj-water-mp', 'Narmada Canal Extension Phase II', 'MPWRD/MP/2024/033', 'Water Infrastructure', 'Madhya Pradesh', 'Indore', 'MP Water Resources Dept.', 'HydroTech Systems', 420000000, 455000000, 20, 24, 80, 54, 66, 'AWAITING_EVIDENCE', 2, 2, '2024-04-20', '40 minutes ago'),
  makeProject('proj-rail-ka', 'Bengaluru Suburban Rail Line 2', 'KRIDE/KA/2024/015', 'Rail', 'Karnataka', 'Bengaluru', 'K-RIDE', 'Rail Vikas Nigam', 3200000000, 3350000000, 30, 33, 90, 30, 82, 'UNDER_REVIEW', 1, 0, '2024-01-15', '2 hours ago'),
  makeProject('proj-bridge-tn', 'Palk Strait Approach Bridge', 'NHAI/TN/2024/078', 'Bridges', 'Tamil Nadu', 'Ramanathapuram', 'NHAI Tamil Nadu', 'Afcons Infrastructure', 1800000000, 1950000000, 36, 40, 85, 42, 74, 'UNDER_REVIEW', 2, 1, '2024-03-01', '1 hour ago'),
  makeProject('proj-school-rj', 'Jaipur District Education Hub', 'RPSC/RJ/2024/091', 'Schools', 'Rajasthan', 'Jaipur', 'Rajasthan Education Dept.', 'Shiksha Builders', 65000000, 67000000, 10, 11, 93, 18, 88, 'RESOLVED', 0, 0, '2024-09-01', '5 hours ago'),
  makeProject('proj-power-tel', 'Telangana Grid Modernization', 'TSSPDCL/TS/2024/044', 'Power Infrastructure', 'Telangana', 'Warangal', 'TS Southern Power Dist. Co.', 'Siemens India', 340000000, 348000000, 14, 15, 95, 15, 90, 'RESOLVED', 0, 0, '2024-07-15', '6 hours ago'),
  makeProject('proj-waste-mh', 'Pune Biomethane Recovery Plant', 'PMC/MH/2024/066', 'Waste Management', 'Maharashtra', 'Pune', 'Pune Municipal Corp.', 'EnviroTech Solutions', 72000000, 81000000, 12, 16, 75, 58, 60, 'OPEN', 3, 2, '2024-08-01', '10 minutes ago'),
  makeProject('proj-urban-ka', 'Mysuru Heritage Area Redevelopment', 'MCC/KA/2024/102', 'Urban Development', 'Karnataka', 'Mysuru', 'Mysuru City Corporation', 'Heritage Infra Pvt.', 185000000, 192000000, 18, 20, 86, 36, 76, 'EXPLAINED', 1, 1, '2024-05-01', '3 hours ago'),
  makeProject('proj-highway-gj', 'Ahmedabad Ring Road Phase III', 'NHAI/GJ/2024/055', 'Highways', 'Gujarat', 'Ahmedabad', 'NHAI Gujarat', 'Sadbhav Engineering', 560000000, 610000000, 20, 24, 79, 56, 64, 'OPEN', 3, 2, '2024-06-15', '20 minutes ago'),
  makeProject('proj-water-del', 'Delhi Jal Board Pipeline Renewal', 'DJB/DL/2024/088', 'Water Infrastructure', 'Delhi', 'South Delhi', 'Delhi Jal Board', 'WaterWorks India', 130000000, 135000000, 8, 9, 92, 22, 84, 'RESOLVED', 1, 0, '2024-10-15', '4 hours ago'),
];

// ═══════════════════════════════════════════════════════════════
// ALL PROJECTS
// ═══════════════════════════════════════════════════════════════

export const ALL_PROJECTS: Project[] = [nh42, smartWater, hospital, ...otherProjects];

export const FEATURED_PROJECTS: Project[] = [nh42, smartWater, hospital];

// ═══════════════════════════════════════════════════════════════
// ACTIVITY FEED
// ═══════════════════════════════════════════════════════════════

export const ACTIVITY_FEED: ActivityEvent[] = [
  { id: 'ae-1', timestamp: '2025-09-12T22:10:00Z', relativeTime: 'NOW', text: 'Material variation detected — VG-40 → VG-30', projectId: 'proj-nh42', projectName: 'NH-42 Highway Expansion', type: 'alert', dimension: 'SPECIFICATION' },
  { id: 'ae-2', timestamp: '2025-09-12T22:08:00Z', relativeTime: '2 MIN AGO', text: 'Evidence uploaded — Sensor Delivery Challan', projectId: 'proj-smart-water', projectName: 'Smart Water Pipeline Network', type: 'info' },
  { id: 'ae-3', timestamp: '2025-09-12T22:02:00Z', relativeTime: '8 MIN AGO', text: 'Review priority increased to MEDIUM', projectId: 'proj-hospital', projectName: 'District Hospital Upgrade', type: 'warning' },
  { id: 'ae-4', timestamp: '2025-09-12T21:55:00Z', relativeTime: '15 MIN AGO', text: 'Subcontractor credentials verification pending', projectId: 'proj-smart-water', projectName: 'Smart Water Pipeline Network', type: 'warning' },
  { id: 'ae-5', timestamp: '2025-09-12T21:50:00Z', relativeTime: '20 MIN AGO', text: 'Cost threshold exceeded — ₹8.1 Cr vs ₹7.2 Cr', projectId: 'proj-waste-mh', projectName: 'Pune Biomethane Recovery Plant', type: 'alert', dimension: 'COST' },
  { id: 'ae-6', timestamp: '2025-09-12T21:40:00Z', relativeTime: '30 MIN AGO', text: 'Schedule delay flagged — +4 months', projectId: 'proj-bridge-raj', projectName: 'Chambal River Bridge', type: 'warning', dimension: 'SCHEDULE' },
  { id: 'ae-7', timestamp: '2025-09-12T21:30:00Z', relativeTime: '40 MIN AGO', text: 'Quality test report uploaded', projectId: 'proj-hospital', projectName: 'District Hospital Upgrade', type: 'info' },
  { id: 'ae-8', timestamp: '2025-09-12T21:00:00Z', relativeTime: '1 HOUR AGO', text: 'Review case ANV-482 opened', projectId: 'proj-nh42', projectName: 'NH-42 Highway Expansion', type: 'alert' },
  { id: 'ae-9', timestamp: '2025-09-12T20:30:00Z', relativeTime: '1.5 HOURS AGO', text: 'Alignment score updated — 82% → 79%', projectId: 'proj-highway-gj', projectName: 'Ahmedabad Ring Road Phase III', type: 'warning' },
  { id: 'ae-10', timestamp: '2025-09-12T20:00:00Z', relativeTime: '2 HOURS AGO', text: 'All evidence verified — case resolved', projectId: 'proj-school-up', projectName: 'Model School Complex Varanasi', type: 'success' },
  { id: 'ae-11', timestamp: '2025-09-12T19:30:00Z', relativeTime: '2.5 HOURS AGO', text: 'New RA Bill submitted', projectId: 'proj-highway-mh', projectName: 'Mumbai-Nagpur Expressway Section 7', type: 'info' },
  { id: 'ae-12', timestamp: '2025-09-12T19:00:00Z', relativeTime: '3 HOURS AGO', text: 'Extension approval documented', projectId: 'proj-hospital-ker', projectName: 'Thiruvananthapuram Medical College Wing', type: 'success' },
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export function getProjectById(id: string): Project | undefined {
  return ALL_PROJECTS.find(p => p.id === id);
}

export function getProjectsByPriority(): Project[] {
  return [...ALL_PROJECTS].sort((a, b) => b.priorityScore - a.priorityScore);
}

export function getProjectsBySector(sector: Project['sector']): Project[] {
  return ALL_PROJECTS.filter(p => p.sector === sector);
}

export function getProjectsRequiringReview(): Project[] {
  return ALL_PROJECTS.filter(p => p.reviewCases.some(rc => rc.status === 'OPEN' || rc.status === 'UNDER_REVIEW' || rc.status === 'AWAITING_EVIDENCE'));
}

export interface AggregateStats {
  totalProjects: number;
  projectsRequiringReview: number;
  totalVariations: number;
  totalEvidenceGaps: number;
  highPriorityCount: number;
  totalCostUnderReview: number;
  variationsByType: Record<string, number>;
  projectsBySector: Record<string, number>;
}

export function getAggregateStats(): AggregateStats {
  const allChangeEvents = ALL_PROJECTS.flatMap(p => p.reviewCases.flatMap(rc => rc.changeEvents));
  const allGaps = ALL_PROJECTS.flatMap(p => p.reviewCases.flatMap(rc => rc.evidenceGaps));
  const reviewProjects = getProjectsRequiringReview();
  const highPriority = ALL_PROJECTS.filter(p => p.priorityScore > 60);

  const variationsByType: Record<string, number> = {};
  allChangeEvents.forEach(ce => {
    variationsByType[ce.dimension] = (variationsByType[ce.dimension] || 0) + 1;
  });

  const projectsBySector: Record<string, number> = {};
  ALL_PROJECTS.forEach(p => {
    projectsBySector[p.sector] = (projectsBySector[p.sector] || 0) + 1;
  });

  const totalCostUnderReview = reviewProjects.reduce((sum, p) => sum + p.currentFacts.projectCost, 0);

  return {
    totalProjects: ALL_PROJECTS.length,
    projectsRequiringReview: reviewProjects.length,
    totalVariations: allChangeEvents.length,
    totalEvidenceGaps: allGaps.length,
    highPriorityCount: highPriority.length,
    totalCostUnderReview,
    variationsByType,
    projectsBySector,
  };
}
