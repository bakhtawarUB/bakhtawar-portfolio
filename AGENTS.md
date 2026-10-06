# AGENTS.md — Bakhtawar Kashif Portfolio

Guidance for agents working in this repo.

## Commands

- `npm install` — install deps (first run / after dependency changes).
- `npm run dev` — Vite dev server on http://localhost:5173
- `npm run typecheck` — `tsc --noEmit`
- `npm run build` — typecheck + production build to `dist/`
- `npm run preview` — serve the built site on http://localhost:4173

Always run `npm run build` before declaring a change done.

## Rules

- **Content** lives in `src/data/*.ts`. Do not hard-code copy in components.
- **Styling** uses tokens in `src/styles/tokens.css`. No one-off hex/durations.
- **Motion** must be wrapped in `prefers-reduced-motion` guards and created
  inside a `gsap.context()` that reverts on unmount.
- **3D** (three.js / r3f) must be lazily imported and pause when off-screen.
- Follow the `portfolio-design` skill for any visual or motion change.

## Deploy

Static Vite build. Vercel / Netlify config is included (`vercel.json`,
`netlify.toml`). Output directory: `dist/`.