import type { Project } from '@/types';
import type { Edge, Node } from '@xyflow/react';

export type GraphKind =
  | 'jurisdiction'
  | 'project'
  | 'award'
  | 'party'
  | 'obligation'
  | 'fact'
  | 'change'
  | 'evidence'
  | 'gap'
  | 'case'
  | 'policy';

export type AnvayaNodeData = {
  label: string;
  kind: GraphKind;
  subtitle?: string;
  href?: string;
  meta?: string;
};

export type AnvayaNode = Node<AnvayaNodeData>;
export type AnvayaEdge = Edge;

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'unknown';
}

function partyId(name: string) {
  return `party-${slug(name)}`;
}

function addNode(
  nodes: AnvayaNode[],
  seen: Set<string>,
  node: AnvayaNode,
) {
  if (seen.has(node.id)) return;
  seen.add(node.id);
  nodes.push(node);
}

function addEdge(edges: AnvayaEdge[], seen: Set<string>, edge: AnvayaEdge) {
  if (seen.has(edge.id)) return;
  seen.add(edge.id);
  edges.push(edge);
}

const COL = 240;
const ROW = 130;

export function buildProjectGraph(project: Project): { nodes: AnvayaNode[]; edges: AnvayaEdge[] } {
  const nodes: AnvayaNode[] = [];
  const edges: AnvayaEdge[] = [];
  const nodeSeen = new Set<string>();
  const edgeSeen = new Set<string>();

  const jurId = `jur-${slug(project.location.state)}-${slug(project.location.district)}`;
  const awardId = `award-${project.id}-v0`;
  const reviewCase = project.reviewCases[0];

  addNode(nodes, nodeSeen, {
    id: jurId,
    position: { x: 480, y: 0 },
    data: {
      kind: 'jurisdiction',
      label: `${project.location.district}, ${project.location.state}`,
      subtitle: project.authority,
    },
  });

  addNode(nodes, nodeSeen, {
    id: project.id,
    position: { x: 480, y: ROW },
    data: {
      kind: 'project',
      label: project.name,
      subtitle: project.projectCode,
      href: `/projects/${project.id}`,
      meta: `alignment ${project.alignmentScore} · priority ${project.priorityScore}`,
    },
  });
  addEdge(edges, edgeSeen, {
    id: `e-${project.id}-under`,
    source: project.id,
    target: jurId,
    label: 'UNDER',
  });

  addNode(nodes, nodeSeen, {
    id: awardId,
    position: { x: 180, y: ROW * 2 },
    data: {
      kind: 'award',
      label: 'Award snapshot',
      subtitle: `${(project.awardSnapshot.projectCost / 10000000).toFixed(1)} Cr · ${project.awardSnapshot.durationMonths} mo`,
      meta: project.awardDate,
    },
  });
  addEdge(edges, edgeSeen, {
    id: `e-${project.id}-award`,
    source: project.id,
    target: awardId,
    label: 'HAS_AWARD',
  });

  const prime = project.awardSnapshot.primeContractor || project.contractor;
  addNode(nodes, nodeSeen, {
    id: partyId(prime),
    position: { x: 780, y: ROW * 2 },
    data: { kind: 'party', label: prime, subtitle: 'Prime contractor' },
  });
  addEdge(edges, edgeSeen, {
    id: `e-${awardId}-awarded`,
    source: awardId,
    target: partyId(prime),
    label: 'AWARDED_TO',
  });

  const subs = [
    ...project.awardSnapshot.subcontractors,
    project.currentFacts.currentSubcontractor,
  ].filter((name, index, all) => name && all.indexOf(name) === index);

  subs.forEach((name, i) => {
    const id = partyId(name);
    addNode(nodes, nodeSeen, {
      id,
      position: { x: 1020, y: ROW * 2 + i * 90 },
      data: {
        kind: 'party',
        label: name,
        subtitle: project.awardSnapshot.subcontractors.includes(name) ? 'Named subcontractor' : 'Current subcontractor',
      },
    });
    addEdge(edges, edgeSeen, {
      id: `e-${partyId(prime)}-sub-${id}`,
      source: partyId(prime),
      target: id,
      label: 'SUBCONTRACTS',
      animated: !project.awardSnapshot.subcontractors.includes(name),
    });
  });

  const obligations: { id: string; label: string; subtitle: string }[] = [
    {
      id: `obl-${project.id}-cost`,
      label: 'Cost obligation',
      subtitle: `${(project.awardSnapshot.projectCost / 10000000).toFixed(1)} Cr awarded`,
    },
    {
      id: `obl-${project.id}-schedule`,
      label: 'Schedule obligation',
      subtitle: `${project.awardSnapshot.durationMonths} months`,
    },
  ];
  Object.entries(project.awardSnapshot.materials).forEach(([key, value]) => {
    obligations.push({
      id: `obl-${project.id}-mat-${slug(key)}`,
      label: `${key} spec`,
      subtitle: String(value),
    });
  });
  if (project.awardSnapshot.scope) {
    obligations.push({
      id: `obl-${project.id}-scope`,
      label: 'Scope obligation',
      subtitle: project.awardSnapshot.scope,
    });
  }

  obligations.forEach((obl, i) => {
    addNode(nodes, nodeSeen, {
      id: obl.id,
      position: { x: 40 + (i % 4) * COL, y: ROW * 3 + Math.floor(i / 4) * 90 },
      data: { kind: 'obligation', label: obl.label, subtitle: obl.subtitle },
    });
    addEdge(edges, edgeSeen, {
      id: `e-${awardId}-${obl.id}`,
      source: awardId,
      target: obl.id,
      label: 'HAS_OBLIGATION',
    });
  });

  const obligationForDimension = (dimension: string, before: string) => {
    if (dimension === 'COST') return `obl-${project.id}-cost`;
    if (dimension === 'SCHEDULE') return `obl-${project.id}-schedule`;
    if (dimension === 'SCOPE') return `obl-${project.id}-scope`;
    const material = obligations.find((o) => o.subtitle && before.includes(String(o.subtitle)));
    return material?.id ?? obligations.find((o) => o.id.includes('mat'))?.id;
  };

  const events = project.reviewCases.flatMap((rc) => rc.changeEvents);
  events.forEach((event, i) => {
    addNode(nodes, nodeSeen, {
      id: event.id,
      position: { x: 80 + (i % 4) * COL, y: ROW * 4.6 + Math.floor(i / 4) * 100 },
      data: {
        kind: 'change',
        label: event.title,
        subtitle: `${event.dimension} · ${event.delta}`,
        meta: `${event.before} → ${event.after}`,
        href: `/projects/${project.id}/alignment`,
      },
    });
    const obl = obligationForDimension(event.dimension, event.before);
    if (obl && nodeSeen.has(obl)) {
      addEdge(edges, edgeSeen, {
        id: `e-${event.id}-deviates`,
        source: event.id,
        target: obl,
        label: 'DEVIATES_FROM',
        animated: true,
      });
    }
    if (reviewCase) {
      addEdge(edges, edgeSeen, {
        id: `e-${event.id}-bundled`,
        source: event.id,
        target: reviewCase.id,
        label: 'BUNDLED_IN',
      });
    }
    if (event.evidenceId) {
      addEdge(edges, edgeSeen, {
        id: `e-${event.id}-supported`,
        source: event.id,
        target: event.evidenceId,
        label: 'SUPPORTED_BY',
      });
    }
    if (event.missingEvidenceId) {
      addEdge(edges, edgeSeen, {
        id: `e-${event.id}-gap`,
        source: event.id,
        target: event.missingEvidenceId,
        label: 'CONTRADICTED_BY',
        style: { strokeDasharray: '6 4' },
        animated: true,
      });
    }
  });

  (project.facts ?? []).forEach((fact, i) => {
    addNode(nodes, nodeSeen, {
      id: fact.id,
      position: { x: 80 + (i % 5) * 200, y: ROW * 5.8 },
      data: {
        kind: 'fact',
        label: fact.statement,
        subtitle: fact.source,
        meta: `${fact.date} · ${fact.confidence}`,
      },
    });
    if (fact.linkedChangeEvent && nodeSeen.has(fact.linkedChangeEvent)) {
      addEdge(edges, edgeSeen, {
        id: `e-${fact.id}-asserts`,
        source: fact.id,
        target: fact.linkedChangeEvent,
        label: 'ASSERTED_ON',
      });
    } else {
      addEdge(edges, edgeSeen, {
        id: `e-${fact.id}-project`,
        source: fact.id,
        target: project.id,
        label: 'ASSERTED_ON',
      });
    }
  });

  const evidence = project.reviewCases.flatMap((rc) => [...rc.evidence, ...rc.evidenceGaps]);
  evidence.forEach((item, i) => {
    const isGap = item.status === 'MISSING';
    addNode(nodes, nodeSeen, {
      id: item.id,
      position: { x: 40 + (i % 5) * 220, y: ROW * 6.8 + Math.floor(i / 5) * 90 },
      data: {
        kind: isGap ? 'gap' : 'evidence',
        label: item.title,
        subtitle: `${item.type} · ${item.status}`,
        href: `/projects/${project.id}/evidence`,
      },
    });
    if (item.linkedChangeEvent && nodeSeen.has(item.linkedChangeEvent)) {
      addEdge(edges, edgeSeen, {
        id: `e-${item.id}-ce`,
        source: item.linkedChangeEvent,
        target: item.id,
        label: isGap ? 'CONTRADICTED_BY' : 'SUPPORTED_BY',
        style: isGap ? { strokeDasharray: '6 4' } : undefined,
      });
    }
  });

  project.reviewCases.forEach((rc, i) => {
    addNode(nodes, nodeSeen, {
      id: rc.id,
      position: { x: 480, y: ROW * 8 + i * 100 },
      data: {
        kind: 'case',
        label: rc.id,
        subtitle: rc.title,
        meta: `${rc.status} · priority ${rc.priorityScore}`,
        href: `/projects/${project.id}/review-case`,
      },
    });
    (rc.triggeredRules ?? [rc.changeEvents[0]?.policyTriggered].filter(Boolean)).forEach((rule, ri) => {
      if (!rule) return;
      const policyNodeId = `policy-${slug(rule)}`;
      addNode(nodes, nodeSeen, {
        id: policyNodeId,
        position: { x: 780 + ri * 40, y: ROW * 8 + i * 100 },
        data: { kind: 'policy', label: 'Policy', subtitle: rule },
      });
      addEdge(edges, edgeSeen, {
        id: `e-${rc.id}-${policyNodeId}`,
        source: rc.id,
        target: policyNodeId,
        label: 'SCORED_BY',
      });
    });
  });

  return prune(nodes, edges);
}

function prune(nodes: AnvayaNode[], edges: AnvayaEdge[]) {
  const ids = new Set(nodes.map((n) => n.id));
  return { nodes, edges: edges.filter((e) => ids.has(e.source) && ids.has(e.target)) };
}

export function buildGlobalGraph(projects: Project[]): { nodes: AnvayaNode[]; edges: AnvayaEdge[] } {
  const nodes: AnvayaNode[] = [];
  const edges: AnvayaEdge[] = [];
  const nodeSeen = new Set<string>();
  const edgeSeen = new Set<string>();

  const contractors = [...new Set(projects.map((p) => p.contractor))];
  contractors.forEach((name, i) => {
    const owned = projects.filter((p) => p.contractor === name);
    addNode(nodes, nodeSeen, {
      id: partyId(name),
      position: { x: 80 + (i % 6) * COL, y: 40 + Math.floor(i / 6) * 110 },
      data: {
        kind: 'party',
        label: name,
        subtitle: `${owned.length} project${owned.length === 1 ? '' : 's'}`,
        meta: owned.length > 1 ? 'concentration' : undefined,
      },
    });
  });

  projects.forEach((project, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    addNode(nodes, nodeSeen, {
      id: project.id,
      position: { x: 80 + col * 260, y: 320 + row * 150 },
      data: {
        kind: 'project',
        label: project.name,
        subtitle: `${project.location.district} · p${project.priorityScore}`,
        href: `/projects/${project.id}/graph`,
        meta: project.reviewStatus,
      },
    });
    addEdge(edges, edgeSeen, {
      id: `e-${project.id}-awarded`,
      source: project.id,
      target: partyId(project.contractor),
      label: 'AWARDED_TO',
    });

    const openCase = project.reviewCases.find((rc) => rc.status !== 'RESOLVED' && rc.status !== 'EXPLAINED');
    if (openCase) {
      addNode(nodes, nodeSeen, {
        id: openCase.id,
        position: { x: 80 + col * 260 + 40, y: 320 + row * 150 + 70 },
        data: {
          kind: 'case',
          label: openCase.id,
          subtitle: `priority ${openCase.priorityScore}`,
          href: `/projects/${project.id}/review-case`,
        },
      });
      addEdge(edges, edgeSeen, {
        id: `e-${project.id}-${openCase.id}`,
        source: project.id,
        target: openCase.id,
        label: 'BUNDLED_IN',
        animated: openCase.priorityScore > 60,
      });
    }
  });

  return prune(nodes, edges);
}
