export type PersonaRole =
  | 'engineer'
  | 'district'
  | 'city'
  | 'state'
  | 'auditor';

export type Persona = {
  id: PersonaRole;
  name: string;
  title: string;
  jurisdiction: string;
  email: string;
  layer: string;
};

export const SESSION_COOKIE = 'anvaya-session';

export const PERSONAS: Persona[] = [
  {
    id: 'engineer',
    name: 'Kavya Menon',
    title: 'Project Engineer',
    jurisdiction: 'Dharwad PIU',
    email: 'kavya.menon@pwd.ka.gov.in',
    layer: 'Project',
  },
  {
    id: 'district',
    name: 'Ramesh Iyer',
    title: 'District Officer',
    jurisdiction: 'Dharwad District',
    email: 'ramesh.iyer@pwd.ka.gov.in',
    layer: 'District',
  },
  {
    id: 'city',
    name: 'Anjali Rao',
    title: 'City Monitoring Cell',
    jurisdiction: 'Bengaluru Urban',
    email: 'anjali.rao@bbmp.gov.in',
    layer: 'City',
  },
  {
    id: 'state',
    name: 'Vikram Desai',
    title: 'Engineer-in-Chief desk',
    jurisdiction: 'Karnataka PWD',
    email: 'vikram.desai@pwd.ka.gov.in',
    layer: 'State',
  },
  {
    id: 'auditor',
    name: 'Priya Shah',
    title: 'Internal Auditor',
    jurisdiction: 'Vigilance / Audit',
    email: 'priya.shah@audit.gov.in',
    layer: 'Audit',
  },
];

export function getPersona(id: string | undefined | null): Persona | undefined {
  if (!id) return undefined;
  return PERSONAS.find((p) => p.id === id);
}

export function safeNextPath(raw: string | null | undefined): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || raw.startsWith('/login')) {
    return '/command-center';
  }
  return raw;
}
