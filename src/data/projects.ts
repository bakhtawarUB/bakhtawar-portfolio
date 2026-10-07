import type { FeaturedProject, OtherProject, JourneyLane } from './types'

/**
 * Featured projects — the story around the work, written from the visitor's
 * point of view: the problem, the part I played, and what it produced.
 */
export const featured: FeaturedProject[] = [
  {
    title: 'Embeddable identity Web SDK',
    context: 'Shufti Pro',
    problem:
      'Every enterprise client needed document, selfie and liveness capture, but shipping it per-integration fragmented the experience and stalled deals.',
    role: 'I owned the SDK surface end to end — the capture flow, the public API, and how it renders inside any host app.',
    result: ['One SDK works across React, Vue and Angular', 'Clients get to verify faster', 'Consistent capture UX everywhere'],
    tech: ['react', 'vue', 'angular'],
  },
  {
    title: 'KYC / KYB / AML enterprise dashboard',
    context: 'Shufti Pro & Facia',
    problem:
      'Reviewers juggled high-volume KYC, KYB and AML cases across dense enterprise screens where clarity and speed decided outcomes.',
    role: 'I designed the review screens and boarding flows, and built the shared component layer that new verification products launch on.',
    result: ['A reusable product surface', 'Faster review decisions', 'Two verification products shipped'],
    tech: ['react', 'laravel', 'mongo'],
  },
  {
    title: 'ClickUp-to-deploy agent workflows',
    context: 'Programmers Force · AI engineering',
    problem:
      'Repetitive engineering setup around repositories consumed time that was better spent building product.',
    role: 'I built the frontend and orchestration agents, and the pipeline that goes from a ClickUp requirement to a deployed change.',
    result: ['Automated context handling', 'Requirement to deployment', 'AI in the daily workflow'],
    tech: ['claude', 'python', 'git'],
  },
]

/** Smaller pieces of work, listed plainly. */
export const others: OtherProject[] = [
  {
    title: 'AI Self-Checkout',
    blurb:
      'Final year project. Computer vision and machine learning recognize products in real time, with a dashboard for live detection.',
    tech: ['python', 'react'],
  },
  {
    title: 'Bakery Management',
    blurb: 'Operations, inventory and order management system for a bakery.',
    tech: ['php', 'mysql', 'js'],
  },
  {
    title: 'Bakery Mobile App',
    blurb: 'Android app for online ordering and customer management.',
    tech: ['java', 'firebase', 'android'],
  },
  {
    title: 'Robotics and IoT',
    blurb: 'Obstacle avoidance robots, temperature and humidity sensing, and ROS-based projects.',
    tech: ['python', 'c'],
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