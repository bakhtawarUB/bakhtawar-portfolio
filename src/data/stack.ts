import type { StackItem } from './types'

/* remote: true → devicon CDN image. remote omitted/false → inline SVG from icons.tsx */
export const stackItems: StackItem[] = [
  { key: 'react', name: 'React', cat: 'f', remote: true },
  { key: 'python', name: 'Python', cat: 'b', remote: true },
  { key: 'ts', name: 'TypeScript', cat: 'f', remote: true },
  { key: 'js', name: 'JavaScript', cat: 'f', remote: true },
  { key: 'vue', name: 'Vue.js', cat: 'f', remote: true },
  { key: 'angular', name: 'Angular', cat: 'f', remote: true },
  { key: 'next', name: 'Next.js', cat: 'f', remote: true },
  { key: 'node', name: 'Node.js', cat: 'b', remote: true },
  { key: 'laravel', name: 'Laravel', cat: 'b', remote: true },
  { key: 'mongo', name: 'MongoDB', cat: 'd', remote: true },
  { key: 'php', name: 'PHP', cat: 'b', remote: true },
  { key: 'mysql', name: 'MySQL', cat: 'd', remote: true },
  { key: 'html', name: 'HTML5', cat: 'f', remote: true },
  { key: 'css', name: 'CSS3', cat: 'f', remote: true },
  { key: 'git', name: 'Git', cat: 't', remote: true },
  { key: 'linux', name: 'Linux', cat: 't', remote: true },
  { key: 'c', name: 'C', cat: 't', remote: true },
  { key: 'cpp', name: 'C++', cat: 't', remote: true },
  { key: 'aws', name: 'AWS', cat: 'd', remote: true },
  { key: 'firebase', name: 'Firebase', cat: 'd', remote: true },
  { key: 'java', name: 'Java', cat: 'b', remote: true },
  { key: 'android', name: 'Android Studio', cat: 't', remote: true },
  { key: 'sdk', name: 'Web SDKs', cat: 'f' },
  { key: 'claude', name: 'Claude Code', cat: 't' },
]

export const stackFilters = [
  { id: 'all', label: 'All' },
  { id: 'f', label: 'Frontend' },
  { id: 'b', label: 'Backend' },
  { id: 'd', label: 'Data and cloud' },
  { id: 't', label: 'Tools and systems' },
] as const

export const softSkills = [
  'Web SDK development',
  'API integration',
  'problem solving',
  'decision making',
]