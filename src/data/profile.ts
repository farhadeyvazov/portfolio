// Configurable profile data (per the implementation spec: CV path, LinkedIn
// URL, etc. must be configurable, not hardcoded across components).

export const profileConfig = {
  name: 'Farhad Eyvazov',
  phone: '+994 55 563 91 29',
  email: 'eyvazov.ferhad1997@gmail.com',
  /** Swap this file once the real CV is ready (per Farhad: not ready yet). */
  cvPath: '/cv-placeholder.pdf',
  linkedinUrl: 'https://linkedin.com/in/ferhadeyvazov',
  githubUrl: 'https://github.com/farhadeyvazov',
  /** PLACEHOLDER — real portrait to be supplied. */
  heroPortrait: '/images/hero-portrait-placeholder.svg',
  /** Cropped from the Version 1 mockup, per Farhad — keep as-is, no redesign. */
  aboutWorkspacePhoto: '/images/about-workspace.jpg',
  /** Cropped from the Version 1 mockup, per Farhad — keep as-is, no redesign. */
  letsWorkTogetherBg: '/images/lets-work-together-bg.jpg',
};

// Translatable copy (hero headline, about paragraphs, job title, etc.) lives in
// the i18n message files (src/i18n/*.json), not here — added when each section
// is built (Stage 5 onward), since every user-facing string must support all
// languages.
