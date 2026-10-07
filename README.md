# Bakhtawar Kashif — Portfolio

A cinematic, graphics-first portfolio for an **identity-verification** frontend &
full-stack engineer. Built with React + TypeScript + Vite, motion by
GSAP / ScrollTrigger / Lenis, and WebGL by react-three-fiber.

> Focus: KYC / KYB / AML interfaces, embeddable Web SDKs, and AI agent
> workflows — presented as a product a client would be proud to ship.

**Live:** https://bakhtawar-portfolio-theta.vercel.app
**Repo:** https://github.com/bakhtawarUB/bakhtawar-portfolio

## Stack

| Area      | Tech |
| --------- | ---- |
| Framework | React 18 + TypeScript + Vite |
| 3D / WebGL| three.js via `@react-three/fiber` (lazy-loaded) |
| Motion    | GSAP + ScrollTrigger, Lenis smooth scroll |
| Styling   | CSS custom-property design tokens (no CSS framework) |
| Hosting   | Vercel / Netlify (static `dist/`) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build on :4173
```

## Project layout

```
src/
├─ data/        Typed content (profile, experience, projects, stack, certs, journey)
├─ styles/      tokens.css · global.css · animations.css
├─ lib/         gsap setup, icon registry
├─ hooks/       reduced-motion, pointer, gsap context, scroll progress
└─ components/  layout · hero · about · flow · journey · stack · work · projects · certs · contact · ui
```

All copy lives in `src/data/*.ts` — edit content there, not inside components.

## Accessibility & performance

- Full `prefers-reduced-motion` support (motion is opt-out, never required).
- WebGL canvases lazy-mount and pause when off-screen.
- 3D code is code-split from the main bundle.
- Keyboard navigable, visible focus, semantic landmarks.

## Content to replace (placeholders)

- `src/data/profile.ts` → real **LinkedIn** URL.
- `public/Bakhtawar_Kashif_CV.pdf` → real CV (a stub ships today).
- `public/media/og-image.*` → 1200×630 social share image (SVG stand-in ships).

The portrait is in place at `public/media/photo.jpg` (shown inside the ID card).
Stack icons are vendored SVGs in `public/icons/` (devicon, MIT license) so the
site has no runtime CDN dependency.

## License

MIT © Bakhtawar Kashif