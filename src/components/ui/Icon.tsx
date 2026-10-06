import { useState } from 'react'

/**
 * Icon registry. The devicon SVGs are vendored into `public/icons/` so the site
 * works offline and can never break on a CDN outage. Bespoke keys fall back to
 * inline SVG, and every image degrades to a text label if a file is missing.
 */

const LOCAL: Record<string, string> = {
  python: 'python.svg',
  react: 'react.svg',
  ts: 'ts.svg',
  js: 'js.svg',
  vue: 'vue.svg',
  angular: 'angular.svg',
  next: 'next.svg',
  node: 'node.svg',
  laravel: 'laravel.svg',
  mongo: 'mongo.svg',
  php: 'php.svg',
  mysql: 'mysql.svg',
  html: 'html.svg',
  css: 'css.svg',
  git: 'git.svg',
  linux: 'linux.svg',
  c: 'c.svg',
  cpp: 'cpp.svg',
  aws: 'aws.svg',
  firebase: 'firebase.svg',
  java: 'java.svg',
  android: 'android.svg',
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
  const file = LOCAL[k]

  if (file && !failed) {
    return (
      <img
        src={`/icons/${file}`}
        alt={name}
        width={size}
        height={size}
        decoding="async"
        onError={() => setFailed(true)}
      />
    )
  }
  return <CustomGlyph k={k} name={name} />
}
