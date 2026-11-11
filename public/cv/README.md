# Tailored resumes

Drop job-specific PDFs in this folder as `<job-slug>.pdf` (lowercase letters,
numbers, hyphens), then share the portfolio with `?cv=<job-slug>`:

    https://bakhtawar-portfolio-theta.vercel.app/?cv=shufti-frontend

The site serves that PDF from every "View resume" / "Download CV" control and
shows "Resume tailored for …" near the hero and contact links.

- No `?cv=` → the default CV at `/Bakhtawar_Kashif_CV.pdf` is served.
- Malformed slug → falls back to the default CV (the page never breaks).
- Well-formed slug with no PDF here → the page still links to
  `/cv/<slug>.pdf`, so **upload the PDF before sharing the link**.
- Optional pretty labels: `resumeLabels` in `src/data/resumes.ts`.
