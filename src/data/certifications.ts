import type { CertificationEntry } from './types';

// Desktop mockup confirmed as source of truth (Crocusoft Academy, Coders
// Azerbaijan 06.2021–11.2021) — the mobile mockup's differing values
// ("Crossroad Academy", 06.2024–11.2024) were a mobile-mockup error.
export const certifications: CertificationEntry[] = [
  {
    name: 'FPV Drone Pilot',
    issuer: 'Haydar Aliyev Military Institute',
    dateRange: '06.2026 – 07.2026',
  },
  {
    name: 'Java Backend Development',
    issuer: 'Evo Academy',
    dateRange: '06.2025 – 11.2025',
  },
  {
    name: 'Advanced Frontend Training',
    issuer: 'Crocusoft Academy',
    dateRange: '05.2024 – 09.2024',
  },
  {
    name: 'Frontend Developer',
    issuer: 'Coders Azerbaijan',
    dateRange: '06.2021 – 11.2021',
  },
];
