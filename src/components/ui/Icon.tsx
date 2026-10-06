import { useState } from 'react'

/**
 * Icon registry. Remote icons come from the devicon CDN (kept out of the bundle);
 * a few bespoke keys fall back to inline SVG. Every image has a text fallback so
 * the UI degrades gracefully if the CDN is blocked.
 */

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/'

const REMOTE: Record<string, string> = {
  python: 'python/python-original.svg',
  react: 'react/react-original.svg',
  ts: 'typescript/typescript-original.svg',
  js: 'javascript/javascript-original.svg',
  vue: 'vuejs/vuejs-original.svg',
  angular: 'angularjs/angularjs-original.svg',
  next: 'nextjs/nextjs-original.svg',
  node: 'nodejs/nodejs-original.svg',
  laravel: 'laravel/laravel-plain.svg',
  mongo: 'mongodb/mongodb-original.svg',
  php: 'php/php-original.svg',
  mysql: 'mysql/mysql-original.svg',
  html: 'html5/html5-original.svg',
  css: 'css3/css3-original.svg',
  git: 'git/git-original.svg',
  linux: 'linux/linux-original.svg',
  c: 'c/c-original.svg',
  cpp: 'cplusplus/cplusplus-original.svg',
  aws: 'amazonwebservices/amazonwebservices-original.svg',
  firebase: 'firebase/firebase-plain.svg',
  java: 'java/java-original.svg',
  android: 'androidstudio/androidstudio-original.svg',
}

function CustomGlyph({ k, name }: { k: string; name: string }) {
  if (k === 'sdk') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label={name}
        role="img"
      >
        <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />
      </svg>
    )
  }
  if (k === 'claude') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        aria-label={name}
        role="img"
      >
        <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
      </svg>
    )
  }
  return (
    <span className="glyph-text" aria-hidden="true">
      {name}
    </span>
  )
}

export function StackIcon({
  k,
  name,
  size = 28,
}: {
  k: string
  name: string
  size?: number
}) {
  const [failed, setFailed] = useState(false)
  const url = REMOTE[k]

  if (url && !failed) {
    return (
      <img
        src={DEV + url}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    )
  }
  return <CustomGlyph k={k} name={name} />
}