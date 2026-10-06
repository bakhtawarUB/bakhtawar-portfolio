import type { ExperienceItem, SmallRole } from './types'

export const experience: ExperienceItem[] = [
  {
    company: 'Shufti Pro',
    meta: 'Global identity verification\nKYC, KYB, AML',
    open: true,
    tech: ['react', 'vue', 'angular', 'laravel', 'mongo'],
    points: [
      'Built frontends for KYC, KYB, AML, onboarding and verification services.',
      'Built and optimized reusable Web SDKs for client integrations across platforms.',
      'Improved UI responsiveness, feature performance and user experience in enterprise apps.',
      'Worked with backend teams on API and verification workflow integration.',
      'Handled client-specific customizations, issue resolution and optimization.',
      'Contributed Laravel and MongoDB services and internal tools.',
    ],
  },
  {
    company: 'AI engineering automation',
    meta: 'Claude Code Action\nAgent workflows',
    tech: ['python', 'git', 'linux'],
    chip: 'Claude Code Action',
    points: [
      'Built agents for frontend, backend, database, DevOps, project management and orchestration.',
      'Developed orchestrated workflows from ClickUp requirement to deployment.',
      'Created reusable skills and context systems for complete Shufti Pro repositories.',
      'Raised productivity with automated context handling and task execution pipelines.',
      'Helped bring AI-driven practices into existing engineering workflows.',
    ],
  },
  {
    company: 'Facia',
    meta: 'AI-powered identity\nverification',
    tech: ['react', 'js', 'ts'],
    points: [
      'Developed features and modern UI components for the verification platform.',
      'Integrated verification workflows, libraries and models.',
      'Improved scalability and maintainability through reusable frontend architecture.',
    ],
  },
]

export const smallRoles: SmallRole[] = [
  {
    title: 'Trainee Engineer',
    org: '10x Engineers, 2024 to 2026',
    body: 'Python, Linux, Vivado and RISC-V. Hands-on low-level systems and software workflows.',
  },
  {
    title: 'Teaching Assistant',
    org: 'ITU, 2023 to 2024',
    body: 'Taught data analysis and statistical workflows in STATA; supported labs and coursework.',
  },
  {
    title: 'BSc Computer Engineering',
    org: 'ITU Lahore, 2020 to 2024',
    body: 'CGPA 3.53. Academic Achievement Award, Crystal Shield.',
  },
]