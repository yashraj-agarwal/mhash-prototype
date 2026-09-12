import { ChangeEvent } from '@/types';

export function calculatePriorityScore(events: ChangeEvent[]): number {
  let score = 0;
  
  events.forEach(event => {
    switch(event.dimension) {
      case 'COST': score += 30; break;
      case 'SPECIFICATION': score += 15; break;
      case 'SUBCONTRACTOR': score += 10; break;
      case 'SCHEDULE': score += 7; break;
      default: score += 5;
    }
    
    // In our simplified prototype, missing evidence drives priority heavily up.
    // In reality this might be more nuanced (like checking specific evidence gaps).
    if (event.missingEvidenceId || event.dimension === 'COST') {
      score += 25;
    }
  });

  return Math.min(score, 100);
}
