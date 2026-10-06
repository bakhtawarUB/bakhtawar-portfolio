import type { Plugin } from "@opencode-ai/plugin"

/**
 * Project-local opencode plugin for the portfolio.
 *
 * - Registers a `/portfolio-preview` command (typecheck → build → preview).
 * - Keeps the design standard discoverable without editing the global config.
 *
 * Auto-discovered from `.opencode/plugin/` — no config entry required.
 * Restart opencode after changing this file (config is loaded once at startup).
 */
export default (async () => {
  return {
    config: (cfg) => {
      try {
        cfg.command = cfg.command ?? {}
        cfg.command["portfolio-preview"] ??= {
          description:
            "Typecheck, production-build and serve the portfolio, then report the preview URL.",
          agent: "build",
          template: [
            "Prepare the portfolio for review.",
            "1. From the portfolio root run `npm run build` (this runs `tsc --noEmit` + Vite).",
            "2. If it fails, fix the TypeScript/build errors and re-run until green.",
            "3. Then start `npm run preview` and report the local URL (default :4173).",
            "4. Remind the user to check the design skill (.opencode/skill/portfolio-design/SKILL.md) QA checklist.",
          ].join("\n"),
        }
      } catch {
        // Never let an optional convenience break startup.
      }
    },
  }
}) satisfies Plugin