# Bakhtawar Kashif — Portfolio

A graphics-first portfolio for an **identity-verification** frontend &
full-stack engineer. Built with React + TypeScript + Vite.

> Focus: KYC / KYB / AML interfaces, embeddable Web SDKs, and AI agent
> workflows — presented as a product a client would be proud to ship.

**Live:** https://bakhtawar-portfolio-theta.vercel.app
**Repo:** https://github.com/bakhtawarUB/bakhtawar-portfolio

## Design highlights

- **Hero verification flow** — the one memorable moment: an animated
  "verifying profile" scan that closes on a VERIFIED stamp, mirrors the
  product focus, and auto-runs once on load (replay included). Pure CSS +
  rAF, no animation library.
- **Try the SDK** — a peek at the identity-verify web SDK: code snippet
  with one-click copy and a live mini-widget that runs the flow.
- **Featured projects** — expandable rows that state the *problem*, the
  *role* that was played, and the *result*.
- Everything else stays quiet: typographic hero, plain copy, CSS-only
  scroll effects, dual light/dark themes.

## Stack

| Area      | Tech |
| --------- | ---- |
| Framework | React 18 + TypeScript + Vite |
| Motion    | CSS animations/transitions, rAF, Lenis smooth scroll |
| Styling   | CSS custom-property design tokens (no CSS framework) |
| Fonts     | Self-hosted: Fraunces, Public Sans, IBM Plex Mono |
| Hosting   | Vercel (static `dist/`, auto-deployed from `main`) |

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
├─ styles/      tokens.css · global.css · animations.css · fonts.css
├─ hooks/       reduced-motion, pointer, theme, smooth scroll, in-view
└─ components/  layout · hero (verify-demo) · about · flow · journey · stack
                · sdk-demo · work · projects · certs · contact · ui
```

All copy lives in `src/data/*.ts` — edit content there, not inside components.

## Performance & accessibility

- No 3D or animation libraries — no GSAP, no three.js, zero runtime
  third-party scripts.
- Below-fold sections are code-split (React `lazy`) so the hero paints and
  becomes interactive first.
- Fonts are self-hosted `woff2` with preload + `fetchpriority` hints.
- Full `prefers-reduced-motion` support; keyboard navigable with visible
  focus; 44px+ tap targets; safe-area aware; Lighthouse 90+ perf/a11y.

## Tailored resumes (one per job)

The default CV ships at `public/Bakhtawar_Kashif_CV.pdf`. To send a
job-specific resume without touching any code:

1. Tailor your CV for the role and save the PDF as `public/cv/<job-slug>.pdf`
   (lowercase letters, numbers and hyphens only), e.g.
   `public/cv/shufti-frontend.pdf`.
2. Apply with the matching link appended to the site URL:

   ```
   https://bakhtawar-portfolio-theta.vercel.app/?cv=shufti-frontend
   ```

3. Every "View resume" / "Download CV" control on the page then serves that
   PDF, and a quiet line near the hero and contact links reads
   "Resume tailored for Shufti Frontend".

Want a nicer label than the title-cased slug? Add it to `resumeLabels` in
`src/data/resumes.ts`:

```ts
export const resumeLabels = {
  'shufti-frontend': 'Shufti Pro — Frontend Engineer',
}
```

A missing or malformed `?cv=` value falls back to the default CV, so the page
never breaks. A well-formed slug whose PDF has not been uploaded yet still
points at `/cv/<slug>.pdf` — upload the file **before** sharing the link, or
the download 404s. Recruiters who arrive without a `?cv=` link simply get the
general resume.

## Content placeholders to replace

- `public/Bakhtawar_Kashif_CV.pdf` → keep the default CV current.
- `public/media/og-image.svg` → 1200×630 social share image (SVG stand-in ships).

The portrait ships as a compressed WebP at `public/media/photo.webp` (shown
inside the ID card). Stack icons are vendored SVGs in `public/icons/`
(devicon, MIT license) so the site has no runtime CDN dependency.

## License

MIT © Bakhtawar Kashif