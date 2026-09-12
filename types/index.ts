export type Dimension = 'COST' | 'PARTY' | 'SUBCONTRACTOR' | 'MATERIAL' | 'SPECIFICATION' | 'SCHEDULE' | 'SCOPE' | 'PROCESS';
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type EvidenceStatus = 'AVAILABLE' | 'MISSING' | 'PENDING' | 'NEEDS_VERIFICATION';
export type ReviewStatus = 'OPEN' | 'UNDER_REVIEW' | 'AWAITING_EVIDENCE' | 'EXPLAINED' | 'RESOLVED';
export type ProjectSector = 'Highways' | 'Water Infrastructure' | 'Hospitals' | 'Rail' | 'Urban Development' | 'Bridges' | 'Schools' | 'Power Infrastructure' | 'Waste Management';

export interface AwardSnapshot {
  projectCost: number;
  durationMonths: number;
  primeContractor: string;
  subcontractors: string[];
  materials: Record<string, string>;
  scope?: string;
}

export interface CurrentFact {
  projectCost: number;
  durationForecast: number;
  primeContractor: string;
  currentSubcontractor: string;
  materials: Record<string, string>;
  scope?: string;
}

export interface Evidence {
  id: string;
  projectId?: string;
  type: string;
  documentType?: string;
  title: string;
  status: EvidenceStatus;
  date?: string;
  uploadedBy?: string;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  summary?: string;
  linkedChangeEvent?: string;
  source?: string;
}

export interface ChangeEvent {
  id: string;
  projectId: string;
  dimension: Dimension;
  title: string;
  before: string;
  after: string;
  delta: string;
  severity: Severity;
  policyTriggered: string;
  evidenceId?: string;
  missingEvidenceId?: string;
  recommendedAction: string;
  timestamp: string;
  implication?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  details: string;
  alignment: number;
  type: 'award' | 'milestone' | 'variation' | 'evidence' | 'review';
}

export interface Fact {
  id: string;
  projectId: string;
  statement: string;
  source: string;
  date: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  linkedChangeEvent?: string;
}

export interface ReviewCase {
  id: string;
  projectId: string;
  title: string;
  priorityScore: number;
  priorityLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  changeEvents: ChangeEvent[];
  evidence: Evidence[];
  evidenceGaps: Evidence[];
  status: ReviewStatus;
  recommendedAction: string;
  generatedBrief?: string;
  assignedReviewer?: string;
  triggeredRules?: string[];
  impact?: string;
  createdDate?: string;
}

export interface AlignmentDimension {
  name: string;
  score: number;
  status: 'aligned' | 'drifting' | 'misaligned';
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  relativeTime: string;
  text: string;
  projectId: string;
  projectName: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  dimension?: Dimension;
}

export interface Project {
  id: string;
  name: string;
  projectCode: string;
  sector: ProjectSector;
  location: { state: string; district: string };
  authority: string;
  status: string;
  alignmentScore: number;
  priorityScore: number;
  evidenceConfidence: number;
  reviewStatus: ReviewStatus;
  awardDate: string;
  startDate: string;
  originalCompletionDate: string;
  currentExpectedCompletionDate: string;
  contractor: string;
  awardSnapshot: AwardSnapshot;
  currentFacts: CurrentFact;
  reviewCases: ReviewCase[];
  timelineEvents?: TimelineEvent[];
  facts?: Fact[];
  alignmentDimensions?: AlignmentDimension[];
  narrative?: string;
  lastEvent?: string;
}
