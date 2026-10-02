import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'taskool',
    title: 'Taskool',
    description: 'LMS platform with modern UI and course management system.',
    // Real content — taken from the mobile mockup's project detail card.
    overview:
      'Taskool is a modern LMS platform with a clean and intuitive interface. It helps educators create and manage courses, track student progress, and provide a better learning experience.',
    keyFeatures: [
      'Course management',
      'Student progress tracking',
      'Modern and responsive UI',
      'Role-based access control',
    ],
    technologies: ['React.js', 'TypeScript', 'RTK', 'Styled-components'],
    image: '/images/projects/taskool.svg',
    // PLACEHOLDER — not confirmed yet, follow up after Stage 8.
    liveUrl: null,
    githubUrl: null,
    category: 'frontend',
  },
  {
    slug: 'admin-dashboard',
    title: 'Admin Dashboard',
    description: 'Full-featured admin panel with analytics and user management.',
    // PLACEHOLDER overview/features — real copy to be supplied after Stage 8.
    overview: 'Detailed overview to be supplied by Farhad after Stage 8.',
    keyFeatures: ['Details to be supplied after Stage 8.'],
    technologies: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MaterialUI'],
    image: '/images/projects/admin-dashboard.svg',
    liveUrl: null,
    githubUrl: null,
    // Confirmed by Farhad: has both frontend and backend tags, so it shows
    // under both tabs.
    category: 'fullstack',
  },
  {
    slug: 'bizimyol',
    title: 'BizimYol',
    description: 'Travel and route platform with interactive maps.',
    // PLACEHOLDER overview/features — real copy to be supplied after Stage 8.
    overview: 'Detailed overview to be supplied by Farhad after Stage 8.',
    keyFeatures: ['Details to be supplied after Stage 8.'],
    technologies: ['HTML', 'Bootstrap', 'JavaScript'],
    image: '/images/projects/bizimyol.svg',
    liveUrl: null,
    githubUrl: null,
    category: 'frontend',
  },
];
