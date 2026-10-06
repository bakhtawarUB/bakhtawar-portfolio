---
name: portfolio-design
description: Use when editing, adding, or restyling any part of the Bakhtawar Kashif portfolio React site (src/, styles, tokens, components, GSAP motion, WebGL hero). Covers the design-token system, motion language, accessibility/reduced-motion rules, and the pre-ship QA checklist for this "graphics-first" portfolio.
---

# Portfolio design & build standard

This is the design system for **Bakhtawar Kashif — Portfolio** (React + TS + Vite,
GSAP/ScrollTrigger/Lenis, react-three-fiber). Load it whenever you touch
`src/`, the styles, motion, or WebGL. It defines the bar: the site must look
and feel like a piece of graphic design, not a template.

## Non-negotiables

1. **Motion is opt-in, never required.** Every animation must be wrapped in a
   `prefers-reduced-motion` guard. Reduced motion still shows the full content.
2. **Content lives in `src/data/*.ts`.** Never hard-code copy inside components.
3. **Tokens, not magic values.** Colors, spacing, type, easing and durations
   come from `src/styles/tokens.css`. Do not invent one-off hex values.
4. **Every interactive element is keyboard reachable** with a visible focus ring.
5. **Verify before claiming done:** `npm run build` (runs `tsc --noEmit`) must pass.

## Color tokens

| Token        | Value      | Use |
| ------------ | ---------- | --- |
| `--blue`     | `#1d34ff`  | Primary brand, hero, links on light |
| `--paper`    | `#f3f4f6`  | Light background |
| `--ink`      | `#0b0f2e`  | Primary text, dark sections |
| `--mute`     | `#5b6080`  | Secondary text |
| `--rule`     | `#d7d9e2`  | Hairlines, borders |
| `--hi`       | `#ffe94d`  | Highlight / "verified" accent, focus ring |

Dark theme swaps `--paper`→`#0a0d24`, `--ink`→`#f3f4f6`. Never assume light.

## Type scale

- Display / editorial: **Instrument Serif** (`.serif`), tight tracking
  (`-0.02em`), opinions via italics.
- UI / body: **Geist**, weights 400/500/600, body `17px/1.6`.
- Section headings use fluid `clamp()`; keep the serif/sans contrast deliberate:
  serif for voice, sans for interface.

## Grid & spacing

- Content max width `1240px`, gutter `28px` (desktop) / `20px` (mobile).
- Spacing scale from tokens (`--space-*`); section rhythm ≈ `100–120px` vertical.
- Breakpoints to test: **380 / 700 / 900 / 1240px** and tall `min-height:680px`.

## Motion language (GSAP)

- Easing: entrances `expo.out` / `power3.out`; press/hover `power2.out`;
  springs for playful pops only via `back.out(1.4–1.6)`.
- Durations: micro `0.2–0.4s`, reveals `0.8–1.1s`, cinematic `1.4–1.8s`.
- Stagger: text 0.03–0.05s/char, items 0.07–0.12s, never more than ~1.2s total.
- Scroll-linked reveals use ScrollTrigger `start: "top 85–92%"`.
- One pinned/scrubbed set-piece is allowed per viewport — do not stack pins.
- Always create animations inside a `gsap.context()` and revert on unmount.

## WebGL rules

- Canvases mount lazily (IntersectionObserver) and **pause when off-screen**.
- Import 3D code via `React.lazy` / dynamic import so it stays out of the main bundle.
- Respect reduced motion: render a static frame, no continuous loop.
- Never block first paint on WebGL; the page must be usable if WebGL fails.

## The "1000% graphics" bar

A section is only done when it has: a clear focal point, intentional type
contrast, one memorable interaction, and consistent spacing — plus grain/texture
or an editorial detail that shows craft. If it could belong to any portfolio,
push further.

## Pre-ship QA checklist

- [ ] `npm run build` passes (typecheck + build), no console errors.
- [ ] Reduced-motion path verified (toggle OS setting): content intact, no loops.
- [ ] Keyboard: tab through nav, CTAs, accordions, filters; focus always visible.
- [ ] Responsive at 380 / 700 / 900 / 1240px; no horizontal scroll.
- [ ] Dark **and** light theme both readable (contrast ≥ 4.5:1 for body text).
- [ ] Images have `width`/`height` + `alt`; decorative art is `aria-hidden`.
- [ ] All copy sourced from `src/data/*.ts`.
- [ ] No hard-coded hex/durations that bypass tokens.