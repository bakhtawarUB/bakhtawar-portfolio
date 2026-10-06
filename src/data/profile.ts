import type { Stat, ContactLink } from './types'

/* ==========================================================================
   profile.ts — site identity, copy and links.
   Replace the placeholders noted in README.md.
   ========================================================================== */

export const profile = {
  name: 'Bakhtawar Kashif',
  first: 'Bakhtawar',
  last: 'Kashif',
  brand: 'B. Kashif',
  role: 'Frontend & Full Stack Engineer',
  location: 'Lahore, Pakistan',
  company: 'Programmers Force',
  tagline: 'Frontend and full stack engineer building identity verification products.',
  heroNote: 'Programmers Force, Lahore.',
  heroNote2: 'Shufti Pro, Facia and AI engineering automation.',
  availability: 'Open to new roles',
  email: 'engr.bakhtawar1@gmail.com',
  siteUrl: 'https://bakhtawar.dev',
  /** TODO: replace with the real profile URL */
  linkedin: 'https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME',
  github: 'https://github.com/Bakhtawar-Kashif2252',
  cv: '/Bakhtawar_Kashif_CV.pdf',
  about: {
    lede:
      'I design and build the screens where people prove who they are, and the SDKs that let other companies ship them.',
    body:
      'For about three years I have worked on KYC, KYB and AML interfaces in React, Vue.js and Angular, with Laravel and MongoDB behind them when needed. Lately I also build AI agents that take a task from a ClickUp requirement all the way to deployment. I graduated in Computer Engineering from ITU Lahore with a 3.53 CGPA.',
  },
} as const

export const stats: Stat[] = [
  { n: 3, s: '+', label: 'Years in identity verification' },
  { n: 2, label: 'Verification products' },
  { n: 11, label: 'Certificates, awards and roles' },
  { n: 3.53, d: 2, label: 'CGPA, ITU Lahore' },
]

export const marquee = [
  'Shufti Pro',
  'Facia',
  'KYC',
  'KYB',
  'AML',
  'Web SDKs',
  'AI agents',
  'Claude Code Action',
]

export const certificates = [
  'Claude Code Action Certification',
  'AWS Academy Cloud Foundations',
  'AWS Data Engineering',
  'Google Technical Support Fundamentals',
  'Intro to C Fundamentals badge',
  'Robot Operating System Workshop',
  'Academic Achievement Award, Crystal Shield',
  'Best English Speaker Award',
  'IEEE Industry-Academia Linkage Workshop',
  'IET Society Outreach Managerial',
  'IEEE Society Volunteer',
]

export const contactLinks: ContactLink[] = [
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'Download CV', href: profile.cv, download: true },
]

export const navLinks = [
  { label: 'Stack', href: '#stack' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]