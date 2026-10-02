export type ProjectCategory = 'frontend' | 'backend' | 'fullstack';

export interface Project {
  slug: string;
  title: string;
  /** Short description shown on the project card. */
  description: string;
  /** Longer description shown on the project detail page. */
  overview: string;
  keyFeatures: string[];
  technologies: string[];
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  /** Drives the Frontend/Backend tab filter — 'fullstack' shows under both tabs. */
  category: ProjectCategory;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  dateRange: string;
}

export interface SkillItem {
  /** Slug used to look up the matching react-icons component in TechStack. */
  id: string;
  name: string;
}
