import type { Project, CaseStudy, JourneyLane } from './types'

export const projects: Project[] = [
  {
    title: 'AI Self-Checkout',
    body: 'Final year project. Computer vision and machine learning recognize products in real time, with frontend dashboards for live detection.',
    tech: ['python', 'react', 'vue'],
  },
  {
    title: 'Bakery Management',
    body: 'Operations, inventory and order management system for a bakery.',
    tech: ['php', 'mysql', 'js'],
  },
  {
    title: 'Bakery Mobile App',
    body: 'Android app for online ordering and customer management.',
    tech: ['java', 'firebase', 'android'],
  },
  {
    title: 'Robotics and IoT',
    body: 'Obstacle avoidance and line-following robot, temperature and humidity sensing, fingerprint and ROS-based projects.',
    tech: ['python', 'c'],
  },
]

/**
 * Case studies — problem → approach → impact.
 * Content is grounded in the résumé details. Expand with real metrics when available.
 */
export const caseStudies: CaseStudy[] = [
  {
    title: 'Embeddable identity Web SDK',
    context: 'Shufti Pro',
    problem:
      'Every enterprise client needed document, selfie and liveness capture, but shipping it per-integration fragmented the experience and stalled deals.',
    approach:
      'Built a reusable embeddable Web SDK in React usable from Vue and Angular hosts, exposing a stable API for backend verification flows while keeping UI, responsiveness and accessibility consistent.',
    impact: ['One SDK, many platforms', 'Faster client onboarding', 'Consistent capture UX'],
    tech: ['react', 'vue', 'angular'],
  },
  {
    title: 'KYC / KYB / AML enterprise dashboard',
    context: 'Shufti Pro & Facia',
    problem:
      'Reviewers juggled high-volume KYC, KYB and AML cases across dense enterprise screens where clarity and speed decided outcomes.',
    approach:
      'Designed and shipped the review interfaces and onboarding flows, wired to Laravel and MongoDB services, optimising responsiveness and component reuse so new verification products could launch on the same foundation.',
    impact: ['Reusable product surface', 'Faster review decisions', 'Two verification products'],
    tech: ['react', 'laravel', 'mongo'],
  },
  {
    title: 'ClickUp-to-deploy agent workflows',
    context: 'Programmers Force · AI engineering',
    problem:
      'Repetitive engineering setup around repositories consumed time that was better spent building product.',
    approach:
      'Built specialised agents (frontend, backend, database, DevOps, orchestration) with reusable skills and context systems across the full Shufti Pro repositories, orchestrating a path from a ClickUp requirement to deployment.',
    impact: ['Automated context handling', 'Requirement → deployment', 'AI in daily workflow'],
    tech: ['claude', 'python', 'git'],
  },
]

export const journey: JourneyLane[] = [
  { label: 'BSc Computer Engineering, ITU Lahore', start: 0 / 7, width: 5 / 7, variant: 'b1' },
  { label: 'Teaching Assistant, ITU', start: 3 / 7, width: 2 / 7, variant: 'b2' },
  {
    label: 'Programmers Force: Shufti Pro, Facia, AI automation',
    start: 4 / 7,
    width: 3 / 7,
    variant: 'b3',
  },
  { label: 'Trainee Engineer, 10x Engineers', start: 4 / 7, width: 3 / 7, variant: 'b2' },
]

export const journeyAxis = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']